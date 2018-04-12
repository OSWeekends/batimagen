var fs   = require('fs'),
 express = require('express'),
 pug = require("pug"),
 metaAnalizer = require("./meta"),
 fileUpload = require('express-fileupload');

var app = express(),
 port = process.env.PORT || 3000;

// Middelware
app.use(express.static('public'));
app.use(fileUpload());
app.set('view engine', 'pug');


// Routes
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/upload', function (req, res) {
    res.redirect("/")
});


app.post('/upload', function (req, res) {
    console.log("req.files:", req.files)
    
    if (!req.files.sampleFile){
        res.status(400).render('error', { error: 'No files were uploaded.'});
    } else {
        var userFile = req.files.sampleFile
        fs.writeFile(`./temp/${userFile.name}`, userFile.data, "utf8", function(err){
            if(err){
                res.status(500).send("Batimagen can't save the user image");
            } else {
                metaAnalizer(userFile, req, function(err, data){
                    if(err) console.log("ERROR!:", err)
                    res.render('results', data);
                }) 
            }            
        })
    }
});

app.listen(port, function () {
  console.log('Batimagen listening on port:', port);
});