import React, { useState } from 'react'
import { type AllWidgetProps } from 'jimu-core'
import { Button, Select, TextInput } from 'jimu-ui'
import { JimuMapViewComponent, type JimuMapView } from 'jimu-arcgis'
import jsPDF from 'jspdf'
import { type ImmutableObject } from 'seamless-immutable'
import { type Config } from '../config'
import QRCode from 'qrcode'

interface Props extends AllWidgetProps<ImmutableObject<Config>> {}

const Print: React.FC<Props> = (props) => {
  const [jimuMapView, setJimuMapView] = useState<JimuMapView | null>(null)
  const [paperSize, setPaperSize] = useState('a4') // ขนาดกระดาษ: a4, a3, a5
  const [orientation, setOrientation] = useState('portrait') // ทิศทาง: landscape, portrait
  // const [userInput, setUserInput] = useState('') // เก็บข้อความที่ผู้ใช้กรอก
  const [author, setAuthor] = useState('') // ผู้จัดทำ
  const [note, setNote] = useState('') // หมายเหตุ
  const [no, setNo] = useState('') // เลขรับที่
  const [meter, setMeter] = useState('') // หมายเลขเครื่องวัด
  const [name, setName] = useState('') // ชื่อ
  const [address, setAddress] = useState('') // ที่อยู่
  const [showQRCode, setShowQRCode] = useState(false)
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const { latAddress, lonAddress } = props.state

  const handleActiveViewChange = (jimuMapView: JimuMapView) => {
    setJimuMapView(jimuMapView)
  }

  const handlePrint = () => {
    if (!jimuMapView || !jimuMapView.view) {
      console.error('Map view is not available.')
      return
    }

    console.log('address', props.state)
    // กำหนดขนาดตาม orientation
    let paperWidth, paperHeight
    let imageW, imageH
    let imageLocate
    let fontSize
    let tableGap
    let startLine = 7
    switch (paperSize) {
      case 'a0':
        paperWidth = orientation === 'portrait' ? 841 : 1189
        paperHeight = orientation === 'portrait' ? 1189 : 841
        imageW = -150
        imageH = 40
        imageLocate = 350
        fontSize = 26
        tableGap = 14
        startLine = 16
        break
      case 'a1':
        paperWidth = orientation === 'portrait' ? 594 : 841
        paperHeight = orientation === 'portrait' ? 841 : 594
        imageW = -90
        imageH = 20
        imageLocate = 230
        fontSize = 22
        tableGap = 8
        startLine = 12
        break
      case 'a2':
        paperWidth = orientation === 'portrait' ? 420 : 594
        paperHeight = orientation === 'portrait' ? 594 : 420
        imageW = -60
        imageH = 7
        imageLocate = 170
        fontSize = 18
        tableGap = 3
        startLine = 9
        break
      case 'a3':
        paperWidth = orientation === 'portrait' ? 297 : 420
        paperHeight = orientation === 'portrait' ? 420 : 297
        imageW = -20
        imageH = 3
        imageLocate = 90
        fontSize = 12
        tableGap = 0
        break
      case 'a4':
      default:
        paperWidth = orientation === 'portrait' ? 210 : 297
        paperHeight = orientation === 'portrait' ? 297 : 210
        imageW = 0
        imageH = -2
        imageLocate = 50
        fontSize = 9
        tableGap = 0
        break
    }

    const view = jimuMapView.view
    let h = 1080
    if (orientation === 'portrait') {
      h = 1980
    }

    view
      .takeScreenshot({ width: 1920, height: h })
      .then(async (screenshot) => {
        try {
          const pdf = new jsPDF(orientation, 'mm', paperSize)
          const margin = 10

          const maxImageWidth = paperWidth - margin * 2
          const maxImageHeight = paperHeight * 0.8// 60% ของความสูงกระดาษ

          const imageAspectRatio = screenshot.data.width / screenshot.data.height

          let imageWidth = maxImageWidth
          let imageHeight = orientation === 'portrait' ? imageWidth / imageAspectRatio : (imageWidth / imageAspectRatio) - 10

          if (imageHeight > maxImageHeight) {
            imageHeight = maxImageHeight
            imageWidth = imageHeight * imageAspectRatio
          }

          if (isNaN(imageWidth) || isNaN(imageHeight) || imageWidth <= 0 || imageHeight <= 0) {
            throw new Error('Invalid image dimensions calculated')
          }

          const imageX = (paperWidth - imageWidth) / 2
          const imageY = orientation === 'portrait' ? margin : margin - 2
          pdf.setDrawColor(0)
          pdf.setLineWidth(0.5)
          pdf.rect(imageX - 2, imageY - 2, imageWidth + 4, imageHeight + 4)
          pdf.addImage(screenshot.dataUrl, 'PNG', imageX, imageY, imageWidth, imageHeight)

          const logoWidth = ((imageWidth - margin * 2) / 2 - 5) + imageW
          const logoHeight = orientation === 'portrait' ? 10 + imageH : 12 + imageH
          const yLocate = imageY + imageHeight + margin - 3
          const xLocate = imageX

          pdf.setDrawColor(0)
          pdf.setLineWidth(0.5)

          const arrowWidth = 20 // Width of the arrow image (adjust as needed)
          const arrowHeight = 20 // Height of the arrow image (adjust as needed)

          // Calculate position for bottom-right corner
          const arrowX = imageX + imageWidth - arrowWidth // Right edge of the map image
          const arrowY = imageY + imageHeight - arrowHeight // Bottom edge of the map image

          pdf.addImage(
            '../widgets/Print/dist/runtime/layoutarrow.png', // Path to layoutarrow.png
            'PNG',
            arrowX,
            arrowY,
            arrowWidth,
            arrowHeight
          )

          if (showQRCode) {
          // 🗺️ **ดึงพิกัดจากแผนที่**
            const center = view.extent.center
            setLat(center.latitude.toFixed(6))
            setLon(center.longitude.toFixed(6))
            const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`

            console.log('Google Maps URL:', googleMapsUrl)

            // 📸 **สร้าง QR Code จาก URL**
            const qrDataUrl = await QRCode.toDataURL(googleMapsUrl, {
              margin: 0, // ลบขอบขาวรอบ QR Code
              color: {
                dark: '#000000', // สีของ QR Code (ดำ)
                light: '#FFFFFF' // พื้นหลังเป็นสีขาว (แก้ปัญหา Invalid hex)
              }
            })

            // 🖨️ **ฝัง QR Code ลงใน PDF**
            const qrSize = 10 // ขนาด QR Code
            // 🖼️ ตำแหน่งซ้ายล่างของภาพแผนที่
            const qrX = imageX + 1 // ชิดซ้ายตามภาพ
            const qrY = imageY - 1 + imageHeight - qrSize // ชิดล่างตามภาพ

            pdf.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize)
          };

          // วาดกรอบรวมสำหรับทั้งสองรูปภาพ (logo และ report_header)
          const totalWidth = imageWidth + 4 // ความกว้างรวมของทั้งสองรูปภาพ
          pdf.rect(imageX - 2, yLocate - 2, totalWidth, logoHeight + 4) // วาดกรอบรอบทั้งสองรูปภาพ

          const mealogoW = orientation === 'portrait' ? logoWidth - 50 : (logoWidth - 50) - (logoWidth / 4)
          // เพิ่มรูปภาพ mealogo
          pdf.addImage(
            '../widgets/Print/dist/runtime/mealogo.png',
            'PNG',
            xLocate,
            yLocate,
            mealogoW,
            logoHeight
          )

          // เพิ่มรูปภาพ report_header
          pdf.addImage(
            '../widgets/Print/dist/runtime/report_header.png',
            'PNG',
            xLocate + logoWidth + imageLocate,
            yLocate,
            logoWidth - 20,
            logoHeight - 3
          )

          console.log('prop', props)
          const fonta = props.config.font

          pdf.addFileToVFS('THSarabun.ttf', fonta)
          pdf.addFont('THSarabun.ttf', 'THSarabun', 'normal')
          pdf.setFont('THSarabun', 'normal')

          // === 📊 ตารางอยู่ใต้ภาพแผนที่ ===
          const tableStartY = yLocate + logoHeight + 2 // ตำแหน่งเริ่มต้นตารางใต้แผนที่
          const tableStartX = imageX - 2
          const tableWidth = imageWidth + 4 // ใช้ imageWidth เป็นความกว้างตาราง
          const cellHeight = 10 + tableGap
          const cellWidth = tableWidth / 3 // แบ่งเป็น 3 คอลัมน์
          pdf.setFontSize(fontSize)

          // 🔹 **เส้นกรอบตารางทั้งหมด (กรอบนอก)**
          pdf.rect(tableStartX, tableStartY, cellWidth, cellHeight * 3) // คอลัมน์ 1
          pdf.rect(tableStartX + cellWidth, tableStartY, cellWidth, cellHeight * 3) // คอลัมน์ 2
          pdf.rect(tableStartX + 2 * cellWidth, tableStartY, cellWidth, cellHeight * 3) // คอลัมน์ 3

          // 🔹 **เส้นแบ่งภายในคอลัมน์ที่ 1**
          pdf.line(tableStartX, tableStartY, tableStartX + cellWidth, tableStartY) // เส้นบน
          pdf.line(tableStartX, tableStartY + cellHeight, tableStartX + cellWidth, tableStartY + cellHeight) // เส้นกลาง
          pdf.line(tableStartX, tableStartY + 2 * cellHeight, tableStartX + cellWidth, tableStartY + 2 * cellHeight) // เส้นล่าง

          // 🔹 **เส้นแบ่งภายในคอลัมน์ที่ 2** (คอลัมน์ที่ 2 จะยังคงมีเส้นอยู่ตามเดิม)
          pdf.line(tableStartX + cellWidth, tableStartY, tableStartX + 2 * cellWidth, tableStartY) // เส้นบน
          pdf.line(tableStartX + cellWidth, tableStartY + 3 * cellHeight, tableStartX + 2 * cellWidth, tableStartY + 3 * cellHeight) // เส้นล่าง
          pdf.line(tableStartX + cellWidth, tableStartY, tableStartX + cellWidth, tableStartY + 3 * cellHeight) // เส้นซ้าย
          pdf.line(tableStartX + 2 * cellWidth, tableStartY, tableStartX + 2 * cellWidth, tableStartY + 3 * cellHeight) // เส้นขวา

          // 🔹 **เส้นแบ่งภายในคอลัมน์ที่ 3**
          pdf.line(tableStartX + 2 * cellWidth, tableStartY, tableStartX + 3 * cellWidth, tableStartY) // เส้นบน
          pdf.line(tableStartX + 2 * cellWidth, tableStartY + cellHeight, tableStartX + 3 * cellWidth, tableStartY + cellHeight) // เส้นกลาง
          pdf.line(tableStartX + 2 * cellWidth, tableStartY + 2 * cellHeight, tableStartX + 3 * cellWidth, tableStartY + 2 * cellHeight) // เส้นล่าง
          // 🔹 ข้อความในตาราง
          // ฟังก์ชันช่วยตัดข้อความให้พอดีกับพื้นที่ตาราง
          const splitTextToFitCell = (pdf, text, maxWidth) => {
            return pdf.splitTextToSize(text, maxWidth)
          }

          // 🔹 ข้อความในตาราง
          const cellPadding = 2
          const textLineHeight = 5

          // คอลัมน์ที่ 1
          let textLines = splitTextToFitCell(pdf, `เลขรับที่: ${no}`, cellWidth - cellPadding * 2)
          pdf.text(textLines, tableStartX + cellPadding, tableStartY + startLine)

          textLines = splitTextToFitCell(pdf, `หมายเลขเครื่องวัด: ${meter}`, cellWidth - cellPadding * 2)
          pdf.text(textLines, tableStartX + cellPadding, tableStartY + cellHeight + startLine)

          textLines = splitTextToFitCell(pdf, `ผู้จัดทำ: ${author}`, cellWidth - cellPadding * 2)
          pdf.text(textLines, tableStartX + cellPadding, tableStartY + 2 * cellHeight + startLine)

          // คอลัมน์ที่ 2
          textLines = splitTextToFitCell(pdf, `ชื่อ: ${name}`, cellWidth - cellPadding * 2)
          pdf.text(textLines, tableStartX + cellWidth + cellPadding, tableStartY + startLine)

          textLines = splitTextToFitCell(pdf, `ที่อยู่: ${address}`, cellWidth - cellPadding * 2)
          pdf.text(textLines, tableStartX + cellWidth + cellPadding, tableStartY + cellHeight + startLine)

          textLines = splitTextToFitCell(pdf, `หมายเหตุ: ${note}`, cellWidth - cellPadding * 2)
          pdf.text(textLines, tableStartX + cellWidth + cellPadding, tableStartY + 2 * cellHeight + startLine)

          // คอลัมน์ที่ 3
          textLines = splitTextToFitCell(pdf, `วันที่: ${new Date().toLocaleDateString('th-TH')}`, cellWidth - cellPadding * 2)
          pdf.text(textLines, tableStartX + 2 * cellWidth + cellPadding, tableStartY + startLine)

          // 🧭 ดึงมาตราส่วนของแผนที่
          const mapScale = view.scale
          const formattedScale = `1: ${mapScale.toLocaleString('th-TH')}`
          textLines = splitTextToFitCell(pdf, `มาตราส่วน: ${formattedScale}`, cellWidth - cellPadding * 2)
          pdf.text(textLines, tableStartX + 2 * cellWidth + cellPadding, tableStartY + cellHeight + startLine)

          textLines = splitTextToFitCell(pdf, 'ระวางแผนที่: ', cellWidth - cellPadding * 2)
          pdf.text(textLines, tableStartX + 2 * cellWidth + cellPadding, tableStartY + 2 * cellHeight + startLine)

          pdf.save(`${paperSize}-${orientation}.pdf`)
        } catch (error) {
          console.error('Error generating PDF:', error)
        }
      })
      .catch((error) => {
        console.error('Error taking screenshot:', error)
      })
  }

  const handleShowQRCodeChange = (checked) => {
    setShowQRCode(checked) // อัปเดต state

    if (checked) {
      // ✅ แสดงพินบนแผนที่
      addCenterPin()
    } else {
      // ❌ ลบพินออกจากแผนที่
      removeCustomPin()
      removeCenterPin()
    }
  }

  const addCenterPin = () => {
    if (!jimuMapView || !jimuMapView.view) {
      console.error('Map view is not available.')
      return
    }

    const view = jimuMapView.view
    const center = view.extent.center

    // ตรวจสอบว่าพินมีอยู่แล้วหรือไม่
    if (view.graphics.items.some(graphic => graphic.attributes?.id === 'centerPin')) {
      return // มีพินอยู่แล้ว ไม่ต้องเพิ่มซ้ำ
    }

    // เพิ่มกราฟิกพิน
    const pinGraphic = {
      geometry: {
        type: 'point',
        latitude: center.latitude,
        longitude: center.longitude
      },
      symbol: {
        type: 'simple-marker',
        style: 'circle',
        color: 'red',
        size: '12px',
        outline: {
          color: 'white',
          width: 1
        }
      },
      attributes: {
        id: 'centerPin' // ใช้สำหรับระบุตัวพิน
      }
    }

    view.graphics.add(pinGraphic)
  }

  const removeCenterPin = () => {
    if (!jimuMapView || !jimuMapView.view) {
      console.error('Map view is not available.')
      return
    }

    const view = jimuMapView.view

    // ค้นหาและลบกราฟิกที่มี `id: centerPin`
    const pinGraphic = view.graphics.items.find(graphic => graphic.attributes?.id === 'centerPin')
    if (pinGraphic) {
      view.graphics.remove(pinGraphic)
    }
  }

  const enableMapClickSelection = () => {
    if (!jimuMapView || !jimuMapView.view) {
      console.error('Map view is not available.')
      return
    }

    const view = jimuMapView.view

    // เพิ่ม Event Listener สำหรับ Click บนแผนที่
    const clickHandler = view.on('click', (event) => {
      const { latitude, longitude } = event.mapPoint

      // ✅ เพิ่มพินตรงจุดที่คลิก
      addCustomPin(latitude, longitude)

      // ✅ อัปเดตค่าพิกัด
      setLat(latitude.toFixed(6))
      setLon(longitude.toFixed(6))

      console.log(`พิกัดใหม่: lat=${latitude.toFixed(6)}, lon=${longitude.toFixed(6)}`)

      // ปิดโหมดเลือกจุดหลังจากเลือกจุดเสร็จ
      // clickHandler.remove()
    })

    console.log('โหมดเลือกจุดบนแผนที่เปิดใช้งานแล้ว')
  }

  const addCustomPin = (latitude, longitude) => {
    if (!jimuMapView || !jimuMapView.view) {
      console.error('Map view is not available.')
      return
    }

    const view = jimuMapView.view

    // ลบพินเก่าหากมีอยู่
    removeCenterPin()
    removeCustomPin()

    // เพิ่มกราฟิกพิน
    const pinGraphic = {
      geometry: {
        type: 'point',
        latitude,
        longitude
      },
      symbol: {
        type: 'simple-marker',
        style: 'circle',
        color: 'blue',
        size: '14px',
        outline: {
          color: 'white',
          width: 1
        }
      },
      attributes: {
        id: 'customPin'
      }
    }

    view.graphics.add(pinGraphic)
  }

  const removeCustomPin = () => {
    if (!jimuMapView || !jimuMapView.view) {
      console.error('Map view is not available.')
      return
    }

    const view = jimuMapView.view

    // ค้นหาและลบกราฟิกที่มี `id: customPin`
    const pinGraphic = view.graphics.items.find(graphic => graphic.attributes?.id === 'customPin')
    if (pinGraphic) {
      view.graphics.remove(pinGraphic)
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      // height: '100vh',
      maxWidth: '600px',
      margin: '0 auto',
      border: '1px solid #ddd',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
      overflow: 'hidden',
      scrollbarWidth: 'thin', /* สำหรับ Firefox */
      scrollbarColor: '#d3d3d3 #f1f1f1' /* สี scrollbar และ track สำหรับ Firefox */
    }}>
      {/* Map View */}
      <div style={{ flex: '0 0 auto' }}>
        <JimuMapViewComponent
          useMapWidgetId={props.useMapWidgetIds?.[0]}
          onActiveViewChange={handleActiveViewChange}
        />
      </div>

      {/* Scrollable Inputs */}
      <div style={{
        height: '380px',
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        {/* สไตล์สำหรับ Chrome, Edge, และ Safari */}
      <style>
        {`
          ::-webkit-scrollbar {
            width: 12px;
            height: 12px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-track-piece {
              border-radius: 0.4rem !important;
          }
          ::-webkit-scrollbar-thumb {
            background: #d3d3d3;
            border-radius: 10px;
            border: 2px solid #f1f1f1;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #c1c1c1;
          }
          * {
            scrollbar-width: thin;
            scrollbar-color: #d3d3d3 #f1f1f1;
          }
          ::-webkit-scrollbar-track {
              // background: transparent;
              border-radius: 0.4rem !important;
          }
        `}
      </style>
        {/* เลขรับที่ */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>เลขรับที่:</label>
          <TextInput
            value={no}
            onChange={(e) => { setNo(e.target.value) }}
            placeholder="กรอกเลขรับที่"
            style={{ padding: '10px', fontSize: '14px' }}
          />
        </div>

        {/* หมายเลขเครื่องวัด */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>หมายเลขเครื่องวัด:</label>
          <TextInput
            value={meter}
            onChange={(e) => { setMeter(e.target.value) }}
            placeholder="กรอกหมายเลขเครื่องวัด"
            style={{ padding: '10px', fontSize: '14px' }}
          />
        </div>

        {/* ผู้จัดทำ */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>ผู้จัดทำ:</label>
          <TextInput
            value={author}
            onChange={(e) => { setAuthor(e.target.value) }}
            placeholder="ผู้จัดทำ"
            style={{ padding: '10px', fontSize: '14px' }}
          />
        </div>

        {/* ชื่อ */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>ชื่อ:</label>
          <TextInput
            value={name}
            onChange={(e) => { setName(e.target.value) }}
            placeholder="กรอกชื่อ"
            style={{ padding: '10px', fontSize: '14px' }}
          />
        </div>

        {/* ที่อยู่ */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>ที่อยู่:</label>
          <TextInput
            value={address}
            onChange={(e) => { setAddress(e.target.value) }}
            placeholder="กรอกที่อยู่"
            style={{ padding: '10px', fontSize: '14px' }}
          />
        </div>

        {/* หมายเหตุ */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>หมายเหตุ:</label>
          <TextInput
            value={note}
            onChange={(e) => { setNote(e.target.value) }}
            placeholder="หมายเหตุ"
            style={{ padding: '10px', fontSize: '14px' }}
          />
        </div>

        {/* ขนาดกระดาษ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>ขนาดกระดาษ:</label>
          <Select
            value={paperSize}
            onChange={(e) => { setPaperSize(e.target.value) }}
            style={{ flex: '1', padding: '10px', fontSize: '14px' }}
          >
            <option value="a0">A0</option>
            <option value="a1">A1</option>
            <option value="a2">A2</option>
            <option value="a3">A3</option>
            <option value="a4">A4</option>
          </Select>
        </div>

        {/* ทิศทาง */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>ทิศทาง:</label>
          <Select
            value={orientation}
            onChange={(e) => { setOrientation(e.target.value) }}
            style={{ flex: '1', padding: '10px', fontSize: '14px' }}
          >
            <option value="portrait">แนวตั้ง</option>
            <option value="landscape">แนวนอน</option>
          </Select>
        </div>
      </div>

      {/* ตัวเลือกแสดง QR Code */}
      <div style={{
        padding: '10px 10px 0px'
      }}>
        <label htmlFor="showQRCode" style={{
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'start',
          gap: '8px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          <input
            type="checkbox"
            id="showQRCode"
            checked={showQRCode}
            onChange={(e) => { handleShowQRCodeChange(e.target.checked) }}
            style={{
              width: '18px',
              height: '18px',
              accentColor: '#007bff',
              cursor: 'pointer'
            }}
          />
          แสดง QR Code เพื่อใช้ในการนำทาง
        </label>

        {/* ปุ่มเลือกจุดบนแผนที่ */}
        {showQRCode && (
          <button
            onClick={enableMapClickSelection}
            style={{
              marginBottom: '10px',
              width: '100%',
              padding: '4px',
              fontSize: '14px',
              backgroundColor: 'rgb(255, 255, 255)',
              color: 'rgb(7, 111, 229)',
              border: '1px solid',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            เพิ่มพิกัดปลายทางใหม่
          </button>
        )}
      </div>

      {/* Fixed Print Button */}
      <div style={{
        position: 'sticky',
        bottom: '0',
        backgroundColor: '#f9f9f9',
        padding: '0px 10px 15px',
        // borderTop: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Button
          onClick={handlePrint}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          พิมพ์แผนที่เป็น PDF
        </Button>
      </div>
    </div>
  )
}

export default Print
