const metaAnalizer = require("./meta"),
    phoenix = require("./phoenix"),
    {imageValidator, fileDigestion} = require("./digester"),
    db = require('../lib/database'),
    config = require("../config");

function processFileDetails (fileInfo, req) {
    const tasks = [{task: metaAnalizer({name: fileInfo.filename}, req), role:"metadata"}];
    
    if(config.thirdPartiesEnabled && config.thirdParties.virustotal){
        const virusAnalysis = require("./viral");
        tasks.push({task: virusAnalysis(fileInfo), role: "virusData"});
    }
    
    if (imageValidator(fileInfo.extension)) { 
        tasks.push({task:phoenix.fullAnalysis(fileInfo.fullpath), role: false});
    }
    
    if (imageValidator(fileInfo.extension) && config.thirdPartiesEnabled) {
        if(config.thirdParties.googleVision) {
            const visionAnalysis = require("./vision");
            tasks.push({task:visionAnalysis.fullAnalysis(fileInfo.fullpath), role: "vision"});
        }
    }

    return new Promise ((resolve, reject) => {
        Promise.all(tasks.map(item => item.task))
            .then(data => {
                
                const finalData = {
                    details: {name: fileInfo.filename}
                };
                
                tasks.forEach((task, index) => {
                    finalData[task.role] = data[index] ? data[index] : false;
                });
                
                resolve(finalData);
            })
            .catch(reject);
    });
}

function processFile (req, data={}) {
    if (!data.uuid) throw "Missing uuid in data Object!"
    db.get('reports').push({uuid: data.uuid, isReady: false, hasError: false, status: "Analysis has started...", startedAt: new Date().getTime()}).write()

    fileDigestion(req, data)
        .then(fileInfo => processFileDetails(fileInfo, req))
        .then(finalData => {
            db.get(`reports`)
            .find({ uuid: data.uuid })
            .assign({ 
                data: finalData,
                endedAt: new Date().getTime(),
                isReady: true, 
                hasError: false, 
                status: "Analysis has ended successfully.."
            }).write()
        })        
        .catch(err => {
            db.get(`reports`)
            .find({ uuid: data.uuid })
            .assign({ 
                endedAt: new Date().getTime(),
                isReady: true, 
                hasError: true, 
                errorDetails: err,
                status: "Analysis wasn't successfully."
            }).write()
            console.log("[error][processFile]", err)
        });  
}

module.exports = processFile;