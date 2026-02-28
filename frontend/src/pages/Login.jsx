import { useState } from "react"
import { useLanguage } from "../LanguageContext"

function Login({ onBackToHome, darkMode, onLogin }) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('loginFailed'));
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      alert(t('welcomeBack', { name: data.user.fullName }));
      
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
      <div className={`auth-card ${darkMode ? 'auth-card-dark' : ''}`}>
        <button onClick={handleBackToHome} className={`back-home-btn ${darkMode ? 'back-home-btn-dark' : ''}`}>
          ← {t('backToHome')}
        </button>

        <div className="auth-header">
          <div className="auth-logo">🌾</div>
          <h2 className={darkMode ? 'text-green' : ''}>{t('welcomeBack')}</h2>
          <p>{t('loginSubtitle')}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">{t('email')}</label>
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
            <label htmlFor="password">{t('password')}</label>
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
              <span>{t('rememberMe')}</span>
            </label>
            <a href="#" className={`forgot-link ${darkMode ? 'forgot-link-dark' : ''}`} onClick={(e) => e.preventDefault()}>{t('forgotPassword')}</a>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? t('loading') : t('login')}
          </button>
        </form>

        <div className="auth-footer">
          <p>{t('noAccount')} <a href="#" className={darkMode ? 'auth-link-dark' : ''} onClick={(e) => {
            e.preventDefault();
            window.location.href = "/signup";
          }}>{t('signUp')}</a></p>
        </div>

        <div className={`demo-credentials ${darkMode ? 'demo-credentials-dark' : ''}`}>
          <p className="demo-title">{t('demoCredentials')}</p>
          <p>{t('farmer')}: farmer@demo.com / farmer123</p>
          <p>{t('buyer')}: buyer@demo.com / buyer123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;