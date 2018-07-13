//Variabili valutazione statica
var n_statico = 0;
var static_chart = "";
var avan_sx ="";
var avan_dx ="";
var back ="";

//Inizializzazione grafico

var barChartData = {
			datasets: [{
				label: 'Avampiede',
				backgroundColor: '#e04848',
				borderColor: '#e04848',
				borderWidth: 1
			}, {
				label: 'Retropiede',
				backgroundColor: '#4864e0',
				borderColor: '#4864e0',
				borderWidth: 1
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
							stacked: true
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
function addStaticData(chart,av_sx,av_dx,back){
                var n = n_statico++;
                var label = n+"°";
				chart.data.labels.push(label);

				chart.data.datasets[0].data[n] = av_sx+av_dx;
  				chart.data.datasets[1].data[n] = -back;

				chart.update();
};
