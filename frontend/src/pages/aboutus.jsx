import { useLanguage } from "../context/LanguageContext"

function AboutUs({ darkMode }) {
  const { t } = useLanguage()

  return (
    <div className={`about-us-page ${darkMode ? 'dark-mode' : ''}`}>
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1>{t("our_story") || "Our Story"}</h1>
          <p>{t("about_hero_text") || "Connecting Farmers Directly with Buyers Since 2024"}</p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="about-section mission-section">
        <div className="container">
          <div className="section-header">
            <span className="section-icon">🌾</span>
            <h2>{t("our_mission") || "Our Mission"}</h2>
          </div>
          <div className="mission-content">
            <p>
              {t("mission_text1") || "CropConnect was born from a simple idea: farmers deserve fair prices for their hard work, and bulk buyers deserve access to fresh, quality produce without middlemen."}
            </p>
            <p>
              {t("mission_text2") || "We're on a mission to transform agricultural trade by creating a transparent, direct marketplace that benefits everyone involved."}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="about-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">{t("stats_farmers") || "Farmers"}</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">500+</span>
              <span className="stat-label">{t("stats_buyers") || "Buyers"}</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">50+</span>
              <span className="stat-label">{t("stats_crops") || "Crops"}</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">28</span>
              <span className="stat-label">{t("states") || "States"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Story Timeline */}
      <div className="about-section timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="section-icon">📅</span>
            <h2>{t("our_journey") || "Our Journey"}</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3>{t("founded") || "CropConnect Founded"}</h3>
                <p>{t("founded_text") || "Started with a vision to connect farmers directly with NGOs and bulk buyers."}</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2025</div>
              <div className="timeline-content">
                <h3>{t("expansion") || "Expansion to 10 States"}</h3>
                <p>{t("expansion_text") || "Grew our network to cover major agricultural regions across India."}</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2026</div>
              <div className="timeline-content">
                <h3>{t("today") || "Today"}</h3>
                <p>{t("today_text") || "Serving thousands of farmers and buyers with our transparent marketplace."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="about-section team-section">
        <div className="container">
          <div className="section-header">
            <span className="section-icon">👥</span>
            <h2>{t("our_team") || "Our Team"}</h2>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">👨‍🌾</div>
              <h3>Rajesh Kumar</h3>
              <p>{t("founder") || "Founder & Farmer Advocate"}</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">👩‍💻</div>
              <h3>Priya Sharma</h3>
              <p>{t("tech_lead") || "Technology Lead"}</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">👨‍💼</div>
              <h3>Amit Patel</h3>
              <p>{t("operations") || "Operations Head"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="about-cta">
        <div className="container">
          <h2>{t("join_us") || "Join Our Mission"}</h2>
          <p>{t("cta_text") || "Be part of the change in agricultural trade"}</p>
          <button className="cta-button" onClick={() => window.location.href = '/'}>
            {t("contact_us") || "Contact Us"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutUs