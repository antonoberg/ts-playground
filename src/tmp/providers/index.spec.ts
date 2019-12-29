// import { actorRpcClient } from './index'

// it('works', async (): Promise<void> => {
//   const actor = await actorRpcClient.getById('123')

//   expect(1).toBe(1)
// })

// type UnionToIntersection<U> = (U extends any
// ? (k: U) => void
// : never) extends (k: infer I) => void
//   ? I
//   : never

// type Foo = [string, number]

// type tmp = UnionToIntersection<Foo>

abstract class Test {
  public abstract test(): void
}

it('works', (): void => {
  console.log('Test', Test)
  console.log(Object.getOwnPropertyNames(Test.prototype))
  expect(1).toBe(1)
})

class DO {
  public bye() {
    console.log('bye')
  }
}

class ME {
  public hello() {
    console.log('hello')
  }
}

class RE {
  public wow() {
    console.log('bye')
  }
}

export class RpcClient {
  call(arg: string): void {
    console.log('call', arg)
  }
}

function createRpcClient<T, K extends RpcClient>(
  Klass: new () => T,
  base: K
): K & T {
  Object.getOwnPropertyNames(Klass.prototype).forEach((method: any) => {
    if (method !== 'constructor') {
      ;(base as any)[method] = function(arg: string): any {
        base.call(arg)
      }
    }
  })

  return base as K & T
}

class BaseClass {}

interface Resources {
  [key: string]: any
}

class Client<T extends Resources> {
  public resources: { [K in keyof T]: T[K] }

  constructor(resources: { [K in keyof T]: new () => T[K] }) {
    this.resources = Object.keys(resources).reduce((obj: any, key: any) => {
      return {
        ...obj,
        [key]: createRpcClient(resources[key], new RpcClient()),
      }
    }, {})
  }
}

const resourceClassMap = {
  do: DO,
  re: RE,
}

const api = new Client(resourceClassMap)

class Server<T extends Resources> {
  public resources: T

  constructor(resources: T) {
    this.resources = resources
  }
}

const server = new Server({
  do: new DO(),
  re: new RE(),
})

type CustomAPI = {
  do: DO
  re: RE
}

class SpecialServer extends Server<CustomAPI> {}
class SpecialClient extends Client<CustomAPI> {}

const tmp = new SpecialServer({ do: new DO(), re: new RE() })
const tmp2 = new SpecialClient({ do: DO, re: RE })

tmp.resources.do.bye()
tmp2.resources.do.bye()

console.log('client', api.resources.do.bye())
type tmp = typeof resourceClassMap

// api.resources.do.bye()
// api.resources.re.wow()

// class Event {}

// class FooEvent extends Event {
//   type = 'foo'
// }

// class BarEvent extends Event {
//   type = 'bar'
// }

// let Events = { FooEvent, BarEvent }

// type Handler = {
//   [K in keyof typeof Events]?: (event: InstanceType<typeof Events[K]>) => void
// }

// let FooHandler: Handler = {
//   FooEvent(event: FooEvent) {
//     event.type
//   },
// }
