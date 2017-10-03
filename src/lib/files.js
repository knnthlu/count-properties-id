var fs = require('fs'),
readline = require('readline'),
mkdirp = require('mkdirp');

exports.getFileDataAsLines = function (dir) {
    var fullPath = dir;
    if (!fs.existsSync(fullPath)) {
        console.error('The file identified by the full path [ ' + fullPath + ' ] is not found.');
        return;
    }

    var inputStream = fs.createReadStream(fullPath);
    var reader = readline.createInterface({
        input: inputStream
    });

    var lines = [];
    reader.on('line', function (line) {
        lines.push(line);
    });

    var promise = new Promise(function (resolve) {
        reader.on('close', function () {
            resolve(lines);
        });
    });

    return promise;
};