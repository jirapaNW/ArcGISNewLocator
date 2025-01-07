import {
  getAppStore, MessageType, MessageCarryData, type UseDataSource, type IMUseDataSource, Immutable,
  DataSourceManager, type ImmutableArray, type IMWidgetJson, DataSourceTypes
} from 'jimu-core'
import { ArcGISDataSourceTypes } from 'jimu-arcgis'

export function isUseOutputDataSources (wId: string, messageType: MessageType): boolean {
  const messageCarryData = getMessageCarryDataByWidgetId(wId, messageType)
  return messageCarryData === MessageCarryData.OutputDataSource
}

/**
 * wId can publish different messages, different message maybe support different data source types: USE_DATA_SOURCE, OUTPUT_DATA_SOURCE and BOTH_DATA_SOURCE.
 * This info is defined in widget manifest.json.
 * e.g.
 * For Search widget,
 * If the published message type is DATA_RECORDS_SELECTION_CHANGE, messageCarryData is BOTH_DATA_SOURCE.
 * If the published message type is DATA_RECORD_SET_CHANGE, messageCarryData is OUTPUT_DATA_SOURCE.
 * If the published message type is DATA_SOURCE_FILTER_CHANGE, messageCarryData is BOTH_DATA_SOURCE.
 * @param wId
 * @param messageType
 * @returns
 */
export function getMessageCarryDataByWidgetId (wId: string, messageType: MessageType): MessageCarryData {
  const appConfig = getAppConfig()
  const widgetJson = appConfig?.widgets?.[wId]
  const publishMessages = widgetJson?.manifest?.publishMessages
  let messageCarryData = MessageCarryData.UseDataSource
  publishMessages?.forEach(el => {
    const publishMessageProperty = el as any
    if (publishMessageProperty?.messageCarryData && publishMessageProperty?.messageType === messageType) {
      messageCarryData = publishMessageProperty?.messageCarryData
    }
  })
  return messageCarryData
}

export interface ActionConfig {
  useDataSource: UseDataSource
  useDataSources?: UseDataSource[]
}

// This method is only used by zoom-to and pan-to message action in setting componentDidMount method.
export function checkOutActionConfigForZoomToAndPanToMessageActions (actionConfig: Immutable.ImmutableObject<ActionConfig>, messageWidgetId: string, messageType: MessageType) {
  const config = getAppConfig()
  //const messageWidgetJson = config.widgets[messageWidgetId]

  let useDataSource: IMUseDataSource = null
  const useDataSources: IMUseDataSource[] = []
  // When opening the message action setting for the first time, this.props.config is { useDataSource: null }.
  if (!actionConfig.useDataSource) {
    // Case1: If actionConfig.useDataSource is null, it is the the first time to open the message action setting.

    let messageWidgetUseDataSources = getDsByWidgetId(messageWidgetId, messageType)

    // filter the initial data sources
    messageWidgetUseDataSources = messageWidgetUseDataSources.filter((imUseDataSource) => {
      const dsId = imUseDataSource.dataSourceId
      return validateDataSourceForZoonToAndPanToMessageActionInSetting(dsId, messageType)
    })

    //if (messageWidgetJson && messageWidgetJson.useDataSources && messageWidgetJson.useDataSources.length > 0) {
    if (messageWidgetUseDataSources.length > 0) {
      messageWidgetUseDataSources.forEach((useDS, index) => {
        const dsJson = config.dataSources[useDS.dataSourceId]
        let tempUseDataSource
        if (dsJson && ((dsJson.type === ArcGISDataSourceTypes.WebMap) || (dsJson.type === ArcGISDataSourceTypes.WebScene))) {
          tempUseDataSource = null
        } else {
          tempUseDataSource = Immutable({
            dataSourceId: useDS.dataSourceId,
            mainDataSourceId: useDS.mainDataSourceId,
            rootDataSourceId: useDS.rootDataSourceId,
            dataViewId: useDS.dataViewId
          })
          if (!useDataSource) {
            useDataSource = tempUseDataSource
          }
          useDataSources.push(tempUseDataSource)
        }
      })
    }
  } else {
    // Case2: If actionConfig.useDataSource is not null, it is not the the first time to open the message action setting.

    // the data source maybe removed, so need to validate the actionConfig.useDataSource again
    useDataSource = checkOutUseDataSource(messageWidgetId, actionConfig.useDataSource, messageType)
    if (actionConfig.useDataSources) {
      actionConfig.useDataSources.forEach(useDS => {
        const tempUseDataSource = checkOutUseDataSource(messageWidgetId, useDS, messageType)
        tempUseDataSource && useDataSources.push(tempUseDataSource)
      })
    }
  }

  return {
    useDataSource: useDataSource,
    useDataSources: useDataSources
  }
}

