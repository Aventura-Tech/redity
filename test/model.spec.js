import Model from '../src/model'
import { symModelCreate } from '../src/utils/symbols'
import States from '../src/states'

const dataExample = [
  {
    name: 'Erick',
    email: 'testing@gmail.com'
  },
  {
    name: 'Marcos',
    email: 'chochera@email.com'
  }
]

describe('Model: Constructor', () => {
  it('Props and Methods', () => {
    const model = new Model()

    const props = {
      states: expect.any(Object),
      dispatchers: expect.any(Object),
      init: undefined,
      onListen: undefined,
      onFail: undefined,
      [symModelCreate]: expect.any(Function),
      subscribe: expect.any(Function),
      deleteSubscribe: expect.any(Function)
    }

    expect(model).toMatchObject(props)
  })
})

describe('Model: Concept', () => {
  const model = new Model()
  it('init', done => {
    const spy = jest.spyOn(States.prototype, 'init')
    model.init = (initial, settings) => {
      expect(initial).toHaveProperty('states')
      expect(initial).toHaveProperty('dispatchers')
      expect(settings).toHaveProperty('states')
      expect(settings).toHaveProperty('dispatchers')
      expect(settings).toHaveProperty('access')
      expect(settings).toHaveProperty('dev')

      initial.states = {
        name: 'Erick',
        email: 'testing@gmail.com'
      }

      initial.dispatchers = {
        changeName: 'Change Name of User',
        changeEmail: 'Change Email of User'
      }

      settings.dispatchers = {
        changeName: {
          now: true
        }
      }
    }
    model[symModelCreate]() // creating model
    expect(spy).toHaveBeenCalled()
    expect(model.states).toMatchObject({
      name: expect.any(Function),
      email: expect.any(Function)
    })

    expect(model.dispatchers).toMatchObject({
      changeName: expect.any(Function),
      changeEmail: expect.any(Function)
    })

    spy.mockRestore()
    done()
  })

  it('onListen', () => {
    const model = new Model('modelTest')
    let count = 0
    model.init = initial => {
      initial.states = {
        loading: false,
        list: []
      }
      initial.dispatchers = {
        getList: 'Getted data', // example
        submit: 'Sending data of form' // example
      }
    }

    model.onListen = async (payload, states, header) => {
      expect(payload).toEqual(expect.anything())
      expect(header).toMatchObject({
        key: 'modelTest',
        dispatchers: expect.any(Object),
        payload: expect.anything(),
        resolve: expect.any(Function),
        action: expect.any(String),
        actions: expect.any(Object),
        blockcode: expect.any(Object),
        models: expect.any(Object),
        components: expect.any(Object),
        history: expect.any(Object)
      })
      count++
    }
    model[symModelCreate](false) // creating model
    const { getList, submit } = model.dispatchers
    expect(getList('Any Data')).toBeTruthy()
    getList(15, () => {
      expect(getList([])).toBeTruthy()
    })
    expect(submit({ username: 'Erick', password: '123456' }, () => {
      expect(count).toBe(3)
    })).toBeTruthy()
  })

  it('blockcode and onFail', () => {
    const model = new Model('newModel')
    const dispatchersKey = ['getData', 'example']
    let count = 0
    let countFail = 0
    model.init = initial => {
      initial.dispatchers = {
        getData: 'Getting data for states data',
        example: 'This is other think'
      }
    }
    model.onListen = async (payload, states, header) => {
      count++

      const { block } = header.blockcode
      if (header.action === dispatchersKey[0]) {
        block('==== This a description==== ')
        expect(header.actions.getData).toEqual(expect.any(Function))
        expect(header.actions.example).toBeFalsy()
        expect(header.blockcode.num).toBe(1)
        block('==== Epa ==== ')
        header.resolve('This is error')
      }

      if (header.event === dispatchersKey[1]) {
        block('==== Other description==== ')
        expect(header.actions.getData).toBeFalsy()
        expect(header.actions.example).toEqual(expect.any(Function))
      }

      expect(payload).toMatchObject(dataExample[count - 1])
      expect(header.action).toBe(dispatchersKey[count - 1])
    }
    model.onFail = async (err, states, header) => {
      countFail++
      expect(header.blockcode.num).toBe(2)
      if (header.blockcode.num === 2) {
        expect(err).toBe('This is error')
      }
    }
    model[symModelCreate](false) // creating model
    const { getData, example } = model.dispatchers
    getData(dataExample[0])
    example(dataExample[1])
    expect(count).toBe(2)
    expect(countFail).toBe(1)
  })

  it('Dispatchers', async () => {
    const model = new Model('TestingModel')

    model.init = initial => {
      initial.dispatchers = {
        dispatch1: 'This is first action',
        dispatch2: 'This is other action'
      }
    }

    model.onListen = async (payload, states, header) => {
      const { dispatch1, dispatch2 } = header.actions
      if (header.action === 'dispatch1') {
        expect(dispatch1).toEqual(expect.any(Function))
        expect(dispatch2).toBeFalsy()
      }

      if (header.action === 'dispatch2') {
        expect(dispatch1).toBeFalsy()
        expect(dispatch2).toEqual(expect.any(Function))
      }
    }

    model[symModelCreate](false) // creating model
    const { dispatch1, dispatch2 } = model.dispatchers
    expect(await dispatch1('Any Data')).toBeTruthy()
    expect(await dispatch2({ name: 'MyName' })).toBeTruthy()
  })
})
