import {TodoItem} from './todoItem.js';

export class TodoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.subscribe(({name, type, id}) => {
            if (type === 'add') {
                model.addTodo(new TodoItem(name));
            } else if (type === 'remove') {
                model.removeById(id);
            } else if (type === 'update') {
                model.toggleCompleted(id);
            } else if (type === 'showInput') {
                model.toggleInput(id);
            } else if (type === 'rename') {
                model.updateName(id, name);
                model.toggleInput(id);
            }

            this.view.render();
        })
    }
}