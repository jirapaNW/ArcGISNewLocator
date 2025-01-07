/** @jsx jsx */
import {
  React,
  jsx,
  DataSourceComponent,
  DataSourceStatus,
  type IMDataSourceInfo,
  type ImmutableArray
} from 'jimu-core'
import { type LrsLayer } from '../../config'
import { isDefined } from 'widgets/shared-code/lrs'

export interface DataSourceManagerProps {
  lrsLayers?: ImmutableArray<LrsLayer>
  dataSourcesReady: (boolean) => void
  handleSetDataSources: (DataSource) => void
}

const temp = []

export function DataSourceManager (props: DataSourceManagerProps) {
  const { lrsLayers, dataSourcesReady, handleSetDataSources } = props
  const [lrsEvents, setLrsEvents] = React.useState<ImmutableArray<LrsLayer>>(lrsLayers ?? null)
  const [eventDsReady, setEventDsReady] = React.useState<boolean[]>([])

  React.useEffect(() => {
    if (lrsLayers) {
      setLrsEvents(lrsLayers)
      const setDsReadyFalse: boolean[] = Array(lrsLayers.length).fill(false)
      setEventDsReady(setDsReadyFalse)
    }
  }, [lrsLayers])

  const updateDsReady = React.useCallback((index: number, value: boolean) => {
    const updatedDsReady = eventDsReady
    updatedDsReady[index] = value
    setEventDsReady(updatedDsReady)
    if (updatedDsReady.every(value => value)) {
      dataSourcesReady(true)
    }
  }, [dataSourcesReady, eventDsReady])

  const handleEventDsCreated = React.useCallback((ds: any, index) => {
    temp.push(ds)
    if (lrsLayers?.length === temp.length) {
      handleSetDataSources(temp)
    }
    updateDsReady(index, true)
  }, [lrsLayers?.length, handleSetDataSources, updateDsReady])

  const handleEventDsInfoChange = React.useCallback((info: IMDataSourceInfo, index) => {
    if (info) {
      const { status, instanceStatus } = info
      if (instanceStatus === DataSourceStatus.NotCreated ||
          instanceStatus === DataSourceStatus.CreateError ||
          status === DataSourceStatus.LoadError ||
          status === DataSourceStatus.NotReady) {
        updateDsReady(index, false)
      } else {
        updateDsReady(index, true)
      }
    }
  }, [updateDsReady])

  const handleEventDsCreateFailed = React.useCallback((index) => {
    updateDsReady(index, false)
  }, [updateDsReady])

  return (
    <div>
      {isDefined(lrsEvents) && (
        lrsEvents.map((event, index) => {
          return (
            <DataSourceComponent
              key={index}
              useDataSource={event.useDataSource}
              onDataSourceInfoChange={(e) => { handleEventDsInfoChange(e, index) }}
              onCreateDataSourceFailed={(e) => { handleEventDsCreateFailed(index) }}
              onDataSourceCreated={(e) => { handleEventDsCreated(e, index) }}
            />
          )
        })
      )}
    </div>
  )
}
