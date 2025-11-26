import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/outfit'; // Import Outfit font

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="app-background"></div>
    <App />
  </React.StrictMode>
);
