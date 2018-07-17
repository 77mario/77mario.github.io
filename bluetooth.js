//Variabili js  	
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
        
        //BLE
	   let connectBtn = document.getElementById('connect');
	   let staticButton = document.getElementById('staticButton');
        
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
function start_dynamic_evaluation(){
		var dyn_btn = document.getElementById("dynamicButton");
        if(document.getElementById("dynamicButton").innerHTML == "Stop"){
            command = "201";
            dyn_btn.innerHTML = "Dynamic Evaluation";
            dyn_btn.classList.add('btn-warning');
            dyn_btn.classList.remove('btn-danger');
            enableButtons();
        }else{
            dyn_btn.innerHTML = "Stop";
            dyn_btn.classList.remove('btn-warning');
            dyn_btn.classList.add('btn-danger');
            command = "200";
            disableButtons()
            dyn_btn.disabled = false;
        }
}
   
function calibra_acc(){
        document.getElementById("calibrazione-text").innerHTML = "Calibrazione effettuata!";
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
            document.getElementById("connessione-text").innerHTML = "Connesso con Smart Insole!";
            enableButtons();

			return characteristic.startNotifications().
			then(() => {
			characteristic.addEventListener('characteristicvaluechanged',
	    		handleCharacteristicValueChanged);
			});

}
 


function staticFunction(){
        
        disableButtons();

        var seconds = document.getElementById("static-seconds").value.toString();
	    var tmp = "" + seconds;
        if (tmp>100 && tmp<199){
            command = "1"+seconds;
        }else{
            enableButtons();
        }
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
            var avan_sx = weight_perc.avan_sx;
            var avan_dx = weight_perc.avan_dx;
            var back = weight_perc.back;

            //Update static chart
            addStaticData(static_chart,avan_sx,avan_dx,back);
            console.log("Static data added");

            //Update heatmap
            generateHeatmap(avan_sx,avan_dx,back);            
            console.log("Heatmap Generated");
            
            enableButtons();

        }else if (code=="2"){
            var weight_perc = json_data.weight_perc; // Array;
            var avan_sx = weight_perc.avan_sx;
            var avan_dx = weight_perc.avan_dx;
            var back = weight_perc.back;

            //Update static chart
            addDynamicData(dynamic_chart,avan_sx,avan_dx,back);
            console.log("Dynamic data added");
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

function disableButtons(){
        
        document.getElementById("calibrationButton").disabled = true;
        document.getElementById("staticButton").disabled = true;
        document.getElementById("dynamicButton").disabled = true;
        
}

function enableButtons(){
        
        document.getElementById("calibrationButton").disabled = false;
        document.getElementById("staticButton").disabled = false;
        document.getElementById("dynamicButton").disabled = false;
        
}