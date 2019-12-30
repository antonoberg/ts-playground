import { MusicAPIDefinition } from '../../shared/apis'
import { Resolver } from '../../../lib/server'

type MyType = {
  req: any
}

type BaseWithB<T> = T extends (input: infer U) => infer R
  ? (input: U, serverArgs: MyType) => R
  : never

type Extends<T> = {
  [P in keyof T]: BaseWithB<T[P]>
}

type Tmp = {
  [P in keyof MusicAPIDefinition]: Extends<MusicAPIDefinition[P]>
}

export function createMusicResolver(input: Tmp): Resolver<Tmp> {
  return new Resolver<Tmp>(input)
}
