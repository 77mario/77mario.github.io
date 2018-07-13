	//BLE
	
	let staticButton = document.getElementById('staticButton');
    let characteristicCache = null;
    let deviceCache = null;
    var command = "000";
	
	var timer = new Timer(function() {
		if (command != "000"){
			writeToCharacteristic(characteristicCache, command);
			console.log(command);
            command = "000";
		}else{
            console.log(command);
        }	
	}, 300);

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
    
    function calibra_acc(){
        document.getElementById("calibrazione-text").innerHTML = "Calibrazione effettuata!";;
		command = "300";
        
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
            document.getElementById("connessione-text").innerHTML = "Connesso con Smart Insole!";;
			return characteristic.startNotifications().
			then(() => {
			characteristic.addEventListener('characteristicvaluechanged',
	    		handleCharacteristicValueChanged);
			});

	}
 


    function staticFunction(){
        var seconds = document.getElementById("static-seconds").value.toString();
			
			command = "1"+seconds;
			/*setTimeout(function(){
				timer.stop();
			}, 250);*/
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

	function log(data, type = '') {
       //{\"code\" : \"1\", \"weight_perc\" : {\"avan_sx\":\"%d\",\"avan_dx\":\"%d\",\"back\":\"%d\"}\"}		
        var json_data = JSON.parse(data);
        
        var code = json_data.code;
        
        if (code =="1"){
            var weight_perc = json_data.weight_perc; // Array;
            console.log(weight_perc);
            avan_sx = weight_perc[0];
            avan_dx = weight_perc[1];
            back = weight_perc[2];
            //Update static chart
            addStaticData(static_chart,avan_sx,avan_dx,back);
            console.log("tatic data added");

            //Update heatmap
            generateHeatmap(avan_sx,avan_dx,back);            
            console.log("Heatmap Generated");

        }
	}

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
