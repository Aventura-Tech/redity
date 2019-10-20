import Dispatcher from '../src/dispatcher'
import Exceptions from '../src/utils/exceptions'
const { IsNotObject, IsNotFunction } = Exceptions
const data = {
  action1: 'This is a Action',
  action2: 'This is other Action',
  action3: 'This is last Action'
}

describe('Dispatcher: contructor', () => {
  it('Instance', () => {
    const actions = new Dispatcher()
    expect(() => actions.init()).toThrow(IsNotObject('Dispatcher parameter'))
    expect(() => actions.init('Example')).toThrow(IsNotObject('Dispatcher parameter'))
    expect(() => actions.init([])).toThrow(IsNotObject('Dispatcher parameter'))
  })

  it('has', () => {
    const actions = new Dispatcher()
    expect(actions).toHaveProperty('init')
    expect(actions).toHaveProperty('onListen')
    expect(actions).toHaveProperty('size')
    expect(actions).toHaveProperty('toMethod')
  })

  it('Property', () => {
    const actions = new Dispatcher()
    actions.init(data)
    const propAndMethods = {
      init: expect.any(Function),
      onListen: undefined,
      size: expect.any(Number),
      toMethod: expect.any(Function)
    }
    expect(actions).toMatchObject(propAndMethods)
  })
})

describe('Dispatcher: Logic', () => {
  const actions = new Dispatcher()
  actions.init(data)
  it('Listener on', () => {
    expect(() => {
      actions.onListen = 'String'
    }).toThrow(IsNotFunction('On property'))
    expect(() => {
      actions.onListen = {}
    }).toThrow(IsNotFunction('On property'))
    expect(() => {
      actions.onListen = []
    }).toThrow(IsNotFunction('On property'))
    expect(() => {
      actions.onListen = function () {}
    })
  })
})

describe('Dispatcher: Concept', () => {
  it('Creating and success', done => {
    const actions = new Dispatcher()
    actions.init(data)
    expect(actions.size).toBe(3)
    let countListen = 0
    actions.onListen = function (payload, action, header) {
      expect(payload).toEqual(expect.anything())
      expect(action).toMatchObject({
        key: expect.any(String),
        description: expect.any(String)
      })
      expect(header).toEqual(expect.any(Object))
      countListen++
    }

    const listDispatcher = actions.toMethod()
    expect(listDispatcher).toMatchObject({
      action1: expect.any(Function),
      action2: expect.any(Function),
      action3: expect.any(Function)
    })
    const countList = Object.keys(listDispatcher)
    expect(countList.length).toBe(3)
    listDispatcher.action1('Anything')
    listDispatcher.action2({})
    expect(countListen).toBe(2)
    done()
  })

  it('Checking events', done => {
    const actions = new Dispatcher()
    actions.init(data)
    actions.onListen = function (payload, action, header) {
      expect(payload).toEqual(expect.any(Object))
      expect(header).toMatchObject({
        action1: false,
        action2: expect.any(Function),
        action3: false
      })
    }

    const { action2 } = actions.toMethod()
    action2({ name: 'Example' })
    done()
  })
})
