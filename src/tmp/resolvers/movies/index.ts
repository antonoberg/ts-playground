import { Actor, Movie } from '../../models'
import { AggregatedActor } from '../../models/actor'

export class MovieDataProvider {
  async getMoviesByActorId(id: string): Promise<Array<Partial<Movie>>> {
    return [
      {
        name: 'anton',
      },
    ]
  }
}

export class RpcServer {
  public dataProviders: { [key: string]: any }
  constructor(dataProviders: { [key: string]: any }) {
    this.dataProviders = dataProviders
  }
  async on(dataProviderName: string, method: string, input: any): Promise<any> {
    const provider = this.dataProviders[dataProviderName]
    if (provider) {
      if (provider[method]) {
        return provider[method](input)
      }
    }
  }
}

export class RpcClient {
  async call(
    dataProviderName: string,
    method: string,
    input: any
  ): Promise<any> {
    console.log(dataProviderName, method, input)
  }
}

export class ActorDataProvider {
  private dataSource: ActorDataProvider
  private isClient: boolean
  private rpcClient?: RpcClient
  constructor({
    dataSource,
    isClient,
    rpcClient,
  }: {
    dataSource: ActorDataProvider
    isClient: boolean
    rpcClient: RpcClient
  }) {
    this.rpcClient = rpcClient
    this.dataSource = dataSource
    this.isClient = isClient
  }

  async getActorById(input: any): Promise<Partial<Actor>> {
    if (this.isClient && this.rpcClient) {
      return await this.rpcClient.call(
        'actorDataProvider',
        'getActorById',
        input
      )
    }

    return await this.dataSource.getActorById(input)
  }
}
type AbstractActorDataProviderMethods = 'getActorById' //keyof typeof ActorDataProvider.prototype

// export abstract class AbstractActorDataProvider {
//   abstract async getActorById(id: string): Promise<Partial<Actor>>
// }
// type AbstractActorDataProviderMethods = keyof typeof AbstractActorDataProvider.prototype

// export class Tmp extends AbstractActorDataProvider {
//   constructor() {
//     super()
//     Object.keys(AbstractActorDataProvider.prototype).forEach((tmp: any) => {
//       const typed: AbstractActorDataProviderMethods = tmp as AbstractActorDataProviderMethods
//       this[typed] = async (id): Promise<any> => {
//         return {
//           name: 'anton',
//         }
//       }
//     })
//   }
// }

export class ActorAggregator {
  public movieDataProvider: MovieDataProvider
  public actorDataProvider: ActorDataProvider
  constructor({
    actorDataProvider,
    movieDataProvider,
  }: {
    actorDataProvider: ActorDataProvider
    movieDataProvider: MovieDataProvider
  }) {
    this.actorDataProvider = actorDataProvider
    this.movieDataProvider = movieDataProvider
  }
  async getActorById(id: string): Promise<AggregatedActor> {
    const movies = await this.movieDataProvider.getMoviesByActorId(id)
    const actor = await this.actorDataProvider.getActorById(id)

    const aggregatedActor = new AggregatedActor({ ...actor, movies })

    return aggregatedActor
  }
}
