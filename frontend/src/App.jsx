import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Farmer from "./pages/Farmer"
import Buyer from "./pages/Buyer"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Footer from "./components/Footer"  // ✅ Add this import

function App() {
  const [role, setRole] = useState(null)
  const [currentPage, setCurrentPage] = useState('home')
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [crops, setCrops] = useState([
    { id: 1, name: "Wheat", price: 2200, unit: "Quintal", image: "https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg" },
    { id: 2, name: "Rice", price: 3100, unit: "Quintal", image: "https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg" },
    { id: 3, name: "Corn", price: 1800, unit: "Quintal", image: "https://missourisouthernseed.com/wp-content/uploads/2020/02/reids-yellow-dent-corn.jpg" },
    { id: 4, name: "Barley", price: 1900, unit: "Quintal", image: "https://tse3.mm.bing.net/th/id/OIP.X-bhErQP9Jf_pSLBWIQ1jQHaE5?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 5, name: "Soybean", price: 4200, unit: "Quintal", image: "https://img.freepik.com/premium-photo/soybean-field-beginning-planting-season_124507-221294.jpg?w=2000" },
    { id: 6, name: "Millet", price: 2600, unit: "Quintal", image: "https://morningchores.com/wp-content/uploads/2022/04/millet-plants.jpg" }
  ])

  const filteredCrops = crops.filter(crop => 
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode))
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleLoginClick = () => {
    setCurrentPage('login')
  }

  const handleSignupClick = () => {
    setCurrentPage('signup')
  }

  const handleBackToHome = () => {
    setCurrentPage('home')
    setRole(null)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  if (currentPage === 'login') {
    return <Login onBackToHome={handleBackToHome} darkMode={darkMode} />
  }

  if (currentPage === 'signup') {
    return <Signup onBackToHome={handleBackToHome} darkMode={darkMode} />
  }

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Navbar 
        onLoginClick={handleLoginClick} 
        onSignupClick={handleSignupClick}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />

      {!role && (
        <>
          <div className="hero-section">
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1 className="hero-title">Fair & Direct Crop Marketplace</h1>
              <p className="hero-subtitle">Connecting Farmers with NGOs & Bulk Buyers</p>
              
              <div className="hero-buttons">
                <button className="hero-btn farmer-btn" onClick={() => setRole("farmer")}>
                  <span className="btn-icon">👨‍🌾</span>
                  I am a Farmer
                </button>
                <button className="hero-btn buyer-btn" onClick={() => setRole("buyer")}>
                  <span className="btn-icon">🏢</span>
                  I am a Buyer
                </button>
              </div>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">10,000+</span>
                  <span className="stat-label">Farmers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Buyers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Crops</span>
                </div>
              </div>
            </div>
          </div>

          {searchTerm && (
            <div className="search-results-info">
              <p>{filteredCrops.length} crops found for "{searchTerm}"</p>
            </div>
          )}

          <div className="crop-showcase">
            {filteredCrops.length > 0 ? (
              filteredCrops.map(crop => (
                <div className="crop-item" key={crop.id}>
                  <img src={crop.image} alt={crop.name} />
                  <h3>{crop.name}</h3>
                  <p>₹{crop.price} / {crop.unit}</p>
                  <button>View Details</button>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No crops found. Try searching for something else!</p>
              </div>
            )}
          </div>
        </>
      )}

      {role === "farmer" && <Farmer darkMode={darkMode} />}
      {role === "buyer" && <Buyer darkMode={darkMode} />}

      {/* ✅ Footer - Always show at bottom */}
      <Footer />
    </div>
  )
}

export default App