//Variabili valutazione statica
var n_passo = 1;
var dynamic_chart = "";


//Inizializzazione grafico

function create_dynamic_chart(){
if (dynamic_chart != ""){
    dynamic_chart.clear();
    n_passo=1;
    }
dynamic_chart = new Chart(dynamic_ctx, {
	

    // The type of chart we want to create
        type: 'line',
	

    // The data for our dataset
    data: {
        labels: ["0"],
        datasets: [{
            label: "Bilanciamento piede",
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgb(50, 10, 10)',
	    lineTension: 0,
            data: [0],
        }]
    },

    // Configuration options go here
    options: {
scales: {
						
						yAxes: [{
                            ticks: {
                                callback: function(tick) {
                                    return tick.toString() + '%';
                                }
                            }
						}]
					},
    annotation: {
      annotations: [{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 4,
        borderColor: 'green',
        borderWidth: 1
      },{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: -4,
        borderColor: 'green',
        borderWidth: 1
      }]
    }
  }
});
}

//Aggiungi valutazione dinamica
function addDynamicData(dynamic_chart,av_sx,av_dx,back){
                
                var n = n_passo;
                var corretto = false;
                n_passo++;
                document.getElementById("numero_passi").innerHTML = n;
                
    
                var label = n+"°";
				dynamic_chart.data.labels.push(label);
                
                if(back>45){
                    if(back<49){
                        corretto = true;   
                    }
                    dynamic_chart.data.datasets[0].data[n] = -back+45;
                }else if(back<45){
                    if(av_sx+av_dx-55<4){
                        corretto = true;   
                    }
                   dynamic_chart.data.datasets[0].data[n] = (av_sx+av_dx-55);
                }else{
                    dynamic_chart.data.datasets[0].data[n] = 0;
                }
                if(corretto){
                   var n = parseInt(document.getElementById("numero_passi_corretti").innerHTML) + 1;
                   document.getElementById("numero_passi_corretti").innerHTML = n;
                }else{
                    var n = parseInt(document.getElementById("numero_passi_sbagliati").innerHTML) + 1;
                   document.getElementById("numero_passi_sbagliati").innerHTML = n;
                }
				dynamic_chart.update();
                dynamic_pre_download();
    
    
    
    
};
//Add data to dynamic table

function addDataDynamicTable(av,back){
        
        var table = document.getElementById("dynamic-history-body");

        var tr = document.createElement("tr");
        if(back>=41 && back<=49){
           tr.classList.add("success");
        }else{
           tr.classList.add("danger");
        }
 
        var td = document.createElement("td");
  		var time_cell = tr.insertCell(0);
        var date = new Date(Date.now());
        var time_string = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" - "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        var time = document.createTextNode(time_string);
        time_cell.appendChild(time);
        var back_cell = tr.insertCell(1);
        var back_text = document.createTextNode(back);
        back_cell.appendChild(back_text);
  		var av_cell = tr.insertCell(2);
        var av_text = document.createTextNode(av);
        av_cell.appendChild(av_text);
        tr.appendChild(td);
        table.appendChild(tr); 


}
//Download image
function dynamic_pre_download(){
    var url_base64_dynamic = document.getElementById("dynamic_chart").toDataURL("image/jpeg");
    document.getElementById("download_dynamic_chart").href = url_base64_dynamic;
}

//Remove rows from table
function remove_dynamic_history_rows(){
    $("#dynamic_history td").remove();
    
    var table = document.getElementById("dynamic-history-body");
    var tr = document.createElement("tr");
    tr.classList.add("success");
    
    var td = document.createElement("td");
  	var time_cell = tr.insertCell(0);
    var time_text = document.createTextNode("Valori ideali");
    time_cell.appendChild(time_text);
    var back_cell = tr.insertCell(1);
    var back_text = document.createTextNode("45%");
    back_cell.appendChild(back_text);
    var av_cell = tr.insertCell(2);
    var av_text = document.createTextNode("55%");
    av_cell.appendChild(av_text);
    tr.appendChild(td);
    table.appendChild(tr); 
}