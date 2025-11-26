import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Trash2, User, ChevronRight, Check } from 'lucide-react';
import ConfidentWomanPortrait from '../assets/Confident_Woman_Portrait.png';
import SmilingIndividual from '../assets/Smiling_Individual.png';
import './Onboarding.css';

const Onboarding = () => {
  const { t, i18n } = useTranslation();
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [selectedAge, setSelectedAge] = useState(null);
  const [preferences, setPreferences] = useState({
    fontSize: 'medium',
    darkMode: false,
    voiceEnabled: false,
    highContrast: false
  });

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭' },
    { code: 'ee', name: 'Ewe', flag: '🇬🇭' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬' }
  ];

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('userLanguage', lang);
  };

  const handleNext = () => {
    if (step === 4) {
      // Save language to localStorage before completing onboarding
      localStorage.setItem('userLanguage', selectedLanguage);
      completeOnboarding({
        ageGroup: selectedAge,
        language: selectedLanguage,
        preferences
      });
    } else {
      setStep(step + 1);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const renderWelcomeScreen = () => (
    <motion.div
      className="onboarding-card glass-panel welcome-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="welcome-content">
        <div className="welcome-hero">
          <h1 className="app-logo">KasaEd</h1>
          <div className="tagline">{t('welcome.title')}</div>
        </div>

        <div className="welcome-images-container">
          <div className="image-wrapper woman-wrapper">
            <img src={ConfidentWomanPortrait} alt="Confident Woman" className="welcome-image" />
          </div>
          <div className="image-wrapper smiling-wrapper">
            <img src={SmilingIndividual} alt="Smiling Individual" className="welcome-image" />
          </div>
        </div>

        <p className="welcome-text">{t('welcome.subtitle')}</p>

        <button className="btn btn-primary btn-lg" onClick={() => setStep(1)}>
          Let's Go!! <ChevronRight size={24} />
        </button>
      </div>
    </motion.div>
  );

  const renderLanguageScreen = () => (
    <motion.div
      className="onboarding-card glass-panel"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <h2>{t('language.title')}</h2>
      <p className="subtitle">Select your preferred language</p>
      <div className="grid-2">
        {languages.map((lang) => (
          <div
            key={lang.code}
            className={`selection-card ${selectedLanguage === lang.code ? 'selected' : ''}`}
            onClick={() => handleLanguageSelect(lang.code)}
          >
            <span className="card-icon">{lang.flag}</span>
            <span className="card-title">{lang.name}</span>
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary"
        onClick={handleNext}
        disabled={!selectedLanguage}
      >
        {t('language.continue')} <ChevronRight size={20} />
      </button>
    </motion.div>
  );

  const renderPrivacyScreen = () => (
    <motion.div
      className="onboarding-card glass-panel"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <h2>{t('privacy.title')}</h2>
      <div className="privacy-list">
        <div className="privacy-item">
          <Lock className="privacy-icon" size={24} />
          <p>{t('privacy.point1')}</p>
        </div>
        <div className="privacy-item">
          <User className="privacy-icon" size={24} />
          <p>{t('privacy.point2')}</p>
        </div>
        <div className="privacy-item">
          <Shield className="privacy-icon" size={24} />
          <p>{t('privacy.point3')}</p>
        </div>
        <div className="privacy-item">
          <Trash2 className="privacy-icon" size={24} />
          <p>{t('privacy.point4')}</p>
        </div>
      </div>
      <label className="checkbox-label">
        <div className="toggle-switch">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
          />
          <span className="slider"></span>
        </div>
        <span>{t('privacy.accept')}</span>
      </label>
      <button
        className="btn btn-primary"
        onClick={handleNext}
        disabled={!privacyAccepted}
      >
        {t('privacy.acceptButton')} <ChevronRight size={20} />
      </button>
    </motion.div>
  );

  const renderAgeScreen = () => (
    <motion.div
      className="onboarding-card glass-panel"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <h2>{t('age.title')}</h2>
      <p className="subtitle">{t('age.subtitle')}</p>
      <div className="grid-2">
        <div
          className={`selection-card ${selectedAge === '13-17' ? 'selected' : ''}`}
          onClick={() => setSelectedAge('13-17')}
        >
          <span className="card-icon">👦👧</span>
          <span className="card-title">{t('age.teen')}</span>
        </div>
        <div
          className={`selection-card ${selectedAge === '18-25' ? 'selected' : ''}`}
          onClick={() => setSelectedAge('18-25')}
        >
          <span className="card-icon">👨👩</span>
          <span className="card-title">{t('age.youngAdult')}</span>
        </div>
        <div
          className={`selection-card ${selectedAge === '26+' ? 'selected' : ''}`}
          onClick={() => setSelectedAge('26+')}
        >
          <span className="card-icon">👴👵</span>
          <span className="card-title">{t('age.other')}</span>
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={handleNext}
        disabled={!selectedAge}
      >
        {t('age.continue')} <ChevronRight size={20} />
      </button>
    </motion.div>
  );

  const renderPreferencesScreen = () => (
    <motion.div
      className="onboarding-card glass-panel"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <h2>Customize Your Experience</h2>
      <div className="privacy-list">
        <label className="preference-row">
          <span>Larger Text</span>
          <div className="toggle-switch">
            <input
              type="checkbox"
              checked={preferences.fontSize === 'large'}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  fontSize: e.target.checked ? 'large' : 'medium'
                })
              }
            />
            <span className="slider"></span>
          </div>
        </label>
        <label className="preference-row">
          <span>Dark Mode</span>
          <div className="toggle-switch">
            <input
              type="checkbox"
              checked={preferences.darkMode}
              onChange={(e) =>
                setPreferences({ ...preferences, darkMode: e.target.checked })
              }
            />
            <span className="slider"></span>
          </div>
        </label>
        <label className="preference-row">
          <span>Voice Assistant</span>
          <div className="toggle-switch">
            <input
              type="checkbox"
              checked={preferences.voiceEnabled}
              onChange={(e) =>
                setPreferences({ ...preferences, voiceEnabled: e.target.checked })
              }
            />
            <span className="slider"></span>
          </div>
        </label>
        <label className="preference-row">
          <span>High Contrast</span>
          <div className="toggle-switch">
            <input
              type="checkbox"
              checked={preferences.highContrast}
              onChange={(e) =>
                setPreferences({ ...preferences, highContrast: e.target.checked })
              }
            />
            <span className="slider"></span>
          </div>
        </label>
      </div>
      <button className="btn btn-primary" onClick={handleNext}>
        Start Chatting! <Check size={20} />
      </button>
    </motion.div>
  );

  return (
    <div className="onboarding-container">
      {step > 0 && (
        <div className="progress-dots">
          {[1, 2, 3, 4].map((dot) => (
            <motion.span
              key={dot}
              className={`dot ${step >= dot ? 'active' : ''} ${step > dot ? 'completed' : ''}`}
              initial={false}
              animate={{ scale: step === dot ? 1.5 : 1 }}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 0 && <React.Fragment key="welcome">{renderWelcomeScreen()}</React.Fragment>}
        {step === 1 && <React.Fragment key="language">{renderLanguageScreen()}</React.Fragment>}
        {step === 2 && <React.Fragment key="privacy">{renderPrivacyScreen()}</React.Fragment>}
        {step === 3 && <React.Fragment key="age">{renderAgeScreen()}</React.Fragment>}
        {step === 4 && <React.Fragment key="prefs">{renderPreferencesScreen()}</React.Fragment>}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
