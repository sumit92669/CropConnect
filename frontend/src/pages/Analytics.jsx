import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

function HeatmapLayer({ points }) {
  const map = useMap()
  useEffect(() => {
    if (!map) return
    import("leaflet.heat").then(() => {
      const heatPoints = points.map(p => [p.lat, p.lng, p.weight])
      const heatLayer = L.heatLayer(heatPoints, {
        radius: 35, blur: 25, maxZoom: 10, max: 1.0,
        gradient: { 0.0: "#3b82f6", 0.3: "#06b6d4", 0.5: "#16a34a", 0.7: "#f59e0b", 1.0: "#ef4444" },
      })
      heatLayer.addTo(map)
      return () => map.removeLayer(heatLayer)
    })
  }, [map, points])
  return null
}

function MarkersLayer({ points, filter }) {
  const map = useMap()
  useEffect(() => {
    if (!map) return
    const markers = []
    points.filter(p => filter === "all" || p.type === filter).forEach(p => {
      const color = p.type === "farmer" ? "#16a34a" : "#3b82f6"
      const emoji = p.type === "farmer" ? "🌾" : "🏢"
      const size = 20 + p.weight * 16
      const icon = L.divIcon({
        className: "",
        html: `<div style="background:${color};border:3px solid white;border-radius:50%;width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-size:${10 + p.weight * 6}px;box-shadow:0 4px 12px ${color}80;">${emoji}</div>`,
        iconSize: [size, size], iconAnchor: [size / 2, size / 2],
      })
      const marker = L.marker([p.lat, p.lng], { icon })
      marker.bindPopup(`<div style="font-family:sans-serif;padding:6px;min-width:160px;"><div style="font-size:16px;font-weight:700;color:${color};margin-bottom:6px;">${emoji} ${p.name}</div><div style="font-size:13px;color:#334155;margin-bottom:4px;"><b>Type:</b> ${p.type === "farmer" ? "Farmer Hub" : "Buyer Hub"}</div><div style="font-size:13px;color:#334155;margin-bottom:4px;"><b>Density:</b> ${Math.round(p.weight * 100)}%</div><div style="font-size:13px;color:#334155;"><b>${p.type === "farmer" ? "Active Farmers" : "Active Buyers"}:</b> ${Math.round(p.weight * 300 + 50)}</div></div>`, { maxWidth: 220 })
      marker.addTo(map)
      markers.push(marker)
    })
    return () => markers.forEach(m => map.removeLayer(m))
  }, [map, points, filter])
  return null
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const priceHistory = {
  Wheat:   [1800, 1950, 2050, 2100, 2200, 2180, 2250, 2200, 2300, 2280, 2350, 2200],
  Rice:    [2600, 2700, 2850, 2900, 3000, 3100, 3050, 3200, 3100, 3150, 3300, 3100],
  Corn:    [1400, 1500, 1600, 1650, 1700, 1800, 1750, 1850, 1800, 1900, 1850, 1800],
  Soybean: [3800, 3900, 4000, 4100, 4200, 4150, 4300, 4200, 4350, 4400, 4250, 4200],
  Potato:  [900,  1000, 1100, 1150, 1200, 1250, 1200, 1300, 1250, 1350, 1300, 1200],
  Tomato:  [1200, 1300, 1400, 1500, 1600, 1550, 1700, 1600, 1650, 1750, 1700, 1500],
}
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const cropMeta = {
  Wheat:   { icon: "🌾", color: "#f59e0b", bg: "#fef3c7" },
  Rice:    { icon: "🍚", color: "#10b981", bg: "#d1fae5" },
  Corn:    { icon: "🌽", color: "#84cc16", bg: "#ecfccb" },
  Soybean: { icon: "🌱", color: "#3b82f6", bg: "#dbeafe" },
  Potato:  { icon: "🥔", color: "#8b5cf6", bg: "#ede9fe" },
  Tomato:  { icon: "🍅", color: "#ef4444", bg: "#fee2e2" },
}

const popularCrops = [
  { name: "Wheat",   views: 4821, offers: 312, icon: "🌾", trend: "+12%", color: "#f59e0b" },
  { name: "Rice",    views: 3956, offers: 287, icon: "🍚", trend: "+8%",  color: "#10b981" },
  { name: "Tomato",  views: 3412, offers: 198, icon: "🍅", trend: "+22%", color: "#ef4444" },
  { name: "Potato",  views: 2987, offers: 176, icon: "🥔", trend: "+5%",  color: "#8b5cf6" },
  { name: "Soybean", views: 2654, offers: 154, icon: "🌱", trend: "+15%", color: "#3b82f6" },
  { name: "Onion",   views: 2341, offers: 143, icon: "🧅", trend: "-3%",  color: "#f97316" },
  { name: "Mango",   views: 2105, offers: 121, icon: "🥭", trend: "+18%", color: "#ec4899" },
  { name: "Corn",    views: 1987, offers: 109, icon: "🌽", trend: "+7%",  color: "#84cc16" },
]

const heatmapPoints = [
  { lat: 31.1471, lng: 75.3412, weight: 0.95, type: "farmer", name: "Ludhiana" },
  { lat: 31.6340, lng: 74.8723, weight: 0.90, type: "farmer", name: "Amritsar" },
  { lat: 30.7333, lng: 76.7794, weight: 0.80, type: "farmer", name: "Chandigarh" },
  { lat: 30.9010, lng: 75.8573, weight: 0.75, type: "farmer", name: "Jalandhar" },
  { lat: 26.8467, lng: 80.9462, weight: 0.88, type: "farmer", name: "Lucknow" },
  { lat: 27.1767, lng: 78.0081, weight: 0.82, type: "farmer", name: "Agra" },
  { lat: 25.3176, lng: 82.9739, weight: 0.78, type: "farmer", name: "Varanasi" },
  { lat: 26.4499, lng: 80.3319, weight: 0.72, type: "farmer", name: "Kanpur" },
  { lat: 19.9975, lng: 73.7898, weight: 0.85, type: "farmer", name: "Nashik" },
  { lat: 20.5431, lng: 77.3104, weight: 0.70, type: "farmer", name: "Akola" },
  { lat: 22.7196, lng: 75.8577, weight: 0.80, type: "farmer", name: "Indore" },
  { lat: 23.5355, lng: 80.4635, weight: 0.65, type: "farmer", name: "Sagar" },
  { lat: 26.9124, lng: 75.7873, weight: 0.75, type: "farmer", name: "Jaipur" },
  { lat: 13.3379, lng: 77.1173, weight: 0.72, type: "farmer", name: "Kolar" },
  { lat: 10.7905, lng: 79.1398, weight: 0.70, type: "farmer", name: "Thanjavur" },
  { lat: 29.9457, lng: 78.1642, weight: 0.68, type: "farmer", name: "Haridwar" },
  { lat: 23.1765, lng: 75.7885, weight: 0.73, type: "farmer", name: "Ujjain" },
  { lat: 28.6139, lng: 77.2090, weight: 0.95, type: "buyer", name: "Delhi" },
  { lat: 19.0760, lng: 72.8777, weight: 0.92, type: "buyer", name: "Mumbai" },
  { lat: 22.5726, lng: 88.3639, weight: 0.85, type: "buyer", name: "Kolkata" },
  { lat: 13.0827, lng: 80.2707, weight: 0.83, type: "buyer", name: "Chennai" },
  { lat: 12.9716, lng: 77.5946, weight: 0.80, type: "buyer", name: "Bangalore" },
  { lat: 17.3850, lng: 78.4867, weight: 0.78, type: "buyer", name: "Hyderabad" },
  { lat: 23.0225, lng: 72.5714, weight: 0.75, type: "buyer", name: "Ahmedabad" },
  { lat: 18.5204, lng: 73.8567, weight: 0.72, type: "buyer", name: "Pune" },
]

// ─── Price Trend Chart (Modern SVG-based, crisp, interactive) ─────────────────
function PriceTrendChart({ darkMode }) {
  const [selectedCrop, setSelectedCrop] = useState("Wheat")
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [animProgress, setAnimProgress] = useState(0)
  const svgRef = useRef(null)
  const animRef = useRef(null)

  const meta = cropMeta[selectedCrop]
  const data = priceHistory[selectedCrop]
  const color = meta.color

  // Animate on crop change
  useEffect(() => {
    setAnimProgress(0)
    setHoveredIdx(null)
    if (animRef.current) cancelAnimationFrame(animRef.current)
    let start = null
    const animate = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 900, 1)
      // ease out cubic
      setAnimProgress(1 - Math.pow(1 - p, 3))
      if (p < 1) animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [selectedCrop])

  // Chart dimensions
  const W = 800, H = 320
  const pad = { top: 20, right: 30, bottom: 48, left: 20 }
  const chartW = W - pad.left - pad.right
  const chartH = H - pad.top - pad.bottom

  const minVal = Math.min(...data) - 150
  const maxVal = Math.max(...data) + 150

  const xPos = (i) => pad.left + (i / (data.length - 1)) * chartW
  const yPos = (v) => pad.top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH

  // Build animated path (clip by animProgress)
  const visibleCount = Math.max(2, Math.ceil(animProgress * (data.length - 1)) + 1)
  const visibleData = data.slice(0, visibleCount)

  // Smooth cubic bezier path
  const buildPath = (pts) => {
    if (pts.length < 2) return ""
    let d = `M ${xPos(0)} ${yPos(pts[0])}`
    for (let i = 1; i < pts.length; i++) {
      const x0 = xPos(i - 1), y0 = yPos(pts[i - 1])
      const x1 = xPos(i),     y1 = yPos(pts[i])
      const cpx = (x0 + x1) / 2
      d += ` C ${cpx} ${y0}, ${cpx} ${y1}, ${x1} ${y1}`
    }
    return d
  }

  const linePath = buildPath(visibleData)
  const areaPath = linePath
    + ` L ${xPos(visibleData.length - 1)} ${pad.top + chartH}`
    + ` L ${xPos(0)} ${pad.top + chartH} Z`

  // Y axis ticks
  const yTicks = 5
  const yTickVals = Array.from({ length: yTicks + 1 }, (_, i) =>
    Math.round(minVal + (i / yTicks) * (maxVal - minVal))
  ).reverse()

  const change = data[data.length - 1] - data[0]
  const changePct = ((change / data[0]) * 100).toFixed(1)

  const handleMouseMove = (e) => {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const mouseX = (e.clientX - rect.left) * (W / rect.width)
    let closest = 0
    let minDist = Infinity
    data.forEach((_, i) => {
      const dist = Math.abs(xPos(i) - mouseX)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    if (minDist < 40) setHoveredIdx(closest)
    else setHoveredIdx(null)
  }

  const gradId = `grad-${selectedCrop}`
  const clipId = `clip-${selectedCrop}`

  return (
    <div className="analytics-card">
      <div className="analytics-card-header">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: meta.bg, display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 26, flexShrink: 0,
            border: `2px solid ${color}30`
          }}>
            {meta.icon}
          </div>
          <div>
            <h3 className="analytics-card-title">📈 Price Trends — {selectedCrop}</h3>
            <p className="analytics-card-subtitle">12-month price movement • hover chart to inspect</p>
          </div>
        </div>
        <div className={`price-change-badge ${change >= 0 ? 'positive' : 'negative'}`}>
          {change >= 0 ? "↑" : "↓"} {Math.abs(changePct)}% YTD
        </div>
      </div>

      {/* Crop selector — modern pill buttons */}
      <div className="crop-pills">
        {Object.entries(cropMeta).map(([crop, m]) => (
          <button
            key={crop}
            className={`crop-pill-modern ${selectedCrop === crop ? 'active' : ''}`}
            style={selectedCrop === crop ? {
              background: m.color,
              borderColor: m.color,
              color: "white",
              boxShadow: `0 4px 14px ${m.color}50`
            } : {}}
            onClick={() => setSelectedCrop(crop)}
          >
            <span>{m.icon}</span>
            <span>{crop}</span>
          </button>
        ))}
      </div>

      {/* SVG Chart */}
      <div className="chart-wrapper">
        {/* Y axis labels — outside SVG so they're crisp DOM text */}
        <div className="chart-y-axis">
          {yTickVals.map((v, i) => (
            <div key={i} className="y-tick-label" style={{
              top: `${(i / yTicks) * 100}%`,
              color: darkMode ? "#64748b" : "#94a3b8"
            }}>
              ₹{v >= 1000 ? (v / 1000).toFixed(1) + "k" : v}
            </div>
          ))}
        </div>

        <div className="chart-svg-area">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            style={{ width: "100%", height: "100%", overflow: "visible", cursor: "crosshair" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                <stop offset="100%" stopColor={color} stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Horizontal grid lines */}
            {yTickVals.map((v, i) => (
              <line
                key={i}
                x1={pad.left} y1={yPos(v)}
                x2={W - pad.right} y2={yPos(v)}
                stroke={darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            {/* Area fill */}
            <path d={areaPath} fill={`url(#${gradId})`} />

            {/* Line */}
            <path
              d={linePath}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Hovered vertical line */}
            {hoveredIdx !== null && (
              <line
                x1={xPos(hoveredIdx)} y1={pad.top}
                x2={xPos(hoveredIdx)} y2={pad.top + chartH}
                stroke={color}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.6"
              />
            )}

            {/* Dots — all small, hovered one big */}
            {data.map((v, i) => {
              if (i >= visibleData.length) return null
              const isHovered = hoveredIdx === i
              return (
                <g key={i}>
                  {isHovered && (
                    <circle
                      cx={xPos(i)} cy={yPos(v)}
                      r={14}
                      fill={color}
                      opacity={0.15}
                    />
                  )}
                  <circle
                    cx={xPos(i)} cy={yPos(v)}
                    r={isHovered ? 7 : 4}
                    fill={isHovered ? color : darkMode ? "#1e293b" : "white"}
                    stroke={color}
                    strokeWidth={isHovered ? 0 : 2}
                    style={{ transition: "r 0.15s ease" }}
                  />
                </g>
              )
            })}

            {/* Month labels */}
            {months.map((m, i) => (
              <text
                key={i}
                x={xPos(i)}
                y={H - 10}
                textAnchor="middle"
                fontSize="12"
                fontFamily="system-ui, sans-serif"
                fill={hoveredIdx === i ? color : darkMode ? "#64748b" : "#94a3b8"}
                fontWeight={hoveredIdx === i ? "700" : "400"}
              >
                {m}
              </text>
            ))}
          </svg>

          {/* Hover tooltip — DOM element, always crisp */}
          {hoveredIdx !== null && (() => {
            const svgEl = svgRef.current
            if (!svgEl) return null
            const rect = svgEl.getBoundingClientRect()
            const xPct = xPos(hoveredIdx) / W
            const leftPx = xPct * rect.width
            const val = data[hoveredIdx]
            const prev = hoveredIdx > 0 ? data[hoveredIdx - 1] : val
            const diff = val - prev
            return (
              <div
                className="chart-tooltip"
                style={{
                  left: `${leftPx}px`,
                  background: color,
                  boxShadow: `0 8px 24px ${color}40`
                }}
              >
                <div className="tooltip-month">{months[hoveredIdx]}</div>
                <div className="tooltip-price">₹{val.toLocaleString()}</div>
                {hoveredIdx > 0 && (
                  <div className="tooltip-diff" style={{ color: diff >= 0 ? "#bbf7d0" : "#fecaca" }}>
                    {diff >= 0 ? "▲" : "▼"} ₹{Math.abs(diff)}
                  </div>
                )}
              </div>
            )
          })()}
        </div>
      </div>

      {/* Stats row */}
      <div className="trend-stats">
        {[
          { label: "Current",  value: `₹${data[data.length - 1].toLocaleString()}`, cls: "" },
          { label: "Lowest",   value: `₹${Math.min(...data).toLocaleString()}`,     cls: "low" },
          { label: "Highest",  value: `₹${Math.max(...data).toLocaleString()}`,     cls: "high" },
          { label: "Average",  value: `₹${Math.round(data.reduce((a,b)=>a+b)/data.length).toLocaleString()}`, cls: "" },
          { label: "YTD Change", value: `${change >= 0 ? "+" : ""}₹${change.toLocaleString()}`, cls: change >= 0 ? "high" : "low" },
        ].map((s, i) => (
          <div key={i} className="trend-stat">
            <span className="trend-stat-label">{s.label}</span>
            <span className={`trend-stat-value ${s.cls}`}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Popular Crops ─────────────────────────────────────────────────────────────
function PopularCrops({ darkMode }) {
  const [sortBy, setSortBy] = useState("views")
  const [animIn, setAnimIn] = useState(false)

  useEffect(() => {
    setAnimIn(false)
    setTimeout(() => setAnimIn(true), 50)
  }, [sortBy])

  const sorted = [...popularCrops].sort((a, b) => b[sortBy] - a[sortBy])
  const max = sorted[0][sortBy]

  return (
    <div className="analytics-card">
      <div className="analytics-card-header">
        <div>
          <h3 className="analytics-card-title">🔥 Popular Crops</h3>
          <p className="analytics-card-subtitle">Most viewed & offered this month</p>
        </div>
        <div className="sort-toggle">
          <button className={`sort-btn ${sortBy === 'views'  ? 'active' : ''}`} onClick={() => setSortBy('views')}>👁 Views</button>
          <button className={`sort-btn ${sortBy === 'offers' ? 'active' : ''}`} onClick={() => setSortBy('offers')}>📦 Offers</button>
        </div>
      </div>
      <div className="popular-list">
        {sorted.map((crop, i) => (
          <div key={crop.name} className={`popular-item ${animIn ? 'visible' : ''}`} style={{ transitionDelay: `${i * 50}ms` }}>
            <div className="popular-rank">{i + 1}</div>
            <div className="popular-icon" style={{ background: crop.color + "20", border: `1px solid ${crop.color}40` }}>{crop.icon}</div>
            <div className="popular-info">
              <div className="popular-name-row">
                <span className="popular-name">{crop.name}</span>
                <span className={`popular-trend ${crop.trend.startsWith('+') ? 'up' : 'down'}`}>{crop.trend}</span>
              </div>
              <div className="popular-bar-wrap">
                <div className="popular-bar-fill" style={{ width: animIn ? `${(crop[sortBy] / max) * 100}%` : "0%", background: crop.color, transitionDelay: `${i * 50 + 200}ms` }} />
              </div>
            </div>
            <div className="popular-count" style={{ color: crop.color }}>
              {sortBy === 'views' ? crop.views.toLocaleString() : crop.offers}
              <span className="popular-count-label">{sortBy === 'views' ? ' views' : ' offers'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── OSM Heatmap ──────────────────────────────────────────────────────────────
function OSMHeatMap({ darkMode }) {
  const [filter, setFilter] = useState("all")
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMapReady(true), 100)
    return () => clearTimeout(t)
  }, [])

  const farmerCount = heatmapPoints.filter(p => p.type === 'farmer').length
  const buyerCount  = heatmapPoints.filter(p => p.type === 'buyer').length

  return (
    <div className="analytics-card heatmap-card">
      <div className="analytics-card-header">
        <div>
          <h3 className="analytics-card-title">
            📍 Farmer & Buyer Heatmap
            <span className="osm-badge">Powered by OpenStreetMap</span>
          </h3>
          <p className="analytics-card-subtitle">Real geographic distribution across India — click any marker for details</p>
        </div>
        <div className="sort-toggle">
          <button className={`sort-btn ${filter === 'all'    ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`sort-btn ${filter === 'farmer' ? 'active' : ''}`} onClick={() => setFilter('farmer')}>🌾 Farmers</button>
          <button className={`sort-btn ${filter === 'buyer'  ? 'active' : ''}`} onClick={() => setFilter('buyer')}>🏢 Buyers</button>
        </div>
      </div>
      <div className="osm-heatmap-wrapper">
        {mapReady && (
          <MapContainer center={[22.5, 80.0]} zoom={5} style={{ height: "480px", width: "100%", borderRadius: "12px" }} scrollWheelZoom={true}>
            <TileLayer
              url={darkMode ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <HeatmapLayer points={heatmapPoints} />
            <MarkersLayer points={heatmapPoints} filter={filter} />
          </MapContainer>
        )}
      </div>
      <div className="heatmap-stats-bar">
        {[
          { dot: "#16a34a", label: "Farmer Hubs",    val: farmerCount },
          { dot: "#3b82f6", label: "Buyer Hubs",     val: buyerCount },
          { dot: "#ef4444", label: "Hottest Region", val: "Punjab" },
          { dot: "#f59e0b", label: "States Covered", val: 12 },
        ].map((s, i) => (
          <div key={i} className="heatmap-stat">
            <span className="heatmap-stat-dot" style={{ background: s.dot }}></span>
            <span className="heatmap-stat-label">{s.label}</span>
            <span className="heatmap-stat-val">{s.val}</span>
          </div>
        ))}
      </div>
      <div className="heatmap-legend">
        <div className="legend-entry"><span className="legend-dot" style={{ background: "#16a34a" }}></span><span>Farmers</span></div>
        <div className="legend-entry"><span className="legend-dot" style={{ background: "#3b82f6" }}></span><span>Buyers — larger dot = higher density</span></div>
        <div className="legend-entry"><span style={{ fontSize: 12, color: "#94a3b8" }}>🗺️ Map data © OpenStreetMap contributors (FOSS)</span></div>
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function Analytics({ darkMode, onBackToHome }) {
  const [activeTab, setActiveTab] = useState("trends")

  const tabs = [
    { id: "trends",  label: "📈 Price Trends",  desc: "Crop price history" },
    { id: "popular", label: "🔥 Popular Crops", desc: "Most viewed & offered" },
    { id: "heatmap", label: "📍 OSM Heat Map",  desc: "Live geographic map" },
  ]

  const topCrop  = popularCrops[0]
  const topOffer = [...popularCrops].sort((a, b) => b.offers - a.offers)[0]

  return (
    <div className={`analytics-page ${darkMode ? 'dark' : ''}`}>
      <div className="analytics-back">
        <button className="back-button" onClick={onBackToHome}>
          <span className="back-icon">←</span>
          <span className="back-text">Back to Home</span>
        </button>
      </div>

      <div className="analytics-header">
        <div>
          <h1 className="analytics-title">📊 Analytics & Insights</h1>
          <p className="analytics-subtitle">Real-time market intelligence powered by open-source tools</p>
        </div>
        <div className="analytics-header-stats">
          {[
            { val: "28",   label: "Crops Tracked" },
            { val: "1,247", label: "Active Farmers" },
            { val: "89",   label: "Buyers Online" },
          ].map((s, i) => (
            <div key={i} className="header-stat">
              <span className="header-stat-val">{s.val}</span>
              <span className="header-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-summary">
        {[
          { cls: "green",  icon: "🌾", val: topCrop.name,  label: "Most Viewed Crop",  badge: `${topCrop.views.toLocaleString()} views` },
          { cls: "blue",   icon: "📦", val: topOffer.name, label: "Most Offered Crop", badge: `${topOffer.offers} offers` },
          { cls: "amber",  icon: "📈", val: "Tomato",      label: "Fastest Growing",   badge: "+22% this month" },
          { cls: "purple", icon: "💰", val: "₹4,200",      label: "Highest Price",     badge: "Soybean/Quintal" },
        ].map((s, i) => (
          <div key={i} className={`summary-card ${s.cls}`}>
            <div className="summary-icon">{s.icon}</div>
            <div>
              <div className="summary-val">{s.val}</div>
              <div className="summary-label">{s.label}</div>
            </div>
            <div className="summary-badge">{s.badge}</div>
          </div>
        ))}
      </div>

      <div className="analytics-tabs">
        {tabs.map(tab => (
          <button key={tab.id} className={`analytics-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
            <span className="tab-label">{tab.label}</span>
            <span className="tab-desc">{tab.desc}</span>
          </button>
        ))}
      </div>

      <div className="analytics-content">
        {activeTab === "trends"  && <PriceTrendChart darkMode={darkMode} />}
        {activeTab === "popular" && <PopularCrops    darkMode={darkMode} />}
        {activeTab === "heatmap" && <OSMHeatMap       darkMode={darkMode} />}
      </div>
    </div>
  )
}

export default Analytics