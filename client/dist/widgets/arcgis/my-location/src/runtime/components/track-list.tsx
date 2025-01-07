/** @jsx jsx */
import { React, css, injectIntl, jsx, type IMThemeVariables, type IntlShape } from 'jimu-core'
import { type TracksWithLine, type TrackLinePoint, type TrackPoint } from '../../config'
import { type POINT_FIELDS } from '../../constants'
import TrackListItem from './track-list-item'
import defaultMessages from '../translations/default'
interface ExtraProps {
  intl: IntlShape
}

type ResultType = TrackLinePoint[][] | TrackPoint[]

interface Props {
  selectedFields: POINT_FIELDS[]
  isLine: boolean
  tracks: ResultType
  theme: IMThemeVariables
  selectedIds: string []
  notFilterPointIds: number []
  tempTracksWithLine: TracksWithLine
  onHandleSelect: (track: TrackPoint | TrackLinePoint, handle: boolean) => void
  onHandleDelete: (track: TrackPoint | TrackLinePoint) => void
}

class TrackList extends React.PureComponent<Props & ExtraProps> {
  public refs: {
    featureContainer: HTMLInputElement
  }

  constructor (props) {
    super(props)
    this.state = {
    }
  }

  widgetStyle = css`
      width: 100%;
      height: 100%;
      overflow: auto;
      display:flex;
      flex-direction:column;
      margin:5px auto;
      .horizontal-line{
        position: relative;
        text-align: center; 
        margin: 8px 0;
      }
      .horizontal-line::before,
      .horizontal-line::after {
        content: "";
        display: block;
        width: 30%; 
        border-top: 1px solid ${this.props.theme.sys.color.divider.tertiary};
        position: absolute;
        top: 50%; 
      }
      .horizontal-line::before {
        left: 0; 
      }
      .horizontal-line::after {
        right: 0;
      }
      .text {
        color: var(--ref-palette-neutral-1200);
        display: inline-block; 
        padding: 0 10px; 
        position: relative;
        z-index: 1; 
      }
      .active{
        border: 1px solid var(--sys-color-primary-main);
      }
  `

  childTracks (tracks: TrackLinePoint[]) {
    return tracks.map(t => {
      if (!this.props.notFilterPointIds.includes(t.ObjectID)) {
        return null
      }
      return (<TrackListItem key={t.ObjectID} theme={this.props.theme} track={t} isLine={true} selectedFields={this.props.selectedFields} active={this.props.selectedIds?.includes(t.ObjectID.toString())} onHandleSelect={this.props.onHandleSelect} onHandleDelete={this.props.onHandleDelete} ></TrackListItem>)
    })
  }

  render () {
    const divideLabel = this.props.intl.formatMessage({ id: 'trackLineDivide', defaultMessage: defaultMessages.trackLineDivide })
    const trackContent = (this.props.tracks.map((t, index) => {
      if (this.props.isLine) {
        return (<div key={index} >{this.props.tracks.length > 1 && this.props.notFilterPointIds.length > 1 && !(this.props.tempTracksWithLine && index === 0) && <div className='horizontal-line'><span className='text'>{divideLabel} {this.props.tracks.length - index}</span></div>}{this.childTracks(t)}</div>)
      }
      if (!this.props.notFilterPointIds.includes(t.ObjectID)) {
        return null
      }
      return (< TrackListItem key={t.ObjectID} theme={this.props.theme} track={t} isLine={false} selectedFields={this.props.selectedFields} active={this.props.selectedIds?.includes(t.ObjectID.toString())} onHandleSelect={this.props.onHandleSelect} onHandleDelete={this.props.onHandleDelete} ></TrackListItem >)
    }))

    return (
      <div className='track-list-items' css={this.widgetStyle} >
          {trackContent}
      </div >
    )
  }
}
export default injectIntl(TrackList)
