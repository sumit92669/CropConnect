import { useState, useEffect } from "react"
import CropCard from "../components/CropCard"
import FilterBar from "../components/FilterBar"
import CropDetailModal from "../components/CropDetailModal"
import OfferModal from "../components/OfferModal"
import MapView from "../components/MapView"
import { useLanguage } from "../LanguageContext"

const API_URL = 'http://localhost:5001/api';

function Buyer({ darkMode }) {
  const { t } = useLanguage()
  const [allCrops, setAllCrops] = useState([])
  const [filteredCrops, setFilteredCrops] = useState([])
  const [selectedCrop, setSelectedCrop] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [myOffers, setMyOffers] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/crops`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch crops');
        }
        
        const data = await response.json();
        console.log('Crops fetched:', data.length);
        
        setAllCrops(data);
        setFilteredCrops(data);
        setSelectedCategory('all');
        setError(null);
      } catch (error) {
        console.error('Error fetching crops:', error);
        setError(t('error'));
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const categories = [
    { id: "all", name: t('allCrops'), icon: "🌾" },
    { id: "grains", name: t('grains'), icon: "🌾" },
    { id: "pulses", name: t('pulses'), icon: "🌱" },
    { id: "vegetables", name: t('vegetables'), icon: "🥬" },
    { id: "fruits", name: t('fruits'), icon: "🍎" }
  ];

  const handleFilterChange = (filters) => {
    let filtered = [...allCrops];

    if (filters.minPrice) {
      filtered = filtered.filter(c => c.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(c => c.price <= parseInt(filters.maxPrice));
    }
    if (filters.location) {
      filtered = filtered.filter(c => 
        c.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredCrops(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    
    if (category === 'all') {
      setFilteredCrops(allCrops);
    } else {
      const filtered = allCrops.filter(c => c.category === category);
      setFilteredCrops(filtered);
    }
  };

  const handleViewDetails = (crop) => {
    setSelectedCrop(crop);
    setShowDetailModal(true);
  };

  const handleMakeOffer = (crop) => {
    setSelectedCrop(crop);
    setShowDetailModal(false);
    setShowOfferModal(true);
  };

  const handleSubmitOffer = async (offer) => {
    try {
      console.log('Offer submitted:', offer);
      setMyOffers([...myOffers, { ...offer, status: 'pending' }]);
      alert(t('offerSent', { crop: offer.cropName }));
    } catch (error) {
      console.error('Error submitting offer:', error);
      alert(t('error'));
    }
  };

  if (error) {
    return (
      <div className="error-state">
        <h3>❌ {t('error')}</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>{t('retry')}</button>
      </div>
    );
  }

  return (
    <div className="buyer-marketplace">
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
            {cat.icon} {cat.name} {cat.id !== 'all' && `(${allCrops.filter(c => c.category === cat.id).length})`}
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

      <FilterBar onFilterChange={handleFilterChange} darkMode={darkMode} />

      {loading ? (
        <div className="loading-state">
          <div className="loader"></div>
          <p>{t('loading')}</p>
        </div>
      ) : (
        <>
          <div className="results-info">
            <p>{t('showing', { filtered: filteredCrops.length, total: allCrops.length })}</p>
          </div>

          {filteredCrops.length === 0 ? (
            <div className="no-results-marketplace">
              <span className="no-results-icon">🌾</span>
              <h3>{t('noCrops')}</h3>
              <p>{t('adjustFilters')}</p>
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
  );
}

export default Buyer;