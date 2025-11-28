# Anonymous User Identification in KasaEd

This document explains the approaches implemented for anonymous user identification in the KasaEd application, ensuring user privacy while enabling useful features.

## Overview

KasaEd implements three complementary approaches for anonymous user identification:

1. **Device Fingerprinting**
2. **Cryptographic User Identifiers**
3. **Rotating Pseudonymous Identifiers**

These approaches work together to provide consistent user experiences while maintaining strong privacy protections.

## Implementation Details

### 1. Device Fingerprinting

Device fingerprinting creates a stable identifier based on non-personal device characteristics:

**Web App Implementation:**

- File: `kasaed-app/src/utils/fingerprint.js`
- Collects: User agent, language, platform, screen resolution, timezone, cookie support, touch support, hardware concurrency, device memory
- Generates: SHA-256 hash of device characteristics

**Mobile App Implementation:**

- File: `kasaed-mobile/src/utils/fingerprint.js`
- Collects: Platform, timezone, and other non-personal device information
- Generates: SHA-256 hash of device characteristics

### 2. Cryptographic User Identifiers

Cryptographic identifiers use public-key cryptography for user identification:

**Implementation:**

- File: `kasaed-app/src/utils/fingerprint.js` and `kasaed-mobile/src/utils/fingerprint.js`
- Generates: Public-private key pair using CryptoJS
- Uses: Public key hash as user identifier
- Benefits: User-controlled identity, prevents cross-site tracking

### 3. Rotating Pseudonymous Identifiers

Rotating identifiers change periodically to limit tracking:

**Implementation:**

- File: `kasaed-app/src/utils/fingerprint.js` and `kasaed-mobile/src/utils/fingerprint.js`
- Generates: Daily rotating identifier based on base identifier and timestamp
- Benefits: Limits long-term tracking while maintaining short-term consistency

## Integration Points

### Session Management

The session management system in both apps now incorporates all three identification approaches:

**Web App:**

- File: `kasaed-app/src/utils/encryption.js`
- Functions: `createSession()`, `getSession()`, `getUserIdentifiers()`, `resetUserIdentity()`

**Mobile App:**

- File: `kasaed-mobile/src/utils/encryption.js`
- Functions: `createSession()`, `getUserIdentifiers()`, `resetUserIdentity()`

### User Interface

Identity management features are accessible through the user interface:

**Web App:**

- Component: `IdentityManager` in `kasaed-app/src/components/AdditionalFeatures.jsx`
- Access: Through the main menu under "Identity Management"

**Mobile App:**

- Screen: Identity management option in the main menu
- Component: Modal interface in `kasaed-mobile/src/screens/ChatScreen.js`

## Privacy Considerations

1. **No Personal Data Collection**: All identifiers are generated from non-personal device characteristics
2. **Local Storage**: Identifiers are stored locally and never transmitted to servers
3. **User Control**: Users can reset their identity at any time
4. **Transparency**: Users can view their anonymous identifiers
5. **Rotation**: Identifiers rotate periodically to limit tracking

## Benefits

1. **Consistent Experience**: Recognize returning users for personalization
2. **Privacy Protection**: No personal information is collected or stored
3. **User Control**: Users can reset their identity whenever they want
4. **Compliance**: Meets privacy regulations and best practices
5. **Analytics**: Enable usage analytics without compromising anonymity

## Usage Examples

### Getting User Identifiers

```javascript
// Web app
import { getUserIdentifiers } from "../utils/encryption";

const identifiers = getUserIdentifiers();
console.log("Session ID:", identifiers.sessionId);
console.log("Device Fingerprint:", identifiers.deviceFingerprint);
console.log("User Identifier:", identifiers.userIdentifier);
console.log("Rotating ID:", identifiers.rotatingIdentifier);
```

### Resetting User Identity

```javascript
// Web app
import { resetUserIdentity } from "../utils/encryption";

resetUserIdentity(); // Clears all identifiers and creates new ones
```

## Future Improvements

1. **Enhanced Fingerprinting**: Use more sophisticated device characteristics
2. **Web Crypto API**: Implement proper cryptographic key generation
3. **Cross-Device Sync**: Enable identity synchronization across devices with user consent
4. **Advanced Rotation**: Implement more sophisticated rotation algorithms
5. **Privacy Auditing**: Add tools for users to audit their identity data

## Conclusion

The implemented anonymous user identification approaches provide a strong foundation for maintaining user privacy while enabling personalized experiences. These approaches ensure that KasaEd can offer useful features without compromising the anonymity that is central to its mission.
