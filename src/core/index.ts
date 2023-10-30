type DefaultEvent = Record<string, unknown[]>

// 存储事件的对象类型
type EventsMap<T extends DefaultEvent> = {
  [K in keyof T]: ((...args: T[K]) => void)[]
}

type ReturnType<T extends DefaultEvent> = {
  on<K extends keyof T>(eventName: K, cb: (...args: T[K]) => void): void
  emit<K extends keyof T>(eventName: K, ...args: T[K]): void
  off<K extends keyof T>(eventName: K, handler: Function): void
  clear<K extends keyof T>(eventName: K): void
}

function createEmitter<T extends DefaultEvent>(): ReturnType<T> {
  const eventMap: EventsMap<T> = {} as EventsMap<T>
  return {
    on(eventName, cb) {
      if (!eventMap[eventName]) {
        eventMap[eventName] = []
      }
      eventMap[eventName].push(cb)
    },
    emit(eventName, ...args) {
      const callbacks = eventMap[eventName]
      if (callbacks) {
        callbacks.forEach((cb) => cb(...args))
      }
    },
    off(eventName, handler) {
      const handlers = eventMap[eventName]
      const idx = handlers.findIndex((cb) => cb === handler)
      handlers.splice(idx, 1)
    },
    clear(eventName) {
      eventMap[eventName] = []
    },
  }
}

export default createEmitter
