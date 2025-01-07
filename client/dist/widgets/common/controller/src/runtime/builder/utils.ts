import { LayoutItemType, type LayoutItemConstructorProps, type IMLayoutJson, type LayoutInfo, getAppStore, appActions, ReactRedux, type IMState, appConfigUtils, type IMAppConfig, AppType, type PlaceholderInfo } from 'jimu-core'
import { searchUtils, utils } from 'jimu-layouts/layout-runtime'
import { LayoutServiceProvider, appBuilderSync, getAppConfigAction, placeholderService, widgetService } from 'jimu-for-builder'
import { addItemToLayout } from 'jimu-layouts/layout-builder'
import { useWidgetChildLayoutJson } from '../common/layout-utils'

export const isLayoutItemAcceptedForController = (item: LayoutItemConstructorProps): boolean => {
  let isAccepted = true
  const itemType = item?.itemType
  const name = item?.manifest?.name
  if (itemType === LayoutItemType.Section || ['controller'].includes(name)) {
    isAccepted = false
  }
  if (utils.isWidgetPlaceholder(utils.getAppConfig(), item)) {
    isAccepted = false
    const state = getAppStore().getState()
    const isTemplate = state.appInfo.type === AppType.Template
    const placeholderInfo = placeholderService.getPlaceholderInfo(state.appConfig, item.layoutInfo)
    // adding placeholder is supported only when it's not mainSizeMode and in template builder
    if (isTemplate && placeholderInfo && state.browserSizeMode !== state.appConfig.mainSizeMode) {
      isAccepted = true
    }
  }
  return isAccepted
}

export const useControlledPlaceholders = (widgetId: string, layoutName: string): PlaceholderInfo[] => {
  const layout = useWidgetChildLayoutJson(widgetId, layoutName)
  const appConfig = getAppStore().getState().appConfig
  const layoutItemJsons = Object.values(layout?.content || {}).filter(layoutItemJson => !layoutItemJson.widgetId)
  const placeholders = layoutItemJsons.map(layoutItemJson => placeholderService.getPlaceholderInfo(appConfig, {
    layoutId: layout.id,
    layoutItemId: layoutItemJson.id
  }))
  return placeholders
}

export const getOrderFromLayout = (layout: IMLayoutJson): string[] => {
  const order = layout?.order?.asMutable?.() ?? []
  let layoutItems = order.map(itemId => layout.content?.[itemId])
  layoutItems = layoutItems.filter(layoutItem => (layoutItem && layoutItem.id && !layoutItem.isPending))
  return layoutItems.map(layoutItem => layoutItem.id)
}

export const calInsertPositionForColumn = (boundingRect: Partial<DOMRectReadOnly>,
  childRects: Array<Partial<DOMRectReadOnly> & { id: string }>,
  clientY: number): { insertY: number, refId: string } => {
  let result, refId
  let found = false
  childRects.some((rect, i) => {
    const rectY = rect.top + rect.height / 2
    if (rectY > clientY) {
      if (i === 0) { // insert before the first item
        result = rect.top
      } else { // insert between this and previous one
        const previousItem = childRects[i - 1]
        result = (rect.top + previousItem.top + previousItem.height) / 2
      }
      found = true
      refId = rect.id
    }
    return found
  })
  if (!found) { // insert after the last one
    const lastItem = childRects[childRects.length - 1]
    result = lastItem.top + lastItem.height
  }
  return {
    insertY: result,
    refId
  }
}

export const calInsertPositionForRow = (boundingRect: Partial<DOMRectReadOnly>,
  childRects: Array<Partial<DOMRectReadOnly> & { id: string }>,
  clientX: number): { insertX: number, refId: string } => {
  let result, refId
  let found = false
  childRects.some((rect, i) => {
    const rectX = rect.left + rect.width / 2
    if (rectX > clientX) {
      if (i === 0) { // insert before the first item
        result = rect.left
      } else { // insert between this and previous one
        const previousItem = childRects[i - 1]
        result = (rect.left + previousItem.left + previousItem.width) / 2
      }
      found = true
      refId = rect.id
    }
    return found
  })
  if (!found) { // insert after the last one
    const lastItem = childRects[childRects.length - 1]
    result = lastItem.left + lastItem.width
  }
  return {
    insertX: result,
    refId
  }
}

