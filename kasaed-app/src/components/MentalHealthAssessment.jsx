import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Brain, Heart, Shield, TrendingUp, BarChart3, AlertCircle,
  Info, CheckCircle, PhoneCall, MessageCircle, Users, Lock,
  ArrowRight, ArrowLeft, Calendar, Activity
} from 'lucide-react';
import './MentalHealthAssessment.css';

const MentalHealthAssessment = ({ onClose }) => {
  const [view, setView] = useState('welcome'); // welcome, selection, assessment, results, history
  const [assessmentType, setAssessmentType] = useState(null); // 'depression' or 'anxiety'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('mentalHealthHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // PHQ-9 Questions for Depression (Clinically validated)
  const depressionQuestions = [
    {
      question: "Over the last 2 weeks, how often have you had little interest or pleasure in doing things?",
      category: "Anhedonia"
    },
    {
      question: "How often have you felt down, depressed, or hopeless?",
      category: "Mood"
    },
    {
      question: "How often have you had trouble falling or staying asleep, or sleeping too much?",
      category: "Sleep"
    },
    {
      question: "How often have you felt tired or had little energy?",
      category: "Energy"
    },
    {
      question: "How often have you had poor appetite or been overeating?",
      category: "Appetite"
    },
    {
      question: "How often have you felt bad about yourself - or that you are a failure or have let yourself or your family down?",
      category: "Self-worth"
    },
    {
      question: "How often have you had trouble concentrating on things, such as reading or watching television?",
      category: "Concentration"
    },
    {
      question: "How often have you moved or spoken so slowly that other people could have noticed? Or been so fidgety or restless that you have been moving around a lot more than usual?",
      category: "Psychomotor"
    },
    {
      question: "How often have you had thoughts that you would be better off dead, or thoughts of hurting yourself in some way?",
      category: "Suicidal Ideation"
    }
  ];

  // GAD-7 Questions for Anxiety (Clinically validated)
  const anxietyQuestions = [
    {
      question: "Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?",
      category: "Nervousness"
    },
    {
      question: "How often have you not been able to stop or control worrying?",
      category: "Worry Control"
    },
    {
      question: "How often have you been worrying too much about different things?",
      category: "Excessive Worry"
    },
    {
      question: "How often have you had trouble relaxing?",
      category: "Relaxation"
    },
    {
      question: "How often have you been so restless that it's hard to sit still?",
      category: "Restlessness"
    },
    {
      question: "How often have you become easily annoyed or irritable?",
      category: "Irritability"
    },
    {
      question: "How often have you felt afraid, as if something awful might happen?",
      category: "Fear"
    }
  ];

  const options = [
    { value: 0, label: "Not at all", emoji: "😊" },
    { value: 1, label: "Several days", emoji: "😐" },
    { value: 2, label: "More than half the days", emoji: "😟" },
    { value: 3, label: "Nearly every day", emoji: "😢" }
  ];

  const currentQuestions = assessmentType === 'depression' ? depressionQuestions : anxietyQuestions;

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save to history
      const result = {
        type: assessmentType,
        date: new Date().toISOString(),
        score: newAnswers.reduce((sum, val) => sum + val, 0),
        answers: newAnswers
      };
      const updatedHistory = [result, ...history].slice(0, 10); // Keep last 10
      setHistory(updatedHistory);
      localStorage.setItem('mentalHealthHistory', JSON.stringify(updatedHistory));
      setView('results');
    }
  };

  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + answer, 0);
  };

  const getDepressionInterpretation = (score) => {
    if (score <= 4) {
      return {
        level: "Minimal Depression",
        severity: "low",
        message: "Your responses suggest minimal or no signs of depression. You're doing well! Continue practicing self-care and maintaining healthy habits.",
        color: "#10b981",
        recommendations: [
          "Maintain regular exercise and physical activity",
          "Keep a consistent sleep schedule (7-9 hours)",
          "Stay connected with friends and family",
          "Practice gratitude and mindfulness",
          "Engage in hobbies and activities you enjoy"
        ]
      };
    } else if (score <= 9) {
      return {
        level: "Mild Depression",
        severity: "mild",
        message: "You may be experiencing some mild depressive symptoms. These are manageable with self-care strategies and support from loved ones.",
        color: "#f59e0b",
        recommendations: [
          "Talk to a trusted friend, family member, or counselor",
          "Try journaling to express your thoughts and feelings",
          "Practice relaxation techniques (deep breathing, meditation)",
          "Maintain a routine and set small, achievable goals",
          "Limit alcohol and caffeine intake",
          "Consider speaking with a mental health professional"
        ]
      };
    } else if (score <= 14) {
      return {
        level: "Moderate Depression",
        severity: "moderate",
        message: "Your responses indicate moderate depressive symptoms. We strongly recommend reaching out to a mental health professional who can provide appropriate support and guidance.",
        color: "#f97316",
        recommendations: [
          "Schedule an appointment with a counselor or therapist",
          "Talk to your doctor about treatment options",
          "Join a support group for peer connection",
          "Practice stress management techniques daily",
          "Avoid isolating yourself - stay connected",
          "Create a safety plan for difficult moments"
        ]
      };
    } else if (score <= 19) {
      return {
        level: "Moderately Severe Depression",
        severity: "high",
        message: "You're experiencing significant depressive symptoms. Professional help is important. Please reach out to a mental health provider or counselor as soon as possible.",
        color: "#dc2626",
        recommendations: [
          "Contact a mental health professional immediately",
          "Call a crisis hotline if feeling overwhelmed",
          "Inform a trusted adult or family member",
          "Don't face this alone - seek support now",
          "Follow up with your doctor for evaluation",
          "Consider both therapy and medication options"
        ]
      };
    } else {
      return {
        level: "Severe Depression",
        severity: "severe",
        message: "Your responses indicate severe depressive symptoms. Please seek immediate help from a mental health professional or crisis service. You deserve support and effective treatment is available.",
        color: "#991b1b",
        recommendations: [
          "🚨 Call Mental Health Crisis Line: 0553456789",
          "🏥 Go to nearest emergency room if in crisis",
          "👥 Tell someone you trust immediately",
          "📞 Contact a mental health professional today",
          "🛡️ Create a safety plan with professional help",
          "💊 Discuss medication options with a doctor"
        ]
      };
    }
  };

  const getAnxietyInterpretation = (score) => {
    if (score <= 4) {
      return {
        level: "Minimal Anxiety",
        severity: "low",
        message: "Your responses suggest minimal anxiety. You're managing well! Continue your healthy coping strategies.",
        color: "#10b981",
        recommendations: [
          "Continue regular exercise and physical activity",
          "Practice deep breathing exercises",
          "Maintain work-life balance",
          "Get adequate sleep (7-9 hours nightly)",
          "Stay connected with supportive relationships"
        ]
      };
    } else if (score <= 9) {
      return {
        level: "Mild Anxiety",
        severity: "mild",
        message: "You may be experiencing some mild anxiety symptoms. These can often be managed with relaxation techniques and lifestyle adjustments.",
        color: "#f59e0b",
        recommendations: [
          "Practice progressive muscle relaxation",
          "Try mindfulness meditation (10-15 mins daily)",
          "Limit caffeine and sugar intake",
          "Exercise regularly (30 mins, 3-5 times/week)",
          "Talk about your worries with someone you trust",
          "Consider stress management apps or resources"
        ]
      };
    } else if (score <= 14) {
      return {
        level: "Moderate Anxiety",
        severity: "moderate",
        message: "Your responses indicate moderate anxiety symptoms. Professional guidance can help you develop effective coping strategies. Consider speaking with a counselor or therapist.",
        color: "#f97316",
        recommendations: [
          "Consult with a mental health professional",
          "Learn and practice cognitive behavioral techniques",
          "Develop a daily relaxation routine",
          "Identify and challenge anxious thoughts",
          "Join an anxiety support group",
          "Track triggers to better understand patterns"
        ]
      };
    } else {
      return {
        level: "Severe Anxiety",
        severity: "severe",
        message: "You're experiencing significant anxiety symptoms. Professional treatment can make a real difference. Please reach out to a mental health provider or counselor soon.",
        color: "#dc2626",
        recommendations: [
          "🚨 Contact a mental health professional promptly",
          "📞 Call Mental Health Crisis Line if overwhelmed: 0553456789",
          "👨‍⚕️ Discuss treatment options with your doctor",
          "💊 Consider therapy and/or medication evaluation",
          "🧘 Learn anxiety management techniques",
          "👥 Build a support network - don't isolate"
        ]
      };
    }
  };

  const getInterpretation = (score) => {
    return assessmentType === 'depression' 
      ? getDepressionInterpretation(score)
      : getAnxietyInterpretation(score);
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setView('selection');
    setAssessmentType(null);
  };

  const startAssessment = (type) => {
    setAssessmentType(type);
    setView('assessment');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const renderProgressChart = () => {
    if (history.length === 0) return null;

    const filteredHistory = history
      .filter(h => h.type === assessmentType)
      .slice(0, 5)
      .reverse();

    if (filteredHistory.length === 0) return null;

    const maxScore = assessmentType === 'depression' ? 27 : 21;
    const maxHeight = 120;

    return (
      <motion.div 
        className="progress-chart"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3><TrendingUp size={20} /> Your Progress</h3>
        <div className="chart-container">
          {filteredHistory.map((entry, index) => {
            const height = (entry.score / maxScore) * maxHeight;
            const interpretation = getInterpretation(entry.score);
            
            return (
              <div key={index} className="chart-bar-wrapper">
                <div 
                  className="chart-bar" 
                  style={{ 
                    height: `${height}px`,
                    backgroundColor: interpretation.color
                  }}
                >
                  <span className="chart-score">{entry.score}</span>
                </div>
                <span className="chart-date">
                  {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            );
          })}
        </div>
        <p className="chart-note">Lower scores indicate fewer symptoms</p>
      </motion.div>
    );
  };

  // Welcome View
  if (view === 'welcome') {
    return (
      <motion.div
        className="assessment-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div>
          <div className="assessment-header">
            <h2><Brain size={28} /> Mental Health Check-In</h2>
            <button className="close-btn" onClick={onClose}><X size={24} /></button>
          </div>

          <div className="welcome-content">
          <div className="welcome-icon">
            <Heart size={64} className="pulse-icon" />
          </div>

          <h3>Your Mental Wellness Matters</h3>
          <p className="welcome-text">
            Taking care of your mental health is just as important as your physical health. 
            Mental wellness affects every aspect of your life, including your sexual health, 
            relationships, and overall well-being.
          </p>

          <div className="info-cards">
            <div className="info-card">
              <Shield size={24} />
              <h4>Safe & Confidential</h4>
              <p>All responses are stored securely on your device only. Nothing is shared.</p>
            </div>
            <div className="info-card">
              <Activity size={24} />
              <h4>Clinically Validated</h4>
              <p>Based on PHQ-9 and GAD-7 screening tools used by healthcare professionals.</p>
            </div>
            <div className="info-card">
              <Info size={24} />
              <h4>Not a Diagnosis</h4>
              <p>This is a screening tool. For professional evaluation, consult a mental health provider.</p>
            </div>
          </div>

          <div className="connection-info">
            <h4><Heart size={20} /> Why Mental Health Matters for Sexual Health</h4>
            <div className="connection-points">
              <div className="connection-point">
                <CheckCircle size={18} />
                <p><strong>Healthy Relationships:</strong> Good mental health helps you communicate better, set boundaries, and build trust in relationships.</p>
              </div>
              <div className="connection-point">
                <CheckCircle size={18} />
                <p><strong>Better Decision Making:</strong> When you feel emotionally balanced, you're more likely to make informed, safe choices about sexual health.</p>
              </div>
              <div className="connection-point">
                <CheckCircle size={18} />
                <p><strong>Physical Wellness:</strong> Depression and anxiety can affect hormone levels, sexual desire, and physical intimacy.</p>
              </div>
              <div className="connection-point">
                <CheckCircle size={18} />
                <p><strong>Self-Care:</strong> Mental wellness empowers you to prioritize protection, consent, and overall health.</p>
              </div>
            </div>
          </div>

          <motion.button
            className="btn-primary btn-large"
            onClick={() => setView('selection')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Check-In <ArrowRight size={20} />
          </motion.button>

          {history.length > 0 && (
            <button 
              className="btn-text"
              onClick={() => setView('history')}
            >
              <Calendar size={18} /> View Assessment History
            </button>
          )}
        </div>
        </div>
      </motion.div>
    );
  }

  // Selection View
  if (view === 'selection') {
    return (
      <motion.div
        className="assessment-container"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <div>
          <div className="assessment-header">
          <button className="back-btn" onClick={() => setView('welcome')}>
            <ArrowLeft size={20} />
          </button>
          <h2>Choose Assessment Type</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="selection-cards">
          <motion.div
            className="selection-card depression-card"
            onClick={() => startAssessment('depression')}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="selection-icon">
              <Brain size={40} />
            </div>
            <h3>Depression Screening</h3>
            <p>PHQ-9 Assessment - 9 questions</p>
            <div className="selection-info">
              <Info size={16} />
              <span>Screens for symptoms of depression including mood, interest, sleep, and energy</span>
            </div>
            <div className="selection-arrow">
              <ArrowRight size={24} />
            </div>
          </motion.div>

          <motion.div
            className="selection-card anxiety-card"
            onClick={() => startAssessment('anxiety')}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="selection-icon">
              <AlertCircle size={40} />
            </div>
            <h3>Anxiety Screening</h3>
            <p>GAD-7 Assessment - 7 questions</p>
            <div className="selection-info">
              <Info size={16} />
              <span>Screens for generalized anxiety disorder including worry, restlessness, and fear</span>
            </div>
            <div className="selection-arrow">
              <ArrowRight size={24} />
            </div>
          </motion.div>
        </div>

        <div className="privacy-reminder">
          <Lock size={18} />
          <p>Your responses are completely confidential and stored only on your device</p>
        </div>
        </div>
      </motion.div>
    );
  }

  // Assessment View
  if (view === 'assessment') {
    const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;

    return (
      <motion.div
        className="assessment-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <div className="assessment-header">
          <h2>
            {assessmentType === 'depression' ? (
              <><Brain size={24} /> Depression Screening</>
            ) : (
              <><AlertCircle size={24} /> Anxiety Screening</>
            )}
          </h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="progress-bar">
          <motion.div 
            className="progress-fill" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="question-counter">
          Question {currentQuestion + 1} of {currentQuestions.length}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            className="question-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="question-category">
              {currentQuestions[currentQuestion].category}
            </div>
            <div className="question-text">
              {currentQuestions[currentQuestion].question}
            </div>

            <div className="answer-options">
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  className="answer-btn"
                  onClick={() => handleAnswer(option.value)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="answer-emoji">{option.emoji}</span>
                  <span className="answer-label">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="assessment-info">
          <Lock size={14} />
          <small>All responses are confidential and stored locally on your device</small>
        </div>
        </div>
      </motion.div>
    );
  }

  // Results View
  if (view === 'results') {
    const score = calculateScore();
    const interpretation = getInterpretation(score);
    const maxScore = assessmentType === 'depression' ? 27 : 21;
    const percentage = (score / maxScore) * 100;

    return (
      <motion.div
        className="assessment-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <div className="assessment-header">
          <h2>Your Results</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <motion.div 
          className="assessment-results"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="result-type-badge" style={{ backgroundColor: `${interpretation.color}20`, color: interpretation.color }}>
            {assessmentType === 'depression' ? 'Depression Screening' : 'Anxiety Screening'}
          </div>

          {/* Circular Progress */}
          <div className="score-circle">
            <svg viewBox="0 0 200 200" className="score-svg">
              <circle 
                cx="100" 
                cy="100" 
                r="80" 
                fill="none" 
                stroke="var(--border-medium)" 
                strokeWidth="16" 
              />
              <motion.circle 
                cx="100" 
                cy="100" 
                r="80" 
                fill="none" 
                stroke={interpretation.color}
                strokeWidth="16"
                strokeDasharray={`${percentage * 5.02} 502`}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
                initial={{ strokeDasharray: "0 502" }}
                animate={{ strokeDasharray: `${percentage * 5.02} 502` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="score-center">
              <div className="score-number" style={{ color: interpretation.color }}>
                {score}
              </div>
              <div className="score-max">out of {maxScore}</div>
            </div>
          </div>

          <div className="score-level" style={{ color: interpretation.color }}>
            {interpretation.level}
          </div>

          <div className="interpretation">
            <p>{interpretation.message}</p>
          </div>

          {interpretation.severity === 'severe' && (
            <motion.div 
              className="crisis-banner"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <PhoneCall size={24} />
              <div>
                <strong>Need immediate support?</strong>
                <p>Mental Health Crisis Line: <a href="tel:0553456789">0553456789</a></p>
              </div>
            </motion.div>
          )}

          <div className="resources">
            <h3>Recommendations:</h3>
            <ul>
              {interpretation.recommendations.map((rec, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {rec}
                </motion.li>
              ))}
            </ul>
          </div>

          {renderProgressChart()}

          <div className="assessment-actions">
            <button className="btn-secondary" onClick={restart}>
              Take Another Assessment
            </button>
            <button className="btn-primary" onClick={onClose}>
              <MessageCircle size={18} /> Return to Chat
            </button>
          </div>

          <div className="disclaimer">
            <AlertCircle size={16} />
            <small>
              This is a screening tool, not a professional diagnosis. For a complete evaluation, 
              please consult a licensed mental health provider or your doctor.
            </small>
          </div>
        </motion.div>
        </div>
      </motion.div>
    );
  }

  // History View
  if (view === 'history') {
    return (
      <motion.div
        className="assessment-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div>
          <div className="assessment-header">
          <button className="back-btn" onClick={() => setView('welcome')}>
            <ArrowLeft size={20} />
          </button>
          <h2><Calendar size={24} /> Assessment History</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="history-list">
          {history.map((entry, index) => {
            const interpretation = entry.type === 'depression' 
              ? getDepressionInterpretation(entry.score)
              : getAnxietyInterpretation(entry.score);
            
            return (
              <motion.div 
                key={index}
                className="history-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="history-header">
                  <div className="history-type" style={{ color: interpretation.color }}>
                    {entry.type === 'depression' ? (
                      <><Brain size={18} /> Depression</>
                    ) : (
                      <><AlertCircle size={18} /> Anxiety</>
                    )}
                  </div>
                  <div className="history-date">
                    {new Date(entry.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
                <div className="history-score">
                  <div className="history-bar">
                    <div 
                      className="history-bar-fill" 
                      style={{ 
                        width: `${(entry.score / (entry.type === 'depression' ? 27 : 21)) * 100}%`,
                        backgroundColor: interpretation.color
                      }}
                    />
                  </div>
                  <span style={{ color: interpretation.color }}>
                    {entry.score}/{entry.type === 'depression' ? 27 : 21} - {interpretation.level}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {history.length === 0 && (
          <div className="empty-history">
            <BarChart3 size={64} className="empty-icon" />
            <h3>No Assessment History</h3>
            <p>Your completed assessments will appear here</p>
          </div>
        )}
        </div>
      </motion.div>
    );
  }

  return null;
};

export default MentalHealthAssessment;
