import superagent from 'superagent'

export abstract class BaseTransportClient {
  abstract async call(method: string, args: any): Promise<any>
}

export class RestTransportClient extends BaseTransportClient {
  public host: string
  public prefix: string

  constructor({ host, prefix = 'rpc' }: { host: string; prefix?: string }) {
    super()
    this.prefix = prefix
    this.host = host
  }

  call = async (method: string, args: any): Promise<any> => {
    const url = `${this.host}/rpc/${method}`
    const response = await superagent.post(url).send(args)
    return response.body
  }
}
