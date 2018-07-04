	//BLE
	let characteristicCache = null;


	function connect() {
			return (deviceCache ? Promise.resolve(deviceCache) :
		  requestBluetoothDevice()).
		  then(device => connectDeviceAndCacheCharacteristic(device)).
		  then(characteristic => startNotifications(characteristic)).
		  catch(error => console.log(error));
	}

	function requestBluetoothDevice() {

		  return navigator.bluetooth.requestDevice({
		    filters: [{services: [0xFFE0]}],
		  }).
		      then(device => {
		        deviceCache = device;
		        return deviceCache;
		    	});
	}

	function connectDeviceAndCacheCharacteristic(device) {
		  if (device.gatt.connected && characteristicCache) {
		    return Promise.resolve(characteristicCache);
		  }

		  return device.gatt.connect().
		      then(server => {
		        return server.getPrimaryService(0xFFE0);
		      }).
		      then(service => {
		        return service.getCharacteristic(0xFFE1);
		      }).
		      then(characteristic => {
		        characteristicCache = characteristic;

		        return characteristicCache;
		      });
	}

	function startNotifications(characteristic) {
			return characteristic.startNotifications().
			then(() => {
			characteristic.addEventListener('characteristicvaluechanged',
	    		handleCharacteristicValueChanged);
			});
	}

