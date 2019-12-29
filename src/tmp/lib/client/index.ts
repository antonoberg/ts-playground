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

interface Resources {
  [key: string]: any
}

export class Client<T extends Resources> {
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
