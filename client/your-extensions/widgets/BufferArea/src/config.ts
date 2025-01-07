import { type ImmutableObject } from 'seamless-immutable'

export interface Config {
  exampleConfigProperty: string
  apiUrl: string
  searchPlaceholder: string
  key: string
}

export type IMConfig = ImmutableObject<Config>
