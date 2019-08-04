const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ services: {}, reports: [] }).write()

module.exports = {
  db,
  reports: {
    getOne: uuid =>
      db
        .get('reports')
        .find({ uuid })
        .value(),
    list: () => {
      const reports = db.get('reports').value()
      const data = reports.map(report => {
        return {
          uuid: report.uuid,
          isReady: report.isReady,
          hasError: report.hasError,
          status: report.status,
          startedAt: report.startedAt
        }
      })
      return data
    },
    add: data =>
      db
        .get('reports')
        .push(data)
        .write(),
    update: (uuid, data) =>
      db
        .get(`reports`)
        .find({ uuid })
        .assign(data)
        .write(),
    remove: uuid =>
      db
        .get('reports')
        .remove({ uuid })
        .write()
  },
  services: {
    save: list => db.set('services', list).write(),
    list: () => db.get('services').value()
  }
}
