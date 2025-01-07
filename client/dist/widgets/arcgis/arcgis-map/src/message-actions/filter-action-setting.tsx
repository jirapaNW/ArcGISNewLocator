/** @jsx jsx */
import {
  React, css, jsx, type ActionSettingProps, type SerializedStyles, type ImmutableObject, type DataSource,
  type IMThemeVariables, polished, getAppStore, Immutable,
  type UseDataSource, DataSourceComponent, type IMUseDataSource, type IMFieldSchema, type IMSqlExpression,
  dataSourceUtils, DataSourceManager, MessageType, SqlExpressionMode, type ImmutableArray, AllDataSourceTypes,
  MessageActionConnectionType
} from 'jimu-core'
import { Button, Icon, Switch, Collapse } from 'jimu-ui'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { FieldSelector, DataSourceSelector } from 'jimu-ui/advanced/data-source-selector'
import { ArcGISDataSourceTypes } from 'jimu-arcgis'
import { withTheme } from 'jimu-theme'

import { SqlExpressionBuilderPopup } from 'jimu-ui/advanced/sql-expression-builder'
import defaultMessages from '../setting/translations/default'
import * as actionUtils from './action-utils'
import ChooseConnectionType from 'jimu-for-builder/lib/message-actions/components/choose-connection-type'

interface ExtraProps {
  theme?: IMThemeVariables
}

interface States {
  isShowLayerList: boolean
  currentLayerType: 'trigger' | 'action'
  isSqlExprShow: boolean
}

interface Config {
  messageUseDataSource: UseDataSource
  actionUseDataSource: UseDataSource
  sqlExprObj?: IMSqlExpression

  enabledDataRelationShip?: boolean
  connectionType?: MessageActionConnectionType
}

export type IMConfig = ImmutableObject<Config>

const DSSelectorTypes = Immutable([
  AllDataSourceTypes.FeatureLayer,
  AllDataSourceTypes.SceneLayer,
  AllDataSourceTypes.BuildingComponentSubLayer,
  AllDataSourceTypes.ImageryLayer,
  AllDataSourceTypes.OrientedImageryLayer
])

class _FilterActionSetting extends React.PureComponent<ActionSettingProps<IMConfig> & ExtraProps, States> {
  modalStyle: any = {
    position: 'absolute',
    top: '0',
    bottom: '0',
    width: '259px',
    height: 'auto',
    borderRight: '',
    borderBottom: '',
    paddingBottom: '1px'
  }

  constructor (props) {
    super(props)

    this.modalStyle.borderRight = '1px solid black'
    this.modalStyle.borderBottom = '1px solid black'

    this.state = {
      isShowLayerList: false,
      currentLayerType: null,
      isSqlExprShow: false
    }
  }

  static defaultProps = {
    config: Immutable({
      messageUseDataSource: null,
      actionUseDataSource: null,
      sqlExprObj: null,
      enabledDataRelationShip: true
    })
  }

  initOutputDataSources = (outputDataSources): ImmutableArray<UseDataSource> => {
    const ds = outputDataSources?.map(dsId => {
      return {
        dataSourceId: dsId,
        mainDataSourceId: dsId,
        rootDataSourceId: null
      }
    }) ?? []
    return Immutable(ds)
  }

