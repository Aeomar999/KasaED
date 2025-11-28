import React from 'react';
import { useApp } from '../contexts/AppContext';

const IdentityManagement = () => {
  const { resetIdentity, session } = useApp();

  const handleResetIdentity = () => {
    if (window.confirm("Are you sure you want to reset your identity? This will clear all your data and give you a new anonymous identity.")) {
      resetIdentity();
    }
  };

  return (
    <div className="identity-management">
      <h3>Identity Management</h3>
      <p>You are currently using an anonymous session. Your identity is protected and no personal information is collected.</p>
      
      <div className="identity-info">
        <h4>Your Anonymous Identifiers:</h4>
        <ul>
          <li><strong>Session ID:</strong> {session?.sessionId?.substring(0, 8)}...</li>
          <li><strong>Device Fingerprint:</strong> {session?.deviceFingerprint?.substring(0, 8)}...</li>
          <li><strong>User Identifier:</strong> {session?.userIdentifier?.substring(0, 8)}...</li>
          <li><strong>Rotating ID:</strong> {session?.rotatingIdentifier?.substring(0, 8)}...</li>
        </ul>
      </div>
      
      <button 
        onClick={handleResetIdentity}
        className="reset-identity-btn"
        aria-label="Reset your anonymous identity"
      >
        Reset My Identity
      </button>
      
      <div className="privacy-note">
        <h4>Privacy Note:</h4>
        <p>
          KasaEd maintains your anonymity by using cryptographic identifiers that do not contain 
          any personal information. You can reset your identity at any time to start fresh.
        </p>
      </div>
    </div>
  );
};

export default IdentityManagement;