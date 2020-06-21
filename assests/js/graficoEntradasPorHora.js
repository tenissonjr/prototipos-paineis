//-------------------------------------------------------------
// Gráfico de Total de Entradas por hora
//-------------------------------------------------------------
const graficoEntradasPorHora = (() => {

    let chart = null;
    let data = null ;
    let series;
  
    function getDataTable(){
  
            var dataTable = new google.visualization.DataTable();
            dataTable.addColumn('timeofday', 'Hora');
            dataTable.addColumn('number', 'Registros de entrada');

            dataTable.addRows(data.length);
            var i=0;
            data.forEach(e => {
                dataTable.setCell(i, 0,[ e.date.getHours(),0,0]);

                dataTable.setCell(i, 1, e.value);
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
   
  
    function initFunction(container, entradasPorHora,optionsParam) {
  
      if ( entradasPorHora == undefined) {
        return;
      }
      data = entradasPorHora ;

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
                ,textStyle: {color: 'red'}
              },
              vAxis: {
                title: ''
                ,textStyle: {color: 'red'}
              }
              ,colors: [ '#1c800a']
              ,chartArea: { left: 25, top: 5, width: "90%", height: "90px" }
              ,backgroundColor: 'transparent'
            };
      
             chart = new google.visualization.LineChart(
              document.getElementById(container)
            );
      
            chart.draw(getDataTable(), getOptionsChart(optionsParam));
      });
  
  
    }
  
    function updateFunction(entradasPorHora,optionsParam) {
  
      if (chart == null) {
        return;
      }
      if ( entradasPorHora != undefined) {
        data=entradasPorHora;
      }

    
      chart.draw(getDataTable(), getOptionsChart(optionsParam));
    }
  
    return {
      init: initFunction
      , update: updateFunction
    }
  
  
  
  
  })()
  