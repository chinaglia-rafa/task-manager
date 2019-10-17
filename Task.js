class Task {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.created = Date();
  }

  setID(id) {
    this.id = id;
  }

  toHTML() {
    let template = `<div class="task" id="task-${this.id}">
      <div class="task__title">${this.name}</div>
      <div class="task__body">${this.description}</div>
    </div>`;

    let task = document.createElement('div');
        task.classList.add('task');
        task.id = 'task-'+this.id;
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
