import React, { useState } from 'react'
import { useLanguage } from "../LanguageContext"

function Footer({ darkMode }) {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const [activePopup, setActivePopup] = useState(null)

  // Popup content for each link
  const popupContent = {
    home: {
      title: "🏠 Home",
      description: "Return to the main dashboard and explore featured crops, market trends, and latest updates from farmers.",
      icon: "🏡"
    },
    aboutUs: {
      title: "🌱 About CropConnect",
      description: "We're on a mission to connect farmers directly with NGOs and bulk buyers, eliminating middlemen and ensuring fair prices for everyone.",
      icon: "🌾"
    },
    howItWorks: {
      title: "⚙️ How It Works",
      description: "Farmers list crops → Buyers browse and make offers → Negotiate prices → Direct deal! Simple, transparent, fair.",
      icon: "🔄"
    },
    contact: {
      title: "📞 Contact Us",
      description: "Have questions? Our support team is available Monday to Saturday, 9AM to 6PM. We're here to help!",
      icon: "💬"
    },
    faq: {
      title: "❓ Frequently Asked Questions",
      description: "Find answers to common questions about registration, pricing, negotiations, and platform usage.",
      icon: "📚"
    },
    privacyPolicy: {
      title: "🔒 Privacy Policy",
      description: "Your data is safe with us. We never share personal information with third parties without your consent.",
      icon: "🛡️"
    },
    termsOfService: {
      title: "📜 Terms of Service",
      description: "By using CropConnect, you agree to our fair usage policies and community guidelines.",
      icon: "⚖️"
    },
    sitemap: {
      title: "🗺️ Sitemap",
      description: "Explore all sections of our platform: Marketplace, Farmer Dashboard, Offers, Support, and more.",
      icon: "🧭"
    }
  }

  const handleMouseEnter = (key) => {
    setActivePopup(key)
  }

  const handleMouseLeave = () => {
    setActivePopup(null)
  }

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
              <li 
                onMouseEnter={() => handleMouseEnter('home')}
                onMouseLeave={handleMouseLeave}
                className="popup-trigger"
              >
                <a href="/">{t('home')}</a>
                {activePopup === 'home' && (
                  <div className={`glass-popup ${darkMode ? 'popup-dark' : ''}`}>
                    <div className="popup-header">
                      <span className="popup-icon">{popupContent.home.icon}</span>
                      <span className="popup-title">{popupContent.home.title}</span>
                    </div>
                    <p className="popup-description">{popupContent.home.description}</p>
                  </div>
                )}
              </li>
              <li 
                onMouseEnter={() => handleMouseEnter('aboutUs')}
                onMouseLeave={handleMouseLeave}
                className="popup-trigger"
              >
                <a href="/about">{t('aboutUs')}</a>
                {activePopup === 'aboutUs' && (
                  <div className={`glass-popup ${darkMode ? 'popup-dark' : ''}`}>
                    <div className="popup-header">
                      <span className="popup-icon">{popupContent.aboutUs.icon}</span>
                      <span className="popup-title">{popupContent.aboutUs.title}</span>
                    </div>
                    <p className="popup-description">{popupContent.aboutUs.description}</p>
                  </div>
                )}
              </li>
              <li 
                onMouseEnter={() => handleMouseEnter('howItWorks')}
                onMouseLeave={handleMouseLeave}
                className="popup-trigger"
              >
                <a href="/how-it-works">{t('howItWorks')}</a>
                {activePopup === 'howItWorks' && (
                  <div className={`glass-popup ${darkMode ? 'popup-dark' : ''}`}>
                    <div className="popup-header">
                      <span className="popup-icon">{popupContent.howItWorks.icon}</span>
                      <span className="popup-title">{popupContent.howItWorks.title}</span>
                    </div>
                    <p className="popup-description">{popupContent.howItWorks.description}</p>
                  </div>
                )}
              </li>
              <li 
                onMouseEnter={() => handleMouseEnter('contact')}
                onMouseLeave={handleMouseLeave}
                className="popup-trigger"
              >
                <a href="/contact">{t('contact')}</a>
                {activePopup === 'contact' && (
                  <div className={`glass-popup ${darkMode ? 'popup-dark' : ''}`}>
                    <div className="popup-header">
                      <span className="popup-icon">{popupContent.contact.icon}</span>
                      <span className="popup-title">{popupContent.contact.title}</span>
                    </div>
                    <p className="popup-description">{popupContent.contact.description}</p>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="links-column">
            <h4 className="links-title">{t('support')}</h4>
            <ul className="links-list">
              <li 
                onMouseEnter={() => handleMouseEnter('faq')}
                onMouseLeave={handleMouseLeave}
                className="popup-trigger"
              >
                <a href="/faq">{t('faq')}</a>
                {activePopup === 'faq' && (
                  <div className={`glass-popup ${darkMode ? 'popup-dark' : ''}`}>
                    <div className="popup-header">
                      <span className="popup-icon">{popupContent.faq.icon}</span>
                      <span className="popup-title">{popupContent.faq.title}</span>
                    </div>
                    <p className="popup-description">{popupContent.faq.description}</p>
                  </div>
                )}
              </li>
              <li 
                onMouseEnter={() => handleMouseEnter('privacyPolicy')}
                onMouseLeave={handleMouseLeave}
                className="popup-trigger"
              >
                <a href="/privacy">{t('privacyPolicy')}</a>
                {activePopup === 'privacyPolicy' && (
                  <div className={`glass-popup ${darkMode ? 'popup-dark' : ''}`}>
                    <div className="popup-header">
                      <span className="popup-icon">{popupContent.privacyPolicy.icon}</span>
                      <span className="popup-title">{popupContent.privacyPolicy.title}</span>
                    </div>
                    <p className="popup-description">{popupContent.privacyPolicy.description}</p>
                  </div>
                )}
              </li>
              <li 
                onMouseEnter={() => handleMouseEnter('termsOfService')}
                onMouseLeave={handleMouseLeave}
                className="popup-trigger"
              >
                <a href="/terms">{t('termsOfService')}</a>
                {activePopup === 'termsOfService' && (
                  <div className={`glass-popup ${darkMode ? 'popup-dark' : ''}`}>
                    <div className="popup-header">
                      <span className="popup-icon">{popupContent.termsOfService.icon}</span>
                      <span className="popup-title">{popupContent.termsOfService.title}</span>
                    </div>
                    <p className="popup-description">{popupContent.termsOfService.description}</p>
                  </div>
                )}
              </li>
              <li 
                onMouseEnter={() => handleMouseEnter('sitemap')}
                onMouseLeave={handleMouseLeave}
                className="popup-trigger"
              >
                <a href="/sitemap">{t('sitemap')}</a>
                {activePopup === 'sitemap' && (
                  <div className={`glass-popup ${darkMode ? 'popup-dark' : ''}`}>
                    <div className="popup-header">
                      <span className="popup-icon">{popupContent.sitemap.icon}</span>
                      <span className="popup-title">{popupContent.sitemap.title}</span>
                    </div>
                    <p className="popup-description">{popupContent.sitemap.description}</p>
                  </div>
                )}
              </li>
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