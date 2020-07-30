export class TodoModel {
    constructor() {
        this.state = [];
    }

    addTodo(todo) {
        this.state.push(todo);
    }

    removeById(id) {
        this.state = this.state.filter(todo => todo.id !== id);
    }

    updateName(id, name) {
        let todo = this.state.find(todo => todo.id === id);

        if (todo) {
            todo.name = name;
        }
    }

    toggleInput(id) {
        let todo = this.state.find(todo => todo.id === id);

        if (todo) {
            todo.toggleInput();
        }
    }

    hideInput(id) {
        let todo = this.state.find(todo => todo.id === id);

        if (todo) {
            console.log(todo)
        }
    }

    toggleCompleted(id) {
        let todo = this.state.find(todo => todo.id === id);

        if (todo) {
            todo.toggle(); 
        }
    } 

    getState() {
        return this.state;
    }
}