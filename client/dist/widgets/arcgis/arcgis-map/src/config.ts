import { type ImmutableObject } from 'jimu-core'
import { type IMJimuMapConfig } from 'jimu-ui/advanced/map'

export enum SceneQualityMode {
  auto = 'auto',
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export interface Config extends IMJimuMapConfig {
  isUseCustomMapState: boolean
  popupDockPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  sceneQualityMode: SceneQualityMode
  // webmap/webscene data source ids that enables client query
  clientQueryDataSourceIds?: string[]
}

export type IMConfig = ImmutableObject<Config>

export interface ToolConfig { [key: string]: boolean }
