const vt = require("node-virustotal"),
    fs = require('fs'),
    config = require('./config.js');

const con = vt.MakePublicConnection();
con.setKey(config.token.virustotal);
con.setDelay(15000);


function fileAnalysis (fileData, cb){
    return new Promise((resolve, reject) => {
        con.submitFileForAnalysis(fileData.fullpath, fileData.mimetype, fs.readFileSync(fileData.fullpath), data => {
          console.log("[info][virustotal] fileAnalysis finished");
          resolve(data);
        }, err => {
          console.log("[error][virustotal] fileAnalysis:", err);
          reject(err);
        });
    })
}

function urlAnalysis (fileData){
    return new Promise((resolve, reject) => {
        con.submitUrlForScanning(fileData.targetUrl,data => {
          console.log("[info][virustotal] urlAnalysis finished");
          resolve(data);
        }, err => {
          console.log("[error][virustotal] urlAnalysis:", err);
          reject(err);
        });
    })
}

function virusAnalizer(fileData){
    return fileData.source === "url" ? urlAnalysis(fileData) : fileAnalysis(fileData);
}

module.exports = virusAnalizer;