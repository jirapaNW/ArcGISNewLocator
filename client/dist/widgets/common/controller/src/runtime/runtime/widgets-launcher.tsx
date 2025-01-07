/**@jsx jsx */
import { React, jsx, appActions, getAppStore, type Size, hooks, ReactRedux, ContainerType, type IMSectionNavInfo, type IMState, LayoutItemType } from 'jimu-core'
import { type IMConfig } from '../../config'
import { BASE_LAYOUT_NAME, DEFAULT_WIDGET_START_POSITION, DEFAULT_PANEL_SIZE, DEFAULT_PANEL_SPACE } from '../../common/consts'
import { isWidgetOpening, useControlledWidgets } from '../common/layout-utils'
import { MobileWidgetLuncher } from './mobile-widget-luncher'
import { MultipleWidgetsLuncher } from './multiple-widgets-luncher'
import { SingleWidgetsLuncher } from './single-widget-luncher'
import { getWidgetCardNode } from './utils'
import { searchUtils } from 'jimu-layouts/layout-runtime'

interface WidgetsLauncherProps {
  id: string
  config: IMConfig
  version: number
  rootRef: React.RefObject<HTMLDivElement>
  onResizeStop?: (widgetId: string, size: Size) => void
}

//If current widget place in map widget, the id of map widget will be passed to the mobile panel
export const useContainerMapId = (id: string): string => {
  return ReactRedux.useSelector((state: IMState) => {
    const appConfig = state.appConfig
    const browserSizeMode = state.browserSizeMode
    const layoutInfosObject = appConfig.widgets[id].parent
    let layoutInfos = layoutInfosObject[browserSizeMode] ?? []
    // In Auto mode, SMALL and MEDIUM do not own a layout. So adopt LARGE's layout.
    if (layoutInfos.length === 0) {
      const mainSizeMode = appConfig.mainSizeMode
      layoutInfos = layoutInfosObject[mainSizeMode] ?? []
    }
    const layoutId = layoutInfos[0]?.layoutId
    const containerId = searchUtils.getWidgetIdThatUseTheLayoutId(appConfig, layoutId)
    const container = appConfig.widgets[containerId]
    return container?.manifest?.name === 'arcgis-map' ? container.id : ''
  })
}

/**
 * Get the section where the view is located.
 * @param viewId
 */
export const getParentSection = (viewId: string) => {
  const appConfig = getAppStore().getState().appConfig
  const sections = appConfig.sections
  const section = Object.values(sections ?? {}).find((section) => section.views?.includes(viewId))
  return section?.id
}

/**
 * Get all activated views.
 * @param sectionNavInfos
 */
export const getActiveViews = (sectionNavInfos: IMSectionNavInfo) => {
  const appConfig = getAppStore().getState().appConfig
  const sections = appConfig.sections
  const activedViews = sectionNavInfos ? Object.values(sectionNavInfos).map((section) => section.currentViewId) : []
  const activedSections = activedViews.map(getParentSection)
  const defaultActivedViews = Object.values(sections ?? {}).map(section => {
    if (!activedSections.includes(section.id)) {
      return section.views?.[0]
    }
    return undefined
  }).filter((view) => !!view)
  const views = activedViews
  defaultActivedViews.forEach((view) => {
    if (!activedViews.includes(view)) {
      views.push(view)
    }
  })
  return views
}

/**
 * Check whether current widget is hidden in section view or not.
 * @param sectionNavInfos
 * @param id
 */
const getWhetherWidgetVisible = (sectionNavInfos: IMSectionNavInfo, id: string) => {
  const activedViews = getActiveViews(sectionNavInfos)
  const browserSizeMode = getAppStore().getState().browserSizeMode
  const appConfig = getAppStore().getState().appConfig
  const info = searchUtils.getContentContainerInfo(appConfig, id, LayoutItemType.Widget, browserSizeMode)

  let visible = true

  if (!info) return visible

  if (info.type === ContainerType.View) {
    if (!activedViews.includes(info.id)) {
      visible = false
    } else {
      const parentViewId = info.id
      const parentSectionId = getParentSection(parentViewId)
      const sectionContainerViewInfo = searchUtils.getContentContainerInfo(appConfig, parentSectionId, LayoutItemType.Section, browserSizeMode)

      if (sectionContainerViewInfo && sectionContainerViewInfo.type === ContainerType.View) {
        if (!activedViews.includes(sectionContainerViewInfo.id)) {
          visible = false
        }
      }
    }
  }
  return visible
}

