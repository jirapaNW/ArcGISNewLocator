/** @jsx jsx */ // <-- make sure to include the jsx pragma
import { React, jsx, type IntlShape, type IMThemeVariables, type DataRecord, DataActionManager, DataLevel, type DataRecordSet, type DataAction, classNames } from 'jimu-core'
import { Row, Button, Label, Icon } from 'jimu-ui'
import defaultMessages from '../translations/default'
import { type JimuMapView } from 'jimu-arcgis'
import { type IMConfig } from '../../config'
import { Collapse } from 'reactstrap/lib'
import { RightOutlined } from 'jimu-icons/outlined/directional/right'
import { getFeaturesSetStyles } from '../lib/style'
import { DownOutlined } from 'jimu-icons/outlined/directional/down'
import type GraphicsLayer from 'esri/layers/GraphicsLayer'
import Feature from 'esri/widgets/Feature'
import { createSymbol, getDisplayLabel, getSelectedLayerInstance } from '../../common/utils'
import type Graphic from 'esri/Graphic'
import reactiveUtils from 'esri/core/reactiveUtils'
const planRoute = require('.././assets/icons/directions-from.svg')

interface Props {
  intl: IntlShape
  widgetId: string
  index: string
  theme: IMThemeVariables
  config: IMConfig
  popupTitleField: string
  jimuMapView: JimuMapView
  selectedRecord: DataRecord
  selectedFeatureLength: number
  ifOneAnalysisResult: boolean
  distanceUnit: string
  showPlanRoute: boolean
  isExpanded: boolean
  expandOnOpen: boolean
  approximateDistanceUI?: boolean
  showDistFromInputLocation: boolean
  isGroup: boolean
  graphicLayer?: GraphicsLayer
  children?: React.ReactNode
  displayMapSymbol: boolean
  selectedLayerDsId: string
  startingPointGraphic: Graphic
  selectRecord?: (index: string, popupContainer: HTMLDivElement, record: DataRecord) => void
  clearRecord?: (index: string) => void
  highlightFeature?: (featureRecord: DataRecord, showHighlight: boolean) => void
}
interface State {
  isFeatureLayerOpen: boolean
  isIconRight: boolean
  title: string
  isTitleLoaded: boolean
  featureItem: JSX.Element
}

export default class FeaturesSet extends React.PureComponent<Props, State> {
  public popUpContent: React.RefObject<HTMLDivElement>
  public readonly symbolRef: React.RefObject<HTMLDivElement>
  protected planRouteContainer: React.RefObject<HTMLDivElement>
  protected planRouteSubContainer: React.RefObject<HTMLDivElement>
  public planRouteAction: DataAction
  public dataSet: DataRecordSet[]
  constructor (props) {
    super(props)
    this.popUpContent = React.createRef()
    this.symbolRef = React.createRef()
    this.planRouteContainer = React.createRef()
    this.planRouteSubContainer = React.createRef()
    this.planRouteAction = null
    this.dataSet = []

    if (this.props.config) {
      this.state = {
        isFeatureLayerOpen: this.props.isExpanded,
        isIconRight: !this.props.isExpanded,
        title: '',
        isTitleLoaded: false,
        featureItem: null
      }
    }
  }

