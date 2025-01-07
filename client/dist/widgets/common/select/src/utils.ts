import { type ImmutableArray, type UseDataSource, DataSourceTypes, Immutable } from 'jimu-core'
import { type JimuLayerView, LayerTypes } from 'jimu-arcgis'
import { type DataSourceItem, type IMConfig } from './config'

export const SUPPORTED_DATA_SOURCE_TYPES: DataSourceTypes[] = [DataSourceTypes.FeatureLayer, DataSourceTypes.SceneLayer, DataSourceTypes.BuildingComponentSubLayer, DataSourceTypes.OrientedImageryLayer, DataSourceTypes.ImageryLayer]

export const IM_SUPPORTED_DATA_SOURCE_TYPES = Immutable(SUPPORTED_DATA_SOURCE_TYPES)

export function isSupportedDataSourceType (dsType: string): boolean {
  return SUPPORTED_DATA_SOURCE_TYPES.includes(dsType as DataSourceTypes)
}

export const SUPPORTED_JIMU_LAYERVIEW_TYPES: string[] = [LayerTypes.FeatureLayer, LayerTypes.SceneLayer, LayerTypes.BuildingComponentSublayer, LayerTypes.OrientedImageryLayer, LayerTypes.ImageryLayer]

export function isSupportedJimuLayerView (jimuLayerView: JimuLayerView): boolean {
  if (!jimuLayerView || !jimuLayerView.type) {
    return false
  }

  const viewType = jimuLayerView.type

  // Some BuildingComponentSublayer doesn't have layer view, so need to check jimuLayerView.view here.
  // Note, we only check jimuLayerView for BuildingComponentSublayer and don't need to check jimuLayerView.view if layer is not BuildingComponentSublayer because sub feature layer doesn't have layer view.
  const isViewPass = (viewType !== LayerTypes.BuildingComponentSublayer) || (viewType === LayerTypes.BuildingComponentSublayer && jimuLayerView.view)
  const isValid = SUPPORTED_JIMU_LAYERVIEW_TYPES.includes(viewType) && isViewPass
  return !!isValid
}

export function getConfigWithValidDataSourceItems (config: IMConfig, useDataSources: ImmutableArray<UseDataSource>): IMConfig {
  if (config) {
    // filter config.dataAttributeInfo?.dataSourceItems by useDataSourceIds
    if (!config.useMap && config.dataAttributeInfo?.dataSourceItems?.length > 0) {
      const originalDataSourceItems = config.dataAttributeInfo?.dataSourceItems
      const validDataSourceItems = getValidDataSourceItems(originalDataSourceItems, useDataSources)

      if (validDataSourceItems && validDataSourceItems !== originalDataSourceItems) {
        config = config.setIn(['dataAttributeInfo', 'dataSourceItems'], validDataSourceItems)
      }
    }
  }

  return config
}

export function getValidDataSourceItems (dataSourceItems: ImmutableArray<DataSourceItem>, useDataSources: ImmutableArray<UseDataSource>): ImmutableArray<DataSourceItem> {
  let validDataSourceItems: ImmutableArray<DataSourceItem> = dataSourceItems

  // dataSourceItems maybe null
  if (dataSourceItems && dataSourceItems.length > 0) {
    // get useDataSourceIds by useDataSources
    const useDataSourceIds: string[] = []

    if (useDataSources && useDataSources.length > 0) {
      useDataSources.forEach(imUseDataSource => {
        const dataSourceId = imUseDataSource?.dataSourceId

        if (dataSourceId) {
          useDataSourceIds.push(dataSourceId)
        }
      })
    }

    // filter dataSourceItems by useDataSourceIds
    let isNewDataSourceItemsChanged = false

    const newDataSourceItems: ImmutableArray<DataSourceItem> = dataSourceItems.filter(imDataSourceItem => {
      const useDataSource = imDataSourceItem?.useDataSource
      const dataSourceId = useDataSource?.dataSourceId
      const isValid = dataSourceId && useDataSourceIds.includes(dataSourceId)

      if (!isValid) {
        isNewDataSourceItemsChanged = true
      }

      return isValid
    })

    if (isNewDataSourceItemsChanged) {
      validDataSourceItems = newDataSourceItems
    } else {
      validDataSourceItems = dataSourceItems
    }
  }

  if (!validDataSourceItems) {
    validDataSourceItems = dataSourceItems
  }

  return validDataSourceItems
}
