//-------------------------------------------------------------
// Gráfico de Total de Entradas
//-------------------------------------------------------------
const graficoTotalEntradas = (() => {

    let chart = null;
    let label = null;
    let options = null;
  
    function getData(entradasPorTipo) {
  
      var valores = new Array();
      valores.push(new Array("Tipo", "Quantidade"))
      entradasPorTipo.forEach(e =>
        valores.push(new Array(e.tipo, e.total))
      );
      return valores;
  
    }
  
  
    function initFunction(container, totalEntradas, entradasPorTipo) {
  
  
      if (totalEntradas == undefined || entradasPorTipo == undefined) {
        return;
      }
  
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback( () => {
            options = {
            
              width: '50px',
              pieHole: 0.6,
              colors: ['#c8e6c9', '#86bd82', '#43a047', '#1c800a'],
              pieSliceText: ['none'],
              chartArea: { left: 1, top: 1, width: "100%", height: "100px" }
              ,legend: {position: 'bottom'}
            };
          
            chart = new google.visualization.PieChart(
              document.getElementById(container)
            );
  
            chart.draw(google.visualization.arrayToDataTable(getData(entradasPorTipo)), options);
        });
  
    }
  
  
  
  
    function updateFunction(totalEntradas, entradasPorTipo) {
  
      if (chart == null) {
        return;
      }
      chart.draw(google.visualization.arrayToDataTable(getData(entradasPorTipo)), options);
    }
  
    return {
      init: initFunction
      , update: updateFunction
    }
  
  
  })()