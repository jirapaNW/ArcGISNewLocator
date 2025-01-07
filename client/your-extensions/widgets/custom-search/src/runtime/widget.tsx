import React, { useState, useEffect } from 'react'
import { type AllWidgetProps } from 'jimu-core'
import { JimuMapViewComponent, type JimuMapView } from 'jimu-arcgis'
import { type ImmutableObject } from 'seamless-immutable'
import { type Config } from '../config'
import '../style.css'
import Graphic from 'esri/Graphic'
import BufferArea from '../../../BufferArea/src/runtime/widget'
import ReactDOM from 'react-dom'
import OpenGps from './OpenGps'
import CopyCoordinatesWidget from './CopyCoordinatesWidget'
import Print from '../../../Print/src/runtime/widget'

interface Props extends AllWidgetProps<ImmutableObject<Config>> {}

const CustomSearchWidget: React.FC<Props> = (props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [jimuMapView, setJimuMapView] = useState<JimuMapView | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [centerPoint, setCenterPoint] = useState<{ lat: number, lon: number } | null>(null)

  const apiUrl = props.config.apiUrl
  const searchPlaceholder = props.config.searchPlaceholder
  const key = props.config.key

  const buildRequestUrl = (
    baseUrl: string,
    additionalParams: { [key: string]: string } = {}
  ) => {
    const url = new URL(baseUrl)
    const queryParams = {
      api_key: key,
      ...additionalParams
    }

    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })

    return url.toString()
  }

  const fetchSearchResults = async (term: string) => {
    if (!term.trim()) {
      setResults([])
      return
    }

    try {
      setIsLoading(true)
      const requestUrl = buildRequestUrl(apiUrl, { search: term })
      const response = await fetch(requestUrl)
      const data = await response.json()
      setResults(data || [])
    } catch (error) {
      console.error('Error fetching search results:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    if (term.trim()) {
      setShowSuggestions(true)
      fetchSearchResults(term)
    } else {
      setShowSuggestions(false)
    }
  }

  const searchByMeter = async (term: string) => {
    if (!term.trim()) {
      setResults([])
      return
    }

    try {
      setIsLoading(true)
      const urlMeter =
        'https://mapapi.mea.or.th/api/1.0/resources/address/' + term
      const requestUrl = buildRequestUrl(urlMeter)
      const response = await fetch(requestUrl)
      const data = await response.json()
      console.log('data results:', data[0])
      return data[0]
    } catch (error) {
      console.error('Error fetching search results:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectResult = async (result: any) => {
    console.log('result', result)
    const address = await searchByMeter(result._id)
    console.log('address results:', address)
    setSearchTerm(result.keyword)
    setShowSuggestions(false)
    setCenterPoint({ lat: address.lat, lon: address.lon })
    sendCoordinates(address)

    if (jimuMapView) {
      const { view } = jimuMapView

      view.goTo({
        center: [address.lon, address.lat],
        zoom: 20
      })

      // สร้าง Graphic (Pin) สำหรับตำแหน่ง
      const pointGraphic = new Graphic({
        geometry: {
          type: 'point', // ชนิดของ geometry เป็น point
          longitude: address.lon,
          latitude: address.lat
        },
        symbol: {
          type: 'simple-marker', // ใช้ SimpleMarkerSymbol
          style: 'circle',
          color: 'red', // สีของ pin
          size: '12px', // ขนาดของ pin
          outline: {
            color: 'white', // ขอบของ pin
            width: 1.5
          }
        }
      })

      // ลบ Graphic เก่าที่อาจมีอยู่ในแผนที่
      view.graphics.removeAll()

      // เพิ่ม Graphic ใหม่ลงในแผนที่
      view.graphics.add(pointGraphic)

      // ตั้งค่า popup ให้มีเส้นเชื่อมโยง (info window style)
      view.popup.dockEnabled = false // ปิดการแสดง popup แบบ docked
      view.popup.dockOptions = {
        buttonEnabled: false, // ไม่แสดงปุ่ม dock
        breakpoint: false // ไม่เปลี่ยนเป็น docked mode ใน breakpoint
      }

      // สร้าง div element สำหรับ content ของ popup
      const contentDiv = document.createElement('div')

      // สร้าง container สำหรับข้อความเพิ่มเติม
      const infoDiv = document.createElement('div')
      infoDiv.innerHTML = `
        <b>Address:</b> ${result.keyword}<br>
        <b>Location:</b> ${address.lat}, ${address.lon}
      `

      // เพิ่ม infoDiv ลงใน contentDiv
      contentDiv.appendChild(infoDiv)

      const reactContainerCopy = document.createElement('div')
      contentDiv.appendChild(reactContainerCopy) // เพิ่ม reactContainer ลงใน contentDiv

      // เรนเดอร์ BufferArea ลงใน reactContainer โดยใช้ ReactDOM
      ReactDOM.render(
        <CopyCoordinatesWidget coordinates={{ lat: address.lat, lon: address.lon }} />,
        reactContainerCopy
      )

      const reactContainerGps = document.createElement('div')
      contentDiv.appendChild(reactContainerGps) // เพิ่ม reactContainer ลงใน contentDiv

      // เรนเดอร์ BufferArea ลงใน reactContainer โดยใช้ ReactDOM
      ReactDOM.render(
        <OpenGps coordinates={{ lat: address.lat, lon: address.lon }} />,
        reactContainerGps
      )

      // สร้าง container สำหรับ React component
      const reactContainer = document.createElement('div')
      contentDiv.appendChild(reactContainer) // เพิ่ม reactContainer ลงใน contentDiv

      // เรนเดอร์ BufferArea ลงใน reactContainer โดยใช้ ReactDOM
      ReactDOM.render(
        <BufferArea jimuMapView={jimuMapView} centerPoint={{ lat: address.lat, lon: address.lon }} />,
        reactContainer
      )

      // แสดง popup ที่ตำแหน่งของ pointGraphic
      view.popup.open({
        title: 'Selected Location',
        content: contentDiv, // ใช้ contentDiv ที่ประกอบด้วย infoDiv และ reactContainer
        location: pointGraphic.geometry // ตำแหน่งของ popup
      })
    }
  }

  const mapWidgetId = props.useMapWidgetIds?.[0] || ''
  console.log('props.useMapWidgetIds?.[0]', props.useMapWidgetIds?.[0])
  if (!mapWidgetId) {
    console.error('Map widget is not configured correctly.')
  }

  const sendCoordinates = (address) => {
    const sampleLat = address.lat // ค่าตัวอย่าง Latitude
    const sampleLon = address.lon // ค่าตัวอย่าง Longitude

    props.dispatch({
      type: 'WIDGET_STATE_UPDATE',
      widgetId: 'widget_13',
      state: {
        latAddress: sampleLat,
        lonAddress: sampleLon
      }
    })
  }

  return (
    <div className="custom-search-widget">
      {/* ช่องค้นหา */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchInput}
        placeholder={searchPlaceholder}
        onFocus={() => {
          setShowSuggestions(true)
        }}
        onBlur={() =>
          setTimeout(() => {
            setShowSuggestions(false)
          }, 200)
        } // หน่วงเวลาเพื่อเลือก item ได้ก่อนซ่อน
      />
      {isLoading && <div className="loading">Loading...</div>}

      {/* แสดงผลลัพธ์การค้นหาแบบ Auto-Complete */}
      {showSuggestions && results.length > 0 && (
        <ul className="suggestions">
          {results.map((result, index) => (
            <li
              key={index}
              onClick={() => {
                handleSelectResult(result)
              }}
              className="suggestion-item"
            >
              {result.keyword}
            </li>
          ))}
        </ul>
      )}

      {/* เชื่อมต่อกับ Jimu Map View */}
      <JimuMapViewComponent
        useMapWidgetId={mapWidgetId}
        onActiveViewChange={(view) => {
          setJimuMapView(view)
        }}
      />

      {/* แสดง BufferArea Widget
      <BufferArea jimuMapView={jimuMapView} centerPoint={centerPoint} /> */}
    </div>
  )
}

export default CustomSearchWidget
