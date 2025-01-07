import React from 'react'

interface CopyCoordinatesProps {
  coordinates: {
    lat: number
    lon: number
  }
}

const CopyCoordinatesWidget: React.FC<CopyCoordinatesProps> = ({ coordinates }) => {
  const handleCopy = () => {
    const { lat, lon } = coordinates
    const coordinatesText = `${lat}, ${lon}`
    navigator.clipboard
      .writeText(coordinatesText)
      .then(() => {
        // alert('Coordinates copied to clipboard!')
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
        // alert('Failed to copy coordinates.')
      })
  }

  return (
    <div className="copy-coordinates-widget">
      {/* <p>
        <b>Latitude:</b> {coordinates.lat}, <b>Longitude:</b> {coordinates.lon}
      </p> */}
          <p />
          <button onClick={handleCopy}>Copy Coordinates</button>
          <p />
    </div>
  )
}

export default CopyCoordinatesWidget
