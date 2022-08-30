export class Command {
  public Name = "";
  public Action = new Function();
}

export class Commands {
  private commands = new Map<string,Function>()

  public adds(...commands: Command[]) {
    commands.forEach((command) => this.add(command))
  }

  public add(command : Command) {
    this.commands.set(command.Name,command.Action)
  }
}