// validate the data source is valid or not for the message type
function validateDataSourceForZoonToAndPanToMessageActionInSetting (dsId: string, messageType: MessageType): boolean {
  if (messageType === MessageType.DataSourceFilterChange) {
    // If ds is ImageryLayer, then zoom-to message action and pan-to message action don't support filtering change message.
    const ds = DataSourceManager.getInstance().getDataSource(dsId)

    if (ds) {
      if (ds.type === DataSourceTypes.ImageryLayer) {
        return false
      }
    }
  }

  return true
}

function checkOutUseDataSource (messageWidgetId: string, oldUseDataSource: Immutable.ImmutableObject<UseDataSource>, messageType: MessageType) {
  const config = getAppConfig()
  //const widgetJson = config.widgets[messageWidgetId]
  const messageWidgetUseDataSources = getDsByWidgetId(messageWidgetId, messageType)
  let initUseDataSource = null
  let isMapDs = false

  const dsId = messageWidgetUseDataSources && messageWidgetUseDataSources[0] && messageWidgetUseDataSources[0].dataSourceId
  if (!dsId) {
    return null
  }

  const dsJson = config.dataSources[dsId]
  if (dsJson && ((dsJson.type === ArcGISDataSourceTypes.WebMap) || (dsJson.type === ArcGISDataSourceTypes.WebScene))) {
    isMapDs = true
  }

  const dsM = DataSourceManager.getInstance()
  const isoldUseDataSourceIsOutputDs = dsM.getDataSource(oldUseDataSource.dataSourceId)?.getDataSourceJson()?.isOutputFromWidget

  if (isMapDs) {
    // webmap or webscene ds
    let isUseOldDs = false
    if (messageWidgetUseDataSources) {
      for (let i = 0; i < messageWidgetUseDataSources.length; i++) {
        if (messageWidgetUseDataSources[i].dataSourceId === oldUseDataSource.rootDataSourceId) {
          isUseOldDs = true
          break
        }
      }
    }

    if (isUseOldDs) {
      initUseDataSource = oldUseDataSource
    } else {
      initUseDataSource = null
    }
  } else {
    // featurelayer ds
    let isUseOldDs = false
    if (messageWidgetUseDataSources) {
      for (let i = 0; i < messageWidgetUseDataSources.length; i++) {
        const oldUseDataSourceId = isoldUseDataSourceIsOutputDs ? oldUseDataSource?.mainDataSourceId : oldUseDataSource?.dataSourceId
        const currentUseDataSourceId = isoldUseDataSourceIsOutputDs ? messageWidgetUseDataSources[i]?.mainDataSourceId : messageWidgetUseDataSources[i]?.dataSourceId
        // support data view
        if (currentUseDataSourceId === oldUseDataSourceId) {
          isUseOldDs = true
          break
        }
      }
    }

    if (isUseOldDs) {
      initUseDataSource = oldUseDataSource
    } else {
      if (messageWidgetUseDataSources && messageWidgetUseDataSources.length === 1) {
        initUseDataSource = Immutable({
          dataSourceId: messageWidgetUseDataSources[0].dataSourceId,
          mainDataSourceId: messageWidgetUseDataSources[0].mainDataSourceId,
          rootDataSourceId: messageWidgetUseDataSources[0].rootDataSourceId
        })
      } else {
        initUseDataSource = null
      }
    }
  }

  return initUseDataSource
}

// this method is only used in zoom-to setting and pan-to setting
export function getUseDataSourceInfoForZoomToAndPanToMessageActions (widgetId: string, useDataSource: Immutable.ImmutableObject<UseDataSource>, useDataSources: Immutable.ImmutableArray<UseDataSource>, messageType: MessageType) {
  const appConfig = getAppConfig()
  const widgetJson = appConfig?.widgets?.[widgetId]
  let isReadOnly = false
  const dsRootIds = getDsRootIdsByWidgetId(widgetId)
  //if (dsRootIds && dsRootIds.length === 0 && (widgetJson && widgetJson.useDataSources && widgetJson.useDataSources.length === 1)) {
  //  isReadOnly = true
  //}

  //if (!dsRootIds && (widgetJson && widgetJson.useDataSources && widgetJson.useDataSources.length === 1)) {
  //  isReadOnly = true
  //}

  if (!dsRootIds || dsRootIds?.length === 0) {
    isReadOnly = checkIsOnlyOneDs(widgetJson, messageType, dsRootIds)
  }

  // const fromDsIds = dsRootIds ? undefined : getDsIdsByWidgetId(widgetId, messageType)
  let fromDsIds: undefined | ImmutableArray<string>

  if (dsRootIds) {
    fromDsIds = undefined
  } else {
    const dsIds: ImmutableArray<string> = getDsIdsByWidgetId(widgetId, messageType)
    // filter fromDsIds
    // If ds is ImageryLayer, then zoom-to message action and pan-to message action don't support filtering change message.
    fromDsIds = dsIds.filter((dsId: string) => {
      return validateDataSourceForZoonToAndPanToMessageActionInSetting(dsId, messageType)
    })
  }

  const dsSelectorSource = {
    isReadOnly: isReadOnly,
    useDataSource: useDataSource,
    useDataSources: useDataSources || Immutable([]),
    fromRootDsIds: dsRootIds,
    fromDsIds: fromDsIds
  }

  return dsSelectorSource
}

