import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, BookOpen, Shield, Heart, Activity, CheckCircle,
  AlertTriangle, RotateCcw, Trophy, Star,
  Play, Lock, Unlock, Award, ChevronRight
} from 'lucide-react';
import { MdArrowBack } from 'react-icons/md';
import './InteractiveFeatures.css';

// Feature 6: Interactive Scenarios
export const InteractiveScenarios = ({ onClose }) => {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [scenarioStep, setScenarioStep] = useState(0);
  const [choices, setChoices] = useState([]);
  const [completed, setCompleted] = useState([]);

  const scenarios = [
    {
      id: 'consent',
      title: 'Understanding Consent',
      description: 'Learn to recognize consent in real situations',
      icon: <Shield size={24} />,
      difficulty: 'Beginner',
      duration: '5 min',
      steps: [
        {
          situation: "You're on a date and things are going well. Your date asks if you want to go somewhere more private.",
          question: "What should you consider before answering?",
          options: [
            {
              text: "Whether I feel comfortable and want to",
              correct: true,
              feedback: "Correct! Your comfort and genuine desire are the most important factors."
            },
            {
              text: "Whether they'll be disappointed if I say no",
              correct: false,
              feedback: "Your decision should be based on what YOU want, not on pleasing others."
            },
            {
              text: "Whether I've already agreed to the date",
              correct: false,
              feedback: "Agreeing to a date doesn't mean you've agreed to anything else. Consent is ongoing."
            }
          ]
        },
        {
          situation: "During intimacy, you start feeling uncomfortable and want to stop.",
          question: "What's the best action to take?",
          options: [
            {
              text: "Say 'stop' or 'no' clearly",
              correct: true,
              feedback: "Perfect! You can withdraw consent at any time. Clear communication is key."
            },
            {
              text: "Continue because you already started",
              correct: false,
              feedback: "Never! You can change your mind at any point. Consent can be withdrawn."
            },
            {
              text: "Give hints and hope they notice",
              correct: false,
              feedback: "While hints might work, clear verbal communication is always best in these situations."
            }
          ]
        }
      ]
    },
    {
      id: 'contraception',
      title: 'Choosing Contraception',
      description: 'Navigate the options and find what works',
      icon: <Activity size={24} />,
      difficulty: 'Intermediate',
      duration: '7 min',
      steps: [
        {
          situation: "You're sexually active and want to prevent pregnancy. A friend recommends the pill.",
          question: "What should you consider?",
          options: [
            {
              text: "My lifestyle, health conditions, and ability to take daily pills",
              correct: true,
              feedback: "Excellent! Different methods work for different people based on individual circumstances."
            },
            {
              text: "Just start taking it since my friend likes it",
              correct: false,
              feedback: "What works for your friend may not work for you. Consult a healthcare provider."
            },
            {
              text: "It prevents STIs so it's perfect",
              correct: false,
              feedback: "Important note: Birth control pills don't prevent STIs. Use condoms for STI protection."
            }
          ]
        },
        {
          situation: "You forgot to take your pill two days in a row.",
          question: "What should you do?",
          options: [
            {
              text: "Use backup protection and check the instructions",
              correct: true,
              feedback: "Correct! Missing pills reduces effectiveness. Use condoms and follow package instructions."
            },
            {
              text: "Take 3 pills today to catch up",
              correct: false,
              feedback: "Don't do this without medical advice. It could cause side effects."
            },
            {
              text: "Nothing, two days won't matter",
              correct: false,
              feedback: "Missing pills increases pregnancy risk. Always use backup protection."
            }
          ]
        }
      ]
    },
    {
      id: 'pressure',
      title: 'Handling Pressure',
      description: 'Practice saying no and setting boundaries',
      icon: <AlertTriangle size={24} />,
      difficulty: 'Advanced',
      duration: '8 min',
      steps: [
        {
          situation: "Your partner says 'If you loved me, you would...'",
          question: "How do you respond?",
          options: [
            {
              text: "Love isn't about proving yourself through sex",
              correct: true,
              feedback: "Perfect! Real love respects boundaries. This is emotional manipulation."
            },
            {
              text: "Maybe they're right, I should prove my love",
              correct: false,
              feedback: "This is manipulation. Love doesn't require you to do things you're uncomfortable with."
            },
            {
              text: "Stay silent and give in",
              correct: false,
              feedback: "Your voice matters. Silence in uncomfortable situations isn't consent."
            }
          ]
        },
        {
          situation: "Friends are sharing their sexual experiences and pressuring you to share yours.",
          question: "What's a healthy response?",
          options: [
            {
              text: "My private life is my business. I'm not comfortable sharing",
              correct: true,
              feedback: "Great! You don't owe anyone details about your private life."
            },
            {
              text: "Make up a story to fit in",
              correct: false,
              feedback: "You shouldn't feel pressured to lie. Real friends respect privacy."
            },
            {
              text: "Share even though uncomfortable",
              correct: false,
              feedback: "Your comfort matters more than peer pressure. It's okay to keep things private."
            }
          ]
        }
      ]
    },
    {
      id: 'sti-prevention',
      title: 'STI Prevention',
      description: 'Learn to protect yourself and partners',
      icon: <CheckCircle size={24} />,
      difficulty: 'Intermediate',
      duration: '6 min',
      steps: [
        {
          situation: "A partner says they're 'clean' so condoms aren't necessary.",
          question: "What's the safest response?",
          options: [
            {
              text: "Ask about recent testing and still use protection",
              correct: true,
              feedback: "Smart! Many STIs have no symptoms. Testing + protection is safest."
            },
            {
              text: "Trust them and skip the condom",
              correct: false,
              feedback: "People may not know their status. Many STIs are asymptomatic."
            },
            {
              text: "Feel insulted they might have an STI",
              correct: false,
              feedback: "STI protection isn't about trust—it's about health responsibility."
            }
          ]
        },
        {
          situation: "You notice unusual symptoms after unprotected sex.",
          question: "What should you do first?",
          options: [
            {
              text: "Get tested at a clinic immediately",
              correct: true,
              feedback: "Correct! Early testing and treatment prevent complications."
            },
            {
              text: "Wait to see if symptoms go away",
              correct: false,
              feedback: "Never wait! Some STIs cause serious problems if untreated."
            },
            {
              text: "Use home remedies",
              correct: false,
              feedback: "STIs require medical treatment. Home remedies won't cure infections."
            }
          ]
        }
      ]
    }
  ];

  const startScenario = (scenario) => {
    setCurrentScenario(scenario);
    setScenarioStep(0);
    setChoices([]);
  };

  const handleChoice = (option) => {
    const newChoices = [...choices, { step: scenarioStep, option, correct: option.correct }];
    setChoices(newChoices);

    if (scenarioStep < currentScenario.steps.length - 1) {
      setTimeout(() => setScenarioStep(scenarioStep + 1), 2000);
    } else {
      setTimeout(() => completeScenario(), 2000);
    }
  };

  const completeScenario = () => {
    const correctCount = choices.filter(c => c.correct).length;
    const newCompleted = [...completed, {
      id: currentScenario.id,
      score: correctCount,
      total: currentScenario.steps.length,
      date: new Date()
    }];
    setCompleted(newCompleted);
    localStorage.setItem('completedScenarios', JSON.stringify(newCompleted));
  };

  const restartScenario = () => {
    setScenarioStep(0);
    setChoices([]);
  };

  const backToMenu = () => {
    setCurrentScenario(null);
    setScenarioStep(0);
    setChoices([]);
  };

  // Results screen
  if (currentScenario && scenarioStep >= currentScenario.steps.length) {
    const correctCount = choices.filter(c => c.correct).length;
    const percentage = (correctCount / currentScenario.steps.length) * 100;

    return (
      <motion.div
        className="interactive-scenarios"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="scenario-results">
          <h2>Scenario Complete!</h2>
          <div className="results-score">
            <div className="score-circle" style={{
              background: percentage >= 80 ? '#10b981' : percentage >= 60 ? '#f59e0b' : '#dc2626'
            }}>
              <span className="score-value">{correctCount}/{currentScenario.steps.length}</span>
              <span className="score-label">{Math.round(percentage)}%</span>
            </div>
          </div>
          <h3>{percentage >= 80 ? '🎉 Excellent!' : percentage >= 60 ? '👍 Good Job!' : '💪 Keep Learning!'}</h3>
          <p className="results-message">
            {percentage >= 80 ? 'You demonstrated great understanding of this topic!' :
              percentage >= 60 ? 'You\'re on the right track. Review the feedback to improve.' :
                'This is a learning process. Review the correct answers and try again.'}
          </p>
          <div className="results-review">
            <h4>Review Your Choices</h4>
            {choices.map((choice, i) => (
              <div key={i} className={`review-item ${choice.correct ? 'correct' : 'incorrect'}`}>
                <span className="review-icon">{choice.correct ? <CheckCircle size={18} /> : <X size={18} />}</span>
                <div>
                  <p className="review-choice">{choice.option.text}</p>
                  <p className="review-feedback">{choice.option.feedback}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="results-actions">
            <button className="btn-secondary" onClick={restartScenario}>
              <RotateCcw size={16} style={{ marginRight: '8px' }} /> Try Again
            </button>
            <button className="btn-primary" onClick={backToMenu}>
              <MdArrowBack size={16} style={{ marginRight: '8px' }} /> Back to Scenarios
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Active scenario
  if (currentScenario) {
    const step = currentScenario.steps[scenarioStep];
    const selectedChoice = choices.find(c => c.step === scenarioStep);

    return (
      <motion.div
        className="interactive-scenarios"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="scenario-header">
          <button className="back-btn" onClick={backToMenu}><MdArrowBack size={18} /> Back</button>
          <div className="scenario-progress">
            <span>Step {scenarioStep + 1}/{currentScenario.steps.length}</span>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: `${(scenarioStep / currentScenario.steps.length) * 100}%` }}
                animate={{ width: `${((scenarioStep + 1) / currentScenario.steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="scenario-content">
          <div className="scenario-situation">
            <h3>Situation</h3>
            <p>{step.situation}</p>
          </div>

          <div className="scenario-question">
            <h3>{step.question}</h3>
          </div>

          <div className="scenario-options">
            {step.options.map((option, i) => (
              <motion.button
                key={i}
                className={`option-btn ${selectedChoice
                    ? selectedChoice.option === option
                      ? option.correct ? 'correct' : 'incorrect'
                      : option.correct ? 'correct-show' : ''
                    : ''
                  }`}
                onClick={() => !selectedChoice && handleChoice(option)}
                disabled={!!selectedChoice}
                whileHover={!selectedChoice ? { scale: 1.02 } : {}}
                whileTap={!selectedChoice ? { scale: 0.98 } : {}}
              >
                {option.text}
                {selectedChoice && selectedChoice.option === option && (
                  <span className="option-icon">
                    {option.correct ? <CheckCircle size={18} /> : <X size={18} />}
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {selectedChoice && (
              <motion.div
                className={`feedback ${selectedChoice.correct ? 'correct' : 'incorrect'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <p>{selectedChoice.option.feedback}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }

  // Scenario menu
  return (
    <motion.div
      className="interactive-scenarios"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
    >
      <div className="scenarios-header">
        <h2>Interactive Learning Scenarios</h2>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
      </div>

      <p className="scenarios-intro">
        Practice making decisions in realistic situations. Learn through experience!
      </p>

      <div className="scenarios-grid">
        {scenarios.map(scenario => (
          <motion.div
            key={scenario.id}
            className="scenario-card"
            onClick={() => startScenario(scenario)}
            whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="scenario-icon">{scenario.icon}</div>
            <h3>{scenario.title}</h3>
            <p className="scenario-desc">{scenario.description}</p>
            <div className="scenario-meta">
              <span className="scenario-difficulty">{scenario.difficulty}</span>
              <span className="scenario-duration">⏱️ {scenario.duration}</span>
            </div>
            {completed.find(c => c.id === scenario.id) && (
              <div className="scenario-completed">
                <CheckCircle size={14} style={{ marginRight: '4px' }} />
                Completed - {completed.find(c => c.id === scenario.id).score}/{scenario.steps.length}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Feature 20: Gamified Learning Paths
export const LearningPaths = ({ onClose }) => {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('learningPathProgress');
    return saved ? JSON.parse(saved) : {};
  });

  const paths = [
    {
      id: 'basics',
      title: 'SRH Basics',
      icon: <BookOpen size={24} />,
      level: 'Beginner',
      modules: [
        { id: 1, title: 'What is Sexual Health?', points: 50, completed: false },
        { id: 2, title: 'Puberty & Body Changes', points: 50, completed: false },
        { id: 3, title: 'Menstrual Cycle Basics', points: 75, completed: false },
        { id: 4, title: 'Understanding Consent', points: 100, completed: false }
      ]
    },
    {
      id: 'contraception',
      title: 'Contraception Master',
      icon: <Activity size={24} />,
      level: 'Intermediate',
      modules: [
        { id: 1, title: 'Birth Control Methods Overview', points: 75, completed: false },
        { id: 2, title: 'How to Use Condoms Correctly', points: 100, completed: false },
        { id: 3, title: 'Pills, Patches & Rings', points: 100, completed: false },
        { id: 4, title: 'Long-Acting Methods (IUDs, Implants)', points: 125, completed: false },
        { id: 5, title: 'Emergency Contraception', points: 100, completed: false }
      ]
    },
    {
      id: 'sti',
      title: 'STI Prevention Expert',
      icon: <Shield size={24} />,
      level: 'Intermediate',
      modules: [
        { id: 1, title: 'What are STIs?', points: 75, completed: false },
        { id: 2, title: 'Common STIs & Symptoms', points: 100, completed: false },
        { id: 3, title: 'Prevention Strategies', points: 100, completed: false },
        { id: 4, title: 'Testing & Treatment', points: 125, completed: false }
      ]
    },
    {
      id: 'relationships',
      title: 'Healthy Relationships',
      icon: <Heart size={24} />,
      level: 'Advanced',
      modules: [
        { id: 1, title: 'Communication Skills', points: 100, completed: false },
        { id: 2, title: 'Setting Boundaries', points: 125, completed: false },
        { id: 3, title: 'Recognizing Red Flags', points: 150, completed: false },
        { id: 4, title: 'Handling Breakups', points: 100, completed: false }
      ]
    }
  ];

  const completeModule = (pathId, moduleId) => {
    const newProgress = {
      ...progress,
      [`${pathId}-${moduleId}`]: {
        completed: true,
        date: new Date(),
        points: paths.find(p => p.id === pathId).modules.find(m => m.id === moduleId).points
      }
    };
    setProgress(newProgress);
    localStorage.setItem('learningPathProgress', JSON.stringify(newProgress));
  };

  const getPathProgress = (path) => {
    const completed = path.modules.filter(m => progress[`${path.id}-${m.id}`]?.completed).length;
    return (completed / path.modules.length) * 100;
  };

  const getTotalPoints = () => {
    return Object.values(progress).reduce((sum, p) => sum + (p.points || 0), 0);
  };

  return (
    <motion.div
      className="learning-paths"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
    >
      <div className="paths-header">
        <h2>Learning Paths</h2>
        <button className="close-btn" onClick={onClose}><X size={24} /></button>
      </div>

      <div className="total-points">
        <span className="points-icon"><Trophy size={32} color="#f59e0b" /></span>
        <div>
          <span className="points-value">{getTotalPoints()}</span>
          <span className="points-label">Total Points</span>
        </div>
      </div>

      <div className="paths-list">
        {paths.map(path => {
          const pathProgress = getPathProgress(path);
          const isCompleted = pathProgress === 100;

          return (
            <motion.div
              key={path.id}
              className="path-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="path-header">
                <div className="path-title-section">
                  <span className="path-icon">{path.icon}</span>
                  <div>
                    <h3>{path.title}</h3>
                    <span className="path-level">{path.level}</span>
                  </div>
                </div>
                {isCompleted && <span className="completed-badge"><CheckCircle size={14} style={{ marginRight: '4px' }} /> Completed</span>}
              </div>

              <div className="path-progress">
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${pathProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <span className="progress-text">{Math.round(pathProgress)}% Complete</span>
              </div>

              <div className="modules-list">
                {path.modules.map(module => {
                  const isModuleCompleted = progress[`${path.id}-${module.id}`]?.completed;

                  return (
                    <div
                      key={module.id}
                      className={`module-item ${isModuleCompleted ? 'completed' : ''}`}
                    >
                      <div className="module-info">
                        <span className="module-status">
                          {isModuleCompleted ? <CheckCircle size={18} color="#10b981" /> : <div className="status-circle" />}
                        </span>
                        <span className="module-title">{module.title}</span>
                      </div>
                      <div className="module-actions">
                        <span className="module-points">+{module.points} pts</span>
                        {!isModuleCompleted && (
                          <button
                            className="btn-start"
                            onClick={() => completeModule(path.id, module.id)}
                          >
                            Start
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
