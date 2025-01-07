/**@jsx jsx */
import { React, jsx, ReactRedux, type IMState, appActions, getAppStore, css, type LayoutItemConstructorProps, BrowserSizeMode, hooks, AppMode, Immutable, type Size } from 'jimu-core'
import { type IMSizeMap, type IMConfig } from '../../config'
import { BASE_LAYOUT_NAME } from '../../common/consts'
import { getAppConfigAction, appBuilderSync } from 'jimu-for-builder'
import { getWidgetChildLayoutJson, isWidgetOpening, useControlledWidgets } from '../common/layout-utils'
import { WidgetListPopper } from 'jimu-ui/advanced/setting-components'
import { isLayoutItemAcceptedForController, insertWidgetToLayout, insertWidgetToLayouts, useControlledPlaceholders } from './utils'
import { LayoutListPlaceholder } from './layout-list-placeholder'
import { PageContext } from 'jimu-layouts/layout-runtime'
import WidgetsLauncher from '../runtime/widgets-launcher'
import WidgetToolbar from './widget-toolbar'
import { toggleWidget } from '../runtime/utils'

export interface BuilderProps {
  id: string
  config: IMConfig
  version?: number
  autoSize?: boolean
}

const widgetPanelStyles = css`
  width: 300px;
  height: 300px;
  overflow-y: auto;
`

const isAddWidgetExt = (node: HTMLElement) => {
  if (!node) return false
  if (node.dataset?.extname === 'controller-add-widget') {
    return true
  }
  const parent = node.parentElement
  return parent?.dataset?.extname === 'controller-add-widget'
}

