import { useState, useEffect } from "react"
import CropCard from "../components/CropCard"
import FilterBar from "../components/FilterBar"
import CropDetailModal from "../components/CropDetailModal"
import OfferModal from "../components/OfferModal"
import FarmerMap from "../components/FarmerMap"
import { cropsData, categories } from "../data/cropsData"

function Buyer({ darkMode }) {
  const [allCrops, setAllCrops] = useState([])
  const [filteredCrops, setFilteredCrops] = useState([])
  const [selectedCrop, setSelectedCrop] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [myOffers, setMyOffers] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Load crops data
  useEffect(() => {
    setAllCrops(cropsData)
    setFilteredCrops(cropsData)
    setLoading(false)
  }, [])

  const handleFilterChange = (filters) => {
    let filtered = [...allCrops]

    // Apply price filter
    if (filters.minPrice) {
      filtered = filtered.filter(c => c.price >= parseInt(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(c => c.price <= parseInt(filters.maxPrice))
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(c => 
        c.location?.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory)
    }

    // Apply sorting
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
      default:
        // 'newest' - keep as is
        break
    }

    setFilteredCrops(filtered)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    
    let filtered = [...allCrops]
    
    if (category !== 'all') {
      filtered = filtered.filter(c => c.category === category)
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
    console.log("Offer submitted:", offer)
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
        <p className="subtitle">Browse {allCrops.length} fresh crops directly from farmers</p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <button 
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('all')}
        >
          All Crops ({allCrops.length})
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat.id)}
          >
            {cat.icon} {cat.name} ({allCrops.filter(c => c.category === cat.id).length})
          </button>
        ))}
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

      {/* My Offers Summary */}
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
            <p>Showing <strong>{filteredCrops.length}</strong> of <strong>{allCrops.length}</strong> crops</p>
          </div>

          {filteredCrops.length === 0 ? (
            <div className="no-results-marketplace">
              <span className="no-results-icon">🌾</span>
              <h3>No crops found</h3>
              <p>Try adjusting your filters or check back later</p>
            </div>
          ) : (
            viewMode === 'grid' ? (
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
            ) : (
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
            )
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