export const insertWidgetToLayout = (
  layout: IMLayoutJson,
  itemProps: LayoutItemConstructorProps,
  insertIndex: number
) => {
  const layoutInfo = {
    layoutId: layout.id
  }

  let appConfigAction = getAppConfigAction()
  addItemToLayout(appConfigAction.appConfig, itemProps, layout.id)
    .then((result) => {
      appConfigAction = getAppConfigAction(result.updatedAppConfig)
      appConfigAction.adjustOrderOfItem(result.layoutInfo, insertIndex || 0)
      appConfigAction.editLayoutItemProperty(result.layoutInfo, 'bbox', {})
      getAppStore().dispatch(appActions.layoutChanged(appConfigAction.appConfig, layoutInfo))
    })
}

export const removeLayoutItem = (layoutInfo: LayoutInfo) => {
  appBuilderSync.publishConfirmDeleteToApp(layoutInfo)
}

/**
 * Check whether controller widget or controlled widgets by controller widget is selected
 */
export const useControlledWidgetsSelected = (widgetLayoutId: string, controllerLayoutId: string, nodeRef: React.RefObject<HTMLDivElement>) => {
  const selection = ReactRedux.useSelector((state: IMState) => state.appRuntimeInfo.selection)
  if (!selection) return false
  if (widgetLayoutId === selection.layoutId || controllerLayoutId === selection.layoutId) return true

  const nested = nodeRef.current?.querySelector(`div.layout[data-layoutid="${controllerLayoutId}"] div.layout[data-layoutid="${selection.layoutId}"]`)
  return nested != null
}

export const addExistedWidgetToLayout = (appConfig: IMAppConfig, layoutId: string, widgetId: string) => {
  const service = LayoutServiceProvider.getService(appConfig, layoutId)
  const result = service.createBlankItem(appConfig, layoutId)
  let updatedAppConfig = result[0]
  const layoutItemId = result[1]
  const layoutInfo = { layoutId, layoutItemId }
  const layoutItem = searchUtils.findLayoutItem(updatedAppConfig, layoutInfo)
    .set('widgetId', widgetId)
    .set('type', LayoutItemType.Widget)
  updatedAppConfig = updatedAppConfig.setIn(['layouts', layoutId, 'content', layoutItemId], layoutItem)
  const sizeMode = appConfigUtils.getSizeModeOfALayout(updatedAppConfig, layoutId)
  updatedAppConfig = widgetService.addParent(updatedAppConfig, widgetId, layoutInfo, sizeMode)
  updatedAppConfig = widgetService.afterAdded(updatedAppConfig, widgetId, layoutId, sizeMode, sizeMode)
  return { updatedAppConfig, layoutItemId }
}

export const insertWidgetToLayouts = async (layouts: IMLayoutJson[], itemProps: LayoutItemConstructorProps, insertIndex: number) => {
  if (layouts.length === 0) return
  // add new widget to current size mode
  let appConfigAction = getAppConfigAction()
  const firstLayoutId = layouts[0].id
  const { updatedAppConfig, layoutInfo } = await addItemToLayout(appConfigAction.appConfig, itemProps, firstLayoutId)
  appConfigAction = getAppConfigAction(updatedAppConfig)
  appConfigAction.adjustOrderOfItem(layoutInfo, insertIndex || 0)
  appConfigAction.editLayoutItemProperty(layoutInfo, 'bbox', {})
  // add existed widget to other size mode
  const otherLayoutIds = layouts.slice(1).map(l => l.id)
  const layoutItem = searchUtils.findLayoutItem(appConfigAction.appConfig, layoutInfo)
  otherLayoutIds.forEach(otherLayoutId => {
    const { updatedAppConfig, layoutItemId: otherLayoutItemId } = addExistedWidgetToLayout(appConfigAction.appConfig, otherLayoutId, layoutItem.widgetId)
    const otherLayout = updatedAppConfig.layouts?.[otherLayoutId]
    const otherInsertIndex = otherLayout.order?.length ?? 0
    appConfigAction = getAppConfigAction(updatedAppConfig)
    const otherLayoutInfo = { layoutId: otherLayoutId, layoutItemId: otherLayoutItemId }
    appConfigAction.adjustOrderOfItem(otherLayoutInfo, otherInsertIndex || 0)
    appConfigAction.editLayoutItemProperty(otherLayoutInfo, 'bbox', {})
  })
  getAppStore().dispatch(appActions.appConfigChanged(appConfigAction.appConfig))
}
