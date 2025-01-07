/** @jsx jsx */
import { React, jsx, css, type AllWidgetProps } from 'jimu-core'
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { MainPanel } from './components/main-panel'
import { PlaceHolder } from './components/place-holder'
import { type IMConfig } from '../config'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const useMapWidgetId = props.useMapWidgetIds?.[0]

  const [activedJimuMapViewState, setActivedJimuMapViewState] = React.useState<JimuMapView>(null)
  const onActiveMapViewChange = React.useCallback(async (activeView) => {
    if (activeView?.view?.type === '3d') {
      // async load jimuMapView info
      await activeView.whenJimuMapViewLoaded()
      await activeView.whenAllJimuLayerViewLoaded()

      setActivedJimuMapViewState(activeView)
    } else {
      setActivedJimuMapViewState(null)
    }
  }, [])

  const getStyle = () => {
    return css`
      background-color: var(--sys-color-surface-paper);
      overflow: auto;
    `
  }

  const isShowPlaceHolderFlag = !useMapWidgetId || !(activedJimuMapViewState?.view?.type === '3d')
  const isShowMainPanel = (activedJimuMapViewState && !isShowPlaceHolderFlag)
  return (
    <div className='widget-building-explorer jimu-widget' css={getStyle()}>
      { /* 1.placeholder */}
      {isShowPlaceHolderFlag &&
        <PlaceHolder
          widgetId={props.id}
        ></PlaceHolder>
      }

      { /* 2.widgets panel*/}
      <div className={(isShowMainPanel ? 'd-flex h-100 ' : 'd-none')}>
        <MainPanel
          widgetId={props.id}
          config={props.config}
          jimuMapView={activedJimuMapViewState}
        ></MainPanel>
      </div>

      { /* 3.map */}
      {useMapWidgetId &&
        <JimuMapViewComponent useMapWidgetId={useMapWidgetId} onActiveViewChange={onActiveMapViewChange} />
      }
    </div>
  )
}

export default Widget
