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
				borderWidth: 1,
                data:[45]
			}, {
				label: 'Retropiede',
				backgroundColor: '#4864e0',
				borderColor: '#4864e0',
				borderWidth: 1,
                data:[55]
			}]

		};
static_chart = new Chart(static_ctx, {
    
				label: 'Valori Ideali',
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
                var n = ++n_statico;
                var label = n+"°";
				chart.data.labels.push(label);

				chart.data.datasets[0].data[n] = av_sx+av_dx;
  				chart.data.datasets[1].data[n] = -back;

				chart.update();
};

//Generate function
function generateHeatmap(av_sx,av_dx,back){
          // randomly generate extremas
          var extremas = [0,100];
          var max = Math.max.apply(Math, extremas);
          var min = Math.min.apply(Math,extremas);
          var t = [];
          
            var c = ((Math.random()* max-min) >> 0) + min;
            var r = (Math.random()* 80) >> 0;

            t.push({ x: 40, y:120, value: av_sx, radius: 30 });
            t.push({ x: 120, y: 140, value: av_dx, radius: 30});
            t.push({ x: 75, y:300, value: back, radius: 30 });

          var init = +new Date;
          // set the generated dataset
          heatmap.setData({
            min: 0,
            max: 100,
            data: t
          });
          console.log('took ', (+new Date) - init, 'ms');
        };