import { useState, useEffect } from "react"
import CropCard from "../components/CropCard"
import FilterBar from "../components/FilterBar"
import MapView from "../components/MapView"
import { useLanguage } from "../LanguageContext"
import { cropsData } from "../data/cropsData"

function Buyer({ darkMode, onBackToHome, initialCategory = 'all' }) {
  const { t } = useLanguage()
  const [allCrops, setAllCrops] = useState([])
  const [filteredCrops, setFilteredCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [myOffers, setMyOffers] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    sortBy: 'newest',
    minPrice: '',
    maxPrice: '',
    location: ''
  })

  // Categories
  const categories = [
    { id: "all", name: t('allCrops'), icon: "🌾" },
    { id: "grains", name: t('grains'), icon: "🌾" },
    { id: "pulses", name: t('pulses'), icon: "🌱" },
    { id: "vegetables", name: t('vegetables'), icon: "🥬" },
    { id: "fruits", name: t('fruits'), icon: "🍎" }
  ]

  // Load crops from cropsData
  useEffect(() => {
    setLoading(true)
    try {
      setAllCrops(cropsData)
      
      if (initialCategory !== 'all') {
        const filtered = cropsData.filter(c => c.category === initialCategory)
        setFilteredCrops(filtered)
      } else {
        setFilteredCrops(cropsData)
      }
      
      setError(null)
    } catch (error) {
      console.error('Error loading crops:', error)
      setError(t('error'))
    } finally {
      setLoading(false)
    }
  }, [initialCategory])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    let filtered = [...allCrops]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => 
        c.category?.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    if (newFilters.minPrice) {
      filtered = filtered.filter(c => c.price >= parseInt(newFilters.minPrice))
    }
    if (newFilters.maxPrice) {
      filtered = filtered.filter(c => c.price <= parseInt(newFilters.maxPrice))
    }
    
    if (newFilters.location) {
      filtered = filtered.filter(c => 
        c.location?.toLowerCase().includes(newFilters.location.toLowerCase())
      )
    }

    switch (newFilters.sortBy) {
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
        break
    }

    setFilteredCrops(filtered)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    
    if (category === 'all') {
      setFilteredCrops(allCrops)
    } else {
      const filtered = allCrops.filter(c => 
        c.category?.toLowerCase() === category.toLowerCase()
      )
      setFilteredCrops(filtered)
    }
    
    setFilters({
      sortBy: 'newest',
      minPrice: '',
      maxPrice: '',
      location: ''
    })
  }

  // NEW: Handle offer submission directly
  const handleOfferSubmit = (offer) => {
    // Add to my offers list
    setMyOffers([...myOffers, { ...offer, status: 'pending' }])
    
    // Show success message (can be removed if you don't want it)
    alert(`✅ Offer sent for ${offer.cropName}!`)
    
    // No modal opening here!
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>❌ {t('error')}</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>{t('retry')}</button>
      </div>
    )
  }

  return (
    <div className="buyer-marketplace animate-page">
      {/* Back Button */}
      <div className="page-header">
        <button className="back-button" onClick={onBackToHome}>
          <span className="back-icon">←</span>
          <span className="back-text">{t('backToHome')}</span>
        </button>
      </div>

      {/* Header */}
      <div className="marketplace-header">
        <h1>🏢 {t('buyerMarketplace')}</h1>
        <p className="subtitle">{t('browseCrops', { count: allCrops.length })}</p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat.id)}
          >
            {cat.icon} {cat.name} 
            {cat.id !== 'all' && `(${allCrops.filter(c => c.category === cat.id).length})`}
          </button>
        ))}
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <button 
          className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => setViewMode('grid')}
        >
          📇 {t('gridView')}
        </button>
        <button 
          className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
          onClick={() => setViewMode('map')}
        >
          🗺️ {t('mapView')}
        </button>
      </div>

      {/* My Offers Summary */}
      {myOffers.length > 0 && (
        <div className="my-offers-summary">
          <h3>📦 {t('myOffers')} ({myOffers.length})</h3>
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

      {/* Filter Bar */}
      <FilterBar onFilterChange={handleFilterChange} darkMode={darkMode} filters={filters} />

      {/* Results Info */}
      {!loading && (
        <div className="results-info">
          <p>{t('showing', { filtered: filteredCrops.length, total: allCrops.length })}</p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="loading-state">
          <div className="loader"></div>
          <p>{t('loading')}</p>
        </div>
      ) : (
        <>
          {/* No Results */}
          {filteredCrops.length === 0 ? (
            <div className="no-results-marketplace">
              <span className="no-results-icon">🌾</span>
              <h3>{t('noCrops')}</h3>
              <p>{t('adjustFilters')}</p>
            </div>
          ) : (
            /* Grid View */
            viewMode === 'grid' ? (
              <div className="crops-grid">
                {filteredCrops.map((crop) => (
                  <CropCard 
                    key={crop.id} 
                    crop={crop} 
                    onViewDetails={handleOfferSubmit} // Now this handles offers directly
                    darkMode={darkMode}
                  />
                ))}
              </div>
            ) : (
              /* Map View */
              <div className="map-view-section">
                <MapView 
                  crops={filteredCrops}
                  darkMode={darkMode}
                />
                <div className="map-legend">
                  <div className="legend-item">
                    <span className="legend-dot green"></span>
                    <span>{t('farmerLocations')} ({filteredCrops.length})</span>
                  </div>
                  <p className="map-hint">{t('mapHint')}</p>
                </div>
              </div>
            )
          )}
        </>
      )}
    </div>
  )
}

export default Buyer