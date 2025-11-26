import React, { useState } from 'react';
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

// Feature 22: Community Forum (Simplified)
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

  return (
    <div className="community-forum">
      <div className="forum-header">
        <h2>Community Q&A</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="forum-notice">
        <p>🔒 All posts are anonymous. Share your questions safely!</p>
      </div>

      {!showNewPost && (
        <button className="btn-primary" onClick={() => setShowNewPost(true)}>
          + Ask a Question
        </button>
      )}

      {showNewPost && (
        <div className="new-post-form">
          <input
            type="text"
            placeholder="What's your question?"
            value={newPost.title}
            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
          />
          <select
            value={newPost.category}
            onChange={(e) => setNewPost({...newPost, category: e.target.value})}
          >
            <option value="General">General</option>
            <option value="Contraception">Contraception</option>
            <option value="STI">STI Prevention</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Relationships">Relationships</option>
          </select>
          <div className="form-actions">
            <button className="btn-primary" onClick={addPost} disabled={!newPost.title}>
              Post Question
            </button>
            <button className="btn-secondary" onClick={() => setShowNewPost(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="forum-posts">
        {posts.map(post => (
          <div key={post.id} className="forum-post">
            <div className="post-category">{post.category}</div>
            <h4>{post.title}</h4>
            <div className="post-meta">
              <span>💬 {post.replies} replies</span>
              <span>👍 {post.helpful} helpful</span>
              <span>{new Date(post.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
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
                onClick={() => setBooking({...booking, service})}
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
            onChange={(e) => setBooking({...booking, clinic: e.target.value})}
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
            onChange={(e) => setBooking({...booking, date: e.target.value})}
            min={new Date().toISOString().split('T')[0]}
          />
          <input
            type="time"
            value={booking.time}
            onChange={(e) => setBooking({...booking, time: e.target.value})}
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
