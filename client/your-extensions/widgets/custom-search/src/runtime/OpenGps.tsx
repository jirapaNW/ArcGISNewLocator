import React from 'react'

interface OpenGpsProps {
  coordinates: {
    lat: number
    lon: number
  }
}

const OpenGps: React.FC<OpenGpsProps> = ({ coordinates }) => {
  const openInGoogleMaps = () => {
    const { lat, lon } = coordinates

    // เปิด Google Maps ด้วยพิกัดที่ได้รับ
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`
    window.open(googleMapsUrl, '_blank') // เปิดในแท็บใหม่
  }

  return (
    <div className="open-gps-widget">
      <h4>Open GPS Widget</h4>
      <p>
        Latitude: {coordinates.lat}, Longitude: {coordinates.lon}
      </p>
      <button onClick={openInGoogleMaps}>Open in Google Maps</button>
      <p></p>
    </div>
  )
}

export default OpenGps
