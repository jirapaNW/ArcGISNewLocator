import { type IMConfig } from './config'

export type PopupDockPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export const PopupDockPositionArray: PopupDockPosition[] = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']

export function getValidPopupDockPosition (config: IMConfig): PopupDockPosition {
  let result: PopupDockPosition = null

  if (config && config.popupDockPosition) {
    if (PopupDockPositionArray.includes(config.popupDockPosition)) {
      result = config.popupDockPosition
    }
  }

  return result
}
