const exec = require('child_process').exec;

/**
 * Validate the parrams provided to the Phoenix child process
 * @param {object} params - Configuration object
 * @property {string} params.file - Path to file for analysis
 * @property {string} params.action - Action to be performed by phoenix over the picture
 * @property {string} [params.ouput] - Path to output folder and file
 * @property {boolean} [params.display] - Display results
 * @return {Promise} - terminal outputs or error
 */

function validateParams (params){
    const properties = ["file", "action"];
    const supportedActions = [/^ela/, "lg", "avgdist", /^hsv/, /^lab/, /^labfast/, /^copymove/];

    if(!params) throw "[error][phoenix process] Missing configuration object";

    properties.forEach(property => {
        if(!params[property]) throw `[error][phoenix process] Missing ${property} property in configuration object!`;
    });

    supportedActions.forEach(action => {
        if(!params.action === action) throw `[error][phoenix process] Not supported action: ${action}!`;
    });

    return true;
}

/**
 * Generate the text that represents the command for Phoenix child process
 * @param {object} params - Configuration object
 * @property {string} params.file - Path to file for analysis
 * @property {string} params.action - Action to be performed by phoenix over the picture
 * @property {string} [params.ouput] - Path to output folder and file
 * @property {boolean} [params.display] - Display results
 * @return {Promise} - terminal outputs or error
 */
function generateCmd (params){
    const phoenixPath = "./scripts/phoenix/build/phoenix";
    return `${phoenixPath} -f ${params.file} -o ${params.output ? params.output : ""} ${params.display ? "-d" : ""} -${params.action}`;
}

/**
 * Handler for Phoenix child process
 * @param {object} params - Configuration object
 * @property {string} params.file - Path to file for analysis
 * @property {string} params.action - Action to be performed by phoenix over the picture
 * @property {string} [params.ouput] - Path to output folder and file
 * @property {boolean} [params.display] - Display results
 * @param {function} cb - The callback that handles the response and error.
 * @return {Promise} - terminal outputs or error
 */
 
function phoenixHandler (params, cb) {
    
    if (validateParams(params)) {
        exec(generateCmd(params), function (err, stdout, stderr) {
            const output = {err, stdout, stderr};
            if(!err){  
                console.log(`[info][phoenix process] action ${params.action} over ${params.file}: done`);
                cb(null, output);
            } else {
                console.log(`[error][phoenix process] action ${params.action} over ${params.file} error:\n ${err}`);
                cb(err);
            }
        });
    } 
}

/**
 * Run Error Level Analysis in Phoenix child process
 * @param {string} file - Path to file for analysis
 * @param {number} [quality=70] - Quality level 
 * @param {string} [outputPath="/temp"] - Path to output folder and file
 * @return {Promise} - terminal outputs or error
 */
function errorLevelAnalysis (file, quality, outputPath){
    return new Promise((resolve, reject) => {
        phoenixHandler({
            file: file,
            output:  outputPath || __dirname + "/temp",
            action: quality ? `ela ${quality}` : "ela"
        }, function (err, data){
            if (err) {
                reject(err);
            } else {
                resolve (data);
            }
        });
    });
}

/**
 * Luminance Gradient Analysis in Phoenix child process
 * @param {string} file - Path to file for analysis
 * @param {string} [outputPath="/temp"] - Path to output folder and file
 * @return {Promise} - terminal outputs or error
 */
function luminanceGradient (file, outputPath){
    return new Promise((resolve, reject) => {
        phoenixHandler({
            file: file,
            output:  outputPath || __dirname + "/temp",
            action: "lg"
        }, function (err, data){
            if (err) {
                reject(err);
            } else {
                resolve (data);
            }
        });
    });
}

/**
 * Average Distance Analysis in Phoenix child process
 * @param {string} file - Path to file for analysis
 * @param {string} [outputPath="/temp"] - Path to output folder and file
 * @return {Promise} - terminal outputs or error
 */
