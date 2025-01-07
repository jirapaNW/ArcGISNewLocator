import { AbstractMessageAction, type Message, type MessageDescription, getAppStore, appActions, type ImmutableObject, type RuntimeInfos, MessageType, type DataRecordsSelectionChangeMessage } from 'jimu-core'
import { type IMConfig, type IMActionConfig } from '../config'
import { isWidgetOpening } from '../runtime/common/layout-utils'

export default class OpenWidgetsAction extends AbstractMessageAction {
  private readonly supportedMessageTypes = [
    MessageType.ButtonClick,
    MessageType.DataRecordsSelectionChange
  ]

  filterMessageDescription (messageDescription: MessageDescription): boolean {
    return this.supportedMessageTypes.includes(messageDescription.messageType)
  }

  filterMessage (message: Message): boolean {
    return true
  }

  onExecute (message: Message, actionConfig?: IMActionConfig): Promise<boolean> | boolean {
    const isSelectionEmpty = message.type === MessageType.DataRecordsSelectionChange && ((message as DataRecordsSelectionChangeMessage).records || []).length === 0
    if (!actionConfig || isSelectionEmpty) return Promise.resolve(true)
    let widgetIds = actionConfig?.widgetIds.asMutable()
    const controllerId = actionConfig?.controllerId
    const state = getAppStore().getState()
    const widgetConfig = state.appConfig.widgets[controllerId].config as IMConfig
    const isSingle = widgetConfig?.behavior?.onlyOpenOne
    if (isSingle) {
      const widgetsRuntimInfo = state.widgetsRuntimeInfo ?? {} as ImmutableObject<RuntimeInfos>
      const openingWidgets = Object.keys(widgetsRuntimInfo).filter(widgetId => {
        const runtimeInfo = widgetsRuntimInfo[widgetId]
        return runtimeInfo.controllerWidgetId === controllerId && isWidgetOpening(runtimeInfo)
      })
      if (openingWidgets.length > 0) {
        getAppStore().dispatch(appActions.closeWidgets(openingWidgets))
      }
      if (widgetIds.length > 1) {
        widgetIds = widgetIds.slice(0, 1)
      }
    }
    getAppStore().dispatch(appActions.openWidgets(widgetIds, controllerId))
    return Promise.resolve(true)
  }
}
