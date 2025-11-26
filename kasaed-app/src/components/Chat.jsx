import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { generateGrokResponse, checkGrokAvailability, getGrokApiKey, saveGrokApiKey } from '../utils/grokClient';
import { generateChatbotResponse, generateFollowUpSuggestions, detectIntent } from '../utils/chatbot';
import { panicClear } from '../utils/encryption';
import { emergencyHotlines } from '../data/srhContent';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Send, Mic, Menu, X, Phone, MessageCircle, Volume2, VolumeX,
  AlertTriangle, ChevronRight, MoreHorizontal, Activity, Heart,
  Calendar, Shield, Pill, BookOpen, Users, Award, Smile, Plus,
  Trash2, User, Paperclip, Image as ImageIcon, ChevronDown,
  Edit3, Sparkles, Settings, Edit2, Check, MessageSquarePlus, History, Timer, Clock, MapPin, Globe
} from 'lucide-react';
import MentalHealthAssessment from './MentalHealthAssessment';
import { HealthRecommendations, Quiz, MoodTracker, MedicationReminders, FeedbackForm } from './Features';
import { Achievements, PersonalitySettings, CommunityForum, MediaLibrary, AppointmentBooking } from './AdditionalFeatures';
import { PeriodTracker, STIRiskCalculator, RelationshipChecker, MedicationChecker, VoiceDiary } from './AdvancedFeatures';
import { ClinicFinder, EmergencyContacts } from './LocationFeatures';
import { InteractiveScenarios, LearningPaths } from './InteractiveFeatures';
import { NutritionWellness, Telemedicine, CulturalSettings } from './WellnessFeatures';
import './Chat.css';

