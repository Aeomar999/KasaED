// Comprehensive chatbot response logic for KasaEd Mobile
export const generateChatbotResponse = (userMessage, userProfile) => {
  const message = userMessage.toLowerCase().trim();

  // Crisis keywords detection
  const crisisKeywords = [
    "suicide",
    "kill myself",
    "want to die",
    "end my life",
    "hurt myself",
    "rape",
    "raped",
    "abuse",
    "abused",
    "pregnant",
    "unsafe",
  ];
  const isCrisis = crisisKeywords.some((keyword) => message.includes(keyword));

  if (isCrisis) {
    return {
      text: "I'm very concerned about what you're going through. Please reach out to these emergency resources immediately:\n\n🆘 National Emergency: 112\n🆘 Police: 191\n🆘 Domestic Violence Hotline: 055 378 3794\n🆘 DOVSU (Domestic Violence Support): 0800 900 900\n\nYou can also visit the nearest health facility or police station. You're not alone, and help is available.",
      isCrisis: true,
    };
  }

  // Topic-based responses
  if (
    message.includes("contraception") ||
    message.includes("birth control") ||
    message.includes("prevent pregnancy")
  ) {
    return {
      text: "Contraception helps prevent pregnancy. Here are common methods:\n\n💊 **Pills**: Taken daily, 91-99% effective\n💉 **Injection**: Every 3 months, 94-99% effective\n🔄 **IUD**: Lasts 3-10 years, 99% effective\n🎗️ **Implant**: Lasts 3-5 years, 99% effective\n🛡️ **Condoms**: 82-98% effective, also prevent STIs\n⚕️ **Emergency Pills**: Within 72 hours after unprotected sex\n\nVisit a health clinic for personalized advice. Would you like to find a clinic near you?",
      quickReplies: ["Find Clinic", "Emergency Contraception", "More Info"],
    };
  }

  if (
    message.includes("sti") ||
    message.includes("std") ||
    message.includes("sexually transmitted")
  ) {
    return {
      text: "STIs (Sexually Transmitted Infections) are infections passed through sexual contact. Common STIs include:\n\n🦠 **HIV/AIDS**: Affects immune system\n🦠 **Gonorrhea**: Bacterial infection\n🦠 **Syphilis**: Bacterial infection\n🦠 **Chlamydia**: Often no symptoms\n🦠 **HPV**: Can cause warts or cancer\n🦠 **Herpes**: Viral infection\n\n**Prevention:**\n✅ Use condoms consistently\n✅ Get tested regularly\n✅ Limit sexual partners\n✅ Get vaccinated (HPV)\n\n**Symptoms to watch:**\n⚠️ Unusual discharge\n⚠️ Painful urination\n⚠️ Sores or bumps\n⚠️ Itching or irritation\n\nIf you have symptoms, visit a clinic immediately. Early treatment is crucial!",
      quickReplies: [
        "STI Test Locations",
        "Risk Calculator",
        "Prevention Tips",
      ],
    };
  }

  if (message.includes("pregnancy") || message.includes("pregnant")) {
    return {
      text: "Pregnancy information:\n\n🤰 **Early Signs:**\n• Missed period\n• Nausea/morning sickness\n• Breast tenderness\n• Fatigue\n• Frequent urination\n\n🧪 **Pregnancy Tests:**\n• Home tests: 99% accurate after missed period\n• Clinic tests: More accurate, provide counseling\n\n🏥 **Prenatal Care:**\n• Start visits early (8-12 weeks)\n• Take folic acid\n• Avoid alcohol, smoking, drugs\n• Eat healthy, balanced diet\n\n📍 **Options Counseling:**\n• Continue pregnancy\n• Adoption\n• Safe termination (where legal)\n\nWould you like help finding a health facility for testing or care?",
      quickReplies: ["Find Clinic", "Pregnancy Test Info", "Prenatal Care"],
    };
  }

  if (
    message.includes("period") ||
    message.includes("menstruation") ||
    message.includes("menstrual")
  ) {
    return {
      text: "Menstruation (periods) is a normal part of reproductive health:\n\n🩸 **What's Normal:**\n• Cycle: 21-35 days\n• Duration: 3-7 days\n• Flow: Light to heavy\n• Some cramping and mood changes\n\n⚠️ **When to See a Doctor:**\n• Very heavy bleeding (changing pad hourly)\n• Severe pain that interferes with daily life\n• Periods lasting >7 days\n• Irregular cycles after age 16\n• Periods stop suddenly (not pregnant)\n\n💡 **Period Care:**\n✅ Use pads, tampons, or menstrual cups\n✅ Change regularly (every 4-8 hours)\n✅ Pain relief: Heat, exercise, ibuprofen\n✅ Track your cycle\n\nWould you like to use our Period Tracker?",
      quickReplies: ["Period Tracker", "Pain Management", "Period Myths"],
    };
  }

  if (
    message.includes("consent") ||
    message.includes("sexual assault") ||
    message.includes("forced")
  ) {
    return {
      text: "Consent is essential for all sexual activity:\n\n✋ **What is Consent?**\n• Freely given agreement\n• Can be withdrawn anytime\n• Must be clear and enthusiastic\n• Can't be given if intoxicated/asleep/underage\n\n❌ **Not Consent:**\n• Silence or lack of resistance\n• Previous sexual activity\n• Being in a relationship\n• Wearing certain clothes\n• Being under influence\n\n🚨 **If You've Been Assaulted:**\n• It's NOT your fault\n• Seek medical care immediately\n• Preserve evidence (don't bathe/change clothes)\n• Report to police (DOVSU: 0800 900 900)\n• Get counseling support\n\n⚖️ **Legal Age:**\nIn Ghana, the age of consent is 16. Sexual activity with anyone under 16 is illegal.\n\nNeed emergency help?",
      quickReplies: [
        "Emergency Contacts",
        "Support Resources",
        "Know Your Rights",
      ],
    };
  }

  if (
    message.includes("relationship") ||
    message.includes("dating") ||
    message.includes("boyfriend") ||
    message.includes("girlfriend")
  ) {
    return {
      text: "Healthy relationships are built on mutual respect:\n\n❤️ **Signs of Healthy Relationship:**\n✅ Mutual respect and trust\n✅ Open, honest communication\n✅ Support for each other's goals\n✅ Healthy boundaries respected\n✅ Equal decision-making\n✅ Independence maintained\n\n🚩 **Red Flags:**\n❌ Controlling behavior\n❌ Excessive jealousy\n❌ Verbal/physical/sexual abuse\n❌ Isolation from friends/family\n❌ Constant criticism\n❌ Pressure for sex\n❌ Threats or intimidation\n\n💡 **Communication Tips:**\n• Be honest about your feelings\n• Listen actively\n• Respect differences\n• Set clear boundaries\n• Discuss safer sex openly\n\nWant to check your relationship health?",
      quickReplies: [
        "Relationship Checker",
        "Communication Tips",
        "Setting Boundaries",
      ],
    };
  }

  if (message.includes("body changes") || message.includes("puberty")) {
    return {
      text: "Body changes during puberty are normal:\n\n👧 **For Females:**\n• Breast development (8-13 years)\n• Pubic and underarm hair\n• Growth spurt\n• Menstruation starts (9-16 years)\n• Wider hips\n• Body odor, acne\n\n👦 **For Males:**\n• Testicle and penis growth\n• Pubic, facial, body hair\n• Voice deepening\n• Growth spurt\n• Muscle development\n• Wet dreams\n• Body odor, acne\n\n💭 **Emotional Changes:**\n• Mood swings\n• Increased interest in romance/sex\n• Self-consciousness\n• Need for independence\n\n✨ **Remember:**\n• Everyone develops at different rates\n• All body types are normal\n• Changes can feel awkward but are natural\n\nHave specific questions?",
      quickReplies: ["More on Puberty", "Body Image", "Ask a Question"],
    };
  }

  if (
    message.includes("mental health") ||
    message.includes("depression") ||
    message.includes("anxiety") ||
    message.includes("stress")
  ) {
    return {
      text: "Mental health is just as important as physical health:\n\n🧠 **Common Challenges:**\n• Stress from school/work\n• Anxiety about the future\n• Depression\n• Body image concerns\n• Relationship issues\n\n💚 **Self-Care Tips:**\n✅ Get enough sleep (8-10 hours)\n✅ Exercise regularly\n✅ Eat nutritious meals\n✅ Stay connected with friends/family\n✅ Practice relaxation (meditation, deep breathing)\n✅ Limit social media\n✅ Do activities you enjoy\n\n⚠️ **Warning Signs:**\n• Persistent sadness (>2 weeks)\n• Loss of interest in activities\n• Changes in appetite/sleep\n• Difficulty concentrating\n• Thoughts of self-harm\n\n🆘 **Get Help:**\n• Talk to trusted adult\n• School counselor\n• Mental health professional\n• Crisis Hotline: 112\n\nWould you like a mental health assessment?",
      quickReplies: [
        "Mental Health Assessment",
        "Stress Management",
        "Find Support",
      ],
    };
  }

  if (message.includes("hiv") || message.includes("aids")) {
    return {
      text: "HIV/AIDS Information:\n\n🔬 **What is HIV?**\nHIV (Human Immunodeficiency Virus) attacks the immune system. Without treatment, it can progress to AIDS.\n\n📊 **Transmission:**\n• Unprotected sex\n• Sharing needles\n• Mother to child (pregnancy/birth/breastfeeding)\n• Blood transfusion (rare with screening)\n\n❌ **NOT Transmitted By:**\n• Hugging, kissing, touching\n• Sharing food/drinks\n• Insect bites\n• Toilet seats\n\n🛡️ **Prevention:**\n✅ Use condoms correctly every time\n✅ Get tested regularly\n✅ PrEP (Pre-Exposure Prophylaxis) if high risk\n✅ Don't share needles\n✅ Get tested during pregnancy\n\n💊 **Treatment:**\n• ARVs (Antiretroviral drugs) available FREE in Ghana\n• With treatment, people live normal lifespans\n• Can achieve undetectable viral load (U=U)\n\n🧪 **Testing:**\n• Free testing at health facilities\n• Results in 15-20 minutes\n• Confidential\n\nWant to find a testing center?",
      quickReplies: ["Find Test Center", "PrEP Info", "Treatment Options"],
    };
  }

  if (message.includes("condom") || message.includes("protection")) {
    return {
      text: "Condoms are the only method that prevents both pregnancy AND STIs:\n\n🛡️ **Types:**\n• Male (external) condoms\n• Female (internal) condoms\n\n✅ **How to Use (Male Condom):**\n1. Check expiration date\n2. Open carefully (don't use teeth)\n3. Put on when penis is erect, BEFORE contact\n4. Pinch tip to remove air\n5. Roll down to base\n6. After sex, hold base while withdrawing\n7. Tie and dispose (not in toilet)\n8. Use new condom each time\n\n💡 **Tips:**\n• Store in cool, dry place\n• Don't use oil-based lubricants\n• Use water-based lube if needed\n• Check for damage before use\n• NEVER reuse\n\n📍 **Where to Get:**\n• Health facilities (often free)\n• Pharmacies\n• Shops\n• Community health workers\n\n⚠️ **If Condom Breaks:**\n• Emergency contraception within 72 hours\n• STI testing in 2 weeks\n• HIV PEP within 72 hours if high risk\n\nNeed to find where to get condoms?",
      quickReplies: [
        "Find Free Condoms",
        "Emergency Contraception",
        "Practice Demo",
      ],
    };
  }

  // Default greeting or general response
  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey")
  ) {
    return {
      text: "Hello! I'm KasaEd, your trusted companion for sexual and reproductive health information. I'm here to provide accurate, confidential, and judgment-free support.\n\nWhat would you like to know about today?",
      quickReplies: [
        "Contraception",
        "STIs",
        "Relationships",
        "Body Changes",
        "Browse Topics",
      ],
    };
  }

  // Default response for unrecognized queries
  return {
    text: "I'm here to help with sexual and reproductive health questions. You can ask me about:\n\n💊 Contraception & family planning\n🦠 STIs and prevention\n🤰 Pregnancy & prenatal care\n🩸 Menstruation & period health\n✋ Consent & healthy relationships\n🧬 Puberty & body changes\n🧠 Mental & emotional health\n🏥 Finding health services\n\nWhat would you like to learn about?",
    quickReplies: [
      "Contraception",
      "STIs",
      "Relationships",
      "Mental Health",
      "More Topics",
    ],
  };
};

