import { useState } from "react"
import CropListingModal from "../components/CropListingModal"
import FarmerOffers from "./FarmerOffers"
import { useLanguage } from "../LanguageContext"

function Farmer({ darkMode }) {
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
      status: "active"
    }
  ])

  const handleAddCrop = (newCrop) => {
    setMyCrops([...myCrops, { ...newCrop, status: "active" }])
    alert(t('cropListed'))
  }

  return (
    <div className="farmer-dashboard">
      <div className="dashboard-header">
        <h1>👨‍🌾 {t('farmerDashboard')}</h1>
        <button 
          className="add-crop-btn"
          onClick={() => setShowListingModal(true)}
        >
          + {t('listNewCrop')}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          📋 {t('myListings')}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'offers' ? 'active' : ''}`}
          onClick={() => setActiveTab('offers')}
        >
          💰 {t('offersReceived')}
        </button>
      </div>

      {activeTab === 'listings' ? (
        <>
          <div className="dashboard-stats">
            <div className="stat-card">
              <span className="stat-value">{myCrops.length}</span>
              <span className="stat-label">{t('totalCrops')}</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">
                {myCrops.filter(c => c.status === 'active').length}
              </span>
              <span className="stat-label">{t('activeListings')}</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">2</span>
              <span className="stat-label">{t('offersReceived')}</span>
            </div>
          </div>

          <div className="my-crops-section">
            <h2>{t('myCrops')}</h2>
            
            {myCrops.length === 0 ? (
              <div className="empty-state">
                <p>{t('noCropsListed')}</p>
                <button onClick={() => setShowListingModal(true)}>
                  {t('listFirstCrop')}
                </button>
              </div>
            ) : (
              <div className="crops-table">
                <table>
                  <thead>
                    <tr>
                      <th>{t('crop')}</th>
                      <th>{t('price')}</th>
                      <th>{t('quantity')}</th>
                      <th>{t('status')}</th>
                      <th>{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myCrops.map(crop => (
                      <tr key={crop.id}>
                        <td>{crop.name}</td>
                        <td>₹{crop.price}/{crop.unit}</td>
                        <td>{crop.quantity} {crop.unit}</td>
                        <td>
                          <span className={`status-badge ${crop.status}`}>
                            {crop.status}
                          </span>
                        </td>
                        <td>
                          <button className="edit-btn">{t('edit')}</button>
                          <button className="delete-btn">{t('delete')}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        <FarmerOffers darkMode={darkMode} />
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