function avgdist (file, outputPath){
    return new Promise((resolve, reject) => {
        phoenixHandler({
            file: file,
            output:  outputPath || __dirname + "/temp",
            action: "-avgdist"
        }, function (err, data){
            if (err) {
                reject(err);
            } else {
                resolve (data);
            }
        });
    });
}

/**
 * Copy-Move Detection in Phoenix child process
 * @param {string} file - Path to file for analysis
 * @param {number} [reatin=4] - retain
 * @param {number} [qcoeff=4] - qcoeff
 * @param {string} [outputPath="/temp"] - Path to output folder and file
 * @return {Promise} - terminal outputs or error
 */
function copymove (file, retain, qcoeff, outputPath){
    return new Promise((resolve, reject) => {
        phoenixHandler({
            file: file,
            output:  outputPath || __dirname + "/temp",
            action: `copymove ${retain ? retain : ""} ${qcoeff ? qcoeff : ""}`
        }, function (err, data){
            if (err) {
                reject(err);
            } else {
                resolve (data);
            }
        });
    });
}

/**
 * HSV Colorspace Histogram Analysis in Phoenix child process
 * @param {string} file - Path to file for analysis
 * @param {number} [whitebg=0] - WHite Background
 * @param {string} [outputPath="/temp"] - Path to output folder and file
 * @return {Promise} - terminal outputs or error
 */
function hsv (file, whitebg, outputPath){
    return new Promise((resolve, reject) => {
        phoenixHandler({
            file: file,
            output:  outputPath || __dirname + "/temp",
            action: whitebg ? `hsv ${whitebg}` : "hsv"
        }, function (err, data){
            if (err) {
                reject(err);
            } else {
                resolve (data);
            }
        });
    });
}

/**
 * Lab Colorspace Histogram Analysis in Phoenix child process
 * @param {string} file - Path to file for analysis
 * @param {number} [whitebg=0] - WHite Background
 * @param {string} [outputPath="/temp"] - Path to output folder and file
 * @return {Promise} - terminal outputs or error
 */
function lab (file, whitebg, outputPath){
    return new Promise((resolve, reject) => {
        phoenixHandler({
            file: file,
            output:  outputPath || __dirname + "/temp",
            action: whitebg ? `lab ${whitebg}` : "lab"
        }, function (err, data){
            if (err) {
                reject(err);
            } else {
                resolve (data);
            }
        });
    });
}

/**
 * Lab Colorspace Histogram Analysis in Phoenix child process, 
 * faster but less accurate version (256x256 instead of 1024x1024 output)
 * @param {string} file - Path to file for analysis
 * @param {number} [whitebg=0] - WHite Background
 * @param {string} [outputPath="/temp"] - Path to output folder and file
 * @return {Promise} - terminal outputs or error
 */
function labfast (file, whitebg, outputPath){
    return new Promise((resolve, reject) => {
        phoenixHandler({
            file: file,
            output:  outputPath || __dirname + "/temp",
            action: whitebg ? `lab ${whitebg}` : "lab"
        }, function (err, data){
            if (err) {
                reject(err);
            } else {
                resolve (data);
            }
        });
    });
}

/**
 * Runs all the availbale commands ina  parallel way in Phoenix child process
 * @param {string} file - Path to file for analysis
 * @return {Promise} - terminal outputs or error
 */
function fullAnalysis (file) {
    const tasks = [errorLevelAnalysis, luminanceGradient, avgdist, copymove, hsv, lab];
    const promiseArray = tasks.map(task => {
        console.log(`[info][phoenix process] ${task.name}: started`);
        return task(file);
    });
    
    return new Promise((resolve, reject) => {
        Promise.all(promiseArray)
        .then(resolve)
        .catch(reject);
    });
}

module.exports = {errorLevelAnalysis, luminanceGradient, avgdist, copymove, hsv, lab, labfast, fullAnalysis};