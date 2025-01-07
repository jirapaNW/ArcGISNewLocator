import { type ImmutableObject } from 'seamless-immutable'

export interface Config {
  font: string
}

export type IMConfig = ImmutableObject<Config>
