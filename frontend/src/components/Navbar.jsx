import { useState, useEffect } from "react"
import { useLanguage } from "../LanguageContext"

function Navbar({ onLoginClick, onSignupClick, darkMode, toggleDarkMode, onSearch, searchTerm }) {
  const { language, setLanguage, t } = useLanguage()
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '')
  const [user, setUser] = useState(null)

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

  const changeLanguage = (lang) => {
    setLanguage(lang)
    setShowLanguageDropdown(false)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setLocalSearchTerm(value)
    onSearch(value)
  }

  const getLanguageDisplay = () => {
    switch(language) {
      case 'hi': return 'हिंदी'
      case 'pa': return 'ਪੰਜਾਬੀ'
      default: return 'English'
    }
  }

  return (
    <nav className={`navbar ${darkMode ? 'navbar-dark' : ''}`}>
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
          placeholder={t('searchPlaceholder')} 
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
            {darkMode ? t('light') : t('dark')}
          </span>
        </button>

        <div className="language-selector">
          <button 
            className={`language-btn ${darkMode ? 'language-btn-dark' : ''}`}
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          >
            <span className="language-icon">🌐</span>
            <span className="language-text">
              {getLanguageDisplay()}
            </span>
            <span className="dropdown-arrow">{showLanguageDropdown ? '▲' : '▼'}</span>
          </button>
          
          {showLanguageDropdown && (
            <div className={`language-dropdown ${darkMode ? 'language-dropdown-dark' : ''}`}>
              <button 
                className={`language-option ${language === 'en' ? 'active' : ''} ${darkMode ? 'language-option-dark' : ''}`}
                onClick={() => changeLanguage('en')}
              >
                <span>🇬🇧</span> English
              </button>
              <button 
                className={`language-option ${language === 'hi' ? 'active' : ''} ${darkMode ? 'language-option-dark' : ''}`}
                onClick={() => changeLanguage('hi')}
              >
                <span>🇮🇳</span> हिंदी
              </button>
              <button 
                className={`language-option ${language === 'pa' ? 'active' : ''} ${darkMode ? 'language-option-dark' : ''}`}
                onClick={() => changeLanguage('pa')}
              >
                <span>🇮🇳</span> ਪੰਜਾਬੀ
              </button>
            </div>
          )}
        </div>

        {user ? (
          <div className="user-profile">
            <span className="user-greeting">
              👋 {user.fullName?.split(' ')[0] || 'User'}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              {t('logout')}
            </button>
          </div>
        ) : (
          <div className="nav-buttons">
            <button className={`login-btn ${darkMode ? 'login-btn-dark' : ''}`} onClick={onLoginClick}>
              {t('login')}
            </button>
            <button className={`signup-btn ${darkMode ? 'signup-btn-dark' : ''}`} onClick={onSignupClick}>
              {t('signup')}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar