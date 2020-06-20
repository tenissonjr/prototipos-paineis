//-------------------------------------------------------------
// Gráfico de Total de Entradas por hora
//-------------------------------------------------------------
const graficoEntradasPorHora = (() => {

    let chart = null;
    let options = null;
    let series;
  
    function getData(entradasPorHora){
  
            var data = new google.visualization.DataTable();
            data.addColumn('timeofday', 'Hora');
            data.addColumn('number', 'Registros de entrada');

            data.addRows(entradasPorHora.length);
            var i=0;
            entradasPorHora.forEach(e => {
                data.setCell(i, 0,[ e.date.getHours(),0,0]);

                data.setCell(i, 1, e.value);
                i++;
             });
        return data ;
  
    }
  
    function initFunction(container, entradasPorHora) {
  
      if (entradasPorHora == null) {
        return;
      }
  
      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(() => {
  
            options = {
              legend: 'none',
              hAxis: {
                title: 'Hora',
                format: 'HH:mm',
                viewWindow: {
                  min: [7, 30, 0],
                  max: [22, 30, 0]
                }
              },
              vAxis: {
                title: ''
              }
              ,colors: [ '#1c800a']
              ,chartArea: { left: 25, top: 5, width: "90%", height: "90px" }
            };
      
             chart = new google.visualization.LineChart(
              document.getElementById(container)
            );
      
            chart.draw(getData(entradasPorHora), options);
      });
  
  
    }
  
    function updateFunction(entradasPorHora) {
  
      if (chart == null) {
        return;
      }
    
      chart.draw(getData(entradasPorHora), options);
    }
  
    return {
      init: initFunction
      , update: updateFunction
    }
  
  
  
  
  })()
  