  nls = (id: string) => {
    const messages = Object.assign({}, defaultMessages)
    //for unit testing no need to mock intl we can directly use default en msg
    if (this.props.intl?.formatMessage) {
      return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] })
    } else {
      return messages[id]
    }
  }

  componentDidMount = async () => {
    if (this.props.showPlanRoute) {
      await this.getPlanRouteAction()
    }
    //for closest and proximity with expanded list
    //if only one analysis result is returned with only one feature then zoom to feature automatically
    if (!this.props.popupTitleField || (this.props.popupTitleField && this.props.isExpanded)) {
      this.createFeatureItem(this.props.ifOneAnalysisResult && this.props.expandOnOpen, this.props.displayMapSymbol)
    } else if (this.props.ifOneAnalysisResult && this.props.popupTitleField && this.props.expandOnOpen) {
      this.onToggleSelectedLayer()
    }
    if (this.props.displayMapSymbol) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      createSymbol(this.props.selectedRecord, this.symbolRef)
    }
  }

  componentDidUpdate = (prevProps) => {
    // also create symbol if layer is changed
    if (prevProps.selectedRecord !== this.props.selectedRecord && this.props.displayMapSymbol) {
      createSymbol(this.props.selectedRecord, this.symbolRef)
    }
  }

  /**
   * Get the Plan route action only when the Plan Route action or direction widget configured
   */
  getPlanRouteAction = async () => {
    const featureRecord = this.props.selectedRecord as any
    const selectedDataSource = getSelectedLayerInstance(this.props.selectedLayerDsId) as any
    //if starting point and selected feature graphic geometry is point then only show the Plan Route action in the data action list
    const startingPointRecord = this.props.startingPointGraphic ? selectedDataSource.buildRecord(this.props.startingPointGraphic) : null
    const actionRecords = featureRecord.feature?.geometry?.type === 'point' && startingPointRecord
      ? [startingPointRecord, this.props.selectedRecord]
      : [this.props.selectedRecord]
    this.dataSet = [{
      dataSource: selectedDataSource,
      records: actionRecords,
      type: 'selected',
      name: selectedDataSource.getLabel()
    }]
    const actions = await DataActionManager.getInstance().getSupportedActions(this.props.widgetId, this.dataSet, DataLevel.Records)
    if (actions.PlanRoute?.length > 0) {
      this.planRouteAction = actions.PlanRoute[0]
    }
  }

  /**
   * Create the feature module using feature record
   */
  createFeature = () => {
    const featureRecord = this.props.selectedRecord as any
    if (featureRecord?.feature) {
      const container = document && document.createElement('div')
      container.className = 'jimu-widget bg-transparent pointer'
      this.popUpContent.current.appendChild(container)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const featureWidget = new Feature({
        container: container,
        graphic: featureRecord.feature,
        map: this.props.jimuMapView.view.map,
        spatialReference: this.props.jimuMapView.view.spatialReference,
        defaultPopupTemplateEnabled: !featureRecord.feature.layer.popupTemplate
      })
      //to resolve the Plan route button's alignment issue:
      //update the styles of the button's DOM if the feature popup title is present
      reactiveUtils.watch(() => featureWidget.viewModel.title, (title) => {
        //update the Plan route button's parent div style only if the Plan route action is supported and feature popup title is present
        if (this.props.showPlanRoute && this.planRouteAction && this.planRouteContainer.current) {
          if (title !== '') {
            this.planRouteContainer.current.style.height = 'auto'
            this.planRouteContainer.current.style.width = 'auto'
            this.planRouteContainer.current.style.padding = '0'
            //update the Plan route button's parent sub div padding only in case of closest feature and approximate distance is disabled
            //Also if proximity is not expanded
            if ((this.props.selectedFeatureLength === 1 && !this.props.popupTitleField && !this.props.showDistFromInputLocation) ||
               !this.props.isExpanded) {
              this.planRouteSubContainer.current.style.padding = '0px 0px 0px 0px'
            }
          }
        }
      })
    }
  }

  /**
   * Get the popup title for aria-label
   * @returns string popup title for aria-label
   */
  displayPopupTitle = (): string => {
    let popupTitle = ''
    if (this.props.selectedRecord) {
      popupTitle = this.props.selectedRecord.getFormattedFieldValue(this.props.popupTitleField, this.props.intl)
    }
    return getDisplayLabel(popupTitle, this.nls('noValueForDisplayField'))
  }

  /**
   * On toggle the layer the feature details section will show or collapse
   */
  onToggleSelectedLayer = () => {
    if (!this.props.isExpanded) {
      this.setState({
        isFeatureLayerOpen: !this.state.isFeatureLayerOpen,
        isIconRight: !this.state.isIconRight
      }, () => {
        if (this.state.isFeatureLayerOpen && !this.state.featureItem) {
          this.createFeatureItem(true)
        } else {
          this.onFeatureDetailsClick()
        }
      })
    }
  }

  /**
   * On feature details click highlight the feature or flash it on the map
   */
  onFeatureDetailsClick = () => {
    const featureRecord = this.props.selectedRecord as any
    if (featureRecord) {
      if (featureRecord.getFeature().geometry) {
        this.selectOrClearRecord()
      } else {
        featureRecord._dataSource.queryById(this.props.selectedRecord.getId()).then((fetchedRecord) => {
          this.selectOrClearRecord(fetchedRecord)
        })
      }
    }
  }

  /**
   * Select or clear the record based on if it is already selected and if details are open
   */
  selectOrClearRecord = (fetchedRecord?: DataRecord) => {
    if (!this.popUpContent?.current?.classList.contains('record-selected') && this.state.isFeatureLayerOpen) {
      this.props.selectRecord(this.props.index, this.popUpContent.current, fetchedRecord ?? this.props.selectedRecord)
    } else {
      this.props.clearRecord(this.props.index)
    }
  }

  /**
   * Display the directions from incident to resultant point feature
   * @param e click event
   */
  onPlanRouteClick = async (e) => {
    e.stopPropagation()
    try {
      await DataActionManager.getInstance().executeDataAction(this.planRouteAction, this.dataSet, DataLevel.Records, this.props.widgetId)
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * On expand list create each feature item with its approximate distance and feature details
   * @param boolean flag to call featuresDetails click once the item is created
   */
  createFeatureItem = (callFeatureDetailsClick: boolean, displayMapSymbol?: boolean) => {
    const featureRecord = this.props.selectedRecord as any
    let individualFeatureItem: JSX.Element = null
    const formattedDistance = this.props.intl.formatNumber(featureRecord.feature.distance, { maximumFractionDigits: 2 })
    //Show the Display field value instead of the Approximate distance string in case expand feature details
    const title = this.props.popupTitleField && this.props.isExpanded ? this.displayPopupTitle() : this.nls('approximateDistance')
    const displayFeatureTitle = this.props.approximateDistanceUI && (this.props.showDistFromInputLocation || this.props.popupTitleField)
    individualFeatureItem = (
      <div>
        {/* show approximateDistanceUI - closet, proximity with expanded list */}
        {(displayMapSymbol || (displayFeatureTitle && this.props.isExpanded)) &&
          <div className='approximateDist-container border-bottom'>
            {displayMapSymbol && <div className='feature-title-map-symbol' ref={this.symbolRef}></div>}
            {displayFeatureTitle &&
              <div className='approximateDist-label'>
                <Label className='mb-0'>
                  {title}
                </Label>
              </div>}
            {this.props.showDistFromInputLocation && this.props.approximateDistanceUI &&
              <Label tabIndex={-1} className='approximateDist mb-0 pt-0 font-weight-bold'>
                <div tabIndex={0} aria-label={this.getAriaLabelString(this.nls('approximateDistance'), formattedDistance, this.props.distanceUnit)}>
                  {this.getLabelForDistUnit(formattedDistance, this.props.distanceUnit)}
                </div>
              </Label>
            }
          </div>
        }
        {this.props.showPlanRoute && this.planRouteAction &&
          <div ref={this.planRouteContainer} className='plan-route'>
            <div ref={this.planRouteSubContainer} className={classNames('float-right pr-1 plan-route-sub')}>
              <Button tabIndex={0} type='tertiary' className='p-0' title={this.nls('route')} aria-label={this.nls('route')} icon onClick={this.onPlanRouteClick.bind(this)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    this.onPlanRouteClick(e)
                  }
                }}>
                <Icon size={'m'} icon={planRoute} />
              </Button>
            </div>
          </div>
        }
        <div tabIndex={0} className='mt-2 pb-2 pointer record-container' ref={this.popUpContent} onClick={this.onFeatureDetailsClick.bind(this)} />
      </div>
    )
    this.setState({
      featureItem: individualFeatureItem
    }, () => {
      this.createFeature()
      //when creating the featureItem first time and if callFeatureDetailsClick is true call onFeatureDetailsClick after creation of the item
      if (callFeatureDetailsClick) {
        this.onFeatureDetailsClick()
      }
    })
  }

  /**
   * Get the string for aria label
   * @param approximateDistanceLabel approximateDistance Label
   * @param formattedDistance  formatted Distance
   * @param distanceUnit  distance Unit
   * @returns aria label string
   */
  getAriaLabelString = (approximateDistanceLabel: string, formattedDistance: string, distanceUnit: string): string => {
    let getAriaLabel = ''
    getAriaLabel = this.props.intl.formatMessage({
      id: 'ariaLabelString', defaultMessage: defaultMessages.ariaLabelString
    }, { label: approximateDistanceLabel, formattedDist: formattedDistance, distUnit: distanceUnit })
    return getAriaLabel
  }

  /**
   * Get label for distance and unit
   * @param formattedDistance formatted Distance
   * @param distanceUnit distance Unit
   * @returns distance unit label
   */
  getLabelForDistUnit = (formattedDistance: string, distanceUnit: string): string => {
    let getLabelForDistanceUnit = ''
    getLabelForDistanceUnit = this.props.intl.formatMessage({
      id: 'distanceUnitLabel', defaultMessage: defaultMessages.distanceUnitLabel
    }, { distanceLabel: formattedDistance, unitLabel: distanceUnit })
    return getLabelForDistanceUnit
  }

  render () {
    const featureRecord = this.props.selectedRecord as any
    const displayPopupTitle = this.displayPopupTitle()
    let featureTitleAriaLabel = displayPopupTitle
    let formattedDistance: string
    if (featureRecord.feature.distance !== undefined) {
      formattedDistance = this.props.intl.formatNumber(featureRecord.feature.distance, { maximumFractionDigits: 2 })
      featureTitleAriaLabel = this.getAriaLabelString(featureTitleAriaLabel, formattedDistance, this.props.distanceUnit)
    }
    const featuresSetStyles = getFeaturesSetStyles(this.props.theme)
    return (
      <div className='feature-container border-top w-100 m-0' css={featuresSetStyles}>
        {/* proximity without expanded list */}
        {this.props.selectedFeatureLength > 0 && this.props.popupTitleField && !this.props.isExpanded &&
          <React.Fragment>
            <Row flow='wrap'>
              <div className={!this.props.approximateDistanceUI && this.state.isFeatureLayerOpen ? 'feature-title-container border-bottom' : 'feature-title-container'} onClick={this.onToggleSelectedLayer.bind(this)}
                tabIndex={0} role={'button'} aria-label={featureTitleAriaLabel} onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    if (!this.props.isExpanded) {
                      this.onToggleSelectedLayer()
                    }
                  }
                }} onMouseOver={() => { this.props.highlightFeature(featureRecord, true) }}
                onMouseLeave={() => { this.props.highlightFeature(featureRecord, false) }}>
                <div className='d-inline-flex'>
                  {this.props.displayMapSymbol && <div className='feature-title-map-symbol' ref={this.symbolRef}></div>}
                  <div className='feature-title'>
                    <Label className={this.props.isExpanded ? 'label-title expand-list-label-title' : 'label-title'}>
                      {displayPopupTitle}
                    </Label>
                  </div>
                </div>
                <div className='d-inline-flex'>
                  {(featureRecord.feature.distance !== undefined && this.props.showDistFromInputLocation) &&
                    <Label className='approximateDist pr-1'>
                      {this.getLabelForDistUnit(formattedDistance, this.props.distanceUnit)}
                    </Label>
                  }
                  <Button tabIndex={-1} type='tertiary' icon role={'button'} aria-expanded={this.state.isFeatureLayerOpen} className={'actionButton p-0'}>
                    { this.state.isIconRight && <RightOutlined size={'m'} autoFlip /> }
                    { !this.state.isIconRight && <DownOutlined size={'m'} /> }
                  </Button>
                </div>
              </div>
            </Row>

            <Collapse isOpen={this.state.isFeatureLayerOpen} className='w-100'>
              {this.state.featureItem}
            </Collapse>
          </React.Fragment>
        }

        {/* proximity with expanded list */}
        {this.props.popupTitleField && this.props.isExpanded &&
          this.state.featureItem
        }

        {/* Closest */}
        {this.props.selectedFeatureLength === 1 && !this.props.popupTitleField &&
          this.state.featureItem
        }
      </div>
    )
  }
}
