//Variabili valutazione statica
var n_passo = 1;
var dynamic_chart = "";


//Inizializzazione grafico

//Create gradient
//var gradient = ctx.createLinearGradient(0, 0, 0, 100);
//gradient.addColorStop(0, 'red');
//gradient.addColorStop(0.95, 'yellow');
//gradient.addColorStop(1, 'green');
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
    
    
    
    
    
};

function download_dynamic_chart(){ 
        var imgData = document.getElementById('dynamic_chart').toDataURL("image/png", 1.0);
        var pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("dynamic_evaluation.pdf");
};