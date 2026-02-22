function Navbar() {
  return (
    <nav className="navbar">
      <div 
        className="logo"
        onClick={() => window.location.reload()}
      >
        🌾 CropConnect
      </div>

      <input 
        type="text" 
        placeholder="Search crops..." 
        className="search-bar"
      />

      <div className="nav-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  )
}

export default Navbar