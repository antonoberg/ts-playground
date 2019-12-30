import superagent from 'superagent'

export abstract class BaseTransportClient {
  abstract async call(provider: string, method: string, args: any): Promise<any>
}

export class RestTransportClient extends BaseTransportClient {
  public host: string
  public prefix: string

  constructor({ host, prefix = 'rpc' }: { host: string; prefix?: string }) {
    super()
    this.prefix = prefix
    this.host = host
  }

  call = async (provider: string, method: string, args: any): Promise<any> => {
    const url = `${this.host}/rpc/${provider}/${method}`
    try {
      const response = await superagent.post(url).send(args)
      return response.body
    } catch (err) {
      console.log('err', err)
      throw err
    }
  }
}