// Emergency contacts for Ghana
export const emergencyContacts = [
  {
    name: "National Emergency",
    number: "112",
    description: "All emergencies",
  },
  {
    name: "Police Emergency",
    number: "191",
    description: "Police assistance",
  },
  {
    name: "Ambulance Service",
    number: "193",
    description: "Medical emergencies",
  },
  {
    name: "DOVSU (Domestic Violence Support)",
    number: "0800 900 900",
    description: "Domestic violence and sexual assault support",
  },
  {
    name: "Domestic Violence Hotline",
    number: "055 378 3794",
    description: "24/7 support for domestic violence victims",
  },
  {
    name: "Ghana AIDS Commission",
    number: "030 277 6861",
    description: "HIV/AIDS information and support",
  },
  {
    name: "Planned Parenthood Ghana",
    number: "030 222 7725",
    description: "Sexual and reproductive health services",
  },
];

// Sample health clinics data
export const healthClinics = [
  {
    id: 1,
    name: "Planned Parenthood Association of Ghana",
    location: "Accra",
    coordinates: { latitude: 5.6037, longitude: -0.187 },
    services: ["Contraception", "STI Testing", "Counseling", "Family Planning"],
    phone: "030 222 7725",
    hours: "Mon-Fri: 8:00 AM - 5:00 PM",
  },
  {
    id: 2,
    name: "Ridge Hospital",
    location: "Accra",
    coordinates: { latitude: 5.5845, longitude: -0.1963 },
    services: [
      "STI Testing",
      "HIV Testing",
      "Prenatal Care",
      "Emergency Services",
    ],
    phone: "030 222 3671",
    hours: "24/7",
  },
  {
    id: 3,
    name: "Marie Stopes Ghana",
    location: "Multiple locations",
    coordinates: { latitude: 5.6145, longitude: -0.2055 },
    services: [
      "Family Planning",
      "Safe Abortion",
      "STI Testing",
      "Contraception",
    ],
    phone: "030 701 1360",
    hours: "Mon-Sat: 8:00 AM - 6:00 PM",
  },
  {
    id: 4,
    name: "Korle Bu Teaching Hospital",
    location: "Accra",
    coordinates: { latitude: 5.5355, longitude: -0.2264 },
    services: [
      "Prenatal Care",
      "STI Treatment",
      "Emergency Services",
      "Counseling",
    ],
    phone: "030 266 3271",
    hours: "24/7",
  },
];
