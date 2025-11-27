import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronRight, Star, Trash2, Plus, Calendar, Clock,
  Activity, Heart, Shield, AlertCircle, CheckCircle, Smile,
  Frown, Meh, ThumbsUp, ThumbsDown, Check, TrendingUp
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
  const [activeTab, setActiveTab] = useState('log');
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('moodHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const moods = [
    { 
      icon: '😄', 
      label: 'Amazing', 
      value: 5, 
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      description: 'Feeling great!'
    },
    { 
      icon: '🙂', 
      label: 'Good', 
      value: 4, 
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      description: 'Pretty good day'
    },
    { 
      icon: '😐', 
      label: 'Okay', 
      value: 3, 
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      description: 'Just okay'
    },
    { 
      icon: '😔', 
      label: 'Low', 
      value: 2, 
      color: '#f97316',
      gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      description: 'Not so good'
    },
    { 
      icon: '😢', 
      label: 'Very Low', 
      value: 1, 
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      description: 'Really struggling'
    }
  ];

  const saveMood = () => {
    const entry = {
      mood,
      note,
      date: selectedDate,
      timestamp: Date.now()
    };
    const newHistory = [entry, ...history.filter(e => e.date !== selectedDate)].slice(0, 60);
    setHistory(newHistory);
    localStorage.setItem('moodHistory', JSON.stringify(newHistory));
    setMood(null);
    setNote('');
    setActiveTab('analytics');
  };

  // Calculate mood statistics
  const calculateStats = () => {
    if (history.length === 0) return null;

    const totalMood = history.reduce((sum, entry) => sum + entry.mood, 0);
    const avgMood = totalMood / history.length;
    
    const moodCounts = {};
    history.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });
    const mostCommonMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

    // Calculate streak (consecutive days with entries)
    const sortedDates = [...new Set(history.map(e => e.date))].sort().reverse();
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    let currentDate = today;
    
    for (let i = 0; i < sortedDates.length; i++) {
      if (sortedDates[i] === currentDate) {
        streak++;
        const date = new Date(currentDate);
        date.setDate(date.getDate() - 1);
        currentDate = date.toISOString().split('T')[0];
      } else {
        break;
      }
    }

    return {
      avgMood: avgMood.toFixed(1),
      totalEntries: history.length,
      mostCommonMood: parseInt(mostCommonMood),
      streak
    };
  };

  // Get mood trend data for last 7 days
  const getMoodTrend = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayEntry = history.find(e => e.date === dateStr);
      last7Days.push({
        date: dateStr,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        mood: dayEntry?.mood || null
      });
    }
    return last7Days;
  };

  const stats = calculateStats();
  const trendData = getMoodTrend();

  // Render mood trend chart
  const renderMoodChart = () => {
    const maxHeight = 120;
    
    return (
      <div className="mood-chart">
        <div className="chart-bars">
          {trendData.map((day, index) => {
            const moodData = moods.find(m => m.value === day.mood);
            const height = day.mood ? (day.mood / 5) * maxHeight : 0;
            
            return (
              <motion.div
                key={index}
                className="chart-bar-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="chart-bar-wrapper" style={{ height: `${maxHeight}px` }}>
                  {day.mood && (
                    <motion.div
                      className="chart-bar"
                      style={{
                        height: `${height}px`,
                        background: moodData?.gradient
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}px` }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    >
                      <span className="bar-emoji">{moodData?.icon}</span>
                    </motion.div>
                  )}
                  {!day.mood && <div className="chart-bar-empty" />}
                </div>
                <span className="chart-label">{day.day}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="mood-tracker"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="mood-container">
        <div className="mood-header">
          <div className="header-content">
            <div className="header-icon">✨</div>
            <h2>Mood Journal</h2>
          </div>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        {/* Tab Navigation */}
        <div className="mood-tabs">
          {[
            { id: 'log', label: 'Log Mood', icon: '📝' },
            { id: 'analytics', label: 'Analytics', icon: '📊' },
            { id: 'history', label: 'History', icon: '📅' }
          ].map(tab => (
            <motion.button
              key={tab.id}
              className={`mood-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Log Mood Tab */}
        <AnimatePresence mode="wait">
          {activeTab === 'log' && (
            <motion.div
              key="log"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mood-input">
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
                <p className="mood-subtitle">Select the emoji that best describes your mood</p>
                
                <div className="mood-options">
                  {moods.map(m => {
                    const isSelected = mood === m.value;
                    return (
                      <motion.button
                        key={m.value}
                        className={`mood-btn ${isSelected ? 'selected' : ''}`}
                        onClick={() => setMood(m.value)}
                        whileHover={{ scale: 1.08, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          borderColor: isSelected ? m.color : 'var(--border-medium)',
                          background: isSelected ? `${m.color}15` : 'var(--bg-card)'
                        }}
                      >
                        <span className="mood-emoji" style={{ fontSize: isSelected ? '3rem' : '2.5rem' }}>
                          {m.icon}
                        </span>
                        <span className="mood-label" style={{ color: isSelected ? m.color : 'var(--text-secondary)' }}>
                          {m.label}
                        </span>
                        {isSelected && (
                          <motion.div
                            className="mood-selected-indicator"
                            layoutId="mood-indicator"
                            style={{ background: m.gradient }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {mood && (
                  <motion.div
                    className="mood-description"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p>{moods.find(m => m.value === mood)?.description}</p>
                  </motion.div>
                )}

                <div className="note-section">
                  <label>What's on your mind? (Optional)</label>
                  <textarea
                    className="mood-note"
                    placeholder="Share your thoughts, feelings, or what happened today..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                  />
                </div>

                <motion.button
                  className="btn-save-mood"
                  onClick={saveMood}
                  disabled={!mood}
                  whileHover={{ scale: mood ? 1.02 : 1 }}
                  whileTap={{ scale: mood ? 0.98 : 1 }}
                  style={{
                    background: mood ? moods.find(m => m.value === mood)?.gradient : 'var(--bg-tertiary)',
                    opacity: mood ? 1 : 0.5,
                    cursor: mood ? 'pointer' : 'not-allowed'
                  }}
                >
                  <Check size={20} />
                  Save Entry
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mood-analytics">
                {!stats ? (
                  <div className="empty-analytics">
                    <div className="empty-icon">📊</div>
                    <h3>No Data Yet</h3>
                    <p>Start logging your moods to see your trends and insights!</p>
                    <button className="btn-secondary" onClick={() => setActiveTab('log')}>
                      Log Your First Mood
                    </button>
                  </div>
                ) : (
                  <>
                    <h3>Your Mood Trends</h3>
                    <p className="analytics-subtitle">Last 7 days overview</p>

                    {/* Statistics Cards */}
                    <div className="stats-grid">
                      <motion.div
                        className="stat-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="stat-icon">📈</div>
                        <div className="stat-value">{stats.avgMood}</div>
                        <div className="stat-label">Average Mood</div>
                        <div className="stat-bar">
                          <motion.div
                            className="stat-bar-fill"
                            style={{
                              width: `${(stats.avgMood / 5) * 100}%`,
                              background: moods.find(m => m.value === Math.round(stats.avgMood))?.gradient
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(stats.avgMood / 5) * 100}%` }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        className="stat-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="stat-icon">🔥</div>
                        <div className="stat-value">{stats.streak}</div>
                        <div className="stat-label">Day Streak</div>
                        <div className="stat-description">
                          {stats.streak > 0 ? 'Keep it up!' : 'Start your streak today!'}
                        </div>
                      </motion.div>

                      <motion.div
                        className="stat-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="stat-icon">✨</div>
                        <div className="stat-value">
                          {moods.find(m => m.value === stats.mostCommonMood)?.icon}
                        </div>
                        <div className="stat-label">Most Common</div>
                        <div className="stat-description">
                          {moods.find(m => m.value === stats.mostCommonMood)?.label}
                        </div>
                      </motion.div>

                      <motion.div
                        className="stat-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="stat-icon">📝</div>
                        <div className="stat-value">{stats.totalEntries}</div>
                        <div className="stat-label">Total Entries</div>
                        <div className="stat-description">All time</div>
                      </motion.div>
                    </div>

                    {/* Mood Trend Chart */}
                    <div className="chart-section">
                      <h4>Weekly Mood Pattern</h4>
                      {renderMoodChart()}
                    </div>

                    {/* Insights */}
                    <div className="insights-section">
                      <h4>💡 Insights</h4>
                      <div className="insights-list">
                        {stats.avgMood >= 4 && (
                          <div className="insight-item positive">
                            <Check size={18} />
                            <p>You've been feeling great lately! Keep up the positive energy.</p>
                          </div>
                        )}
                        {stats.avgMood < 3 && (
                          <div className="insight-item warning">
                            <AlertCircle size={18} />
                            <p>Your mood has been low recently. Consider reaching out to someone you trust or a mental health professional.</p>
                          </div>
                        )}
                        {stats.streak >= 7 && (
                          <div className="insight-item positive">
                            <TrendingUp size={18} />
                            <p>Amazing! You've logged your mood for {stats.streak} days straight. Consistency is key!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <motion.div
              key="history"
              className="tab-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mood-history">
                <h3>Mood History</h3>
                {history.length === 0 ? (
                  <div className="empty-history">
                    <div className="empty-icon">📅</div>
                    <h4>No Entries Yet</h4>
                    <p>Start tracking your mood to build your history!</p>
                    <button className="btn-secondary" onClick={() => setActiveTab('log')}>
                      Log Your Mood
                    </button>
                  </div>
                ) : (
                  <div className="mood-entries">
                    {history.map((entry, i) => {
                      const moodData = moods.find(m => m.value === entry.mood);
                      const date = new Date(entry.date);
                      const isToday = entry.date === new Date().toISOString().split('T')[0];
                      const isYesterday = entry.date === new Date(Date.now() - 86400000).toISOString().split('T')[0];
                      
                      let dateLabel = date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      });
                      if (isToday) dateLabel = 'Today';
                      if (isYesterday) dateLabel = 'Yesterday';

                      return (
                        <motion.div
                          key={i}
                          className="mood-entry"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          style={{ borderLeft: `4px solid ${moodData?.color}` }}
                        >
                          <div className="entry-mood">
                            <span className="entry-emoji" style={{ fontSize: '2.5rem' }}>
                              {moodData?.icon}
                            </span>
                            <div className="entry-mood-info">
                              <span className="entry-mood-label" style={{ color: moodData?.color }}>
                                {moodData?.label}
                              </span>
                              <div className="entry-mood-value">
                                {'★'.repeat(entry.mood)}{'☆'.repeat(5 - entry.mood)}
                              </div>
                            </div>
                          </div>
                          <div className="entry-content">
                            <div className="entry-date">
                              <Calendar size={14} />
                              <span>{dateLabel}</span>
                            </div>
                            {entry.note && (
                              <p className="entry-note">{entry.note}</p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
