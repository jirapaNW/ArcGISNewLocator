/** @jsx jsx */
import { React, jsx, type AllWidgetProps, DataSourceComponent } from 'jimu-core'
import {
  type MapDataSource,
  DataSourceTypes,
  loadArcGISJSAPIModules,
  JimuMapViewComponent,
  type JimuMapView,
  MapViewManager
} from 'jimu-arcgis'
import { WidgetPlaceholder, Popper, defaultMessages as jimuDefaultMessages } from 'jimu-ui'
import { type IMConfig } from '../config'
import { getStyle } from './lib/style'
import type Action from './actions/action'
import Goto from './actions/goto'
import Label from './actions/label'
import Opacity from './actions/opacity'
import Information from './actions/information'
import defaultMessages from './translations/default'
import layerListIcon from '../../icon.svg'
import { versionManager } from '../version-manager'
import OptionAction from './actions/option-action'
import { type ReactNode } from 'react'
import MapLayersActionList from './components/map-layers-action-list'

const allDefaultMessages = Object.assign({}, defaultMessages, jimuDefaultMessages)

export enum LoadStatus {
  Pending = 'Pending',
  Fulfilled = 'Fulfilled',
  Rejected = 'Rejected',
}

export interface WidgetProps extends AllWidgetProps<IMConfig> {}

export interface WidgetState {
  mapViewWidgetId: string
  jimuMapViewId: string
  mapDataSourceId: string
  loadStatus: LoadStatus
  isPopperOpen: boolean
  refDOM: HTMLElement
  mapLayersDataActionListDOM: ReactNode
  popperKey: number
}

