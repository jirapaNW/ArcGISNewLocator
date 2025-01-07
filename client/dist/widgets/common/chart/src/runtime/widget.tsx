import { React, type AllWidgetProps } from 'jimu-core'
import { type IMConfig } from '../config'
import { versionManager } from '../version-manager'
import { ChartRuntimeStateProvider } from './state'
import Chart from './chart'
import { DefaultChartComponentProps } from '../constants'

const Widget = (props: AllWidgetProps<IMConfig>): React.ReactElement => {
  const { outputDataSources, useDataSources, config, id, enableDataAction, onInitDragHandler } = props

  const webChart = config?.webChart
  const tools = config?.tools
  const options = config?.options ?? DefaultChartComponentProps
  const defaultTemplateType = config?._templateType

  return (
    <div className='jimu-widget widget-chart'>
      <ChartRuntimeStateProvider>
        <Chart
          widgetId={id}
          tools={tools}
          options={options}
          webChart={webChart}
          useDataSource={useDataSources?.[0]}
          enableDataAction={enableDataAction}
          onInitDragHandler={onInitDragHandler}
          defaultTemplateType={defaultTemplateType}
          outputDataSourceId={outputDataSources?.[0]}
        />
      </ChartRuntimeStateProvider>
    </div>
  )
}

Widget.versionManager = versionManager

export default Widget
