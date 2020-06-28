
  
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
            "targets": [2],
            "orderable": false
            ,
            render: function (data) {
              return data.toLocaleTimeString()
            }
  
          },
          {
            "targets": [3],
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
  
      let newRow = table
      .row.add([ entradaTO.id,entradaTO.tipoRestricao, entradaTO.dataHora, entradaTO.foto, entradaTO.nome, entradaTO.portaria])
      ;

      console.log(newRow)

      let rowNode = newRow.draw().node() ;

     

      $(rowNode).css({ opacity: "0.0" });
      if (entradaTO.tipoRestricao == "Alerta") {
          $(rowNode).find('td:first').css('border-left' , '30px solid ' + padraoCores.backgroundColorPessoaAlerta);
      }
      if (entradaTO.tipoRestricao == "Restrição") {
          $(rowNode).find('td:first').css('border-left', '30px solid ' + padraoCores.backgroundColorPessoaRestricao);
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
  