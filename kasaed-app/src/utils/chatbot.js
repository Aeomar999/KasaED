import { srhContent, crisisKeywords } from "../data/srhContent";

// Get personality-specific response modifier
const applyPersonality = (text, personality = null) => {
  const botPersonality =
    personality || localStorage.getItem("botPersonality") || "friendly";

  const modifiers = {
    friendly: {
      prefix: ["😊 ", "💙 ", "✨ ", ""],
      suffix: [
        " Hope this helps! 😊",
        " Let me know if you have more questions! 💙",
        " Feel free to ask anything else! ✨",
        "",
      ],
      emojis: true,
    },
    professional: {
      prefix: [""],
      suffix: [
        " Please consult a healthcare provider for personalized advice.",
        " For more information, consult with a medical professional.",
        "",
      ],
      emojis: false,
    },
    casual: {
      prefix: ["Hey! ", "So, ", "Alright, so ", ""],
      suffix: [
        " 😎",
        " Hope that makes sense! 👍",
        " Let me know if you need more info! 💯",
        " Feel free to hit me up with more questions! 🎉",
      ],
      emojis: true,
    },
    empathetic: {
      prefix: [
        "I hear you. ",
        "I understand this is important to you. ",
        "Thank you for sharing. ",
        "",
      ],
      suffix: [
        " You're not alone in this. 🤗",
        " I'm here to support you. 💕",
        " Take care of yourself. 💙",
        " Remember, your feelings are valid. 💜",
      ],
      emojis: true,
    },
  };

  const modifier = modifiers[botPersonality] || modifiers.friendly;

  // Randomly select prefix and suffix for variety
  const prefix =
    modifier.prefix[Math.floor(Math.random() * modifier.prefix.length)];
  const suffix =
    modifier.suffix[Math.floor(Math.random() * modifier.suffix.length)];

  return `${prefix}${text}${suffix}`.trim();
};

// Crisis detection function
export const detectCrisis = (message) => {
  const lowerMessage = message.toLowerCase();

  // Check Tier 1 (immediate action)
  for (const keyword of crisisKeywords.tier1) {
    if (lowerMessage.includes(keyword)) {
      return { isCrisis: true, severity: "high", keyword };
    }
  }

  // Check Tier 2 (check-in)
  for (const keyword of crisisKeywords.tier2) {
    if (lowerMessage.includes(keyword)) {
      return { isCrisis: true, severity: "medium", keyword };
    }
  }

  return { isCrisis: false, severity: "none" };
};

// Detect if user needs professional help (facility recommendation)
export const detectNeedForHelp = (message) => {
  const lowerMessage = message.toLowerCase();

  // Keywords indicating need for professional help
  const helpKeywords = [
    "need help",
    "get help",
    "see doctor",
    "clinic",
    "hospital",
    "get tested",
    "test for",
    "where can i",
    "where do i go",
    "need treatment",
    "get treatment",
    "medical help",
    "health center",
    "health facility",
    "therapist",
    "counselor",
    "professional help",
    "talk to someone",
    "need support",
    "emergency",
    "urgent",
    "serious problem",
    "physical pain",
    "hurt myself",
    "hurting",
    "abused",
    "assaulted",
    "raped",
    "violent",
    "danger",
    "unsafe",
  ];

  // Mental health specific - ENHANCED
  const mentalHealthHelp = [
    "depressed",
    "depression",
    "suicidal",
    "suicide",
    "self harm",
    "self-harm",
    "cutting",
    "want to die",
    "end it all",
    "cant cope",
    "can't cope",
    "breakdown",
    "mental breakdown",
    "panic attack",
    "severe anxiety",
    "anxiety",
    "anxious",
    "overwhelming",
    "overwhelmed",
    "hopeless",
    "helpless",
    "worthless",
    "no point",
    "give up",
    "can't go on",
    "ending my life",
    "kill myself",
    "thoughts of death",
    "thoughts of dying",
    "mental health crisis",
    "emotional crisis",
    "feeling suicidal",
    "mental illness",
    "psychiatric help",
    "psychological help",
    "counseling",
    "therapy",
  ];

  // Physical health specific
  const physicalHealthHelp = [
    "symptoms",
    "pain",
    "bleeding",
    "discharge",
    "rash",
    "pregnant",
    "pregnancy test",
    "missed period",
    "std symptoms",
    "sti symptoms",
    "burning",
    "itching",
  ];

  const allKeywords = [
    ...helpKeywords,
    ...mentalHealthHelp,
    ...physicalHealthHelp,
  ];

  for (const keyword of allKeywords) {
    if (lowerMessage.includes(keyword)) {
      // Determine category
      let category = "general";
      if (mentalHealthHelp.some((k) => lowerMessage.includes(k))) {
        category = "mentalHealth";
      } else if (physicalHealthHelp.some((k) => lowerMessage.includes(k))) {
        category = "physical";
      }

      return { needsHelp: true, category, keyword };
    }
  }

  return { needsHelp: false, category: "none" };
};

// Simple NLP intent detection (keyword-based)
export const detectIntent = (message) => {
  const lowerMessage = message.toLowerCase();

  // Contraception keywords
  const contraceptionKeywords = [
    "contraception",
    "birth control",
    "condom",
    "pill",
    "implant",
    "iud",
    "prevent pregnancy",
    "family planning",
    "emergency pill",
    "morning after",
  ];

  // STI keywords
  const stiKeywords = [
    "sti",
    "std",
    "hiv",
    "aids",
    "sexually transmitted",
    "infection",
    "test",
    "symptoms",
    "discharge",
    "sore",
  ];

  // Mental health keywords
  const mentalHealthKeywords = [
    "mental health",
    "depression",
    "anxiety",
    "stress",
    "sad",
    "worried",
    "panic",
    "overwhelmed",
    "therapy",
    "counseling",
  ];

  // Consent/relationship keywords
  const consentKeywords = [
    "consent",
    "relationship",
    "abuse",
    "violence",
    "respect",
    "boundaries",
    "pressure",
    "force",
  ];

  // Pregnancy keywords
  const pregnancyKeywords = [
    "pregnant",
    "pregnancy",
    "prenatal",
    "antenatal",
    "baby",
    "expecting",
    "trimester",
  ];

  // Check each category
  if (contraceptionKeywords.some((kw) => lowerMessage.includes(kw))) {
    return "contraception";
  }
  if (stiKeywords.some((kw) => lowerMessage.includes(kw))) {
    return "sti";
  }
  if (mentalHealthKeywords.some((kw) => lowerMessage.includes(kw))) {
    return "mentalHealth";
  }
  if (consentKeywords.some((kw) => lowerMessage.includes(kw))) {
    return "consent";
  }
  if (pregnancyKeywords.some((kw) => lowerMessage.includes(kw))) {
    return "pregnancy";
  }

  return "general";
};

// Get relevant content based on intent and age group
export const getRelevantContent = (intent, ageGroup, specificQuery = "") => {
  const category = srhContent[intent];

  if (!category) {
    return {
      response:
        "I'm here to help with questions about sexual and reproductive health, mental health, and relationships. Could you please ask your question in a different way?",
      suggestions: [
        "Contraception",
        "STI Prevention",
        "Mental Health",
        "Relationships & Consent",
      ],
    };
  }

  // Find most relevant topic
  let relevantTopic = null;
  const lowerQuery = specificQuery.toLowerCase();

  for (const topic of category.topics) {
    // Check if keywords match
    if (topic.keywords.some((kw) => lowerQuery.includes(kw))) {
      relevantTopic = topic;
      break;
    }
  }

  // If no specific match, return first topic in category
  if (!relevantTopic && category.topics.length > 0) {
    relevantTopic = category.topics[0];
  }

  if (!relevantTopic) {
    return {
      response:
        "I found some information, but I need more details to give you the best answer. What specifically would you like to know?",
      suggestions: ["Tell me more", "Ask another question"],
    };
  }

  // Get age-appropriate content
  const content =
    relevantTopic.content[ageGroup] || relevantTopic.content["18-25"];

  // Apply personality to the response
  const personalizedContent = applyPersonality(content);

  return {
    response: personalizedContent,
    title: relevantTopic.title,
    sources: relevantTopic.sources || [],
    relatedTopics: category.topics
      .filter((t) => t.id !== relevantTopic.id)
      .slice(0, 3)
      .map((t) => t.title),
  };
};

