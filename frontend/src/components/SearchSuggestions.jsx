import { useState, useEffect, useRef } from "react"

function SearchSuggestions({ searchTerm, onSuggestionClick, darkMode }) {
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef(null)

  // Mock data for suggestions - in real app, this would come from API
  const allSuggestions = [
    { type: 'crop', name: 'Wheat', icon: '🌾', category: 'Grains' },
    { type: 'crop', name: 'Rice', icon: '🌾', category: 'Grains' },
    { type: 'crop', name: 'Corn', icon: '🌽', category: 'Grains' },
    { type: 'crop', name: 'Barley', icon: '🌾', category: 'Grains' },
    { type: 'crop', name: 'Millet', icon: '🌾', category: 'Grains' },
    { type: 'crop', name: 'Soybean', icon: '🌱', category: 'Pulses' },
    { type: 'crop', name: 'Green Gram', icon: '🌱', category: 'Pulses' },
    { type: 'crop', name: 'Black Gram', icon: '🌱', category: 'Pulses' },
    { type: 'crop', name: 'Chickpea', icon: '🌱', category: 'Pulses' },
    { type: 'crop', name: 'Potato', icon: '🥔', category: 'Vegetables' },
    { type: 'crop', name: 'Onion', icon: '🧅', category: 'Vegetables' },
    { type: 'crop', name: 'Tomato', icon: '🍅', category: 'Vegetables' },
    { type: 'crop', name: 'Banana', icon: '🍌', category: 'Fruits' },
    { type: 'crop', name: 'Mango', icon: '🥭', category: 'Fruits' },
    { type: 'location', name: 'Ludhiana, Punjab', icon: '📍' },
    { type: 'location', name: 'Amritsar, Punjab', icon: '📍' },
    { type: 'location', name: 'Varanasi, UP', icon: '📍' },
    { type: 'location', name: 'Jaipur, Rajasthan', icon: '📍' },
    { type: 'farmer', name: 'Rajesh Kumar', icon: '👨‍🌾' },
    { type: 'farmer', name: 'Sukhwinder Singh', icon: '👨‍🌾' },
    { type: 'farmer', name: 'Priya Sharma', icon: '👩‍🌾' },
  ]

  useEffect(() => {
    if (searchTerm && searchTerm.length >= 2) {
      const filtered = allSuggestions.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 8) // Limit to 8 suggestions
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }, [searchTerm])

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSuggestionClick = (suggestion) => {
    onSuggestionClick(suggestion.name)
    setShowSuggestions(false)
  }

  const getTypeIcon = (type) => {
    switch(type) {
      case 'crop': return '🌾';
      case 'farmer': return '👨‍🌾';
      case 'location': return '📍';
      default: return '🔍';
    }
  }

  if (!showSuggestions) return null

  return (
    <div 
      ref={suggestionsRef}
      className={`search-suggestions ${darkMode ? 'suggestions-dark' : ''}`}
    >
      {suggestions.map((suggestion, index) => (
        <div
          key={`${suggestion.type}-${suggestion.name}-${index}`}
          className="suggestion-item"
          onClick={() => handleSuggestionClick(suggestion)}
        >
          <span className="suggestion-icon">{suggestion.icon || getTypeIcon(suggestion.type)}</span>
          <div className="suggestion-content">
            <span className="suggestion-name">{suggestion.name}</span>
            {suggestion.category && (
              <span className="suggestion-category">{suggestion.category}</span>
            )}
          </div>
          <span className="suggestion-type">{suggestion.type}</span>
        </div>
      ))}
      <div className="suggestion-footer">
        <span>🔍 Press Enter to search</span>
      </div>
    </div>
  )
}

export default SearchSuggestions