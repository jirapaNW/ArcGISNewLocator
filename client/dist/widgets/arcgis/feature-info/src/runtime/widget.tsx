/** @jsx jsx */
import {
  React, Immutable, jsx, type AllWidgetProps, MessageManager, DataRecordsSelectionChangeMessage, DataSourceStatus, type IMUseDataSource,
  type DataSource, type FeatureLayerDataSource, getAppStore, appConfigUtils, type IMState, type Timezone, ReactResizeDetector, DataSourceManager
/*, appActions, DataRecord, IMSqlExpression */ } from 'jimu-core'
// import { JimuMapViewComponent } from 'jimu-arcgis';
import { Button, WidgetPlaceholder, DataActionList, DataActionListStyle, Icon, defaultMessages as jimuDefaultMessages, Alert } from 'jimu-ui'
// import { IMDataSourceJson, IMUseDataSource } from './types/app-config';
import { type IMConfig, FontSizeType } from '../config'
import { getStyle } from './lib/style'
import defaultMessages from './translations/default'
//import FeatureInfo from './components/feature-info'
import FeatureInfos from './components/features-info'
import { DataLoader, type CurrentData } from './components/data-loader'
import { versionManager } from '../version-manager'
import featureInfoIcon from '../../icon.svg'
import { DSSelector } from './components/ds-selector'

export interface DataSourceWidgetLabelInfo {
  dataSourceId: string
  label: string
}

export interface WidgetProps extends AllWidgetProps<IMConfig> {
  dataSourceWidgetLabelInfos: DataSourceWidgetLabelInfo[]
  timezone: Timezone
}

export interface WidgetState {
  currentDataId: string
  currentDataIndex: number
  currentDataSourceVersion: number
  loadDataStatus: DataSourceStatus
  dataSourceWidgetId: string
  dataSourceLabel: string
  currentDSConfigId: string
  widthOfDSSelector: number
}

export default class Widget extends React.PureComponent<WidgetProps, WidgetState> {
  public viewFromMapWidget: __esri.MapView | __esri.SceneView
  private previousData: CurrentData
  private currentData: CurrentData
  private dataSource: DataSource
  private lockSelection: boolean
  private readonly warningIcon: string

