var fs   = require('fs'),
 express = require('express'),
 http = require('http'),
 https = require('https'),
 metaAnalizer = require("./meta"),
 fileUpload = require('express-fileupload'),
 bodyParser = require('body-parser'),
 mime = require('mime-types');

var app = express(),
 port = process.env.PORT || 3000;

// Middelware
app.use(express.static('public'));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');


// Routes
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/upload', function (req, res) {
    res.redirect("/")
});



app.post('/upload', function (req, res) {

    if (!req.files.sampleFile && !req.body.sampleUrl){
        res.status(400).render('error', { error: 'No files were uploaded.'});
    } else {
        var userFile
        if(req.files.sampleFile) {
            userFile = req.files.sampleFile
            fs.writeFile(`./temp/${userFile.name}`, userFile.data, "utf8", function(err){
                if(err){
                    res.status(500).send("Batimagen can't save the user image");
                } else {
                    metaAnalizer(userFile, req, function(err, data){
                        if(err) console.log("ERROR!:", err)
                        res.render('results', data);
                    })
                }   
            });
            
        } else {
            
            var clientProtocol = req.body.sampleUrl.split("://")[0]
            var client = clientProtocol === "http" ? http : https;
            
            client.get(req.body.sampleUrl, function(response) {
            	var rawData = "";
            	var fileName = `${new Date().getTime()}.${mime.extension(response.headers["content-type"])}`
            	var file = fs.createWriteStream(`./temp/${fileName}`);
            	  
            	response.pipe(file);
            	response.on('data', function(chunk) {
                      rawData += chunk;
                });
                response.on('end', function() {
                    metaAnalizer({name: fileName}, req, function(err, data){
                        if(err) console.log("ERROR!:", err)
                        res.render('results', data);
                    })
                });
            });
        }
    }
});

app.listen(port, function () {
  console.log('Batimagen listening on port:', port);
});