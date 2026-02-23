import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'

// Fix for default markers in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom farmer marker icon
const farmerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

function FarmerMap({ farmers, darkMode, onMarkerClick }) {
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]) // Default: Delhi

  // If farmers exist, center map on first farmer
  useEffect(() => {
    if (farmers && farmers.length > 0 && farmers[0].coordinates) {
      setMapCenter([farmers[0].coordinates.lat, farmers[0].coordinates.lng])
    }
  }, [farmers])

  return (
    <div className={`map-container ${darkMode ? 'map-dark' : ''}`}>
      <MapContainer
        center={mapCenter}
        zoom={6}
        style={{ height: '500px', width: '100%', borderRadius: '16px' }}
      >
        <TileLayer
          url={darkMode 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {farmers && farmers.map((farmer, index) => (
          farmer.coordinates && (
            <Marker
              key={index}
              position={[farmer.coordinates.lat, farmer.coordinates.lng]}
              icon={farmerIcon}
              eventHandlers={{
                click: () => onMarkerClick && onMarkerClick(farmer)
              }}
            >
              <Popup>
                <div className="farmer-popup">
                  <h4>{farmer.name}</h4>
                  <p>🌾 {farmer.crop}</p>
                  <p>💰 ₹{farmer.price}/{farmer.unit}</p>
                  <p>📍 {farmer.location}</p>
                  <button 
                    className="popup-btn"
                    onClick={() => onMarkerClick && onMarkerClick(farmer)}
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  )
}

export default FarmerMap