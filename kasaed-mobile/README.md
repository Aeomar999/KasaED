# KasaEd Mobile - Sexual & Reproductive Health Chatbot

A comprehensive React Native mobile application built with Expo, providing sexual and reproductive health information for Ghanaian youth aged 13-25.

## Features

### Core Features

- ✅ Multi-language support (English, Twi, Ewe, Hausa)
- ✅ End-to-end encrypted conversations
- ✅ Medically-validated SRH content
- ✅ Crisis detection and emergency referral
- ✅ Quick exit/panic button
- ✅ Text-to-speech accessibility
- ✅ Offline functionality

### Advanced Health Features

- 📅 Period Tracker with ovulation prediction
- 📊 STI Risk Calculator
- 💕 Relationship Health Checker
- 💊 Medication Interaction Checker
- 🎤 Voice Diary

### Location-Based Features

- 📍 Clinic Finder with GPS integration
- 🚨 Emergency SOS with one-tap calling
- 🏥 Health facility database

### Interactive Learning

- 🎮 Interactive health scenarios
- 🎓 Gamified learning paths with points/levels
- 🥗 Nutrition & wellness guidance
- 📞 Telemedicine booking
- 🌍 Cultural sensitivity settings

### Communication Features

- 🎙️ Voice chat with speech recognition
- 💬 Real-time chat with AI responses
- 🔊 Text-to-speech for all messages
- 📱 Quick reply buttons

## Installation

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Setup

1. **Navigate to project directory**

```bash
cd kasaed-mobile
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm start
```

4. **Run on platform**

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
kasaed-mobile/
├── App.js                      # Root component
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── src/
│   ├── components/
│   │   └── shared/             # Reusable UI components
│   │       ├── Button.js
│   │       ├── Card.js
│   │       ├── Input.js
│   │       └── Badge.js
│   ├── screens/
│   │   ├── OnboardingScreen.js # Language/age selection
│   │   └── ChatScreen.js       # Main chat interface
│   ├── theme/
│   │   └── theme.js            # Design system tokens
│   ├── i18n/
│   │   └── i18n.js             # Internationalization config
│   └── utils/
│       ├── chatbotLogic.js     # AI response generation
│       ├── encryption.js       # AES-256 encryption
│       └── storage.js          # AsyncStorage manager
```

## Technologies Used

- **React Native 0.74.3** - Cross-platform mobile framework
- **Expo 51.0** - Development platform
- **i18next** - Internationalization
- **Expo Speech** - Text-to-speech
- **AsyncStorage** - Local data persistence
- **CryptoJS** - Message encryption
- **React Native Gesture Handler** - Touch interactions
- **React Native Safe Area Context** - Safe area handling

## Platform Support

- ✅ iOS 13.0+
- ✅ Android 5.0+ (API 21+)
- ✅ Web browsers (via Expo)

## Privacy & Security

- All conversations encrypted with AES-256
- No data sent to external servers
- Local storage only
- Optional auto-delete
- Anonymous usage

## Health Content Sources

All health information is based on:

- Ghana Health Service guidelines
- WHO sexual and reproductive health standards
- Planned Parenthood Association of Ghana resources
- Marie Stopes Ghana educational materials

## Emergency Contacts (Ghana)

- **National Emergency**: 112
- **Police**: 191
- **Ambulance**: 193
- **DOVSU**: 0800 900 900
- **Domestic Violence Hotline**: 055 378 3794

## Development

### Adding New Features

1. Create component in `src/components/`
2. Add translations to `src/i18n/i18n.js`
3. Import and integrate in `ChatScreen.js`
4. Update storage utils if needed

### Testing

```bash
# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web
```

## License

MIT License - Built for educational and health promotion purposes.

## Acknowledgments

- Ghana Health Service
- Planned Parenthood Association of Ghana
- Marie Stopes Ghana
- Youth health advocates across Ghana

---

**Note**: This app is for educational purposes. Always consult healthcare professionals for medical advice.
