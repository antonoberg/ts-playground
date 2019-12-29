import { Actor, Movie } from '../../../models'

export class ActorResource {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getById(id: string, serverArgs: any): Promise<Actor> {
    throw new Error('implement')
  }
}

export class MovieResource {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getById(id: string): Promise<Movie> {
    throw new Error('implement')
  }
}
