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
                n_passo++;
                
                var label = n+"°";
				dynamic_chart.data.labels.push(label);
                
                if(back>45){
                    dynamic_chart.data.datasets[0].data[n] = -back+45;
                }else if(back<45){
                   dynamic_chart.data.datasets[0].data[n] = (av_sx+av_dx-55);
                }else{
                    dynamic_chart.data.datasets[0].data[n] = 0;
                }

				dynamic_chart.update();
};
