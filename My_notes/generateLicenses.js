// generateLicenses.js
var crawler = require('npm-license-crawler'),
    options = {
        start: ['../..'],
        exclude: ['.'],
        json: 'licenses.json',
        unknown: true
    };

crawler.dumpLicenses(options,
    function(error, res){
        if (error) {
            console.error("Error:", error);
        }
        else {
            console.dir(res);
        }
    }
);