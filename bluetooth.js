	//BLE
	
	let staticButton = document.getElementById('staticButton');
    let characteristicCache = null;
    let deviceCache = null;
    var command = "1";
	var last_command = "0";
	
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
			command = "1";
			timer.start();
		}
	}

    let readBuffer = '';

	function handleCharacteristicValueChanged(event) {
		let value = new TextDecoder().decode(event.target.value);

	  	for (let c of value) {
	    	if (c === '\n') {
		      let data = readBuffer.trim();
		      readBuffer = '';

		      if (data) {
		        receive(data);
		      }
		    }
		    else {
		      readBuffer += c;
		    }
		  }
	}		
    function receive(data) {
  		log(data, 'in');
	}

	/*function log(data, type = '') {
		var n_div = $('.in').length;
		if (n_div >= 6){
			for (var i = 0; i<n_div-6; i++){
				$('.in')[0].remove();
			}
		}
		terminal.insertAdjacentHTML('beforeend',
		'<div' + (type ? ' class="' + type + '"' : '') + '>' + data + '</div>');

	}*/

	function writeToCharacteristic(characteristic, str) {
			characteristic.writeValue(str2ab(str));
	}

	function str2ab(str){
		let buf = new ArrayBuffer(str.length); // 2 bytes for each char
		let bufView = new Uint8Array(buf); //make sure buffer array is of type uint8
		for (let i=0, strLen=str.length; i < strLen; i++) {
			bufView[i] = str.charCodeAt(i);
		}
		return buf;
	}
