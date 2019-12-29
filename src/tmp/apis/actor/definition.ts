import { ActorResource, MovieResource } from './resources'

export type MovieAPIDefinition = {
  actors: ActorResource
  movies: MovieResource
}
