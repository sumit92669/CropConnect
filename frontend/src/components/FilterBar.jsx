import { useState } from "react"

function FilterBar({ onFilterChange, darkMode }) {
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
        <label>Sort by:</label>
        <select 
          name="sortBy" 
          value={filters.sortBy}
          onChange={handleChange}
          className={darkMode ? 'input-dark' : ''}
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Price Range (₹):</label>
        <div className="price-inputs">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice}
            onChange={handleChange}
            className={darkMode ? 'input-dark' : ''}
          />
          <span>to</span>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={handleChange}
            className={darkMode ? 'input-dark' : ''}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Location:</label>
        <input
          type="text"
          name="location"
          placeholder="Enter city/village"
          value={filters.location}
          onChange={handleChange}
          className={darkMode ? 'input-dark' : ''}
        />
      </div>

      <button className="clear-filters-btn" onClick={handleClearFilters}>
        Clear Filters
      </button>
    </div>
  )
}

export default FilterBar