export class Widget extends React.PureComponent<
WidgetProps,
WidgetState
> {
  public viewFromMapWidget: __esri.MapView | __esri.SceneView
  private dataSource: MapDataSource
  private mapView: __esri.MapView
  private sceneView: __esri.SceneView
  private MapView: typeof __esri.MapView
  private SceneView: typeof __esri.SceneView
  public layerList: __esri.LayerList
  private LayerList: typeof __esri.LayerList
  private layerListActions: Action[]
  private renderPromise: Promise<void>
  private currentUseMapWidgetId: string
  private currentUseDataSourceId: string
  private jimuMapView: JimuMapView

  static versionManager = versionManager

  public refs: {
    mapContainer: HTMLInputElement
    layerListContainer: HTMLInputElement
  }

  constructor (props) {
    super(props)
    this.state = {
      mapViewWidgetId: null,
      mapDataSourceId: null,
      jimuMapViewId: null,
      loadStatus: LoadStatus.Pending,
      isPopperOpen: false,
      refDOM: null,
      mapLayersDataActionListDOM: null,
      popperKey: Math.random()
    }
    this.renderPromise = Promise.resolve()
    this.registerLayerListActions()
  }

  private translate (stringId: string) {
    return this.props.intl.formatMessage({
      id: stringId,
      defaultMessage: allDefaultMessages[stringId]
    })
  }

  async componentDidMount () {
    this.bindClickHandler()
  }

  componentDidUpdate (prevProps: WidgetProps, prevState: WidgetState) {
    if (this.needToPreventRefreshList(prevProps, prevState)) {
      return
    }

    // Close the popper when dataAction toggled OR config changed
    // This could keep the action list's state to the latest
    if (this.props.enableDataAction !== prevProps.enableDataAction || this.props.config !== prevProps.config) {
      this.setState({ refDOM: null, isPopperOpen: false })
    }

    this.bindClickHandler()

    this.updateRenderer()
  }

  bindClickHandler () {
    if (this.refs.layerListContainer && !this.refs.layerListContainer.onclick) {
      this.refs.layerListContainer.onclick = (e) => {
        const target = e.target as HTMLElement
        // Only manipulate the fake action
        if (target.nodeName === 'CALCITE-ACTION' && target.title === this.translate('options')) {
          if (this.state.refDOM !== target) {
            // The popper here is kept mounted, this results in re-render the popper's content
            // instead of creating a new popper component, which causes overlap problem.
            // Give the popper a random key so it will force the popper to re-calculate the position again.
            this.setState({ refDOM: target, isPopperOpen: true, popperKey: Math.random() })
          } else {
            this.setState({ isPopperOpen: !this.state.isPopperOpen })
          }
        }
      }
    }
  }

  updateRenderer () {
    if (this.props.config.useMapWidget) {
      if (this.state.mapViewWidgetId === this.currentUseMapWidgetId) {
        this.syncRenderer(this.renderPromise)
      }
    } else {
      if (this.state.mapDataSourceId === this.currentUseDataSourceId) {
        this.syncRenderer(this.renderPromise)
      }
    }
  }

  needToPreventRefreshList (prevProps: WidgetProps, prevState: WidgetState) {
    if (prevState.isPopperOpen !== this.state.isPopperOpen || prevState.refDOM !== this.state.refDOM) {
      return true
    }
    if (prevState.mapLayersDataActionListDOM !== this.state.mapLayersDataActionListDOM) {
      return true
    }
    return false
  }

  async createView () {
    if (this.props.config.useMapWidget) {
      return await Promise.resolve(this.viewFromMapWidget)
    } else {
      return await this.createViewByDataSource()
    }
  }

  async createViewByDataSource () {
    return await this.loadViewModules(this.dataSource).then(async () => {
      if (this.dataSource.type === DataSourceTypes.WebMap) {
        return await new Promise((resolve, reject) => { this.createWebMapView(this.MapView, resolve, reject) }
        )
      } else if (this.dataSource.type === DataSourceTypes.WebScene) {
        return new Promise((resolve, reject) => { this.createSceneView(this.SceneView, resolve, reject) }
        )
      } else {
        return Promise.reject()
      }
    })
  }

  createWebMapView (MapView, resolve, reject) {
    if (this.mapView) {
      this.mapView.map = this.dataSource.map
    } else {
      const mapViewOption: __esri.MapViewProperties = {
        map: this.dataSource.map,
        container: this.refs.mapContainer
      }
      this.mapView = new MapView(mapViewOption)
    }
    this.mapView.when(
      () => {
        resolve(this.mapView)
      },
      (error) => reject(error)
    )
  }

  createSceneView (SceneView, resolve, reject) {
    if (this.sceneView) {
      this.sceneView.map = this.dataSource.map
    } else {
      const mapViewOption: __esri.SceneViewProperties = {
        map: this.dataSource.map,
        container: this.refs.mapContainer
      }
      this.sceneView = new this.SceneView(mapViewOption)
    }

    this.sceneView.when(
      () => {
        resolve(this.sceneView)
      },
      (error) => reject(error)
    )
  }

  destroyView () {
    this.mapView && !this.mapView.destroyed && this.mapView.destroy()
    this.sceneView && !this.sceneView.destroyed && this.sceneView.destroy()
  }

  async loadViewModules (
    dataSource: MapDataSource
  ): Promise<typeof __esri.MapView | typeof __esri.SceneView> {
    if (dataSource.type === DataSourceTypes.WebMap) {
      if (this.MapView) {
        return await Promise.resolve(this.MapView)
      }
      return await loadArcGISJSAPIModules(['esri/views/MapView']).then(
        (modules) => {
          [this.MapView] = modules
          return this.MapView
        }
      )
    } else if (dataSource.type === DataSourceTypes.WebScene) {
      if (this.SceneView) {
        return Promise.resolve(this.SceneView)
      }
      return loadArcGISJSAPIModules(['esri/views/SceneView']).then(
        (modules) => {
          [this.SceneView] = modules
          return this.SceneView
        }
      )
    } else {
      return Promise.reject()
    }
  }

  destroyLayerList () {
    this.layerList && !this.layerList.destroyed && this.layerList.destroy()
  }

  componentWillUnmount () {
  }

  createLayerList (view) {
    let layerListModulePromise
    if (this.LayerList) {
      layerListModulePromise = Promise.resolve()
    } else {
      layerListModulePromise = loadArcGISJSAPIModules([
        'esri/widgets/LayerList'
      ]).then((modules) => {
        [this.LayerList] = modules
      })
    }
    return layerListModulePromise.then(() => {
      const container = document && document.createElement('div')
      container.className = 'jimu-widget'
      this.refs.layerListContainer.appendChild(container)

      this.destroyLayerList()

      let option: __esri.LayerListProperties = {
        view: view,
        listItemCreatedFunction: this.defineLayerListActions,
        container: container
      }
      if (this.props.config.useMapWidget) {
        option = {
          ...option,
          dragEnabled: this.props.config?.reorderLayers ?? false,
          visibilityAppearance: this.props.config?.useTickBoxes ? 'checkbox' : 'default',
          minFilterItems: 1,
          visibleElements: {
            filter: this.props.config?.searchLayers ?? false
          }
        } as any
      }

      this.layerList = new this.LayerList(option)

      this.layerList.on('trigger-action', (event) => {
        this.onLayerListActionsTriggered(event)
      })
    })
  }

  registerLayerListActions () {
    this.layerListActions = [
      new Goto(
        this,
        this.translate('goto')
      ),
      new Label(
        this,
        this.translate('showLabels'),
        this.translate('hideLabels')
      ),
      new Opacity(
        this,
        this.translate('increaseTransparency'),
        false
      ),
      new Opacity(
        this,
        this.translate('decreaseTransparency'),
        true
      ),
      new Information(
        this,
        this.translate('information')
      ),
      new OptionAction(
        this,
        this.translate('options')
      )
    ]
  }

  defineLayerListActions = async (event) => {
    const listItem = event.item
    let actionGroups = {}
    listItem.actionsSections = []

    if (this.props.config?.useMapWidget && this.props.config?.enableLegend && listItem.layer.legendEnabled) {
      listItem.panel = {
        content: 'legend',
        open: listItem.layer.visible && this.props.config?.showAllLegend
      }
    }

    // After this block, all native actions AND option-action are stored in the actionGroups
    this.layerListActions.forEach((actionObj) => {
      if (actionObj.isValid(listItem)) {
        let actionGroup = actionGroups[actionObj.group]
        if (!actionGroup) {
          actionGroup = []
          actionGroups[actionObj.group] = actionGroup
        }

        actionGroup.push({
          id: actionObj.id,
          title: actionObj.title,
          className: actionObj.className
        })
      }
    })

    // When disable data-action, stay untouched
    // Otherwise, show up the custom popper
    const dataActionEnabled = this.props.enableDataAction ?? true
    const OPTION_ACTION_INDEX = 100

    // Extract the option-action for the minus 1
    const nativeActionCount = Object.keys(actionGroups).length - 1

    // Delete the fake option when: data-action disabled & Less than 1 native action
    // Otherwise, we go the fake option action way
    if (!dataActionEnabled && nativeActionCount <= 1) {
      delete actionGroups[OPTION_ACTION_INDEX]
    } else {
      actionGroups = { OPTION_ACTION_INDEX: actionGroups[OPTION_ACTION_INDEX] }
    }

    const customizeLayerOptions = this.props?.config?.customizeLayerOptions?.[this.state.jimuMapViewId]
    if (customizeLayerOptions && customizeLayerOptions.isEnabled) {
      const hiddenLayerSet = new Set(customizeLayerOptions?.hiddenJimuLayerViewIds)
      const currentJimuLayerViewId = this.jimuMapView.getJimuLayerViewIdByAPILayer(listItem.layer)
      if (hiddenLayerSet.has(currentJimuLayerViewId)) {
        listItem.hidden = true
      }
    }

    Object.entries(actionGroups)
      .sort((v1, v2) => Number(v1[0]) - Number(v2[0]))
      .forEach(([key, value]) => {
        listItem.actionsSections.push(value)
      })
  }

  onActionListItemClick () {
    // Let the action popper find the reference DOM node
    setTimeout(() => {
      this.setState({ isPopperOpen: false })
    }, 100)
  }

  onLayerListActionsTriggered = (event) => {
    const action = event.action
    const listItem = event.item
    const actionObj = this.layerListActions.find(
      (actionObj) => actionObj.id === action.id
    )

    if (actionObj.id === 'option-action') {
      // Popup the window when click option-action
      const supportedActionObjects = this.layerListActions.filter((actionObj) => {
        return actionObj.isValid(listItem) && actionObj.id !== 'option-action'
      })

      const shouldHideEmptyList = supportedActionObjects.length > 0
      const enableDataAction = this.props.enableDataAction ?? true

      const mapLayersDsActionList = <MapLayersActionList
        widgetId={this.props.id}
        jimuMapView={this.jimuMapView}
        actionObjects={supportedActionObjects}
        listItem={listItem} onActionListItemClick={() => { this.onActionListItemClick() }}
        enableDataAction={enableDataAction}
        shouldHideEmptyList={shouldHideEmptyList}>
      </MapLayersActionList>

      this.setState({ mapLayersDataActionListDOM: mapLayersDsActionList })
    } else {
      // A native action
      actionObj.execute(listItem)
    }
  }

  async renderLayerList () {
    await this.createView()
      .then((view) => {
        return this.createLayerList(view)
      })
      .then(() => {
        this.setState({
          loadStatus: LoadStatus.Fulfilled
        })
      })
      .catch((error) => { console.error(error) })
  }

  syncRenderer (preRenderPromise) {
    this.jimuMapView = MapViewManager.getInstance().getJimuMapViewById(this.state.jimuMapViewId)

    this.renderPromise = new Promise((resolve, reject) => {
      preRenderPromise.then(() => {
        this.renderLayerList()
          .then(() => {
            resolve(null)
          })
          .catch(() => { reject() })
      })
    })
  }

  onActiveViewChange = (jimuMapView: JimuMapView) => {
    const useMapWidget =
      this.props.useMapWidgetIds && this.props.useMapWidgetIds[0]
    if ((jimuMapView && jimuMapView.view) || !useMapWidget) {
      this.viewFromMapWidget = jimuMapView && jimuMapView.view
      this.setState({
        mapViewWidgetId: useMapWidget,
        jimuMapViewId: jimuMapView.id,
        loadStatus: LoadStatus.Pending
      })
    } else {
      this.destroyLayerList()
    }
  }

  onDataSourceCreated = (dataSource: MapDataSource): void => {
    this.dataSource = dataSource
    this.setState({
      mapDataSourceId: dataSource.id,
      loadStatus: LoadStatus.Pending
    })
  }

  // eslint-disable-next-line
  onCreateDataSourceFailed = (error): void => {};

  render () {
    const useMapWidget =
      this.props.useMapWidgetIds && this.props.useMapWidgetIds[0]
    const useDataSource =
      this.props.useDataSources && this.props.useDataSources[0]

    this.currentUseMapWidgetId = useMapWidget
    this.currentUseDataSourceId = useDataSource && useDataSource.dataSourceId

    let dataSourceContent = null
    if (this.props.config.useMapWidget) {
      dataSourceContent = (
        <JimuMapViewComponent
          useMapWidgetId={this.props.useMapWidgetIds?.[0]}
          onActiveViewChange={this.onActiveViewChange}
        />
      )
    } else if (useDataSource) {
      dataSourceContent = (
        <DataSourceComponent
          useDataSource={useDataSource}
          onDataSourceCreated={this.onDataSourceCreated}
          onCreateDataSourceFailed={this.onCreateDataSourceFailed}
        />
      )
    }

    let content = null
    if (this.props.config.useMapWidget ? !useMapWidget : !useDataSource) {
      this.destroyLayerList()
      content = (
        <div className="widget-layerlist">
          <WidgetPlaceholder
            icon={layerListIcon}
            message={this.translate('_widgetLabel')}
            widgetId={this.props.id}
          />
        </div>
      )
    } else {
      let loadingContent = null
      if (this.state.loadStatus === LoadStatus.Pending) {
        loadingContent = <div className="jimu-secondary-loading" />
      }

      content = (
        <div className={`widget-layerlist widget-layerlist_${this.props.id}`}>
          {loadingContent}
          <div ref="layerListContainer" />
          <div style={{ position: 'absolute', opacity: 0 }} ref="mapContainer">
            mapContainer
          </div>
          <div style={{ position: 'absolute', display: 'none' }}>
            {dataSourceContent}
          </div>
        </div>
      )
    }

    return (
      <div
        css={getStyle(this.props.theme, this.props.config)}
        className="jimu-widget"
      >
        {content}
        {
          <Popper keepMount key={this.state.popperKey} reference={this.state.refDOM} open={this.state.isPopperOpen} toggle={() => { this.setState({ isPopperOpen: false }) }}>
            {this.state.mapLayersDataActionListDOM}
          </Popper>
        }
      </div>
    )
  }
}

export default Widget