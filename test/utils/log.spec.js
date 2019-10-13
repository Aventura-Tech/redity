import Log from '../../src/utils/log'
import { symLogType, symLogBody, symLogManufacture, symLogVerify } from '../../src/utils/symbols'

const bodyTest = {
  label: 'Label Test',
  message: 'This is a message',
  data: 'string data'
}

const bodyTest2 = {
  label: 'Label Test 2',
  message: 'This is other message',
  data: ['Apple', 'Banana']
}

const bodyTest3 = {
  label: 'Label Test 3',
  message: 'This is last message',
  data: {
    name: 'Erick',
    email: 'erick@gmail.com'
  }
}

describe('Log: Constructor', () => {
  it('Properties', () => {
    // expect(Log).toHaveProperty(symLogBody)
    // expect(Log).toHaveProperty(symLogType)
    // expect(Log).toHaveProperty(symLogManufacture)
    // expect(Log).toHaveProperty(symLogVerify)
    expect(Log).toHaveProperty('norm')
    expect(Log).toHaveProperty('info')
    expect(Log).toHaveProperty('warn')
    expect(Log).toHaveProperty('error')
  })

  it('Properties types defined', () => {
    const properties = {
      [symLogBody]: {
        label: null,
        message: '',
        data: undefined
      },
      [symLogType]: expect.any(String),
      [symLogManufacture]: expect.any(Function),
      [symLogVerify]: expect.any(Function),
      norm: expect.any(Function),
      info: expect.any(Function),
      warn: expect.any(Function),
      error: expect.any(Function)
    }

    expect(Log).toMatchObject(properties)
  })

  it('Expect properties of [symLogBody]', () => {
    const body = {
      label: null,
      message: expect.any(String),
      data: undefined
    }
    expect(Log[symLogBody]).toMatchObject(body)
  })

  it('Error Handling', () => {
    const error = new Error('Require a Object')
    expect(() => Log.info()).toThrow(error)
    expect(() => Log.info('string')).toThrow(error)
    expect(() => Log.info([])).toThrow(error)
    expect(Log.info(bodyTest))
  })

  it('Values symLogBody', () => {
    Log.info(bodyTest)
    expect(Log[symLogBody]).toMatchObject(bodyTest)
    Log.warn(bodyTest2)
    expect(Log[symLogBody]).toMatchObject(bodyTest2)
    Log.error(bodyTest3)
    expect(Log[symLogBody]).toMatchObject(bodyTest3)
  })
})

describe('Log: Public Methods', () => {
  it('Call group console', () => {
    const spyGroup = jest.spyOn(console, 'groupCollapsed')
    const spyGroupEnd = jest.spyOn(console, 'groupEnd')
    Log.info(bodyTest)
    expect(spyGroup).toHaveBeenCalled()
    expect(spyGroupEnd).toHaveBeenCalled()
    spyGroup.mockRestore()
    spyGroupEnd.mockRestore()
  })

  it('Call info & norm log', () => {
    const spy = jest.spyOn(console, 'log')
    Log.info(bodyTest)
    Log.norm(bodyTest)
    Log.info(bodyTest2)
    Log.norm(bodyTest2)
    Log.info(bodyTest3)
    Log.norm(bodyTest3)
    expect(spy).toHaveBeenCalledTimes(10)
    spy.mockRestore()
  })

  it('Call warn log', () => {
    const spy = jest.spyOn(console, 'log')
    Log.warn(bodyTest)
    Log.warn(bodyTest2)
    Log.warn(bodyTest3)
    expect(spy).toHaveBeenCalledTimes(5)
    spy.mockRestore()
  })

  it('Call error log', () => {
    const spy = jest.spyOn(console, 'log')
    Log.error(bodyTest)
    Log.error(bodyTest2)
    Log.error(bodyTest3)
    expect(spy).toHaveBeenCalledTimes(5)
    spy.mockRestore()
  })
})
