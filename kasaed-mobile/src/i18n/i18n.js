import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const resources = {
  en: {
    translation: {
      appName: "KasaEd",
      welcome: "Welcome to KasaEd",
      selectLanguage: "Select Your Language",
      privacyTitle: "Your Privacy Matters",
      privacyText:
        "Your conversations are private and encrypted. We never share your data.",
      agreePrivacy: "I Understand",
      selectAge: "Select Your Age Group",
      age13_17: "13-17 years",
      age18_25: "18-25 years",
      getStarted: "Get Started",
      chatPlaceholder: "Type your message...",
      send: "Send",
      quickReplies: "Quick Replies",
      menu: "Menu",
      panicButton: "Quick Exit",
      // Chat responses
      greeting:
        "Hello! I'm KasaEd, your trusted companion for sexual and reproductive health information. How can I help you today?",
      // Menu options
      contraception: "💊 Contraception Info",
      sti: "🦠 STI Information",
      pregnancy: "🤰 Pregnancy Info",
      menstruation: "🩸 Menstruation",
      consent: "✋ Consent & Boundaries",
      relationships: "❤️ Healthy Relationships",
      bodyChanges: "🧬 Body Changes",
      mentalHealth: "🧠 Mental Health",
      emergencyContacts: "🆘 Emergency Contacts",
      findClinic: "🏥 Find Health Clinic",
      faq: "❓ FAQ",
      settings: "⚙️ Settings",
      periodTracker: "📅 Period Tracker",
      stiCalculator: "📊 STI Risk Calculator",
      relationshipChecker: "💕 Relationship Health",
      medicationChecker: "💊 Medication Checker",
      voiceDiary: "🎤 Voice Diary",
      clinicFinder: "📍 Clinic Finder",
      emergencySOS: "🚨 Emergency SOS",
      interactiveScenarios: "🎮 Interactive Scenarios",
      learningPaths: "🎓 Learning Paths",
      nutritionWellness: "🥗 Nutrition & Wellness",
      telemedicine: "📞 Telemedicine",
      culturalSettings: "🌍 Cultural Settings",
      voiceChat: "🎙️ Voice Chat",
    },
  },
  tw: {
    translation: {
      appName: "KasaEd",
      welcome: "Akwaaba kɔ KasaEd",
      selectLanguage: "Yi Wo Kasa",
      privacyTitle: "Wo Privacy Ho Hia",
      privacyText:
        "Wo nkɔmmɔbɔ yɛ kokoam na wɔahyɛ mu den. Yɛmfa wo nsɛm mma obi.",
      agreePrivacy: "Mate Aseɛ",
      selectAge: "Yi Wo Mfeɛ Kuw",
      age13_17: "Mfeɛ 13-17",
      age18_25: "Mfeɛ 18-25",
      getStarted: "Fi Aseɛ",
      chatPlaceholder: "Kyerɛw wo nkra...",
      send: "Soma",
      quickReplies: "Mmuae Ntɛm",
      menu: "Menu",
      panicButton: "Pue Ntɛm",
      greeting:
        "Akwaaba! Me ne KasaEd, wo nnamfo a wotumi de wo ho to so wɔ nhoboa ne awo ho nsɛm ho. Mɛbɛboa wo dɛn ɛnnɛ?",
      contraception: "💊 Contraception Ho Nsɛm",
      sti: "🦠 STI Ho Nsɛm",
      pregnancy: "🤰 Nyinsɛn Ho Nsɛm",
      menstruation: "🩸 Ɔsram Nsuo",
      consent: "✋ Mpene Ne Ahyeɛ",
      relationships: "❤️ Abusuabɔ Pa",
      bodyChanges: "🧬 Nipadua Nsakraeɛ",
      mentalHealth: "🧠 Adwene Akwahosan",
      emergencyContacts: "🆘 Ntɛm Frɛ Nɔma",
      findClinic: "🏥 Hwehwɛ Ayaresabea",
      faq: "❓ Nsɛm a Wɔbisa Taa",
      settings: "⚙️ Nhyehyɛeɛ",
    },
  },
  ee: {
    translation: {
      appName: "KasaEd",
      welcome: "Woezo na KasaEd",
      selectLanguage: "Tia Wò Gbe",
      privacyTitle: "Wò Ɣaɣla Ðe Vevie",
      privacyText:
        "Wò nyawo wo nye ɣaɣla eye wole dedie me. Míemaa ame aɖeke wò nyawo o.",
      agreePrivacy: "Mese Egɔme",
      selectAge: "Tia Wò Ƒe Xɔxɔ Hame",
      age13_17: "Ƒe 13-17",
      age18_25: "Ƒe 18-25",
      getStarted: "Dze Egɔme",
      chatPlaceholder: "Ŋlɔ wò gbedeasi...",
      send: "Ɖo",
      quickReplies: "Ŋuɖoɖo Kaba",
      menu: "Menu",
      panicButton: "Do Go Kaba",
      greeting:
        "Woezo! Nyee nye KasaEd, xɔ̃wò si dzi wòate ŋu aka ɖo le ahãsi kple dzidzime ŋuti nyatakakawo ŋuti. Aleke mate ŋu akpe ɖe ŋuwò egbe?",
    },
  },
  ha: {
    translation: {
      appName: "KasaEd",
      welcome: "Barka da zuwa KasaEd",
      selectLanguage: "Zaɓi Harshenka",
      privacyTitle: "Sirrinku Yana da Muhimmanci",
      privacyText:
        "Tattaunawarku tana cikin sirri kuma an ɓoye ta. Ba ma raba bayananku da kowa.",
      agreePrivacy: "Na Fahimta",
      selectAge: "Zaɓi Shekarunka",
      age13_17: "Shekaru 13-17",
      age18_25: "Shekaru 18-25",
      getStarted: "Fara",
      chatPlaceholder: "Rubuta sakonka...",
      send: "Aika",
      quickReplies: "Amsoshi Mai Sauri",
      menu: "Menu",
      panicButton: "Fita Da Sauri",
      greeting:
        "Barka! Ni ne KasaEd, abokinku na aminci don bayanan lafiyar jima'i da haihuwa. Ta yaya zan iya taimaka muku yau?",
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export const saveLanguage = async (language) => {
  try {
    await AsyncStorage.setItem("userLanguage", language);
    i18n.changeLanguage(language);
  } catch (error) {
    console.error("Error saving language:", error);
  }
};

export const loadLanguage = async () => {
  try {
    const language = await AsyncStorage.getItem("userLanguage");
    if (language) {
      i18n.changeLanguage(language);
    }
  } catch (error) {
    console.error("Error loading language:", error);
  }
};

export default i18n;
