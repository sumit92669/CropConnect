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
            Connecting farmers directly with NGOs and bulk buyers. Fair prices, no middlemen, better future for agriculture.
          </p>
          <div className="brand-stats">
            <div className="stat-item">
              <span className="stat-number">1,247</span>
              <span className="stat-label">{t('farmers')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">89</span>
              <span className="stat-label">{t('buyers')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">28</span>
              <span className="stat-label">{t('crops')}</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
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

        {/* Contact Info */}
        <div className="footer-contact-section">
          <h4 className="links-title">{t('contactUs')}</h4>
          <ul className="contact-list">
            <li>
              <span className="contact-icon">📍</span>
              <span>Delhi Technical Campus, Greater Noida</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span>
                <a href="tel:+919266906523" style={{color: 'inherit', textDecoration: 'none'}}>
                  +91 92669 06523
                </a>
              </span>
            </li>
            <li>
              <span className="contact-icon">📧</span>
              <span>
                <a href="mailto:sumit2_cst24@delhitechnicalcampus.ac.in" style={{color: 'inherit', textDecoration: 'none'}}>
                  sumit2_cst24@delhitechnicalcampus.ac.in
                </a>
              </span>
            </li>
            <li>
              <span className="contact-icon">⏰</span>
              <span>Available: Mon-Sat, 10AM - 5PM (Quick replies)</span>
            </li>
          </ul>
        </div>

        {/* Stay Updated */}
        <div className="footer-newsletter">
          <h4 className="links-title">{t('stayUpdated')}</h4>
          <p className="newsletter-text">Get latest crop prices, offers and market trends directly in your inbox.</p>
          <form className="newsletter-form-compact" onSubmit={(e) => e.preventDefault()}>
            <div className="input-wrapper">
              <input 
                type="email" 
                placeholder={t('emailPlaceholder')} 
                className={`newsletter-input ${darkMode ? 'input-dark' : ''}`}
              />
              <button type="submit" className="newsletter-btn">
                <span className="btn-text">Subscribe</span>
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
            © {currentYear} CropConnect. All rights reserved.
          </p>
          <div className="bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="/terms">Terms of Service</a>
            <span className="separator">•</span>
            <a href="/sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer