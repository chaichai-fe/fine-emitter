import createEmitter from './core'

type Event = {
  change: [id: number, age: number]
  update: [value?: string]
}

const emitter = createEmitter<Event>()

emitter.on('change', (id, age) => {
  console.log(id, age)
})

emitter.emit('change', 12, 12)

emitter.on('update', (value) => {
  console.log(value)
})

emitter.emit('update')
