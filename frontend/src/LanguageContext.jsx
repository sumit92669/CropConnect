import React, { createContext, useState, useContext, useEffect } from 'react';

// Language translations
const translations = {
  en: {
    // Navbar
    searchPlaceholder: "Search crops...",
    login: "Login",
    signup: "Sign Up",
    language: "Language",
    light: "Light",
    dark: "Dark",
    search: "Search crops, farmers, locations...",
    
    // Hero Section
    heroTitle: "Fair & Direct Crop Marketplace",
    heroSubtitle: "Connecting Farmers with NGOs & Bulk Buyers",
    farmerBtn: "I am a Farmer",
    buyerBtn: "I am a Buyer",
    farmers: "Farmers",
    buyers: "Buyers",
    crops: "Crops",
    
    // Common
    viewDetails: "View Details",
    backToHome: "← Back to Home",
    loading: "Loading...",
    error: "Something went wrong",
    retry: "Retry",
    
    // Categories
    allCrops: "All Crops",
    grains: "Grains",
    pulses: "Pulses",
    vegetables: "Vegetables",
    fruits: "Fruits",
    
    // Filters
    sortBy: "Sort by",
    newest: "Newest",
    priceLow: "Price: Low to High",
    priceHigh: "Price: High to Low",
    nameAsc: "Name: A to Z",
    priceRange: "Price Range",
    min: "Min",
    max: "Max",
    to: "to",
    location: "Location",
    enterCity: "Enter city",
    clearFilters: "Clear Filters",
    
    // Crop Card
    localFarmer: "Local Farmer",
    locationNotSpecified: "Location not specified",
    quintal: "quintal",
    
    // Buyer Marketplace
    buyerMarketplace: "Buyer Marketplace",
    browseCrops: "Browse {{count}} crops from farmers near you",
    gridView: "Grid View",
    mapView: "Map View",
    myOffers: "My Offers",
    showing: "Showing {{filtered}} of {{total}} crops",
    noCrops: "No crops found",
    adjustFilters: "Try adjusting your filters",
    farmerLocations: "Farmer Locations",
    mapHint: "Click on markers to view crop details",
    
    // Farmer Dashboard
    farmerDashboard: "Farmer Dashboard",
    listNewCrop: "List New Crop",
    myListings: "My Listings",
    offersReceived: "Offers Received",
    totalCrops: "Total Crops",
    activeListings: "Active Listings",
    myCrops: "My Crops",
    noCropsListed: "No crops listed yet",
    listFirstCrop: "List Your First Crop",
    cropListed: "Crop listed successfully!",
    edit: "Edit",
    delete: "Delete",
    
    // Offers
    offerSent: "Offer sent for {{crop}}!",
    makeOffer: "Make Offer",
    contactFarmer: "Call Farmer",
    accept: "Accept",
    counter: "Counter",
    reject: "Reject",
    pending: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
    countered: "Countered",
    noOffersYet: "No offers yet",
    noOffersMessage: "You haven't received any offers yet",
    totalOffers: "Total Offers",
    reviewOffers: "Review and manage offers from buyers",
    offeredPrice: "Offered Price",
    listed: "Listed",
    quantity: "Quantity",
    date: "Date",
    message: "Message",
    yourCounter: "Your counter offer",
    waitingForBuyer: "Waiting for buyer's response",
    enterCounterPrice: "Enter your counter offer price",
    counterSent: "Counter offer of ₹{{price}} sent!",
    
    // Auth
    fillRequiredFields: "Please fill all required fields",
    selectCrop: "Select a crop",
    wheat: "Wheat",
    rice: "Rice",
    corn: "Corn",
    barley: "Barley",
    soybean: "Soybean",
    millet: "Millet",
    potato: "Potato",
    tomato: "Tomato",
    onion: "Onion",
    perQuintal: "Per Quintal",
    perKg: "Per Kg",
    perTon: "Per Ton",
    description: "Description",
    descriptionPlaceholder: "Tell buyers about your crop quality...",
    imageUrl: "Image URL",
    listCrop: "List Crop",
    cancel: "Cancel",
    foundFor: "found for",
    trySearching: "Try searching for something else",
    
    // Footer
    quickLinks: "Quick Links",
    home: "Home",
    aboutUs: "About Us",
    howItWorks: "How It Works",
    contactUs: "Contact Us",
    stayUpdated: "Stay Updated",
    subscribe: "Subscribe",
    yourEmail: "Your email address",
    rightsReserved: "All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service"
  },
  
  hi: {
    // Navbar
    searchPlaceholder: "फसलें खोजें...",
    login: "लॉग इन",
    signup: "साइन अप",
    language: "भाषा",
    light: "लाइट",
    dark: "डार्क",
    search: "फसलें, किसान, स्थान खोजें...",
    
    // Hero Section
    heroTitle: "निष्पक्ष एवं प्रत्यक्ष कृषि बाजार",
    heroSubtitle: "किसानों को एनजीओ और थोक खरीदारों से जोड़ना",
    farmerBtn: "मैं एक किसान हूँ",
    buyerBtn: "मैं एक खरीदार हूँ",
    farmers: "किसान",
    buyers: "खरीदार",
    crops: "फसलें",
    
    // Common
    viewDetails: "विवरण देखें",
    backToHome: "← होम पेज पर वापस",
    loading: "लोड हो रहा है...",
    error: "कुछ गलत हो गया",
    retry: "पुनः प्रयास करें",
    
    // Categories
    allCrops: "सभी फसलें",
    grains: "अनाज",
    pulses: "दालें",
    vegetables: "सब्जियाँ",
    fruits: "फल",
    
    // Filters
    sortBy: "क्रमबद्ध करें",
    newest: "नवीनतम",
    priceLow: "मूल्य: कम से अधिक",
    priceHigh: "मूल्य: अधिक से कम",
    nameAsc: "नाम: A से Z",
    priceRange: "मूल्य सीमा",
    min: "न्यूनतम",
    max: "अधिकतम",
    to: "से",
    location: "स्थान",
    enterCity: "शहर दर्ज करें",
    clearFilters: "फ़िल्टर साफ़ करें",
    
    // Crop Card
    localFarmer: "स्थानीय किसान",
    locationNotSpecified: "स्थान निर्दिष्ट नहीं",
    quintal: "क्विंटल",
    
    // Buyer Marketplace
    buyerMarketplace: "खरीदार बाजार",
    browseCrops: "अपने नजदीकी किसानों से {{count}} फसलें देखें",
    gridView: "ग्रिड व्यू",
    mapView: "मैप व्यू",
    myOffers: "मेरे ऑफर",
    showing: "{{total}} में से {{filtered}} फसलें दिख रही हैं",
    noCrops: "कोई फसल नहीं मिली",
    adjustFilters: "अपने फ़िल्टर समायोजित करें",
    farmerLocations: "किसान स्थान",
    mapHint: "फसल विवरण देखने के लिए मार्कर पर क्लिक करें",
    
    // Farmer Dashboard
    farmerDashboard: "किसान डैशबोर्ड",
    listNewCrop: "नई फसल लिस्ट करें",
    myListings: "मेरी लिस्टिंग",
    offersReceived: "प्राप्त ऑफर",
    totalCrops: "कुल फसलें",
    activeListings: "सक्रिय लिस्टिंग",
    myCrops: "मेरी फसलें",
    noCropsListed: "अभी तक कोई फसल लिस्ट नहीं की गई",
    listFirstCrop: "अपनी पहली फसल लिस्ट करें",
    cropListed: "फसल सफलतापूर्वक लिस्ट हो गई!",
    edit: "संपादित करें",
    delete: "हटाएं",
    
    // Offers
    offerSent: "{{crop}} के लिए ऑफर भेजा गया!",
    makeOffer: "ऑफर करें",
    contactFarmer: "किसान से संपर्क करें",
    accept: "स्वीकार करें",
    counter: "प्रतिऑफर",
    reject: "अस्वीकार करें",
    pending: "लंबित",
    accepted: "स्वीकृत",
    rejected: "अस्वीकृत",
    countered: "प्रतिऑफर",
    noOffersYet: "अभी तक कोई ऑफर नहीं",
    noOffersMessage: "आपको अभी तक कोई ऑफर नहीं मिला है",
    totalOffers: "कुल ऑफर",
    reviewOffers: "खरीदारों से प्राप्त ऑफर की समीक्षा करें",
    offeredPrice: "ऑफर मूल्य",
    listed: "लिस्टेड",
    quantity: "मात्रा",
    date: "तारीख",
    message: "संदेश",
    yourCounter: "आपका प्रतिऑफर",
    waitingForBuyer: "खरीदार के उत्तर की प्रतीक्षा",
    enterCounterPrice: "अपना प्रतिऑफर मूल्य दर्ज करें",
    counterSent: "₹{{price}} का प्रतिऑफर भेजा गया!",
    
    // Auth
    fillRequiredFields: "कृपया सभी आवश्यक फ़ील्ड भरें",
    selectCrop: "फसल चुनें",
    wheat: "गेहूं",
    rice: "चावल",
    corn: "मक्का",
    barley: "जौ",
    soybean: "सोयाबीन",
    millet: "बाजरा",
    potato: "आलू",
    tomato: "टमाटर",
    onion: "प्याज",
    perQuintal: "प्रति क्विंटल",
    perKg: "प्रति किलो",
    perTon: "प्रति टन",
    description: "विवरण",
    descriptionPlaceholder: "खरीदारों को अपनी फसल की गुणवत्ता के बारे में बताएं...",
    imageUrl: "छवि URL",
    listCrop: "फसल लिस्ट करें",
    cancel: "रद्द करें",
    foundFor: "के लिए मिला",
    trySearching: "कुछ और खोजने का प्रयास करें",
    
    // Footer
    quickLinks: "त्वरित लिंक",
    home: "होम",
    aboutUs: "हमारे बारे में",
    howItWorks: "यह कैसे काम करता है",
    contactUs: "संपर्क करें",
    stayUpdated: "अपडेट रहें",
    subscribe: "सदस्यता लें",
    yourEmail: "आपका ईमेल पता",
    rightsReserved: "सर्वाधिकार सुरक्षित।",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें"
  },
  
  pa: {
    // Navbar
    searchPlaceholder: "ਫਸਲਾਂ ਖੋਜੋ...",
    login: "ਲੌਗ ਇਨ",
    signup: "ਸਾਈਨ ਅੱਪ",
    language: "ਭਾਸ਼ਾ",
    light: "ਲਾਈਟ",
    dark: "ਡਾਰਕ",
    search: "ਫਸਲਾਂ, ਕਿਸਾਨ, ਸਥਾਨ ਖੋਜੋ...",
    
    // Hero Section
    heroTitle: "ਨਿਰਪੱਖ ਅਤੇ ਸਿੱਧਾ ਫਸਲ ਬਾਜ਼ਾਰ",
    heroSubtitle: "ਕਿਸਾਨਾਂ ਨੂੰ ਐਨਜੀਓ ਅਤੇ ਥੋਕ ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਜੋੜਨਾ",
    farmerBtn: "ਮੈਂ ਇੱਕ ਕਿਸਾਨ ਹਾਂ",
    buyerBtn: "ਮੈਂ ਇੱਕ ਖਰੀਦਦਾਰ ਹਾਂ",
    farmers: "ਕਿਸਾਨ",
    buyers: "ਖਰੀਦਦਾਰ",
    crops: "ਫਸਲਾਂ",
    
    // Common
    viewDetails: "ਵੇਰਵਾ ਦੇਖੋ",
    backToHome: "← ਹੋਮ ਪੇਜ ਤੇ ਵਾਪਸ",
    loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    error: "ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ",
    retry: "ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    
    // Categories
    allCrops: "ਸਾਰੀਆਂ ਫਸਲਾਂ",
    grains: "ਅਨਾਜ",
    pulses: "ਦਾਲਾਂ",
    vegetables: "ਸਬਜ਼ੀਆਂ",
    fruits: "ਫਲ",
    
    // Filters
    sortBy: "ਕ੍ਰਮਬੱਧ ਕਰੋ",
    newest: "ਨਵੀਨਤਮ",
    priceLow: "ਕੀਮਤ: ਘੱਟ ਤੋਂ ਵੱਧ",
    priceHigh: "ਕੀਮਤ: ਵੱਧ ਤੋਂ ਘੱਟ",
    nameAsc: "ਨਾਮ: A ਤੋਂ Z",
    priceRange: "ਕੀਮਤ ਸੀਮਾ",
    min: "ਘੱਟੋ-ਘੱਟ",
    max: "ਵੱਧੋ-ਵੱਧ",
    to: "ਤੋਂ",
    location: "ਸਥਾਨ",
    enterCity: "ਸ਼ਹਿਰ ਦਾਖਲ ਕਰੋ",
    clearFilters: "ਫਿਲਟਰ ਸਾਫ਼ ਕਰੋ",
    
    // Crop Card
    localFarmer: "ਸਥਾਨਕ ਕਿਸਾਨ",
    locationNotSpecified: "ਸਥਾਨ ਨਿਰਧਾਰਤ ਨਹੀਂ",
    quintal: "ਕੁਇੰਟਲ",
    
    // Buyer Marketplace
    buyerMarketplace: "ਖਰੀਦਦਾਰ ਬਾਜ਼ਾਰ",
    browseCrops: "ਆਪਣੇ ਨੇੜੇ ਦੇ ਕਿਸਾਨਾਂ ਤੋਂ {{count}} ਫਸਲਾਂ ਬ੍ਰਾਊਜ਼ ਕਰੋ",
    gridView: "ਗਰਿੱਡ ਵਿਊ",
    mapView: "ਮੈਪ ਵਿਊ",
    myOffers: "ਮੇਰੇ ਆਫਰ",
    showing: "{{total}} ਵਿੱਚੋਂ {{filtered}} ਫਸਲਾਂ ਦਿਖਾ ਰਿਹਾ ਹੈ",
    noCrops: "ਕੋਈ ਫਸਲ ਨਹੀਂ ਮਿਲੀ",
    adjustFilters: "ਆਪਣੇ ਫਿਲਟਰ ਐਡਜਸਟ ਕਰੋ",
    farmerLocations: "ਕਿਸਾਨ ਸਥਾਨ",
    mapHint: "ਫਸਲ ਵੇਰਵਾ ਦੇਖਣ ਲਈ ਮਾਰਕਰ 'ਤੇ ਕਲਿੱਕ ਕਰੋ",
    
    // Farmer Dashboard
    farmerDashboard: "ਕਿਸਾਨ ਡੈਸ਼ਬੋਰਡ",
    listNewCrop: "ਨਵੀਂ ਫਸਲ ਲਿਸਟ ਕਰੋ",
    myListings: "ਮੇਰੀ ਲਿਸਟਿੰਗ",
    offersReceived: "ਪ੍ਰਾਪਤ ਆਫਰ",
    totalCrops: "ਕੁੱਲ ਫਸਲਾਂ",
    activeListings: "ਸਰਗਰਮ ਲਿਸਟਿੰਗ",
    myCrops: "ਮੇਰੀਆਂ ਫਸਲਾਂ",
    noCropsListed: "ਅਜੇ ਤੱਕ ਕੋਈ ਫਸਲ ਲਿਸਟ ਨਹੀਂ ਕੀਤੀ ਗਈ",
    listFirstCrop: "ਆਪਣੀ ਪਹਿਲੀ ਫਸਲ ਲਿਸਟ ਕਰੋ",
    cropListed: "ਫਸਲ ਸਫਲਤਾਪੂਰਵਕ ਲਿਸਟ ਹੋ ਗਈ!",
    edit: "ਸੋਧੋ",
    delete: "ਹਟਾਓ",
    
    // Offers
    offerSent: "{{crop}} ਲਈ ਆਫਰ ਭੇਜਿਆ ਗਿਆ!",
    makeOffer: "ਆਫਰ ਕਰੋ",
    contactFarmer: "ਕਿਸਾਨ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    accept: "ਸਵੀਕਾਰ ਕਰੋ",
    counter: "ਜਵਾਬੀ ਆਫਰ",
    reject: "ਰੱਦ ਕਰੋ",
    pending: "ਬਕਾਇਆ",
    accepted: "ਸਵੀਕਾਰ ਕੀਤਾ",
    rejected: "ਰੱਦ ਕੀਤਾ",
    countered: "ਜਵਾਬੀ ਆਫਰ",
    noOffersYet: "ਅਜੇ ਤੱਕ ਕੋਈ ਆਫਰ ਨਹੀਂ",
    noOffersMessage: "ਤੁਹਾਨੂੰ ਅਜੇ ਤੱਕ ਕੋਈ ਆਫਰ ਨਹੀਂ ਮਿਲਿਆ ਹੈ",
    totalOffers: "ਕੁੱਲ ਆਫਰ",
    reviewOffers: "ਖਰੀਦਦਾਰਾਂ ਤੋਂ ਮਿਲੇ ਆਫਰ ਦੀ ਸਮੀਖਿਆ ਕਰੋ",
    offeredPrice: "ਆਫਰ ਕੀਮਤ",
    listed: "ਲਿਸਟਡ",
    quantity: "ਮਾਤਰਾ",
    date: "ਤਾਰੀਖ",
    message: "ਸੁਨੇਹਾ",
    yourCounter: "ਤੁਹਾਡਾ ਜਵਾਬੀ ਆਫਰ",
    waitingForBuyer: "ਖਰੀਦਦਾਰ ਦੇ ਜਵਾਬ ਦੀ ਉਡੀਕ",
    enterCounterPrice: "ਆਪਣੀ ਜਵਾਬੀ ਆਫਰ ਕੀਮਤ ਦਰਜ ਕਰੋ",
    counterSent: "₹{{price}} ਦਾ ਜਵਾਬੀ ਆਫਰ ਭੇਜਿਆ ਗਿਆ!",
    
    // Auth
    fillRequiredFields: "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਲੋੜੀਂਦੇ ਫੀਲਡ ਭਰੋ",
    selectCrop: "ਫਸਲ ਚੁਣੋ",
    wheat: "ਕਣਕ",
    rice: "ਚਾਵਲ",
    corn: "ਮੱਕੀ",
    barley: "ਜੌਂ",
    soybean: "ਸੋਇਆਬੀਨ",
    millet: "ਬਾਜਰਾ",
    potato: "ਆਲੂ",
    tomato: "ਟਮਾਟਰ",
    onion: "ਪਿਆਜ",
    perQuintal: "ਪ੍ਰਤੀ ਕੁਇੰਟਲ",
    perKg: "ਪ੍ਰਤੀ ਕਿਲੋ",
    perTon: "ਪ੍ਰਤੀ ਟਨ",
    description: "ਵੇਰਵਾ",
    descriptionPlaceholder: "ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਆਪਣੀ ਫਸਲ ਦੀ ਗੁਣਵੱਤਾ ਬਾਰੇ ਦੱਸੋ...",
    imageUrl: "ਚਿੱਤਰ URL",
    listCrop: "ਫਸਲ ਲਿਸਟ ਕਰੋ",
    cancel: "ਰੱਦ ਕਰੋ",
    foundFor: "ਲਈ ਮਿਲਿਆ",
    trySearching: "ਕੁਝ ਹੋਰ ਖੋਜਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    
    // Footer
    quickLinks: "ਤੁਰੰਤ ਲਿੰਕ",
    home: "ਹੋਮ",
    aboutUs: "ਸਾਡੇ ਬਾਰੇ",
    howItWorks: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ",
    contactUs: "ਸੰਪਰਕ ਕਰੋ",
    stayUpdated: "ਅਪਡੇਟ ਰਹੋ",
    subscribe: "ਸਬਸਕ੍ਰਾਈਬ ਕਰੋ",
    yourEmail: "ਤੁਹਾਡਾ ਈਮੇਲ ਪਤਾ",
    rightsReserved: "ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।",
    privacyPolicy: "ਪਰਾਈਵੇਸੀ ਨੀਤੀ",
    termsOfService: "ਸੇਵਾ ਦੀਆਂ ਸ਼ਰਤਾਂ"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
    return savedLang || 'en';
  });

  // Force re-render function
  const forceUpdate = () => {
    setLanguage(prev => prev);
  };

  const changeLanguage = (langCode) => {
    console.log('LanguageContext: changing to', langCode);
    setLanguage(langCode);
    localStorage.setItem('language', langCode);
    
    // Force re-render of all components
    setTimeout(() => {
      window.dispatchEvent(new Event('languageChange'));
    }, 10);
  };

  const t = (key, params = {}) => {
    if (!key) return '';
    
    const langTranslations = translations[language] || translations.en;
    let translation = langTranslations[key] || translations.en[key] || key;
    
    if (params && Object.keys(params).length > 0) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{{${param}}}`, params[param]);
      });
    }
    
    return translation;
  };

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const value = {
    language,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};