
//-------------------------------------------------------------
// Eventos do painel
//-------------------------------------------------------------

const painel = (() => {

  let dataInicial = new Date();
  let dataFinal = new Date();

  let entradasRecentes;
  let estatisticas;


  function initFunction(padraoCores) {

    entradasRecentes = sivisService.entradasRecentes(dataInicial, dataFinal);
    estatisticas = sivisService.estatisticasEntradas(dataInicial, dataFinal);

    graficoTotalEntradas.init("chartdiv3", estatisticas.entradasPorTipo,padraoCores);
    graficoConvidadosPorRestricao.init("chartdiv5", estatisticas.convidadosPorRestricao,padraoCores);    
    graficoEntradasPorDestino.init("chartdiv4", estatisticas.entradasPorDestino,padraoCores);
    graficoEntradasPorHora.init("chartdiv", estatisticas.entradasPorHora,padraoCores);
    graficoEntradasPorLocal.init("chartdiv2", estatisticas.entradasPorPortaria,padraoCores);
    tabelaRestricoesAlertas.init("tabEntradas", entradasRecentes,padraoCores);
    
  }


  function updateFunction(padraoCores) {

     entradasRecentes = sivisService.entradasRecentes(dataInicial, dataFinal);
     estatisticas = sivisService.estatisticasEntradas(dataInicial, dataFinal);


     graficoTotalEntradas.update(estatisticas.entradasPorTipo,padraoCores);     
     graficoConvidadosPorRestricao.update(estatisticas.convidadosPorRestricao,padraoCores);    
     graficoEntradasPorDestino.update(estatisticas.entradasPorDestino,padraoCores);   
     graficoEntradasPorHora.update(estatisticas.entradasPorHora,padraoCores);  
     graficoEntradasPorLocal.update(estatisticas.entradasPorPortaria,padraoCores);   
     tabelaRestricoesAlertas.update(entradasRecentes,padraoCores);

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

  if(checkDarkMode.checked){
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



function adicionarVisitantePainel() {
  sivisService.adicionaNovoVisitante();
  painel.update(getPadraoCores());
}


painel.init(getPadraoCores());


setInterval(() => {
    adicionarVisitantePainel();

  }, 1000 * 5
);

const btn = document.querySelector('#add-to-list');
btn.addEventListener('click', () => {
  adicionarVisitantePainel();

});
