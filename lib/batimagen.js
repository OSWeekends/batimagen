const metaAnalizer = require("./meta"),
    phoenix = require("./phoenix"),
    {imageValidator, fileValidation, fileDigestion} = require("./digester"),
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

function processFile (req, res) {
    if(fileValidation){
        fileDigestion(req, res)
            .then(fileInfo => processFileDetails(fileInfo, req))
            .then(finalData => res.render('results', {data: finalData}))
            .catch(err => console.log("[error][processFile]", err));  
    }
}

module.exports = processFile;