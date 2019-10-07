import Model from '../src/model'
import { symModelCreate } from '../src/utils/symbols'

describe('Model: Constructor', () => {
  it('Props and Methods', () => {
    const model = new Model()
    const props = {
      states: false,
      actions: false,
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
