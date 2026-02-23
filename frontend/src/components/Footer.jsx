import React from 'react'

function Footer({ darkMode }) {
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
            Connecting farmers directly with NGOs and bulk buyers. 
            Fair prices, no middlemen, better future for agriculture.
          </p>
          <div className="footer-stats-mini">
            <span>👨‍🌾 10,000+ Farmers</span>
            <span>🏢 500+ Buyers</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/how-it-works">How It Works</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <ul className="footer-contact">
            <li>
              <span className="contact-icon">📍</span>
              <span>Delhi Technical Campus, Greater Nodia</span>
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
              <span>Mon-Sat: 9AM - 6PM</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h3 className="footer-title">Stay Updated</h3>
          <p className="newsletter-text">
            Get latest crop prices and offers
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className={`newsletter-input ${darkMode ? 'input-dark' : ''}`}
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
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
        <p>© {currentYear} CropConnect. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/sitemap">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
