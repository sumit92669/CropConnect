import { useState } from "react"
import { useLanguage } from "../LanguageContext"

function FilterBar({ onFilterChange, darkMode }) {
  const { t } = useLanguage()
  const [filters, setFilters] = useState({
    sortBy: 'newest',
    minPrice: '',
    maxPrice: '',
    location: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      sortBy: 'newest',
      minPrice: '',
      maxPrice: '',
      location: ''
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <div className={`filter-bar ${darkMode ? 'filter-bar-dark' : ''}`}>
      <div className="filter-group">
        <label>{t('sortBy')}:</label>
        <select 
          name="sortBy" 
          value={filters.sortBy}
          onChange={handleChange}
          className={darkMode ? 'input-dark' : ''}
        >
          <option value="newest">{t('newest')}</option>
          <option value="price-low">{t('priceLow')}</option>
          <option value="price-high">{t('priceHigh')}</option>
          <option value="name">{t('nameAsc')}</option>
        </select>
      </div>

      <div className="filter-group">
        <label>{t('priceRange')}:</label>
        <div className="price-inputs">
          <input
            type="number"
            name="minPrice"
            placeholder={t('min')}
            value={filters.minPrice}
            onChange={handleChange}
            className={darkMode ? 'input-dark' : ''}
          />
          <span>{t('to')}</span>
          <input
            type="number"
            name="maxPrice"
            placeholder={t('max')}
            value={filters.maxPrice}
            onChange={handleChange}
            className={darkMode ? 'input-dark' : ''}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>{t('location')}:</label>
        <input
          type="text"
          name="location"
          placeholder={t('enterCity')}
          value={filters.location}
          onChange={handleChange}
          className={darkMode ? 'input-dark' : ''}
        />
      </div>

      <button className="clear-filters-btn" onClick={handleClearFilters}>
        {t('clearFilters')}
      </button>
    </div>
  )
}

export default FilterBar