//-------------------------------------------------------------
// Gráfico de Total de Entradas
//-------------------------------------------------------------
const graficoTotalEntradas = (() => {

    let chart = null;
    let data = null ;
    let label = null;
    let options = null;
  
    function getDataTable() {
  
      var valores = new Array();
      valores.push(new Array("Tipo", "Quantidade"))
      data.forEach(e =>
        valores.push(new Array(e.tipo, e.total))
      );
      return google.visualization.arrayToDataTable(valores);
  
    }
  
   function getOptionsChart(padraoCores){
      let   options = {
                
          width: '50px',
          pieHole: 0.6,
          colors: padraoCores.colors,
          pieSliceText: ['none'],
          chartArea: { left: 1, top: 1, width: "100%", height: "100px" }
          ,legend: {position: 'bottom' , textStyle: {color: padraoCores.textColor}}
          ,backgroundColor: padraoCores.backgroundColor
          
        };
        return options

   }


    function initFunction(container, entradasPorTipo,padraoCores) {
  
  
  
      if ( entradasPorTipo == undefined) {
        return;
      }
      data = entradasPorTipo 
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback( () => {
          
            chart = new google.visualization.PieChart(
              document.getElementById(container)
            );
  
            chart.draw(getDataTable(), getOptionsChart(padraoCores));
        });
  
    }
  
  
  
  
    function updateFunction(entradasPorTipo,padraoCores) {
  
      if (chart == null) {
        return;
      }
      if ( entradasPorTipo != undefined) {
        data = entradasPorTipo       
      }
      
      chart.draw(getDataTable(), getOptionsChart(padraoCores));
    }
  
    return {
      init: initFunction
      , update: updateFunction
    }
  
  
  })()