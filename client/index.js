import {TodoModel} from './todoModel.js';
import {TodoView} from './todoView.js';
import {TodoController} from './TodoController.js';

let todoModel = new TodoModel();

let todoView = new TodoView(
    todoModel,
    document.getElementById('todo')
    );

let todoController = new TodoController(todoModel, todoView);

