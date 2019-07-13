const fs = require('fs')
const util = require('util');

const removeFile = util.promisify(fs.unlink);

function removeRelatedFiles (uuid) {
    const forensic = ['', '_ela', '_lg', '_avgdist', '_copymove', '_hsv', '_lab'];
    const filesToRemove = forensic.map(type => removeFile(`${__dirname + '/../temp'}/${uuid}${type}.png`))
    return Promise.all(filesToRemove)
}


module.exports = {removeRelatedFiles}