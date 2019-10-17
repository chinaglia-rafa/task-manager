class Task {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.currentColumn = 0;
    this.created = Date();
  }

  setID(id) {
    this.id = id;
  }

  getID() {
    return this.id;
  }

  getCurrentColumn() {
    return this.currentColumn;
  }

  nextColumn() {
    return (this.currentColumn == 3) ? false : ++this.currentColumn;
  }

  prevColumn() {
    return (this.currentColumn == 0) ? false : --this.currentColumn;
  }

  toHTML() {
    let task = document.createElement('div');
        task.classList.add('task');
        task.id = 'task-'+this.id;
        task.setAttribute('task-id', this.id);
        task.title = "Clique em mim para mover-me para a direita!";
    let title = document.createElement('div');
        title.classList.add('task__title');
        title.innerText = this.name;
    task.append(title);
    let body = document.createElement('div');
        body.classList.add('task__body');
        body.innerText = this.description;
    task.append(body);

    return task;
  }
}
