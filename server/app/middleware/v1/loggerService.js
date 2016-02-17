
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "myapp"});

var controller = {

	info: function (filename, message) {
		log.info(filename, message)
	}

}

module.exports = exports = controller