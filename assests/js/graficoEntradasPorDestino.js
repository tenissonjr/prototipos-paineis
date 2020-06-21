//-------------------------------------------------------------
// Gráfico de Total de Entradas por portaria
//-------------------------------------------------------------
const graficoEntradasPorDestino = (() => {

    let chart = null;
    let data = null ;

    function getDataTable(){
  
      var dataTable = new google.visualization.DataTable();    
      dataTable.addColumn({
        type: 'string',
        label: 'Destino'
      });
      dataTable.addColumn({
        type: 'number',
        label: 'Qtd.Visitantes'
      });

      dataTable.addRows(data.length);
      var i=0;  
      data.forEach(e => {
          dataTable.setCell(i, 0,e.destino);
          dataTable.setCell(i, 1, e.entradas);
          i++;
     });

    return dataTable ;

}
    function getOptionsChart(optionsParam){

    let  options = {
        height: "100%",
        width: "100%",
        vAxis: {
          minValue: 0,
          viewWindow: {
            min: 0,
          },
          format: '0'
          ,textStyle: {color: optionsParam.textColor}
        },
        hAxis: {
          slantedText: false,
          gridlines: {
            count: 5
          }
          ,textStyle: {color: optionsParam.textColor}
        },
        legend: {
          position: 'none'
        },
        colors: optionsParam.colors
        ,backgroundColor: optionsParam.backgroundColor
        
      };

      return options;

    }



    function initFunction(container, entradasPorDestino,optionsParam) {
  
          if ( entradasPorDestino == undefined) {
            return;
          }
         
          data  = entradasPorDestino

          google.charts.load('current', {
            packages: ['corechart']
          });
          google.charts.setOnLoadCallback( () => {
          
        
            chart = new google.visualization.ColumnChart(document.getElementById(container));
            chart.draw(getDataTable(), getOptionsChart(optionsParam));
          });
          
          

  
    }
  
    function updateFunction(entradasPorDestino,optionsParam) {
  
      if (chart == null) {
        return;
      }
  
      if ( entradasPorDestino != undefined) {
        data = entradasPorDestino;
      }

      chart.draw(getDataTable(), getOptionsChart(optionsParam));
      
    }
  
    return {
      init: initFunction
      , update: updateFunction
    }
  
  
  
  })()
  