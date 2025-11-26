import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Onboarding from './components/Onboarding';
import Chat from './components/Chat';
import './i18n';
import './App.css';
import './components/SharedStyles.css';

function AppContent() {
  const { onboardingComplete } = useApp();

  return (
    <div className="app" role="application" aria-label="KasaEd - Sexual and Reproductive Health Chatbot">
      <main id="main-content">
        {!onboardingComplete ? <Onboarding /> : <Chat />}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
