export class TodoView {
    constructor(model, container) {
        this.model = model;
        this.container = container;
        this.handleTodoAdd = this.handleTodoAdd.bind(this);
        this.handleTodoClick = this.handleTodoClick.bind(this);
        this.handleRename = this.handleRename.bind(this);
        this.subscribers = [];
        this.initialRender();
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    notify(data) {
        this.subscribers.forEach(cb => cb(data));
    }

    handleRename(event) {
        if (event.keyCode === 13) {
            this.notify({
                id: Number(event.target.closest('.todo__rename').id),
                name: event.target.closest('.todo__rename').value,
                type: 'rename',
            });
        }
    }

    handleTodoAdd(event) {
        event.preventDefault();
        this.notify({
            name: this.input.value,
            type: 'add',
        });

        this.input.value = '';
    }

    handleTodoClick(event) {
        let removeBtn = event.target.closest('.todo__delete');
        let checkbox = event.target.closest('.todo__checkbox');
        let text = event.target.closest('span');

        if (removeBtn) {
            this.notify({
                id: Number(removeBtn.closest('.todo__item').dataset.id),
                type: 'remove',
            });
        } else if (checkbox) {
            this.notify({
                id: Number(checkbox.closest('.todo__item').dataset.id),
                type: 'update',
            });
        } else if (text) {
            this.notify({
                id: Number(text.closest('.todo__item').dataset.id),
                type: 'showInput',
            });
        }
    }

    initialRender() {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let list = document.createElement('ul');

        input.setAttribute('type', 'text');
        input.className = 'todo__input';
        input.setAttribute('autofocus', '');
        form.className = 'todo__form';
        list.className = 'todo__list';

        form.append(input);

        this.container.append(form);
        this.container.append(list);

        this.todoList = this.container.querySelector('.todo__list');
        this.todoForm = this.container.querySelector('.todo__form');
        this.input = this.container.querySelector('.todo__input');

        this.todoForm.addEventListener('submit', this.handleTodoAdd);
        this.todoList.addEventListener('click', this.handleTodoClick);
        this.todoList.addEventListener('keydown', this.handleRename);
    }

    render() {
        this.todoList.innerHTML = null;

        this.model.getState().forEach(todo => {
            let todoElement = document.createElement('li');
            let deleteBtn = document.createElement('button');
            let checkbox = document.createElement('input');
            let renameInput = document.createElement('input');

            renameInput.setAttribute('type', 'text');
            renameInput.className = 'todo__rename';
            renameInput.setAttribute('id', todo.id);
            this.todoText = document.createElement('span');
            todoElement.classList.add('todo__item');
            if (todo.completed) {
                todoElement.classList.add('completed');
            }
            if (todo.input) {
                renameInput.style = 'display: block';
            }
            deleteBtn.className = 'todo__delete';
            deleteBtn.textContent = 'x';
            this.todoText.textContent = todo.name;
            checkbox.setAttribute('type', 'checkbox');
            checkbox.className = 'todo__checkbox';
            todoElement.setAttribute('data-id', todo.id);

            todoElement.append(checkbox);
            todoElement.append(this.todoText);
            todoElement.append(deleteBtn);
            todoElement.append(renameInput);
            this.todoList.append(todoElement);
        });
    }
}