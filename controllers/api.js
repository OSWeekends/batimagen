const processFile = require('../lib/batimagen')
const { removeRelatedFiles } = require('../lib/utils')
const { fileValidation } = require('../lib/digester')
const { services, reports } = require('../lib/database')
const uuidv4 = require('uuid/v4')

function listServices (req, res) {
  res.json(services.list())
}

function listReports (req, res) {
  res.json(reports.list())
}

function createReport (req, res) {
  if (!fileValidation(req)) {
    return res
      .status(400)
      .json({ msg: 'No files were attached in the request.' })
  }
  const uuid = uuidv4()
  processFile(req, { uuid })
  res.json({
    uuid,
    msg: `Process has started. Check /api/v1/reports/${uuid} for more info...`
  })
}

function deleteReport (req, res) {
  const uuid = req.params.uuid
  const report = reports.getOne(uuid)
  if (!report) {
    return res.status(404).json({ msg: 'This report does not exist!' })
  }

  if (!report.isReady) {
    return res.status(400).json({ msg: "This report wasn't generated yet!" })
  }

  removeRelatedFiles(uuid)
    .then(() => {
      reports.remove(uuid)
      res.json({ msg: `The report ${uuid} was removed successfully!` })
    })
    .catch(err => res.status(500).json({ msg: err }))
}

function getReport (req, res) {
  const uuid = req.params.uuid
  const report = reports.getOne(uuid)
  if (report) {
    return res.json(report)
  }
  res.status(404).json({ msg: 'This report does not exist!' })
}

module.exports = {
  listServices,
  listReports,
  deleteReport,
  getReport,
  createReport
}
