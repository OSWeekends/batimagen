const exiftool = require('node-exiftool')
const { paths } = require('../config')

function metaAnalizer (userFile, requestInfo) {
  return new Promise((resolve, reject) => {
    const ep = new exiftool.ExiftoolProcess()
    ep.open()
      .then(pid => console.log('[info][exiftool] Started: process %s', pid))
      .then(() =>
        ep.readMetadata(`${paths.temp}/${userFile.name}`, ['-File:all'])
      )
      .then((metadata, err) => {
        if (err) {
          console.log('[error][exiftool]', err)
          reject(err)
        } else {
          resolve(metadata)
        }
      })
      .then(() => ep.close())
      .then(() => console.log('[info][exiftool] Closed exiftool'))
      .catch(console.error)
  })
}

module.exports = metaAnalizer
