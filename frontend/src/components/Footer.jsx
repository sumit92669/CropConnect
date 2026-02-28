import React from 'react'
import { useLanguage } from "../LanguageContext"

function Footer({ darkMode }) {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`footer ${darkMode ? 'footer-dark' : ''}`}>
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section">
          <h3 className="footer-title">
            <span className="footer-icon">🌾</span> CropConnect
          </h3>
          <p className="footer-about">
            {t('footerAbout')}
          </p>
          <div className="footer-stats-mini">
            <span>👨‍🌾 {t('farmers')}: 10,000+</span>
            <span>🏢 {t('buyers')}: 500+</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-title">{t('quickLinks')}</h3>
          <ul className="footer-links">
            <li><a href="/">{t('home')}</a></li>
            <li><a href="/about">{t('aboutUs')}</a></li>
            <li><a href="/how-it-works">{t('howItWorks')}</a></li>
            <li><a href="/contact">{t('contact')}</a></li>
            <li><a href="/faq">{t('faq')}</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-title">{t('contactUs')}</h3>
          <ul className="footer-contact">
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
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3 className="footer-title">{t('stayUpdated')}</h3>
          <p className="newsletter-text">
            {t('newsletterText')}
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={t('emailPlaceholder')} 
              className={`newsletter-input ${darkMode ? 'input-dark' : ''}`}
            />
            <button type="submit" className="newsletter-btn">
              {t('subscribe')}
            </button>
          </form>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">📘</a>
            <a href="#" className="social-link" aria-label="Twitter">🐦</a>
            <a href="#" className="social-link" aria-label="Instagram">📷</a>
            <a href="#" className="social-link" aria-label="LinkedIn">🔗</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {currentYear} CropConnect. {t('allRightsReserved')}</p>
        <div className="footer-bottom-links">
          <a href="/privacy">{t('privacyPolicy')}</a>
          <a href="/terms">{t('termsOfService')}</a>
          <a href="/sitemap">{t('sitemap')}</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer