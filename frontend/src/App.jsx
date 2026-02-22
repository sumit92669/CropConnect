import { useState } from "react"
import Navbar from "./components/Navbar"
import Farmer from "./pages/Farmer"
import Buyer from "./pages/Buyer"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  const [role, setRole] = useState(null)
  const [currentPage, setCurrentPage] = useState('home') // 'home', 'login', 'signup'

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

  // Render different pages based on currentPage
  if (currentPage === 'login') {
    return <Login onBackToHome={handleBackToHome} />
  }

  if (currentPage === 'signup') {
    return <Signup onBackToHome={handleBackToHome} />
  }

  // Original home page with role selection
  return (
    <div>
      <Navbar 
        onLoginClick={handleLoginClick} 
        onSignupClick={handleSignupClick} 
      />

      {!role && (
        <>
          <div className="hero">
            <h1>Fair & Direct Crop Marketplace</h1>
            <p>Connecting Farmers with NGOs & Bulk Buyers</p>

            <div className="buttons">
              <button onClick={() => setRole("farmer")}>
                I am a Farmer
              </button>

              <button onClick={() => setRole("buyer")}>
                I am a Buyer
              </button>
            </div>
          </div>

          <div className="crop-showcase">
            <div className="crop-item">
              <img src="https://cdn.britannica.com/90/94190-050-C0BA6A58/Cereal-crops-wheat-reproduction.jpg" alt="Wheat" />
              <h3>Wheat</h3>
              <p>₹2200 / Quintal</p>
              <button>View Details</button>
            </div>

            <div className="crop-item">
              <img src="https://cdn.britannica.com/89/140889-050-EC3F00BF/Ripening-heads-rice-Oryza-sativa.jpg" alt="Rice" />
              <h3>Rice</h3>
              <p>₹3100 / Quintal</p>
              <button>View Details</button>
            </div>

            <div className="crop-item">
              <img src="https://missourisouthernseed.com/wp-content/uploads/2020/02/reids-yellow-dent-corn.jpg" alt="Corn" />
              <h3>Corn</h3>
              <p>₹1800 / Quintal</p>
              <button>View Details</button>
            </div>

            <div className="crop-item">
              <img src="https://tse3.mm.bing.net/th/id/OIP.X-bhErQP9Jf_pSLBWIQ1jQHaE5?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Barley" />
              <h3>Barley</h3>
              <p>₹1900 / Quintal</p>
              <button>View Details</button>
            </div>

            <div className="crop-item">
              <img src="https://img.freepik.com/premium-photo/soybean-field-beginning-planting-season_124507-221294.jpg?w=2000" alt="Soybean" />
              <h3>Soybean</h3>
              <p>₹4200 / Quintal</p>
              <button>View Details</button>
            </div>

            <div className="crop-item">
              <img src="https://morningchores.com/wp-content/uploads/2022/04/millet-plants.jpg" alt="Millet" />
              <h3>Millet</h3>
              <p>₹2600 / Quintal</p>
              <button>View Details</button>
            </div>
          </div>
        </>
      )}

      {role === "farmer" && <Farmer />}
      {role === "buyer" && <Buyer />}
    </div>
  )
}

export default App