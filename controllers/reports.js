const processFile = require('../lib/batimagen')
const uuidv4 = require('uuid/v4')
const { fileValidation } = require('../lib/digester')
const { reports } = require('../lib/database')

function home (req, res) {
  res.render('index')
}

function upload (req, res) {
  if (!fileValidation(req)) {
    return res.status(400).render('error', { error: 'No files were uploaded.' })
  }
  const uuid = uuidv4()
  processFile(req, { uuid })
  res.redirect(`/reports/${uuid}`)
}

function getList (req, res) {
  res.render('reports')
}

function remove (req, res) {
  const uuid = req.body.uuid
  if (!uuid) {
    return res
      .status(400)
      .render('error', { error: 'Bas request! Missing UUID!' })
  }

  const report = reports.getOne(uuid)
  if (!report) {
    return res
      .status(404)
      .render('error', { error: 'This report does not exist!' })
  }

  if (!report.isReady) {
    return res
      .status(400)
      .render('error', { error: "This report wasn't generated yet!" })
  }

  removeRelatedFiles(uuid)
    .then(() => {
      reports.remove(uuid)
      res.redirect('/reports')
    })
    .catch(err => res.status(500).render('error', { error: err }))
}

function getDetail (req, res) {
  const uuid = req.params.uuid
  const report = reports.getOne(uuid)
  if (report && report.isReady) {
    res.render('results', { data: report.data })
  } else {
    res.redirect('/reports')
  }
}

module.exports = { home, upload, remove, getList, getDetail }
