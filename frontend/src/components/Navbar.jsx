import { useState } from "react"

function Navbar({ onLoginClick, onSignupClick, darkMode, toggleDarkMode, onSearch, searchTerm }) {
  const [language, setLanguage] = useState('english')
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '')

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
    onSearch(value)  // ✅ Pass search term to parent
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
          placeholder={language === 'hindi' ? "फसलें खोजें..." : "Search crops..."} 
          className={`search-bar ${darkMode ? 'search-bar-dark' : ''}`}
          value={localSearchTerm}
          onChange={handleSearchChange}  // ✅ Handle search
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

        <div className="nav-buttons">
          <button className={`login-btn ${darkMode ? 'login-btn-dark' : ''}`} onClick={onLoginClick}>
            {language === 'hindi' ? 'लॉगिन' : 'Login'}
          </button>
          <button className={`signup-btn ${darkMode ? 'signup-btn-dark' : ''}`} onClick={onSignupClick}>
            {language === 'hindi' ? 'साइन अप' : 'Sign Up'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar