import {
  React, type DataSource, type FeatureLayerQueryParams, DataSourceComponent, type IMUseDataSource, type QueriableDataSource, type IMDataSourceInfo, DataSourceStatus, type DataRecord,
  DataSourceTypes, type QueryParams, lodash, CONSTANTS
} from 'jimu-core'
import { loadArcGISJSAPIModules } from 'jimu-arcgis'

type OnDataSourceStatusChangedFunc = (dsConfigId: string, status: DataSourceStatus, dataSourceLabel?: string) => void

type OnDataChangedFunc = (dsConfigId: string, dataSource: DataSource, currentData: CurrentData, isFirstLoad?: boolean) => void

type OnSelectedRecordIdChanged = (dsConfigId: string, index: number, dataSourceId: string) => void
type OnunselectedRecordIdChanged = (dataSourceId: string) => void

interface Props {
  dsConfigId: string
  widgetId: string
  useDataSource: IMUseDataSource
  index: number
  limitGraphics: boolean
  maxGraphics: number
  active: boolean
  onDataSourceStatusChanged: OnDataSourceStatusChangedFunc
  onDataChanged: OnDataChangedFunc
  onSelectedRecordIdChanged: OnSelectedRecordIdChanged
  onUnselectedRecordIdChanged: OnunselectedRecordIdChanged
}

interface State {
  dataSourceId: string
  dataSourceStatus: DataSourceStatus
  dataSourceWidgetQueries: any
  dataSourceQuerieWhere: string
  dataSourceVersion: number
}

export interface CurrentData {
  id: string
  count: number
  index: number
  graphic: __esri.Graphic
  record: DataRecord
  dataSourceId: string
  dataSourceVersion: number
  defaultPopupTemplate: any
}

interface DataBuffer {
  count: number
  dataMap: { [key: number]: CurrentData }
  pagingNum: number
  // dataObjectIds: string[];
}

export class DataLoader extends React.PureComponent<Props, State> {
  private previousIndex: number
  private dataSource: QueriableDataSource
  readonly dataBuffer: DataBuffer
  private previousData: CurrentData
  private isFirstLoad: boolean
  private previousSelectedId: string
  // use count to avoid the update of old query result, only the latest query result need to be updated to the dataMap
  private countOfQueryGraphics: number = 0

  constructor (props) {
    super(props)
    this.state = {
      dataSourceId: null,
      dataSourceStatus: DataSourceStatus.Loaded,
      dataSourceVersion: undefined,
      dataSourceWidgetQueries: undefined,
      dataSourceQuerieWhere: ''
    }

    this.previousIndex = 0
    this.previousData = {
      id: null,
      count: null,
      index: null,
      graphic: null,
      record: null,
      defaultPopupTemplate: null,
      dataSourceVersion: undefined,
      dataSourceId: null
    }
    this.dataBuffer = {
      count: null,
      dataMap: {},
      pagingNum: 30
      // dataObjectIds: []
    }
    this.isFirstLoad = false
    this.previousSelectedId = null
  }

  componentDidMount () {
  }

  async componentDidUpdate (prevProps, prevState) {
    if (this.state.dataSourceQuerieWhere !== prevState.dataSourceQuerieWhere) {
      this.clearData()
    }
    const sqlExprObj = null
    if (this.props.useDataSource &&
        this.state.dataSourceId === this.props.useDataSource.dataSourceId &&
        this.state.dataSourceStatus === DataSourceStatus.Loaded) {
      let index
      if (this.props.index === this.previousIndex) {
        this.clearData()
        // this.previousIndex = null;
        // index = 0;
        index = this.props.index
      } else {
        this.previousIndex = this.props.index
        index = this.props.index
      }

      let currentData = this.getData(index)
      if (currentData) {
        this.onDataChanged(this.dataSource, currentData, prevProps)
      } else {
        this.countOfQueryGraphics++
        const currentCountOfQueryGraphics = this.countOfQueryGraphics
        await this.dataSource.queryCount({}).then(result => {
          if (currentCountOfQueryGraphics < this.countOfQueryGraphics) {
            return
          }
          const realCount = result.count
          if (index >= realCount) {
            index = 0
          }
          // const start = Math.floor(index / this.dataBuffer.pagingNum) * this.dataBuffer.pagingNum;
          this.queryGraphics(this.dataSource, sqlExprObj, index, this.dataBuffer.pagingNum, realCount).then((results) => {
            if (currentCountOfQueryGraphics < this.countOfQueryGraphics) {
              return
            }
            if (results.graphics.length === 0) {
              currentData = null
            } else {
              this.addData(results, this.dataSource.id)
              currentData = this.getData(results.index)
            }
            this.onDataChanged(this.dataSource, currentData, prevProps)
            this.isFirstLoad = false
          })
        })
      }
    }
  }

  onDataChanged (dataSource, currentData, prevProps) {
    if (!this.props.active) return
    if (!currentData) {
      this.props.onDataChanged(this.props.dsConfigId, this.dataSource, currentData)
    } else if (this.props.active !== prevProps.active) {
      // data source selector change
      this.props.onDataChanged(this.props.dsConfigId, this.dataSource, currentData, this.isFirstLoad)
    } else if (this.previousData?.dataSourceId !== currentData?.dataSourceId ||
              this.previousData?.id !== currentData?.id ||
              this.previousData?.count !== currentData?.count ||
              this.previousData?.index !== currentData?.index ||
              this.previousData?.dataSourceVersion !== currentData?.dataSourceVersion ||
              !lodash.isDeepEqual(this.previousData?.graphic?.attributes, currentData?.graphic?.attributes)) { // this will only be executed when the auto refresh open, and each refresh is executed only once
      // previousData is null.
      // previousData is not null.
      // currentData is not null.
      // previousData !== currentData
      this.props.onDataChanged(this.props.dsConfigId, this.dataSource, currentData, this.isFirstLoad)
    } else {
      // previousData is not null.
      // currentData is not null.
      // previousData === currentData
      this.onDataSourceStatusChanged(this.props.dsConfigId, DataSourceStatus.Loaded, this.dataSource?.getLabel())
    }
    this.previousData = currentData
  }

  onDataSourceStatusChanged = (dsConfigId: string, status: DataSourceStatus, dataSourceLabel?: string) => {
    if (!this.props.active) return
    this.props.onDataSourceStatusChanged(dsConfigId, status, dataSourceLabel)
  }

  addData (queryResult, dataSourceId) {
    queryResult.records.forEach((record, i) => {
      const index = queryResult.start + i
      this.dataBuffer.dataMap[index] = {
        id: record.getId(),
        count: this.dataBuffer.count,
        index: index,
        graphic: queryResult.graphics[i],
        defaultPopupTemplate: queryResult.defaultPopupTemplate,
        record: record,
        dataSourceId: dataSourceId,
        dataSourceVersion: this.state.dataSourceVersion
      }
    })
  }

  initData (count) {
    this.dataBuffer.count = count
  }

  getData (index) {
    return this.dataBuffer.dataMap[index]
  }

  async getDataIndexByObjectId (objectId): Promise<number> {
    let index = -1
    const dataEntries = Object.entries(this.dataBuffer.dataMap)
    dataEntries.some(entry => {
      if (objectId === entry[1]?.id) {
        index = Number(entry[0])
        return true
      } else {
        return false
      }
    })

    if (index < 0 && this.dataSource) {
      const idField = this.dataSource.getIdField()
      const orderByFieldInfos = this.getQueryParamsFromDataSource()?.orderByFields

      if (orderByFieldInfos && orderByFieldInfos?.length > 0) {
        // get index for current data if the orderby field was provided
        let count = 0
        const record: any = await this.dataSource.queryById(objectId)
        let cumuWhere = ' '
        if (record?.feature) {
          for (let i = 0; i < orderByFieldInfos.length; i++) {
            const orderByFieldInfo = orderByFieldInfos[i]
            const orderBy = orderByFieldInfo?.split(' ')
            const orderByField = orderBy[0]
            const isOrderByDESC = orderBy[1] && orderBy[1].indexOf('DESC') === 0

            // append object id field if it isn't in the order by fields list.
            const nextOrderByFieldInfo = orderByFieldInfos[i + 1] || idField
            const nextOrderBy = nextOrderByFieldInfo?.split(' ')
            const nextOrderByField = nextOrderBy[0]
            const nextIsOrderByDESC = nextOrderBy[1] && nextOrderBy[1].indexOf('DESC') === 0

            if (i === 0) {
              // base count where: 1stOrderByField < value
              const baseCountWhere = isOrderByDESC ? `${orderByField} > '${record.feature.attributes[orderByField]}'` : `${orderByField} < '${record.feature.attributes[orderByField]}' or ${orderByField} is NULL`
              count += await this.dataSource.queryCount({ where: baseCountWhere } as QueryParams).then(result => result.count).catch(error => -1)
            }

            let operator
            if (nextIsOrderByDESC) {
              operator = nextOrderByField === idField ? '>=' : '>'
            } else {
              operator = nextOrderByField === idField ? '<=' : '<'
            }
            cumuWhere += `${orderByField} = '${record.feature.attributes[orderByField]}' and `
            // second count where: 1stOrderByField = valuel and 2ndOrderField = value and .... and lastOrderByfiled < value
            const secondPartCountWhere = nextIsOrderByDESC ? `${cumuWhere} ${nextOrderByField} ${operator} '${record.feature.attributes[nextOrderByField]}'` : `${cumuWhere} ${nextOrderByField} ${operator} '${record.feature.attributes[nextOrderByField]}' or ${nextOrderByField} is NULL`
            count += await this.dataSource.queryCount({ where: secondPartCountWhere } as QueryParams).then(result => result.count).catch(error => -1)
            // data source make sure there is idField in the order by
            if (nextOrderByField === idField) {
              index = count - 1
              break
            }
          }
        }
      } else {
        index = await this.dataSource.queryCount({ where: `${idField}<=${objectId}` } as QueryParams).then(result => {
          index = result.count - 1
          return index
        })
      }
    }
    return Promise.resolve(index)
  }

  clearData () {
    this.dataBuffer.count = null
    this.dataBuffer.dataMap = {}
    // this.dataBuffer.dataObjectIds = [];
  }

  isEmptyData () {
    return this.dataBuffer.count === null
  }

  getLayerObject (dataSource) {
    if (dataSource.layer) {
      return dataSource.layer.load().then(() => {
        return Promise.resolve(dataSource.layer)
      })
    } else {
      return dataSource.createJSAPILayerByDataSource().then((layerObject) => {
        return layerObject.load().then(() => {
          return Promise.resolve(layerObject)
        })
      })
    }
  }

  async queryGraphics (dataSource, sqlExprObj, indexParam, num, realCount) {
    let index = indexParam
    let start
    this.onDataSourceStatusChanged(this.props.dsConfigId, DataSourceStatus.Loading, this.dataSource?.getLabel())
    let layerObject
    return this.getLayerObject(dataSource).then(async layer => {
      layerObject = layer
      if (this.isEmptyData()) {
        this.initData(realCount)
      }
      if (this.isFirstLoad) {
        const selectedRecordId = dataSource.getSelectedRecordIds()[0]
        if (selectedRecordId !== undefined) {
          await this.getDataIndexByObjectId(selectedRecordId).then((_index) => {
            index = (_index === -1) ? 0 : _index
          })
        }
      }
    }).then(() => {
      start = Math.floor(index / this.dataBuffer.pagingNum) * this.dataBuffer.pagingNum
      const query = {
        // where: where,
        outFields: ['*'],
        notAddFieldsToClient: true,
        returnGeometry: true,
        page: Math.floor(start / num) + 1,
        pageSize: num
      }

      return dataSource.query(query)
    }).then((queryResults) => {
      const records = queryResults.records
      // because the selection data source always use 'used fields', requery records from it's main data
      // source to get full fields.
      if (dataSource.isDataView && dataSource.dataViewId === CONSTANTS.SELECTION_DATA_VIEW_ID && records.length > 0) {
        const objectIds = records.map(record => record.feature.attributes[layerObject.objectIdField])
        const query = {
          objectIds,
          outFields: ['*'],
          notAddFieldsToClient: true,
          returnGeometry: true
        }
        return dataSource.getMainDataSource().query(query)
      } else {
        return queryResults
      }
    }).then((queryResults) => {
      const records = queryResults.records
      const queryWhere = this.getQueryParamsFromDataSource().where
      layerObject.definitionExpression = queryWhere
      const graphics = records.map(record => {
        record.feature.sourceLayer = layerObject.associatedLayer || layerObject
        record.feature.layer = layerObject.associatedLayer || layerObject
        return record.feature
      })
      const defaultPopupTemplate = layerObject.associatedLayer?.defaultPopupTemplate || layerObject.defaultPopupTemplate
      return {
        index: index,
        start: start,
        num: num,
        graphics: graphics,
        records: records,
        defaultPopupTemplate: defaultPopupTemplate?.clone() || { content: '' }
      }
    }).catch((e) => {
      console.warn(e)
      return {
        graphics: [],
        records: []
      }
    })
  }

