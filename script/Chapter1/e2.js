export class Command {
    constructor() {
        this.Name = "";
        this.Action = new Function();
    }
}
export class Commands {
    constructor() {
        this.commands = new Map();
    }
    adds(...commands) {
        commands.forEach((command) => this.add(command));
    }
    add(command) {
        this.commands.set(command.Name, command.Action);
    }
}
//# sourceMappingURL=e2.js.map