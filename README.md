# fei-emitter

> A tiny functional event emitter

# Install

```bash
npm install --save fei-emitter
```

# Usage

```javascript
import createEmitter from 'fei-emitter'

// create a emitter
const emitter = createEmitter()

// listen to an event
emitter.on('foo', (msg) => console.log('foo', msg))

// fire an event
// log 'this is msg'
emitter.emit('foo', 'this is msg')

// clear the all event by enent type
emitter.clear('foo')

// working with handler references
function onFoo() {}
emitter.on('foo', onFoo) // listen
emitter.off('foo', onFoo) // unlisten
```

# TypeScript

```typescript
import createEmitter from 'fei-emitter'

type Events = {
  change: [id: string, msg: string]
  update: [count?: number]
}

const emitter = createEmitter<Events>()

emitter.on('foo', (id, msg) => {}) // 'id' and 'msg' has inferred type 'string'

emitter.emit('foo', '1001', 'this is msg')

emitter.on('update', (count) => console.log(count)) // 'count' has inferred type 'number | undefined'

emitter.emit('foo', 100) // it is ok
emitter.emit('foo') // it is ok
emitter.emit('foo', '100') // type 'string' is not assignable to type 'number'
```
