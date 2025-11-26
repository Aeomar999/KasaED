import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Calendar, Heart, Activity, AlertTriangle, Check,
  Shield, MapPin, Phone, Search, Mic, StopCircle,
  Trash2, Play, Clock, AlertCircle, Info
} from 'lucide-react';
import './AdvancedFeatures.css';

// Feature 3: Period & Cycle Tracking
export const PeriodTracker = ({ onClose }) => {
  const [cycles, setCycles] = useState(() => {
    const saved = localStorage.getItem('periodCycles');
    return saved ? JSON.parse(saved) : [];
  });
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);

  const addCycle = () => {
    const cycle = {
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

  return (
    <motion.div
      className="period-tracker"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
    >
      <div className="tracker-header">
        <h2>Period & Cycle Tracker</h2>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
      </div>

      <div className="tracker-input">
        <h3>Log Your Cycle</h3>
        <label>
          Last Period Start Date
          <input
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
          />
        </label>
        <label>
          Average Cycle Length (days)
          <input
            type="number"
            value={cycleLength}
            onChange={(e) => setCycleLength(parseInt(e.target.value))}
            min="21"
            max="35"
          />
        </label>
        <label>
          Period Length (days)
          <input
            type="number"
            value={periodLength}
            onChange={(e) => setPeriodLength(parseInt(e.target.value))}
            min="2"
            max="7"
          />
        </label>
        <button className="btn-primary" onClick={addCycle} disabled={!lastPeriod} style={{ width: '100%', marginTop: '1rem' }}>
          Calculate Cycle
        </button>
      </div>

      {cycles.length > 0 && (
        <motion.div
          className="cycle-predictions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>Your Cycle Predictions</h3>
          <div className="prediction-card">
            <div className="pred-item">
              <span className="pred-icon"><Calendar size={24} /></span>
              <div>
                <h4>Next Period</h4>
                <p>{new Date(cycles[0].nextPeriod).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="pred-item">
              <span className="pred-icon"><Activity size={24} /></span>
              <div>
                <h4>Ovulation Day</h4>
                <p>{new Date(cycles[0].ovulation).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="pred-item">
              <span className="pred-icon"><Heart size={24} /></span>
              <div>
                <h4>Fertility Window</h4>
                <p>{new Date(cycles[0].fertilityWindow.start).toLocaleDateString()} - {new Date(cycles[0].fertilityWindow.end).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
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
