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

        {/* ========== NEW: QUICK STATS SECTION ========== */}
        <div className="footer-quick-stats">
          <h4 className="links-title">📊 Quick Stats</h4>
          <div className="stats-container">
            <div className="stat-card-mini">
              <span className="stat-emoji">🌾</span>
              <div>
                <div className="stat-number-mini">1,247+</div>
                <div className="stat-label-mini">Active Farmers</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <span className="stat-emoji">🏢</span>
              <div>
                <div className="stat-number-mini">89+</div>
                <div className="stat-label-mini">NGOs & Buyers</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <span className="stat-emoji">🌽</span>
              <div>
                <div className="stat-number-mini">28+</div>
                <div className="stat-label-mini">Crop Varieties</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <span className="stat-emoji">⭐</span>
              <div>
                <div className="stat-number-mini">4.8/5</div>
                <div className="stat-label-mini">User Rating</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <span className="stat-emoji">🚚</span>
              <div>
                <div className="stat-number-mini">156</div>
                <div className="stat-label-mini">Orders Today</div>
              </div>
            </div>
            <div className="stat-card-mini">
              <span className="stat-emoji">💚</span>
              <div>
                <div className="stat-number-mini">2,500+</div>
                <div className="stat-label-mini">Happy Farmers</div>
              </div>
            </div>
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

        {/* Stay Updated & Social Links */}
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

          {/* Social Links - Circular Icons with Real Logos */}
          <div className="social-links-container">
            <h4 className="social-title">Follow Us</h4>
            <div className="social-icons-grid">
              <a 
                href="https://cropconnect-gamma.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon-circle"
                title="Vercel"
              >
                <img 
                  src="https://assets.vercel.com/image/upload/front/favicon/vercel/57x57.png" 
                  alt="Vercel"
                  className="social-icon-img"
                />
              </a>
              
              <a 
                href="https://github.com/sumit92669/CropConnect" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon-circle"
                title="GitHub"
              >
                <img 
                  src="https://github.githubassets.com/favicons/favicon.svg" 
                  alt="GitHub"
                  className="social-icon-img"
                />
              </a>
              
              <a 
                href="https://www.instagram.com/suumiit___?igsh=aTRsbHFjb2t0MXFz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon-circle"
                title="Instagram"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" 
                  alt="Instagram"
                  className="social-icon-img"
                />
              </a>
              
              <a 
                href="https://www.linkedin.com/in/sumit-kumar-76abb3348/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon-circle"
                title="LinkedIn"
              >
                <img 
                  src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" 
                  alt="LinkedIn"
                  className="social-icon-img"
                />
              </a>
            </div>
          </div>
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