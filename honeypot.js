const https = require('https'),
    fs = require('fs');

function iplocation (ip, cb){
    https.get(`https://ipapi.co/${ip}/json`, response => {
        let data = '';
        response.on('data', chunk => {
            data += chunk;
        });
        response.on('end', () => {
            cb(null, JSON.parse(data));
        });
        response.on('error', err => {
            cb(err);
        });
    });
}

function saveData ( fileData, data){
    const cleanName = fileData.filename.split(".");
    fs.writeFile(`./temp/${cleanName[0]}.json`, JSON.stringify(data, null, 2), "utf8", err => {
      if(err) {
        console.log("[error][honeypot] saving the file");
      } else {
        console.log("[info][honeypot] data saved in file");
      }
    });
}

function honeypot (req, fileData, analysisData) {
    const data = {
        user_data: {
          headers: req.headers,
          ip: req.header('x-forwarded-for') || req.ip,
        },
        timestamp: new Date().getTime(),
        file_details: fileData,
        file_analysis: analysisData
    };
    
    
    iplocation(data.user_data.ip, (err, ipData) => {
        if(err) {
            console.log("[error][honeypot] IP Geolocation:", err);
        } else {
            console.log("[info][honeypot] IP Geolocated sucessfully");
        }
        
        data.user_data.guest_info = ipData || null;
        saveData (fileData, data);
    });
}

module.exports = honeypot;

