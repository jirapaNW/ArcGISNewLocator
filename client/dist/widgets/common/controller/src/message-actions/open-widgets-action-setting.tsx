import { React, type ActionSettingProps, Immutable, ReactRedux, type IMState, hooks } from 'jimu-core'
import { SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { Select, Option, MultiSelect, type DropdownItemProps, defaultMessages as jimuUIDefaultMessages } from 'jimu-ui'
import { type IMConfig, type IMActionConfig } from '../config'
import { useControlledWidgets } from '../setting/setting'
import { BASE_LAYOUT_NAME } from '../common/consts'
import defaultMessages from '../setting/translations/default'

export default function OpenWidgetsActionSetting (props: ActionSettingProps<IMActionConfig>) {
  const { actionId, widgetId, onSettingChange } = props
  const config = props.config || Immutable({ widgetIds: [], controllerId: widgetId })

  const controlledWidgets = useControlledWidgets(widgetId, BASE_LAYOUT_NAME)
  const handleSelect = React.useCallback((_e: any, item: React.ReactElement<DropdownItemProps>) => {
    onSettingChange({
      actionId,
      config: config.set('widgetIds', [item.props.value])
    })
  }, [actionId, config, onSettingChange])

  const handleMultiSelect = React.useCallback((evt: React.MouseEvent, value: string | number, selectedValues: Array<string | number>) => {
    onSettingChange({
      actionId,
      config: config.set('widgetIds', selectedValues)
    })
  }, [actionId, config, onSettingChange])

  const isSingle = ReactRedux.useSelector((state: IMState) => {
    const widgetConfig = state.appStateInBuilder.appConfig.widgets[widgetId].config as IMConfig
    return widgetConfig?.behavior?.onlyOpenOne
  })
  const configRef = hooks.useLatest(config)
  React.useEffect(() => {
    const config = configRef.current
    if (isSingle && config.widgetIds.length > 1) {
      onSettingChange({
        actionId,
        config: config.set('widgetIds', [config.widgetIds[0]])
      })
    }
    if (isSingle && config.widgetIds.length === 0 && controlledWidgets.length > 0) {
      onSettingChange({
        actionId,
        config: config.set('widgetIds', [controlledWidgets[0].value])
      })
    }
  }, [actionId, configRef, controlledWidgets, isSingle, onSettingChange])

  const translate = hooks.useTranslation(defaultMessages, jimuUIDefaultMessages)

  const displayByValues = React.useCallback((value: string[]): string => {
    return translate('numSelected', { number: value.length })
  }, [translate])

  return <div>
    <SettingSection>
      <SettingRow label={translate('messageAction_openWidget')} flow='wrap'>
        {isSingle && <Select value={config.widgetIds[0]} onChange={handleSelect}>
          {controlledWidgets.map(w =>
            <Option value={w.value} key={w.value}>
              {w.label}
            </Option>
          )}
        </Select>}
        {!isSingle && <MultiSelect
          items={controlledWidgets}
          values={config.widgetIds}
          className='pt-1 custom-multiselect'
          fluid={true}
          displayByValues={displayByValues}
          onClickItem={handleMultiSelect}
        ></MultiSelect>}
      </SettingRow>
    </SettingSection>
  </div>
}
