import { AppMode, AppType, React, classNames, getAppStore, useIntl } from 'jimu-core'
import { appBuilderSync, placeholderService } from 'jimu-for-builder'
import { withRnd } from 'jimu-layouts/layout-builder'
import { getPlaceholderItemForWidgetsList } from 'jimu-for-builder/lib/utils/utils'
import closeOutlined from 'jimu-icons/svg/outlined/editor/close.svg'
import { AvatarCard, type AvatarCardProps } from '../../common/avatar-card'

export interface PlaceholderAvatarCardProps extends Omit<AvatarCardProps, 'onClick'> {
  layoutId: string
  layoutItemId: string
  markerEnabled?: boolean
  onMarkerClick?: () => void
}

export const PlaceholderAvatarCard = (props: PlaceholderAvatarCardProps) => {
  const {
    className,
    layoutId,
    layoutItemId,
    markerEnabled,
    showLabel,
    showTooltip,
    labelGrowth,
    avatar,
    editDraggable
  } = props

  const state = getAppStore().getState()
  const placeholderInfo = placeholderService.getPlaceholderInfo(state.appConfig, { layoutId, layoutItemId })
  const placeholderJson = getPlaceholderItemForWidgetsList(useIntl())
  const isTemplate = state.appInfo.type === AppType.Template
  const isDesignMode = state.appRuntimeInfo.appMode === AppMode.Design
  const removePlaceholder = () => {
    appBuilderSync.publishConfirmDeleteToApp({ layoutId, layoutItemId })
  }
  return placeholderInfo && <AvatarCard
    className={classNames('placeholder-avatar-card', className)}
    label={placeholderJson.label + ' ' + placeholderInfo.id}
    icon={placeholderJson.icon}
    autoFlip={placeholderJson?.manifest?.properties?.flipIcon}
    marker={markerEnabled && isTemplate && isDesignMode ? closeOutlined : ''}
    showLabel={showLabel}
    showTooltip={showTooltip}
    labelGrowth={labelGrowth}
    avatar={avatar}
    editDraggable={editDraggable && isTemplate && isDesignMode}
    onMarkerClick={removePlaceholder}
  />
}

export const PlaceholderRndAvatarCard = withRnd(false)(PlaceholderAvatarCard as any)
