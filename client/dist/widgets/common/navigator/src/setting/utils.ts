import { React, type ImmutableArray, Immutable, ReactRedux, type IMState, getAppStore, LayoutItemType, type IconResult, type ImmutableObject, useIntl } from 'jimu-core'
import { type MultiSelectItem, type NavigationVariant, defaultMessages as jimuiDefaultMessage } from 'jimu-ui'
import { type ViewNavigationStandard, type ViewNavigationType, type ViewNavigationVariant } from '../runtime/components/view-navigation'
import { searchUtils } from 'jimu-layouts/layout-runtime'
import { getNavigationVariables } from 'jimu-theme'
import { isInSymbolStyle } from '../utils'
const { useMemo, useCallback } = React
const END_NUMBER_REGEXP = /\d+$/

export const getAppConfig = () => getAppStore().getState().appStateInBuilder.appConfig

export const toMultiSelectItems = (views: string[]): MultiSelectItem[] => {
  const appConfig = getAppConfig()
  return views?.map(value => {
    const label = appConfig.views?.[value]?.label
    return {
      label,
      value
    }
  }) ?? []
}

export const getEndNumber = (string: string) => {
  const match = string.match(END_NUMBER_REGEXP)
  return match?.[0] ? Number(match[0]) : 0
}

//Get the label of section
export const getSectionLabel = (sectionId: string): string => {
  const appConfig = getAppConfig()
  return appConfig?.sections?.[sectionId]?.label ?? ''
}

//Convert views to the data of multi-select component
export const getViewSelectItems = (views): ImmutableArray<MultiSelectItem> => {
  const selectItems = toMultiSelectItems(views)
  return Immutable(selectItems)
}

export const getViewNavigationVariant = (type: ViewNavigationType, navStyle: string, useSmallIcon: boolean): ViewNavigationVariant => {
  const variants = getNavigationVariables()
  let variant = variants?.[type]?.[navStyle]

  const activeColor = navStyle === 'pills' ? 'var(--white)' : 'var(--primary)'

  const iconSize = useSmallIcon ? '8px' : '16px'

  const mixin = {
    item: {
      default: {
        icon: {
          size: iconSize
        },
        size: '14px'
      },
      active: {
        icon: {
          color: activeColor,
          size: iconSize
        },
        size: '14px'
      },
      hover: {
        icon: {
          color: 'var(--primary)',
          size: iconSize
        },
        size: '14px'
      }
    }
  } as Partial<NavigationVariant>

  if (navStyle === 'pills') {
    Object.keys(mixin.item).forEach((key) => {
      mixin.item[key].borderRadius = '6.25rem'
    })
  }

  variant = Immutable(variant).merge(mixin, { deep: true })

  if (navStyle === 'underline') {
    Object.keys(variant.item).forEach((key) => {
      if (variant.item?.[key]?.borderRadius === 'none') {
        variant = variant.setIn(['item', key, 'borderRadius'], '0px')
      }
    })
  }
  return variant
}

//Get theme navigation variants from theme
export const useViewNavigationVariant = (type: ViewNavigationType, navStyle: string, advanced: boolean, advanceVariant: ViewNavigationVariant, standard: Immutable.ImmutableObject<ViewNavigationStandard>): ViewNavigationVariant => {
  return useMemo(() => {
    if (advanced) return advanceVariant
    return getViewNavigationVariant(type, navStyle, isInSymbolStyle({ type, standard: standard?.asMutable({ deep: true }) }))
  }, [advanced, advanceVariant, type, navStyle, standard])
}

export const useContainerSections = (id: string): string[] => {
  const layouts = ReactRedux.useSelector((state: IMState) => state?.appStateInBuilder?.appConfig?.layouts)

  const sections = ReactRedux.useSelector((state: IMState) => state?.appStateInBuilder?.appConfig?.sections)

  const sizeMode = ReactRedux.useSelector((state: IMState) => state?.appStateInBuilder?.browserSizeMode)

  const mainSizeMode = ReactRedux.useSelector((state: IMState) => state?.appStateInBuilder?.appConfig?.mainSizeMode)

  return React.useMemo(() => {
    const appConfig = getAppStore().getState().appStateInBuilder.appConfig
    const containerSectionsInsizeMode = searchUtils.getContentsInTheSameContainer(appConfig, id, LayoutItemType.Widget, LayoutItemType.Section, sizeMode)
    if (containerSectionsInsizeMode && containerSectionsInsizeMode.length > 0) {
      return containerSectionsInsizeMode
    }
    const containerSectionsInMainSizeMode = searchUtils.getContentsInTheSameContainer(appConfig, id, LayoutItemType.Widget, LayoutItemType.Section, mainSizeMode)
    return containerSectionsInMainSizeMode || []
    // We listen for changes in appConfig.sections and appConfig.layouts instead of appConfig, which can reduce the number of times we re render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, sizeMode, sections, layouts])
}

export const useSectionViews = (section?: string) => {
  return ReactRedux.useSelector((state: IMState) => state?.appStateInBuilder?.appConfig?.sections?.[section]?.views)
}

const getIconCustomLabelName = (iconFileName: string) => {
  const map = new Map<string, string>([
    ['dot', 'drawToolDot'],
    ['dot-6', 'drawToolDot'],
    ['dot-10', 'drawToolDot'],
    ['pill', 'pill'],
    ['cube', 'rhombus'],
    ['circle', 'hollowCircle'],
    ['double-circle', 'filledDoubleCircle'],
    // keep these two for icon name translate in old version apps(<=1.13.0)
    ['left-arrow-12', 'arrowLeft12'],
    ['right-arrow-12', 'arrowRight12']
  ])
  return map.get(iconFileName)
}

export const useIconNLSNames = (standard: Immutable.ImmutableObject<ViewNavigationStandard>) => {
  const { alternateIcon, activedIcon, previousIcon, nextIcon } = standard || {}
  const intl = useIntl()
  const getIconWithNLSName = useCallback((icon: ImmutableObject<IconResult>) => {
    if (!icon) {
      return null
    }
    const filename = getIconCustomLabelName(icon?.properties?.filename) || icon?.properties?.filename
    return {
      ...icon,
      properties: {
        ...icon?.properties,
        filename: filename ? intl.formatMessage({ id: filename, defaultMessage: jimuiDefaultMessage[filename] || icon?.properties?.filename }) : icon?.properties?.filename
      }
    } as IconResult
  }, [intl])

  const alternate = useMemo(() => getIconWithNLSName(alternateIcon), [alternateIcon, getIconWithNLSName])
  const actived = useMemo(() => getIconWithNLSName(activedIcon), [activedIcon, getIconWithNLSName])
  const previous = useMemo(() => getIconWithNLSName(previousIcon), [previousIcon, getIconWithNLSName])
  const next = useMemo(() => getIconWithNLSName(nextIcon), [nextIcon, getIconWithNLSName])

  return [
    alternate,
    actived,
    previous,
    next
  ] as [IconResult, IconResult, IconResult, IconResult]
}
