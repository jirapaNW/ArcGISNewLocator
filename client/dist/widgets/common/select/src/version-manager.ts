import { WidgetVersionManager, type WidgetUpgradeInfo } from 'jimu-core'
import { type IMConfig } from './config'
import { getUseDataSourcesByConfig } from './setting/utils'

class VersionManager extends WidgetVersionManager {
  versions = [
    {
      version: '1.15.0',
      description: 'remove useless useDataSources from Select widget',
      upgradeFullInfo: true,
      upgrader: (oldWidgetInfo: WidgetUpgradeInfo) => {
        const oldWidgetJson = oldWidgetInfo?.widgetJson

        const oldConfig = oldWidgetJson?.config as IMConfig

        if (!oldConfig) {
          return oldWidgetInfo
        }

        let newConfig = oldConfig

        if (newConfig.useMap) {
          // Interact with a Map widget
          // clear config.dataAttributeInfo.dataSourceItems
          if (newConfig.dataAttributeInfo?.dataSourceItems?.length > 0) {
            newConfig = newConfig.setIn(['dataAttributeInfo', 'dataSourceItems'], [])
          }
        } else {
          // Select by attributes
          const jimuMapViews = newConfig.mapInfo?.jimuMapViews

          // clear config.mapInfo?.jimuMapViews
          if (jimuMapViews && Object.keys(jimuMapViews).length > 0) {
            newConfig = newConfig.setIn(['mapInfo', 'jimuMapViews'], {})
          }
        }

        if (oldConfig === newConfig) {
          // nothing changed
          return oldWidgetInfo
        }

        // config changed
        const useDataSources = getUseDataSourcesByConfig(newConfig)
        const newWidgetJson = oldWidgetJson.set('config', newConfig).set('useDataSources', useDataSources)
        const newWidgetInfo = { ...oldWidgetInfo }
        newWidgetInfo.widgetJson = newWidgetJson

        return newWidgetInfo
      }
    }
  ]
}

export const versionManager = new VersionManager()
