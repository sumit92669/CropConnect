import { useState } from "react"
import { useLanguage } from "../LanguageContext"

function CropListingModal({ isOpen, onClose, onAddCrop, darkMode }) {
  const { t } = useLanguage()
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
    
    if (!formData.name || !formData.price || !formData.quantity) {
      alert(t('fillRequiredFields'))
      return
    }

    onAddCrop({
      ...formData,
      id: Date.now(),
      price: parseInt(formData.price),
      quantity: parseInt(formData.quantity)
    })

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
          <h2>🌾 {t('listYourCrop')}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>{t('cropName')} <span className="required">*</span></label>
            <select 
              name="name" 
              value={formData.name} 
              onChange={handleChange}
              required
              className={darkMode ? 'input-dark' : ''}
            >
              <option value="">{t('selectCrop')}</option>
              <option value="Wheat">{t('wheat')}</option>
              <option value="Rice">{t('rice')}</option>
              <option value="Corn">{t('corn')}</option>
              <option value="Barley">{t('barley')}</option>
              <option value="Soybean">{t('soybean')}</option>
              <option value="Millet">{t('millet')}</option>
              <option value="Potato">{t('potato')}</option>
              <option value="Tomato">{t('tomato')}</option>
              <option value="Onion">{t('onion')}</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t('price')} (₹) <span className="required">*</span></label>
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
              <label>{t('unit')}</label>
              <select 
                name="unit" 
                value={formData.unit} 
                onChange={handleChange}
                className={darkMode ? 'input-dark' : ''}
              >
                <option value="Quintal">{t('perQuintal')}</option>
                <option value="Kg">{t('perKg')}</option>
                <option value="Ton">{t('perTon')}</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t('quantity')} <span className="required">*</span></label>
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
              <label>{t('location')}</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={t('locationPlaceholder')}
                className={darkMode ? 'input-dark' : ''}
              />
            </div>
          </div>

          <div className="form-group">
            <label>{t('description')}</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={t('descriptionPlaceholder')}
              rows="3"
              className={darkMode ? 'input-dark' : ''}
            />
          </div>

          <div className="form-group">
            <label>{t('imageUrl')}</label>
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
              {t('cancel')}
            </button>
            <button type="submit" className="submit-btn">
              {t('listCrop')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CropListingModal