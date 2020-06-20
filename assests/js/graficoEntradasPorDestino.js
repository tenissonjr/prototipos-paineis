//-------------------------------------------------------------
// Gráfico de Total de Entradas por portaria
//-------------------------------------------------------------
const graficoEntradasPorDestino = (() => {

    let chart = null;

    let options = null ;

    function getData(entradasPorDestino){
  
      var data = new google.visualization.DataTable();
          
      data.addColumn({
        type: 'string',
        label: 'Destino'
      });
      data.addColumn({
        type: 'number',
        label: 'Qtd.Visitantes'
      });

      data.addRows(entradasPorDestino.length);
      var i=0;  
      entradasPorDestino.forEach(e => {
          data.setCell(i, 0,e.destino);
          data.setCell(i, 1, e.entradas);
          i++;
     });

    return data ;

}



    function initFunction(container, entradasPorDestino) {
  
        if (entradasPorDestino == null) {
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
            chart.draw(getData(entradasPorDestino), options);
          });
          
          

  
    }
  
    function updateFunction(entradasPorDestino) {
  
      if (chart == null) {
        return;
      }
  
      chart.draw(getData(entradasPorDestino), options);
      
    }
  
    return {
      init: initFunction
      , update: updateFunction
    }
  
  
  
  })()
  