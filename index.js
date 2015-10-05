exports.isMonitoringModule = true;
exports.hasCron = true;

var netstat = require('node-netstat');
var running = false;

exports.executeCron = function (callback) {
    getNetstatData(function(err, data){
        if(err)
            callback(err);
        else
            callback(null, data);
    });
}

var addData = function(obj,item,name,keyname) {
	if(!obj[name][eval('item.' +keyname)]) {
		obj[name][[eval('item.' +keyname)]] = 1;
	} else {
		obj[name][[eval('item.' +keyname)]]++;
	}
	return obj;
}

var getNetstatData = function(callback){
   
	var lines = [];

	netstat({done : function(){
		
		var returnObj = {
			"total" : lines.length,
			"protocols" : {},
			"addresses" : {},
			"states" : {}
		};

		for (var i=0;i<lines.length;i++) {
			returnObj = addData(returnObj, lines[i], 'protocols','protocol');
			returnObj = addData(returnObj, lines[i], 'states','state');
			returnObj = addData(returnObj, lines[i], 'addresses','remote.address');
		}

		callback(null, returnObj);

	}}, function (data) {
		lines.push(data);
	});
	

}