import { loadArcGISJSAPIModules, utils } from 'jimu-core'
import { type JimuMapView } from 'jimu-arcgis'

const localAppKey = utils.getLocalStorageAppKey()

export const getOldKey = (widgetId, mapWidgetId) => {
  return `${localAppKey}-${widgetId}-${mapWidgetId || 'default'}-RtBmArray`
}

export const getKey = (widgetId, mapWidgetId) => {
  return `${localAppKey}-bookmark-${widgetId}-bookmarks-${mapWidgetId || 'default'}`
}

export const getBookmarkListFromRuntime = (widgetId, mapWidgetId): string[] => {
  const oldKey = getOldKey(widgetId, mapWidgetId)
  const newKey = getKey(widgetId, mapWidgetId)
  return JSON.parse(utils.readLocalStorage(newKey) || utils.readLocalStorage(oldKey)) || []
}

export const emptyBookmarkListFromRuntime = (widgetId, mapWidgetId): void => {
  const oldKey = getOldKey(widgetId, mapWidgetId)
  const newKey = getKey(widgetId, mapWidgetId)
  utils.removeFromLocalStorage(newKey)
  utils.removeFromLocalStorage(oldKey)
}

export const applyTimeExtent = async (jimuMapView: JimuMapView, timeExtent: __esri.TimeExtentProperties) => {
  const jimuLayerViews = jimuMapView.getAllJimuLayerViews()
  loadArcGISJSAPIModules([
    'esri/layers/support/FeatureFilter'
  ]).then(modules => {
    const FeatureFilter: typeof __esri.FeatureFilter = modules[0]
    jimuLayerViews.forEach(jimuLayerView => {
      const featureLayerView = jimuLayerView.view as __esri.FeatureLayerView
      if (jimuLayerView.layer?.timeExtent) {
        featureLayerView.filter = new FeatureFilter({ timeExtent })
      }
    })
  })
}
