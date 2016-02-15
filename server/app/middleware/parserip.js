var Q = require('q');
var fs = require('fs');
var path = require("path")
var ver1 = '/api/v1';
var inSubnet = require('../../../node_modules/insubnet/insubnet')

module.exports = function (req, res) {
	var deferred = Q.defer();

	console.log('parserip: start')


	// step 1 - load ip address from devices
	// load ip address json from assets
	//
	console.log('objectload: deviceip status: start')

	var deviceIpFilePath = '/assets/ipsubnet.json'
	var deviceIpFilePathRead = path.join(__dirname, '../', deviceIpFilePath)

	var deviceip = require(deviceIpFilePathRead);

	//console.log(deviceip.device1)

	console.log('objectload: deviceip status: end')

	// step 1 - load ip address from devices
	// load ip address json from assets
	//
	console.log('objectload: deviceip status: start')

	var deviceListPath = '/assets/device.json'
	var deviceListPathRead = path.join(__dirname, '../', deviceListPath)

	var deviceList = require(deviceListPathRead);

	//console.log(deviceList)

	console.log('objectload: deviceip status: end')



	// step 2 - load ip address from routelist.json
	// load ip address json from assets
	//
	console.log('objectload: routelist status: start')

	var routelistFilePath = '/assets/routelist.json'
	var routelistFilePathRead = path.join(__dirname, '../', routelistFilePath)

	var routelist = require(routelistFilePathRead);

	console.log(routelist)

	console.log('objectload: routelist status: end')

	// step 3 - load ip address from routelist.json
	// load ip address json from assets
	//
	console.log('objectload: routersubnet status: start')

	var routersubnetFilePath = '/assets/routersubnet.json'
	var routersubnetFilePathRead = path.join(__dirname, '../', routersubnetFilePath)

	var routersubnet = require(routersubnetFilePathRead);

	//console.log(routersubnet[21])

	console.log('objectload: routersubnet status: end')

	// step 4 - load ip address from routelist.json
	// load ip address json from assets
	//
	console.log('objectload: device status: start')

	var deviceFilePath = '/assets/device.json'
	var deviceFilePathRead = path.join(__dirname, '../', deviceFilePath)

	var device = require(deviceFilePathRead);

	//console.log(routersubnet)

	console.log('objectload: device status: end')






	// Function 1
	// Take in string, return entity.ip and entity.prefix mask
	//

	var prefixToIPAdress = function (stringOriginal) {

		resultObject = {}
		resultObject.original = stringOriginal

		var stringArray = []

		var stringArray = stringOriginal.split("/");

		//console.log(stringArray)

		resultObject.ip = stringArray[0]
		resultObject.mask = stringArray[1]

		//console.log(resultObject.mask)

		return resultObject
	}

	// Function 2
	// Check to see if the ip address is in the subnet

	var testIp1 = prefixToIPAdress(deviceip.device1.ipaddress)

	//console.log(inSubnet.Auto(testIp1.ip, deviceip.device1.ipaddress))

	// Function 2
	// Check to see if the ip address is in the subnet

	var newListObject = []
	var tmpObject = {}

	for (var prop in routersubnet) {
		//console.log(deviceip[prop])
		if (routersubnet[prop].hasOwnProperty('listSubnet')) {
			//console.log(routersubnet[prop].listSubnet)



			for (var listSubnetIteration in routersubnet[prop].listSubnet) {
				//console.log(routersubnet[prop].listSubnet[listSubnetIteration])

				var tmpObject = {}


				tmpObject.description = routersubnet[prop].listSubnet[listSubnetIteration]

				//console.log(routersubnet[prop].listSubnet[listSubnetIteration])

				tmpObject = prefixToIPAdress(tmpObject.description)


				//console.log(tmpObject)

				newListObject.push(tmpObject)

			}

		}

	}

	//console.log(newListObject)

	var initialPrefx = { original: '10.0.0.0/8',
  ip: '10.0.0.0',
  mask: '8'}


	newListObjectlen = newListObject.length;
	deviceListlen = deviceList.length

	for (j=0; j<newListObjectlen; ++j) {
		if (newListObject[j].hasOwnProperty('mask')) {
			//console.log(typeof(newListObject[j].mask))
		}

	}


	//console.log(newListObject)
	var ipPrefixSeed = 0

	for (i=0; i<33; ++i) {
		for (j=0; j<newListObjectlen; ++j) {
			if (newListObject[j].hasOwnProperty('mask')) {


				if (newListObject[j].mask == i) {

					//console.log(newListObject[j])

					//console.log(inSubnet.Auto(newListObject[j].ip, initialPrefx.original))



				}

			}
		} 

	}


	for(var i = 36; i>0; i--) {
		console.log('Iteration Number ' + i)

		var k = i
		
		k--

		for (j=0; j<newListObjectlen; ++j) {
			//console.log(deviceListlen)

			if (newListObject[j].hasOwnProperty('mask')) {

				//newListObject[j].arr = {}


								for (p=0; p<deviceListlen; ++p) {
									//console.log('ya finally hit' + p)
									if (!deviceList[p].hasOwnProperty('allocated')) {
										if (inSubnet.Auto(deviceList[p].node, newListObject[j].original)) {

											newListObject[j][deviceList[p].node] = deviceList[p]

											deviceList[p].allocated = 'yes'

										}


									}


								}


				if (newListObject[j].mask == i) {

					for (l=0; l<newListObjectlen; ++l) {

						if (newListObject[l].hasOwnProperty('mask')) {

							if (newListObject[l].mask < i) {

								if (inSubnet.Auto(newListObject[j].ip, newListObject[l].original)) {

									//console.log(inSubnet.Auto(newListObject[j].ip, newListObject[l].original))


									newListObject[l].subordinate = newListObject[j]

									newListObject[j].cleanup = 'yes'


								}





							}





						}


//





					}

				}



			}




		}


    // do stuff with i 
	}

	var secondObjectList = []

	for (j=0; j<newListObjectlen; ++j) {

		if (!newListObject[j].hasOwnProperty('cleanup')) {

			secondObjectList.push(newListObject[j])

		}

	}

	console.log('start object')

	//console.log(JSON.stringify(secondObjectList))
	//console.log(secondObjectList.length)
	//console.log(newListObject.length)

	fs.writeFileSync('./data.json', JSON.stringify(secondObjectList));

	fs.writeFile('helloworld.txt', JSON.stringify(secondObjectList), function (err) {
	  if (err) return console.log(err);
	  console.log('Hello World > helloworld.txt');
	});

	console.log('parserip: end')
	return deferred.promise;
};