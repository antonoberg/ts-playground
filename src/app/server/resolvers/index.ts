import { MusicAPIDefinition } from '../../shared/apis'
import { Resolver } from '../../../lib/server'

export function createMusicResolver(
  input: MusicAPIDefinition
): Resolver<MusicAPIDefinition> {
  return new Resolver<MusicAPIDefinition>(input)
}
