import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

function MapView() {
  const position = [28.6139, 77.2090] // Delhi

  return (
    <MapContainer
      center={position}
      zoom={10}
      style={{ height: "400px", width: "80%", margin: "auto" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={position}>
        <Popup>Farmer Location 🌾</Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapView