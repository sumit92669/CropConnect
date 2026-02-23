import { useState } from "react"

function Login({ onBackToHome, darkMode }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt:", formData)
    alert("Login successful! (Demo)")
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
      <div className={`auth-card ${darkMode ? 'auth-card-dark' : ''}`}>
        <button onClick={handleBackToHome} className={`back-home-btn ${darkMode ? 'back-home-btn-dark' : ''}`}>
          ← Back to Home
        </button>

        <div className="auth-header">
          <div className="auth-logo">🌾</div>
          <h2 className={darkMode ? 'text-green' : ''}>Welcome Back!</h2>
          <p>Login to your CropConnect account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-icon">
              <span className="icon">📧</span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="farmer@example.com"
                value={formData.email}
                onChange={handleChange}
                className={darkMode ? 'input-dark' : ''}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon">
              <span className="icon">🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={darkMode ? 'input-dark' : ''}
                required
              />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className={`forgot-link ${darkMode ? 'forgot-link-dark' : ''}`} onClick={(e) => e.preventDefault()}>Forgot Password?</a>
          </div>

          <button type="submit" className="auth-btn">Login</button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <a href="#" className={darkMode ? 'auth-link-dark' : ''} onClick={(e) => {
            e.preventDefault()
            window.location.href = "/signup"
          }}>Sign Up</a></p>
        </div>

        <div className={`demo-credentials ${darkMode ? 'demo-credentials-dark' : ''}`}>
          <p className="demo-title">Demo Credentials:</p>
          <p>Farmer: farmer@demo.com / farmer123</p>
          <p>Buyer: buyer@demo.com / buyer123</p>
        </div>
      </div>
    </div>
  )
}

export default Login