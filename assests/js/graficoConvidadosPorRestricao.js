//-------------------------------------------------------------
// Gráfico de Total de Convidados por Restrição
//-------------------------------------------------------------
const graficoConvidadosPorRestricao = (() => {

    let chart = null;
    let label = null;
    let options = null;
  
    function getData(convidadosPorRestricao) {
  
      var valores = new Array();
      valores.push(new Array("Tipo", "Total"))
        convidadosPorRestricao.forEach(e =>
            valores.push(new Array(e.tipo, e.total))
         );
      return valores;
  
    }
  
  
    function initFunction(container, convidadosPorRestricao) {
  
  
      if ( convidadosPorRestricao == undefined) {
        return;
      }


      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback( () => {
            options = {
              width: '100%',
              pieHole: 0.6,
              colors: ['#00C851', '#ffbb33', '#ff4444'],
              pieSliceText: ['none'],
              chartArea: { left: 1, top: 1, width: "100%", height: "150px" }
              ,legend: {position: 'bottom'}
            };
          
            chart = new google.visualization.PieChart(
              document.getElementById(container)
            );
  
            chart.draw(google.visualization.arrayToDataTable(getData(convidadosPorRestricao)), options);
        });
  
    }
  
  
  
  
    function updateFunction(totalEntradas, convidadosPorRestricao) {
  
      if (chart == null) {
        return;
      }
      chart.draw(google.visualization.arrayToDataTable(getData(convidadosPorRestricao)), options);
    }
  
    return {
      init: initFunction
      , update: updateFunction
    }
  
  
  })()