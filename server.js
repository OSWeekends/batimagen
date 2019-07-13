const express = require('express'),
 {services} = require('./config'),
 {removeRelatedFiles} = require('./lib/utils')
 processFile = require("./lib/batimagen"),
 db = require('./lib/database'),
 {fileValidation} = require("./lib/digester")
 fileUpload = require('express-fileupload'),
 uuidv4 = require('uuid/v4'),
 bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middelware
app.use(express.static('public'));
app.use("/forensic", express.static(__dirname + '/temp'));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/upload', (req, res) => {
    res.redirect("/");
});

app.get('/reports', (req, res) => {
    res.render('reports')
})

app.get('/reports/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  const report = db.get('reports').find({uuid}).value()
  if(report && report.isReady){
    res.render('results', {data: report.data})
  } else {
    res.redirect('/reports')
  }
})

app.post('/upload', fileValidation, (req, res) => {
  const uuid = uuidv4()
  processFile(req, {uuid})
  res.redirect(`/reports/${uuid}`)
});

app.get('/api/v1/services', (req, res) => {
  res.json(db.get('services').value());
})

app.get('/api/v1/reports/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  const report = db.get('reports').find({uuid}).value()
  if(report){
    return res.json(report)
  } 
  res.status(404).json({msg: "This report does not exist!"})
})

app.delete('/api/v1/reports/:uuid', (req, res) => {
  const uuid = req.params.uuid;
  const report = db.get('reports').find({uuid}).value()
  if(!report) {
    return res.status(404).json({msg: "This report does not exist!"})
  } 
  
  if(!report.isReady){
    return res.status(400).json({msg: "This report wasn't generated yet!"})
  } 
  
  db.get('reports').remove({uuid}).write()
    removeRelatedFiles(uuid)
      .then(() => res.json({msg: `The report ${uuid} was removed successfully!`}))
      .catch(err => res.status(500).json({msg: err}))     
})


app.get('/api/v1/reports', (req, res) => {
  const reports = db.get('reports').value();
  const data = reports.map(report => {
    return {
      uuid: report.uuid,
      isReady: report.isReady,
      hasError: report.hasError,
      status: report.status,
      startedAt: report.startedAt
    }
  })
  res.json(data)
})

app.listen(port, () => {
  console.log('[info][server] listening on port:', port);
});

