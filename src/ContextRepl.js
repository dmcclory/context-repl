const vm = require('vm');

class ContextRepl {

  constructor(context) {
    this.context = vm.createContext(context)
  }

  run(codeString) {
    if(codeString.startsWith('.')) {
      return this.runCommand(codeString);
    }
    try {
      vm.runInContext(codeString, this.context);
    } catch(error) {
      return error.message
    }
  }

  runCommand(command) {
    const prefixlessCommand = command.slice(1)
    switch(prefixlessCommand) {
      case "help":
        return(`.ls, .list - show available variables\n.help - show available commands`);
      case "list":
      case "ls":
        return(this.variables());
      default:
        return("... hmm.. we didn't recognize any of those. try running .help or entering some JS code")
    }
  }

  variables() {
    return Object.keys(this.context);
  }
}


module.exports = { ContextRepl };
