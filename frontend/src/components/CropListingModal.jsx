import { useState } from "react"

function CropListingModal({ isOpen, onClose, onAddCrop, darkMode }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    unit: "Quintal",
    location: "",
    description: "",
    image: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.price || !formData.quantity) {
      alert("Please fill all required fields!")
      return
    }

    // Add new crop
    onAddCrop({
      ...formData,
      id: Date.now(), // temporary unique ID
      price: parseInt(formData.price),
      quantity: parseInt(formData.quantity)
    })

    // Reset form and close modal
    setFormData({
      name: "",
      price: "",
      quantity: "",
      unit: "Quintal",
      location: "",
      description: "",
      image: ""
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${darkMode ? 'modal-dark' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🌾 List Your Crop</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Crop Name <span className="required">*</span></label>
            <select 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              required
              className={darkMode ? 'input-dark' : ''}
            >
              <option value="">Select Crop</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Corn">Corn</option>
              <option value="Barley">Barley</option>
              <option value="Soybean">Soybean</option>
              <option value="Millet">Millet</option>
              <option value="Potato">Potato</option>
              <option value="Tomato">Tomato</option>
              <option value="Onion">Onion</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₹) <span className="required">*</span></label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 2200"
                min="1"
                required
                className={darkMode ? 'input-dark' : ''}
              />
            </div>

            <div className="form-group">
              <label>Unit</label>
              <select 
                name="unit" 
                value={formData.unit} 
                onChange={handleChange}
                className={darkMode ? 'input-dark' : ''}
              >
                <option value="Quintal">Per Quintal</option>
                <option value="Kg">Per Kg</option>
                <option value="Ton">Per Ton</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Quantity <span className="required">*</span></label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 500"
                min="1"
                required
                className={darkMode ? 'input-dark' : ''}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Ludhiana, Punjab"
                className={darkMode ? 'input-dark' : ''}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell buyers about your crop quality..."
              rows="3"
              className={darkMode ? 'input-dark' : ''}
            />
          </div>

          <div className="form-group">
            <label>Image URL (Optional)</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={darkMode ? 'input-dark' : ''}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              List Crop
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CropListingModal