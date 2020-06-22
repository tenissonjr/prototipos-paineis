//-------------------------------------------------------------
// Gráfico de Total de Convidados por Restrição
//-------------------------------------------------------------
const graficoConvidadosPorRestricao = (() => {

    let chart = null;
    let data = null ;
    let label = null;
    let options = null;
  
    function getDataTable() {
  
      var valores = new Array();
      valores.push(new Array("Tipo", "Total"))
         data.forEach(e =>
            valores.push(new Array(e.tipo, e.total))
         );
      return google.visualization.arrayToDataTable(valores);
  
    }
  
    function getOptionsChart(padraoCores){

      let options = {
        width: '100%',
        pieHole: 0.6,
        colors: padraoCores.colorsAlerts,
        pieSliceText: ['none'],
        chartArea: { left: 1, top: 1, width: "100%", height: "150px" }
        ,legend: {position: 'bottom' , textStyle: {color: padraoCores.textColor}}
        ,backgroundColor: padraoCores.backgroundColor
      };
    
        return options ;

    }
  
    function initFunction(container, convidadosPorRestricao,padraoCores) {
  
      data= convidadosPorRestricao
      
      if ( convidadosPorRestricao == undefined) {
        return;
      }


      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback( () => {

            chart = new google.visualization.PieChart(
              document.getElementById(container)
            );
  
            chart.draw(getDataTable(), getOptionsChart(padraoCores));
        });
  
    }
  
  
  
  
    function updateFunction ( convidadosPorRestricao,padraoCores) {
  
      if ( convidadosPorRestricao != undefined) {
        data = convidadosPorRestricao 
      }



      if (chart == null) {
        return;
      }
      chart.draw(getDataTable(), getOptionsChart(padraoCores));
    }
  
    return {
      init: initFunction
      , update: updateFunction
    }
  
  
  })()