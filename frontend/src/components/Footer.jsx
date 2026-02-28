import React from 'react'
import { useLanguage } from "../LanguageContext"

function Footer({ darkMode }) {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`footer ${darkMode ? 'footer-dark' : ''}`}>
      <div className="footer-gradient"></div>
      <div className="footer-container">
        
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">🌾</span>
            <span className="logo-text">CropConnect</span>
          </div>
          <p className="brand-description">
            {t('footerAbout')}
          </p>
          <div className="brand-stats">
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">{t('farmers')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">{t('buyers')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">28+</span>
              <span className="stat-label">{t('crops')}</span>
            </div>
          </div>
        </div>

        {/* Quick Links - 2 Column Layout */}
        <div className="footer-links-grid">
          <div className="links-column">
            <h4 className="links-title">{t('quickLinks')}</h4>
            <ul className="links-list">
              <li><a href="/">{t('home')}</a></li>
              <li><a href="/about">{t('aboutUs')}</a></li>
              <li><a href="/how-it-works">{t('howItWorks')}</a></li>
              <li><a href="/contact">{t('contact')}</a></li>
            </ul>
          </div>
          <div className="links-column">
            <h4 className="links-title">{t('support')}</h4>
            <ul className="links-list">
              <li><a href="/faq">{t('faq')}</a></li>
              <li><a href="/privacy">{t('privacyPolicy')}</a></li>
              <li><a href="/terms">{t('termsOfService')}</a></li>
              <li><a href="/sitemap">{t('sitemap')}</a></li>
            </ul>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="footer-contact-section">
          <h4 className="links-title">{t('contactUs')}</h4>
          <ul className="contact-list">
            <li>
              <span className="contact-icon">📍</span>
              <span>{t('address')}</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span>+91 94xxxxxx09</span>
            </li>
            <li>
              <span className="contact-icon">📧</span>
              <span>support@cropconnect.com</span>
            </li>
            <li>
              <span className="contact-icon">⏰</span>
              <span>{t('workingHours')}</span>
            </li>
          </ul>
          
          {/* Social Links */}
          <div className="social-wrapper">
            <h4 className="social-title">{t('followUs')}</h4>
            <div className="social-grid">
              <a href="#" className="social-icon" aria-label="Facebook">
                <span className="social-emoji">📘</span>
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <span className="social-emoji">🐦</span>
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <span className="social-emoji">📷</span>
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <span className="social-emoji">🔗</span>
              </a>
              <a href="#" className="social-icon" aria-label="YouTube">
                <span className="social-emoji">▶️</span>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter - Compact */}
        <div className="footer-newsletter">
          <h4 className="links-title">{t('stayUpdated')}</h4>
          <p className="newsletter-text">{t('newsletterText')}</p>
          <form className="newsletter-form-compact" onSubmit={(e) => e.preventDefault()}>
            <div className="input-wrapper">
              <input 
                type="email" 
                placeholder={t('emailPlaceholder')} 
                className={`newsletter-input ${darkMode ? 'input-dark' : ''}`}
              />
              <button type="submit" className="newsletter-btn">
                <span className="btn-text">{t('subscribe')}</span>
                <span className="btn-icon">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="bottom-container">
          <p className="copyright">
            © {currentYear} CropConnect. {t('allRightsReserved')}
          </p>
          <div className="bottom-links">
            <a href="/privacy">{t('privacyPolicy')}</a>
            <span className="separator">•</span>
            <a href="/terms">{t('termsOfService')}</a>
            <span className="separator">•</span>
            <a href="/sitemap">{t('sitemap')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer