import { Providers } from '../shared'
import { BaseTransportClient, RestTransportClient } from './transports'

export { RestTransportClient }

export class ClientProvider {
  public callMethod: BaseTransportClient['call']
  constructor(callMethod: BaseTransportClient['call']) {
    this.callMethod = callMethod
  }
  async call(provider: string, method: string, args: any): Promise<any> {
    return this.callMethod(provider, method, args)
  }
}

function createClientProvider<T, K extends ClientProvider>(
  key: string,
  Klass: new () => T,
  base: K
): K & T {
  Object.getOwnPropertyNames(Klass.prototype).forEach((method: any) => {
    if (method !== 'constructor') {
      ;(base as any)[method] = function(arg: string): any {
        return base.call(key, method, arg)
      }
    }
  })

  return base as K & T
}

export class ApiClient<T extends Providers> {
  public providers: { [K in keyof T]: T[K] }
  public transport: BaseTransportClient

  constructor(
    providers: { [K in keyof T]: new () => T[K] },
    transport: BaseTransportClient
  ) {
    this.transport = transport
    this.providers = Object.keys(providers).reduce((obj: any, key: any) => {
      return {
        ...obj,
        [key]: createClientProvider(
          key,
          providers[key],
          new ClientProvider(transport.call)
        ),
      }
    }, {})
  }
}
