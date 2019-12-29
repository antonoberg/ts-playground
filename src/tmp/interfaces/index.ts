import { Actor } from '../../models'

export interface ActorData {
  getById: (id: string) => Promise<Actor>
}
