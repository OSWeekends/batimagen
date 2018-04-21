const exiftool = require('node-exiftool');

function metaAnalizer(userFile, requestInfo, cb){

  const ep = new exiftool.ExiftoolProcess();
  ep
    .open()
    .then((pid) => console.log('[info][exiftool] Started: process %s', pid))
    .then(() => ep.readMetadata(`./temp/${userFile.name}`, ['-File:all']))
    .then((metadata, err) => {
        cb(err, metadata)
    })
    .then(() => ep.close())
    .then(() => console.log('[info][exiftool] Closed exiftool'))
    .catch(console.error);
}

module.exports = metaAnalizer;