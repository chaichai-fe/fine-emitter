import { describe, vi, expect, test } from 'vitest'

import createEmitter from './index'

type Event = {
  bar: [id: string]
  foo: [age: number]
}

const emitter = createEmitter<Event>()

describe('createEmitter', () => {
  test('on() and emit()', () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()

    emitter.on('bar', callback1)
    emitter.on('foo', callback2)

    emitter.emit('bar', 'Hello')
    expect(callback1).toHaveBeenCalledWith('Hello')

    emitter.emit('foo', 123)
    expect(callback2).toHaveBeenCalledWith(123)
  })

  test('off()', () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()

    emitter.on('bar', callback1)
    emitter.on('foo', callback2)

    emitter.off('bar', callback1)

    emitter.emit('bar', 'World')
    expect(callback1).not.toHaveBeenCalled()

    emitter.emit('foo', 456)
    expect(callback2).toHaveBeenCalledWith(456)
  })

  test('clear()', () => {
    const cb = vi.fn()
    emitter.on('foo', cb)

    emitter.clear('foo')

    emitter.emit('foo', 123)
    expect(cb).not.toHaveBeenCalled()
  })
})
