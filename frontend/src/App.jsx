import Navbar from "./components/Navbar"

function App() {
  return (
    <div>
      <Navbar />

      <div className="hero">
        <h1>Fair & Direct Crop Marketplace</h1>
        <p>Connecting Farmers with NGOs & Bulk Buyers</p>

        <div className="buttons">
          <button>I am a Farmer</button>
          <button>I am a Buyer</button>
        </div>
      </div>
    </div>
  )
}

export default App