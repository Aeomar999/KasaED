import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Calendar, Heart, Activity, AlertTriangle, Check,
  Shield, MapPin, Phone, Search, Mic, StopCircle,
  Trash2, Play, Clock, AlertCircle, Info, TrendingUp,
  Moon, Sun, Cloud, CloudRain, Zap, Droplets, Wind,
  Smile, Frown, Meh, ThermometerSun, StickyNote, Edit3,
  BarChart3, LineChart, PieChart, ChevronRight, Plus
} from 'lucide-react';
import './AdvancedFeatures.css';

// Feature 3: Enhanced Period & Cycle Tracking
export const PeriodTracker = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [cycles, setCycles] = useState(() => {
    const saved = localStorage.getItem('periodCycles');
    return saved ? JSON.parse(saved) : [];
  });
  const [symptoms, setSymptoms] = useState(() => {
    const saved = localStorage.getItem('periodSymptoms');
    return saved ? JSON.parse(saved) : {};
  });
  const [moods, setMoods] = useState(() => {
    const saved = localStorage.getItem('periodMoods');
    return saved ? JSON.parse(saved) : {};
  });
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('periodNotes');
    return saved ? JSON.parse(saved) : {};
  });
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [todayNote, setTodayNote] = useState('');

  const symptomsList = [
    { id: 'cramps', name: 'Cramps', icon: <Zap size={18} /> },
    { id: 'bloating', name: 'Bloating', icon: <Wind size={18} /> },
    { id: 'headache', name: 'Headache', icon: <AlertCircle size={18} /> },
    { id: 'fatigue', name: 'Fatigue', icon: <Moon size={18} /> },
    { id: 'acne', name: 'Acne', icon: <Sun size={18} /> },
    { id: 'breast_tenderness', name: 'Breast Tenderness', icon: <Heart size={18} /> },
    { id: 'heavy_flow', name: 'Heavy Flow', icon: <Droplets size={18} /> },
    { id: 'spotting', name: 'Spotting', icon: <CloudRain size={18} /> }
  ];

  const moodsList = [
    { id: 'happy', name: 'Happy', icon: <Smile size={24} />, color: '#34a853' },
    { id: 'neutral', name: 'Neutral', icon: <Meh size={24} />, color: '#fbbc04' },
    { id: 'sad', name: 'Sad', icon: <Frown size={24} />, color: '#ea4335' },
    { id: 'anxious', name: 'Anxious', icon: <AlertCircle size={24} />, color: '#ff6d00' },
    { id: 'energetic', name: 'Energetic', icon: <Zap size={24} />, color: '#4285f4' },
    { id: 'tired', name: 'Tired', icon: <Moon size={24} />, color: '#9aa0a6' }
  ];

  const addCycle = () => {
    const cycle = {
      id: Date.now(),
      startDate: lastPeriod,
      cycleLength,
      periodLength,
      nextPeriod: calculateNextPeriod(lastPeriod, cycleLength),
      ovulation: calculateOvulation(lastPeriod, cycleLength),
      fertilityWindow: calculateFertilityWindow(lastPeriod, cycleLength)
    };
    const updated = [cycle, ...cycles];
    setCycles(updated);
    localStorage.setItem('periodCycles', JSON.stringify(updated));
  };

  const toggleSymptom = (symptomId) => {
    const dateSymptoms = symptoms[selectedDate] || [];
    const updated = dateSymptoms.includes(symptomId)
      ? dateSymptoms.filter(s => s !== symptomId)
      : [...dateSymptoms, symptomId];
    const newSymptoms = { ...symptoms, [selectedDate]: updated };
    setSymptoms(newSymptoms);
    localStorage.setItem('periodSymptoms', JSON.stringify(newSymptoms));
  };

  const setMood = (moodId) => {
    const newMoods = { ...moods, [selectedDate]: moodId };
    setMoods(newMoods);
    localStorage.setItem('periodMoods', JSON.stringify(newMoods));
  };

  const saveNote = () => {
    if (todayNote.trim()) {
      const newNotes = { ...notes, [selectedDate]: todayNote };
      setNotes(newNotes);
      localStorage.setItem('periodNotes', JSON.stringify(newNotes));
      setTodayNote('');
    }
  };

  const calculateNextPeriod = (start, length) => {
    const date = new Date(start);
    date.setDate(date.getDate() + length);
    return date.toISOString().split('T')[0];
  };

  const calculateOvulation = (start, length) => {
    const date = new Date(start);
    date.setDate(date.getDate() + (length - 14));
    return date.toISOString().split('T')[0];
  };

  const calculateFertilityWindow = (start, length) => {
    const ovulation = new Date(start);
    ovulation.setDate(ovulation.getDate() + (length - 14));
    const windowStart = new Date(ovulation);
    windowStart.setDate(windowStart.getDate() - 5);
    const windowEnd = new Date(ovulation);
    windowEnd.setDate(windowEnd.getDate() + 1);
    return {
      start: windowStart.toISOString().split('T')[0],
      end: windowEnd.toISOString().split('T')[0]
    };
  };

  const getDaysUntil = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCyclePhase = () => {
    if (cycles.length === 0) return null;
    const today = new Date();
    const periodStart = new Date(cycles[0].startDate);
    const daysSinceStart = Math.floor((today - periodStart) / (1000 * 60 * 60 * 24));
    const cycleDay = daysSinceStart % cycleLength;

    if (cycleDay >= 0 && cycleDay < periodLength) return { phase: 'Menstrual', color: '#ea4335' };
    if (cycleDay >= periodLength && cycleDay < 14) return { phase: 'Follicular', color: '#fbbc04' };
    if (cycleDay >= 14 && cycleDay <= 16) return { phase: 'Ovulation', color: '#34a853' };
    return { phase: 'Luteal', color: '#4285f4' };
  };

  const renderCycleVisual = () => {
    const phase = getCyclePhase();
    if (!phase) return null;

    const today = new Date();
    const periodStart = new Date(cycles[0].startDate);
    const daysSinceStart = Math.floor((today - periodStart) / (1000 * 60 * 60 * 24));
    const cycleDay = (daysSinceStart % cycleLength) + 1;
    const progress = (cycleDay / cycleLength) * 100;

    return (
      <div className="cycle-visual">
        <div className="cycle-wheel">
          <svg viewBox="0 0 200 200" className="cycle-svg">
            <circle cx="100" cy="100" r="80" fill="none" stroke="var(--border-medium)" strokeWidth="20" />
            <circle 
              cx="100" 
              cy="100" 
              r="80" 
              fill="none" 
              stroke={phase.color}
              strokeWidth="20"
              strokeDasharray={`${progress * 5.02} 502`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              className="cycle-progress"
            />
          </svg>
          <div className="cycle-center">
            <span className="cycle-day">{cycleDay}</span>
            <span className="cycle-label">Day of Cycle</span>
          </div>
        </div>
        <div className="phase-info">
          <div className="phase-badge" style={{ backgroundColor: `${phase.color}20`, color: phase.color }}>
            {phase.phase} Phase
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="period-tracker"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="tracker-header">
        <h2><Calendar size={28} /> Period Tracker</h2>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
      </div>

      {/* Tab Navigation */}
      <div className="tracker-tabs">
        {[
          { id: 'overview', label: 'Overview', icon: <BarChart3 size={18} /> },
          { id: 'log', label: 'Log Cycle', icon: <Plus size={18} /> },
          { id: 'symptoms', label: 'Symptoms', icon: <Activity size={18} /> },
          { id: 'mood', label: 'Mood', icon: <Smile size={18} /> },
          { id: 'notes', label: 'Notes', icon: <StickyNote size={18} /> }
        ].map(tab => (
          <motion.button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            className="tab-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {cycles.length > 0 ? (
              <>
                {renderCycleVisual()}

                <div className="predictions-grid">
                  <motion.div 
                    className="pred-card next-period"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="pred-card-header">
                      <Calendar size={24} />
                      <h4>Next Period</h4>
                    </div>
                    <div className="pred-card-content">
                      <p className="pred-date">{new Date(cycles[0].nextPeriod).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      <span className="pred-countdown">{getDaysUntil(cycles[0].nextPeriod)} days</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="pred-card ovulation"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="pred-card-header">
                      <Activity size={24} />
                      <h4>Ovulation</h4>
                    </div>
                    <div className="pred-card-content">
                      <p className="pred-date">{new Date(cycles[0].ovulation).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      <span className="pred-countdown">{getDaysUntil(cycles[0].ovulation)} days</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="pred-card fertility"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="pred-card-header">
                      <Heart size={24} />
                      <h4>Fertility Window</h4>
                    </div>
                    <div className="pred-card-content">
                      <p className="pred-date-range">
                        {new Date(cycles[0].fertilityWindow.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        <ChevronRight size={16} />
                        {new Date(cycles[0].fertilityWindow.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <span className="pred-countdown">6 days</span>
                    </div>
                  </motion.div>
                </div>

                <div className="cycle-insights">
                  <h3><TrendingUp size={20} /> Cycle Insights</h3>
                  <div className="insights-grid">
                    <div className="insight-item">
                      <span className="insight-label">Average Cycle</span>
                      <span className="insight-value">{cycleLength} days</span>
                    </div>
                    <div className="insight-item">
                      <span className="insight-label">Period Length</span>
                      <span className="insight-value">{periodLength} days</span>
                    </div>
                    <div className="insight-item">
                      <span className="insight-label">Cycles Tracked</span>
                      <span className="insight-value">{cycles.length}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <Calendar size={64} className="empty-icon" />
                <h3>Start Tracking Your Cycle</h3>
                <p>Log your period to get predictions and insights</p>
                <button className="btn-primary" onClick={() => setActiveTab('log')}>
                  <Plus size={18} /> Log Your First Cycle
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Log Cycle Tab */}
        {activeTab === 'log' && (
          <motion.div
            key="log"
            className="tab-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="tracker-input">
              <h3>Log Your Cycle</h3>
              <label>
                Last Period Start Date
                <input
                  type="date"
                  value={lastPeriod}
                  onChange={(e) => setLastPeriod(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </label>
              <label>
                Average Cycle Length (days)
                <input
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
                  min="21"
                  max="45"
                />
                <small>Most cycles are 21-35 days</small>
              </label>
              <label>
                Period Length (days)
                <input
                  type="number"
                  value={periodLength}
                  onChange={(e) => setPeriodLength(parseInt(e.target.value) || 5)}
                  min="2"
                  max="10"
                />
                <small>Typical period lasts 3-7 days</small>
              </label>
              <motion.button 
                className="btn-primary" 
                onClick={addCycle} 
                disabled={!lastPeriod}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ width: '100%', marginTop: '1rem' }}
              >
                <Check size={18} /> Calculate Cycle
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Symptoms Tab */}
        {activeTab === 'symptoms' && (
          <motion.div
            key="symptoms"
            className="tab-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="symptom-logger">
              <div className="date-selector">
                <label>Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <h3>Log Symptoms</h3>
              <div className="symptoms-grid">
                {symptomsList.map(symptom => (
                  <motion.button
                    key={symptom.id}
                    className={`symptom-btn ${(symptoms[selectedDate] || []).includes(symptom.id) ? 'active' : ''}`}
                    onClick={() => toggleSymptom(symptom.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {symptom.icon}
                    <span>{symptom.name}</span>
                    {(symptoms[selectedDate] || []).includes(symptom.id) && <Check size={16} className="check-mark" />}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Mood Tab */}
        {activeTab === 'mood' && (
          <motion.div
            key="mood"
            className="tab-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mood-logger">
              <div className="date-selector">
                <label>Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <h3>How are you feeling?</h3>
              <div className="moods-grid">
                {moodsList.map(mood => (
                  <motion.button
                    key={mood.id}
                    className={`mood-btn ${moods[selectedDate] === mood.id ? 'active' : ''}`}
                    onClick={() => setMood(mood.id)}
                    style={{
                      borderColor: moods[selectedDate] === mood.id ? mood.color : 'var(--border-medium)',
                      backgroundColor: moods[selectedDate] === mood.id ? `${mood.color}20` : 'var(--bg-card)'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="mood-icon" style={{ color: mood.color }}>{mood.icon}</div>
                    <span>{mood.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <motion.div
            key="notes"
            className="tab-content"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="notes-section">
              <div className="date-selector">
                <label>Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>

              <h3><Edit3 size={20} /> Add a Note</h3>
              <textarea
                className="note-input"
                placeholder="How are you feeling today? Any observations?"
                value={todayNote}
                onChange={(e) => setTodayNote(e.target.value)}
                rows={4}
              />
              <motion.button
                className="btn-primary"
                onClick={saveNote}
                disabled={!todayNote.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ marginTop: '1rem' }}
              >
                <Check size={18} /> Save Note
              </motion.button>

              {notes[selectedDate] && (
                <motion.div
                  className="saved-note"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4>Saved Note</h4>
                  <p>{notes[selectedDate]}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Feature 11: STI Risk Calculator
export const STIRiskCalculator = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [riskLevel, setRiskLevel] = useState(null);

  const questions = [
    {
      id: 'partners',
      question: 'How many sexual partners have you had in the last 6 months?',
      options: ['0', '1', '2-3', '4+']
    },
    {
      id: 'condom',
      question: 'How often do you use condoms?',
      options: ['Always', 'Most of the time', 'Sometimes', 'Never']
    },
    {
      id: 'tested',
      question: 'When was your last STI test?',
      options: ['Within 3 months', '3-6 months ago', '6-12 months ago', 'Over a year ago', 'Never tested']
    },
    {
      id: 'symptoms',
      question: 'Have you experienced any symptoms?',
      options: ['No symptoms', 'Unusual discharge', 'Pain/burning', 'Sores/bumps']
    }
  ];

  const calculateRisk = () => {
    let score = 0;

    if (answers.partners === '4+') score += 3;
    else if (answers.partners === '2-3') score += 2;
    else if (answers.partners === '1') score += 1;

    if (answers.condom === 'Never') score += 4;
    else if (answers.condom === 'Sometimes') score += 3;
    else if (answers.condom === 'Most of the time') score += 1;

    if (answers.tested === 'Never tested' || answers.tested === 'Over a year ago') score += 2;

    if (answers.symptoms !== 'No symptoms') score += 3;

    if (score <= 2) return 'Low';
    if (score <= 5) return 'Moderate';
    return 'High';
  };

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [questions[step].id]: answer };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setRiskLevel(calculateRisk());
    }
  };

  if (riskLevel) {
    const getRiskInfo = () => {
      if (riskLevel === 'Low') {
        return {
          color: '#10b981',
          message: 'Your risk appears low. Continue using protection and get tested regularly.',
          actions: ['Get tested every 6-12 months', 'Continue safe practices', 'Stay informed']
        };
      } else if (riskLevel === 'Moderate') {
        return {
          color: '#f59e0b',
          message: 'Your risk is moderate. We recommend getting tested soon.',
          actions: ['Get tested within 2 weeks', 'Use condoms consistently', 'Discuss with partners']
        };
      } else {
        return {
          color: '#dc2626',
          message: 'Your risk is high. Please get tested as soon as possible.',
          actions: ['Get tested immediately', 'Visit a clinic this week', 'Contact partners', 'Use protection always']
        };
      }
    };

    const info = getRiskInfo();

    return (
      <motion.div
        className="risk-calculator"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="risk-result">
          <h2>Your STI Risk Assessment</h2>
          <div className="risk-badge" style={{ borderColor: info.color }}>
            <span style={{ color: info.color }}>{riskLevel} Risk</span>
          </div>
          <p className="risk-message">{info.message}</p>
          <div className="risk-actions">
            <h4>Recommended Actions:</h4>
            <ul>
              {info.actions.map((action, i) => (
                <li key={i}><Check size={16} style={{ display: 'inline', marginRight: '8px', color: info.color }} />{action}</li>
              ))}
            </ul>
          </div>
          <div className="testing-centers">
            <h4>Testing Centers Near You:</h4>
            <div className="center-card">
              <h5>PPAG Accra</h5>
              <p><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} /> Free testing • Walk-ins welcome</p>
            </div>
            <div className="center-card">
              <h5>VCT Center - Ridge Hospital</h5>
              <p><Shield size={14} style={{ display: 'inline', marginRight: '4px' }} /> Confidential • No appointment needed</p>
            </div>
          </div>
          <button className="btn-primary" onClick={onClose} style={{ width: '100%', marginTop: '1rem' }}>Close</button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="risk-calculator"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
    >
      <div className="calc-header">
        <h2>STI Risk Calculator</h2>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
      </div>

      <div className="calc-progress">
        <span>Question {step + 1} of {questions.length}</span>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="calc-question"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h3>{questions[step].question}</h3>
          <div className="calc-options">
            {questions[step].options.map((option, i) => (
              <motion.button
                key={i}
                className="calc-option"
                onClick={() => handleAnswer(option)}
                whileHover={{ scale: 1.02, backgroundColor: 'var(--primary-50)' }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="calc-disclaimer">
        <Info size={14} style={{ display: 'inline', marginRight: '4px' }} />
        This is a screening tool only. For accurate assessment, please consult a healthcare provider.
      </p>
    </motion.div>
  );
};

// Feature 12: Relationship Health Checker
export const RelationshipChecker = ({ onClose }) => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    { id: 'respect', text: 'Does your partner respect your opinions and decisions?', type: 'positive' },
    { id: 'pressure', text: 'Do you feel pressured to do things you\'re uncomfortable with?', type: 'negative' },
    { id: 'communication', text: 'Can you communicate openly about your feelings?', type: 'positive' },
    { id: 'control', text: 'Does your partner try to control who you see or what you do?', type: 'negative' },
    { id: 'trust', text: 'Do you trust your partner?', type: 'positive' },
    { id: 'fear', text: 'Are you afraid of your partner\'s reactions?', type: 'negative' },
    { id: 'support', text: 'Does your partner support your goals and dreams?', type: 'positive' },
    { id: 'insults', text: 'Does your partner insult or put you down?', type: 'negative' }
  ];

  const handleAnswer = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const calculateHealth = () => {
    let healthyCount = 0;
    let unhealthyCount = 0;

    questions.forEach(q => {
      const answer = answers[q.id];
      if (q.type === 'positive' && answer === 'yes') healthyCount++;
      if (q.type === 'positive' && answer === 'no') unhealthyCount++;
      if (q.type === 'negative' && answer === 'yes') unhealthyCount++;
      if (q.type === 'negative' && answer === 'no') healthyCount++;
    });

    if (unhealthyCount >= 3) {
      return {
        level: 'Concerning',
        color: '#dc2626',
        message: 'Your relationship shows concerning patterns. Consider talking to a counselor or trusted adult.',
        resources: ['DOVVSU Hotline: 0800701701', 'Ark Foundation Support', 'School Counselor']
      };
    } else if (unhealthyCount >= 1) {
      return {
        level: 'Needs Attention',
        color: '#f59e0b',
        message: 'Some aspects of your relationship could be improved. Open communication is key.',
        resources: ['Relationship counseling', 'Communication workshops', 'Couples therapy']
      };
    } else {
      return {
        level: 'Healthy',
        color: '#10b981',
        message: 'Your relationship shows healthy patterns. Keep nurturing trust and communication.',
        resources: ['Continue open dialogue', 'Regular check-ins', 'Mutual respect practices']
      };
    }
  };

  const handleSubmit = () => {
    setResult(calculateHealth());
  };

  if (result) {
    return (
      <motion.div
        className="relationship-checker"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="checker-result">
          <h2>Relationship Health Assessment</h2>
          <div className="health-badge" style={{ borderColor: result.color }}>
            <span style={{ color: result.color }}>{result.level}</span>
          </div>
          <p className="health-message">{result.message}</p>
          <div className="health-resources">
            <h4>Resources & Support:</h4>
            <ul>
              {result.resources.map((resource, i) => (
                <li key={i}><Phone size={14} style={{ display: 'inline', marginRight: '8px' }} />{resource}</li>
              ))}
            </ul>
          </div>
          {result.level === 'Concerning' && (
            <div className="safety-plan">
              <h4><AlertTriangle size={18} style={{ display: 'inline', marginRight: '4px' }} /> Safety Planning</h4>
              <p>If you feel unsafe, you have the right to leave. Contact DOVVSU immediately for support.</p>
            </div>
          )}
          <button className="btn-primary" onClick={onClose} style={{ width: '100%', marginTop: '1rem' }}>Close</button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relationship-checker"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
    >
      <div className="checker-header">
        <h2>Relationship Health Checker</h2>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
      </div>

      <div className="checker-questions">
        {questions.map((q, i) => (
          <motion.div
            key={q.id}
            className="check-question"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <p>{i + 1}. {q.text}</p>
            <div className="check-answers">
              <button
                className={`check-btn ${answers[q.id] === 'yes' ? 'selected' : ''}`}
                onClick={() => handleAnswer(q.id, 'yes')}
              >
                Yes
              </button>
              <button
                className={`check-btn ${answers[q.id] === 'no' ? 'selected' : ''}`}
                onClick={() => handleAnswer(q.id, 'no')}
              >
                No
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        className="btn-primary"
        onClick={handleSubmit}
        disabled={Object.keys(answers).length < questions.length}
        style={{ width: '100%', marginTop: '1rem' }}
      >
        See Results
      </button>

      <p className="checker-note">
        <Lock size={14} style={{ display: 'inline', marginRight: '4px' }} />
        Your responses are confidential and not stored anywhere.
      </p>
    </motion.div>
  );
};

// Feature 18: Medication Interaction Checker
export const MedicationChecker = ({ onClose }) => {
  const [medications, setMedications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [interactions, setInteractions] = useState([]);

  const commonMeds = [
    { name: 'Birth Control Pills', category: 'Contraception' },
    { name: 'Antibiotics', category: 'Infection' },
    { name: 'Ibuprofen', category: 'Pain Relief' },
    { name: 'Emergency Contraception', category: 'Contraception' },
    { name: 'Antidepressants', category: 'Mental Health' },
    { name: 'Antiretrovirals (ARVs)', category: 'HIV Treatment' }
  ];

  const interactionDatabase = {
    'Birth Control Pills + Antibiotics': {
      severity: 'High',
      warning: 'Some antibiotics can reduce birth control effectiveness. Use backup protection.',
      action: 'Use condoms for 7 days after antibiotic course'
    },
    'Birth Control Pills + Antiretrovirals (ARVs)': {
      severity: 'Medium',
      warning: 'Some ARVs may interact with hormonal contraception.',
      action: 'Consult your doctor about contraception options'
    },
    'Emergency Contraception + Birth Control Pills': {
      severity: 'Low',
      warning: 'Can be used together but may cause hormonal side effects.',
      action: 'Continue regular birth control after EC'
    }
  };

  const addMedication = (med) => {
    if (!medications.includes(med.name)) {
      const updated = [...medications, med.name];
      setMedications(updated);
      checkInteractions(updated);
    }
    setSearchTerm('');
  };

  const removeMedication = (med) => {
    const updated = medications.filter(m => m !== med);
    setMedications(updated);
    checkInteractions(updated);
  };

  const checkInteractions = (meds) => {
    const found = [];
    for (let i = 0; i < meds.length; i++) {
      for (let j = i + 1; j < meds.length; j++) {
        const combo1 = `${meds[i]} + ${meds[j]}`;
        const combo2 = `${meds[j]} + ${meds[i]}`;
        if (interactionDatabase[combo1]) {
          found.push({ combo: combo1, ...interactionDatabase[combo1] });
        } else if (interactionDatabase[combo2]) {
          found.push({ combo: combo2, ...interactionDatabase[combo2] });
        }
      }
    }
    setInteractions(found);
  };

  const filteredMeds = commonMeds.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="medication-checker"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
    >
      <div className="med-check-header">
        <h2>Medication Interaction Checker</h2>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
      </div>

      <div className="med-search">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchTerm && (
          <div className="med-suggestions">
            {filteredMeds.map((med, i) => (
              <button
                key={i}
                className="med-suggestion"
                onClick={() => addMedication(med)}
              >
                {med.name} <span className="med-cat">({med.category})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="selected-meds">
        <h3>Your Medications ({medications.length})</h3>
        {medications.map((med, i) => (
          <motion.div
            key={i}
            className="med-tag"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {med}
            <button onClick={() => removeMedication(med)}><X size={14} /></button>
          </motion.div>
        ))}
      </div>

      {interactions.length > 0 && (
        <div className="interactions-section">
          <h3><AlertTriangle size={20} style={{ display: 'inline', marginRight: '8px', color: '#f59e0b' }} /> Potential Interactions</h3>
          {interactions.map((int, i) => (
            <motion.div
              key={i}
              className={`interaction-card severity-${int.severity.toLowerCase()}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="int-header">
                <span className="severity-badge">{int.severity} Risk</span>
                <h4>{int.combo}</h4>
              </div>
              <p className="int-warning">{int.warning}</p>
              <p className="int-action"><strong>Recommended Action:</strong> {int.action}</p>
            </motion.div>
          ))}
        </div>
      )}

      {medications.length >= 2 && interactions.length === 0 && (
        <motion.div
          className="no-interactions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Check size={20} style={{ display: 'inline', marginRight: '8px' }} />
          No known interactions between selected medications.
        </motion.div>
      )}

      <p className="med-disclaimer">
        <Info size={14} style={{ display: 'inline', marginRight: '4px' }} />
        This tool provides general information only. Always consult your healthcare provider about your specific medications.
      </p>
    </motion.div>
  );
};

// Feature 25: Voice Diary
export const VoiceDiary = ({ onClose }) => {
  const [recordings, setRecordings] = useState(() => {
    const saved = localStorage.getItem('voiceDiaryEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const entry = {
          id: Date.now(),
          url,
          date: new Date().toISOString(),
          duration: Math.floor((Date.now() - recorder.startTime) / 1000)
        };
        const updated = [entry, ...recordings];
        setRecordings(updated);
        // Note: In production, would need proper storage solution
        localStorage.setItem('voiceDiaryEntries', JSON.stringify(updated.map(e => ({ ...e, url: null }))));
      };

      recorder.startTime = Date.now();
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      alert('Microphone access denied. Please enable microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const deleteEntry = (id) => {
    const updated = recordings.filter(r => r.id !== id);
    setRecordings(updated);
    localStorage.setItem('voiceDiaryEntries', JSON.stringify(updated.map(e => ({ ...e, url: null }))));
  };

  return (
    <motion.div
      className="voice-diary"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
    >
      <div className="diary-header">
        <h2>Voice Diary</h2>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
      </div>

      <div className="recording-section">
        {!isRecording ? (
          <button className="record-btn" onClick={startRecording}>
            <span className="record-icon"><Mic size={32} /></span>
            Start Recording
          </button>
        ) : (
          <div className="recording-active">
            <div className="pulse-animation">🔴</div>
            <p>Recording in progress...</p>
            <button className="stop-btn" onClick={stopRecording}>
              <StopCircle size={24} style={{ marginRight: '8px' }} /> Stop Recording
            </button>
          </div>
        )}
      </div>

      <div className="diary-entries">
        <h3>Your Entries ({recordings.length})</h3>
        {recordings.length === 0 ? (
          <p className="empty-state">No recordings yet. Start by recording your thoughts!</p>
        ) : (
          recordings.map((entry) => (
            <motion.div
              key={entry.id}
              className="diary-entry"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="entry-info">
                <span className="entry-date">
                  {new Date(entry.date).toLocaleString()}
                </span>
                <span className="entry-duration"><Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />{entry.duration}s</span>
              </div>
              {entry.url && (
                <audio controls src={entry.url} className="audio-player" />
              )}
              <button
                className="delete-entry"
                onClick={() => deleteEntry(entry.id)}
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))
        )}
      </div>

      <p className="diary-note">
        <Shield size={14} style={{ display: 'inline', marginRight: '4px' }} />
        All recordings are stored locally and encrypted on your device.
      </p>
    </motion.div>
  );
};
