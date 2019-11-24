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
    const dispatcher = new Dispatcher()
    expect(() => dispatcher.init()).toThrow(IsNotObject('Dispatcher parameter'))
    expect(() => dispatcher.init('Example')).toThrow(IsNotObject('Dispatcher parameter'))
    expect(() => dispatcher.init([])).toThrow(IsNotObject('Dispatcher parameter'))
  })

  it('has', () => {
    const dispatcher = new Dispatcher()
    expect(dispatcher).toHaveProperty('init')
    expect(dispatcher).toHaveProperty('onListen')
    expect(dispatcher).toHaveProperty('size')
    expect(dispatcher).toHaveProperty('toMethod')
    expect(dispatcher).toHaveProperty('disable')
    expect(dispatcher).toHaveProperty('enable')
  })

  it('Property', () => {
    const dispatcher = new Dispatcher()
    dispatcher.init(data)
    const propAndMethods = {
      init: expect.any(Function),
      onListen: undefined,
      size: expect.any(Number),
      toMethod: expect.any(Function)
    }
    expect(dispatcher).toMatchObject(propAndMethods)
  })
})

describe('Dispatcher: Logic', () => {
  const dispatcher = new Dispatcher()
  dispatcher.init(data)
  it('Listener on', () => {
    expect(() => {
      dispatcher.onListen = 'String'
    }).toThrow(IsNotFunction('On property'))
    expect(() => {
      dispatcher.onListen = {}
    }).toThrow(IsNotFunction('On property'))
    expect(() => {
      dispatcher.onListen = []
    }).toThrow(IsNotFunction('On property'))
    expect(() => {
      dispatcher.onListen = function () {}
    })
  })
})

describe('Dispatcher: Concept', () => {
  it('Creating and success', async () => {
    const dispatcher = new Dispatcher()
    dispatcher.init(data)
    expect(dispatcher.size).toBe(3)
    let countListen = 0
    dispatcher.onListen = async function (payload, action, header) {
      expect(payload).toEqual(expect.anything())
      expect(action).toMatchObject({
        key: expect.any(String),
        defaultValue: expect.any(String)
      })
      expect(header).toEqual(expect.any(Object))
      countListen++
    }

    const listDispatcher = dispatcher.toMethod()
    expect(listDispatcher).toMatchObject({
      action1: expect.any(Function),
      action2: expect.any(Function),
      action3: expect.any(Function)
    })
    const countList = Object.keys(listDispatcher)
    expect(countList.length).toBe(3)
    await listDispatcher.action1('Anything')
    await listDispatcher.action2({})
    expect(countListen).toBe(2)
  })

  it('Checking events', async () => {
    const dispatcher = new Dispatcher()
    dispatcher.init(data)
    dispatcher.onListen = async function (payload, action, header) {
      expect(payload).toEqual(expect.any(Object))
      expect(header).toMatchObject({
        action1: false,
        action2: expect.any(Function),
        action3: false
      })
    }

    const { action2 } = dispatcher.toMethod()
    await action2({ name: 'Example' })
  })
})
