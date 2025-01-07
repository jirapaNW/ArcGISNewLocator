import {
  AbstractMessageAction,
  getAppStore,
  appActions,
  MessageType,
  type MessageDescription,
  type Message,
  type DataRecordsSelectionChangeMessage
} from 'jimu-core'

export default class OpenSidebarAction extends AbstractMessageAction {
  filterMessageDescription (messageDescription: MessageDescription): boolean {
    return messageDescription.messageType === MessageType.ButtonClick ||
      messageDescription.messageType === MessageType.ViewChange ||
      messageDescription.messageType === MessageType.DataRecordsSelectionChange
  }

  filterMessage (): boolean {
    return true
  }

  onExecute (message: Message): Promise<boolean> | boolean {
    if (message.type === MessageType.DataRecordsSelectionChange &&
      (message as DataRecordsSelectionChangeMessage).records.length === 0) {
      return true
    }
    getAppStore().dispatch(appActions.widgetStatePropChange(this.widgetId, 'collapse', true))
    return true
  }
}