  getInitConfig = () => {
    const messageWidgetId = this.props.messageWidgetId
    const config = getAppStore().getState().appStateInBuilder.appConfig

    let messageUseDataSource: IMUseDataSource = null
    let actionUseDataSource: IMUseDataSource = null

    if (!this.props.config.messageUseDataSource) {
      // this.props.config.messageUseDataSource is empty
      // For filter message action, user can only select one layer data source as config.messageUseDataSource.
      // So, if useDataSources is only one layer data source, we can use it as config.messageUseDataSource because it is the only valid candidate layer data source.
      // If useDataSources.length >= 2, we can't pick one layer data source as the default config.messageUseDataSource, user must select it.
      const useDataSources = actionUtils.getDsByWidgetId(messageWidgetId, this.props.messageType)
      if (useDataSources?.[0] && useDataSources?.length === 1) {
        const dsJson = config.dataSources[useDataSources[0].dataSourceId]
        if (dsJson && ((dsJson.type === ArcGISDataSourceTypes.WebMap) || (dsJson.type === ArcGISDataSourceTypes.WebScene))) {
          // config.messageUseDataSource must be a layer data source, ignore the webmap/webscene
          messageUseDataSource = null
        } else {
          // useDataSources[0] is layer data source, use it as config.messageUseDataSource
          messageUseDataSource = Immutable({
            dataSourceId: useDataSources[0].dataSourceId,
            mainDataSourceId: useDataSources[0].mainDataSourceId,
            dataViewId: useDataSources[0].dataViewId,
            rootDataSourceId: useDataSources[0].rootDataSourceId
          })
        }
      }
    } else {
      // this.props.config.messageUseDataSource is not empty, but it maybe removed from messageWidgetJson.useDataSources,
      // so we need to validate if this.props.config.messageUseDataSource is still valid.
      // If this.props.config.messageUseDataSource is still in messageWidgetJson.useDataSources, keep it.
      // If this.props.config.messageUseDataSource is not in messageWidgetJson.useDataSources, set config.messageUseDataSource to null.
      messageUseDataSource = this.checkAndGetInitUseDataSource(this.props.messageWidgetId, this.props.config.messageUseDataSource)
    }

    const actionWidgetId = this.props.widgetId
    const actionWidgetJson = config.widgets[actionWidgetId]

    if (!this.props.config.actionUseDataSource) {
      // this.props.config.actionUseDataSource is empty
      // For filter message action, user can only select one layer data source as config.actionUseDataSource.
      // So, if useDataSources is only one layer data source, we can use it as config.actionUseDataSource because it is the only valid candidate layer data source.
      // If useDataSources.length >= 2, we can't pick one layer data source as the default config.actionUseDataSource, user must select it.
      if (actionWidgetJson && actionWidgetJson.useDataSources && actionWidgetJson.useDataSources[0] && actionWidgetJson.useDataSources.length === 1) {
        const dsJson = config.dataSources[actionWidgetJson.useDataSources[0].dataSourceId]
        if (dsJson && ((dsJson.type === ArcGISDataSourceTypes.WebMap) || (dsJson.type === ArcGISDataSourceTypes.WebScene))) {
          // config.actionUseDataSource must be a layer data source, ignore the webmap/webscene
          actionUseDataSource = null
        } else {
          // useDataSources[0] is layer data source, use it as config.actionUseDataSource
          actionUseDataSource = Immutable({
            dataSourceId: actionWidgetJson.useDataSources[0].dataSourceId,
            mainDataSourceId: actionWidgetJson.useDataSources[0].mainDataSourceId,
            dataViewId: actionWidgetJson.useDataSources[0].dataViewId,
            rootDataSourceId: actionWidgetJson.useDataSources[0].rootDataSourceId
          })
        }
      }
    } else {
      // this.props.config.actionUseDataSource is not empty, but it maybe removed from actionWidgetJson.useDataSources,
      // so we need to validate if this.props.config.actionUseDataSource is still valid.
      // If this.props.config.actionUseDataSource is still in actionWidgetJson.useDataSources, keep it.
      // If this.props.config.actionUseDataSource is not in actionWidgetJson.useDataSources, set config.actionUseDataSource to null.
      actionUseDataSource = this.checkAndGetInitUseDataSource(this.props.widgetId, this.props.config.actionUseDataSource)
    }

    const oldActionUseDataSourceId = this.props.config.actionUseDataSource && this.props.config.actionUseDataSource.dataSourceId
    const newActionUseDataSourceId = actionUseDataSource && actionUseDataSource.dataSourceId

    // sqlExprObj is for actionUseDataSource
    if (newActionUseDataSourceId !== oldActionUseDataSourceId) {
      // If the new actionUseDataSource changed, need to set this.props.config.sqlExprObj to null.
      return {
        messageUseDataSource: messageUseDataSource,
        actionUseDataSource: actionUseDataSource,
        sqlExprObj: null
      }
    } else {
      // If the new actionUseDataSource not changed, keep this.props.config.sqlExprObj.
      return {
        messageUseDataSource: messageUseDataSource,
        actionUseDataSource: actionUseDataSource,
        sqlExprObj: this.props.config.sqlExprObj
      }
    }
  }