/**
 * Return useDataSources by check widgetJson.useDataSources, widgetJson.outputDataSources and messageCarryData.
 * Firstly, get the messageCarryData by wId_widgetManifestJson.publishMessages[messageType].messageCarryData.
 * Then check messageCarryData,
 * If messageCarryData is MessageCarryData.UseDataSource, return widgetJson.useDataSources.
 * If messageCarryData is MessageCarryData.OutputDataSource, return widgetJson.outputDataSources.
 * If messageCarryData is MessageCarryData.BothDataSource, return widgetJson.useDataSources + widgetJson.outputDataSources.
 * @param wId
 * @param messageType
 * @returns
 */
export function getDsByWidgetId (wId: string, messageType: MessageType): ImmutableArray<UseDataSource> {
  // get the messageCarryData by wId_widgetManifestJson.publishMessages[messageType].messageCarryData
  const messageCarryData = getMessageCarryDataByWidgetId(wId, messageType)
  const appConfig = getAppConfig()
  const widgetJson = appConfig?.widgets?.[wId]
  const useDataSources = widgetJson?.useDataSources || Immutable([])
  const outputDataSources = initOutputDataSources(widgetJson?.outputDataSources) || Immutable([])
  const bothDatasource = useDataSources?.asMutable({ deep: true }).concat(outputDataSources?.asMutable({ deep: true }))
  switch (messageCarryData) {
    case MessageCarryData.OutputDataSource:
      return outputDataSources
    case MessageCarryData.UseDataSource:
      return useDataSources
    case MessageCarryData.BothDataSource:
      return Immutable(bothDatasource)
  }
}

export function initOutputDataSources (outputDataSources): ImmutableArray<UseDataSource> {
  const ds = outputDataSources?.map(dsId => {
    return {
      dataSourceId: dsId,
      mainDataSourceId: dsId,
      rootDataSourceId: null
    }
  }) ?? []
  return Immutable(ds)
}

export function checkIsOnlyOneDs (widgetJson: IMWidgetJson, messageType: MessageType, dsRootIds: ImmutableArray<string>): boolean {
  const messageCarryData = getMessageCarryDataByWidgetId(widgetJson?.id, messageType)
  const outputDs = widgetJson?.outputDataSources || []
  const useDs = widgetJson?.useDataSources || []
  if (dsRootIds) {
    return false
  }
  switch (messageCarryData) {
    case MessageCarryData.OutputDataSource:
      return outputDs?.length === 1
    case MessageCarryData.UseDataSource:
      return useDs?.length === 1
    case MessageCarryData.BothDataSource:
      const dsLength = outputDs.length + useDs.length
      return dsLength === 1
  }
}

export function getAppConfig () {
  return window.jimuConfig.isBuilder ? getAppStore().getState()?.appStateInBuilder?.appConfig : getAppStore().getState()?.appConfig
}

function getDsRootIdsByWidgetId (wId: string) {
  const appConfig = getAppConfig()
  const widgetJson = appConfig?.widgets?.[wId]
  const rootIds = []
  const dsM = DataSourceManager.getInstance()
  widgetJson?.useDataSources?.forEach((useDS: Immutable.ImmutableObject<UseDataSource>) => {
    const ds = dsM.getDataSource(useDS.dataSourceId)
    if (ds?.type === ArcGISDataSourceTypes.WebMap || ds?.type === ArcGISDataSourceTypes.WebScene) { // is root ds
      rootIds.push(useDS.dataSourceId)
    }
  })
  return rootIds.length > 0 ? Immutable(rootIds) : undefined
}

function getDsIdsByWidgetId (wId: string, messageType: MessageType) {
  const messageWidgetUseDataSources = getDsByWidgetId(wId, messageType)
  return Immutable(messageWidgetUseDataSources.map((useDS: Immutable.ImmutableObject<UseDataSource>) => {
    const dsM = DataSourceManager.getInstance()
    const ds = dsM.getDataSource(useDS.dataSourceId)
    let resultDs
    if (ds && ds.isDataView) {
      // support data view
      resultDs = ds?.getMainDataSource()
    } else {
      resultDs = ds
    }
    return resultDs?.id
  }) ?? [])
}
