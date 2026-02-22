import { useState } from "react"
import Navbar from "./components/Navbar"
import Farmer from "./pages/Farmer"
import Buyer from "./pages/Buyer"

function App() {
  const [role, setRole] = useState(null)

  return (
    <div>
      <Navbar />

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
              <img src="https://source.unsplash.com/300x200/?wheat" />
              <h3>Wheat</h3>
              <p>₹2200 / Quintal</p>
            </div>

            <div className="crop-item">
              <img src="https://source.unsplash.com/300x200/?rice" />
              <h3>Rice</h3>
              <p>₹3100 / Quintal</p>
            </div>

            <div className="crop-item">
              <img src="https://source.unsplash.com/300x200/?corn" />
              <h3>Corn</h3>
              <p>₹1800 / Quintal</p>
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