  getOrderBy (dataSource, sqlExprObj) {
    const orderBy = []
    let result
    if (sqlExprObj && sqlExprObj.orderBy && sqlExprObj.orderBy.length > 0) {
      sqlExprObj.orderBy.forEach(sortData => {
        if (sortData.jimuFieldName) {
          orderBy.push(`${sortData.jimuFieldName} ${sortData.order}`)
        }
      })
      if (dataSource.type === DataSourceTypes.FeatureLayer) {
        result = orderBy.join(',')
      } else {
        result = orderBy
      }
    }
    return result
  }

  getQueryParamsFromDataSource (): FeatureLayerQueryParams {
    return this.dataSource?.getRealQueryParams({}, 'query')
  }

  async loadGraphics (dataSource, sqlExprObj) {
    this.onDataSourceStatusChanged(this.props.dsConfigId, DataSourceStatus.Loading)
    return await loadArcGISJSAPIModules([
      'esri/layers/FeatureLayer',
      'esri/rest/support/Query'
    ]).then(modules => {
      const [FeatureLayer, Query] = modules
      const query = new Query()
      let featureLayer = dataSource.layer
      const sqlExpr = sqlExprObj && sqlExprObj.where.sql
      let num
      query.where = sqlExpr || '1=1'
      // query.outSpatialReference = view.spatialReference;
      query.returnGeometry = false
      query.outFields = ['*']
      this.props.maxGraphics === 0 ? num = null : num = this.props.maxGraphics
      query.num = this.props.limitGraphics ? num : null

      if (!featureLayer && dataSource.url) {
        featureLayer = new FeatureLayer({
          url: dataSource.url
        })
      }
      if (featureLayer) {
        return featureLayer.queryFeatures(query).then((featureSet) => {
          return featureSet.features
        })
      } else {
        return []
      }
    }).catch((e) => {
      console.warn(e)
      return []
    })
  }

  onDataSourceCreated = (dataSource: QueriableDataSource): void => {
    this.dataSource = dataSource
    this.previousIndex = this.props.index
    this.isFirstLoad = true
    this.setState({
      dataSourceId: this.dataSource.id
    })
  }

  // eslint-disable-next-line
  onCreateDataSourceFailed = (error): void => {
    this.onDataSourceStatusChanged(this.props.dsConfigId, DataSourceStatus.CreateError)
  }

  onDataSourceInfoChange = (info: IMDataSourceInfo) => {
    if (!info) {
      return
    }

    if (info.status === DataSourceStatus.NotReady) {
      this.onDataSourceStatusChanged(this.props.dsConfigId, DataSourceStatus.NotReady, this.dataSource?.getLabel())
    }

    // handle filter change
    this.setState({
      dataSourceStatus: info.status,
      dataSourceWidgetQueries: info.widgetQueries,
      dataSourceQuerieWhere: this.getQueryParamsFromDataSource()?.where || '',
      dataSourceVersion: info.version
    })

    // handle selection change
    if (this.dataSource && this.dataSource.isDataView && this.dataSource.dataViewId === CONSTANTS.SELECTION_DATA_VIEW_ID) {
      const mainDS = this.dataSource.getMainDataSource()
      const selectedIdInMainDS = mainDS?.getSelectedRecordIds()
      if (selectedIdInMainDS && selectedIdInMainDS[0]) {
        this.props.onSelectedRecordIdChanged(this.props.dsConfigId, 0, this.dataSource.id)
      }
    } else {
      const selectedId = info.selectedIds && info.selectedIds[0]
      if (selectedId) {
        if (this.previousSelectedId !== selectedId) {
          this.previousSelectedId = selectedId
          this.getDataIndexByObjectId(selectedId).then(index => {
            if (index > -1 && index < this.dataBuffer.count) {
              this.props.onSelectedRecordIdChanged(this.props.dsConfigId, index, this.dataSource.id)
            }
          })
        }
      } else if (this.previousSelectedId) {
        this.previousSelectedId = null
        this.props.onUnselectedRecordIdChanged(this.dataSource.id)
      }
    }
  }

  render () {
    return (
      <DataSourceComponent
        useDataSource={this.props.useDataSource}
        query={{}}
        widgetId={this.props.widgetId}
        onDataSourceCreated={this.onDataSourceCreated}
        // onQueryStatusChange={this.onQueryStatusChange}
        onDataSourceInfoChange={this.onDataSourceInfoChange}
        onCreateDataSourceFailed={this.onCreateDataSourceFailed}
      />
    )
  }
}