export const useWhetherWidgetVisible = (id: string): boolean => {
  const sectionNavInfos = ReactRedux.useSelector((state: IMState) => state.appRuntimeInfo?.sectionNavInfos)
  return getWhetherWidgetVisible(sectionNavInfos, id)
}

export default function WidgetsLauncher (props: WidgetsLauncherProps) {
  const { id, config, version, rootRef, onResizeStop } = props

  // mode: mobile, single, multiple
  const mobile = hooks.useCheckSmallBrowserSizeMode()
  const onlyOpenOne = config.behavior?.onlyOpenOne
  const arrangement = config?.behavior?.arrangement ?? 'floating'
  const singleFloatingMode = onlyOpenOne && arrangement === 'floating'
  const multiFloatingMode = !onlyOpenOne && arrangement === 'floating'

  // common props
  const handleCloseWidget = React.useCallback((id: string) => {
    if (!id) return
    getAppStore().dispatch(appActions.closeWidget(id))
    const widgetNode = getWidgetCardNode(id)
    widgetNode?.focus()
    getAppStore().dispatch(appActions.selectionChanged(null))
  }, [])

  // mobile props
  const containerMapId = useContainerMapId(id)

  // single props
  const placement = !config.behavior?.vertical ? 'bottom' : 'right-start'

  // multiple props
  const displayType = config.behavior?.displayType
  const isRTL = getAppStore()?.getState()?.appContext?.isRTL
  const widgetsLuncherStart = React.useMemo(() => {
    return isRTL ? { ...DEFAULT_WIDGET_START_POSITION, x: document.body.clientWidth - DEFAULT_PANEL_SIZE.width - DEFAULT_WIDGET_START_POSITION.x } : DEFAULT_WIDGET_START_POSITION
  }, [isRTL])
  const widgetsLuncherSpace = React.useMemo(() => isRTL ? { ...DEFAULT_PANEL_SPACE, x: -DEFAULT_PANEL_SPACE.x } : DEFAULT_PANEL_SPACE, [isRTL])

  // single & multiple props
  const size = config.behavior?.size

  //When version (it means in builder and related config changed) or currentPageIdchanged, close opening widgets
  const widgets = useControlledWidgets(id, BASE_LAYOUT_NAME)
  const widgetIds = Object.keys(widgets)
  const openingWidgets = widgetIds.filter((widgetId) => isWidgetOpening(widgets[widgetId]))
  const currentPageId = ReactRedux.useSelector((state: IMState) => state.appRuntimeInfo.currentPageId)
  hooks.useUpdateEffect(() => {
    getAppStore().dispatch(appActions.resetWidgetsState(widgetIds))
  }, [version, currentPageId])
  //When visible changed, close opening widgets/open at start widgets
  const visible = useWhetherWidgetVisible(id)
  const isInBuilder = ReactRedux.useSelector((state: IMState) => state.appContext.isInBuilder)
  const openStarts = config.behavior?.openStarts as unknown as string[]
  hooks.useUpdateEffect(() => {
    if (!visible) {
      getAppStore().dispatch(appActions.closeWidgets(openingWidgets))
    } else if (!isInBuilder && openStarts?.length > 0) {
      setTimeout(() => {
        getAppStore().dispatch(appActions.openWidgets(openStarts, id))
      }, 1000)
    }
  }, [visible])

  //When widget mounted, trigger open at start widgets
  React.useEffect(() => {
    if (isInBuilder) {
      getAppStore().dispatch(appActions.resetWidgetsState(widgetIds))
    }
    if (isInBuilder || !openStarts?.length || !visible) return
    setTimeout(() => {
      getAppStore().dispatch(appActions.openWidgets(openStarts, id))
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <React.Fragment>
    {
      mobile && <MobileWidgetLuncher
        containerMapId={containerMapId}
        controllerId={id}
        widgets={widgets}
        onClose={handleCloseWidget}
      />
    }
    {!mobile && singleFloatingMode && <SingleWidgetsLuncher
      sizes={size}
      root={rootRef.current}
      placement={placement}
      controllerId={id}
      widgets={widgets}
      onResizeStop={onResizeStop}
      onClose={handleCloseWidget}
    />}
    {!mobile && multiFloatingMode && <MultipleWidgetsLuncher
      sizes={size}
      mode={displayType}
      start={widgetsLuncherStart}
      spaceX={widgetsLuncherSpace.x}
      spaceY={widgetsLuncherSpace.y}
      controllerId={id}
      widgets={widgets}
      onResizeStop={onResizeStop}
      onClose={handleCloseWidget}
    />}
  </React.Fragment>
}
