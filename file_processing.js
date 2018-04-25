const http = require('http'),
    fs = require('fs'),
    https = require('https'),
    metaAnalizer = require("./meta"),
    visionAnalysis = require("./vision"),
    phoenix = require("./phoenix"),
    virusAnalysis = require("./viral"),
    hp = require("./honeypot"),
    config = require("./config"),
    mime = require('mime-types'),
    imageExtensions = require('image-extensions');

function launchHoneypot (req, fileData, analysisData){
    if(config.honeypotMode) {
        hp(req, fileData, analysisData);
    }
}

function imageValidator(fileExtension){
    return imageExtensions.includes(fileExtension);
}

function fileValidation (req, res) {
    if (!req.files.sampleFile && !req.body.sampleUrl){
        res.status(400).render('error', { error: 'No files were uploaded.'});
        return false;
    } else {
        return true;
    }
}

function digestFormFile (req, res, cb){
    const userFile = req.files.sampleFile;
    const data = {};
    data.filename = userFile.name;
    data.fullpath = `./temp/${data.filename}`;
    data.mimetype = userFile.mimetype;
    data.extension = mime.extension(userFile.mimetype);
    data.source = "file";
    fs.writeFile(data.fullpath, userFile.data, "utf8", err => {
        if(err){
            res.status(500).send("Batimagen can't save the user image");
        } else {
            cb(data);
        }   
    });
}
function digestExternalFile (req, res, cb){
    const clientProtocol = req.body.sampleUrl.split("://")[0];
    const client = clientProtocol === "http" ? http : https;
        
    client.get(req.body.sampleUrl, response => {
        const data = {};
        data.filename = `${new Date().getTime()}.${mime.extension(response.headers["content-type"])}`;
        data.fullpath = `./temp/${data.filename}`;
        data.mimetype = response.headers["content-type"];
        data.extension = mime.extension(response.headers["content-type"]);
        data.source = "url";
        data.targetUrl = req.body.sampleUrl;
    	const file = fs.createWriteStream(data.fullpath);
    	response.pipe(file);
        response.on('end', () => {
            cb(data);
        });
    });
}

function fileDigestion (req, res, cb){
    req.files.sampleFile ? digestFormFile (req, res, cb) : digestExternalFile (req, res, cb);
}

function processFile (req, res) {
    if(fileValidation){
        fileDigestion(req, res, fileInfo => {
            
            metaAnalizer({name: fileInfo.filename}, req, (err, exifData) => {
                if(err) console.log("[error][metaAnalizer]", err);
                
                const finalData = {};
                finalData.metadata = exifData || null;
                
                virusAnalysis(fileInfo)
                .then(virusData => {
                    finalData.virusData = virusData;
                    if (imageValidator(fileInfo.extension)) {
                        
                        Promise.all([visionAnalysis.fullAnalysis(fileInfo.fullpath), phoenix.fullAnalysis(fileInfo.fullpath)])
                        .then(responses => {
                            finalData.vision = responses[0];
                            res.render('results', {data: finalData});
                            launchHoneypot (req, fileInfo, finalData);
                        })
                        .cath(err => {
                            console.log("[error][metaAnalizer]", err)
                        });

                    } else {
                        res.render('results', {data: finalData});
                        launchHoneypot (req, fileInfo, finalData);
                    }
                    
                })
                .catch(error => {
                    console.log("[error][virusAnalysis]", err);
                });
            });
        });
    }
}

module.exports = processFile;