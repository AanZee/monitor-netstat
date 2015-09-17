exports.isMonitoringModule = true;
exports.hasCron = true;

var request = require("request");
var responseMessaging = require('monitor-response');
var parseString = require('xml2js').parseString;

exports.executeCron = function (callback) {
    getNetstatData(function(err, data){
        if(err)
            callback(err);
        else
            callback(null, data);
    });
}

var getNetstatData = function(callback){
   
    callback({test: 123});

}