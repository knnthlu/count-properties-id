var files = require('./files');
var fs = require('fs');
var glob = require('glob');  
var all_strings = [];

exports.parsing = function(options){
    var strings = [];
    glob(options.src + '/**/*.properties', function(err, _files) {
        var propertiesFiles = _files;
        if (propertiesFiles) {
            saveAllFiles(propertiesFiles, 0, {}, options);
        }
        
    });
}
var saveAllFiles = function(data, cnt, param_lines, options){
    var promise = files.getFileDataAsLines(data[cnt]);
    var output = {};
    var _temp = [];
    
    promise.then(function (lines) {
        var output = {};
        var _temp = [];
        
        lines.forEach(function (line) {
            var divider = line.indexOf('='); 
            var key = line.slice(0, divider);
            var value = line.slice(divider + 1);
            key = key.replace(/\s/g, '');
            if(key != ""){
                all_strings.push(key);
            }
        });
        
        if(cnt < data.length - 1){
            saveAllFiles(data, cnt+1, JSON.stringify(output, null, 4), options);
        } else {
            var  count = {};
            all_strings.forEach(function(i) { 
                count[i] = (count[i]||0) + 1;
            });
            var writeStream = fs.createWriteStream(options.dist + '/master_file.json', {
                autoClose: false
            });
            writeStream.write(JSON.stringify(count, null, 4));
            writeStream.end();
        }
    });
}

exports.setOption = function(options){
    var location = {
        src: options.src, 
        dist: options.dist,
        limit: 1 
    }
    if(options.hasOwnProperty('limit')){
        location.limit = options.limit;
    }
    exports.parsing(location);
}