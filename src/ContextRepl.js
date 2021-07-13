const vm = require('vm');
const createPrompt = require('prompt-sync');
const createPromptHistory = require('prompt-sync-history');

const PROMPT_LABEL = "> "

class ContextRepl {

  constructor(context) {
    this.context = vm.createContext(context)
    this.prompt = createPrompt({
      history: createPromptHistory()
    })
  }

  runLoop() {
    while(true) {
      const input = this.read();
      const result = this.eval(input);
      this.print(result);
    }
  }

  read() {
    return this.prompt(PROMPT_LABEL);
  }

  eval(codeString) {
    if(codeString.startsWith('.')) {
      return this.runCommand(codeString);
    }
    try {
      const result = vm.runInContext(codeString, this.context);
      return result;
    } catch(error) {
      return error.message
    }
  }

  print(result) {
    console.log(result);
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
