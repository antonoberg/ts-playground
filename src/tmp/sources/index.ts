import { ActorData } from '../interfaces'
import { Actor } from '../models'

export class ActorDataSource implements ActorData {
  async getById(id: string): Promise<Actor> {
    return {
      id,
      name: 'Anton',
    }
  }
}
