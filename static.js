//Variabili valutazione statica
var n_statico = 1;
var static_chart = "";


//Inizializzazione grafico

var barChartData = {
            labels: ['Valori Ideali'],
			datasets: [{
				label: 'Avampiede',
				backgroundColor: '#e04848',
				borderColor: '#e04848',
				borderWidth: 1,
                data:[45]
			}, {
				label: 'Retropiede',
				backgroundColor: '#4864e0',
				borderColor: '#4864e0',
				borderWidth: 1,
                data:[-55]
			}]

		};
static_chart = new Chart(static_ctx, {
				type: 'bar',
				data: barChartData,
				options: {
					responsive: true,
					legend: {
						position: 'top',
					},
					title: {
						display: true,
						text: 'Valutazione statica (Valori ideali : AVAMPIEDE 45% RETROPIEDE 55%) - Tolleranza 4%'
					}
				},

    // Configuration options go here
            
    options: {
        
        tooltips: {
						mode: 'index',
						intersect: false
					},
					responsive: true,
					scales: {
						xAxes: [{
							stacked: true,
						}],
						yAxes: [{
							stacked: true,
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
        value: 45,
        borderColor: 'red',
        borderWidth: 1,
        label: {
          enabled: false,
          content: 'Avampiede'
        }
      },{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value:-55,
        borderColor: 'blue',
        borderWidth: 1,
	label: {
          enabled: false,
          content: 'Retropiede'
        }
      }]
    }
  }
});

//Aggiungi valutazione statica
function addStaticData(chart,av_sx,av_dx,back,time){
                var n = n_statico;
                n_statico++;
                var label = n+"° - "+time+" s";
				chart.data.labels.push(label);

				chart.data.datasets[0].data[n] = av_sx+av_dx;
  				chart.data.datasets[1].data[n] = -back;

				chart.update();
                static_pre_download();
};

//Generate function
function generateHeatmap(av_sx,av_dx,back){          
          var t = [];
          t.push({ x: 40, y:120, value: av_sx, radius: 25 });
          t.push({ x: 120, y: 140, value: av_dx, radius: 25});
          t.push({ x: 75, y:300, value: back, radius: 25 });

          // set the generated dataset
          heatmap.setData({
            min: 0,
            max: 100,
            data: t
          });
};

//Add data to static table

function addDataStaticTable(av,back,duration){
        
        var table = document.getElementById("static-history-body");
        
        var tr = document.createElement("tr");
        if(back>51 && back<59){
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
  		var av_cell = tr.insertCell(1);
        var av_text = document.createTextNode(av);
        av_cell.appendChild(av_text);
		var back_cell = tr.insertCell(2);
        var back_text = document.createTextNode(back);
        back_cell.appendChild(back_text);
        var av_kg_cell = tr.insertCell(3);
        var av_kg_text = document.createTextNode(av/100*tot);
        av_kg_cell.appendChild(av_kg_text);
		var back_kg_cell = tr.insertCell(4);
        var back_kg_text = document.createTextNode(back/100*tot);
        back_kg_cell.appendChild(back_kg_text);
		var time_cell = tr.insertCell(5);
        var time_text = document.createTextNode(duration);
        time_cell.appendChild(time_text);
        tr.appendChild(td);
        table.appendChild(tr); 


}
//Download image
function static_pre_download(){
var url_base64_static = document.getElementById("static_chart").toDataURL("image/jpeg");
document.getElementById("download_static_chart").href = url_base64_static;
}

//Remove rows from table
function remove_static_history_rows(){
    $("#static_history td").remove(); 

    var table = document.getElementById("dynamic-history-body");
    var tr = document.createElement("tr");
    tr.classList.add("success");
    
    var td = document.createElement("td");
  	var time_cell = tr.insertCell(0);
    var time_text = document.createTextNode("Valori ideali");
    time_cell.appendChild(time_text);
    var av_cell = tr.insertCell(1);
    var av_text = document.createTextNode("45%");
    av_cell.appendChild(av_text);
	var back_cell = tr.insertCell(2);
    var back_text = document.createTextNode("55%");
    back_cell.appendChild(back_text);
    var av_kg_cell = tr.insertCell(3);
    var av_kg_text = document.createTextNode("-");
    av_kg_cell.appendChild(av_kg_text);
	var back_kg_cell = tr.insertCell(4);
    var back_kg_text = document.createTextNode("-");
    back_kg_cell.appendChild(back_kg_text);
	var time_cell = tr.insertCell(5);
    var time_text = document.createTextNode("51");
    time_cell.appendChild(time_text);
    tr.appendChild(td);
    table.appendChild(tr); 
}