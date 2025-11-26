import React, { useState } from 'react';
import './WellnessFeatures.css';

// Feature 13: Nutrition & Wellness
export const NutritionWellness = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('nutrition');

  const nutritionTips = [
    {
      category: 'Reproductive Health',
      icon: '🥗',
      tips: [
        'Iron-rich foods (spinach, beans) help during menstruation',
        'Folic acid (leafy greens) supports reproductive health',
        'Omega-3 fatty acids reduce menstrual cramps',
        'Calcium and Vitamin D support bone health during puberty'
      ]
    },
    {
      category: 'Hormonal Balance',
      icon: '🥑',
      tips: [
        'Complex carbs stabilize blood sugar and mood',
        'Healthy fats support hormone production',
        'Limit processed foods to reduce inflammation',
        'Stay hydrated - aim for 8 glasses of water daily'
      ]
    },
    {
      category: 'Energy & Mood',
      icon: '🍊',
      tips: [
        'B vitamins boost energy (whole grains, eggs)',
        'Magnesium reduces stress (nuts, seeds)',
        'Vitamin C supports immune function (citrus fruits)',
        'Protein helps maintain stable energy levels'
      ]
    }
  ];

  const exerciseTips = [
    {
      title: 'For Menstrual Health',
      icon: '🧘‍♀️',
      activities: [
        'Gentle yoga reduces cramps and bloating',
        'Walking improves circulation and mood',
        'Swimming is low-impact and soothing',
        'Stretching relieves tension'
      ]
    },
    {
      title: 'For Stress Relief',
      icon: '🏃‍♀️',
      activities: [
        'Aerobic exercise releases endorphins',
        'Dance improves mood and confidence',
        'Team sports build social connections',
        'Martial arts build confidence and focus'
      ]
    },
    {
      title: 'For Better Sleep',
      icon: '🌙',
      activities: [
        'Exercise 3-4 hours before bed',
        'Avoid intense workouts late at night',
        'Try gentle stretching before sleep',
        'Aim for 30 minutes daily activity'
      ]
    }
  ];

  const sleepHygiene = [
    {
      tip: 'Consistent Schedule',
      description: 'Go to bed and wake up at the same time daily',
      icon: '⏰'
    },
    {
      tip: 'Screen-Free Time',
      description: 'No phones/tablets 1 hour before bed',
      icon: '📱'
    },
    {
      tip: 'Cool Environment',
      description: 'Keep bedroom cool, dark, and quiet',
      icon: '🌡️'
    },
    {
      tip: 'Relaxation Routine',
      description: 'Read, meditate, or gentle stretching',
      icon: '📖'
    },
    {
      tip: 'Limit Caffeine',
      description: 'No coffee/energy drinks after 2pm',
      icon: '☕'
    },
    {
      tip: 'Physical Activity',
      description: 'Regular exercise improves sleep quality',
      icon: '💪'
    }
  ];

  const stressReduction = [
    {
      technique: 'Deep Breathing',
      description: 'Inhale for 4, hold for 4, exhale for 4',
      duration: '5 minutes',
      icon: '🫁'
    },
    {
      technique: 'Progressive Muscle Relaxation',
      description: 'Tense and release each muscle group',
      duration: '10 minutes',
      icon: '💆'
    },
    {
      technique: 'Mindfulness Meditation',
      description: 'Focus on present moment without judgment',
      duration: '10-20 minutes',
      icon: '🧘'
    },
    {
      technique: 'Journaling',
      description: 'Write thoughts and feelings freely',
      duration: '15 minutes',
      icon: '📝'
    },
    {
      technique: 'Nature Walk',
      description: 'Spend time outdoors, observe surroundings',
      duration: '20-30 minutes',
      icon: '🌳'
    }
  ];

  return (
    <div className="nutrition-wellness">
      <div className="wellness-header">
        <h2>Nutrition & Wellness</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="wellness-tabs">
        <button
          className={`tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
          onClick={() => setActiveTab('nutrition')}
        >
          🍎 Nutrition
        </button>
        <button
          className={`tab-btn ${activeTab === 'exercise' ? 'active' : ''}`}
          onClick={() => setActiveTab('exercise')}
        >
          🏃 Exercise
        </button>
        <button
          className={`tab-btn ${activeTab === 'sleep' ? 'active' : ''}`}
          onClick={() => setActiveTab('sleep')}
        >
          😴 Sleep
        </button>
        <button
          className={`tab-btn ${activeTab === 'stress' ? 'active' : ''}`}
          onClick={() => setActiveTab('stress')}
        >
          🧘 Stress Relief
        </button>
      </div>

      <div className="wellness-content">
        {activeTab === 'nutrition' && (
          <div className="nutrition-section">
            {nutritionTips.map((section, i) => (
              <div key={i} className="wellness-card">
                <h3>
                  <span className="card-icon">{section.icon}</span>
                  {section.category}
                </h3>
                <ul>
                  {section.tips.map((tip, j) => (
                    <li key={j}>{tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'exercise' && (
          <div className="exercise-section">
            {exerciseTips.map((section, i) => (
              <div key={i} className="wellness-card">
                <h3>
                  <span className="card-icon">{section.icon}</span>
                  {section.title}
                </h3>
                <ul>
                  {section.activities.map((activity, j) => (
                    <li key={j}>{activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sleep' && (
          <div className="sleep-section">
            <div className="sleep-grid">
              {sleepHygiene.map((item, i) => (
                <div key={i} className="sleep-card">
                  <div className="sleep-icon">{item.icon}</div>
                  <h4>{item.tip}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stress' && (
          <div className="stress-section">
            {stressReduction.map((technique, i) => (
              <div key={i} className="stress-card">
                <div className="stress-header">
                  <span className="stress-icon">{technique.icon}</span>
                  <div>
                    <h4>{technique.technique}</h4>
                    <span className="duration">⏱️ {technique.duration}</span>
                  </div>
                </div>
                <p>{technique.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Feature 9: Anonymous Telemedicine
export const Telemedicine = ({ onClose }) => {
  const [step, setStep] = useState('booking'); // booking, waiting, consultation
  const [formData, setFormData] = useState({
    concern: '',
    symptoms: '',
    urgency: 'routine',
    preferredTime: ''
  });

  const concerns = [
    'Contraception Consultation',
    'STI Concerns',
    'Menstrual Issues',
    'Pregnancy Questions',
    'Mental Health Support',
    'General SRH Questions'
  ];

  const availableDoctors = [
    {
      id: 1,
      name: 'Dr. Ama Mensah',
      specialty: 'Reproductive Health',
      rating: 4.9,
      nextAvailable: 'Today 2:00 PM',
      languages: ['English', 'Twi']
    },
    {
      id: 2,
      name: 'Dr. Kwame Osei',
      specialty: 'Sexual Health',
      rating: 4.8,
      nextAvailable: 'Today 4:30 PM',
      languages: ['English', 'Ga']
    },
    {
      id: 3,
      name: 'Dr. Abena Adjei',
      specialty: 'Youth Counseling',
      rating: 4.9,
      nextAvailable: 'Tomorrow 10:00 AM',
      languages: ['English', 'Ewe']
    }
  ];

  const handleSubmit = () => {
    if (formData.concern && formData.symptoms) {
      setStep('waiting');
      // Simulate matching with doctor
      setTimeout(() => setStep('confirmation'), 2000);
    }
  };

  if (step === 'confirmation') {
    return (
      <div className="telemedicine">
        <div className="telemedicine-header">
          <h2>Consultation Booked!</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="confirmation-content">
          <div className="success-icon">✅</div>
          <h3>Your appointment is confirmed</h3>
          
          <div className="appointment-details">
            <div className="detail-row">
              <span className="detail-label">Doctor:</span>
              <span className="detail-value">Dr. Ama Mensah</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date & Time:</span>
              <span className="detail-value">Today, 2:00 PM</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Type:</span>
              <span className="detail-value">Video Consultation</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Session ID:</span>
              <span className="detail-value">#KE-{Math.floor(Math.random() * 10000)}</span>
            </div>
          </div>

          <div className="preparation-tips">
            <h4>Before Your Consultation</h4>
            <ul>
              <li>Find a private, quiet space</li>
              <li>Test your camera and microphone</li>
              <li>Have any questions written down</li>
              <li>Be ready 5 minutes early</li>
            </ul>
          </div>

          <button className="btn-primary">
            📞 Join Video Call (when ready)
          </button>
        </div>
      </div>
    );
  }

  if (step === 'waiting') {
    return (
      <div className="telemedicine">
        <div className="matching-content">
          <div className="spinner-large"></div>
          <h3>Finding available doctor...</h3>
          <p>This will only take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="telemedicine">
      <div className="telemedicine-header">
        <h2>Anonymous Telemedicine</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="telemedicine-intro">
        <p>🔒 <strong>100% Confidential</strong> - No personal identification required</p>
        <p>💬 Connect with certified healthcare providers via video or chat</p>
      </div>

      <div className="booking-form">
        <div className="form-group">
          <label>What brings you here today?</label>
          <select
            value={formData.concern}
            onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
          >
            <option value="">Select a concern</option>
            {concerns.map((concern, i) => (
              <option key={i} value={concern}>{concern}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Describe your symptoms or questions</label>
          <textarea
            rows="4"
            placeholder="The more details you provide, the better we can help..."
            value={formData.symptoms}
            onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Urgency Level</label>
          <div className="urgency-options">
            <button
              className={`urgency-btn ${formData.urgency === 'urgent' ? 'selected urgent' : ''}`}
              onClick={() => setFormData({ ...formData, urgency: 'urgent' })}
            >
              🚨 Urgent<br/>
              <span>Within 1 hour</span>
            </button>
            <button
              className={`urgency-btn ${formData.urgency === 'soon' ? 'selected soon' : ''}`}
              onClick={() => setFormData({ ...formData, urgency: 'soon' })}
            >
              ⏰ Soon<br/>
              <span>Today</span>
            </button>
            <button
              className={`urgency-btn ${formData.urgency === 'routine' ? 'selected routine' : ''}`}
              onClick={() => setFormData({ ...formData, urgency: 'routine' })}
            >
              📅 Routine<br/>
              <span>Next few days</span>
            </button>
          </div>
        </div>

        <div className="available-doctors">
          <h3>Available Doctors</h3>
          {availableDoctors.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-info">
                <div className="doctor-avatar">👨‍⚕️</div>
                <div>
                  <h4>{doctor.name}</h4>
                  <p className="specialty">{doctor.specialty}</p>
                  <p className="languages">{doctor.languages.join(', ')}</p>
                  <div className="doctor-rating">⭐ {doctor.rating}</div>
                </div>
              </div>
              <div className="doctor-availability">
                <span className="available-time">{doctor.nextAvailable}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          className="btn-book"
          onClick={handleSubmit}
          disabled={!formData.concern || !formData.symptoms}
        >
          Book Anonymous Consultation
        </button>

        <p className="privacy-note">
          🔒 Your identity remains anonymous. Doctors see only your age group and concern.
        </p>
      </div>
    </div>
  );
};

// Feature 24: Cultural Sensitivity Customization
export const CulturalSettings = ({ onClose }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('culturalSettings');
    return saved ? JSON.parse(saved) : {
      religion: '',
      culturalPractices: [],
      languagePreference: 'en',
      contentSensitivity: 'moderate'
    };
  });

  const religions = [
    'Christianity', 'Islam', 'Traditional African Religion', 
    'No Religious Affiliation', 'Prefer not to say'
  ];

  const culturalPractices = [
    'Female Genital Cutting awareness',
    'Traditional healing integration',
    'Marriage customs consideration',
    'Virginity cultural importance',
    'Family planning cultural views'
  ];

  const saveSettings = () => {
    localStorage.setItem('culturalSettings', JSON.stringify(settings));
    alert('Cultural preferences saved!');
    onClose();
  };

  const togglePractice = (practice) => {
    const updated = settings.culturalPractices.includes(practice)
      ? settings.culturalPractices.filter(p => p !== practice)
      : [...settings.culturalPractices, practice];
    setSettings({ ...settings, culturalPractices: updated });
  };

  return (
    <div className="cultural-settings">
      <div className="cultural-header">
        <h2>Cultural Sensitivity Settings</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <p className="cultural-intro">
        Customize KasaEd to respect your cultural and religious values while providing accurate health information.
      </p>

      <div className="settings-form">
        <div className="form-section">
          <h3>Religious Considerations</h3>
          <select
            value={settings.religion}
            onChange={(e) => setSettings({ ...settings, religion: e.target.value })}
          >
            <option value="">Select your religion</option>
            {religions.map((rel, i) => (
              <option key={i} value={rel}>{rel}</option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <h3>Cultural Practices Awareness</h3>
          <p className="section-note">Select topics where you'd like culturally-sensitive information</p>
          {culturalPractices.map((practice, i) => (
            <label key={i} className="checkbox-label">
              <input
                type="checkbox"
                checked={settings.culturalPractices.includes(practice)}
                onChange={() => togglePractice(practice)}
              />
              <span>{practice}</span>
            </label>
          ))}
        </div>

        <div className="form-section">
          <h3>Content Sensitivity Level</h3>
          <div className="sensitivity-options">
            <label className="radio-label">
              <input
                type="radio"
                name="sensitivity"
                value="conservative"
                checked={settings.contentSensitivity === 'conservative'}
                onChange={(e) => setSettings({ ...settings, contentSensitivity: e.target.value })}
              />
              <span>
                <strong>Conservative</strong><br/>
                Focus on abstinence, limited explicit content
              </span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="sensitivity"
                value="moderate"
                checked={settings.contentSensitivity === 'moderate'}
                onChange={(e) => setSettings({ ...settings, contentSensitivity: e.target.value })}
              />
              <span>
                <strong>Moderate</strong><br/>
                Balanced approach with options for all
              </span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="sensitivity"
                value="open"
                checked={settings.contentSensitivity === 'open'}
                onChange={(e) => setSettings({ ...settings, contentSensitivity: e.target.value })}
              />
              <span>
                <strong>Open</strong><br/>
                Comprehensive, direct information
              </span>
            </label>
          </div>
        </div>

        <button className="btn-save" onClick={saveSettings}>
          Save Cultural Preferences
        </button>
      </div>
    </div>
  );
};
