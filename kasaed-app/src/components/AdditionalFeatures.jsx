import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './AdditionalFeatures.css';

// Feature 30: Achievement Badges
export const Achievements = ({ onClose }) => {
  const [earned, setEarned] = useState(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : [];
  });

  const achievements = [
    { id: 'first_chat', title: 'Getting Started', desc: 'Sent your first message', icon: '🎯' },
    { id: 'knowledge_seeker', title: 'Knowledge Seeker', desc: 'Asked 10 questions', icon: '📚' },
    { id: 'health_champion', title: 'Health Champion', desc: 'Completed mental health check-in', icon: '🏆' },
    { id: 'quiz_master', title: 'Quiz Master', desc: 'Scored 100% on a quiz', icon: '⭐' },
    { id: 'mood_tracker', title: 'Mood Tracker', desc: 'Logged mood for 7 days', icon: '📊' },
    { id: 'helpful_friend', title: 'Helpful Friend', desc: 'Shared feedback', icon: '💙' }
  ];

  return (
    <div className="achievements-screen">
      <div className="ach-header">
        <h2>Your Achievements</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="ach-stats">
        <div className="stat-card">
          <span className="stat-number">{earned.length}</span>
          <span className="stat-label">Earned</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{achievements.length - earned.length}</span>
          <span className="stat-label">Locked</span>
        </div>
      </div>

      <div className="ach-grid">
        {achievements.map(ach => {
          const isEarned = earned.includes(ach.id);
          return (
            <div key={ach.id} className={`ach-card ${isEarned ? 'earned' : 'locked'}`}>
              <div className="ach-icon">{ach.icon}</div>
              <h4>{ach.title}</h4>
              <p>{ach.desc}</p>
              {isEarned && <span className="ach-badge">✓ Unlocked</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Feature 32: Chatbot Personality
export const PersonalitySettings = ({ onClose }) => {
  const [personality, setPersonality] = useState(() => {
    return localStorage.getItem('botPersonality') || 'friendly';
  });

  const personalities = [
    { id: 'friendly', name: 'Friendly & Warm', emoji: '😊', desc: 'Supportive and encouraging' },
    { id: 'professional', name: 'Professional', emoji: '👨‍⚕️', desc: 'Clinical and informative' },
    { id: 'casual', name: 'Casual & Fun', emoji: '😎', desc: 'Relaxed and conversational' },
    { id: 'empathetic', name: 'Empathetic', emoji: '🤗', desc: 'Understanding and caring' }
  ];

  const handleSelect = (id) => {
    setPersonality(id);
    localStorage.setItem('botPersonality', id);
  };

  return (
    <div className="personality-settings">
      <div className="settings-header">
        <h2>Chatbot Personality</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <p className="settings-desc">
        Choose how KasaEd communicates with you
      </p>

      <div className="personality-grid">
        {personalities.map(p => (
          <button
            key={p.id}
            className={`personality-card ${personality === p.id ? 'selected' : ''}`}
            onClick={() => handleSelect(p.id)}
          >
            <span className="personality-emoji">{p.emoji}</span>
            <h4>{p.name}</h4>
            <p>{p.desc}</p>
          </button>
        ))}
      </div>

      <button className="btn-primary" onClick={onClose}>
        Save Changes
      </button>
    </div>
  );
};

// Profile Settings - Nickname and Avatar Management
export const ProfileSettings = ({ onClose }) => {
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem('userNickname') || '';
  });

  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    const saved = localStorage.getItem('userAvatar');
    return saved ? JSON.parse(saved) : null;
  });

  const [hasChanges, setHasChanges] = useState(false);

  const avatars = [
    { id: 1, emoji: '😊', name: 'Smiling Face' },
    { id: 2, emoji: '🌟', name: 'Star' },
    { id: 3, emoji: '🌸', name: 'Blossom' },
    { id: 4, emoji: '🦋', name: 'Butterfly' },
    { id: 5, emoji: '🌈', name: 'Rainbow' },
    { id: 6, emoji: '💫', name: 'Dizzy' },
    { id: 7, emoji: '🌺', name: 'Hibiscus' },
    { id: 8, emoji: '✨', name: 'Sparkles' }
  ];

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setHasChanges(true);
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save nickname
    if (nickname.trim()) {
      localStorage.setItem('userNickname', nickname.trim());
    } else {
      localStorage.removeItem('userNickname');
    }

    // Save avatar
    if (selectedAvatar) {
      localStorage.setItem('userAvatar', JSON.stringify(selectedAvatar));
    } else {
      localStorage.removeItem('userAvatar');
    }

    setHasChanges(false);
    alert('✅ Profile updated! The chatbots will use your new preferences.');
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all profile personalization? This will remove your nickname and avatar.')) {
      setNickname('');
      setSelectedAvatar(null);
      localStorage.removeItem('userNickname');
      localStorage.removeItem('userAvatar');
      setHasChanges(false);
      alert('✅ Profile cleared!');
    }
  };

  return (
    <div className="profile-settings">
      <div className="settings-header">
        <h2>Profile Settings</h2>
      </div>

      <div className="profile-settings-card">
        <button className="icon-btn-close-profile" onClick={onClose} aria-label="Close profile settings">
          <X size={20} />
        </button>

        <p className="settings-desc">
          Personalize how the AI addresses you in conversations
        </p>

        <div className="privacy-notice-profile">
          <span className="shield-icon">🛡️</span>
          <p>
            <strong>Your privacy matters.</strong> This information stays on your device
            and helps personalize your experience.
          </p>
        </div>

        <div className="profile-form">
          {/* Nickname Input */}
          <div className="form-group">
            <label htmlFor="nickname-input-profile">
              <span className="label-icon">👤</span>
              <span>Nickname (Optional)</span>
            </label>
            <input
              id="nickname-input-profile"
              type="text"
              className="profile-input"
              placeholder="What should we call you?"
              value={nickname}
              onChange={handleNicknameChange}
              maxLength={20}
            />
            {nickname && (
              <small className="input-hint-profile">
                The AI will address you as "{nickname}"
              </small>
            )}
          </div>

          {/* Avatar Selection */}
          <div className="form-group">
            <label>
              <span className="label-icon">🎨</span>
              <span>Choose Your Avatar (Optional)</span>
            </label>
            <div className="avatar-grid-profile">
              {avatars.map((avatar) => (
                <div
                  key={avatar.id}
                  className={`avatar-option-profile ${selectedAvatar?.id === avatar.id ? 'selected' : ''
                    }`}
                  onClick={() => handleAvatarSelect(avatar)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${avatar.name} avatar`}
                >
                  <span className="avatar-emoji-profile">{avatar.emoji}</span>
                  {selectedAvatar?.id === avatar.id && (
                    <span className="check-icon-profile">✓</span>
                  )}
                </div>
              ))}
            </div>
            {selectedAvatar && (
              <small className="input-hint-profile">
                Selected: {selectedAvatar.name}
              </small>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="profile-actions">
          <button
            className="btn-secondary"
            onClick={handleClearAll}
            disabled={!nickname && !selectedAvatar}
          >
            Clear All
          </button>
          <button
            className="btn-primary"
            onClick={handleSave}
            disabled={!hasChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Feature 22: Community Forum (Enhanced with Modern UI/UX)
export const CommunityForum = ({ onClose }) => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('forumPosts');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'How to talk to parents about relationships?',
        category: 'Relationships',
        replies: 5,
        helpful: 12,
        timestamp: Date.now() - 86400000
      },
      {
        id: 2,
        title: 'Best contraception for young adults?',
        category: 'Contraception',
        replies: 8,
        helpful: 20,
        timestamp: Date.now() - 172800000
      }
    ];
  });
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', category: 'General' });
  const [filter, setFilter] = useState('all');

  // Category configuration with colors and icons
  const categories = {
    General: { color: '#6366f1', icon: '💬', bg: 'rgba(99, 102, 241, 0.1)' },
    Contraception: { color: '#10b981', icon: '🛡️', bg: 'rgba(16, 185, 129, 0.1)' },
    STI: { color: '#f59e0b', icon: '🔬', bg: 'rgba(245, 158, 11, 0.1)' },
    'Mental Health': { color: '#8b5cf6', icon: '🧠', bg: 'rgba(139, 92, 246, 0.1)' },
    Relationships: { color: '#ec4899', icon: '💕', bg: 'rgba(236, 72, 153, 0.1)' }
  };

  const addPost = () => {
    const post = {
      ...newPost,
      id: Date.now(),
      replies: 0,
      helpful: 0,
      timestamp: Date.now()
    };
    const updated = [post, ...posts];
    setPosts(updated);
    localStorage.setItem('forumPosts', JSON.stringify(updated));
    setNewPost({ title: '', category: 'General' });
    setShowNewPost(false);
  };

  const filteredPosts = filter === 'all'
    ? posts
    : posts.filter(p => p.category === filter);

  const formatTimestamp = (timestamp) => {
    const diff = Date.now() - timestamp;
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return new Date(timestamp).toLocaleDateString();
  };



  return (
    <motion.div
      className="community-forum"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with gradient */}
      <div className="forum-header">
        <div className="header-content">
          <div className="header-icon-wrapper">
            <span className="header-icon">💬</span>
          </div>
          <div>
            <h2>Community Q&A</h2>
            <p className="header-subtitle">Share questions and learn from others</p>
          </div>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>
      </div>

      {/* Privacy notice with animation */}
      <motion.div
        className="forum-notice"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <p>🔒 All posts are anonymous. Share your questions safely!</p>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        className="forum-filters"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Topics
        </button>
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
            style={{
              '--cat-color': categories[cat].color,
              '--cat-bg': categories[cat].bg
            }}
          >
            <span className="filter-icon">{categories[cat].icon}</span>
            {cat}
          </button>
        ))}
      </motion.div>

      {/* New post button / form */}
      {!showNewPost ? (
        <motion.button
          className="btn-primary btn-new-post"
          onClick={() => setShowNewPost(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>+</span> Ask a Question
        </motion.button>
      ) : (
        <motion.div
          className="new-post-form"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3>Ask Your Question</h3>
          <div className="form-field">
            <label htmlFor="post-title">Question</label>
            <input
              id="post-title"
              type="text"
              placeholder="What's your question?"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              maxLength={150}
            />
            <small className="char-count">{newPost.title.length}/150</small>
          </div>
          <div className="form-field">
            <label htmlFor="post-category">Category</label>
            <select
              id="post-category"
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            >
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {categories[cat].icon} {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <motion.button
              className="btn-primary"
              onClick={addPost}
              disabled={!newPost.title.trim()}
              whileHover={{ scale: newPost.title.trim() ? 1.02 : 1 }}
              whileTap={{ scale: newPost.title.trim() ? 0.98 : 1 }}
            >
              Post Question
            </motion.button>
            <motion.button
              className="btn-secondary"
              onClick={() => {
                setShowNewPost(false);
                setNewPost({ title: '', category: 'General' });
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Posts list with staggered animation */}
      <div className="forum-posts">
        {filteredPosts.length === 0 ? (
          <motion.div
            className="empty-posts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="empty-icon">🤔</div>
            <h3>No questions yet</h3>
            <p>Be the first to ask a question in this category!</p>
          </motion.div>
        ) : (
          filteredPosts.map((post, index) => {
            const catData = categories[post.category] || categories.General;
            return (
              <motion.div
                key={post.id}
                className="forum-post"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' }}
                style={{ '--post-color': catData.color }}
              >
                <div className="post-header">
                  <span
                    className="post-category"
                    style={{
                      backgroundColor: catData.bg,
                      color: catData.color,
                      borderColor: catData.color + '40'
                    }}
                  >
                    <span className="category-icon">{catData.icon}</span>
                    {post.category}
                  </span>
                  <span className="post-time">{formatTimestamp(post.timestamp)}</span>
                </div>
                <h4>{post.title}</h4>
                <div className="post-meta">
                  <motion.span
                    className="meta-item"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="meta-icon">💬</span> {post.replies} {post.replies === 1 ? 'reply' : 'replies'}
                  </motion.span>
                  <motion.span
                    className="meta-item"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="meta-icon">👍</span> {post.helpful} helpful
                  </motion.span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};

// Feature 23: Multimedia Library (Simplified)
export const MediaLibrary = ({ onClose }) => {
  const media = [
    {
      id: 1,
      type: 'video',
      title: 'Understanding Contraception',
      category: 'Contraception',
      duration: '5:30',
      thumbnail: '🎥'
    },
    {
      id: 2,
      type: 'infographic',
      title: 'STI Prevention Guide',
      category: 'STI',
      thumbnail: '📊'
    },
    {
      id: 3,
      type: 'podcast',
      title: 'Mental Health Matters',
      category: 'Mental Health',
      duration: '12:45',
      thumbnail: '🎧'
    },
    {
      id: 4,
      type: 'article',
      title: 'Consent in Relationships',
      category: 'Relationships',
      thumbnail: '📄'
    }
  ];

  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? media
    : media.filter(m => m.type === filter);

  return (
    <div className="media-library">
      <div className="library-header">
        <h2>Learning Library</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="media-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'video' ? 'active' : ''}
          onClick={() => setFilter('video')}
        >
          Videos
        </button>
        <button
          className={filter === 'infographic' ? 'active' : ''}
          onClick={() => setFilter('infographic')}
        >
          Infographics
        </button>
        <button
          className={filter === 'podcast' ? 'active' : ''}
          onClick={() => setFilter('podcast')}
        >
          Podcasts
        </button>
      </div>

      <div className="media-grid">
        {filtered.map(item => (
          <div key={item.id} className="media-card">
            <div className="media-thumbnail">{item.thumbnail}</div>
            <div className="media-info">
              <span className="media-type">{item.type}</span>
              <h4>{item.title}</h4>
              <p className="media-category">{item.category}</p>
              {item.duration && <span className="media-duration">⏱️ {item.duration}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Feature 26: Appointment Booking (Simplified)
export const AppointmentBooking = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    service: '',
    clinic: '',
    date: '',
    time: ''
  });

  const services = [
    'General Check-up',
    'Contraception Consultation',
    'STI Testing',
    'Mental Health Counseling',
    'Family Planning'
  ];

  const clinics = [
    { name: 'PPAG Accra', location: 'Accra Central' },
    { name: 'Ridge Hospital', location: 'Ridge' },
    { name: 'Korle Bu', location: 'Korle Bu' }
  ];

  const confirmBooking = () => {
    const appointment = {
      ...booking,
      id: Date.now(),
      status: 'pending'
    };

    const existing = JSON.parse(localStorage.getItem('appointments') || '[]');
    existing.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(existing));

    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="appointment-booking">
        <div className="booking-success">
          <h2>✅ Booking Confirmed!</h2>
          <div className="booking-details">
            <p><strong>Service:</strong> {booking.service}</p>
            <p><strong>Clinic:</strong> {booking.clinic}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Time:</strong> {booking.time}</p>
          </div>
          <p className="booking-note">
            You'll receive a reminder before your appointment.
          </p>
          <button className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-booking">
      <div className="booking-header">
        <h2>Book Appointment</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="booking-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Service</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Details</div>
      </div>

      {step === 1 && (
        <div className="booking-form">
          <h3>What service do you need?</h3>
          <div className="service-list">
            {services.map(service => (
              <button
                key={service}
                className={`service-option ${booking.service === service ? 'selected' : ''}`}
                onClick={() => setBooking({ ...booking, service })}
              >
                {service}
              </button>
            ))}
          </div>
          <button
            className="btn-primary"
            onClick={() => setStep(2)}
            disabled={!booking.service}
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="booking-form">
          <h3>Choose clinic and time</h3>
          <select
            value={booking.clinic}
            onChange={(e) => setBooking({ ...booking, clinic: e.target.value })}
          >
            <option value="">Select clinic</option>
            {clinics.map(clinic => (
              <option key={clinic.name} value={clinic.name}>
                {clinic.name} - {clinic.location}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={booking.date}
            onChange={(e) => setBooking({ ...booking, date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
          />
          <input
            type="time"
            value={booking.time}
            onChange={(e) => setBooking({ ...booking, time: e.target.value })}
          />
          <div className="form-actions">
            <button className="btn-secondary" onClick={() => setStep(1)}>
              Back
            </button>
            <button
              className="btn-primary"
              onClick={confirmBooking}
              disabled={!booking.clinic || !booking.date || !booking.time}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
