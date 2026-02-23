import { useState } from "react"
import CropListingModal from "../components/CropListingModal"
import FarmerOffers from "./FarmerOffers"  // ✅ Add this

function Farmer({ darkMode }) {
  const [showListingModal, setShowListingModal] = useState(false)
  const [activeTab, setActiveTab] = useState('listings') // 'listings' or 'offers'  // ✅ Add this
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
    alert("Crop listed successfully!")
  }

  return (
    <div className="farmer-dashboard">
      <div className="dashboard-header">
        <h1>👨‍🌾 Farmer Dashboard</h1>
        <button 
          className="add-crop-btn"
          onClick={() => setShowListingModal(true)}
        >
          + List New Crop
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          📋 My Listings
        </button>
        <button 
          className={`tab-btn ${activeTab === 'offers' ? 'active' : ''}`}
          onClick={() => setActiveTab('offers')}
        >
          💰 Offers Received
        </button>
      </div>

      {activeTab === 'listings' ? (
        <>
          <div className="dashboard-stats">
            <div className="stat-card">
              <span className="stat-value">{myCrops.length}</span>
              <span className="stat-label">Total Crops</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">
                {myCrops.filter(c => c.status === 'active').length}
              </span>
              <span className="stat-label">Active Listings</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">2</span>
              <span className="stat-label">Offers Received</span>
            </div>
          </div>

          <div className="my-crops-section">
            <h2>My Crop Listings</h2>
            
            {myCrops.length === 0 ? (
              <div className="empty-state">
                <p>You haven't listed any crops yet.</p>
                <button onClick={() => setShowListingModal(true)}>
                  List Your First Crop
                </button>
              </div>
            ) : (
              <div className="crops-table">
                <table>
                  <thead>
                    <tr>
                      <th>Crop</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Actions</th>
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
                          <button className="edit-btn">Edit</button>
                          <button className="delete-btn">Delete</button>
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