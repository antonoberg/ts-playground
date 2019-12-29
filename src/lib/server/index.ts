import { Providers } from '../shared'

export class Resolver<T extends Providers> {
  public providers: T

  constructor(providers: T) {
    this.providers = providers
  }
}
