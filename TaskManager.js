class TaskManager {

  todoColumn = false;
  progressColumn = false;
  reviewColumn = false;
  doneColumn = false;
  progressBar = false;

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
    TaskManager.progressBar = document.querySelector("#progressBar");

    if (TaskManager.todoColumn == null || TaskManager.progressColumn == null ||
        TaskManager.reviewColumn == null || TaskManager.doneColumn == null) {
      console.error("ERRO: HTML MAL FORMATADO! ADICIONE AS COLUNAS!");
    }

    this.init();

    this.updateBars();
  }

  addTask(name, description) {
    if (name == '' || description == '') return false;
    let task = new Task(this.nextID(), name, description);
    this.columns.todo.push(task);

    this.render(task);

    this.updateBars();

    this.saveAllToStorage();

    return task;
  }

  task_click = (e) => {
    let id = e.currentTarget.getAttribute('task-id');
    let task = this.findTaskById(id);
    let old_column = task.getCurrentColumn();
    let new_column = task.nextColumn();
    if (new_column) {
      new_column = Object.keys(this.columns)[new_column];
      old_column = Object.keys(this.columns)[old_column];
      this.columns[new_column].push(task);
      this.columns[old_column] = this.columns[old_column].filter((element) => {
        return element.getID() != id;
      });
      //  Remove o HTML da coluna antiga
      this.unrender(id);
      //  Renderiza o HTML na coluna nova
      this.render(task);

      this.updateBars();
    }
  }

  findTaskById(id) {
    for (let column in this.columns) {
      for (let task in this.columns[column]) {
        if (this.columns[column][task].getID() == id) return this.columns[column][task];
      }
    }

    return false;
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
      //  Carrega as tarefas na forma de plain objects
      var cols = JSON.parse(localStorage.getItem('task_manager:tasks'));
      //  Converte as tarefas carregadas para objetos do tipo Task
      for (let coluna in cols) {
        for (let i in cols[coluna]) {
          cols[coluna][i] = Object.assign(new Task, cols[coluna][i]);
        }
      }
      this.columns = cols;
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

  init() {
    var task_object = false;
    for (let coluna in this.columns ) {
      this.columns[coluna].forEach((task) => {
        this.render(task);
      });
    }
  }

  render(task) {
    let task_object = task.toHTML();
    task_object.addEventListener('click', this.task_click);
    if (task.getCurrentColumn() == 0)
      TaskManager.todoColumn.append(task_object);
    else if (task.getCurrentColumn() == 1)
      TaskManager.progressColumn.append(task_object);
    else if (task.getCurrentColumn() == 2)
      TaskManager.reviewColumn.append(task_object);
    else if (task.getCurrentColumn() == 3)
      TaskManager.doneColumn.append(task_object);

    return true;
  }

  unrender(id) {
    document.querySelector("#task-"+id).remove();
  }

  getBarSizes() {
    let total  = this.columns.todo.length;
        total += this.columns.progress.length;
        total += this.columns.review.length;
        total += this.columns.done.length;

    return [
      100 * this.columns.todo.length / total,
      100 * this.columns.progress.length / total,
      100 * this.columns.review.length / total,
      100 * this.columns.done.length / total
    ]
  }

  updateBars() {
      let sizes = this.getBarSizes();
      let bars = TaskManager.progressBar.querySelectorAll("div");
      for (let i = 0; i < 4; i++) {
        bars[i].style.width = sizes[i] + "%";
        bars[i].title = sizes[i].toFixed(2) + "% das tarefas";
      }
  }
}
