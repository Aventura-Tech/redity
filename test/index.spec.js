import Redity from '../src'
import { symRedityModels } from '../src/utils/symbols'

describe('Redity: Constructor', () => {
  it('Props and Methods', () => {
    expect(typeof Redity).toBe('function')
    expect(Redity).toHaveProperty('config')
    expect(Redity).toHaveProperty('register')
    expect(Redity.config).toEqual(expect.any(Object))
    expect(Redity[symRedityModels]).toEqual(expect.any(Map))
    expect(Redity.register).toEqual(expect.any(Function))
    expect(Redity.get).toEqual(expect.any(Function))
  })

  it('Config', () => {
    const obj = {
      dev: expect.any(Boolean)
    }
    expect(Redity.config).toMatchObject(obj)
  })
})
