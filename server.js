const express = require('express'),
 fileUpload = require('express-fileupload'),
 bodyParser = require('body-parser');

const reportCtr = require('./controllers/reports');
const apiCtr = require('./controllers/api')

const app = express();
const port = process.env.PORT || 3000;

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: true })

// Middelware
app.use(express.static('public'));
app.use("/forensic", express.static(__dirname + '/temp'));
app.use(fileUpload());
//app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');

// Routes for Server Render
app.get('/', reportCtr.home);
app.get('/reports', reportCtr.getList);
app.get('/reports/:uuid', reportCtr.getDetail)
app.post('/upload', urlencodedParser, reportCtr.upload);
app.post('/delete', urlencodedParser, reportCtr.remove)

// Routes for api
app.get('/api/v1/services', apiCtr.listServices)
app.get('/api/v1/reports', apiCtr.listReports)
app.post('/api/v1/reports', jsonParser, apiCtr.createReport)
app.get('/api/v1/reports/:uuid', apiCtr.getReport)
app.delete('/api/v1/reports/:uuid', apiCtr.deleteReport)

app.listen(port, () => {
  console.log('[info][server] listening on port:', port);
});