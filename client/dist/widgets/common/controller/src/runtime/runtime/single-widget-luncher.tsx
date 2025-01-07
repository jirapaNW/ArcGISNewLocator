/** @jsx jsx */
import { React, classNames, WidgetState, type IMRuntimeInfos, Immutable, type IMState, ReactRedux, getAppStore, appActions, jsx, AppMode } from 'jimu-core'
import { type IMSizeMap } from '../../config'
import { Popper, type Size, type Placement } from 'jimu-ui'
import { WidgetRenderer } from './widget-renderer'
import { BASE_LAYOUT_NAME, DEFAULT_PANEL_SIZE, MIN_PANEL_SIZE, SINGLE_POPPER_MODIFIERS } from '../../common/consts'
import { getWidgetCardNode, ResizerTooltip, getResizerStyle, getResizerStyleBuilder } from './utils'
import { getLayoutItemId, useWidgetChildLayoutJson } from '../common/layout-utils'

export interface SingleWidgetsLuncherProps {
  root?: HTMLDivElement
  placement?: Placement
  sizes: IMSizeMap
  controllerId: string
  widgets: IMRuntimeInfos
  onResizeStop?: (widgetId: string, size: Size) => void
  onClose?: (id?: string) => any
}

const DefaultWidgets = Immutable({}) as IMRuntimeInfos
export const SingleWidgetsLuncher = (props: SingleWidgetsLuncherProps) => {
  const { controllerId, widgets = DefaultWidgets, root, placement, sizes: propSizes, onResizeStop, onClose } = props
  const widgetJsons = ReactRedux.useSelector((state: IMState) => state.appConfig.widgets)

  const layout = useWidgetChildLayoutJson(controllerId, BASE_LAYOUT_NAME)
  const handleClick = React.useCallback((evt: React.MouseEvent<HTMLDivElement>, widgetId: string) => {
    evt.stopPropagation()
    const layoutId = layout?.id
    const layoutItemId = getLayoutItemId(layout, widgetId)
    const selection = getAppStore().getState().appRuntimeInfo?.selection

    if (!selection || selection.layoutId !== layoutId || selection.layoutItemId !== layoutItemId) {
      getAppStore().dispatch(appActions.selectionChanged({ layoutId, layoutItemId }))
    }
  }, [layout])

  const [sizes, setSizes] = React.useState<IMSizeMap>(propSizes)
  const [isResizing, setIsResizing] = React.useState(false)
  const handleResize = (widgetId: string, value) => {
    setSizes((sizes) => sizes.set(widgetId, value))
    setIsResizing(true)
  }
  const handleResizeStop = (widgetId: string, value) => {
    onResizeStop?.(widgetId, value)
    setIsResizing(false)
  }

  const handleClose = (widgetId: string, evt: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLElement>) => {
    evt.stopPropagation()
    onClose?.(widgetId)
    const button = getWidgetCardNode(widgetId)?.querySelector('button')
    button?.focus()
  }

  const handleEscape = (widgetId: string, evt) => {
    if (evt?.key === 'Escape') {
      handleClose(widgetId, evt)
    }
  }

  const isRuntime = ReactRedux.useSelector((state: IMState) => state.appRuntimeInfo.appMode === AppMode.Run)
  const resizerStyle = isRuntime ? getResizerStyle() : getResizerStyleBuilder()

  return <React.Fragment>
    {Object.entries(widgets).map(([id, runtimeInfo]) => {
      const opened = runtimeInfo.state !== undefined
      if (!opened) return null
      const opening = runtimeInfo.state !== WidgetState.Closed
      const size = sizes[id] ?? DEFAULT_PANEL_SIZE
      const title = widgetJsons?.[id]?.label
      let reference = getWidgetCardNode(id)
      // no `offsetParent` means dom is hidden by style
      if (!reference || !reference.offsetParent) {
        reference = root?.querySelector('.avatar-card')
      }
      const layoutId = layout?.id
      const layoutItemId = getLayoutItemId(layout, id)

      return <Popper
        key={id}
        css={resizerStyle}
        style={{ maxWidth: '100vw' }}
        modifiers={SINGLE_POPPER_MODIFIERS}
        className={classNames({ 'd-none': !opening }, 'single-widget-launcher')}
        headerTitle={title}
        activateOnlyForHeader={true}
        minSize={MIN_PANEL_SIZE}
        dragBounds="body"
        defaultSize={size}
        onResize={(size) => { handleResize(id, size) }}
        onResizeStop={(size) => { handleResizeStop(id, size) }}
        onHeaderClose={evt => { handleClose(id, evt) }}
        showHeaderCollapse={true}
        floating={true}
        open={true}
        autoFocus={opening}
        reference={reference}
        toggle={evt => { handleEscape(id, evt) }}
        onClick={(evt) => { handleClick(evt, id) }}
        placement={placement}>
        <WidgetRenderer widgetId={id} layoutId={layoutId} layoutItemId={layoutItemId}></WidgetRenderer>
        {!isResizing && !isRuntime && <ResizerTooltip />}
      </Popper>
    })}
  </React.Fragment>
}
