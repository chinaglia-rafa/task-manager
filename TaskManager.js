class TaskManager {

  todoColumn;

  constructor() {
    this.columns = {
      'todo': [],
      'progress': [],
      'review': [],
      'done': []
    };

    this.id_count = 0;

    this.loadFromStorage();

    TaskManager.todoColumn = document.querySelector("#todoColumn .panel__body");
    TaskManager.progressColumn = document.querySelector("#progressColumn .panel__body");
    TaskManager.reviewColumn = document.querySelector("#reviewColumn .panel__body");
    TaskManager.doneColumn = document.querySelector("#doneColumn .panel__body");

    if (TaskManager.todoColumn == null || TaskManager.progressColumn == null ||
        TaskManager.reviewColumn == null || TaskManager.doneColumn == null) {
          console.error("ERRO: HTML MAL FORMATADO! ADICIONE AS COLUNAS!");
        }
  }

  addTask(name, description) {
    if (name == '' || description == '') return false;
    let task = new Task(this.nextID(), name, description);
    this.columns.todo.push(task);

    TaskManager.todoColumn.append(task.toHTML());

    this.saveAllToStorage();

    return task;
  }

  getTodo() {
    return this.columns.todo;
  }

  getProgress() {
    return this.columns.progress;
  }

  getReview() {
    return this.columns.review;
  }

  getDone() {
    return this.columns.done;
  }

  loadFromStorage() {
    if (localStorage.getItem('task_manager:id_count') == null) {
      localStorage.setItem('task_manager:id_count', 0);
      localStorage.setItem('task_manager:tasks', JSON.stringify(this.columns));

      return false;
    } else {
      this.id_count = localStorage.getItem('task_manager:id_count');
      this.columns = JSON.parse(localStorage.getItem('task_manager:tasks'));
    }

    return true;
  }

  saveAllToStorage() {
    localStorage.setItem('task_manager:id_count', this.id_count);
    localStorage.setItem('task_manager:tasks', JSON.stringify(this.columns));
  }

  nextID() {
    return ++this.id_count;
  }

  getId() {
    return this.id_count;
  }
}
