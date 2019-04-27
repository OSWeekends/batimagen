const http = require('http'),
    fs = require('fs'),
    https = require('https'),
    mime = require('mime-types'),
    imageExtensions = require('image-extensions'),
    uuidv4 = require('uuid/v4'),
    {paths} = require('../config');

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



function digestFormFile (req, res){
    return new Promise((resolve, reject) => {
        const userFile = req.files.sampleFile;
        const data = {};
        data.filename = userFile.name;
        data.fullpath = `${paths.temp}/${data.filename}`;
        data.mimetype = userFile.mimetype;
        data.extension = mime.extension(userFile.mimetype);
        data.source = "file";
        fs.writeFile(data.fullpath, userFile.data, "utf8", err => {
            if(err){
                res.status(500).send("Batimagen can't save the user image");
                reject(err);
            } else {
                resolve(data);
            }   
        });        
    });
}

function digestExternalFile (req, res){
    return new Promise((resolve, reject) => {

        const clientProtocol = req.body.sampleUrl.split("://")[0];
        const client = clientProtocol === "http" ? http : https;
            
        client.get(req.body.sampleUrl, response => {
            const data = {};
            data.filename = `${uuidv4()}.${mime.extension(response.headers["content-type"])}`;
            data.fullpath = `${paths.temp}/${data.filename}`;
            data.mimetype = response.headers["content-type"];
            data.extension = mime.extension(response.headers["content-type"]);
            data.source = "url";
            data.targetUrl = req.body.sampleUrl;
            
        	const file = fs.createWriteStream(data.fullpath);
            response.pipe(file);
            
            file.on('finish', function() {
                  file.close((err)=>{
                      err? reject(err) :  resolve(data);
                  }); 
            }).on('error', function(err) {
                fs.unlink(data.fullpath);
                reject(err);
            });
        });
    });
}

function fileDigestion (req, res){
    return req.files.sampleFile ? digestFormFile (req, res) : digestExternalFile (req, res);
}


module.exports = {imageValidator, fileValidation, fileDigestion};