const Chat = () => {
  const { t, i18n } = useTranslation();
  const { userProfile, chatHistory, addMessage, isOnline, clearChatHistory, saveChatHistory, saveUserProfile } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [selectedSessions, setSelectedSessions] = useState(new Set());
  const [selectionMode, setSelectionMode] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [autoDeleteTimer, setAutoDeleteTimer] = useState(null);
  const [timerCountdown, setTimerCountdown] = useState(null);
  const [countdownInterval, setCountdownInterval] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [useGrok, setUseGrok] = useState(false);
  const [grokAvailable, setGrokAvailable] = useState(false);
  const [showFirstTimeWarning, setShowFirstTimeWarning] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const [botPersonality, setBotPersonality] = useState(() => localStorage.getItem('botPersonality') || 'friendly');
  const [leftSidebarExpanded, setLeftSidebarExpanded] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => userProfile?.language || 'en');

  // Speech-to-text states
  // Speech-to-text states
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Feature states
  const [activeFeature, setActiveFeature] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(true);

  const [currentSuggestions, setCurrentSuggestions] = useState([
    t('chat.quickReplies.contraception'),
    t('chat.quickReplies.relationships'),
    t('chat.quickReplies.mentalHealth'),
    t('chat.quickReplies.stiPrevention'),
    t('chat.quickReplies.general')
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMenu && !e.target.closest('.menu-button') && !e.target.closest('.dropdown-menu')) {
        setShowMenu(false);
      }
      if (showLanguageMenu && !e.target.closest('.language-toggle') && !e.target.closest('.language-popup-menu')) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu, showLanguageMenu]);

  // Load chat sessions from localStorage
  useEffect(() => {
    const loadChatSessions = async () => {
      try {
        const sessions = JSON.parse(localStorage.getItem('chatSessions') || '[]');
        setChatSessions(sessions);

        // Check if this is a first-time user
        const hasSeenWarning = localStorage.getItem('hasSeenTimerWarning');
        const savedTimer = localStorage.getItem('autoDeleteTimer');

        if (!hasSeenWarning && !savedTimer) {
          // First-time user - show warning and set default 7-day timer
          setShowFirstTimeWarning(true);
          const defaultDuration = 10080 * 60 * 1000; // 7 days in milliseconds
          const timerData = {
            duration: defaultDuration,
            startTime: Date.now()
          };
          localStorage.setItem('autoDeleteTimer', JSON.stringify(timerData));
          setAutoDeleteTimer(defaultDuration);
          startAutoDeleteCountdown(defaultDuration);
        } else if (savedTimer) {
          // Load existing timer
          const timerData = JSON.parse(savedTimer);
          setAutoDeleteTimer(timerData.duration);
          // Check if timer should be active
          const elapsed = Date.now() - timerData.startTime;
          if (elapsed < timerData.duration) {
            startAutoDeleteCountdown(timerData.duration - elapsed);
          } else {
            // Timer expired, clear sessions
            handleAutoDeleteSessions();
          }
        }

        // If there's no current session, create one
        if (!currentSessionId && sessions.length === 0) {
          const newSession = {
            id: Date.now().toString(),
            title: 'New Chat',
            messages: [],
            timestamp: new Date().toISOString()
          };
          const updatedSessions = [...sessions, newSession];
          localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
          setChatSessions(updatedSessions);
          setCurrentSessionId(newSession.id);
        } else if (!currentSessionId && sessions.length > 0) {
          // Load the most recent session
          setCurrentSessionId(sessions[sessions.length - 1].id);
        }
      } catch (error) {
        console.error('Error loading chat sessions:', error);
      }
    };
    loadChatSessions();
  }, []);

  // Check Grok availability on mount
  useEffect(() => {
    const available = checkGrokAvailability();
    setGrokAvailable(available);
    if (available) {
      const grokEnabled = localStorage.getItem('useGrok');
      setUseGrok(grokEnabled === 'true');
    }
  }, []);

  // Save current chat history to the active session
  useEffect(() => {
    if (currentSessionId && chatHistory.length > 0) {
      const updatedSessions = chatSessions.map(session =>
        session.id === currentSessionId
          ? { ...session, messages: chatHistory, timestamp: new Date().toISOString() }
          : session
      );
      setChatSessions(updatedSessions);
      localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
    }
  }, [chatHistory, currentSessionId]);

  // Add greeting message on mount
  useEffect(() => {
    if (chatHistory.length === 0) {
      const greetingMessage = {
        sender: 'bot',
        text: `${t('chat.greeting')} ${t('chat.subtitle')} ${t('chat.noJudgment')}`,
        type: 'greeting'
      };
      addMessage(greetingMessage);
    }
  }, [currentSessionId]);

  // Cleanup recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, []);

  // Sync language with user profile and i18n
  useEffect(() => {
    const savedLanguage = localStorage.getItem('userLanguage') || userProfile?.language || 'en';
    if (savedLanguage !== selectedLanguage) {
      setSelectedLanguage(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, [userProfile]);

  const handlePanicButton = () => {
    if (window.confirm(t('confirmations.panicExit'))) {
      panicClear();
    }
  };

  const handleNewChat = () => {
    const newSession = {
      id: Date.now().toString(),
      title: t('chat.newChat'),
      messages: [],
      timestamp: new Date().toISOString()
    };
    const updatedSessions = [...chatSessions, newSession];
    setChatSessions(updatedSessions);
    localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
    setCurrentSessionId(newSession.id);
    // Clear chat history to start fresh without reloading
    clearChatHistory();
    setShowSidebar(false);
  };

  const handleLoadSession = (sessionId) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      // Load session messages into chat history
      saveChatHistory(session.messages || []);
      setShowSidebar(false);
    }
  };

  const handleToggleSelectSession = (sessionId) => {
    const newSelected = new Set(selectedSessions);
    if (newSelected.has(sessionId)) {
      newSelected.delete(sessionId);
    } else {
      newSelected.add(sessionId);
    }
    setSelectedSessions(newSelected);
  };

  const handleDeleteSelected = () => {
    if (selectedSessions.size === 0) return;

    if (window.confirm(`Delete ${selectedSessions.size} chat session(s)?`)) {
      const updatedSessions = chatSessions.filter(s => !selectedSessions.has(s.id));
      setChatSessions(updatedSessions);
      localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));

      // If current session was deleted, switch to another or create new
      if (selectedSessions.has(currentSessionId)) {
        if (updatedSessions.length > 0) {
          handleLoadSession(updatedSessions[updatedSessions.length - 1].id);
        } else {
          handleNewChat();
        }
      }

      setSelectedSessions(new Set());
      setSelectionMode(false);
    }
  };

  const handleToggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    setSelectedSessions(new Set());
  };

  const formatSessionTitle = (session) => {
    if (session.messages && session.messages.length > 1) {
      const firstUserMessage = session.messages.find(m => m.sender === 'user');
      if (firstUserMessage) {
        return firstUserMessage.text.substring(0, 30) + (firstUserMessage.text.length > 30 ? '...' : '');
      }
    }
    return session.title;
  };

  const formatSessionDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return t('chat.today');
    if (diffDays === 1) return t('chat.yesterday');
    if (diffDays < 7) return `${diffDays} ${t('chat.daysAgo')}`;
    return date.toLocaleDateString();
  };

  const handleStartEdit = (session, e) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditingTitle(session.title || formatSessionTitle(session));
  };

  const handleSaveEdit = (sessionId, e) => {
    if (e) e.stopPropagation();

    if (editingTitle.trim()) {
      const updatedSessions = chatSessions.map(s =>
        s.id === sessionId ? { ...s, title: editingTitle.trim() } : s
      );
      setChatSessions(updatedSessions);
      localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
    }

    setEditingSessionId(null);
    setEditingTitle('');
  };

  const handleCancelEdit = (e) => {
    if (e) e.stopPropagation();
    setEditingSessionId(null);
    setEditingTitle('');
  };

  const handleEditKeyPress = (e, sessionId) => {
    if (e.key === 'Enter') {
      handleSaveEdit(sessionId, e);
    } else if (e.key === 'Escape') {
      handleCancelEdit(e);
    }
  };

  const startAutoDeleteCountdown = (duration) => {
    const endTime = Date.now() + duration;

    const interval = setInterval(() => {
      const remaining = endTime - Date.now();

      if (remaining <= 0) {
        clearInterval(interval);
        handleAutoDeleteSessions();
      } else {
        setTimerCountdown(remaining);
      }
    }, 1000);

    setCountdownInterval(interval);
    return interval;
  };

  const handleAutoDeleteSessions = () => {
    setChatSessions([]);
    localStorage.removeItem('chatSessions');
    localStorage.removeItem('autoDeleteTimer');
    setAutoDeleteTimer(null);
    setTimerCountdown(null);
    clearChatHistory();
    // Create a new session after clearing
    handleNewChat();
  };

  const handleSetTimer = (minutes) => {
    const duration = minutes * 60 * 1000; // Convert to milliseconds
    const timerData = {
      duration,
      startTime: Date.now()
    };

    localStorage.setItem('autoDeleteTimer', JSON.stringify(timerData));
    setAutoDeleteTimer(duration);
    startAutoDeleteCountdown(duration);
    setShowTimerModal(false);
  };

  const handleCancelTimer = () => {
    // Clear the countdown interval
    if (countdownInterval) {
      clearInterval(countdownInterval);
      setCountdownInterval(null);
    }

    localStorage.removeItem('autoDeleteTimer');
    setAutoDeleteTimer(null);
    setTimerCountdown(null);
    setShowTimerModal(false);
  };

  const formatCountdown = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.timer-modal-header')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - modalPosition.x,
        y: e.clientY - modalPosition.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setModalPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleDismissWarning = () => {
    localStorage.setItem('hasSeenTimerWarning', 'true');
    setShowFirstTimeWarning(false);
  };

  // Language handling
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭' },
    { code: 'ee', name: 'Ewe', flag: '🇬🇭' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬' }
  ];

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    i18n.changeLanguage(langCode);
    localStorage.setItem('userLanguage', langCode);
    // Update user profile
    const updatedProfile = { ...userProfile, language: langCode };
    saveUserProfile(updatedProfile);
    setShowLanguageMenu(false);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === selectedLanguage) || languages[0];
  };

  const handleStopResponse = () => {
    console.log('🛑 Stopping bot response...');
    if (abortController) {
      abortController.abort();
      setAbortController(null);
    }
    setIsTyping(false);
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      sender: 'user',
      text: messageText
    };
    addMessage(userMessage);
    setInputMessage('');
    setIsTyping(true);

    // Create abort controller for this request
    const controller = new AbortController();
    setAbortController(controller);

    // Simulate processing delay
    const timeoutId = setTimeout(async () => {
      // Check if aborted
      if (controller.signal.aborted) {
        console.log('⚠️ Request was aborted');
        setIsTyping(false);
        setAbortController(null);
        return;
      }

      // Try Grok first if enabled and available
      console.log('🔍 Grok check - useGrok:', useGrok, 'grokAvailable:', grokAvailable);
      if (useGrok && grokAvailable) {
        console.log('✅ Attempting to use Groq...');
        const apiKey = getGrokApiKey();
        console.log('🔑 API Key retrieved:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NONE');

        try {
          const grokResult = await generateGrokResponse(messageText, chatHistory, apiKey, controller.signal);
          console.log('📊 Groq result:', grokResult);

          if (grokResult.success) {
            // Use Groq response
            console.log('✅ Using Groq response!');

            // Use the same intelligent suggestion system as default bot
            const intent = detectIntent(messageText);
            const followUpSuggestions = generateFollowUpSuggestions(intent);

            const responseMessage = {
              sender: 'bot',
              text: grokResult.response,
              model: 'groq',
              relatedTopics: followUpSuggestions.slice(0, 3) // Show first 3 as related topics in bubble
            };
            addMessage(responseMessage);
            setIsTyping(false);
            setAbortController(null);

            // Set all suggestions for the quick reply bar
            setCurrentSuggestions(followUpSuggestions);
            return;
          } else {
            // If Groq fails, show error and fall back
            console.error('❌ Groq failed:', grokResult.error);
            console.log('⚠️ Falling back to default chatbot');
          }
        } catch (error) {
          if (error.name === 'AbortError') {
            console.log('⚠️ Groq request was aborted');
            setIsTyping(false);
            setAbortController(null);
            return;
          }
          console.error('❌ Groq error:', error);
        }
      }

      // Check if aborted before continuing
      if (controller.signal.aborted) {
        console.log('⚠️ Request was aborted before default bot');
        setIsTyping(false);
        setAbortController(null);
        return;
      }

      // Use default chatbot
      const botResponse = generateChatbotResponse(messageText, userProfile);

      if (botResponse.type === 'crisis') {
        // Show emergency screen
        setShowEmergency(true);
        const crisisMessage = {
          sender: 'bot',
          text: botResponse.message,
          type: 'crisis'
        };
        addMessage(crisisMessage);
      } else if (botResponse.type === 'facility_recommendation') {
        // Show facility recommendation with action button
        const facilityMessage = {
          sender: 'bot',
          text: botResponse.message,
          type: 'facility_recommendation',
          showFacilityButton: true
        };
        addMessage(facilityMessage);

        // Update suggestions
        setCurrentSuggestions([t('chat.findClinics'), t('chat.tellMore'), t('chat.noThanks')]);
      } else {
        // Normal response
        const responseMessage = {
          sender: 'bot',
          text: botResponse.response,
          title: botResponse.title,
          sources: botResponse.sources,
          relatedTopics: botResponse.relatedTopics
        };
        addMessage(responseMessage);

        // Update suggestions
        const newSuggestions = generateFollowUpSuggestions(botResponse.intent);
        setCurrentSuggestions(newSuggestions);
      }

      setIsTyping(false);
      setAbortController(null);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    if (reply === t('chat.findClinics')) {
      setActiveFeature('clinic');
      return;
    }
    handleSendMessage(reply);
  };

  // Speech-to-text functionality
  const handleStartListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(t('alerts.speechNotSupported'));
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          }
        }

        if (finalTranscript) {
          setInputMessage(prev => {
            const newText = prev + (prev.length > 0 && !prev.endsWith(' ') ? ' ' : '') + finalTranscript;
            return newText;
          });
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          alert(t('alerts.micAccessDenied'));
          setIsListening(false);
        }
        // Don't stop for 'no-speech' errors in continuous mode
        if (event.error !== 'no-speech') {
          setIsListening(false);
        }
      };

      recognition.onend = () => {
        // If we didn't manually stop it (and it wasn't an error we care about), restart it?
        // For now, let's just update state. The user can restart if needed.
        // Actually, for "continuous" feel, we might want to keep it going, but 
        // usually 'continuous' flag handles pauses. 'onend' usually means it's really done.
        setIsListening(false);
      };

      recognition.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setIsListening(false);
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error('Error stopping recognition:', e);
      }
    }
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      handleStopListening();
    } else {
      handleStartListening();
    }
  };

  const handleTextToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = userProfile.language === 'en' ? 'en-US' : 'en-GB';
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert(t('alerts.ttsNotSupported'));
    }
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const renderMessage = (message, index) => {
    const isUser = message.sender === 'user';

    return (
      <motion.div
        key={index}
        className={`message ${isUser ? 'user-message' : 'bot-message'}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {!isUser && (
          <div className="message-avatar">
            <Sparkles size={16} />
          </div>
        )}
        <div className="message-content">
          {message.title && <h4 className="message-title">{message.title}</h4>}
          {isUser ? (
            <p>{message.text}</p>
          ) : (
            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.text}
              </ReactMarkdown>
            </div>
          )}
          {!isUser && message.showFacilityButton && (
            <button
              className="facility-finder-btn"
              onClick={() => setActiveFeature('clinic')}
              style={{ marginTop: '1rem' }}
            >
              <MapPin size={16} /> Find Nearby Health Facilities
            </button>
          )}
          {!isUser && (
            <button
              className="icon-btn speech-btn"
              onClick={() => isSpeaking ? handleStopSpeech() : handleTextToSpeech(message.text)}
              aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
              style={{ marginTop: '0.5rem' }}
            >
              {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          )}
          {message.sources && message.sources.length > 0 && (
            <div className="message-sources">
              <small>Sources: {message.sources.join(', ')}</small>
            </div>
          )}
          {message.relatedTopics && message.relatedTopics.length > 0 && (
            <div className="related-topics" style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {message.relatedTopics.map((topic, i) => (
                <button
                  key={i}
                  className="quick-reply-btn"
                  onClick={() => handleQuickReply(topic)}
                  style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}
                >
                  {topic}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const renderFeature = () => {
    const closeFeature = () => {
      setActiveFeature(null);
      // Refresh personality when closing PersonalitySettings
      const updatedPersonality = localStorage.getItem('botPersonality') || 'friendly';
      setBotPersonality(updatedPersonality);
    };

    switch (activeFeature) {
      case 'assessment': return <MentalHealthAssessment onClose={closeFeature} />;
      case 'quiz': return <Quiz onClose={closeFeature} />;
      case 'mood': return <MoodTracker onClose={closeFeature} />;
      case 'medReminders': return <MedicationReminders onClose={closeFeature} />;
      case 'feedback': return <FeedbackForm onClose={closeFeature} />;
      case 'achievements': return <Achievements onClose={closeFeature} />;
      case 'personality': return <PersonalitySettings onClose={closeFeature} />;
      case 'forum': return <CommunityForum onClose={closeFeature} />;
      case 'library': return <MediaLibrary onClose={closeFeature} />;
      case 'booking': return <AppointmentBooking onClose={closeFeature} />;
      case 'period': return <PeriodTracker onClose={closeFeature} />;
      case 'sti': return <STIRiskCalculator onClose={closeFeature} />;
      case 'relationship': return <RelationshipChecker onClose={closeFeature} />;
      case 'medChecker': return <MedicationChecker onClose={closeFeature} />;
      case 'voiceDiary': return <VoiceDiary onClose={closeFeature} />;
      case 'clinic': return <ClinicFinder onClose={closeFeature} />;
      case 'contacts': return <EmergencyContacts onClose={closeFeature} />;
      case 'scenarios': return <InteractiveScenarios onClose={closeFeature} />;
      case 'learning': return <LearningPaths onClose={closeFeature} />;
      case 'nutrition': return <NutritionWellness onClose={closeFeature} />;
      case 'telemed': return <Telemedicine onClose={closeFeature} />;
      case 'cultural': return <CulturalSettings onClose={closeFeature} />;
      default: return null;
    }
  };

  if (activeFeature) {
    return renderFeature();
  }

  if (showEmergency) {
    return (
      <motion.div
        className="emergency-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="emergency-header">
          <h2>{t('emergency.title')}</h2>
        </div>
        <p className="emergency-message">{t('emergency.message')}</p>

        <div className="hotlines-list">
          {emergencyHotlines.map((hotline) => (
            <div key={hotline.id} className="hotline-card">
              <h3>{hotline.name}</h3>
              <p className="hotline-description">{hotline.description}</p>
              <p className="hotline-hours">{hotline.hours}</p>
              <div className="hotline-actions">
                <a href={`tel:${hotline.number}`} className="btn-call">
                  <Phone size={16} /> {hotline.number}
                </a>
                {hotline.whatsapp && (
                  <a
                    href={`https://wa.me/${hotline.number.replace(/\s/g, '')}`}
                    className="btn-whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="emergency-footer">
          <button className="btn-secondary" onClick={() => setShowEmergency(false)}>
            Continue Chatting
          </button>
          <button className="btn-danger" onClick={handlePanicButton}>
            Close App
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="chat-container">
      {/* Left Sidebar - Always Visible */}
      <div className={`left-sidebar ${leftSidebarExpanded ? 'expanded' : ''}`}>
        {/* Collapsed View - Icon Buttons */}
        <div className="sidebar-top-icons">
          <button
            className="sidebar-icon-btn"
            onClick={() => setLeftSidebarExpanded(!leftSidebarExpanded)}
            aria-label="Chat History"
            title="Chat History"
          >
            <History size={20} />
          </button>
          <button
            className="sidebar-icon-btn"
            onClick={handleNewChat}
            aria-label="New Chat"
            title="New Chat"
          >
            <MessageSquarePlus size={20} />
          </button>
        </div>

        {/* Expanded View - Full Sidebar */}
        <div className="sidebar-expanded-content">
          <div className="sidebar-header">
            <h3 className="sidebar-title">Chat History</h3>
            <div className="sidebar-header-actions">
              <button
                className="icon-btn"
                onClick={handleNewChat}
                aria-label="New Chat"
              >
                <MessageSquarePlus size={20} />
              </button>
              <button
                className="icon-btn"
                onClick={() => setLeftSidebarExpanded(false)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="sidebar-content">
            {chatSessions.length === 0 ? (
              <div className="empty-sessions">
                <p>No chat history yet</p>
              </div>
            ) : (
              <>
                <div className="sidebar-actions">
                  <button
                    className="btn-select-mode"
                    onClick={handleToggleSelectionMode}
                  >
                    {selectionMode ? 'Cancel' : 'Select'}
                  </button>
                  {selectionMode && selectedSessions.size > 0 && (
                    <button
                      className="btn-delete-selected"
                      onClick={handleDeleteSelected}
                    >
                      <Trash2 size={16} /> Delete ({selectedSessions.size})
                    </button>
                  )}
                </div>

                <div className="sessions-list">
                  {chatSessions.map((session) => (
                    <div
                      key={session.id}
                      className={`session-item ${session.id === currentSessionId ? 'active' : ''}
                        ${selectionMode ? 'selection-mode' : ''} ${editingSessionId === session.id ? 'editing' : ''}`}
                    >
                      {selectionMode && (
                        <input
                          type="checkbox"
                          className="session-checkbox"
                          checked={selectedSessions.has(session.id)}
                          onChange={() => handleToggleSelectSession(session.id)}
                        />
                      )}
                      <div
                        className="session-content"
                        onClick={() => !selectionMode && editingSessionId !== session.id && handleLoadSession(session.id)}
                      >
                        {editingSessionId === session.id ? (
                          <div className="session-edit-wrapper">
                            <input
                              type="text"
                              className="session-edit-input"
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              onKeyDown={(e) => handleEditKeyPress(e, session.id)}
                              onClick={(e) => e.stopPropagation()}
                              autoFocus
                            />
                            <div className="session-edit-actions">
                              <button
                                className="icon-btn-small"
                                onClick={(e) => handleSaveEdit(session.id, e)}
                                aria-label="Save"
                              >
                                <Check size={14} />
                              </button>
                              <button
                                className="icon-btn-small"
                                onClick={handleCancelEdit}
                                aria-label="Cancel"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="session-title">
                              <MessageCircle size={16} />
                              <span>{formatSessionTitle(session)}</span>
                            </div>
                            <div className="session-date">
                              {formatSessionDate(session.timestamp)}
                            </div>
                          </>
                        )}
                      </div>
                      {!selectionMode && editingSessionId !== session.id && (
                        <button
                          className="icon-btn-small session-edit-btn"
                          onClick={(e) => handleStartEdit(session, e)}
                          aria-label="Rename"
                        >
                          <Edit2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Panic Button Footer */}
        <div className={`sidebar-panic-footer ${!leftSidebarExpanded ? 'collapsed' : ''}`}>
          <button
            className={`panic-btn-sidebar ${!leftSidebarExpanded ? 'icon-only' : ''}`}
            onClick={handlePanicButton}
            aria-label="Quick Exit"
            title="Quick Exit"
          >
            <AlertTriangle size={leftSidebarExpanded ? 18 : 20} />
            {leftSidebarExpanded && <span>Quick Exit</span>}
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        {/* Minimal Header with Logo and Actions */}
        <div className="chat-header-minimal">
          <h1 className="logo-text">KasaEd</h1>
          <div className="header-actions">
            <button
              className="icon-btn"
              onClick={() => { setActiveFeature('personality'); }}
              aria-label="Settings"
              title="Settings"
            >
              <Settings size={20} />
            </button>
            <button
              className="icon-btn"
              onClick={() => {
                if (window.confirm('Clear all messages in this chat?')) {
                  clearChatHistory();
                }
              }}
              aria-label="Clear Chat"
              title="Clear Chat"
            >
              <Trash2 size={20} />
            </button>
            <button
              className="icon-btn danger-btn"
              onClick={handlePanicButton}
              aria-label="Quick Exit"
              title="Quick Exit"
            >
              <AlertTriangle size={20} />
            </button>
            <button
              className="icon-btn header-menu-btn menu-button"
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Menu"
              title="Menu"
            >
              <MoreHorizontal size={24} />
            </button>
          </div>
        </div>

        {/* Main Menu Dropdown */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              className="dropdown-menu main-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <button onClick={() => { setActiveFeature('assessment'); setShowMenu(false); }}>
                <Activity size={18} /> Mental Health Check-In
              </button>
              <button onClick={() => { setActiveFeature('quiz'); setShowMenu(false); }}>
                <BookOpen size={18} /> Take SRH Quiz
              </button>
              <button onClick={() => { setActiveFeature('mood'); setShowMenu(false); }}>
                <Smile size={18} /> Mood Journal
              </button>
              <button onClick={() => { setActiveFeature('medReminders'); setShowMenu(false); }}>
                <Pill size={18} /> Medication Reminders
              </button>
              <button onClick={() => { setActiveFeature('period'); setShowMenu(false); }}>
                <Calendar size={18} /> Period Tracker
              </button>
              <button onClick={() => { setActiveFeature('sti'); setShowMenu(false); }}>
                <Shield size={18} /> STI Risk Calculator
              </button>
              <button onClick={() => { setActiveFeature('relationship'); setShowMenu(false); }}>
                <Heart size={18} /> Relationship Health
              </button>
              <button onClick={() => { setActiveFeature('forum'); setShowMenu(false); }}>
                <Users size={18} /> Community Q&A
              </button>
              <button onClick={() => { setActiveFeature('achievements'); setShowMenu(false); }}>
                <Award size={18} /> Achievements
              </button>
              <button onClick={() => { setActiveFeature('clinic'); setShowMenu(false); }}>
                <MapPin size={18} /> Find Nearby Clinics
              </button>
              <button onClick={() => { setShowTimerModal(true); setShowMenu(false); }}>
                <Timer size={18} /> Auto-Delete Timer
              </button>
              <button onClick={() => { setShowRecommendations(!showRecommendations); setShowMenu(false); }}>
                <MoreHorizontal size={18} /> {showRecommendations ? 'Hide' : 'Show'} Recommendations
              </button>
              <button onClick={() => { setActiveFeature('personality'); setShowMenu(false); }}>
                <Settings size={18} /> Settings
              </button>
              <button
                onClick={() => {
                  console.log('🎯 Groq menu clicked');
                  console.log('Current state - grokAvailable:', grokAvailable, 'useGrok:', useGrok);

                  if (!grokAvailable) {
                    console.log('⚙️ No API key found, prompting user...');
                    const apiKey = prompt('Enter your Groq API key from https://console.groq.com');
                    console.log('API key entered:', apiKey ? 'YES' : 'NO');

                    if (apiKey && apiKey.trim()) {
                      console.log('💾 Saving API key...');
                      const saved = saveGrokApiKey(apiKey);
                      console.log('Save result:', saved);

                      if (saved) {
                        setGrokAvailable(true);
                        setUseGrok(true);
                        localStorage.setItem('useGrok', 'true');
                        console.log('✅ Groq enabled successfully!');
                        alert('Groq API key saved! You can now use Groq AI.');
                      }
                    } else {
                      console.log('❌ No valid API key provided');
                    }
                  } else {
                    console.log('🔄 Toggling Groq usage...');
                    const newValue = !useGrok;
                    setUseGrok(newValue);
                    localStorage.setItem('useGrok', newValue.toString());
                    console.log('New state - useGrok:', newValue);
                  }
                  setShowMenu(false);
                }}
                className={useGrok ? 'menu-item-active' : ''}
              >
                <Sparkles size={18} />
                {grokAvailable ? (useGrok ? 'Using Groq AI ✓' : 'Enable Groq AI') : 'Setup Groq AI'}
              </button>
              <button onClick={() => { setActiveFeature('feedback'); setShowMenu(false); }}>
                <MessageCircle size={18} /> Send Feedback
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Offline Banner */}
        {!isOnline && (
          <div className="offline-banner">
            {t('offline.banner')}
          </div>
        )}

        {/* Timer Countdown Banner */}
        {timerCountdown && (
          <div className="timer-banner">
            <Clock size={16} />
            Auto-delete in: {formatCountdown(timerCountdown)}
            <button className="btn-cancel-timer" onClick={handleCancelTimer}>
              <X size={14} /> Cancel
            </button>
          </div>
        )}

        {/* Timer Modal */}
        <AnimatePresence>
          {showTimerModal && (
            <>
              <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowTimerModal(false)}
              />
              <motion.div
                className="timer-modal"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{
                  left: modalPosition.x ? `${modalPosition.x}px` : '50%',
                  top: modalPosition.y ? `${modalPosition.y}px` : '50%',
                  transform: modalPosition.x ? 'none' : 'translate(-50%, -50%)'
                }}
                onMouseDown={handleMouseDown}
              >
                <div className="timer-modal-header" style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                  <h3>Set Auto-Delete Timer</h3>
                  <button className="icon-btn" onClick={() => setShowTimerModal(false)}>
                    <X size={20} />
                  </button>
                </div>
                <div className="timer-modal-content">
                  <p>Choose when to automatically delete all chat sessions:</p>
                  <div className="timer-options">
                    <button className="timer-option-btn" onClick={() => handleSetTimer(60)}>
                      <Timer size={18} />
                      1 Hour
                    </button>
                    <button className="timer-option-btn" onClick={() => handleSetTimer(1440)}>
                      <Timer size={18} />
                      24 Hours
                    </button>
                    <button className="timer-option-btn" onClick={() => handleSetTimer(10080)}>
                      <Timer size={18} />
                      7 Days
                    </button>
                    <button className="timer-option-btn timer-option-recommended" onClick={() => handleSetTimer(129600)}>
                      <Timer size={18} />
                      90 Days (Recommended)
                    </button>
                    <button className="timer-option-btn timer-option-off" onClick={() => handleCancelTimer()}>
                      <X size={18} />
                      Off
                    </button>
                  </div>
                  {autoDeleteTimer && (
                    <div className="timer-active-notice">
                      <AlertTriangle size={16} />
                      A timer is already active. Setting a new one will replace it.
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Messages */}
        <div className="messages-container">
          {/* First-Time Timer Warning */}
          <AnimatePresence>
            {showFirstTimeWarning && (
              <motion.div
                className="first-time-warning"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="warning-icon">
                  <Shield size={24} />
                </div>
                <div className="warning-content">
                  <h4>Privacy Protection Active</h4>
                  <p>
                    Your chat history will automatically be deleted after <strong>7 days</strong> to protect your privacy.
                  </p>
                  <div className="warning-actions">
                    <button className="warning-btn-cancel" onClick={() => {
                      handleCancelTimer();
                      handleDismissWarning();
                    }}>
                      <X size={16} /> Turn Off Timer
                    </button>
                    <button className="warning-btn-keep" onClick={handleDismissWarning}>
                      <Check size={16} /> Keep Timer
                    </button>
                  </div>
                </div>
                <button className="warning-close" onClick={handleDismissWarning}>
                  <X size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {showRecommendations && chatHistory.length > 3 && (
            <HealthRecommendations userProfile={userProfile} chatHistory={chatHistory} />
          )}
          {chatHistory.map((message, index) => renderMessage(message, index))}
          {isTyping && (
            <div className="message bot-message">
              <div className="message-avatar">
                <Sparkles size={16} />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {currentSuggestions.length > 0 && !isTyping && (
          <div className="quick-replies">
            {currentSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className="quick-reply-btn"
                onClick={() => handleQuickReply(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Stop Button */}
        {isTyping && (
          <div className="stop-response-container">
            <button
              className="stop-response-btn"
              onClick={handleStopResponse}
              aria-label="Stop response"
            >
              <X size={18} />
              {t('chat.stopGenerating')}
            </button>
          </div>
        )}

        {/* Centered Input Area */}
        <div className="input-area-centered">
          <div className="input-wrapper-centered">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
              placeholder={isListening ? t('chat.listening') : t('chat.placeholder')}
              className="message-input-centered"
              aria-label="Message input"
              disabled={isListening}
            />
            {isListening && (
              <div className="listening-indicator-inline">
                <div className="sound-wave-mini">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <button
              className={`mic-btn-centered ${isListening ? 'active' : ''}`}
              onClick={toggleListening}
              aria-label={isListening ? 'Stop recording' : 'Start voice input'}
              title={isListening ? 'Click to stop' : 'Click to speak'}
            >
              {isListening ? <X size={18} /> : <Mic size={18} />}
            </button>
          </div>

          {/* Bottom Indicators - Language and Personality */}
          <div className="bottom-indicators">
            {/* Language Toggle */}
            <div className="language-toggle" onClick={() => setShowLanguageMenu(!showLanguageMenu)}>
              <Globe size={16} />
              <span>{getCurrentLanguage().flag} {getCurrentLanguage().name}</span>
              <ChevronDown size={14} className={`chevron ${showLanguageMenu ? 'open' : ''}`} />
            </div>

            {/* Language Popup Menu */}
            {showLanguageMenu && (
              <div className="language-popup-menu">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`language-option ${selectedLanguage === lang.code ? 'selected' : ''}`}
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    <span className="language-flag">{lang.flag}</span>
                    <span className="language-name">{lang.name}</span>
                    {selectedLanguage === lang.code && <Check size={16} className="check-icon" />}
                  </button>
                ))}
              </div>
            )}

            {/* Personality Indicator */}
            <div className="personality-indicator-centered">
              {botPersonality === 'friendly' && <span>😊 {t('personality.friendly')}</span>}
              {botPersonality === 'professional' && <span>👨‍⚕️ {t('personality.professional')}</span>}
              {botPersonality === 'casual' && <span>😎 {t('personality.casual')}</span>}
              {botPersonality === 'empathetic' && <span>🤗 {t('personality.empathetic')}</span>}
            </div>
          </div>
        </div>
      </div >
    </div >
  );
};

export default Chat;
