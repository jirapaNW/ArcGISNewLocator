/** @jsx jsx */
import {
  React, jsx, Immutable, type DataSource, DataSourceManager, type MapServiceDataSource, dataSourceUtils, AllDataSourceTypes, TimezoneConfig, ReactRedux, type IMState, classNames
} from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { SettingSection, SettingRow, SidePopper } from 'jimu-ui/advanced/setting-components'
import { DataSourceSelector } from 'jimu-ui/advanced/data-source-selector'
import { type FeatureLayerDataSource } from 'jimu-arcgis'
import { Label, Radio, Button, Icon, Tooltip, Switch, defaultMessages as jimuUIMessages, Checkbox, Alert } from 'jimu-ui'

import { type IMConfig, TimeStyle } from '../config'
import defaultMessages from './translations/default'
import { getStyleForWidget } from './style'
import TimePanel from './time-panel'
import { ClickOutlined } from 'jimu-icons/outlined/application/click'
import { ThemeColorPicker } from 'jimu-ui/basic/color-picker'
import { getCalculatedTimeSettings, getTimeSettingsFromHonoredWebMap, isSingleLayer } from '../utils/utils'
import TimelineDataSource from './timeline-ds'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'

const allDefaultMessages = Object.assign({}, defaultMessages, jimuUIMessages)

interface ExtraProps {
  isTimeZoneData?: boolean
}

interface State {
  isTimePanelOpen: boolean
  dataSources: { [dsId: string]: DataSource }
}

const SUPPORTED_TYPES = Immutable([
  AllDataSourceTypes.WebMap,
  AllDataSourceTypes.MapService,
  AllDataSourceTypes.FeatureLayer,
  AllDataSourceTypes.ImageryLayer,
  AllDataSourceTypes.ImageryTileLayer
])

class _Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig> & ExtraProps, State> {
  dsManager: DataSourceManager
  timeSettingsRef: any

  constructor (props) {
    super(props)
    this.dsManager = DataSourceManager.getInstance()
    this.state = {
      isTimePanelOpen: false,
      dataSources: {}
    }
  }

  componentDidUpdate (prevProps: AllWidgetSettingProps<IMConfig>, prevState: State) {
    if (this.props.config.honorTimeSettings !== prevProps.config.honorTimeSettings && this.props.config.honorTimeSettings) {
      this.setState({ isTimePanelOpen: false })
    }
  }

  i18nMessage = (id: string, values?: any) => {
    return this.props.intl.formatMessage({ id: id, defaultMessage: allDefaultMessages[id] }, values)
  }

  updateConfigForOptions = (prop: string, value: any) => {
    const config = {
      id: this.props.id,
      config: this.props.config.set(prop, value)
    }
    this.props.onSettingChange(config)
  }

  dataSourceChange = async ds => {
    let newDs = ds
    let newDsState = this.state.dataSources
    let config = this.props.config.set('timeSettings', null)
    let dsType = config.dataSourceType

    // Remove one selected ds
    if (ds.length < this.props.useDataSources?.length) {
      delete newDsState[this.props.useDataSources[this.props.useDataSources.length - 1].dataSourceId]
      this.setState({
        dataSources: newDsState
      })
      if (newDs.length === 0) { // no ds left now
        config = config.set('honorTimeSettings', true)
      }
    } else { // Add new ds with current type, or another type
      const currentDs = ds[ds.length - 1]
      const currentDsObj = await this.dsManager.createDataSourceByUseDataSource(Immutable(currentDs))
      let honorTimeSettings = currentDsObj.type === AllDataSourceTypes.WebMap ? config.honorTimeSettings : false

      // ds type is changed, or replaced to another webMap
      if (currentDsObj.type !== config.dataSourceType || currentDsObj.type === AllDataSourceTypes.WebMap) {
        newDs = [currentDs]
        dsType = currentDsObj.type as any
        newDsState = {}
        // ds type is changed to webMap from layers.
        if (currentDsObj.type !== config.dataSourceType && currentDsObj.type === AllDataSourceTypes.WebMap) {
          honorTimeSettings = true
        }
      }
      newDsState[currentDs.dataSourceId] = currentDsObj

      this.setState({
        dataSources: newDsState
      })
      config = config.set('honorTimeSettings', honorTimeSettings).set('dataSourceType', dsType)
    }

    this.props.onSettingChange({
      id: this.props.id,
      config: config,
      useDataSources: newDs
    })
  }

  getTimeSettings = () => {
    return getCalculatedTimeSettings(this.props.config.timeSettings, this.state.dataSources)
  }

  setHonorTimeSettings = () => {
    const { id, config, onSettingChange } = this.props
    if (config.honorTimeSettings) {
      const settings = getTimeSettingsFromHonoredWebMap(this.state.dataSources)
      onSettingChange({
        id: id,
        config: config
          .set('honorTimeSettings', false)
          .set('timeSettings', settings)
      })
    } else {
      onSettingChange({
        id: id,
        config: config
          .set('honorTimeSettings', true)
          .set('timeSettings', null)
      })
    }
  }

  enablePlayControl = (e, enable: boolean) => {
    this.props.onSettingChange({
      id: this.props.id,
      config: this.props.config
        .set('enablePlayControl', enable)
        .set('autoPlay', false)
    })
  }

  onTimeSettingPanel = () => {
    this.setState({ isTimePanelOpen: !this.state.isTimePanelOpen })
  }

  onCreateDataSourceCreatedOrFailed = (dataSourceId: string, dataSource: DataSource) => {
    this.setState((state: State) => {
      const newDataSources = Object.assign({}, state.dataSources)
      newDataSources[dataSourceId] = dataSource
      return {
        dataSources: newDataSources
      }
    })
  }

  isTimeExtentValid = () => {
    let isDisabled = false
    Object.keys(this.state.dataSources).some(dsId => {
      const ds = this.state.dataSources[dsId]
      if (ds.type === AllDataSourceTypes.FeatureLayer) {
        const extent = (ds as any).getTimeInfo()?.timeExtent
        if (extent?.[0] && extent?.[1] && extent[0] === extent[1]) {
          isDisabled = true
          return true
        }
      }

      return false
    })
    return isDisabled
  }

  hideDs = (dsJson) => {
    let hide = false
    const ds = this.dsManager?.getDataSource(dsJson.id)
    if (isSingleLayer(ds.type)) {
      hide = !(ds as FeatureLayerDataSource).supportTime() || dataSourceUtils.findMapServiceDataSource(ds as FeatureLayerDataSource) !== null
    } else if (ds.type === AllDataSourceTypes.WebMap) { // check all layers inside.
      const layers = ds.getAllChildDataSources()
        .filter(childDs => (isSingleLayer(childDs.type) || childDs.type === AllDataSourceTypes.MapService) && (childDs as any).supportTime())
      hide = layers.length === 0
    } else { // TODO: hide it when no featureLayers inside.
      hide = !(ds as MapServiceDataSource).supportTime()
    }
    return hide
  }

  render () {
    const { theme, theme2, config, useDataSources, intl, isTimeZoneData } = this.props
    const {
      honorTimeSettings, timeStyle, backgroundColor, foregroundColor, sliderColor,
      enablePlayControl, autoPlay, dataSourceType
    } = config
    const hideEmptyPlaceholder = useDataSources?.length > 0
    return (
      <div className={classNames('jimu-widget-setting widget-setting-timeline', { 'show-disabled-mask': isTimeZoneData })} css={getStyleForWidget(theme)}>
        {
          useDataSources?.map((useDs, index) => {
            return (
              <TimelineDataSource
                key={index}
                useDataSource={useDs}
                onCreateDataSourceCreatedOrFailed={this.onCreateDataSourceCreatedOrFailed}
              />
            )
          })
        }

        <SettingSection
          role='group'
          className={hideEmptyPlaceholder ? '' : 'border-0'}
          title={this.i18nMessage('source')}
          aria-label={this.i18nMessage('source')}
        >
          <SettingRow flow='wrap' className='mt-2' label={
            <div className='m-0 d-flex justify-content-between'>
              <span id="timeline-ds-label">{this.i18nMessage('selectDataSourceLabel')}</span>
              <Tooltip title={this.i18nMessage('selectDataSourceTip')} showArrow placement='left'>
                <Button icon type='tertiary' size='sm' className='ml-2 p-0'>
                  <InfoOutlined />
                </Button>
              </Tooltip>
            </div>
          } />
          <SettingRow className='mt-2'>
            <DataSourceSelector
              hideAllOptionOfTypeDropdown
              isMultiple
              aria-describedby='timeline-ds-label timeline-blank-msg'
              types={SUPPORTED_TYPES}
              useDataSources={useDataSources || Immutable([])}
              mustUseDataSource
              disableDataView
              hideDataView
              hideDs={this.hideDs}
              closeDataSourceListOnChange={false}
              onChange={this.dataSourceChange}
            />
          </SettingRow>
        </SettingSection>
        {
          hideEmptyPlaceholder
            ? <React.Fragment>
              <SettingSection
                role='group'
                title={this.i18nMessage('timeSetting')}
                aria-label={this.i18nMessage('timeSetting')}
                >
                {
                  dataSourceType === AllDataSourceTypes.WebMap &&
                  <SettingRow>
                    <Label className='honor-label' check>
                      <Radio
                        name='time-setting-radio'
                        style={{ cursor: 'pointer' }}
                        className='mr-2 align-text-bottom'
                        checked={honorTimeSettings}
                        onChange={this.setHonorTimeSettings}
                      />
                      {this.i18nMessage('honorTimeSettings')}
                    </Label>
                  </SettingRow>
                }
                <SettingRow className='mt-2'>
                  <Label className='honor-label' check>
                    {
                      dataSourceType === AllDataSourceTypes.WebMap &&
                      <Radio
                        name='time-setting-radio'
                        style={{ cursor: 'pointer' }}
                        className='mr-2 align-text-bottom'
                        checked={!honorTimeSettings}
                        onChange={this.setHonorTimeSettings}
                      />
                    }
                    {this.i18nMessage('customTimeSettings')}
                  </Label>
                </SettingRow>
                {
                  (!honorTimeSettings || dataSourceType === AllDataSourceTypes.FeatureLayer) && <React.Fragment>
                    <SettingRow className='mt-4' >
                      <Button
                        className='w-100'
                        ref={ref => { this.timeSettingsRef = ref }}
                        onClick={this.onTimeSettingPanel}
                        disabled={Object.keys(this.state.dataSources).length === 0 || this.isTimeExtentValid()}
                      >
                        <div className='w-100 px-2 text-truncate'>
                          {this.i18nMessage('configureTime')}
                        </div>
                      </Button>
                    </SettingRow>
                    <SettingRow>
                      {
                        this.isTimeExtentValid() && <Alert
                          open
                          type='warning'
                          tabIndex={0}
                          className={'w-100'}
                          text={'The time extent is not ready. Cannot configure time settings at this time.'}
                        />
                      }
                    </SettingRow>
                  </React.Fragment>
                }
              </SettingSection>

              <SettingSection
                role='group'
                title={this.i18nMessage('style')}
                aria-label={this.i18nMessage('style')}
              >
                <SettingRow className='style-container'>
                  {
                    [TimeStyle.Classic, TimeStyle.Modern].map((tStyle, index) => {
                      const style = tStyle.toLowerCase()
                      return (
                        <Tooltip key={index} title={this.i18nMessage(`${style}Style`)} placement='bottom'>
                          <Button
                            icon size='sm' type='tertiary'
                            active={tStyle === timeStyle}
                            aria-pressed={tStyle === timeStyle}
                            onClick={() => { this.updateConfigForOptions('timeStyle', tStyle) }}
                          >
                            <Icon width={104} height={70} icon={require(`./assets/style_${style}.svg`)} />
                          </Button>
                        </Tooltip>
                      )
                    })
                  }
                </SettingRow>
              </SettingSection>

              <SettingSection
                role='group'
                title={this.i18nMessage('appearance')}
                aria-label={this.i18nMessage('appearance')}
              >
                <SettingRow label={this.i18nMessage('foregroundColor')}>
                  <ThemeColorPicker
                    aria-label={this.i18nMessage('foregroundColor')}
                    specificTheme={theme2} value={foregroundColor}
                    onChange={color => { this.updateConfigForOptions('foregroundColor', color) }} />
                </SettingRow>
                <SettingRow label={this.i18nMessage('backgroundColor')}>
                  <ThemeColorPicker
                    aria-label={this.i18nMessage('backgroundColor')}
                    specificTheme={theme2} value={backgroundColor}
                    onChange={color => { this.updateConfigForOptions('backgroundColor', color) }} />
                </SettingRow>
                <SettingRow label={this.i18nMessage('sliderColor')}>
                  <ThemeColorPicker
                    aria-label={this.i18nMessage('sliderColor')}
                    specificTheme={theme2} value={sliderColor}
                    onChange={color => { this.updateConfigForOptions('sliderColor', color) }} />
                </SettingRow>
              </SettingSection>

              <SettingSection
                role='group'
                title={this.i18nMessage('displayOptions')}
                aria-label={this.i18nMessage('displayOptions')}
              >
                <SettingRow label={this.i18nMessage('enablePlayControl')}>
                  <Switch
                    checked={enablePlayControl}
                    onChange={this.enablePlayControl}
                    aria-label={this.i18nMessage('enablePlayControl')}
                  />
                </SettingRow>
                {
                  enablePlayControl && <SettingRow>
                    <Label className='w-100 d-flex'>
                      <Checkbox
                        style={{ cursor: 'pointer', marginTop: '2px' }}
                        checked={autoPlay}
                        onChange={() => { this.updateConfigForOptions('autoPlay', !autoPlay) }}
                      />
                      <div className='m-0 ml-2 flex-grow-1 autoplay-label'>
                        {this.i18nMessage('autoPlay')}
                      </div>
                    </Label>
                  </SettingRow>
                }
              </SettingSection>
              {
                !honorTimeSettings && <SidePopper
                  position='right'
                  title={this.i18nMessage('configureTime')}
                  isOpen={this.state.isTimePanelOpen}
                  trigger={this.timeSettingsRef}
                  toggle={this.onTimeSettingPanel}
                >
                  {
                    Object.keys(this.state.dataSources).length === useDataSources.length && <TimePanel
                      intl={intl}
                      theme={theme}
                      i18nMessage={this.i18nMessage}
                      dataSources={this.state.dataSources}
                      dataSourceType={dataSourceType}
                      {...this.getTimeSettings()}
                      onChange={settings => { this.updateConfigForOptions('timeSettings', settings) }}
                    />
                  }
                </SidePopper>
              }
            </React.Fragment>
            : <div className='empty-placeholder w-100'>
                <div className='empty-placeholder-inner'>
                  <div className='empty-placeholder-icon'><ClickOutlined size={48} /></div>
                  <div className='empty-placeholder-text' id='timeline-blank-msg'>
                    {this.i18nMessage('selectDataPlaceholder')}
                  </div>
              </div>
            </div>
        }
        {
          isTimeZoneData && <div className='disabled-mask w-100 h-100'>
            <div className='mask-bg' />
            <Alert form='basic' type='warning' className='alert-container'>
              {this.i18nMessage('timezoneWarning')}
            </Alert>
          </div>
        }
      </div>
    )
  }
}

export default ReactRedux.connect<ExtraProps, unknown>(
  (state: IMState, props: any) => {
    const isTimeZoneData = state.appStateInBuilder.appConfig.attributes?.timezone?.type === TimezoneConfig.Data
    return { isTimeZoneData }
  }
)(_Setting)
