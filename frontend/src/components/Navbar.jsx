import { useState, useEffect } from "react"

function Navbar({ onLoginClick, onSignupClick, darkMode, toggleDarkMode, onSearch, searchTerm }) {
  const [language, setLanguage] = useState('english')
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '')
  const [user, setUser] = useState(null)

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/'
  }

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown)
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
    setShowLanguageDropdown(false)
    alert(`Language changed to ${lang === 'hindi' ? 'Hindi' : 'English'} (Demo)`)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setLocalSearchTerm(value)
    onSearch(value)
  }

  return (
    <nav className={`navbar ${darkMode ? 'navbar-dark' : ''}`}>
      <div className="nav-left">
        <div className="logo" onClick={() => window.location.reload()}>
          {/* 🌾 Beautiful CropConnect Logo */}
          <span className="logo-icon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background Circle */}
              <circle cx="18" cy="18" r="16" fill="#16A34A" />
              
              {/* Wheat Stalk */}
              <path d="M18 8V24" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
              
              {/* Wheat Grains */}
              <circle cx="18" cy="8" r="3" fill="#FBBF24" />
              <circle cx="12" cy="12" r="2.5" fill="#FBBF24" />
              <circle cx="24" cy="12" r="2.5" fill="#FBBF24" />
              <circle cx="15" cy="18" r="2.5" fill="#FBBF24" />
              <circle cx="21" cy="18" r="2.5" fill="#FBBF24" />
              
              {/* Leaves */}
              <path d="M10 10L6 6M26 10L30 6" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
              
              {/* Farmer Hat (optional) */}
              <path d="M18 4L22 6L18 8L14 6L18 4Z" fill="#8B5A2B" />
              
              {/* White Inner Glow */}
              <circle cx="18" cy="18" r="14" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
            </svg>
          </span>
          <span className="logo-text">CropConnect</span>
        </div>
      </div>

      <div className="search-container">
        <input 
          type="text" 
          placeholder={language === 'hindi' ? "फसलें खोजें..." : "Search crops..."} 
          className={`search-bar ${darkMode ? 'search-bar-dark' : ''}`}
          value={localSearchTerm}
          onChange={handleSearchChange}
        />
        <span className="search-icon">🔍</span>
        {localSearchTerm && (
          <button 
            className="clear-search"
            onClick={() => {
              setLocalSearchTerm('')
              onSearch('')
            }}
          >
            ✕
          </button>
        )}
      </div>

      <div className="nav-right">
        <button 
          className={`dark-mode-toggle ${darkMode ? 'dark' : ''}`}
          onClick={toggleDarkMode}
        >
          <span className="toggle-icon">
            {darkMode ? '☀️' : '🌙'}
          </span>
          <span className="toggle-text">
            {darkMode ? 'Light' : 'Dark'}
          </span>
        </button>

        <div className="language-selector">
          <button 
            className={`language-btn ${darkMode ? 'language-btn-dark' : ''}`}
            onClick={toggleLanguageDropdown}
          >
            <span className="language-icon">🌐</span>
            <span className="language-text">
              {language === 'hindi' ? 'हिंदी' : 'English'}
            </span>
            <span className="dropdown-arrow">{showLanguageDropdown ? '▲' : '▼'}</span>
          </button>
          
          {showLanguageDropdown && (
            <div className={`language-dropdown ${darkMode ? 'language-dropdown-dark' : ''}`}>
              <button 
                className={`language-option ${language === 'english' ? 'active' : ''} ${darkMode ? 'language-option-dark' : ''}`}
                onClick={() => changeLanguage('english')}
              >
                <span>🇬🇧</span> English
              </button>
              <button 
                className={`language-option ${language === 'hindi' ? 'active' : ''} ${darkMode ? 'language-option-dark' : ''}`}
                onClick={() => changeLanguage('hindi')}
              >
                <span>🇮🇳</span> हिंदी
              </button>
            </div>
          )}
        </div>

        {user ? (
          // Logged in state
          <div className="user-profile">
            <span className="user-greeting">
              👋 {user.fullName?.split(' ')[0] || 'User'}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          // Logged out state
          <div className="nav-buttons">
            <button className={`login-btn ${darkMode ? 'login-btn-dark' : ''}`} onClick={onLoginClick}>
              {language === 'hindi' ? 'लॉगिन' : 'Login'}
            </button>
            <button className={`signup-btn ${darkMode ? 'signup-btn-dark' : ''}`} onClick={onSignupClick}>
              {language === 'hindi' ? 'साइन अप' : 'Sign Up'}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar