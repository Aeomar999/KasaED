import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Onboarding
      welcome: {
        title: "Start Your Journey with KasaEd! 🚀",
        subtitle:
          "Your trusted companion for real talk about sexual and reproductive health. Ask questions, get answers, and find support anytime, anywhere — all in your language and privacy guaranteed.",
        getStarted: "Get Started",
      },
      language: {
        title: "Choose Your Language",
        continue: "Continue",
      },
      privacy: {
        title: "Your Privacy Matters",
        point1: "Everything you ask is confidential.",
        point2: "We don't collect your name, email, or phone number.",
        point3: "All conversations are encrypted.",
        point4: "You can delete your chat history anytime.",
        accept: "I understand and accept",
        acceptButton: "Accept",
      },
      age: {
        title: "How Old Are You?",
        subtitle: "This helps us give you the right information for your age.",
        teen: "13-17 (Teen)",
        youngAdult: "18-25 (Young Adult)",
        other: "26+ (Other)",
        continue: "Continue",
      },
      // Main Chat
      chat: {
        greeting: "Hi there! 👋",
        subtitle:
          "Ask me anything about sexual health, mental health, or relationships.",
        noJudgment: "I'm here to help, no judgment!",
        placeholder: "Ask Kasa anything...",
        listening: "Listening...",
        quickReplies: {
          contraception: "Contraception",
          relationships: "Relationships & Consent",
          mentalHealth: "Mental Health",
          stiPrevention: "STI Prevention",
          general: "General SRH",
        },
        newChat: "New Chat",
        today: "Today",
        yesterday: "Yesterday",
        daysAgo: "days ago",
        stopGenerating: "Stop generating",
        findClinics: "Find Nearby Clinics",
        tellMore: "Tell me more",
        noThanks: "No, thanks",
      },
      // Menu & Buttons
      menu: {
        settings: "Settings",
        clearChat: "Clear Chat",
        quickExit: "Quick Exit",
        history: "History",
        newSession: "New Session",
        deleteSelected: "Delete Selected",
        selectMode: "Select Mode",
        cancelSelection: "Cancel",
      },
      // Personality
      personality: {
        friendly: "Friendly",
        professional: "Professional",
        casual: "Casual and fun",
        empathetic: "Empathetic",
      },
      // Timer & Privacy
      timer: {
        title: "Auto-Delete Timer",
        description: "Automatically delete your chat history after:",
        option1Hour: "1 Hour",
        option24Hours: "24 Hours",
        option7Days: "7 Days",
        option30Days: "30 Days",
        option90Days: "90 Days (Recommended)",
        optionOff: "Turn Off",
        active: "Timer active:",
        remaining: "remaining",
        cancel: "Cancel Timer",
        warningTitle: "Privacy Protection Active",
        warningMessage: "Your chat history will automatically be deleted after",
        warningTurnOff: "Turn Off Timer",
        warningKeep: "Keep Timer",
      },
      // Confirmations
      confirmations: {
        clearChat: "Clear all messages in this chat?",
        deleteSession: "Delete chat session(s)?",
        panicExit: "This will close the app and clear all data. Continue?",
      },
      // Errors & Alerts
      alerts: {
        speechNotSupported:
          "Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.",
        micAccessDenied:
          "Microphone access denied. Please allow microphone access.",
        ttsNotSupported: "Text-to-speech not supported in your browser.",
      },
      // Panic Button
      panic: {
        button: "🔴 QUICK EXIT",
      },
      // Emergency
      emergency: {
        title: "🚨 IMMEDIATE SUPPORT AVAILABLE",
        message:
          "I hear you. You're not alone. Please reach out to one of these numbers right now. They are trained to help. You matter. Help is available.",
        callNow: "📞 CALL NOW",
        sendMessage: "💬 MESSAGE",
        continueChat: "Continue Chatting",
        closeApp: "Close App",
      },
      // Footer
      footer: {
        faq: "ℹ️ FAQ",
        emergency: "📞 Emergency Help",
        settings: "⚙️ Settings",
      },
      // Offline
      offline: {
        banner: "📵 You're Offline - Limited Mode",
        faq: "❓ Frequently Asked Questions",
        hotlines: "📞 Emergency Hotlines",
        contraception: "💊 Contraception Guide",
        sti: "⚠️ STI Info",
        mentalHealth: "🧠 Mental Health Tips",
        consent: "💑 Consent & Relationships",
      },
    },
  },
  tw: {
    translation: {
      // Twi translations
      welcome: {
        title: "Fi ase wo Akwantu ho KasaEd! 🚀",
        subtitle:
          "Wo adamfo a wode bo asɛm pa a ɛfa nhonam akwahosan ne awo ho nsɛm ho. Bisa nsɛm, nya mmuae, na nya mmoa bere biara, baabiara — wɔ wo kasa mu na wɔahyɛ wo ho bɔ sɛ wɔbɛkora wo kokoam so.",
        getStarted: "Fi Ase",
      },
      language: {
        title: "Paw Wo Kasa",
        continue: "Kɔ So",
      },
      privacy: {
        title: "Wo Kokoam Ho Hia",
        point1: "Biribiara a wobisa yɛ kokoam.",
        point2: "Yenngye wo din, email, anaa telefon nɔma.",
        point3: "Wɔde encryption ahyɛ nkɔmmɔbɔ nyinaa mu.",
        point4: "Wubetumi ayi wo nkɔmmɔbɔ abakɔsɛm bere biara.",
        accept: "Mete ase na megye tom",
        acceptButton: "Gye Tom",
      },
      age: {
        title: "Wo Nea Woadi Mfe Sen?",
        subtitle: "Eyi boa yɛn ma yɛde nsɛm a ɛfata wo mfe dodow ma wo.",
        teen: "13-17 (Mmeawa)",
        youngAdult: "18-25 (Mmeawa Panyin)",
        other: "26+ (Afoforo)",
        continue: "Kɔ So",
      },
      chat: {
        greeting: "Akwaaba! 👋",
        subtitle:
          "Bisa me biribiara fa nhonam akwahosan, adwene akwahosan, anaa abusuabɔ ho.",
        noJudgment: "Mewɔ ha sɛ meboa, mmubusua biara nni mu!",
        placeholder: "Bisa Kasa biribiara...",
        listening: "Metie...",
        quickReplies: {
          contraception: "Awo ano akwankyerɛ",
          relationships: "Abusuabɔ & Mpene",
          mentalHealth: "Adwene Akwahosan",
          stiPrevention: "STI Ho Bammɔ",
          general: "SRH Nsɛm Ankasa",
        },
        newChat: "Nkɔmmɔbɔ Foforo",
        today: "Nnɛ",
        yesterday: "Nnora",
        daysAgo: "nna a atwam",
        stopGenerating: "Gyae",
        findClinics: "Hwehɛ Ayaresa Benkum",
        tellMore: "Ka biɛkɛ kyerɛ me",
        noThanks: "Daabi, meda ase",
      },
      menu: {
        settings: "Nhyehyɛe",
        clearChat: "Pepa Nkɔmmɔbɔ",
        quickExit: "Fi Ase Ntɛm",
        history: "Abakɔsɛm",
        newSession: "Nkɔmmɔbɔ Foforo",
        deleteSelected: "Yi Nea Woapaw",
        selectMode: "Paw Mode",
        cancelSelection: "Gyae",
      },
      personality: {
        friendly: "Adamfo",
        professional: "Odwumayɛni",
        casual: "Anigyɛ ne fɛɛ",
        empathetic: "Tɛm adwene",
      },
      timer: {
        title: "Auto-Yi Bere",
        description: "Yi wo nkɔmmɔbɔ abakɔsɛm automatik akyi:",
        option1Hour: "Dɔnhwerɛ 1",
        option24Hours: "Dɔnhwerɛ 24",
        option7Days: "Nna 7",
        option30Days: "Nna 30",
        option90Days: "Nna 90 (Wɔkamfo)",
        optionOff: "Dum",
        active: "Bere reyɛ adwuma:",
        remaining: "aka",
        cancel: "Gyae Bere",
        warningTitle: "Kokoam Bammɔ Reyɛ Adwuma",
        warningMessage: "Wɔbɛyi wo nkɔmmɔbɔ abakɔsɛm automatik akyi",
        warningTurnOff: "Dum Bere",
        warningKeep: "Kora Bere",
      },
      confirmations: {
        clearChat: "Pepa nsɛm nyinaa wɔ nkɔmmɔbɔ yi mu?",
        deleteSession: "Yi nkɔmmɔbɔ?",
        panicExit: "Eyi bɛto app no na apepa data nyinaa. Kɔ so?",
      },
      alerts: {
        speechNotSupported:
          "Browser yi nhyɛ speech recognition. Fa Chrome, Edge, anaa Safari di dwuma.",
        micAccessDenied: "Microphone kwan nni hɔ. Fa kwan ma.",
        ttsNotSupported: "Text-to-speech nni wo browser yi mu.",
      },
      panic: {
        button: "🔴 FI ASE NTƐM",
      },
      // Emergency
      emergency: {
        title: "🚨 IMMEDIATE SUPPORT AVAILABLE",
        message:
          "I hear you. You're not alone. Please reach out to one of these numbers right now. They are trained to help. You matter. Help is available.",
        callNow: "📞 CALL NOW",
        sendMessage: "💬 MESSAGE",
        continueChat: "Continue Chatting",
        closeApp: "Close App",
      },
      // Footer
      footer: {
        faq: "ℹ️ Nsɛm a Wɔbisa Taa",
        emergency: "📞 Mmoa Ntɛm",
        settings: "⚙️ Nhyehyɛe",
      },
    },
  },
  ee: {
    translation: {
      // Ewe translations
      welcome: {
        title: "Dze wo Mɔzɔzɔ Gome kple KasaEd! 🚀",
        subtitle:
          "Wò xɔ̃ si ŋu kakaɖeɖe le na nyateƒenyawo tso ŋutilã kple dzidzime kple lãmesese ŋuti. Bia nyabiasewo, xɔ ŋuɖoɖowo, eye nàkpɔ kpekpeɖeŋu ɣesiaɣi, afiɣisiɣi — le wò gbe me eye woɖo ŋugbe be woagblɔ wò nya ɣaɣla.",
        getStarted: "Dze Egome",
      },
      language: {
        title: "Tia Wò Gbe",
        continue: "Yi Edzi",
      },
      privacy: {
        title: "Wò Ɣaɣlaɖoɖo Le Vevie",
        point1: "Nu sia nu si nèbia la nye ɣaɣla.",
        point2: "Míexɔa wò ŋkɔ, email, alo telefon nɔmba o.",
        point3: "Woŋlɔ nyamedzodzro ɖe dzeɖoɖo ɖesiaɖe.",
        point4: "Àteŋu atutu wò nyamedzodzro ŋutinya ɣesiaɣi.",
        accept: "Mese egɔme eye mexɔe",
        acceptButton: "Lɔ̃",
      },
      age: {
        title: "Ƒe Nenie Nèxɔ?",
        subtitle:
          "Esia kpena ɖe mía ŋu be míana nyatakaka nyuitɔ si sɔ kple wò ƒe.",
        teen: "13-17 (Ɖekakpui)",
        youngAdult: "18-25 (Sɔhɛ Ɖekakpui)",
        other: "26+ (Bubuwo)",
        continue: "Yi Edzi",
      },
      chat: {
        greeting: "Miawoe! 👋",
        subtitle:
          "Bia m nu ɖesiaɖe tso lãmesese, susu lãmesese, alo kadodo ŋuti.",
        noJudgment: "Mele afisia be makpe ɖe ŋuwò, ʋɔnudɔdrɔ̃ aɖeke mele eme o!",
        placeholder: "Ŋlɔ wò nyabiase ɖe afisia...",
        listening: "Mele seɖome...",
        quickReplies: {
          contraception: "Dzidzime Dzixɔxɔ",
          relationships: "Kadodo & Lɔlɔ̃nu",
          mentalHealth: "Susu Lãmesese",
          stiPrevention: "STI Dzɔdzɔme",
          general: "SRH Nyawo Katã",
        },
        newChat: "Dzeɖoɖo Yeye",
        today: "Egbe",
        yesterday: "Etsɔ",
        daysAgo: "ŋkeke siwo va yi",
        stopGenerating: "Dzudzɔ",
        findClinics: "Di Klinikiwo",
        tellMore: "Gblɔ nam ɖe edzi",
        noThanks: "Ao, akpe",
      },
      menu: {
        settings: "Ðoɖowɔɖiwo",
        clearChat: "Tutu Dzeɖoɖo",
        quickExit: "Do Go Kabakaba",
        history: "Ŋutinya",
        newSession: "Dzeɖoɖo Yeye",
        deleteSelected: "Tutu Esiwo Netia",
        selectMode: "Tiatia Nɔnɔme",
        cancelSelection: "Dzudzɔ",
      },
      personality: {
        friendly: "Hã",
        professional: "Dɔwɔla",
        casual: "Dzidzɔ kple fefeme",
        empathetic: "Metɔmetɔ",
      },
      timer: {
        title: "Auto-Tutu Gaƒoƒo",
        description: "Tutu wò dzeɖoɖo ŋutinya le eɖokui si emegbe:",
        option1Hour: "Gaƒoƒo 1",
        option24Hours: "Gaƒoƒo 24",
        option7Days: "Ŋkeke 7",
        option30Days: "Ŋkeke 30",
        option90Days: "Ŋkeke 90 (Woɖo eƒo)",
        optionOff: "Tu",
        active: "Gaƒoƒo le dɔ wɔm:",
        remaining: "susɔ",
        cancel: "Dzudzɔ Gaƒoƒo",
        warningTitle: "Ɣaɣlaɖoɖo Nyanyra Le Dɔ Wɔm",
        warningMessage: "Woatutu wò dzeɖoɖo ŋutinya le eɖokui si emegbe",
        warningTurnOff: "Tu Gaƒoƒo",
        warningKeep: "Lé Gaƒoƒo ɖe asi",
      },
      confirmations: {
        clearChat: "Tutu nyagbɔgblɔ siwo katã le dzeɖoɖo sia me?",
        deleteSession: "Tutu dzeɖoɖo?",
        panicExit: "Esia atu app la eye wòatutu nyatakaka siwo katã. Yi edzi?",
      },
      alerts: {
        speechNotSupported:
          "Browser sia medoa alɔ nuƒoƒo dede o. Zã Chrome, Edge, alo Safari.",
        micAccessDenied: "Wogbe microphone mɔ. Na mɔnukpɔkpɔ.",
        ttsNotSupported: "Nuŋɔŋlɔ-yi-nuƒoƒo mele wò browser me o.",
      },
      panic: {
        button: "🔴 DO GO KABAKABA",
      },
      // Emergency
      emergency: {
        title: "🚨 IMMEDIATE SUPPORT AVAILABLE",
        message:
          "I hear you. You're not alone. Please reach out to one of these numbers right now. They are trained to help. You matter. Help is available.",
        callNow: "📞 CALL NOW",
        sendMessage: "💬 MESSAGE",
        continueChat: "Continue Chatting",
        closeApp: "Close App",
      },
      // Footer
      footer: {
        faq: "ℹ️ Nyabiase Siwo Wobiana",
        emergency: "📞 Kpekpeɖeŋu Kabakaba",
        settings: "⚙️ Ðoɖowɔɖiwo",
      },
    },
  },
  ha: {
    translation: {
      // Hausa translations
      welcome: {
        title: "Fara Tafiyarka tare da KasaEd! 🚀",
        subtitle:
          "Abokin ku na aminci don tattaunawa na gaskiya game da lafiyar jima'i da haihuwa. Yi tambayoyi, sami amsoshi, kuma nemo taimako a kowane lokaci, a ko'ina — duk a cikin harshenku kuma an tabbatar da sirrin ku.",
        getStarted: "Fara",
      },
      language: {
        title: "Zaɓi Harshenka",
        continue: "Ci Gaba",
      },
      privacy: {
        title: "Sirrinku Yana da Mahimmanci",
        point1: "Duk abin da ka tambaya yana da sirri.",
        point2: "Ba ma karɓar sunanka, imel, ko lambar waya ba.",
        point3: "An ɓoye duk tattaunawa.",
        point4: "Kuna iya share tarihin tattaunawar ku a kowane lokaci.",
        accept: "Na fahimta kuma na yarda",
        acceptButton: "Yarda",
      },
      age: {
        title: "Shekara Nawa Kake/Kike?",
        subtitle:
          "Wannan yana taimaka mana mu ba ku daidai bayani don shekarunka.",
        teen: "13-17 (Matashi)",
        youngAdult: "18-25 (Matasa Manya)",
        other: "26+ (Wasu)",
        continue: "Ci Gaba",
      },
      chat: {
        greeting: "Sannu! 👋",
        subtitle:
          "Tambaye ni komai game da lafiyar jima'i, lafiyar hankali, ko dangantaka.",
        noJudgment: "Ina nan don taimako, babu hukunci!",
        placeholder: "Tambaye Kasa komai...",
        listening: "Ina saurare...",
        quickReplies: {
          contraception: "Kare Ciki",
          relationships: "Dangantaka & Yarda",
          mentalHealth: "Lafiyar Hankali",
          stiPrevention: "Kariyar STI",
          general: "SRH na Gaba Daya",
        },
        newChat: "Sabon Tattaunawa",
        today: "Yau",
        yesterday: "Jiya",
        daysAgo: "kwanaki da suka wuce",
        stopGenerating: "Dakatar",
        findClinics: "Nemo Asibitoci Kusa",
        tellMore: "Fada mini kari",
        noThanks: "A'a, na gode",
      },
      menu: {
        settings: "Saitunan",
        clearChat: "Share Tattaunawa",
        quickExit: "Fita Da Sauri",
        history: "Tarihi",
        newSession: "Sabon Tattaunawa",
        deleteSelected: "Share Waɗanda Aka Zaɓa",
        selectMode: "Zaɓin Mode",
        cancelSelection: "Soke",
      },
      personality: {
        friendly: "Aboki",
        professional: "Kwararren Ma'aikaci",
        casual: "Farin ciki da nishadi",
        empathetic: "Mai jin daɗi",
      },
      timer: {
        title: "Auto-Share Lokaci",
        description: "Share tarihin tattaunawar ku ta atomatik bayan:",
        option1Hour: "Awa 1",
        option24Hours: "Awa 24",
        option7Days: "Kwana 7",
        option30Days: "Kwana 30",
        option90Days: "Kwana 90 (Ana ba da shawarar)",
        optionOff: "Kashe",
        active: "Lokaci yana aiki:",
        remaining: "ya rage",
        cancel: "Soke Lokaci",
        warningTitle: "Kariyar Sirri Yana Aiki",
        warningMessage: "Za a share tarihin tattaunawar ku ta atomatik bayan",
        warningTurnOff: "Kashe Lokaci",
        warningKeep: "Ci gaba da Lokaci",
      },
      confirmations: {
        clearChat: "Share duk saƙonni a wannan tattaunawa?",
        deleteSession: "Share tattaunawa?",
        panicExit:
          "Wannan zai rufe app ɗin kuma ya share duk bayanai. Ci gaba?",
      },
      alerts: {
        speechNotSupported:
          "Wannan browser ba ya goyan bayan gane magana. Da fatan za a yi amfani da Chrome, Edge, ko Safari.",
        micAccessDenied: "An hana shiga microphone. Da fatan za a ba da izini.",
        ttsNotSupported: "Rubutu-zuwa-magana ba ya goyan bayan wannan browser.",
      },
      panic: {
        button: "🔴 FITA DA SAURI",
      },
      // Emergency
      emergency: {
        title: "🚨 IMMEDIATE SUPPORT AVAILABLE",
        message:
          "I hear you. You're not alone. Please reach out to one of these numbers right now. They are trained to help. You matter. Help is available.",
        callNow: "📞 CALL NOW",
        sendMessage: "💬 MESSAGE",
        continueChat: "Continue Chatting",
        closeApp: "Close App",
      },
      // Footer
      footer: {
        faq: "ℹ️ Tambayoyin Akai-akai",
        emergency: "📞 Taimako Gaggawa",
        settings: "⚙️ Saitunan",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("userLanguage") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Function to change and persist language
export const changeLanguage = (languageCode) => {
  localStorage.setItem("userLanguage", languageCode);
  i18n.changeLanguage(languageCode);
};

export default i18n;
