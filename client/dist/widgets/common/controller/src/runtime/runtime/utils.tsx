/**@jsx jsx */
import { React, jsx, css, appActions, getAppStore, hooks } from 'jimu-core'
import { Tooltip } from 'jimu-ui'
import { getWidgetChildLayoutJson } from '../common/layout-utils'
import { BASE_LAYOUT_NAME } from '../../common/consts'
import defaultMessages from '../translations/default'

/**
 * Get widget card node.
 * @param widgetId
 */
export const getWidgetCardNode = (widgetId: string): HTMLButtonElement => {
  const node = document.querySelector(`.widget-controller .avatar-card[data-widgetid='${widgetId}']`)
  return node as HTMLButtonElement
}

/**
 * Floating panel's resizer style
 */
export const getResizerStyle = () => {
  const resizerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
    <g clip-path="url(#rectangle)">
      <path d="M10 2.77832V0L0 10H2.77832L10 2.77832Z" fill="#000000" />
      <path d="M10 5.60674L5.60675 10H10V5.60674Z" fill="#000000" />
    </g>
    <defs>
      <clipPath id="rectangle">
        <rect width="10" height="10" fill="white" />
      </clipPath>
    </defs>
  </svg>`
  const maskImage = `url("data:image/svg+xml;base64,${window.btoa(resizerSvg)}")`
  return css`
    .resizer {
      bottom: 4px !important;
      right: 4px !important;
      background-color: var(--sys-color-secondary-dark);
      mask-image: ${maskImage};
      border: none !important;
    }
  `
}

export const getResizerStyleBuilder = () => {
  return css`
    .resizer {
      width: 9px !important;
      height: 9px !important;
      position: absolute;
      bottom: 4px !important;
      right: 4px !important;
      border: 1px solid #000 !important;
      background: #fff;
      clip-path: polygon(5px 0px, 9px 0px, 9px 9px, 0px 9px, 0px 5px, 5px 5px);
      &::before {
        content: '';
        position: absolute;
        width: 5px;
        height: 5px;
        border-right: 1px solid #000;
        border-bottom: 1px solid #000;
      }
    }
  `
}

export const ResizerTooltip = () => {
  const translate = hooks.useTranslation(defaultMessages)
  const resizerTooltipStyle = React.useMemo(() => css`
    position: absolute;
    width: 15px;
    height: 15px;
    bottom: 0;
    right: 0;
  `, [])
  const resizerTooltip = React.useMemo(() => <Tooltip title={translate('resizerTooltip')}>
    <div className='resizer-tooltip' css={resizerTooltipStyle} />
  </Tooltip>, [resizerTooltipStyle, translate])
  return resizerTooltip
}

export const selectWidget = (widgetId: string, controllerId: string) => {
  const layout = getWidgetChildLayoutJson(controllerId, BASE_LAYOUT_NAME)
  const layoutItemId = Object.keys(layout.content).find(itemId => layout.content[itemId].widgetId === widgetId)
  getAppStore().dispatch(appActions.selectionChanged({ layoutId: layout.id, layoutItemId }))
}

export const toggleWidget = (controllerId: string, widgetId: string, openingWidgets: string[], keepOneOpened: boolean) => {
  if (keepOneOpened) {
    getAppStore().dispatch(appActions.closeWidgets(openingWidgets))
    if (!openingWidgets.includes(widgetId)) {
      getAppStore().dispatch(appActions.openWidget(widgetId, controllerId))
      selectWidget(widgetId, controllerId)
    }
  } else {
    if (!openingWidgets.includes(widgetId)) {
      getAppStore().dispatch(appActions.openWidget(widgetId, controllerId))
      selectWidget(widgetId, controllerId)
    } else {
      getAppStore().dispatch(appActions.closeWidget(widgetId))
    }
  }
}