  constructor (props) {
    super(props)
    this.previousData = null
    this.currentData = null
    this.lockSelection = true
    this.warningIcon = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 0.5H25.5V25.5H0.5V0.5Z" fill=${this.props.theme.sys.color.warning.light}
                    stroke="${this.props.theme.sys.color.warning.light}"/>
                  <path d="M12.0995 10.87C12.0462 10.3373 12.4646 9.875 13 9.875C13.5354 9.875 13.9538 10.3373 13.9005 10.87L13.5497 14.3775C13.5215 14.6599 13.2838 14.875 13 14.875C12.7162
                    14.875 12.4785 14.6599 12.4502 14.3775L12.0995 10.87Z" fill="${this.props.theme.sys.color.warning.dark}"/>
                  <path d="M13 17.875C13.5523 17.875 14 17.4273 14 16.875C14 16.3227 13.5523 15.875 13 15.875C12.4477 15.875 12 16.3227 12 16.875C12 17.4273 12.4477 17.875 13 17.875Z"
                    fill="${this.props.theme.sys.color.warning.dark}"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66666 19.875C5.91174 19.875 5.42905 19.0705 5.78431 18.4044L12.1176 6.52941C12.4941 5.82353 13.5059 5.82353 13.8824
                    6.52941L20.2157 18.4044C20.5709 19.0705 20.0883 19.875 19.3333 19.875H6.66666ZM6.66666 18.875L13 7L19.3333 18.875H6.66666Z" fill="${this.props.theme.sys.color.warning.dark}"/>
                  </svg>`

    this.state = {
      currentDataId: null,
      currentDataIndex: 0,
      currentDataSourceVersion: null,
      loadDataStatus: DataSourceStatus.Loading,
      dataSourceWidgetId: null,
      dataSourceLabel: '',
      currentDSConfigId: this.props.config.dsConfigs && this.props.config.dsConfigs[0] && this.props.config.dsConfigs[0].id,
      widthOfDSSelector: 80
    }
  }

  static versionManager = versionManager

  static mapExtraStateProps = (state: IMState, ownProps: AllWidgetProps<IMConfig>) => {
    //const useDataSource = ownProps.useDataSources && ownProps.useDataSources[0]
    //const dataSourceWidgetId = appConfigUtils.getWidgetIdByOutputDataSource(useDataSource)
    const useDataSources = ownProps.useDataSources || []
    const dataSourceWidgetLabelInfos = useDataSources.map(useDataSource => {
      const dataSourceWidgetId = appConfigUtils.getWidgetIdByOutputDataSource(useDataSource)
      return {
        dataSourceId: useDataSource.dataSourceId,
        label: state.appConfig?.widgets[dataSourceWidgetId]?.label
      }
    })

    return {
      dataSourceWidgetLabelInfos,
      timezone: state.appConfig?.attributes?.timezone
    }
  }

  componentDidMount () {
  }

  componentDidUpdate (prevProps: WidgetProps) {
    // response ds change from setting
    if (this.props?.stateProps?.currentDSConfigId && prevProps?.stateProps?.currentDSConfigId !== this.props.stateProps.currentDSConfigId) {
      this.onCurrentDSChange(this.props?.stateProps?.currentDSConfigId)
      return
    }
    const currentDSConfig = this.getCurrentDSConfig()
    const defaultDSConfig = this.getDefaultDSConfig()
    const useDataSource = this.getUseDataSourceById((currentDSConfig || defaultDSConfig)?.useDataSourceId)
    if (!useDataSource) {
      this.setState({
        currentDSConfigId: '',
        currentDataId: null,
        currentDataIndex: 0
      })
      this.currentData = null
      return
    }

    if (!currentDSConfig) {
      this.setState({
        currentDSConfigId: defaultDSConfig.id,
        dataSourceWidgetId: appConfigUtils.getWidgetIdByOutputDataSource(useDataSource)
      })
    }
  }

  getDSConfigs = () => {
    const dsConfigs = this.props.config.dsConfigs || Immutable([])
    return dsConfigs.map(dsConfig => {
      if (dsConfig.label === null || dsConfig.label === undefined) {
        // label is null or undefined means the config was upgraded from a previous version
        // cannot get data source label in version manager because the data sources haven't been loaded
        const dataSource = DataSourceManager.getInstance().getDataSource(dsConfig.useDataSourceId)
        return dsConfig.set('label', dataSource?.getLabel() || '')
      } else {
        return dsConfig
      }
    })
  }

  getDSConfigById = (dsConfigId) => {
    if (this.props.config.dsConfigs) {
      return this.getDSConfigs().find(dsConfig => dsConfig.id === dsConfigId)
    } else {
      return null
    }
  }

  getCurrentDSConfig = () => {
    return this.getDSConfigById(this.state.currentDSConfigId)
  }

  getDefaultDSConfig = () => {
    return this.getDSConfigs()[0]
  }

  getUseDataSourceById = (dataSourceId: string): IMUseDataSource => {
    const useDataSources = this.props.useDataSources || Immutable([])
    return useDataSources.find(useDataSource => useDataSource.dataSourceId === dataSourceId)
  }

  selectGraphic () {
    const record = this.currentData?.record
    if (record && this.dataSource) {
      MessageManager.getInstance().publishMessage(new DataRecordsSelectionChangeMessage(this.props.id, [record]))
      const selectedRecordIds = this.dataSource.getSelectedRecordIds()
      const recordId = record.getId()
      if (!selectedRecordIds.includes(recordId)) {
        (this.dataSource as FeatureLayerDataSource).queryById(recordId).then((record) => {
          this.dataSource.selectRecordsByIds([recordId], [record])
        })
      }
    }
  }

  getStyleConfig () {
    if (this.props.config.style) {
      return this.props.config.style
    } else {
      return {
        textColor: '',
        fontSizeType: FontSizeType.auto,
        fontSize: null,
        backgroundColor: ''
      }
    }
  }

  onPreGraphicBtnClick = () => {
    let index = this.state.currentDataIndex
    if (index > 0) {
      this.setState({
        currentDataIndex: --index
      })
      this.lockSelection = false
    }
  }

  onNextGraphictBtnClick = () => {
    let index = this.state.currentDataIndex
    if (index < this.currentData.count - 1) {
      this.setState({
        currentDataIndex: ++index
      })
      this.lockSelection = false
    }
  }

  onSelectedRecordIdChanged = (dsConfigId, index, dataSourceId) => {
    if (index > -1) {
      this.setState({
        currentDSConfigId: dsConfigId,
        currentDataIndex: index
      })
    }
  }

  onUnselectedRecordIdChanged = (dataSourceId) => {
    if (this.dataSource?.id === dataSourceId) {
      MessageManager.getInstance().publishMessage(new DataRecordsSelectionChangeMessage(this.props.id, []))
    }
  }

  onDataSourceStatusChanged = (dsConfigId: string, status: DataSourceStatus, dataSourceLabel?: string) => {
    //if (dsConfigId !== this.state.currentDSConfigId) return
    this.setState({
      loadDataStatus: status,
      dataSourceLabel: dataSourceLabel
    })
  }

  onDataChanged = (dsConfigId: string, dataSource, currentData, isFirstLoad) => {
    //if (dsConfigId !== this.state.currentDSConfigId) return
    this.dataSource = dataSource
    this.previousData = this.currentData
    this.currentData = currentData
    this.setState({
      currentDataId: this.currentData ? this.currentData.id : null,
      currentDataIndex: this.currentData ? this.currentData.index : 0,
      currentDataSourceVersion: this.currentData ? this.currentData.dataSourceVersion : null,
      loadDataStatus: DataSourceStatus.Loaded
    })

    //if(!isFirstLoad && this.previousData?.id !== this.currentData?.id) {
    if (!this.lockSelection) {
      this.selectGraphic()
      this.lockSelection = true
    }
  }

  onCurrentFeatureClick = () => {
    this.selectGraphic()
  }

  onCurrentDSChange = (dsConfigId) => {
    this.setState({
      currentDSConfigId: dsConfigId,
      currentDataIndex: 0
    })
  }

  onResize = (width) => {
    let widthOfDSSelector = 80
    if (width < 350) {
      widthOfDSSelector = width / 3
    } else {
      widthOfDSSelector = width / 2
    }

    widthOfDSSelector = Math.floor(widthOfDSSelector / 10) * 10
    this.setState({
      widthOfDSSelector: Math.floor(widthOfDSSelector)
    })
  }

  isDataSourceAccessible = (dataSourceId: string) => {
    return !!this.props.useDataSources?.find(useDs => dataSourceId === useDs.dataSourceId)
  }

  getPlaceholderConten = () => {
    return (
      <div className='widget-featureInfo'>
        <WidgetPlaceholder icon={featureInfoIcon} message={this.props.intl.formatMessage({ id: '_widgetLabel', defaultMessage: defaultMessages._widgetLabel })} widgetId={this.props.id} />
      </div>
    )
  }

  getLoadingContent = () => {
    let loadingContent = null
    if (this.state.loadDataStatus === DataSourceStatus.Loading) {
      loadingContent = (
        <div style={{ position: 'absolute', left: '50%', top: '50%' }} className='jimu-secondary-loading' />
      )
    }
    return loadingContent
  }

  getHeaderContent = () => {
    // data action
    //let dataActionPlaceholder = null
    let dataActionContent = null
    const dataName = this.props.intl.formatMessage({ id: 'featureInfoDataActionLabel', defaultMessage: defaultMessages.featureInfoDataActionLabel },
      { layer: this.dataSource?.getLabel() || '' })
    // show dataAction by default (this.props.enableDataAction is undefined)
    const enableDataAction = this.props.enableDataAction === undefined ? true : this.props.enableDataAction
    if (this.dataSource && enableDataAction) {
      //dataActionPlaceholder = (
      //  <div className='data-action-placeholder' />
      //)
      dataActionContent = (
        <div className='data-action-dropdown-content'>
          <DataActionList
            widgetId={this.props.id}
            dataSets={[{ dataSource: this.dataSource, records: this.currentData?.record ? [this.currentData?.record] : [], name: dataName, type: 'current' }]}
            listStyle={DataActionListStyle.Dropdown}
            buttonType='tertiary'
          />
        </div>
      )
    }

    // nav operation
    let navContent = null
    const enableNavFeature = this.currentData && this.currentData.count > 1 && this.props.config.featureNavigator
    if (enableNavFeature) {
      const featureNumbers = this.props.intl.formatMessage({ id: 'featureNumbers', defaultMessage: defaultMessages.featureNumbers },
        { index: this.currentData.index + 1, count: this.currentData.count })
      navContent = (
        <div className='nav-section d-flex justify-content-center align-items-center'>
          <Button className='nav-btn' type='tertiary' size='sm' onClick={this.onPreGraphicBtnClick} aria-label={this.props.intl.formatMessage({ id: 'previous', defaultMessage: jimuDefaultMessages.previous })}> {'<'} </Button>
          <span> {featureNumbers} </span>
          <Button className='nav-btn' type='tertiary' size='sm' onClick={this.onNextGraphictBtnClick} aria-label={this.props.intl.formatMessage({ id: 'next', defaultMessage: jimuDefaultMessages.next })}> {'>'} </Button>
        </div>
      )
    }

    // ds selector
    let dsSelectorContent = null
    const enableNavDS = this.props.config.dsNavigator && (this.getDSConfigs().length > 1)
    if (enableNavDS) {
      const dsConfigs = this.getDSConfigs().filter(dsConfig => {
        return this.isDataSourceAccessible(dsConfig.useDataSourceId)
      })
      dsSelectorContent = (<DSSelector width={this.state.widthOfDSSelector} dsConfigs={dsConfigs} activeDSConfigId={this.state.currentDSConfigId} onCurrentDSChange={this.onCurrentDSChange} />)
    }

    let headerConten = null
    if ((enableNavFeature || enableNavDS || enableDataAction) && this.state.loadDataStatus !== DataSourceStatus.CreateError && this.state.loadDataStatus !== DataSourceStatus.NotReady) {
      headerConten = (
        <div className='header-section'>
          {this.currentData?.count > 1 ? navContent : null}
          <div className='header-control-section'>
            {dsSelectorContent}
            {dataActionContent}
          </div>
        </div>
      )
    }
    return headerConten
  }

  getDsErrorMessageContent = () => {
    return (
      <div className='widget-featureInfo'>
        <WidgetPlaceholder icon={featureInfoIcon} message={this.props.intl.formatMessage({ id: '_widgetLabel', defaultMessage: defaultMessages._widgetLabel })} widgetId={this.props.id} />
        <Alert
          className='warning-inaccessible'
          type='warning'
          withIcon
          text={this.props.intl.formatMessage({ id: 'dataSourceCreateError', defaultMessage: 'warning' })}
        />
      </div>
    )
  }

  getWarningMessageContent = () => {
    const dataSourceWidgetLabelInfo = this.props.dataSourceWidgetLabelInfos.find(dataSourceWidgetLabelInfo => dataSourceWidgetLabelInfo.dataSourceId === this.getCurrentDSConfig()?.useDataSourceId)
    const warningMessage = this.props.intl.formatMessage({ id: 'outputDataIsNotGenerated', defaultMessage: 'warning' },
      { outputDsLabel: this.state.dataSourceLabel, sourceWidgetName: dataSourceWidgetLabelInfo?.label || '' })
    return (
      <div className='widget-featureInfo'>
        <WidgetPlaceholder icon={featureInfoIcon} message={this.props.intl.formatMessage({ id: '_widgetLabel', defaultMessage: defaultMessages._widgetLabel })} widgetId={this.props.id} />
        <Icon className='warning-icon' icon={this.warningIcon} size={26} title={warningMessage} currentColor={false} />
      </div>
    )
  }

  getDefaultMessageContent = () => {
    return (
      <div
        className='no-data-message p-5 font-weight-bold'
        dangerouslySetInnerHTML={{
          __html: this.props.config.noDataMessage ||
            this.props.intl.formatMessage({ id: 'noDeataMessageDefaultText', defaultMessage: defaultMessages.noDeataMessageDefaultText })
        }}
      />
    )
  }

  getFeaturesContent = () => {
    const dsConfig = this.getCurrentDSConfig()
    const contentConfig = dsConfig?.contentConfig
    const visibleElements = {
      title: contentConfig?.title,
      content: {
        fields: contentConfig?.fields ?? true,
        text: contentConfig?.fields ?? true,
        media: contentConfig?.media ?? true,
        attachments: contentConfig?.attachments ?? true,
        expression: true
      },
      lastEditedInfo: contentConfig?.lastEditInfo ?? true
    }
    return (
      <div style={{ cursor: 'pointer' }} onClick={this.onCurrentFeatureClick} >
        <FeatureInfos
          graphic={this.currentData.graphic}
          defaultPopupTemplate={this.currentData.defaultPopupTemplate}
          visibleElements={visibleElements}
          dataSource={this.dataSource}
          timezone={this.props.timezone}
        />
      </div>
    )
  }

  getFeatureInfoContent = () => {
    let featureInfoContent
    if (this.state.loadDataStatus === DataSourceStatus.CreateError) {
      featureInfoContent = this.getDsErrorMessageContent()
    } else if (this.state.loadDataStatus === DataSourceStatus.NotReady) {
      featureInfoContent = this.getWarningMessageContent()
    } else if (this.currentData && this.dataSource) {
      featureInfoContent = this.getFeaturesContent()
    } else if (this.state.loadDataStatus === DataSourceStatus.Loaded) {
      featureInfoContent = this.getDefaultMessageContent()
    }
    return featureInfoContent
  }

  getDataSourceContent = () => {
    let dataSourceContent = null
    dataSourceContent = (
      <div style={{ position: 'absolute', display: 'block' }}>
        {this.getDSConfigs().map((dsConfig, index) => {
          const useDataSource = this.getUseDataSourceById(dsConfig.useDataSourceId)
          return (
            <DataLoader
            key={index}
            active={this.state.currentDSConfigId === dsConfig.id}
            useDataSource={useDataSource}
            dsConfigId={dsConfig.id}
            widgetId={this.props.id}
            index={this.state.currentDataIndex}
            limitGraphics={this.props.config.limitGraphics}
            maxGraphics={this.props.config.maxGraphics}
            onSelectedRecordIdChanged={this.onSelectedRecordIdChanged}
            onUnselectedRecordIdChanged={this.onUnselectedRecordIdChanged}
            onDataSourceStatusChanged={this.onDataSourceStatusChanged}
            onDataChanged={this.onDataChanged} />
          )
        })}
      </div>

    )
    return dataSourceContent
  }

  render () {
    const useDataSource = this.getUseDataSourceById(this.getCurrentDSConfig()?.useDataSourceId)
    let content = null
    if (!useDataSource) {
      content = this.getPlaceholderConten()
      this.currentData = null
    } else {
      content = (
        <div className='widget-featureInfo'>
          {this.getLoadingContent()}
          {this.getHeaderContent()}
          {this.getFeatureInfoContent()}
          {this.getDataSourceContent()}
          <ReactResizeDetector handleWidth onResize={this.onResize} />
        </div>
      )
    }
    return (
      <div css={getStyle(this.props.theme, this.props.config.styleType, this.getStyleConfig(), getAppStore().getState()?.appContext?.isRTL, this.props.autoWidth)} className='jimu-widget'>
        {content}
      </div>
    )
  }
}
