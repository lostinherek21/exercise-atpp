class Command {
  public Name = "";
  public Action = new Function();
}

class Commands {
  public commands = new Map<string, Function>();

  public adds(...commands: Command[]) {
    commands.forEach((command) => this.add(command));
  }

  @Logger
  public add(command: Command) {
    this.commands.set(command.Name, command.Action);
  }
}

function Logger(target: any, key: PropertyKey, descriptor: PropertyDescriptor) {
  let method = descriptor.value

  descriptor.value = function () {
    method.apply(this,arguments)
    console.log(`exec-> ${key.toString()}`)
  }

  return descriptor
}


//test
const Center = new Commands()
Center.add({
  Name:"asd",
  Action:() => {}
})
