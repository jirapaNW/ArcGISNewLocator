/** @jsx jsx */
import { React, css, jsx, loadArcGISJSAPIModule } from 'jimu-core'
import indicator3dIcon from '../assets/indicator-3d.svg'
import { SVG } from 'jimu-ui'
import { basemapUtils } from 'jimu-arcgis'

interface Props {
  basemapItem: basemapUtils.BasemapItem
  style?: React.CSSProperties
}

const containerStyle = css`
  position: absolute;
  width: 14px;
  height: 10px;
  padding: 1px;
  border-radius: 2px;
  font-size: 0;
  background: rgba(0, 0, 0, 0.7)
`

const Indicator3d = (props: Props) => {
  const { style, basemapItem } = props

  const BasemapRef = React.useRef<typeof __esri.Basemap>()

  const [is3D, setIs3D] = React.useState(false)

  React.useEffect(() => {
    if (!BasemapRef.current) {
      loadArcGISJSAPIModule('esri/Basemap').then((module) => {
        BasemapRef.current = module
        basemapUtils.getLoadedBasemapList(BasemapRef.current, [basemapItem]).then(([basemap]) => {
          setIs3D(basemapUtils.isBasemap3D(basemap))
        })
      })
    }
  }, [basemapItem])

  return is3D
    ? <div css={containerStyle} style={style}>
        <SVG className='w-100 h-100' src={indicator3dIcon} />
      </div>
    : null
}

export default Indicator3d