export const Builder = (props: BuilderProps) => {
  const { id, config, version, autoSize } = props

  const mobile = hooks.useCheckSmallBrowserSizeMode()
  const arrangement = config?.behavior?.arrangement ?? 'floating'
  const { viewOnly } = React.useContext(PageContext)
  const rootRef = React.useRef<HTMLDivElement>(null)

  const widgetsState = ReactRedux.useSelector((state: IMState) => state.widgetsState[id])
  const currentDialogId = ReactRedux.useSelector((state: IMState) => state.appRuntimeInfo?.currentDialogId)
  const showWidgetsPanel = widgetsState?.showWidgetsPanel
  const browserSizeMode = ReactRedux.useSelector((state: IMState) => state.browserSizeMode)

  const scrollRef = React.useRef<(previous: boolean, moveOne?: boolean) => void>()
  //Get all open state widgets in controller
  const widgets = useControlledWidgets(id, BASE_LAYOUT_NAME)
  const widgetPlaceholders = useControlledPlaceholders(id, BASE_LAYOUT_NAME)
  const showPlaceholder = !Object.keys(widgets ?? {}).length && widgetPlaceholders.length === 0

  const floatingMode = arrangement === 'floating' || mobile //apply floating behavior to fixed as well in mobile mode

  React.useEffect(() => {
    if (browserSizeMode === BrowserSizeMode.Small && showWidgetsPanel !== undefined) {
      appBuilderSync.publishSidePanelToApp({
        type: 'widget',
        isPlaceholder: false,
        isItemAccepted: isLayoutItemAcceptedForController,
        onSelect: onItemSelect,
        keepPanel: true,
        active: showWidgetsPanel
      })
      // getAppStore().dispatch(appActions.widgetStatePropChange(id, 'showWidgetsPanel', false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showWidgetsPanel])

  const handleScrollStatusChange = React.useCallback((hideArrow: boolean, disablePrevious?: boolean, disableNext?: boolean) => {
    getAppStore().dispatch(appActions.widgetStatePropChange(id, 'hideArrow', hideArrow))
    getAppStore().dispatch(appActions.widgetStatePropChange(id, 'disablePrevious', disablePrevious))
    getAppStore().dispatch(appActions.widgetStatePropChange(id, 'disableNext', disableNext))
  }, [id])

  //Synchronize the state and method of scroll-list component to toolbar
  React.useEffect(() => {
    getAppStore().dispatch(appActions.widgetStatePropChange(id, 'onArrowClick', scrollRef.current))
  }, [id])

  const closeWidgetsPanel = React.useCallback(() => {
    getAppStore().dispatch(appActions.widgetStatePropChange(id, 'showWidgetsPanel', false))
  }, [id])

  React.useEffect(() => {
    if (currentDialogId) {
      closeWidgetsPanel()
    }
  }, [closeWidgetsPanel, currentDialogId])

  const updateWidgetConfig = (config: IMConfig) => {
    getAppConfigAction().editWidgetConfig(id, config).exec()
  }

  const afterRemoveWidget = (widgetId: string) => {
    if (config.behavior.openStarts.includes(widgetId)) {
      updateWidgetConfig(config.setIn(['behavior', 'openStarts'], config.behavior.openStarts.filter(id => id !== widgetId)))
    }
  }

  const clickXY = React.useRef([0, 0])
  const widgetIds = Object.keys(widgets)
  const openingWidgets = widgetIds.filter((widgetId) => isWidgetOpening(widgets[widgetId]))
  const handleItemClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (viewOnly) return
    const reference = evt.currentTarget
    const widgetId = reference.dataset?.widgetid
    const isDragging = clickXY.current[0] !== evt.clientX || clickXY.current[1] !== evt.clientY
    if (!widgetId || isDragging) return
    if (!openingWidgets.includes(widgetId)) {
      evt.stopPropagation()
    }
    const onlyOpenOne = config.behavior?.onlyOpenOne
    const keepOneOpened = mobile ? true : onlyOpenOne
    toggleWidget(id, widgetId, openingWidgets, keepOneOpened)
  }
  const handleMouseDown: React.MouseEventHandler = (e) => {
    clickXY.current = [e.clientX, e.clientY]
  }

  const handleClose = (e) => {
    if (!isAddWidgetExt(e?.target)) {
      closeWidgetsPanel()
    }
  }

  const handleRootClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const target = evt.target as HTMLElement
    const root = rootRef.current
    if (!target || !root) return
    if (root.contains(target)) {
      closeWidgetsPanel()
    }
  }

  const onWidgetSizeChanged = (widgetId: string, _size: Size) => {
    if (!widgetId) {
      return
    }
    let size = config?.behavior.size || Immutable({}) as IMSizeMap
    size = size.set(widgetId, _size)
    const newConfig = config.setIn(['behavior', 'size'], size)
    getAppConfigAction().editWidgetConfig(id, newConfig).exec()
  }

  const isExpressMode = ReactRedux.useSelector((state: IMState) => state.appRuntimeInfo.appMode === AppMode.Express)
  const onItemSelect = React.useCallback(async (item: LayoutItemConstructorProps) => {
    const layout = getWidgetChildLayoutJson(id, BASE_LAYOUT_NAME)
    const insertIndex = layout.order?.length ?? 0
    try {
      if (isExpressMode) {
        const { widgets, layouts } = getAppStore().getState().appConfig
        const allSizeLayouts = Object.values(widgets[id].layouts[BASE_LAYOUT_NAME]).map(layoutId => layouts[layoutId])
        insertWidgetToLayouts(allSizeLayouts, item, insertIndex)
      } else {
        insertWidgetToLayout(layout, item, insertIndex)
      }
    } catch (e) {
      console.error('Failed to add widget')
    }
  }, [id, isExpressMode])

  return <div className='controller-builder w-100 h-100' ref={rootRef} onClick={handleRootClick}>
    {floatingMode &&
      <WidgetsLauncher
        id={id}
        config={config}
        version={version}
        rootRef={rootRef}
        onResizeStop={onWidgetSizeChanged}
      />
    }
    <WidgetToolbar id={id} />
    <LayoutListPlaceholder
      autoSize={autoSize}
      scrollRef={scrollRef}
      showPlaceholder={showPlaceholder}
      onScrollStatusChange={handleScrollStatusChange}
      vertical={config?.behavior?.vertical}
      widgetId={id}
      onItemClick={handleItemClick}
      onMouseDown={handleMouseDown}
      itemStyle={config.appearance.card as any}
      draggable={true}
      markerEnabled={!viewOnly}
      space={config?.appearance?.space}
      afterRemoveWidget={afterRemoveWidget}
    />
    {showWidgetsPanel && browserSizeMode !== BrowserSizeMode.Small &&
      <WidgetListPopper
        css={widgetPanelStyles}
        placement='right-start'
        referenceElement={rootRef.current}
        isAccepted={isLayoutItemAcceptedForController}
        onSelect={onItemSelect}
        onClose={handleClose}
      />
    }
  </div>
}
