import { useState } from "react"

function Signup({ onBackToHome, darkMode }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "farmer",
    location: "",
    agreeTerms: false
  })

  const [passwordMatch, setPasswordMatch] = useState(true)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }
      
      // Check password match
      if (name === "password" || name === "confirmPassword") {
        const pass = name === "password" ? value : prev.password
        const confirm = name === "confirmPassword" ? value : prev.confirmPassword
        setPasswordMatch(pass === confirm)
      }
      
      return newData
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!passwordMatch) {
      alert("Passwords don't match!")
      return
    }

    console.log("Signup attempt:", formData)
    alert(`Signup successful! (Demo) Welcome ${formData.fullName}`)
  }

  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome()
    } else {
      window.location.href = "/"
    }
  }

  return (
    <div className={`auth-container ${darkMode ? 'auth-container-dark' : ''}`}>
      <div className={`auth-card signup-card ${darkMode ? 'auth-card-dark' : ''}`}>
        <button onClick={handleBackToHome} className={`back-home-btn ${darkMode ? 'back-home-btn-dark' : ''}`}>
          ← Back to Home
        </button>

        <div className="auth-header">
          <div className="auth-logo">🌾</div>
          <h2 className={darkMode ? 'text-green' : ''}>Join CropConnect</h2>
          <p>Create your account and start connecting</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-icon">
                <span className="icon">👤</span>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={darkMode ? 'input-dark' : ''}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-icon">
                <span className="icon">📱</span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className={darkMode ? 'input-dark' : ''}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-icon">
              <span className="icon">📧</span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={darkMode ? 'input-dark' : ''}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location (Village/City)</label>
            <div className="input-icon">
              <span className="icon">📍</span>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g., Ludhiana, Punjab"
                value={formData.location}
                onChange={handleChange}
                className={darkMode ? 'input-dark' : ''}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>I am a:</label>
            <div className="role-selector">
              <label className={`role-option ${formData.role === 'farmer' ? 'selected' : ''} ${darkMode ? 'role-option-dark' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="farmer"
                  checked={formData.role === 'farmer'}
                  onChange={handleChange}
                />
                <span className="role-icon">👨‍🌾</span>
                <span>Farmer</span>
              </label>
              <label className={`role-option ${formData.role === 'buyer' ? 'selected' : ''} ${darkMode ? 'role-option-dark' : ''}`}>
                <input
                  type="radio"
                  name="role"
                  value="buyer"
                  checked={formData.role === 'buyer'}
                  onChange={handleChange}
                />
                <span className="role-icon">🏢</span>
                <span>Buyer</span>
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-icon">
                <span className="icon">🔒</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  className={darkMode ? 'input-dark' : ''}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-icon">
                <span className="icon">✓</span>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`${!passwordMatch && formData.confirmPassword ? 'error' : ''} ${darkMode ? 'input-dark' : ''}`}
                  required
                />
              </div>
              {!passwordMatch && formData.confirmPassword && (
                <span className="error-message">Passwords don't match!</span>
              )}
            </div>
          </div>

          <div className="form-group terms-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <span>I agree to the <a href="#" className={darkMode ? 'terms-link-dark' : ''} onClick={(e) => e.preventDefault()}>Terms of Service</a> and <a href="#" className={darkMode ? 'terms-link-dark' : ''} onClick={(e) => e.preventDefault()}>Privacy Policy</a></span>
            </label>
          </div>

          <button 
            type="submit" 
            className="auth-btn"
            disabled={!formData.agreeTerms}
          >
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <a href="#" className={darkMode ? 'auth-link-dark' : ''} onClick={(e) => {
            e.preventDefault()
            window.location.href = "/login"
          }}>Login</a></p>
        </div>
      </div>
    </div>
  )
}

export default Signup