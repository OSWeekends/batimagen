/*
 @see: https://github.com/googleapis/nodejs-vision/blob/master/samples/detect.js#L486
*/
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

function detectFaces(fileName) {
    return new Promise (function (resolve, reject) {
      client
        .faceDetection(fileName)
        .then(results => {
            console.log("[info][vision API] detectFaces: done");
            resolve(results[0].faceAnnotations)
        })
        .catch(reject);
    })
}

function detectLabels(fileName) {
    return new Promise (function (resolve, reject) {
      client
        .labelDetection(fileName)
        .then(results => {
            console.log("[info][vision API] detectLabels: done");
            resolve(results[0].labelAnnotations)
        })
        .catch(reject);
    })
}


function detectLandmarks(fileName) {
    return new Promise (function (resolve, reject) {
        client
            .landmarkDetection(fileName)
            .then(results => {
                console.log("[info][vision API] detectLandmarks: done");
                resolve(results[0].landmarkAnnotations)
            })
            .catch(reject);
    })
}

function detectText(fileName) {
    return new Promise (function (resolve, reject) {
      client
        .textDetection(fileName)
        .then(results => {
            console.log("[info][vision API] detectText: done");
            resolve(results[0].textAnnotations)
        })
        .catch(reject);
    })
}

function detectLogos(fileName) {
    return new Promise (function (resolve, reject) {
      client
        .logoDetection(fileName)
        .then(results => {
            console.log("[info][vision API] detectLogos: done");
            resolve(results[0].logoAnnotations)
        })
        .catch(reject);
    })
}

function detectProperties(fileName) {
    return new Promise (function (resolve, reject) {
      client
        .imageProperties(fileName)
        .then(results => {
            console.log("[info][vision API] detectProperties: done");
            resolve(results[0].imagePropertiesAnnotation)
        })
        .catch(reject);
    })
}

function detectSafeSearch(fileName) {
    return new Promise (function (resolve, reject) {
        client
        .safeSearchDetection(fileName)
        .then(results => {
            console.log("[info][vision API] detectSafeSearch: done");
            resolve(results[0].safeSearchAnnotation)
        })
        .catch(reject);
    })
}

function detectWebGeo(fileName) {
    return new Promise (function (resolve, reject) {
      const request = {
        image: {
          source: {
            filename: fileName,
          },
        },
        imageContext: {
          webDetectionParams: {
            includeGeoResults: true,
          },
        },
      };
      client
        .webDetection(request)
        .then(results => {
            console.log("[info][vision API] detectWebGeo: done");
            resolve(results[0].webDetection)
        })
        .catch(reject);
    })
}

function detectFulltext (fileName) {
    return new Promise (function (resolve, reject) {
        client
            .documentTextDetection(fileName)
            .then(results => {
                console.log("[info][vision API] detectFulltext: done");
                const fullTextAnnotation = results[0].fullTextAnnotation;
                resolve(fullTextAnnotation ? fullTextAnnotation.text : null);
            })
            .catch(reject);
    });
}

function fullAnalysis (file, cb) {
    return new Promise(function(resolve, reject){
        const tasks = [detectFaces, detectLabels, detectLandmarks, detectText, detectLogos, detectProperties, detectSafeSearch, detectWebGeo, detectFulltext];
        const promiseArray = tasks.map(task => {
            console.log(`[info][vision API] ${task.name}: started`);
            return task(file)
        });
        Promise.all(promiseArray)
        .then(function(allData){
            const data = {};
            allData.forEach((item, index) => data[tasks[index].name] = item);
            resolve(data); 
        }).catch(err => {
            console.log("[error][vision API]", err)
            reject(err)
        });
    })
}

module.exports = {detectFaces, detectLabels, detectLandmarks, detectText, detectLogos, detectProperties, detectSafeSearch, detectWebGeo, detectFulltext, fullAnalysis};