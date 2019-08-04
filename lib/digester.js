const http = require('http')
const fs = require('fs')
const https = require('https')
const mime = require('mime-types')
const imageExtensions = require('image-extensions')
const { paths } = require('../config')

function imageValidator (fileExtension) {
  return imageExtensions.includes(fileExtension)
}

function fileValidation (req) {
  if (req.files && req.files.file) {
    return true
  }

  if (req.body.url) {
    return true
  }

  return false
}

function digestFormFile (req, data) {
  return new Promise((resolve, reject) => {
    const userFile = req.files.file
    data.mimetype = userFile.mimetype
    data.extension = mime.extension(userFile.mimetype)
    data.filename = `${data.uuid}.${data.extension}`
    data.fullpath = `${paths.temp}/${data.filename}`
    data.source = 'file'
    fs.writeFile(data.fullpath, userFile.data, 'utf8', err => {
      if (err) {
        res.status(500).send("Batimagen can't save the user image")
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function digestExternalFile (req, data) {
  return new Promise((resolve, reject) => {
    const clientProtocol = req.body.url.split('://')[0]
    const client = clientProtocol === 'http' ? http : https

    client.get(req.body.url, response => {
      data.filename = `${data.uuid}.${mime.extension(
        response.headers['content-type']
      )}`
      data.fullpath = `${paths.temp}/${data.filename}`
      data.mimetype = response.headers['content-type']
      data.extension = mime.extension(response.headers['content-type'])
      data.source = 'url'
      data.targetUrl = req.body.sampleUrl

      const file = fs.createWriteStream(data.fullpath)
      response.pipe(file)

      file
        .on('finish', function () {
          file.close(err => {
            err ? reject(err) : resolve(data)
          })
        })
        .on('error', function (err) {
          fs.unlink(data.fullpath)
          reject(err)
        })
    })
  })
}

function fileDigestion (req, data) {
  return req.files && req.files.file
    ? digestFormFile(req, data)
    : digestExternalFile(req, data)
}

module.exports = { imageValidator, fileValidation, fileDigestion }
