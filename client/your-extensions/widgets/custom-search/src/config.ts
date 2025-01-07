import { type ImmutableObject } from 'seamless-immutable'

export interface Config {
  exampleConfigProperty: string
  apiUrl: string
  searchPlaceholder: string
  key: string
  font: string
}

export type IMConfig = ImmutableObject<Config>
