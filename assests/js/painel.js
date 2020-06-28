
//-------------------------------------------------------------
// Eventos do painel
//-------------------------------------------------------------

const painel = (() => {

  let dataInicial = new Date();
  let dataFinal = new Date();

  let entradasRecentes;
  let estatisticas;


  function initFunction(padraoCores) {

    totatilzadorEntradasTO = sivisService.getTotatilzadorEntradasTO(dataInicial, dataFinal)
    tentativasEntradas     = sivisService.getTentativasEntradas(dataInicial, dataFinal)

    graficoTotalEntradas.init("chartdiv3", totatilzadorEntradasTO.entradasPorTipo,padraoCores);
    graficoConvidadosPorRestricao.init("chartdiv5", totatilzadorEntradasTO.convidadosPorRestricao,padraoCores);    
    graficoEntradasPorDestino.init("chartdiv4", totatilzadorEntradasTO.entradasPorDestino,padraoCores);
    graficoEntradasPorHora.init("chartdiv", totatilzadorEntradasTO.entradasPorHora,padraoCores);
    graficoEntradasPorLocal.init("chartdiv2", totatilzadorEntradasTO.entradasPorPortaria,padraoCores);
    tabelaRestricoesAlertas.init("tabEntradas", tentativasEntradas,padraoCores);
    
  }


  function updateFunction(padraoCores) {

    totatilzadorEntradasTO = sivisService.getTotatilzadorEntradasTO(dataInicial, dataFinal)
    tentativasEntradas     = sivisService.getTentativasEntradas(dataInicial, dataFinal)

     graficoTotalEntradas.update(totatilzadorEntradasTO.entradasPorTipo,padraoCores);     
     graficoConvidadosPorRestricao.update(totatilzadorEntradasTO.convidadosPorRestricao,padraoCores);    
     graficoEntradasPorDestino.update(totatilzadorEntradasTO.entradasPorDestino,padraoCores);   
     graficoEntradasPorHora.update(totatilzadorEntradasTO.entradasPorHora,padraoCores);  
     graficoEntradasPorLocal.update(totatilzadorEntradasTO.entradasPorPortaria,padraoCores);   
     tabelaRestricoesAlertas.update(tentativasEntradas,padraoCores);

  }


  return {
    init : initFunction
    ,update: updateFunction

  }


})()


function getPadraoCores(){

  let  padraoCores

  let style = window.getComputedStyle(document.documentElement) ;

  let checkDarkMode = document.querySelector('#dark-mode-toggle');

  const root = document.documentElement;

  if(checkDarkMode.checked){
      root.style.setProperty('--background-color-datatable-odd',style.getPropertyValue('--background-color-datatable-odd-dark'));
      root.style.setProperty('--background-color-datatable-even',style.getPropertyValue('--background-color-datatable-even-dark'));
      padraoCores= {
          backgroundColor                 :'transparent'
          ,textColor                      :style.getPropertyValue('--color-text-dark')
          ,colors                         :[style.getPropertyValue('--color1-dark'),style.getPropertyValue('--color2-dark'),style.getPropertyValue('--color3-dark'),style.getPropertyValue('--color4-dark')]
          ,colorsAlerts                   :[style.getPropertyValue('--color-alert1-dark'),style.getPropertyValue('--color-alert2-dark'),style.getPropertyValue('--color-alert3-dark')]
          ,backgroundColorPessoaAlerta    :style.getPropertyValue('--background-pessoa-alerta-dark')      
          ,textColorPessoaAlerta          :style.getPropertyValue('--color-text-pessoa-alerta-dark')            
          ,backgroundColorPessoaRestricao :style.getPropertyValue('--background-pessoa-restricao-dark')      
          ,textColorPessoaRestricao       :style.getPropertyValue('--color-text-pessoa-restricao-dark')            
      }
  }else{
      root.style.setProperty('--background-color-datatable-odd',style.getPropertyValue('--background-color-datatable-odd-ligth'));
      root.style.setProperty('--background-color-datatable-even',style.getPropertyValue('--background-color-datatable-even-ligth'));
      padraoCores= {
        backgroundColor                 : 'transparent'
        ,textColor                      :style.getPropertyValue('--color-text-ligth')
        ,colors                         :[style.getPropertyValue('--color1-ligth'),style.getPropertyValue('--color2-ligth'),style.getPropertyValue('--color3-ligth'),style.getPropertyValue('--color4-ligth')]
        ,colorsAlerts                   :[style.getPropertyValue('--color-alert1-ligth'),style.getPropertyValue('--color-alert2-ligth'),style.getPropertyValue('--color-alert3-ligth')]
        ,backgroundColorPessoaAlerta    :style.getPropertyValue('--background-pessoa-alerta-ligth')      
        ,textColorPessoaAlerta          :style.getPropertyValue('--color-text-pessoa-alerta-ligth')            
        ,backgroundColorPessoaRestricao :style.getPropertyValue('--background-pessoa-restricao-ligth')      
        ,textColorPessoaRestricao       :style.getPropertyValue('--color-text-pessoa-restricao-ligth')            
    }

  }
  return padraoCores

}


painel.init(getPadraoCores());
setInterval(() => {
    painel.update(getPadraoCores());
  }, 1000 * 5
);

