import { useState } from "react"

function Navbar({ onLoginClick, onSignupClick }) {
  const [language, setLanguage] = useState('english')
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown)
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
    setShowLanguageDropdown(false)
    // Yeh alert sirf demo ke liye hai - actual translation logic baad mein ayega
    alert(`Language changed to ${lang === 'hindi' ? 'Hindi' : 'English'} (Demo)`)
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div 
          className="logo"
          onClick={() => window.location.reload()}
        >
          <span className="logo-icon">🌾</span>
          <span className="logo-text">CropConnect</span>
        </div>
      </div>

      <div className="search-container">
        <input 
          type="text" 
          placeholder={language === 'hindi' ? "फसलें खोजें..." : "Search crops..."} 
          className="search-bar"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="nav-right">
        {/* Language Dropdown */}
        <div className="language-selector">
          <button 
            className="language-btn"
            onClick={toggleLanguageDropdown}
          >
            <span className="language-icon">🌐</span>
            <span className="language-text">
              {language === 'hindi' ? 'हिंदी' : 'English'}
            </span>
            <span className="dropdown-arrow">{showLanguageDropdown ? '▲' : '▼'}</span>
          </button>
          
          {showLanguageDropdown && (
            <div className="language-dropdown">
              <button 
                className={`language-option ${language === 'english' ? 'active' : ''}`}
                onClick={() => changeLanguage('english')}
              >
                <span>🇬🇧</span> English
              </button>
              <button 
                className={`language-option ${language === 'hindi' ? 'active' : ''}`}
                onClick={() => changeLanguage('hindi')}
              >
                <span>🇮🇳</span> हिंदी
              </button>
            </div>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="nav-buttons">
          <button className="login-btn" onClick={onLoginClick}>
            {language === 'hindi' ? 'लॉगिन' : 'Login'}
          </button>
          <button className="signup-btn" onClick={onSignupClick}>
            {language === 'hindi' ? 'साइन अप' : 'Sign Up'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar