import { React, hooks } from 'jimu-core'
import { getListItemLength } from '../common/utils'
import { type IMConfig } from '../../config'
import { ScrollList } from '../common/scroll-list'
import { WidgetAvatarCard } from '../common'
import { BASE_LAYOUT_NAME } from '../../common/consts'
import { isWidgetOpening, useControlledWidgets } from '../common/layout-utils'
import WidgetsLauncher from './widgets-launcher'
import { toggleWidget } from './utils'

export interface RuntimeProps {
  id: string
  config: IMConfig
  version?: number
  autoSize?: boolean
}

export const Runtime = (props: RuntimeProps) => {
  const { id, config, version, autoSize } = props

  const onlyOpenOne = config.behavior?.onlyOpenOne
  const vertical = config.behavior?.vertical
  const card = config?.appearance?.card
  const itemLength = getListItemLength(config?.appearance?.card as any, config?.appearance?.space)
  const mobile = hooks.useCheckSmallBrowserSizeMode()
  const rootRef = React.useRef<HTMLDivElement>(null)
  // Get all the widgets contained in the controller
  const widgets = useControlledWidgets(id, BASE_LAYOUT_NAME)
  const widgetIds = Object.keys(widgets)
  const openingWidgets = widgetIds.filter((widgetId) => isWidgetOpening(widgets[widgetId]))

  const handleOpenWidget = React.useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
    const widgetId = evt.currentTarget.dataset?.widgetid
    if (!widgetId) return

    const keepOneOpened = mobile ? true : onlyOpenOne
    if (!openingWidgets.includes(widgetId)) {
      evt.stopPropagation()
    }
    toggleWidget(id, widgetId, openingWidgets, keepOneOpened)
  }, [mobile, onlyOpenOne, openingWidgets, id])

  //The function to create widget card
  const createItem = React.useCallback((id: string, className: string) => {
    const active = openingWidgets.includes(id)
    return (
      <WidgetAvatarCard
        {...card as any}
        key={id}
        className={`${className} layout-item`}
        widgetid={id}
        markerEnabled={false}
        active={active}
        onClick={handleOpenWidget}
      />
    )
  }, [card, handleOpenWidget, openingWidgets])

  return (
    <div className='controller-runtime w-100 h-100'>
      <WidgetsLauncher
        id={id}
        config={config}
        version={version}
        rootRef={rootRef}
      />
      <ScrollList
        ref={rootRef}
        className={'runtime--scroll-list'}
        vertical={vertical}
        itemLength={itemLength}
        space={config.appearance?.space}
        autoHideArrow
        autoSize={autoSize}
        lists={widgetIds}
        createItem={createItem}
      />
    </div>
  )
}
