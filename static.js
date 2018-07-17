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
function addStaticData(chart,av_sx,av_dx,back){
                var n = n_statico;
                n_statico++;
                var label = n+"°";
				chart.data.labels.push(label);

				chart.data.datasets[0].data[n] = av_sx+av_dx;
  				chart.data.datasets[1].data[n] = -back;

				chart.update();
};

//Generate function
function generateHeatmap(av_sx,av_dx,back){          
          var t = [];
          t.push({ x: 40, y:120, value: 40, radius: 25 });
          t.push({ x: 120, y: 140, value: 20, radius: 25});
          t.push({ x: 75, y:300, value: 40, radius: 25 });

          // set the generated dataset
          heatmap.setData({
            min: 0,
            max: 100,
            data: t
          });
};

function download_static_chart(){ 
        var imgData = document.getElementById('static_chart').toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("static_evaluation.pdf");
    };