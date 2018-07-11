	//BLE
	
	let staticButton = document.getElementById('staticButton');
    let characteristicCache = null;
    let deviceCache = null;
    var last_command = "000#000#";
	
	var timer = new Timer(function() {
		if (last_command != command){
			writeToCharacteristic(characteristicCache, command);
			console.log(command);
			last_command = command;
		}	
	}, 100);

    window.onload = () => {
		if(!navigator.bluetooth){
			alert('Your current browser does not support web bluetooth or is not enabled. Please use the latest version of Chrome and enable Web Bluetooth under chrome://flags');
			connectBtn.disabled = true;
		}
		connectBtn.onclick = connect;
	}
    
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
 
	var timesClicked = 2;

    function staticFunction(){
		if (timesClicked%2==0) {
			timesClicked++;
			command = "100#00#";
			setTimeout(function(){
				timer.stop();
			}, 250);
		}else{
			timesClicked++;
			command = "101#00#";
			timer.start();
		}
	}
