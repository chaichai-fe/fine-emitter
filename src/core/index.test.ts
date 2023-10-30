import { describe, vi, expect, test } from 'vitest'

import createEmitter from './index'

type Event = {
  bar: [id: string]
  foo: [age: number]
}

const emitter = createEmitter<Event>()

describe('createEmitter', () => {
  test('on() and emit()', () => {
    const cb1 = vi.fn()
    const cb2 = vi.fn()

    emitter.on('bar', cb1)
    emitter.on('foo', cb2)

    emitter.emit('bar', 'Hello')
    expect(cb1).toHaveBeenCalledWith('Hello')

    emitter.emit('foo', 123)
    expect(cb2).toHaveBeenCalledWith(123)
  })

  test('off()', () => {
    const cb1 = vi.fn()
    const cb2 = vi.fn()

    emitter.on('bar', cb1)
    emitter.on('foo', cb2)

    emitter.off('bar', cb1)

    emitter.emit('bar', 'World')
    expect(cb1).not.toHaveBeenCalled()

    emitter.emit('foo', 456)
    expect(cb2).toHaveBeenCalledWith(456)
  })

  test('clear()', () => {
    const cb = vi.fn()
    emitter.on('foo', cb)

    emitter.clear('foo')

    emitter.emit('foo', 123)
    expect(cb).not.toHaveBeenCalled()
  })
})
