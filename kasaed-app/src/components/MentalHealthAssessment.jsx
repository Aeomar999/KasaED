import React, { useState } from 'react';
import './MentalHealthAssessment.css';

const MentalHealthAssessment = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // PHQ-9 simplified for youth
  const questions = [
    "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    "How often have you had little interest or pleasure in doing things?",
    "How often have you had trouble falling or staying asleep, or sleeping too much?",
    "How often have you felt tired or had little energy?",
    "How often have you had poor appetite or been overeating?",
    "How often have you felt bad about yourself or that you are a failure?",
    "How often have you had trouble concentrating on things?",
    "How often have you moved or spoken slowly, or been fidgety/restless?",
    "How often have you had thoughts that you would be better off dead?"
  ];

  const options = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" }
  ];

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((sum, answer) => sum + answer, 0);
  };

  const getInterpretation = (score) => {
    if (score <= 4) {
      return {
        level: "Minimal",
        message: "You seem to be doing well! Keep taking care of yourself with regular exercise, good sleep, and social connections.",
        color: "#10b981"
      };
    } else if (score <= 9) {
      return {
        level: "Mild",
        message: "You're experiencing some symptoms. Consider talking to someone you trust or trying stress management techniques like deep breathing or journaling.",
        color: "#f59e0b"
      };
    } else if (score <= 14) {
      return {
        level: "Moderate",
        message: "You're experiencing significant symptoms. We recommend speaking with a counselor or healthcare provider. They can help you develop coping strategies.",
        color: "#f97316"
      };
    } else {
      return {
        level: "Moderately Severe to Severe",
        message: "You're experiencing serious symptoms. Please reach out to a mental health professional or call a crisis hotline. You don't have to face this alone.",
        color: "#dc2626"
      };
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const interpretation = getInterpretation(score);

    return (
      <div className="assessment-container">
        <div className="assessment-results">
          <h2>Your Mental Health Check-In Results</h2>
          
          <div className="score-display" style={{ borderColor: interpretation.color }}>
            <div className="score-number" style={{ color: interpretation.color }}>
              {score} / 27
            </div>
            <div className="score-level" style={{ color: interpretation.color }}>
              {interpretation.level}
            </div>
          </div>

          <div className="interpretation">
            <p>{interpretation.message}</p>
          </div>

          <div className="resources">
            <h3>Helpful Resources:</h3>
            <ul>
              <li>Talk to a trusted adult, friend, or family member</li>
              <li>Contact a school counselor or therapist</li>
              <li>Call Mental Health Crisis Line: 0553456789</li>
              <li>Practice self-care: exercise, sleep, healthy eating</li>
              <li>Try relaxation techniques: deep breathing, meditation</li>
            </ul>
          </div>

          <div className="assessment-actions">
            <button className="btn-primary" onClick={restart}>
              Take Assessment Again
            </button>
            <button className="btn-secondary" onClick={onClose}>
              Return to Chat
            </button>
          </div>

          <div className="disclaimer">
            <small>
              This is a screening tool, not a diagnosis. For professional evaluation, 
              please consult a mental health provider.
            </small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="assessment-container">
      <div className="assessment-header">
        <h2>Mental Health Check-In</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="question-counter">
        Question {currentQuestion + 1} of {questions.length}
      </div>

      <div className="question-text">
        {questions[currentQuestion]}
      </div>

      <div className="answer-options">
        {options.map((option) => (
          <button
            key={option.value}
            className="answer-btn"
            onClick={() => handleAnswer(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="assessment-info">
        <small>All responses are confidential and stored locally on your device.</small>
      </div>
    </div>
  );
};

export default MentalHealthAssessment;