// Generate chatbot response
export const generateChatbotResponse = (userMessage, userProfile) => {
  const { ageGroup = "18-25", language = "en" } = userProfile;
  const personality = localStorage.getItem("botPersonality") || "friendly";

  // First, check for crisis
  const crisisCheck = detectCrisis(userMessage);
  if (crisisCheck.isCrisis) {
    return {
      type: "crisis",
      severity: crisisCheck.severity,
      message:
        "I'm really concerned about what you're going through. You don't have to face this alone. Please reach out to someone who can help right away.",
      showEmergencyHotlines: true,
    };
  }

  // Check if user needs professional help/facility
  const helpCheck = detectNeedForHelp(userMessage);
  if (helpCheck.needsHelp) {
    const facilityRecommendation = {
      mentalHealth:
        "Based on what you're experiencing, I strongly recommend speaking with a mental health professional. Your mental health matters, and there are people who want to help. Would you like me to help you find nearby counseling services or mental health clinics?",
      physical:
        "It sounds like you may need medical attention. I recommend visiting a health facility for proper diagnosis and treatment. Would you like me to show you nearby clinics that can help?",
      general:
        "It sounds like you could benefit from professional support. I can help you find nearby health facilities and clinics. Would you like to see what's available near you?",
    };

    const baseMessage =
      facilityRecommendation[helpCheck.category] ||
      facilityRecommendation.general;

    return {
      type: "facility_recommendation",
      category: helpCheck.category,
      message: applyPersonality(baseMessage, personality),
      showFacilityFinder: true,
      intent: detectIntent(userMessage),
    };
  }

  // Detect intent
  const intent = detectIntent(userMessage);

  // Get relevant content
  const contentResponse = getRelevantContent(intent, ageGroup, userMessage);

  return {
    type: "normal",
    intent,
    ...contentResponse,
  };
};

// Generate follow-up suggestions based on conversation context
export const generateFollowUpSuggestions = (intent, category = null) => {
  // Mental health-specific supportive suggestions
  if (category === "mentalHealth") {
    return [
      "Find nearby health facilities",
      "Talk to a counselor",
      "I need crisis support",
      "Tell me about coping strategies",
      "Connect me with help resources",
    ];
  }

  const suggestions = {
    contraception: [
      "Tell me about condoms",
      "How effective is the pill?",
      "What are long-term options?",
      "Where can I get contraception?",
    ],
    sti: [
      "How do I get tested?",
      "What are STI symptoms?",
      "Tell me about HIV",
      "How can I protect myself?",
    ],
    mentalHealth: [
      "I feel anxious",
      "How do I manage stress?",
      "Where can I get help?",
      "Tell me about depression",
    ],
    consent: [
      "What is consent?",
      "How do I set boundaries?",
      "What is a healthy relationship?",
      "What if I feel pressured?",
    ],
    pregnancy: [
      "Am I pregnant?",
      "What is antenatal care?",
      "Where can I get help?",
      "What are my options?",
    ],
    general: [
      "Contraception options",
      "STI prevention",
      "Mental health support",
      "Relationships & consent",
    ],
  };

  return suggestions[intent] || suggestions.general;
};

// Sentiment analysis (basic)
export const analyzeSentiment = (message) => {
  const lowerMessage = message.toLowerCase();

  // Positive indicators
  const positiveWords = [
    "thanks",
    "thank you",
    "helpful",
    "good",
    "great",
    "appreciate",
    "happy",
  ];

  // Negative indicators
  const negativeWords = [
    "scared",
    "worried",
    "afraid",
    "concerned",
    "confused",
    "upset",
    "angry",
  ];

  // Neutral
  const positiveCount = positiveWords.filter((w) =>
    lowerMessage.includes(w)
  ).length;
  const negativeCount = negativeWords.filter((w) =>
    lowerMessage.includes(w)
  ).length;

  if (positiveCount > negativeCount) return "positive";
  if (negativeCount > positiveCount) return "negative";
  return "neutral";
};
