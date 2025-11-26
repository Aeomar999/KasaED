import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronRight, Star, Trash2, Plus, Calendar, Clock,
  Activity, Heart, Shield, AlertCircle, CheckCircle, Smile,
  Frown, Meh, ThumbsUp, ThumbsDown
} from 'lucide-react';
import './Features.css';

// Feature 21: Personalized Health Recommendations
export const HealthRecommendations = ({ userProfile, chatHistory }) => {
  const getRecommendations = () => {
    const topics = chatHistory.filter(m => m.sender === 'user')
      .map(m => m.text.toLowerCase());

    const recommendations = [];

    if (topics.some(t => t.includes('stress') || t.includes('anxiety'))) {
      recommendations.push({
        title: 'Stress Management',
        text: 'Based on your questions, try deep breathing exercises daily and maintain a regular sleep schedule.',
        icon: <Activity size={24} />
      });
    }

    if (topics.some(t => t.includes('contraception') || t.includes('pregnancy'))) {
      recommendations.push({
        title: 'Family Planning',
        text: 'Consider visiting a family planning clinic for personalized contraception advice.',
        icon: <Heart size={24} />
      });
    }

    if (topics.some(t => t.includes('sti') || t.includes('test'))) {
      recommendations.push({
        title: 'Regular Testing',
        text: 'Get tested for STIs every 6 months if sexually active. Free testing available at VCT centers.',
        icon: <Shield size={24} />
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        title: 'Stay Healthy',
        text: 'Keep asking questions! Regular check-ups and safe practices are key to good sexual health.',
        icon: <CheckCircle size={24} />
      });
    }

    return recommendations;
  };

  return (
    <motion.div
      className="recommendations-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Personalized for You</h3>
      {getRecommendations().map((rec, i) => (
        <motion.div
          key={i}
          className="recommendation-card"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="rec-icon">{rec.icon}</span>
          <div>
            <h4>{rec.title}</h4>
            <p>{rec.text}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Feature 24: Interactive Quiz
export const Quiz = ({ onClose }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      q: 'What is the most effective way to prevent both pregnancy and STIs?',
      options: ['Birth control pills', 'Condoms', 'IUD', 'Calendar method'],
      correct: 1
    },
    {
      q: 'How often should sexually active youth get tested for STIs?',
      options: ['Once a year', 'Every 6 months', 'Every 2 years', 'Only if symptoms appear'],
      correct: 1
    },
    {
      q: 'What does consent mean?',
      options: ['Not saying no', 'Saying yes clearly', 'Maybe', 'Silence'],
      correct: 1
    },
    {
      q: 'Can you get pregnant during your period?',
      options: ['Yes, it\'s possible', 'No, never', 'Only on day 1', 'Only if you have a short cycle'],
      correct: 0
    },
    {
      q: 'What is U=U in HIV treatment?',
      options: ['Untreated = Unsafe', 'Undetectable = Untransmittable', 'Unsafe = Uncertain', 'Universal = Understanding'],
      correct: 1
    }
  ];

  const handleAnswer = (index) => {
    if (index === questions[currentQ].correct) {
      setScore(score + 1);
    }

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    return (
      <motion.div
        className="quiz-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h2>Quiz Complete! 🎉</h2>
        <div className="quiz-score">
          <div className="score-circle">
            <span className="score-number">{score}</span>
            <span className="score-total">/ {questions.length}</span>
          </div>
          <p className="score-percentage">{percentage}%</p>
        </div>
        <p className="score-message">
          {percentage >= 80 ? 'Excellent! You really know your stuff! 🌟' :
            percentage >= 60 ? 'Good job! Keep learning! 👍' :
              'Keep practicing! Review the content and try again! 📚'}
        </p>
        <div className="quiz-actions">
          <button className="btn-primary" onClick={() => {
            setCurrentQ(0);
            setScore(0);
            setShowResult(false);
          }}>
            Try Again
          </button>
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="quiz-container"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      <div className="quiz-header">
        <h2>SRH Knowledge Quiz</h2>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
      </div>
      <div className="quiz-progress">
        <span>Question {currentQ + 1} / {questions.length}</span>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
      <div className="quiz-question">
        <h3>{questions[currentQ].q}</h3>
        <div className="quiz-options">
          {questions[currentQ].options.map((opt, i) => (
            <motion.button
              key={i}
              className="quiz-option"
              onClick={() => handleAnswer(i)}
              whileHover={{ scale: 1.02, backgroundColor: 'var(--primary-50)' }}
              whileTap={{ scale: 0.98 }}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Feature 25: Mood Tracking
export const MoodTracker = ({ onClose }) => {
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState('');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('moodHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const moods = [
    { icon: <Smile size={32} />, label: 'Great', value: 5 },
    { icon: <Smile size={32} style={{ transform: 'scale(0.9)' }} />, label: 'Good', value: 4 },
    { icon: <Meh size={32} />, label: 'Okay', value: 3 },
    { icon: <Frown size={32} style={{ transform: 'scale(0.9)' }} />, label: 'Low', value: 2 },
    { icon: <Frown size={32} />, label: 'Very Low', value: 1 }
  ];

  const saveMood = () => {
    const entry = {
      mood,
      note,
      date: new Date().toISOString(),
      timestamp: Date.now()
    };
    const newHistory = [entry, ...history].slice(0, 30); // Keep last 30
    setHistory(newHistory);
    localStorage.setItem('moodHistory', JSON.stringify(newHistory));
    setMood(null);
    setNote('');
  };

  return (
    <motion.div
      className="mood-tracker"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
    >
      <div className="mood-header">
        <h2>Mood Journal</h2>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
      </div>

      <div className="mood-input">
        <h3>How are you feeling today?</h3>
        <div className="mood-options">
          {moods.map(m => (
            <motion.button
              key={m.value}
              className={`mood-btn ${mood === m.value ? 'selected' : ''}`}
              onClick={() => setMood(m.value)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="mood-emoji">{m.icon}</span>
              <span className="mood-label">{m.label}</span>
            </motion.button>
          ))}
        </div>

        <textarea
          className="mood-note"
          placeholder="How's your day going? (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />

        <button
          className="btn-primary"
          onClick={saveMood}
          disabled={!mood}
          style={{ width: '100%' }}
        >
          Save Entry
        </button>
      </div>

      <div className="mood-history">
        <h3>Recent Entries</h3>
        {history.length === 0 ? (
          <p className="empty-state">No entries yet. Start tracking your mood!</p>
        ) : (
          <div className="mood-entries">
            {history.slice(0, 5).map((entry, i) => {
              const moodData = moods.find(m => m.value === entry.mood);
              const date = new Date(entry.date);
              return (
                <motion.div
                  key={i}
                  className="mood-entry"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="entry-emoji">{moodData?.icon}</span>
                  <div className="entry-content">
                    <span className="entry-date">
                      {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {entry.note && <p className="entry-note">{entry.note}</p>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Feature 27: Medication Reminders
export const MedicationReminders = ({ onClose }) => {
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('medicationReminders');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    name: '',
    time: '',
    frequency: 'daily'
  });

  const addReminder = () => {
    const reminder = {
      ...newReminder,
      id: Date.now(),
      enabled: true
    };
    const updated = [...reminders, reminder];
    setReminders(updated);
    localStorage.setItem('medicationReminders', JSON.stringify(updated));
    setNewReminder({ name: '', time: '', frequency: 'daily' });
    setShowForm(false);
  };

  const deleteReminder = (id) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    localStorage.setItem('medicationReminders', JSON.stringify(updated));
  };

  return (
    <motion.div
      className="medication-reminders"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
    >
      <div className="med-header">
        <h2>Medication Reminders</h2>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
      </div>

      {!showForm && (
        <button className="btn-primary" onClick={() => setShowForm(true)} style={{ width: '100%', marginBottom: '1.5rem' }}>
          <Plus size={18} /> Add Reminder
        </button>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="reminder-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <input
              type="text"
              placeholder="Medication name"
              value={newReminder.name}
              onChange={(e) => setNewReminder({ ...newReminder, name: e.target.value })}
            />
            <input
              type="time"
              value={newReminder.time}
              onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
            />
            <select
              value={newReminder.frequency}
              onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value })}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <div className="form-actions">
              <button className="btn-primary" onClick={addReminder}>Save</button>
              <button className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="reminders-list">
        {reminders.length === 0 ? (
          <p className="empty-state">No reminders set. Add one to get started!</p>
        ) : (
          reminders.map(r => (
            <motion.div
              key={r.id}
              className="reminder-item"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="reminder-info">
                <h4>{r.name}</h4>
                <p><Clock size={14} style={{ display: 'inline', marginRight: '4px' }} /> {r.time} • {r.frequency}</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteReminder(r.id)}
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

// Feature 28: Feedback System
export const FeedbackForm = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = () => {
    const feedbackData = {
      rating,
      feedback,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage (in production, send to server)
    const existing = JSON.parse(localStorage.getItem('userFeedback') || '[]');
    existing.push(feedbackData);
    localStorage.setItem('userFeedback', JSON.stringify(existing));

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="feedback-form"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="feedback-success">
          <h2>Thank You! 🙏</h2>
          <p>Your feedback helps us improve KasaEd for all users.</p>
          <button className="btn-primary" onClick={onClose}>Close</button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="feedback-form"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
    >
      <div className="feedback-header">
        <h2>Share Your Feedback</h2>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
      </div>

      <div className="rating-section">
        <p>How would you rate your experience?</p>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map(star => (
            <motion.button
              key={star}
              className={`star ${rating >= star ? 'filled' : ''}`}
              onClick={() => setRating(star)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Star size={32} fill={rating >= star ? "currentColor" : "none"} />
            </motion.button>
          ))}
        </div>
      </div>

      <textarea
        className="feedback-text"
        placeholder="Tell us what you think..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        rows={5}
      />

      <button
        className="btn-primary"
        onClick={submitFeedback}
        disabled={!rating}
        style={{ width: '100%' }}
      >
        Submit Feedback
      </button>
    </motion.div>
  );
};
