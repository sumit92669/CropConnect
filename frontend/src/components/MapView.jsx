import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { useEffect, useState } from "react"
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom farmer marker icon (green)
const farmerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

function MapView({ crops = [], darkMode = false }) {
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]) // Default Delhi
  const [farmers, setFarmers] = useState([])

  useEffect(() => {
    // Convert crops to farmer markers
    if (crops && crops.length > 0) {
      const farmerMarkers = crops.map(crop => ({
        name: crop.farmer || 'Farmer',
        crop: crop.name,
        price: crop.price,
        unit: crop.unit || 'quintal',
        location: crop.location,
        coordinates: { 
          lat: crop.lat || 28.6139, 
          lng: crop.lng || 77.2090 
        }
      }))
      setFarmers(farmerMarkers)
      
      // Center map on first crop if available
      if (crops[0].lat && crops[0].lng) {
        setMapCenter([crops[0].lat, crops[0].lng])
      }
    }
  }, [crops])

  return (
    <div className={`map-container ${darkMode ? 'map-dark' : ''}`}>
      <MapContainer
        center={mapCenter}
        zoom={5}
        style={{ height: "500px", width: "100%", borderRadius: "16px" }}
      >
        <TileLayer
          url={darkMode 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {farmers.map((farmer, index) => (
          farmer.coordinates && (
            <Marker
              key={index}
              position={[farmer.coordinates.lat, farmer.coordinates.lng]}
              icon={farmerIcon}
            >
              <Popup>
                <div className="farmer-popup">
                  <h4>{farmer.crop}</h4>
                  <p>👨‍🌾 {farmer.name}</p>
                  <p>💰 ₹{farmer.price}/{farmer.unit}</p>
                  <p>📍 {farmer.location}</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView