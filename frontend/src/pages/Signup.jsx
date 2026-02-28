import { useState } from "react"
import { useLanguage } from "../LanguageContext"

function Signup({ onBackToHome, darkMode }) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "farmer",
    location: "",
    agreeTerms: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value
      };
      
      if (name === "password" || name === "confirmPassword") {
        const pass = name === "password" ? value : prev.password;
        const confirm = name === "confirmPassword" ? value : prev.confirmPassword;
        setPasswordMatch(pass === confirm);
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!passwordMatch) {
      setError(t('passwordsDoNotMatch'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
          location: formData.location
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('signupFailed'));
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      alert(t('welcome', { name: data.user.fullName }));
      
      if (data.user.role === 'farmer') {
        window.location.href = '/?role=farmer';
      } else {
        window.location.href = '/?role=buyer';
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className={`auth-container ${darkMode ? 'auth-container-dark' : ''}`}>
      <div className={`auth-card signup-card ${darkMode ? 'auth-card-dark' : ''}`}>
        <button onClick={handleBackToHome} className={`back-home-btn ${darkMode ? 'back-home-btn-dark' : ''}`}>
          ← {t('backToHome')}
        </button>

        <div className="auth-header">
          <div className="auth-logo">🌾</div>
          <h2 className={darkMode ? 'text-green' : ''}>{t('joinNow')}</h2>
          <p>{t('signupSubtitle')}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">{t('fullName')}</label>
              <div className="input-icon">
                <span className="icon">👤</span>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder={t('fullNamePlaceholder')}
                  value={formData.fullName}
                  onChange={handleChange}
                  className={darkMode ? 'input-dark' : ''}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">{t('phone')}</label>
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
            <label htmlFor="email">{t('email')}</label>
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
            <label htmlFor="location">{t('location')}</label>
            <div className="input-icon">
              <span className="icon">📍</span>
              <input
                type="text"
                id="location"
                name="location"
                placeholder={t('locationPlaceholder')}
                value={formData.location}
                onChange={handleChange}
                className={darkMode ? 'input-dark' : ''}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>{t('iAmA')}</label>
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
                <span>{t('farmer')}</span>
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
                <span>{t('buyer')}</span>
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">{t('password')}</label>
              <div className="input-icon">
                <span className="icon">🔒</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder={t('passwordPlaceholder')}
                  value={formData.password}
                  onChange={handleChange}
                  className={darkMode ? 'input-dark' : ''}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
              <div className="input-icon">
                <span className="icon">✓</span>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder={t('confirmPasswordPlaceholder')}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`${!passwordMatch && formData.confirmPassword ? 'error' : ''} ${darkMode ? 'input-dark' : ''}`}
                  required
                />
              </div>
              {!passwordMatch && formData.confirmPassword && (
                <span className="error-message">{t('passwordsDoNotMatch')}</span>
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
              <span>{t('agreeTerms')} <a href="#" className={darkMode ? 'terms-link-dark' : ''} onClick={(e) => e.preventDefault()}>{t('termsOfService')}</a> {t('and')} <a href="#" className={darkMode ? 'terms-link-dark' : ''} onClick={(e) => e.preventDefault()}>{t('privacyPolicy')}</a></span>
            </label>
          </div>

          <button 
            type="submit" 
            className="auth-btn"
            disabled={!formData.agreeTerms || loading}
          >
            {loading ? t('loading') : t('createAccount')}
          </button>
        </form>

        <div className="auth-footer">
          <p>{t('haveAccount')} <a href="#" className={darkMode ? 'auth-link-dark' : ''} onClick={(e) => {
            e.preventDefault();
            window.location.href = "/login";
          }}>{t('login')}</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;