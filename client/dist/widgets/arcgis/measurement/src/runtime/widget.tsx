/** @jsx jsx */
import { React, jsx, type AllWidgetProps, hooks, css, classNames, AppMode, type IMState, ReactRedux, WidgetState } from 'jimu-core'
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { Loading, LoadingType, WidgetPlaceholder, defaultMessages as jimuUIMessages } from 'jimu-ui'
import { MeasurementArrangement, type MeasurementClass, type IMConfig, type MeasureButton } from '../config'
import MeasureTools from './components/measure-tools'
import MeasureWidget from './components/measure-widget'
import defaultMessages from './translations/default'
import MeasurementIcon from '../../icon.svg'

const style = css`
  min-width: 270px;
  min-height: 40px;
  height: 100%;
  overflow: auto;
`

export default function Widget (props: AllWidgetProps<IMConfig>): React.ReactElement {
  const { id, useMapWidgetIds, context, config } = props
  const {
    enableDistance = true,
    enableArea = true,
    arrangement = MeasurementArrangement.Classic
  } = config

  const useMapWidgetId = useMapWidgetIds?.[0]
  const [jimuMapView, setJimuMapView] = React.useState<JimuMapView>(null)

  const [loading, setLoading] = React.useState(true)
  const onViewsCreate = React.useCallback(() => {
    setLoading(false)
  }, [])

  const [activeButton, setActiveButton] = React.useState<MeasureButton['name']>('')
  const handleSelectTool = (measureButton: MeasureButton) => {
    if (measureButton.name === activeButton) {
      setActiveButton('')
    } else {
      setActiveButton(measureButton.name)
    }
  }
  const isDesignMode = ReactRedux.useSelector((state: IMState) => state.appRuntimeInfo.appMode === AppMode.Design)
  const currentPageId = ReactRedux.useSelector((state: IMState) => state.appRuntimeInfo.currentPageId)
  const isClosed = ReactRedux.useSelector((state: IMState) => state.widgetsRuntimeInfo[id].state === WidgetState.Closed)
  React.useEffect(() => {
    setActiveButton('')
  }, [isDesignMode, enableDistance, enableArea, arrangement, currentPageId, isClosed, useMapWidgetIds, jimuMapView])

  const rootRef = React.useRef<HTMLDivElement>(null)
  const [activeTool, setActiveTool] = React.useState<MeasurementClass>(null)

  const handleChangeUnit = React.useCallback((unit: __esri.SystemOrLengthUnit | __esri.SystemOrAreaUnit) => {
    if (activeTool) {
      activeTool.unit = unit
    }
  }, [activeTool])

  const handleClear = React.useCallback(() => {
    activeTool && activeTool.viewModel.clear()
  }, [activeTool])

  const ready = useMapWidgetId && (enableDistance || enableArea)
  const translate = hooks.useTranslation(jimuUIMessages, defaultMessages)

  return <div id={id} className='widget-measurement h-100 surface-1 border-0' css={style}>
    {!ready &&
      <div className='w-100 h-100'>
        <WidgetPlaceholder className='w-100 placeholder-wapper'
          icon={MeasurementIcon} widgetId={props.id} message={translate('_widgetLabel')}
        />
      </div>
    }
    {ready && <React.Fragment>
      <div className={classNames('h-100', { 'd-none': loading })}>
        <MeasureTools
          ref={rootRef}
          config={config}
          context={context}
          activeButton={activeButton}
          activeTool={activeTool}
          translate={translate}
          onSelectTool={handleSelectTool}
          onChangeUnit={handleChangeUnit}
          onClear={handleClear}
        />
        <MeasureWidget
          id={id}
          config={config}
          jimuMapView={jimuMapView}
          activeButton={activeButton}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          rootRef={rootRef}
          translate={translate}
          onClear={handleClear}
        />
      </div>
      <JimuMapViewComponent
        useMapWidgetId={useMapWidgetId}
        onViewsCreate={onViewsCreate}
        onActiveViewChange={setJimuMapView}
      />
    </React.Fragment>}
    {useMapWidgetId && loading && <Loading type={LoadingType.Secondary} />}
  </div>
}
