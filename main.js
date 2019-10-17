window.onload = function(event) {
  let manager = new TaskManager();

  var modal = document.querySelector("#modal");
  var dialog = document.querySelector(".dialog");
  var loader = document.querySelector(".loader");

  function abrir() {
    document.querySelector("#task-name").value = '';
    document.querySelector("#task-description").value = '';
    modal.classList.add('open');
    document.querySelector("#task-name").focus();
  }

  function fechar() {
    if (modal.classList.contains('open')) {
      modal.classList.remove('open');
      loader.classList.remove('loader--visible');
      dialog.querySelector(".dialog__title").style.opacity = 1;
      dialog.querySelector(".dialog__body").style.opacity = 1;
    }
  }

  document.querySelector("#addTask").addEventListener('click', (e) => {
    abrir();
  });

  document.querySelector("body").addEventListener('keyup', (e) => {
    if (e.key == 'F2') {
      abrir();
    }
    if (e.key == 'Escape') {
      fechar();
    }
    if (e.key == 'Enter' && e.altKey == true) {
      if (modal.classList.contains('open')) {
        if (document.querySelector("#task-name").value == '' ||
            document.querySelector("#task-description").value == '')
              return false;
        dialog.classList.add('round');
        dialog.querySelector(".dialog__title").style.opacity = 0;
        dialog.querySelector(".dialog__body").style.opacity = 0;
        loader.classList.add('loader--visible');
        setTimeout(() => {
          fechar();

          manager.addTask(document.querySelector("#task-name").value, document.querySelector("#task-description").value);
        }, 2000);
      }
    }
  });
}
