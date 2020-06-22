function descartarExibicaoVisitante(n) {
    //return false;
    return ((n <= 120) || (n % 10 != 0))
  
  }
  
  /*
   
  */
  //-------------------------------------------------------------
  // Tabela de exibição dinâmica de registros de entradas 
  // Métodos :
  //    add    - Adiciona um registro de entrada
  //    addAll - Adiciona uma lista de registros de entradas
  //-------------------------------------------------------------
  const tabelaRestricoesAlertas = (() => {
  
    let maiorIdTabela = -1;
  
    let nomeTabela;
    let padraoCores;
  
    let qtdMaxLinhas = 999999999;
  
    let qtdLinhas = 0;

    
  
    function initFunction(nomeTabelaParam, entradas,padraoCoresParam) {
  
      nomeTabela = nomeTabelaParam

      padraoCores= padraoCoresParam
  
      $('#' + nomeTabela).DataTable({
        "scrollY": "320px",
        "bLengthChange": false,
        "bFilter": false,
        "paging": false,
        "scrollCollapse": false,
        "paging": false,
  
  
        "columnDefs": [
          {
            "targets": [0],
            "visible": false,
            "searchable": false
  
          },
          {
            "targets": [1],
            "orderable": false
            ,
            render: function (data) {
              return data.toLocaleTimeString()
            }
  
          },
          {
            "targets": [2],
            "orderable": false,
            render: function (data) {
              return '<img src="' + data + '">'
            }
          },
          {
            "targets": [3],
            "orderable": false
          }
  
  
        ]
        , "order": [[0, "desc"]]
      });
  
      if (entradas != undefined) {
        updateFunction(entradas);
      }
  
    }
  
  
    function add(entradaTO) {
  
      if (descartarExibicaoVisitante(entradaTO.id)) {
  
        return;
      }
  
  
      if (entradaTO.id <= maiorIdTabela) {
        return;
      }
  
      maiorIdTabela = entradaTO.id;
  
      let table = $('#' + nomeTabela).DataTable();
  
      if (qtdLinhas < qtdMaxLinhas) {
  
        qtdLinhas++;
  
      } else {
        var row = table.row(0);
        row.remove();
      }
  
      let rowNode = table
  
    
  
        .row.add([entradaTO.id, entradaTO.dataHoraVisita, entradaTO.fotoVisitante, entradaTO.nomeVisitante, entradaTO.portaria, entradaTO.tipoRestricao])
        .draw()
        .node()
  
        ;
  


      $(rowNode).css({ opacity: "0.0" });
      if (entradaTO.tipoRestricao == "Alerta") {
        $(rowNode).css('background-color' , padraoCores.backgroundColorPessoaAlerta);
        $(rowNode).css('color'            , padraoCores.textColorPessoaAlerta);
      }
      if (entradaTO.tipoRestricao == "Restrição") {
        $(rowNode).css('background-color', padraoCores.backgroundColorPessoaRestricao);
        $(rowNode).css('color'            , padraoCores.textColorPessoaRestricao);        
      }
  
      $(rowNode).animate({ opacity: "1" }, 1500);
  
  
    }
  
    function updateFunction(entradas,padraoCoresParam) {
  
      if (padraoCoresParam != undefined){
        padraoCores = padraoCoresParam
      }

      entradas.forEach(function (entradaTO) {
  
        add(entradaTO)
      });
  
    }
  
    return {
      init: initFunction
      , update: updateFunction
    }
  
  
  
  })()
  