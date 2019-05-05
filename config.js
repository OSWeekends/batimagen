var config = {
    thirdPartiesEnabled: process.env.TP_ENABLED || false,
    thirdParties: {
        virustotal: process.env.TP_VIRUSTOTAL || false,
        googleVision: process.env.TP_GVISION || false
    },
    paths: {
        temp: `${__dirname}/temp`
    },
    token: {
        virustotal: process.env.TP_VIRUSTOTAL || ""
    }
};

module.exports = config;