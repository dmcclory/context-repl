const vm = require('vm');

const { ContextRepl } = require('./src/ContextRepl.js');

const startRepl = (context) => {
  const repl = new ContextRepl(context)
  return repl;
}

module.exports = { startRepl }
