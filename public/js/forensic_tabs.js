/**
  * Forensic tab behavior:
*/

/*
Al pulsar el tab se muestra la página correspondiente
Queda tab seleccionado
Otro no seleccionado
Oculta info del otro tab
*/
let metadaraBtn = document.getElementById('metadaraBtn'),
    forensicBtn = document.getElementById('forensicBtn'),
    visionResults = document.getElementById('visionResults'),
    forensicResults = document.getElementById('forensicResults');

function display(button) {

    if (this === metadaraBtn) {
        visionResults.style.display = 'initial';
        forensicResults.style.display = 'none';

    } else {
      visionResults.style.display = 'none';
      forensicResults.style.display = 'initial';
    }
  };

metadaraBtn.addEventListener('click', display);
forensicBtn.addEventListener('click', display);
