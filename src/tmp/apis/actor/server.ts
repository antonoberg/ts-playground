import { MovieAPIDefinition } from './definition'

// LIB
interface Resources {
  [key: string]: any
}

export class Server<T extends Resources> {
  public resources: T

  constructor(resources: T) {
    this.resources = resources
  }
}

export class MovieServer extends Server<MovieAPIDefinition> {}

export class ActorResource {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getById(id: string, input: string): Promise<Actor> {
    throw new Error('implement')
  }
}

const actors = new ActorResource()

const movieServer = new MovieServer({ actors, movies: {} })
