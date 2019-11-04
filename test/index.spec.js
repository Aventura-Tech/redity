import Redity from '../src'
import { PRIVATE, PROTECTED, PUBLIC } from '../src/utils/access'
import { symRedityModels } from '../src/utils/symbols'

describe('Redity: Constructor', () => {
  it('Props and Methods', () => {
    expect(typeof Redity).toBe('function')
    expect(Redity).toHaveProperty('config')
    expect(Redity).toHaveProperty('register')
    expect(Redity.config).toEqual(expect.any(Object))
    expect(Redity[symRedityModels]).toEqual(expect.any(Map))
    expect(Redity.register).toEqual(expect.any(Function))
    expect(Redity.model).toEqual(expect.any(Object))
  })

  it('Config', () => {
    const obj = {
      dev: expect.any(Boolean)
    }
    expect(Redity.config).toMatchObject(obj)
  })
})

describe('Redity: Concept', () => {
  const modelPrivate = redity => {
    redity.init = (ininital, settings) => {
      settings.access = PRIVATE
    }
    redity.onListen = () => {}
    redity.onFail = () => {}
    return redity
  }
  const modelPublic = redity => {
    redity.init = (ininital, settings) => {
      settings.access = PUBLIC
    }
    redity.onListen = () => {}
    redity.onFail = () => {}
    return redity
  }
  const modelProtected = redity => {
    redity.init = (ininital, settings) => {
      settings.access = PROTECTED
    }
    redity.onListen = () => {}
    redity.onFail = () => {}
    return redity
  }

  Redity.register('modelPrivate', modelPrivate)
  Redity.register('modelPublic', modelPublic)
  Redity.register('modelProtected', modelProtected)

  it('models access private', () => {
    const modelsPrivate = Redity.model.private()
    expect(modelsPrivate).toEqual(expect.any(Object))
    for (const key in modelsPrivate) {
      expect(modelsPrivate[key].key).toBe('modelPrivate')
    }
  })

  it('models access protected', () => {
    const modelsProtected = Redity.model.protected()
    expect(modelsProtected).toEqual(expect.any(Object))
    for (const key in modelsProtected) {
      expect(modelsProtected[key].key).toBe('modelProtected')
    }
  })

  it('models access public', () => {
    const modelsPublic = Redity.model.public()
    expect(modelsPublic).toEqual(expect.any(Object))
    for (const key in modelsPublic) {
      expect(modelsPublic[key].key).toBe('modelPublic')
    }
  })
})
