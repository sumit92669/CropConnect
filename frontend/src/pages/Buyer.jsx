import { useState, useEffect } from "react"
import CropCard from "../components/CropCard"
import FilterBar from "../components/FilterBar"
import CropDetailModal from "../components/CropDetailModal"
import OfferModal from "../components/OfferModal"
import FarmerMap from "../components/FarmerMap"  // ✅ Add this

function Buyer({ darkMode }) {
  const [allCrops, setAllCrops] = useState([])
  const [filteredCrops, setFilteredCrops] = useState([])
  const [selectedCrop, setSelectedCrop] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [myOffers, setMyOffers] = useState([])
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'map'  // ✅ Add this

  // Mock data with coordinates
  useEffect(() => {
    setTimeout(() => {
      const crops = [
        {
          id: 1,
          name: "Wheat",
          price: 2200,
          quantity: 500,
          unit: "quintal",
          farmer: "Rajesh Kumar",
          location: "Ludhiana, Punjab",
          coordinates: { lat: 30.9010, lng: 75.8573 },
          quality: "Grade A",
          description: "High-quality winter wheat, freshly harvested",
          image: "https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg"
        },
        {
          id: 2,
          name: "Rice",
          price: 3100,
          quantity: 1000,
          unit: "quintal",
          farmer: "Sukhwinder Singh",
          location: "Amritsar, Punjab",
          coordinates: { lat: 31.6340, lng: 74.8723 },
          quality: "Basmati",
          description: "Premium basmati rice, long grain",
          image: "https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg"
        },
        {
          id: 3,
          name: "Corn",
          price: 1800,
          quantity: 750,
          unit: "quintal",
          farmer: "Amit Patel",
          location: "Varanasi, UP",
          coordinates: { lat: 25.3176, lng: 82.9739 },
          quality: "Sweet Corn",
          description: "Fresh sweet corn, ideal for direct consumption",
          image: "https://missourisouthernseed.com/wp-content/uploads/2020/02/reids-yellow-dent-corn.jpg"
        },
        {
          id: 4,
          name: "Barley",
          price: 1900,
          quantity: 300,
          unit: "quintal",
          farmer: "Harpreet Singh",
          location: "Hapur, UP",
          coordinates: { lat: 28.7435, lng: 77.7628 },
          quality: "Grade B",
          description: "Good quality barley for animal feed",
          image: "https://tse3.mm.bing.net/th/id/OIP.X-bhErQP9Jf_pSLBWIQ1jQHaE5?rs=1&pid=ImgDetMain&o=7&rm=3"
        },
        {
          id: 5,
          name: "Soybean",
          price: 4200,
          quantity: 200,
          unit: "quintal",
          farmer: "Priya Sharma",
          location: "Indore, MP",
          coordinates: { lat: 22.7196, lng: 75.8577 },
          quality: "Premium",
          description: "High-protein soybeans for oil extraction",
          image: "https://img.freepik.com/premium-photo/soybean-field-beginning-planting-season_124507-221294.jpg?w=2000"
        },
        {
          id: 6,
          name: "Millet",
          price: 2600,
          quantity: 150,
          unit: "quintal",
          farmer: "Ramesh Rathod",
          location: "Jaipur, Rajasthan",
          coordinates: { lat: 26.9124, lng: 75.7873 },
          quality: "Organic",
          description: "Organically grown pearl millet",
          image: "https://morningchores.com/wp-content/uploads/2022/04/millet-plants.jpg"
        }
      ]
      setAllCrops(crops)
      setFilteredCrops(crops)
      setLoading(false)
    }, 1000)
  }, [])

  const handleFilterChange = (filters) => {
    let filtered = [...allCrops]

    if (filters.minPrice) {
      filtered = filtered.filter(c => c.price >= parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(c => c.price <= parseInt(filters.maxPrice))
    }
    if (filters.location) {
      filtered = filtered.filter(c => 
        c.location?.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default: break
    }

    setFilteredCrops(filtered)
  }

  const handleViewDetails = (crop) => {
    setSelectedCrop(crop)
    setShowDetailModal(true)
  }

  const handleMakeOffer = (crop) => {
    setSelectedCrop(crop)
    setShowDetailModal(false)
    setShowOfferModal(true)
  }

  const handleSubmitOffer = (offer) => {
    setMyOffers([...myOffers, offer])
    alert(`✅ Offer sent for ${offer.cropName}!`)
  }

  const handleMarkerClick = (farmer) => {
    // Find the full crop data for this farmer
    const crop = allCrops.find(c => c.farmer === farmer.name)
    if (crop) {
      setSelectedCrop(crop)
      setShowDetailModal(true)
    }
  }

  // Prepare farmers data for map
  const farmersForMap = filteredCrops.map(crop => ({
    name: crop.farmer,
    crop: crop.name,
    price: crop.price,
    unit: crop.unit,
    location: crop.location,
    coordinates: crop.coordinates
  }))

  return (
    <div className="buyer-marketplace">
      <div className="marketplace-header">
        <h1>🏢 Buyer Marketplace</h1>
        <p className="subtitle">Browse fresh crops directly from farmers</p>
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <button 
          className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => setViewMode('grid')}
        >
          📇 Grid View
        </button>
        <button 
          className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
          onClick={() => setViewMode('map')}
        >
          🗺️ Map View
        </button>
      </div>

      {myOffers.length > 0 && (
        <div className="my-offers-summary">
          <h3>📦 My Active Offers ({myOffers.length})</h3>
          <div className="offer-chips">
            {myOffers.map((offer, index) => (
              <div key={index} className="offer-chip">
                <span>{offer.cropName}</span>
                <span className="offer-chip-price">₹{offer.offeredPrice}</span>
                <span className={`offer-status ${offer.status}`}>{offer.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <FilterBar onFilterChange={handleFilterChange} darkMode={darkMode} />

      {loading ? (
        <div className="loading-state">
          <div className="loader"></div>
          <p>Loading available crops...</p>
        </div>
      ) : (
        <>
          <div className="results-info">
            <p>Showing <strong>{filteredCrops.length}</strong> crops</p>
          </div>

          {viewMode === 'grid' ? (
            // Grid View
            filteredCrops.length === 0 ? (
              <div className="no-results-marketplace">
                <span className="no-results-icon">🌾</span>
                <h3>No crops found</h3>
                <p>Try adjusting your filters or check back later</p>
              </div>
            ) : (
              <div className="crops-grid">
                {filteredCrops.map(crop => (
                  <CropCard 
                    key={crop.id} 
                    crop={crop} 
                    onViewDetails={handleViewDetails}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            )
          ) : (
            // Map View
            <div className="map-view-section">
              <FarmerMap 
                farmers={farmersForMap}
                darkMode={darkMode}
                onMarkerClick={handleMarkerClick}
              />
              <div className="map-legend">
                <div className="legend-item">
                  <span className="legend-dot green"></span>
                  <span>Farmer with crops</span>
                </div>
                <p className="map-hint">👆 Click on markers to view crop details</p>
              </div>
            </div>
          )}
        </>
      )}

      <CropDetailModal
        crop={selectedCrop}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        onMakeOffer={handleMakeOffer}
        darkMode={darkMode}
      />

      <OfferModal
        crop={selectedCrop}
        isOpen={showOfferModal}
        onClose={() => setShowOfferModal(false)}
        onSubmitOffer={handleSubmitOffer}
        darkMode={darkMode}
      />
    </div>
  )
}

export default Buyer