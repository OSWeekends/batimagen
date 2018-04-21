var fs   = require('fs');
var exiftool = require('node-exiftool');
var config = require("./config");

function metaAnalizer(userFile, requestInfo, cb){
  var userData;
  if(config.honeypotMode){
    userData = {
      Headers: requestInfo.headers,
      ip: requestInfo.ip,
      timestamp: new Date().getTime()
    }
  }
  
  const ep = new exiftool.ExiftoolProcess();
  ep
    .open()
    .then((pid) => console.log('[info][exiftool] Started: process %s', pid))
    .then(() => ep.readMetadata(`./temp/${userFile.name}`, ['-File:all']))
    .then((metadata, err) => {
        cb(err, metadata)
        const cleanName = userFile.name.split(".");
        if(config.honeypotMode) {
          metadata.user_data = userData
        }
        fs.writeFile(`./temp/${cleanName[0]}.json`, JSON.stringify(metadata, null, 2), "utf8", err => {
          if(err) {
            console.log("[error][exiftool] saving the metadata file")
          }
        })

    })
    .then(() => ep.close())
    .then(() => console.log('[info][exiftool] Closed exiftool'))
    .catch(console.error)
}

module.exports = metaAnalizer;