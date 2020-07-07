export class TodoItem { 
    constructor(name, completed = false, input = false) {
        this.name = name;
        this.completed = completed;
        this.id = Math.random();
        this.input = input;
    }

    toggle() {
        this.completed = !this.completed;
    }

    toggleInput() {
        this.input = !this.input;
    }
}