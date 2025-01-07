import React, { useState } from 'react'
import { type JimuMapView } from 'jimu-arcgis'
import Graphic from 'esri/Graphic'
import geometryEngine from 'esri/geometry/geometryEngine'
import type Polygon from 'esri/geometry/Polygon'
import Point from 'esri/geometry/Point'

interface BufferAreaProps {
  jimuMapView: JimuMapView | null // รับ Map View จาก Widget A
  centerPoint: { lat: number, lon: number } | null // รับจุดศูนย์กลางจาก Widget A
}

const BufferArea: React.FC<BufferAreaProps> = ({ jimuMapView, centerPoint }) => {
  const [bufferDistance, setBufferDistance] = useState(500) // ระยะห่างบัฟเฟอร์ (ค่าเริ่มต้น 500 เมตร)

  const createBuffer = () => {
    if (!jimuMapView || !centerPoint) {
      console.error('Map view or center point is not available')
      return
    }

    const { view } = jimuMapView

    // ตรวจสอบและสร้างจุดเริ่มต้น (Point)
    const centerGeometry = new Point({
      longitude: centerPoint.lon,
      latitude: centerPoint.lat,
      spatialReference: view.spatialReference // ใช้ spatial reference เดียวกับแผนที่
    })

    // สร้าง Buffer โดยใช้ geometryEngine
    const bufferGeometry: Polygon = geometryEngine.buffer(
      centerGeometry,
      bufferDistance,
      'meters'
    )

    // สร้าง Graphic สำหรับบัฟเฟอร์
    const bufferGraphic = new Graphic({
      geometry: bufferGeometry,
      symbol: {
        type: 'simple-fill', // สัญลักษณ์แบบพื้นที่
        color: [0, 0, 255, 0.3], // สีฟ้าแบบโปร่งใส
        outline: {
          color: [0, 0, 255],
          width: 2
        }
      }
    })

    // ลบกราฟิกเก่า และเพิ่มบัฟเฟอร์ใหม่ในแผนที่
    view.graphics.removeAll()
    view.graphics.add(bufferGraphic)

    // เลื่อนกล้องไปยังพื้นที่บัฟเฟอร์
    view.goTo(bufferGeometry.extent)
  }

  return (
    <div className="buffer-area-widget">
      <h4>Buffer Area Widget</h4>
      <div>
        <label>
          Buffer Distance (meters):{' '}
          <input
            type="number"
            value={bufferDistance}
            onChange={(e) => { setBufferDistance(Number(e.target.value)) }}
          />
        </label>
      </div>
      <button onClick={createBuffer} disabled={!centerPoint}>
        Create Buffer
      </button>
    </div>
  )
}

export default BufferArea
