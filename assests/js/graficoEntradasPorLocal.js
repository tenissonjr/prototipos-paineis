//-------------------------------------------------------------
// Gráfico de Total de Entradas por portaria
//-------------------------------------------------------------
const graficoEntradasPorLocal = (() => {

    let chart = null;
    let data = null ;


    function getDataTable(){
  
      var dataTable = new google.visualization.DataTable();
          
      dataTable.addColumn({
        type: 'string',
        label: 'Local'
      });
      dataTable.addColumn({
        type: 'number',
        label: 'Qtd.Visitantes'
      });

      dataTable.addRows(data.length);
      var i=0;  
      data.forEach(e => {
          dataTable.setCell(i, 0,e.portaria);
          dataTable.setCell(i, 1, e.entradas);
          i++;
     });

    return dataTable ;

}
    function getOptionsChart(padraoCores){
     
      let  options = {
        height: "100%",
        width: "100%",
        vAxis: {
          minValue: 0,
          viewWindow: {
            min: 0,
          },
          format: '0'
          ,textStyle: {color: padraoCores.textColor}
        },
        hAxis: {
          slantedText: false,
          gridlines: {
            count: 5
          }
          ,textStyle: {color: padraoCores.textColor}
        },
        legend: {
          position: 'none'
        },
        colors: padraoCores.colors
        ,backgroundColor: padraoCores.backgroundColor
      };


      return options ;
    }


    function initFunction(container, entradasPorLocal,padraoCores) {
  
          if ( entradasPorLocal == undefined) {
            return;
          }

          data =  entradasPorLocal ;  
          google.charts.load('current', {
            packages: ['corechart']
          });
          google.charts.setOnLoadCallback( () => {
            chart = new google.visualization.ColumnChart(document.getElementById(container));
            chart.draw(getDataTable(), getOptionsChart(padraoCores));
          });
          
  
    }
  
    function updateFunction(entradasPorLocal,padraoCores) {
  
      if (chart == null) {
        return;
      }
      if ( entradasPorLocal != undefined) {
        data =  entradasPorLocal ;  
      }

      chart.draw(getDataTable(), getOptionsChart(padraoCores));
      
    }
  
    return {
      init: initFunction
      , update: updateFunction
    }
  
  
  
  })()
  