  checkAndGetInitUseDataSource = (widgetId: string, oldUseDataSource: Immutable.ImmutableObject<UseDataSource>) => {
    const config = getAppStore().getState().appStateInBuilder.appConfig
    let initUseDataSource = null
    let isMapDs = false
    const dsM = DataSourceManager.getInstance()
    const isoldUseDataSourceIsOutputDs = dsM.getDataSource(oldUseDataSource.dataSourceId)?.getDataSourceJson()?.isOutputFromWidget
    const useDataSources = actionUtils.getDsByWidgetId(widgetId, this.props.messageType)
    const dsId = useDataSources && useDataSources[0] && useDataSources[0].dataSourceId
    if (!dsId) {
      return null
    }

    const dsJson = config.dataSources[dsId]
    if (dsJson && ((dsJson.type === ArcGISDataSourceTypes.WebMap) || (dsJson.type === ArcGISDataSourceTypes.WebScene))) {
      isMapDs = true
    }

    if (isMapDs) {
      // webmap or webscene ds
      let isUseOldDs = false
      if (useDataSources) {
        for (let i = 0; i < useDataSources.length; i++) {
          if (useDataSources[i].dataSourceId === oldUseDataSource.rootDataSourceId) {
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
      if (useDataSources) {
        for (let i = 0; i < useDataSources.length; i++) {
          const oldUseDataSourceId = isoldUseDataSourceIsOutputDs ? oldUseDataSource?.mainDataSourceId : oldUseDataSource?.dataSourceId
          const currentUseDataSourceId = isoldUseDataSourceIsOutputDs ? useDataSources[i]?.mainDataSourceId : useDataSources[i]?.dataSourceId
          if (currentUseDataSourceId === oldUseDataSourceId) {
            isUseOldDs = true
            break
          }
        }
      }

      if (isUseOldDs) {
        initUseDataSource = oldUseDataSource
      } else {
        if (useDataSources?.length === 1) {
          initUseDataSource = Immutable({
            dataSourceId: useDataSources?.[0].dataSourceId,
            mainDataSourceId: useDataSources?.[0].mainDataSourceId,
            dataViewId: useDataSources?.[0].dataViewId,
            rootDataSourceId: useDataSources?.[0].rootDataSourceId
          })
        } else {
          initUseDataSource = null
        }
      }
    }

    return initUseDataSource
  }

  componentDidMount () {
    const initConfig = this.getInitConfig()

    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.set('messageUseDataSource', initConfig.messageUseDataSource)
        .set('actionUseDataSource', initConfig.actionUseDataSource).set('sqlExprObj', initConfig.sqlExprObj)
    })
  }

  getStyle (theme: IMThemeVariables): SerializedStyles {
    return css`
      .setting-header {
        padding: ${polished.rem(10)} ${polished.rem(16)} ${polished.rem(0)} ${polished.rem(16)}
      }

      .deleteIcon {
        cursor: pointer;
        opacity: .8;
      }

      .deleteIcon:hover {
        opacity: 1;
      }

      .sql-expr-display {
        width: 100%;
        height: auto;
        min-height: 60px;
        line-height: 25px;
        padding: 3px 5px;
        color: ${theme.ref.palette.neutral[900]};
        border: 1px solid ${theme.ref.palette.neutral[500]};
      }

      .relate-panel-left {
        flex: auto;
        .action-select-chooser {
          margin-top: ${polished.rem(12)};
        }
      }
    `
  }

  handleTriggerLayerChange = (useDataSources: UseDataSource[]) => {
    if (useDataSources && useDataSources.length > 0) {
      this.handleTriggerLayerSelected(useDataSources[0])
    } else {
      this.handleRemoveLayerForTriggerLayer()
    }
  }

  handleActionLayerChange = (useDataSources: UseDataSource[]) => {
    if (useDataSources && useDataSources.length > 0) {
      this.handleActionLayerSelected(useDataSources[0])
    } else {
      this.handleRemoveLayerForActionLayer()
    }
  }

  handleTriggerLayerSelected = (currentSelectedDs: UseDataSource) => {
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.set('messageUseDataSource', currentSelectedDs)
    })
  }

  handleActionLayerSelected = (currentSelectedDs: UseDataSource) => {
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.set('actionUseDataSource', currentSelectedDs).set('sqlExprObj', null)
    })
  }

  handleRemoveLayerForTriggerLayer = () => {
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.set('messageUseDataSource', null)
    })
  }

  handleRemoveLayerForActionLayer = () => {
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.set('actionUseDataSource', null).set('sqlExprObj', null)
    })
  }

  showSqlExprPopup = () => {
    this.setState({ isSqlExprShow: true })
  }

  toggleSqlExprPopup = () => {
    this.setState({ isSqlExprShow: !this.state.isSqlExprShow })
  }

  onSqlExprBuilderChange = (sqlExprObj: IMSqlExpression) => {
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.set('sqlExprObj', sqlExprObj)
    })
  }

  onMessageFieldSelected = (allSelectedFields: IMFieldSchema[], ds: DataSource) => {
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.set('messageUseDataSource', {
        dataSourceId: this.props.config.messageUseDataSource.dataSourceId,
        mainDataSourceId: this.props.config.messageUseDataSource.mainDataSourceId,
        dataViewId: this.props.config.messageUseDataSource.dataViewId,
        rootDataSourceId: this.props.config.messageUseDataSource.rootDataSourceId,
        fields: allSelectedFields.map(f => f.jimuName)
      })
    })
  }

  onActionFieldSelected = (allSelectedFields: IMFieldSchema[], ds: DataSource) => {
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.set('actionUseDataSource', {
        dataSourceId: this.props.config.actionUseDataSource.dataSourceId,
        mainDataSourceId: this.props.config.actionUseDataSource.mainDataSourceId,
        dataViewId: this.props.config.actionUseDataSource.dataViewId,
        rootDataSourceId: this.props.config.actionUseDataSource.rootDataSourceId,
        fields: allSelectedFields.map(f => f.jimuName)
      })
    })
  }

  swicthEnabledDataRelationShip = (checked) => {
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.set('enabledDataRelationShip', checked)
    })
  }

  checkTrigerLayerIsSameToActionLayer = () => {
    if (this.props.config.messageUseDataSource && this.props.config.actionUseDataSource) {
      if (this.props.config.messageUseDataSource.mainDataSourceId === this.props.config.actionUseDataSource.mainDataSourceId &&
        this.props.config.messageUseDataSource.rootDataSourceId === this.props.config.actionUseDataSource.rootDataSourceId) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  getDsRootIdsByWidgetId = (wId: string) => {
    const appConfig = getAppStore().getState()?.appStateInBuilder?.appConfig
    const widgetJson = appConfig?.widgets?.[wId]
    const rootIds = []
    const dsM = DataSourceManager.getInstance()
    widgetJson?.useDataSources?.forEach((useDS: ImmutableObject<UseDataSource>) => {
      const ds = dsM.getDataSource(useDS.dataSourceId)
      if (ds?.type === ArcGISDataSourceTypes.WebMap || ds?.type === ArcGISDataSourceTypes.WebScene) { // is root ds
        rootIds.push(useDS.dataSourceId)
      }
    })
    return rootIds.length > 0 ? Immutable(rootIds) : undefined
  }

  /**
   * Filter dsIds from widgetJson.useDataSources and widgetJson.outputDataSources by this.props.messageType.
   * @param wId
   * @returns
   */
  getDsIdsByWidgetId = (wId: string): ImmutableArray<string> => {
    /**
     * actionUtils.getDsByWidgetId(wId, this.props.messageType) return useDataSources by check widgetJson.useDataSources, widgetJson.outputDataSources and messageCarryData.
     * Firstly, get the messageCarryData by wId_widgetManifestJson.publishMessages[messageType].messageCarryData.
     * Then check messageCarryData,
     * If messageCarryData is MessageCarryData.UseDataSource, return widgetJson.useDataSources.
     * If messageCarryData is MessageCarryData.OutputDataSource, return widgetJson.outputDataSources.
     * If messageCarryData is MessageCarryData.BothDataSource, return widgetJson.useDataSources + widgetJson.outputDataSources.
     */
    const useDataSources = actionUtils.getDsByWidgetId(wId, this.props.messageType)
    const dsIds = useDataSources?.map((useDS: ImmutableObject<UseDataSource>) => useDS?.mainDataSourceId)
    return Immutable(dsIds ?? [])
  }

  getDsSelectorSourceData = (widgetId: string, useDataSource: Immutable.ImmutableObject<UseDataSource>) => {
    const appConfig = getAppStore().getState()?.appStateInBuilder?.appConfig
    const widgetJson = appConfig?.widgets?.[widgetId]
    // Get the webmap/webscene data source ids from widgetJson.useDataSources
    const dsRootIds = this.getDsRootIdsByWidgetId(widgetId)
    const isReadOnly = actionUtils.checkIsOnlyOneDs(widgetJson, this.props.messageType, dsRootIds)

    const useDataSources = (useDataSource && useDataSource.dataSourceId)
      ? Immutable([useDataSource])
      : Immutable([])

    // Filter dsIds from widgetJson.useDataSources and widgetJson.outputDataSources by this.props.messageType.
    const fromDsIds = dsRootIds ? undefined : this.getDsIdsByWidgetId(widgetId)
    const dsSelectorSource = {
      isReadOnly: isReadOnly,
      useDataSources: useDataSources,
      fromRootDsIds: dsRootIds,
      fromDsIds: fromDsIds
    }

    return dsSelectorSource
  }

  checkIsDisableDataView = (widgetId: string): boolean => {
    if (this.props.messageType === MessageType.DataRecordsSelectionChange) {
      return true
    }

    const appConfig = getAppStore().getState()?.appStateInBuilder?.appConfig
    const widgetJson = appConfig?.widgets?.[widgetId]
    if (widgetJson) {
      const widgetLabel = widgetJson?.manifest?.label
      if (widgetLabel === 'Map') {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  onUseLayersRelationship = () => {
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.setIn(['messageUseDataSource', 'fields'], [])
        .setIn(['actionUseDataSource', 'fields'], [])
        .set('connectionType', MessageActionConnectionType.UseLayersRelationship)
    })
  }

  onSetCustomFields = () => {
    this.props.onSettingChange({
      actionId: this.props.actionId,
      config: this.props.config.setIn(['messageUseDataSource', 'fields'], [])
        .setIn(['actionUseDataSource', 'fields'], [])
        .set('connectionType', MessageActionConnectionType.SetCustomFields)
    })
  }

  render () {
    const { config } = this.props
    const messageUseDataSourceInstance = config.messageUseDataSource &&
      DataSourceManager.getInstance().getDataSource(config.messageUseDataSource.dataSourceId)
    const actionUseDataSourceInstance = config.actionUseDataSource &&
      DataSourceManager.getInstance().getDataSource(config.actionUseDataSource.dataSourceId)

    // If isCustomFields is true, it means "Set custom connection fields" radio checked. This is the only option when version <= 2024.R01
    // If isCustomFields is false, it means "Use layer's relationship" radio checked. This is a new option when version >= 2024.R02.
    const isCustomFields = !config.connectionType || config.connectionType === MessageActionConnectionType.SetCustomFields

    const { theme } = this.props

    // For filter message action, both trigger data and action data can only be a single data source, not multiple data sources.
    // The default value of isMultiple prop of DataSourceSelector is false.

    // this.props.messageWidgetId is the widget that publishes message, e.g. Select widget publishes selection-change message.
    // For DataSourceSelector of publishing message widegt,
    // props.fromRootDsIds is webmap/webscene data source ids, it is filtered by messageWidgetJson.useDataSources.
    // props.fromDsIds is layer data source ids, it is filtered from messageWidgetJson.useDataSources and messageWidgetJson.outputDataSources by this.props.messageType.
    // props.useDataSources is the array wrapper of this.props.config.messageUseDataSource.
    const triggerDsSelectorSourceData = this.getDsSelectorSourceData(this.props.messageWidgetId, this.props.config.messageUseDataSource)

    // this.props.widgetId is the map widget, map widget receives message and filters features.
    // For DataSourceSelector of action widegt,
    // props.fromRootDsIds is webmap/webscene data source ids, it is filtered by actionWidgetJson.useDataSources.
    // props.fromDsIds is layer data source ids, it is filtered from actionWidgetJson.useDataSources and actionWidgetJson.outputDataSources by this.props.messageType.
    // props.useDataSources is the array wrapper of this.props.config.actionUseDataSource.
    const actionDsSelectorSourceData = this.getDsSelectorSourceData(this.props.widgetId, this.props.config.actionUseDataSource)

    const neutral900 = theme?.ref?.palette?.neutral?.[900]

    return (
      <div css={this.getStyle(this.props.theme)}>
        <SettingSection title={this.props.intl.formatMessage({ id: 'mapAction_TriggerLayer', defaultMessage: defaultMessages.mapAction_TriggerLayer })}>
          <DataSourceSelector
            types={DSSelectorTypes}
            useDataSources={triggerDsSelectorSourceData.useDataSources}
            fromRootDsIds={triggerDsSelectorSourceData.fromRootDsIds}
            fromDsIds={triggerDsSelectorSourceData.fromDsIds}
            closeDataSourceListOnChange
            disableRemove={() => triggerDsSelectorSourceData.isReadOnly}
            disableDataSourceList={triggerDsSelectorSourceData.isReadOnly}
            hideAddDataButton
            hideTypeDropdown
            mustUseDataSource
            onChange={this.handleTriggerLayerChange}
            widgetId={this.props.messageWidgetId}
            disableDataView
            hideDataView={this.checkIsDisableDataView(this.props.messageWidgetId)}
            enableToSelectOutputDsFromSelf={true}
          />
        </SettingSection>
        <SettingSection title={this.props.intl.formatMessage({ id: 'mapAction_ActionLayer', defaultMessage: defaultMessages.mapAction_ActionLayer })}>
          <DataSourceSelector
            types={DSSelectorTypes}
            useDataSources={actionDsSelectorSourceData.useDataSources}
            fromRootDsIds={actionDsSelectorSourceData.fromRootDsIds}
            fromDsIds={actionDsSelectorSourceData.fromDsIds}
            closeDataSourceListOnChange
            disableRemove={() => actionDsSelectorSourceData.isReadOnly}
            disableDataSourceList={actionDsSelectorSourceData.isReadOnly}
            hideAddDataButton
            hideTypeDropdown
            mustUseDataSource
            onChange={this.handleActionLayerChange}
            widgetId={this.props.widgetId}
            hideDataView
            enableToSelectOutputDsFromSelf={true}
          // onSelect={this.handleActionLayerSelected}
          // onRemove={this.handleRemoveLayerForActionLayer}
          />
        </SettingSection>
        {this.props.config && this.props.config.messageUseDataSource && this.props.config.actionUseDataSource &&
          <SettingSection title={this.props.intl.formatMessage({ id: 'mapAction_Conditions', defaultMessage: defaultMessages.mapAction_Conditions })}>
            <SettingRow label={this.props.intl.formatMessage({ id: 'mapAction_RelateMessage', defaultMessage: defaultMessages.mapAction_RelateMessage })}>
              <Switch checked={this.props.config.enabledDataRelationShip} onChange={evt => { this.swicthEnabledDataRelationShip(evt.target.checked) }} />
            </SettingRow>
            <SettingRow>
              <Collapse isOpen={this.props.config.enabledDataRelationShip} className='w-100'>
                <ChooseConnectionType
                  messageDataSource={messageUseDataSourceInstance}
                  actionDataSource={actionUseDataSourceInstance}
                  connectionType={config.connectionType}
                  onUseLayersRelationship={this.onUseLayersRelationship}
                  onSetCustomFields={this.onSetCustomFields}
                />
                {this.checkTrigerLayerIsSameToActionLayer() &&
                  <div className='w-100 border p-1 mr-2'>{this.props.intl.formatMessage({ id: 'mapAction_AutoBind', defaultMessage: defaultMessages.mapAction_AutoBind })}</div>}
                {!this.checkTrigerLayerIsSameToActionLayer() && isCustomFields && <div className='w-100 d-flex align-items-center'>
                  <div className='d-flex flex-column relate-panel-left mt-3'>
                    <FieldSelector
                      className='w-100'
                      useDataSources={Immutable([this.props.config.messageUseDataSource?.asMutable({ deep: true })])} isDataSourceDropDownHidden
                      placeholder={this.props.intl.formatMessage({ id: 'mapAction_TriggerLayerField', defaultMessage: defaultMessages.mapAction_TriggerLayerField })}
                      onChange={this.onMessageFieldSelected} useDropdown
                      selectedFields={this.props.config.messageUseDataSource && this.props.config.messageUseDataSource.fields
                        ? this.props.config.messageUseDataSource.fields
                        : Immutable([])}
                    />
                    <FieldSelector
                      className='w-100 action-select-chooser'
                      placeholder={this.props.intl.formatMessage({ id: 'mapAction_ActionLayerField', defaultMessage: defaultMessages.mapAction_ActionLayerField })}
                      useDataSources={Immutable([this.props.config.actionUseDataSource?.asMutable({ deep: true })])} isDataSourceDropDownHidden
                      onChange={this.onActionFieldSelected} useDropdown
                      selectedFields={this.props.config.actionUseDataSource && this.props.config.actionUseDataSource.fields
                        ? this.props.config.actionUseDataSource.fields
                        : Immutable([])}
                    />
                  </div>
                  <Icon className='flex-none' width={12} height={40} color={neutral900} icon={require('jimu-ui/lib/icons/link-combined.svg')} />
                </div>}
              </Collapse>
            </SettingRow>
            <SettingRow>
              <Button type='link' disabled={!this.props.config.actionUseDataSource} className='w-100 d-flex justify-content-start' onClick={this.showSqlExprPopup}>
                <div className='w-100 text-truncate' style={{ textAlign: 'start' }}>
                  {this.props.intl.formatMessage({ id: 'mapAction_MoreConditions', defaultMessage: defaultMessages.mapAction_MoreConditions })}
                </div>
              </Button>
              {this.props.config.actionUseDataSource && <DataSourceComponent useDataSource={this.props.config.actionUseDataSource}>{(ds) => {
                return (
                  <SqlExpressionBuilderPopup
                    dataSource={ds} mode={SqlExpressionMode.Simple}
                    isOpen={this.state.isSqlExprShow} toggle={this.toggleSqlExprPopup}
                    expression={this.props.config.sqlExprObj} onChange={(sqlExprObj) => { this.onSqlExprBuilderChange(sqlExprObj) }}
                  />
                )
              }}
              </DataSourceComponent>}
            </SettingRow>
            <SettingRow>
              <div className='sql-expr-display'>
                {this.props.config.sqlExprObj && actionUseDataSourceInstance
                  ? dataSourceUtils.getArcGISSQL(this.props.config.sqlExprObj, actionUseDataSourceInstance).displaySQL
                  : this.props.intl.formatMessage({ id: 'mapAction_SetExpression', defaultMessage: defaultMessages.mapAction_SetExpression })}
              </div>
            </SettingRow>
          </SettingSection>}
      </div>
    )
  }
}

export default withTheme(_FilterActionSetting)
