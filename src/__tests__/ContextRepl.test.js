
const vm = require('vm');
const { ContextRepl } = require('../ContextRepl.js');

describe('initializing the repl', () => {
  it('creates a context from the context object', () => {
    const repl = new ContextRepl({foo: 50})
    expect(repl.context.foo === 50)
    expect(vm.isContext(repl.context) === true);
  })
})


describe('.variables', () => {
  it('returns the list of variables available in the context', () => {
    const repl = new ContextRepl({foo: 50, bar: 30})
    expect(repl.variables() === ['bar', 'foo'])
  })
})

describe('evaluating code', () => {
  it('returns the value of an expression', () => {
    const repl = new ContextRepl({foo: 50, bar: 30})
    expect(repl.eval('3 + 5') === 8)
  })

})

describe('executing commands', () => {
  it('.help returns a message with the list of commands', () => {
    const repl = new ContextRepl({foo: 50})
    const result = repl.eval(".help")
    expect(result.match('.ls, .list - show available variables')).not.toBe(null)
    expect(result.match('.help - show available commands')).not.toBe(null)
  })
})
