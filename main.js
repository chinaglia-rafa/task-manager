window.onload = function(event) {
  let manager = new TaskManager();

  document.querySelector("#addTask").addEventListener('click', (e) => {
    manager.addTask("Teste de Tarefa", "Esta é uma tarefa de teste!! Espero que funcione");
  });
}
