import { useState } from "react"
import CropListingModal from "../components/CropListingModal"
import FarmerOffers from "./FarmerOffers"
import { useLanguage } from "../LanguageContext"

function Farmer({ darkMode, onBackToHome }) {
  const { t } = useLanguage()
  const [showListingModal, setShowListingModal] = useState(false)
  const [activeTab, setActiveTab] = useState('listings')
  const [myCrops, setMyCrops] = useState([
    {
      id: 1,
      name: "Wheat",
      price: 2200,
      quantity: 500,
      unit: "Quintal",
      status: "active",
      views: 45,
      offers: 3,
      image: "https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg"
    },
    {
      id: 2,
      name: "Rice",
      price: 3100,
      quantity: 800,
      unit: "Quintal",
      status: "active",
      views: 32,
      offers: 2,
      image: "https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg"
    },
    {
      id: 3,
      name: "Corn",
      price: 1800,
      quantity: 300,
      unit: "Quintal",
      status: "pending",
      views: 18,
      offers: 1,
      image: "https://missourisouthernseed.com/wp-content/uploads/2020/02/reids-yellow-dent-corn.jpg"
    },
    {
      id: 4,
      name: "Barley",
      price: 1900,
      quantity: 400,
      unit: "Quintal",
      status: "active",
      views: 22,
      offers: 2,
      image: "https://www.farmatma.in/wp-content/uploads/2019/05/barley-crop.jpg"
    },
    {
      id: 5,
      name: "Soybean",
      price: 4200,
      quantity: 200,
      unit: "Quintal",
      status: "active",
      views: 15,
      offers: 1,
      image: "https://images.pexels.com/photos/3843088/pexels-photo-3843088.jpeg"
    }
  ])

  // Calculate dashboard stats
  const totalCrops = myCrops.length
  const activeListings = myCrops.filter(c => c.status === 'active').length
  const totalValue = myCrops.reduce((sum, crop) => sum + (crop.price * crop.quantity), 0)
  const totalOffers = myCrops.reduce((sum, crop) => sum + (crop.offers || 0), 0)
  const totalViews = myCrops.reduce((sum, crop) => sum + (crop.views || 0), 0)

  // Recent activity (mock data)
  const recentActivities = [
    { id: 1, text: "New offer received on Wheat - ₹2100", time: "2 minutes ago", type: "offer" },
    { id: 2, text: "Your Rice listing was viewed by 5 buyers", time: "1 hour ago", type: "view" },
    { id: 3, text: "Delhi University Hostel showed interest in Corn", time: "3 hours ago", type: "interest" },
    { id: 4, text: "Offer accepted for Barley - Transaction completed", time: "1 day ago", type: "success" },
    { id: 5, text: "New buyer registered from Mumbai", time: "2 days ago", type: "info" }
  ]

  const handleAddCrop = (newCrop) => {
    setMyCrops([...myCrops, { 
      ...newCrop, 
      status: "active",
      views: 0,
      offers: 0,
      id: myCrops.length + 1
    }])
    alert(t('cropListed'))
  }

  return (
    <div className="farmer-dashboard animate-page">
      {/* Back Button */}
      <div className="page-header">
        <button className="back-button" onClick={onBackToHome}>
          <span className="back-icon">←</span>
          <span className="back-text">{t('backToHome')}</span>
        </button>
      </div>

      {/* Header Section */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">👨‍🌾 {t('farmerDashboard')}</h1>
          <p className="dashboard-welcome">Welcome back, Rajesh! Here's your farm summary.</p>
        </div>
        <button 
          className="add-crop-btn"
          onClick={() => setShowListingModal(true)}
        >
          <span className="btn-icon">+</span>
          <span className="btn-text">{t('listNewCrop')}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card-large">
          <div className="stat-icon">🌾</div>
          <div className="stat-content">
            <span className="stat-value">{totalCrops}</span>
            <span className="stat-label">{t('totalCrops')}</span>
          </div>
          <div className="stat-trend positive">+2 this month</div>
        </div>

        <div className="stat-card-large">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <span className="stat-value">{activeListings}</span>
            <span className="stat-label">{t('activeListings')}</span>
          </div>
          <div className="stat-trend positive">+3 this week</div>
        </div>

        <div className="stat-card-large">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <span className="stat-value">₹{(totalValue/1000).toFixed(1)}K</span>
            <span className="stat-label">Total Value</span>
          </div>
          <div className="stat-trend positive">+15%</div>
        </div>

        <div className="stat-card-large">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <span className="stat-value">{totalOffers}</span>
            <span className="stat-label">Total Offers</span>
          </div>
          <div className="stat-trend">{totalViews} views</div>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="insights-section">
        <div className="insights-header">
          <h3>📊 Quick Insights</h3>
          <span className="insights-update">Updated just now</span>
        </div>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-title">Popular Crops</div>
            <div className="insight-bars">
              <div className="insight-bar-item">
                <span className="bar-label">Wheat</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '80%'}}></div>
                </div>
                <span className="bar-value">8 offers</span>
              </div>
              <div className="insight-bar-item">
                <span className="bar-label">Rice</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '60%'}}></div>
                </div>
                <span className="bar-value">6 offers</span>
              </div>
              <div className="insight-bar-item">
                <span className="bar-label">Corn</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '40%'}}></div>
                </div>
                <span className="bar-value">4 offers</span>
              </div>
              <div className="insight-bar-item">
                <span className="bar-label">Barley</span>
                <div className="bar-container">
                  <div className="bar-fill" style={{width: '30%'}}></div>
                </div>
                <span className="bar-value">3 offers</span>
              </div>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-title">Buyer Interest</div>
            <div className="interest-items">
              <div className="interest-item">
                <span className="interest-badge">🔥</span>
                <span className="interest-text">3 buyers interested in Wheat</span>
              </div>
              <div className="interest-item">
                <span className="interest-badge">📢</span>
                <span className="interest-text">2 new offers waiting</span>
              </div>
              <div className="interest-item">
                <span className="interest-badge">⭐</span>
                <span className="interest-text">5 star rating from Delhi University</span>
              </div>
              <div className="interest-item">
                <span className="interest-badge">📊</span>
                <span className="interest-text">Your crops viewed 132 times this week</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          📋 {t('myListings')} ({myCrops.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'offers' ? 'active' : ''}`}
          onClick={() => setActiveTab('offers')}
        >
          💰 {t('offersReceived')} ({totalOffers})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          🔄 Recent Activity
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'listings' && (
        <div className="my-crops-section">
          <div className="crops-header">
            <h2>{t('myCrops')}</h2>
            <div className="crops-filters">
              <select className="filter-select">
                <option>All Crops</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Sold</option>
              </select>
              <button className="filter-sort-btn">Sort by ↓</button>
            </div>
          </div>
          
          {myCrops.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🌾</span>
              <h3>{t('noCropsListed')}</h3>
              <p>Start by listing your first crop and connect with buyers!</p>
              <button onClick={() => setShowListingModal(true)}>
                {t('listFirstCrop')}
              </button>
            </div>
          ) : (
            <div className="crops-grid-modern">
              {myCrops.map((crop, index) => (
                <div key={crop.id} className="crop-card-modern animate-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="crop-image">
                    <img src={crop.image} alt={crop.name} />
                    <span className={`crop-status ${crop.status}`}>{crop.status}</span>
                  </div>
                  <div className="crop-details">
                    <h3>{crop.name}</h3>
                    <div className="crop-meta">
                      <span className="crop-price">₹{crop.price}/{crop.unit}</span>
                      <span className="crop-quantity">{crop.quantity} {crop.unit}</span>
                    </div>
                    <div className="crop-stats">
                      <span className="crop-stat">👁️ {crop.views} views</span>
                      <span className="crop-stat">📦 {crop.offers} offers</span>
                    </div>
                    <div className="crop-actions">
                      <button className="edit-btn">✏️ Edit</button>
                      <button className="view-offers-btn">📋 View Offers</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'offers' && (
        <FarmerOffers darkMode={darkMode} />
      )}

      {activeTab === 'activity' && (
        <div className="activity-section">
          <h3>Recent Activity</h3>
          <div className="activity-timeline">
            {recentActivities.map(activity => (
              <div key={activity.id} className={`activity-item ${activity.type}`}>
                <div className="activity-time">{activity.time}</div>
                <div className="activity-text">{activity.text}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CropListingModal
        isOpen={showListingModal}
        onClose={() => setShowListingModal(false)}
        onAddCrop={handleAddCrop}
        darkMode={darkMode}
      />
    </div>
  )
}

export default Farmer