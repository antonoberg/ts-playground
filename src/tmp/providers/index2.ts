export class RpcClient {
  call(arg: string): void {
    console.log('call', arg)
  }
}

function createRpcClient2<T extends object, C extends object>(
  Klass1: new () => T,
  Klass2?: new () => C
) {
  return function inner<K>(base: K) {
    Object.getOwnPropertyNames(Klass1.prototype).forEach((method: any) => {
      if (method !== 'constructor') {
        ;(base as any)[method] = function(arg: string): any {
          ;(base as any).call(arg)
        }
      }
    })
    if (Klass2) {
      Object.getOwnPropertyNames(Klass2.prototype).forEach((method: any) => {
        if (method !== 'constructor') {
          ;(base as any)[method] = function(arg: string): any {
            ;(base as any).call(arg)
          }
        }
      })
    }

    return base as K & T & C
  }
}

// function combine<
//   A extends object,
//   B extends object,
//   C extends object,
//   D extends object,
//   E extends object,
//   F extends object
// >(a: A, b?: B, c?: C, d?: d, e?: E, f?: E) {
//   return ('tmp' as unknown) as A & B & C & D & E & F
// }

class ME {
  public hello(str: string): boolean {
    console.log('hello', str)
    return false
  }
}

class DO {
  public bye() {
    console.log('bye')
  }
}

class RE {
  public wow() {
    console.log('bye')
  }
}

const res = createRpcClient2(ME, DO)({})
type tmp = typeof res

type ArgumentTypes<T> = T extends (...args: infer U) => infer R ? U : never
type ReplaceReturnType<T extends (...args: any) => any> = (
  ...a: ArgumentTypes<T>
) => ReturnType<T> | undefined

type WithOptional = ReplaceReturnType<tmp['hello']>

type methods = { [K in keyof tmp]: ReplaceReturnType<tmp[K]> }

const fn: methods['hello'] = (input: string) => {
  if (input === 'hej') {
    return true
  }
  return undefined
}

// const tmp = combine(new ME(), new DO())

// const tmp2 = combine(tmp, new RE())

// function combine<T, R>(a: T, ...rest: Array<R>) {
//   if (rest.length > 1) {
//     return (0 as T) && combine(...rest)
//   }
// }

// import { Actor } from '../models'

// export class ActorData {
//   public async getById(id: string): Promise<Actor> {
//     throw new Error('mjau')
//   }
// }

// export class ActorDataDataSource extends ActorData {
//   public async getById(id: string): Promise<Actor> {
//     return {
//       id,
//       name: 'Anton',
//     }
//   }
// }

// function createRpcClient<T, K extends RpcClient>(
//   Klass: new () => T,
//   base: K
// ): K & T {
//   Object.getOwnPropertyNames(Klass.prototype).forEach((method: any) => {
//     if (method !== 'constructor') {
//       ;(base as any)[method] = function(arg: string): any {
//         base.call(arg)
//       }
//     }
//   })

//   return base as K & T
// }

// // export class RpcServer2 {

// //   on(key: string, callback: Function): void {
// //     console.log(key, callback)
// //   }

// // }

// export class RpcClient {
//   call(arg: string): void {
//     console.log('call', arg)
//   }

//   append<T>(
//     Klass: new () => T
//   ): {
//     // Object.getOwnPropertyNames(Klass.prototype).forEach((method: any) => {
//     //   if (method !== 'constructor') {
//     //     ;(this as any)[method] = function(arg: string): any {
//     //       this.call(arg)
//     //     }
//     //   }
//     // })
//   }
// }

// // function createRpcServer<T>(Klass: new () => T): new () => RpcServer<T> {
// //   class Test extends RpcServer<T> {
// //     public constructor(dataSource: T) {
// //       super(dataSource)['a'].forEach(method => {
// //         this.on(method, args => {
// //           this.dataSource[method](args)
// //         })
// //       })
// //     }
// //   }

// //   return Test
// // }

// export class RpcClient {
//   call(arg: string): void {
//     console.log('call', arg)
//   }
// }

// function createRpcClient<T, K extends RpcClient>(
//   Klass: new () => T,
//   base: K
// ): K & T {
//   Object.getOwnPropertyNames(Klass.prototype).forEach((method: any) => {
//     if (method !== 'constructor') {
//       ;(base as any)[method] = function(arg: string): any {
//         base.call(arg)
//       }
//     }
//   })

//   return base as K & T
// }

// function createRpcClient2<T>(Klass: new () => T) {
//   return function inner<K extends RpcClient>(base: k): K & T {
//     Object.getOwnPropertyNames(Klass.prototype).forEach((method: any) => {
//       if (method !== 'constructor') {
//         ;(base as any)[method] = function(arg: string): any {
//           base.call(arg)
//         }
//       }
//     })

//     return base as K & T
//   }
// }

// export const actorRpcClient = createRpcClient2(ActorData)(new RpcClient())

// // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// export const pipe = <T extends any[], R>(
//   fn1: (...args: T) => R,
//   ...fns: Array<(a: R) => R>
// ) => {
//   const piped = fns.reduce(
//     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//     (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
//     value => value
//   )
//   // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//   return (...args: T) => piped(fn1(...args))
// }

// class Test {
//   public clear(): void {
//     console.log('hello')
//   }
// }

// const a1 = createRpcClient2(ActorData)
// const a2 = createRpcClient2(Test)

// const a = pipe(a1, a2)(new RpcClient())

// // actorRpcClient.getById

// // class Api {
// //   public rpcClients: {
// //     [key: string]: any
// //   }

// //   constructor() {}
// // }

// // const api = new Api()

// // // // type MapSchema<T extends Record<string, keyof ActorData>> = {
// // // //   [K in keyof T]: ActorData[T[K]]
// // // // }

// // // type MethodsKeys = keyof ActorData

// // // type MethodsSignature = {
// // //   [K in MethodsKeys]: ActorData[K]
// // // }

// // // class MyClass {
// // //   start() {}
// // // }
// // // MyClass.prototype['stop'] = function() {
// // //   alert('Stop')
// // // }

// // // interface MyClass {
// // //   stop(): void
// // // }

// // // const example = new MyClass()
// // // example.stop() // Allowed!!!

// // // type test = ['string', number]

// // // type test2 = test['0']

// // const arr: ['ste', 1] = ['ste', 1]

// // function test()

// // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// export const exp = <R>(fns: Array<R>) => {
//   return fns[0] as R
// }

// const t = exp(['a', 1])
