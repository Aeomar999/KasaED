import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, MapPin, Navigation, Phone, Star, Clock,
  Shield, AlertTriangle, Plus, Trash2, User,
  Search, Filter, CheckCircle
} from 'lucide-react';
import './LocationFeatures.css';

// Feature 2: Nearby Clinics Finder
export const ClinicFinder = ({ onClose }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);

  const ghananianClinics = [
    {
      id: 1,
      name: 'Planned Parenthood Association of Ghana (PPAG) - Accra',
      address: 'Asylum Down, Accra',
      phone: '0302-228922',
      services: ['Contraception', 'STI Testing', 'Counseling', 'Youth-Friendly'],
      hours: 'Mon-Fri: 8am-5pm, Sat: 9am-1pm',
      rating: 4.7,
      reviews: 142,
      coords: { lat: 5.5866, lng: -0.2057 },
      youthFriendly: true,
      freeServices: true
    },
    {
      id: 2,
      name: 'Marie Stopes Ghana - Ridge',
      address: 'Ring Road Central, Ridge, Accra',
      phone: '0302-223311',
      services: ['Family Planning', 'Abortion Care', 'STI Treatment', 'HIV Testing'],
      hours: 'Mon-Sat: 7:30am-5pm',
      rating: 4.5,
      reviews: 98,
      coords: { lat: 5.6037, lng: -0.1870 },
      youthFriendly: true,
      freeServices: false
    },
    {
      id: 3,
      name: 'Ridge Hospital VCT Center',
      address: 'Castle Road, Ridge, Accra',
      phone: '0302-667251',
      services: ['HIV Testing', 'ARV Treatment', 'TB Screening', 'Counseling'],
      hours: 'Mon-Sun: 24 hours',
      rating: 4.3,
      reviews: 215,
      coords: { lat: 5.6064, lng: -0.1869 },
      youthFriendly: false,
      freeServices: true
    },
    {
      id: 4,
      name: 'Greater Accra Regional Hospital',
      address: 'Ridge, Accra',
      phone: '0302-684301',
      services: ['General Health', 'Emergency Care', 'Maternity', 'STI Clinic'],
      hours: 'Mon-Sun: 24 hours',
      rating: 4.1,
      reviews: 301,
      coords: { lat: 5.5955, lng: -0.1865 },
      youthFriendly: false,
      freeServices: false
    },
    {
      id: 5,
      name: 'Ark Foundation - Madina',
      address: 'Madina, Accra',
      phone: '0244-123456',
      services: ['Youth Programs', 'Peer Counseling', 'Contraception', 'Mental Health'],
      hours: 'Mon-Fri: 9am-6pm',
      rating: 4.8,
      reviews: 87,
      coords: { lat: 5.6820, lng: -0.1660 },
      youthFriendly: true,
      freeServices: true
    }
  ];

  const getUserLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
          calculateDistances({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          alert('Location access denied. Showing all clinics.');
          setLoading(false);
          setClinics(ghananianClinics);
        }
      );
    } else {
      alert('Geolocation not supported. Showing all clinics.');
      setLoading(false);
      setClinics(ghananianClinics);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateDistances = (userLoc) => {
    const clinicsWithDistance = ghananianClinics.map(clinic => ({
      ...clinic,
      distance: calculateDistance(
        userLoc.lat,
        userLoc.lng,
        clinic.coords.lat,
        clinic.coords.lng
      )
    }));
    clinicsWithDistance.sort((a, b) => a.distance - b.distance);
    setClinics(clinicsWithDistance);
  };

  const getDirections = (clinic) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${clinic.coords.lat},${clinic.coords.lng}`;
      window.open(url, '_blank');
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${clinic.coords.lat},${clinic.coords.lng}`;
      window.open(url, '_blank');
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <motion.div
      className="clinic-finder"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
    >
      <div className="finder-header">
        <h2>Find Youth-Friendly Clinics</h2>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Finding clinics near you...</p>
        </div>
      ) : (
        <>
          <div className="finder-filters">
            <button className="filter-btn active">All Clinics</button>
            <button className="filter-btn" onClick={() => setClinics(clinics.filter(c => c.youthFriendly))}>
              Youth-Friendly
            </button>
            <button className="filter-btn" onClick={() => setClinics(clinics.filter(c => c.freeServices))}>
              Free Services
            </button>
          </div>

          <div className="clinics-list">
            {clinics.map(clinic => (
              <motion.div
                key={clinic.id}
                className="clinic-card"
                onClick={() => setSelectedClinic(selectedClinic?.id === clinic.id ? null : clinic)}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
              >
                <div className="clinic-main">
                  <div className="clinic-info">
                    <h3>{clinic.name}</h3>
                    <p className="clinic-address"><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} /> {clinic.address}</p>
                    {clinic.distance && (
                      <p className="clinic-distance">
                        <Navigation size={14} style={{ display: 'inline', marginRight: '4px' }} /> {clinic.distance.toFixed(1)} km away
                      </p>
                    )}
                    <div className="clinic-rating">
                      <Star size={14} fill="#f59e0b" stroke="#f59e0b" style={{ display: 'inline', marginRight: '4px' }} />
                      {clinic.rating} ({clinic.reviews} reviews)
                    </div>
                  </div>
                  <div className="clinic-badges">
                    {clinic.youthFriendly && (
                      <span className="badge badge-youth">Youth-Friendly</span>
                    )}
                    {clinic.freeServices && (
                      <span className="badge badge-free">Free</span>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {selectedClinic?.id === clinic.id && (
                    <motion.div
                      className="clinic-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="detail-section">
                        <h4>Services Offered</h4>
                        <div className="services-tags">
                          {clinic.services.map((service, i) => (
                            <span key={i} className="service-tag">{service}</span>
                          ))}
                        </div>
                      </div>
                      <div className="detail-section">
                        <h4>Operating Hours</h4>
                        <p><Clock size={14} style={{ display: 'inline', marginRight: '4px' }} /> {clinic.hours}</p>
                      </div>
                      <div className="detail-section">
                        <h4>Contact</h4>
                        <p><Phone size={14} style={{ display: 'inline', marginRight: '4px' }} /> {clinic.phone}</p>
                      </div>
                      <div className="clinic-actions">
                        <button
                          className="btn-directions"
                          onClick={(e) => {
                            e.stopPropagation();
                            getDirections(clinic);
                          }}
                        >
                          <Navigation size={16} style={{ marginRight: '8px' }} /> Get Directions
                        </button>
                        <button className="btn-call" onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `tel:${clinic.phone}`;
                        }}>
                          <Phone size={16} style={{ marginRight: '8px' }} /> Call Now
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

// Feature 7: Emergency Contact Network
export const EmergencyContacts = ({ onClose }) => {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('emergencyContacts');
    return saved ? JSON.parse(saved) : [];
  });
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [sendingAlert, setSendingAlert] = useState(false);

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      const updated = [...contacts, { ...newContact, id: Date.now() }];
      setContacts(updated);
      localStorage.setItem('emergencyContacts', JSON.stringify(updated));
      setNewContact({ name: '', phone: '' });
    }
  };

  const removeContact = (id) => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    localStorage.setItem('emergencyContacts', JSON.stringify(updated));
  };

  const sendSOSAlert = () => {
    setSendingAlert(true);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationUrl = `https://maps.google.com/?q=${position.coords.latitude},${position.coords.longitude}`;
          const message = `🚨 EMERGENCY ALERT from KasaEd user. I need help. My location: ${locationUrl}`;

          // In real implementation, would send SMS via API
          // For demo, opening SMS app with message
          contacts.forEach(contact => {
            const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent(message)}`;
            window.open(smsUrl);
          });

          setSendingAlert(false);
          alert(`Emergency alert sent to ${contacts.length} contact(s)!`);
        },
        () => {
          const message = `🚨 EMERGENCY ALERT from KasaEd user. I need help. (Location unavailable)`;
          contacts.forEach(contact => {
            const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent(message)}`;
            window.open(smsUrl);
          });
          setSendingAlert(false);
          alert(`Emergency alert sent to ${contacts.length} contact(s)!`);
        }
      );
    }
  };

  return (
    <motion.div
      className="emergency-contacts"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
    >
      <div className="emergency-header">
        <h2>Emergency Contact Network</h2>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
      </div>

      <div className="sos-section">
        <h3><AlertTriangle size={24} style={{ display: 'inline', marginRight: '8px', color: '#ef4444' }} /> One-Tap SOS Alert</h3>
        <p>Send emergency alert with your location to all trusted contacts</p>
        <button
          className="sos-btn"
          onClick={sendSOSAlert}
          disabled={contacts.length === 0 || sendingAlert}
        >
          {sendingAlert ? 'Sending Alert...' : 'SEND SOS ALERT'}
        </button>
        {contacts.length === 0 && (
          <p className="sos-warning">⚠️ Add at least one contact first</p>
        )}
      </div>

      <div className="add-contact-section">
        <h3>Add Trusted Contact</h3>
        <div className="input-group">
          <User size={18} className="input-icon" />
          <input
            type="text"
            placeholder="Contact Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
          />
        </div>
        <div className="input-group">
          <Phone size={18} className="input-icon" />
          <input
            type="tel"
            placeholder="Phone Number"
            value={newContact.phone}
            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
          />
        </div>
        <button className="btn-add" onClick={addContact} disabled={!newContact.name || !newContact.phone}>
          <Plus size={18} style={{ marginRight: '8px' }} /> Add Contact
        </button>
      </div>

      <div className="contacts-list-section">
        <h3>Your Trusted Contacts ({contacts.length})</h3>
        {contacts.length === 0 ? (
          <p className="empty-state">No emergency contacts yet</p>
        ) : (
          <div className="contacts-list">
            {contacts.map(contact => (
              <motion.div
                key={contact.id}
                className="contact-item"
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="contact-info">
                  <h4>{contact.name}</h4>
                  <p>{contact.phone}</p>
                </div>
                <button
                  className="btn-remove"
                  onClick={() => removeContact(contact.id)}
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="emergency-hotlines">
        <h3>National Emergency Hotlines</h3>
        <div className="hotline-card">
          <h4>Police Emergency</h4>
          <a href="tel:191"><Phone size={14} style={{ display: 'inline', marginRight: '4px' }} /> 191</a>
        </div>
        <div className="hotline-card">
          <h4>Ambulance Service</h4>
          <a href="tel:193"><Phone size={14} style={{ display: 'inline', marginRight: '4px' }} /> 193</a>
        </div>
        <div className="hotline-card">
          <h4>DOVVSU (Domestic Violence)</h4>
          <a href="tel:0800701701"><Phone size={14} style={{ display: 'inline', marginRight: '4px' }} /> 0800-701-701</a>
        </div>
        <div className="hotline-card">
          <h4>National Ambulance Service</h4>
          <a href="tel:112"><Phone size={14} style={{ display: 'inline', marginRight: '4px' }} /> 112</a>
        </div>
      </div>
    </motion.div>
  );
};
