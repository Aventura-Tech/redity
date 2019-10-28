import BlockCode from '../src/blockcode'
import { symBCSetBlock } from '../src/utils/symbols'

describe('BlockCode: Constructor', () => {
  const blockCode = new BlockCode(false)

  it('Methods amd Property', () => {
    expect(blockCode).toHaveProperty('_dev')
    expect(blockCode).toHaveProperty('Status')
    expect(blockCode).toHaveProperty('id')
    expect(blockCode).toHaveProperty('num')
    expect(blockCode).toHaveProperty('sizeDone')
    // expect(blockCode).toHaveProperty(symBCSetBlock)
    expect(blockCode).toHaveProperty('start')
    expect(blockCode).toHaveProperty('block')
    expect(blockCode).toHaveProperty('getCurrent')
    expect(blockCode).toHaveProperty('catch')
    expect(blockCode).toHaveProperty('resolve')
    expect(blockCode).toHaveProperty('end')
    expect(blockCode).toHaveProperty('hide')
    expect(blockCode).toHaveProperty('unhide')
  })

  it('Definition', () => {
    const obj = {
      _dev: expect.any(Boolean),
      Status: expect.any(Object),
      id: expect.any(Number),
      num: expect.any(Number),
      sizeDone: expect.any(Number),
      [symBCSetBlock]: expect.any(Function),
      start: expect.any(Function),
      block: expect.any(Function),
      getCurrent: expect.any(Function),
      catch: expect.any(Function),
      resolve: expect.any(Function),
      end: expect.any(Function),
      hide: expect.any(Function),
      unhide: expect.any(Function)
    }
    expect(obj).toMatchObject(obj)
  })
})

describe('Blockcode: Errors', () => {
  const errIsStarted = new Error('Blockcode is already started')
  const errNotStarted = new Error('Blockcode has not been started')
  const errIsFinished = new Error('Blockcode has already been finalized')
  const errBlockNotFound = new Error('Start at least one block')
  const errMoreCatch = new Error('You cannot make more than one capture followed')
  const errDescription = new Error('The block require a description')

  it('Requires Start', () => {
    const blockCode = new BlockCode(false)
    expect(() => blockCode.block()).toThrow(errDescription)
    expect(() => blockCode.getCurrent()).toThrow(errNotStarted)
    expect(() => blockCode.catch()).toThrow(errNotStarted)
    expect(() => blockCode.resolve()).toThrow(errNotStarted)
    expect(() => blockCode.end()).toThrow(errNotStarted)
  })

  it('Start only once', () => {
    const blockCode = new BlockCode(false)
    expect(blockCode.start())
    expect(() => blockCode.start()).toThrow(errIsStarted)
  })

  it('Is Finished', () => {
    const blockCode = new BlockCode(false)
    blockCode.start()
    expect(blockCode.end())
    expect(() => blockCode.start()).toThrow(errIsFinished)
    expect(() => blockCode.block()).toThrow(errDescription)
    expect(() => blockCode.getCurrent()).toThrow(errIsFinished)
    expect(() => blockCode.catch()).toThrow(errIsFinished)
    expect(() => blockCode.resolve()).toThrow(errIsFinished)
    expect(() => blockCode.end()).toThrow(errIsFinished)
  })

  it('Catch and Resolve Block', () => {
    const blockCode = new BlockCode(false)
    blockCode.start()
    expect(blockCode.catch()).toBeFalsy()
    expect(() => blockCode.resolve()).toThrow(errBlockNotFound)
  })

  it('Catch a single block', () => {
    const blockCode = new BlockCode(false)
    blockCode.start()
    blockCode.block('A description')
    expect(blockCode.catch()).toBeTruthy()
    expect(blockCode.num).toBe(1)
    blockCode.end()
  })

  it('One more catch', () => {
    const blockCode = new BlockCode(false)
    blockCode.start()
    blockCode.block('A description')
    blockCode.catch()
    expect(() => blockCode.catch()).toThrow(errMoreCatch)
  })
})

describe('Blockcode: Basic', () => {
  it('Creating Block', () => {
    const spy = jest.spyOn(Map.prototype, 'set')
    const blockCode = new BlockCode(false)
    blockCode.start()
    blockCode.block('This is firts block')
    let currentBlock = blockCode.getCurrent()
    expect(currentBlock.id).toEqual(expect.any(Number))
    expect(currentBlock.blockcode_id).toEqual(expect.any(Number))
    expect(currentBlock.index).toBe(0)
    expect(currentBlock.num).toBe(1)
    expect(currentBlock.description).toEqual(expect.any(String))
    expect(currentBlock.ref).toEqual(null)
    expect(currentBlock.time).toBe(0)
    expect(currentBlock.status).toBe(blockCode.Status.RUNNING)
    expect(currentBlock.catch).toBe(null)
    blockCode.block('This is other block')
    currentBlock = blockCode.getCurrent()
    expect(currentBlock.index).toBe(1)
    expect(currentBlock.num).toBe(2)
    blockCode.end()
    expect(blockCode.sizeDone).toBe(2)
    expect(spy).toHaveBeenCalledTimes(2)
    spy.mockRestore()
  })

  it('Blockcode finished', () => {
    const spy = jest.spyOn(Map.prototype, 'set')
    const blockCode = new BlockCode(false)
    blockCode.start()
    blockCode.block('A block')
    blockCode.block('Second block')
    blockCode.block('block 3')
    const listBlocks = blockCode.end()
    expect(blockCode.sizeDone).toBe(3)
    expect(typeof listBlocks).toBe('object')
    expect(spy).toHaveBeenCalledTimes(3)
    spy.mockRestore()
  })

  it('Catch block', () => {
    const spy = jest.spyOn(Map.prototype, 'set')
    const blockCode = new BlockCode(false)
    blockCode.start()
    blockCode.block('A block')
    blockCode.catch('information')
    blockCode.block('Other Block')
    expect(blockCode.num).toBe(2)
    expect(blockCode.sizeDone).toBe(1)
    const listBlocks = blockCode.end()
    expect(spy).toHaveBeenCalledTimes(2)
    spy.mockRestore()
    expect(blockCode.sizeDone).toBe(2)
    const idBlocks = Object.keys(listBlocks)
    expect(idBlocks.length).toBe(2)
    expect(listBlocks[idBlocks[0]].status).toBe(blockCode.Status.FAIL)
  })

  it('Resolved Block', () => {
    const spy = jest.spyOn(Map.prototype, 'set')
    const blockCode = new BlockCode(false)
    blockCode.start()
    blockCode.block('A block')
    blockCode.block('Other block')
    blockCode.catch({ name: null })
    expect(blockCode.resolve()).toBeTruthy()
    expect(blockCode.resolve()).toBeFalsy()
    blockCode.block('Last Block')
    expect(blockCode.resolve()).toBeFalsy()
    const listBlocks = blockCode.end()
    expect(spy).toHaveBeenCalledTimes(4)
    spy.mockRestore()
    const idBlocks = Object.keys(listBlocks)
    expect(idBlocks.length).toBe(3)
    expect(listBlocks[idBlocks[0]].status).toBe(blockCode.Status.SUCCESS)
    expect(listBlocks[idBlocks[1]].status).toBe(blockCode.Status.RESOLVED)
    expect(listBlocks[idBlocks[2]].status).toBe(blockCode.Status.SUCCESS)
  })
})
