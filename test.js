
const { startRepl } = require('./index.js');

describe('starting the repl', () => {
  it('instantiates a repl & calls run', () => {
    repl = startRepl({foo: 600});
  })
})
