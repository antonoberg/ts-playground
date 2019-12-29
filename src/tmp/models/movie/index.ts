import { Actor } from '../actor'

export class Movie {
  public name: string
  public actors: Array<Actor>

  constructor({ name, actors }: { name: string; actors: Array<Actor> }) {
    this.name = name
    this.actors = actors
  }
}
