"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class Command {
    constructor() {
        this.Name = "";
        this.Action = new Function();
    }
}
class Commands {
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
__decorate([
    Logger
], Commands.prototype, "add", null);
function Logger(target, key, descriptor) {
    let method = descriptor.value;
    descriptor.value = function () {
        method.apply(this, arguments);
        console.log(`exec-> ${key.toString()}`);
    };
    return descriptor;
}
//test
const Center = new Commands();
Center.add({
    Name: "asd",
    Action: () => { }
});
//# sourceMappingURL=e3.js.map