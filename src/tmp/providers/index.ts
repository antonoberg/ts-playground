import { ActorData } from '../apis/actor/resources'
import { Actor } from '../models'

// export class ActorData {
//   public async getById(id: string): Promise<Actor> {
//     throw new Error('mjau')
//   }
// }

export class ActorDataDataSource extends ActorData {
  public async getById(id: string): Promise<Actor> {
    return {
      id,
      name: 'Anton',
    }
  }
}

export class RpcServer<T> {
  public dataSource: T
  constructor(dataSource: T) {
    this.dataSource = dataSource
  }
  on(key: string, callback: Function): void {
    console.log(key, callback)
  }
}

// function createRpcServer<T>(Klass: new () => T): new () => RpcServer<T> {
//   class Test extends RpcServer<T> {
//     public constructor(dataSource: T) {
//       super(dataSource)['a'].forEach(method => {
//         this.on(method, args => {
//           this.dataSource[method](args)
//         })
//       })
//     }
//   }

//   return Test
// }

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

function createRpcClient2<T>(Klass: new () => T) {
  return function inner<K extends RpcClient>(base: K): K & T {
    Object.getOwnPropertyNames(Klass.prototype).forEach((method: any) => {
      if (method !== 'constructor') {
        ;(base as any)[method] = function(arg: string): any {
          base.call(arg)
        }
      }
    })

    return base as K & T
  }
}

export const actorRpcClient = createRpcClient2(ActorData)(new RpcClient())

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const pipe = <T extends any[], R>(
  fn1: (...args: T) => R,
  ...fns: Array<(a: R) => R>
) => {
  const piped = fns.reduce(
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
    value => value
  )
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return (...args: T) => piped(fn1(...args))
}

class Test {
  public clear(): void {
    console.log('hello')
  }
}

const a2 = createRpcClient2(Test)
const a1 = createRpcClient2(ActorData)

const a = a1(a2(new RpcClient()))

// actorRpcClient.getById

// class Api {
//   public rpcClients: {
//     [key: string]: any
//   }

//   constructor() {}
// }

// const api = new Api()

// // // type MapSchema<T extends Record<string, keyof ActorData>> = {
// // //   [K in keyof T]: ActorData[T[K]]
// // // }

// // type MethodsKeys = keyof ActorData

// // type MethodsSignature = {
// //   [K in MethodsKeys]: ActorData[K]
// // }

// // class MyClass {
// //   start() {}
// // }
// // MyClass.prototype['stop'] = function() {
// //   alert('Stop')
// // }

// // interface MyClass {
// //   stop(): void
// // }

// // const example = new MyClass()
// // example.stop() // Allowed!!!

// // type test = ['string', number]

// // type test2 = test['0']

// const arr: ['ste', 1] = ['ste', 1]

// function test()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const exp = <R>(fns: Array<R>) => {
  return fns[0] as R
}

const t = exp(['a', 1])
