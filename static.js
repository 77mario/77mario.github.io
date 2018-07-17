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
static_chart.render();


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


function download_static_chart(){ 
        // draw background
        var backgroundColor = 'white';
        Chart.plugins.register({
        beforeDraw: function(c) {
        var ctx = c.chart.ctx;
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, c.chart.width, c.chart.height);
    }});
		static_chart.toBlob(function(blob) {
        saveAs(blob, "pretty image.png");
    });
};