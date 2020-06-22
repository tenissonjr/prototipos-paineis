



document.addEventListener('DOMContentLoaded', function() {
  let  btnDarkMode = document.querySelector('#dark-mode-toggle');
  btnDarkMode.addEventListener('change', () => {

    const body = document.querySelector('#body');
    body.classList.toggle("tema-dark");

     var x = document.querySelectorAll(".chart-tema-light");
     var i;
     for (i = 0; i < x.length; i++) {
       x[i].classList.toggle("chart-tema-dark")
     }

     painel.update(getPadraoCores());
  
  });
  
});
