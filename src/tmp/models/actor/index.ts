import { Movie } from '../movie'

export class Actor {
  public name: string
  public id: string

  constructor({ name, id }: { name: string; id: string }) {
    this.name = name
    this.id = id
  }
}

export class AggregatedActor extends Actor {
  public movies: Array<Movie>

  constructor(input: AggregatedActor) {
    super(input)
    this.movies = input.movies
  }
}
