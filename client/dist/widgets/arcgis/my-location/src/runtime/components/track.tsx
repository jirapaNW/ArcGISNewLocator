/** @jsx jsx */
import { type JimuMapView, MapViewManager, zoomToUtils } from 'jimu-arcgis'
import { React, css, jsx, type IntlShape, injectIntl, type IMThemeVariables, type DataSource } from 'jimu-core'
import { Button, Tooltip } from 'jimu-ui'
import { type TrackLinePoint, type TrackPoint } from '../../config'
import defaultMessages from '../translations/default'
import { VisibleOutlined } from 'jimu-icons/outlined/application/visible'
import { InvisibleOutlined } from 'jimu-icons/outlined/application/invisible'
import { InfoOutlined } from 'jimu-icons/outlined/suggested/info'
import { type GeolocationOptions } from '../utils/common/geolocate'
import TrackList from './track-list'
import { getPointGraphic } from '../data-source/utils'
interface ExtraProps {
  intl: IntlShape
}

interface Props {
  dataSourceId: string
  dataSource: DataSource
  selectedFields: string []
  geolocationOptions: GeolocationOptions
  scale: number
  tracks: TrackPoint []
  theme: IMThemeVariables
  loading: boolean
  highlightLocation: boolean
  jimuMapView: JimuMapView
  selectedIds: string[]
  notFilterPointIds: number[]
  onHandleDelete: (track: TrackPoint) => void
  handleHighlightVisible: (visible: boolean) => void
}

interface State {
  showFromMap: boolean
}

class TrackTab extends React.PureComponent<Props & ExtraProps, State> {
  trackLabel = this.props.intl.formatMessage({ id: 'trackLabel', defaultMessage: defaultMessages.trackLabel })
  mvManager: MapViewManager = MapViewManager.getInstance()

  public refs: {
    featureContainer: HTMLInputElement
  }

  constructor (props) {
    super(props)
    this.state = {
      showFromMap: true
    }
  }

  widgetStyle = css`
  flex: 1 1 auto;
  width:100%;
  display:flex;
  flex-direction:column;
  align-items: flex-start;
  overflow: auto;
  .track-head{
    height:26px;
    line-height: 26px;
    display:flex;
    align-items:center;
    justify-content: flex-start;
    .track-name{
      font-size:13px;
      font-weight:  var(--ref-typeface-font-weight-regular);
    }
    .visible-icon{
      height:16px;
      width:16px;
      margin-left: 5px;
      cursor: pointer;
    }
  }
`

  handleTrackLayer () {
    this.setState({ showFromMap: !this.state.showFromMap })
    this.props.handleHighlightVisible(!this.state.showFromMap)
    // show or hide layer
    if (this.props.dataSourceId) {
      if (this.props.jimuMapView) {
        const layerView = this.props.jimuMapView.getJimuLayerViewByDataSourceId(this.props.dataSourceId)
        if (layerView) {
          layerView.layer.visible = !this.state.showFromMap
        }
      }
    }
  }

  handleSelect = (track: TrackPoint | TrackLinePoint, handle: boolean) => {
    let selIds = []
    if (handle) {
      selIds = this.props.selectedIds.concat([track.ObjectID.toString()])
      let graphic = null
      graphic = getPointGraphic(track)
      if (graphic) {
        if (this.props.jimuMapView) {
          zoomToUtils.zoomTo(this.props.jimuMapView?.view, [graphic], {
            scale: this.props.scale ?? 50000,
            padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10
            }
          })
        }
      }
    } else {
      selIds = this.props.selectedIds.filter(m => m !== track.ObjectID.toString())
    }
    if (this.props.dataSource) {
      this.props.dataSource.selectRecordsByIds(selIds.map(m => m.toString()))
    }
  }

  render () {
    const visibleTitle = this.state.showFromMap ? this.props.intl.formatMessage({ id: 'hideOnMap', defaultMessage: defaultMessages.hideOnMap }) : this.props.intl.formatMessage({ id: 'showOnMap', defaultMessage: defaultMessages.showOnMap })
    return (
            <div className={'track-content'} css={this.widgetStyle}>
                <div className='track-head'>
                    <div className='track-name'>{this.trackLabel}</div>
                    <Tooltip title={visibleTitle} placement='bottom'>
                        <Button className='ml-auto' icon size='sm' type='tertiary' onClick={() => { this.handleTrackLayer() }} aria-label={visibleTitle}>
                            {this.state.showFromMap && <VisibleOutlined />}
                            {!this.state.showFromMap && <InvisibleOutlined />}
                        </Button>
                    </Tooltip>
                </div>

                {this.props.tracks.length > 0 && <TrackList theme={this.props.theme} tracks={this.props.tracks} isLine={false} selectedFields={this.props.selectedFields} onHandleSelect={this.handleSelect} onHandleDelete={this.props.onHandleDelete} selectedIds={this.props.selectedIds} notFilterPointIds={this.props.notFilterPointIds} />}
                {this.props.tracks.length === 0 && !this.props.loading && <div className='empty-content'>
                  <InfoOutlined className='info-icon' size={24} color={this.props.theme.sys.color.surface.paperHint} />
                      <div className='info-txt'>{this.props.intl.formatMessage({ id: 'emptyStateText', defaultMessage: defaultMessages.emptyStateText })}</div>
                    </div>
                }

            </div >
    )
  }
}
export default injectIntl(TrackTab)
