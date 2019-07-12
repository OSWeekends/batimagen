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
        virustotal: process.env.VIRUSTOTAL || ""
    }
};

config.services = {thirdParties: Boolean(config.thirdParties) }

for(let service in config.thirdParties) {
    config.services[service] = Boolean(config.thirdParties[service])
}

module.exports = config;