const express = require('express'),
 {services} = require('./config'),
 processFile = require("./lib/batimagen"),
 db = require('./lib/database'),
 fileUpload = require('express-fileupload'),
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

app.post('/upload', processFile);

app.get('/api/v1/services', (req, res) => {
  res.json(db.get('services').value());
})

app.listen(port, () => {
  console.log('[info][server] listening on port:', port);
});

