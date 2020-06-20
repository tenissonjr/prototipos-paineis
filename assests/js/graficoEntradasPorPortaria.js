//-------------------------------------------------------------
// Gráfico de Total de Entradas por portaria
//-------------------------------------------------------------
const graficoEntradasPorPortaria = (() => {

    let chart = null;

    let options = null ;

    function getData(entradasPorPortaria){
  
      var data = new google.visualization.DataTable();
          
      data.addColumn({
        type: 'string',
        label: 'Local'
      });
      data.addColumn({
        type: 'number',
        label: 'Qtd.Visitantes'
      });

      data.addRows(entradasPorPortaria.length);
      var i=0;  
      entradasPorPortaria.forEach(e => {
          data.setCell(i, 0,e.portaria);
          data.setCell(i, 1, e.entradas);
          i++;
     });

    return data ;

}



    function initFunction(container, entradasPorPortaria) {
  
        if (entradasPorPortaria == null) {
            return;
          }
              
          google.charts.load('current', {
            packages: ['corechart']
          });
          google.charts.setOnLoadCallback( () => {
          
            options = {
              height: "100%",
              width: "100%",
              vAxis: {
                minValue: 0,
                viewWindow: {
                  min: 0,
                },
                format: '0',
              },
              hAxis: {
                slantedText: false,
                gridlines: {
                  count: 5
                },
              },
              legend: {
                position: 'none'
              },
              colors: ["#54B95A"],
            };
        
            chart = new google.visualization.ColumnChart(document.getElementById(container));
            chart.draw(getData(entradasPorPortaria), options);
          });
          
          

  
    }
  
    function updateFunction(entradasPorPortaria) {
  
      if (chart == null) {
        return;
      }
  
      chart.draw(getData(entradasPorPortaria), options);
      
    }
  
    return {
      init: initFunction
      , update: updateFunction
    }
  
  
  
  })()
  