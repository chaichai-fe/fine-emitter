# fei-emitter

> A tiny functional event emitter

# Install

```bash
npm install --save fei-emitter
```

# Usage

```javascript
import createEmitter from 'fei-emitter'

const emitter = createEmitter()

// listen to an event
emitter.on('foo', (e) => console.log('foo', e))

// fire an event
emitter.emit('foo', { a: 'b' })

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
  update: [msg?: string]
}

const emitter = createEmitter<Events>()

emitter.on('foo', (id, msg) => {}) // 'id' and 'msg' has inferred type 'string'

emitter.emit('foo', '1001', 'this is msg')
```
