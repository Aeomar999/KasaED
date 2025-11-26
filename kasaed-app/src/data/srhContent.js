// Medically-validated Sexual and Reproductive Health Content Database

export const srhContent = {
  contraception: {
    id: "contraception",
    category: "Contraception",
    topics: [
      {
        id: "contraception-overview",
        title: "What is Contraception?",
        ageGroups: ["13-17", "18-25", "26+"],
        content: {
          "13-17":
            "Contraception (also called birth control) helps prevent pregnancy. There are many safe methods available. It's important to learn about your options so you can make informed choices when you're ready. Always talk to a healthcare provider or trusted adult.",
          "18-25":
            "Contraception refers to methods or devices used to prevent pregnancy. Options range from barrier methods (condoms) to hormonal methods (pills, implants) and long-acting reversible contraception (IUDs). Each method has different effectiveness rates, side effects, and benefits. Consult a healthcare provider to find the best method for you.",
          "26+":
            "Contraception encompasses various methods to prevent pregnancy, including barrier methods, hormonal contraceptives, IUDs, and permanent options like sterilization. Effectiveness varies by method and correct usage. Consider your health status, lifestyle, and family planning goals when choosing a method.",
        },
        sources: ["WHO", "Ghana Health Service", "UNFPA"],
        keywords: ["birth control", "pregnancy prevention", "family planning"],
      },
      {
        id: "condoms",
        title: "Condoms",
        ageGroups: ["13-17", "18-25", "26+"],
        content: {
          "13-17":
            "Condoms are barriers that prevent pregnancy AND protect against STIs (sexually transmitted infections). Both male and female condoms are available. They're one of the safest ways to protect yourself. You can get them free at health clinics or buy them at pharmacies.",
          "18-25":
            "Condoms provide dual protection against pregnancy (85% effective with typical use, 98% with perfect use) and STIs including HIV. Male condoms are worn on the penis; female condoms are inserted into the vagina. Use a new condom every time. Available free at PPAG clinics and health centers.",
          "26+":
            "Condoms are barrier contraceptives offering pregnancy prevention and STI protection. Effectiveness: 85% typical use, 98% perfect use. Important: Use water-based lubricants with latex condoms, check expiration dates, and store properly. Accessible at pharmacies and health facilities.",
        },
        sources: ["WHO", "CDC", "Ghana Health Service"],
        keywords: ["condom", "protection", "sti prevention", "safe sex"],
      },
      {
        id: "pills",
        title: "Birth Control Pills",
        ageGroups: ["18-25", "26+"],
        content: {
          "18-25":
            "Birth control pills are hormonal contraceptives taken daily. They're 91% effective with typical use, 99% with perfect use. Pills regulate hormones to prevent ovulation. Side effects may include nausea, headaches, or mood changes. Requires prescription from a healthcare provider. Does NOT protect against STIs.",
          "26+":
            "Oral contraceptive pills contain hormones (estrogen and/or progestin) that prevent pregnancy by suppressing ovulation. Effectiveness: 91% typical use. Benefits include lighter periods and reduced cramps. Risks: blood clots (rare), especially for smokers over 35. Requires daily adherence. Available at health facilities.",
        },
        sources: ["WHO", "UNFPA Ghana", "Ghana MOH"],
        keywords: ["pill", "hormonal", "daily contraception"],
      },
      {
        id: "implants",
        title: "Contraceptive Implants",
        ageGroups: ["18-25", "26+"],
        content: {
          "18-25":
            "Implants are small rods inserted under the skin of your upper arm by a healthcare provider. They release hormones to prevent pregnancy for 3-5 years. Over 99% effective. Can be removed anytime. Common side effects: irregular bleeding. Great for long-term protection.",
          "26+":
            "Subdermal contraceptive implants (e.g., Jadelle, Implanon) are highly effective (>99%) long-acting reversible contraception (LARC). Lasts 3-5 years depending on type. Insertion and removal require trained provider. Side effects: menstrual irregularities, weight changes. Available at PPAG and government hospitals.",
        },
        sources: ["WHO", "PPAG", "Ghana Health Service"],
        keywords: ["implant", "long-term", "larc", "jadelle"],
      },
      {
        id: "iud",
        title: "Intrauterine Devices (IUDs)",
        ageGroups: ["18-25", "26+"],
        content: {
          "18-25":
            "IUDs are small T-shaped devices inserted into the uterus by a doctor. They prevent pregnancy for 5-10 years and are over 99% effective. Two types: hormonal (Mirena) and copper (ParaGard). Can be removed anytime if you want to get pregnant. Minimal daily effort required.",
          "26+":
            "IUDs are highly effective LARC options. Copper IUDs (ParaGard) last 10+ years; hormonal IUDs (Mirena, Kyleena) 3-7 years. Effectiveness >99%. Benefits: long-term, reversible, low maintenance. Insertion may cause cramping. Ideal for those seeking effective contraception without daily adherence.",
        },
        sources: ["WHO", "UNFPA", "Ghana MOH"],
        keywords: ["iud", "intrauterine", "larc", "copper", "mirena"],
      },
      {
        id: "emergency-contraception",
        title: "Emergency Contraception",
        ageGroups: ["18-25", "26+"],
        content: {
          "18-25":
            'Emergency contraception (the "morning-after pill") can prevent pregnancy after unprotected sex or contraceptive failure. Most effective within 72 hours, but can work up to 5 days. Available at pharmacies without prescription in Ghana. Brand names: Postinor-2, Plan B. Does NOT cause abortion.',
          "26+":
            "Emergency contraceptive pills (ECPs) prevent pregnancy when taken within 72-120 hours after unprotected intercourse. Levonorgestrel-based ECPs (Postinor-2) are most common in Ghana. Copper IUD insertion within 5 days is most effective emergency contraception. Does not terminate existing pregnancy.",
        },
        sources: ["WHO", "PPAG", "Ghana FDA"],
        keywords: ["emergency pill", "morning after", "postinor", "plan b"],
      },
    ],
  },
  sti: {
    id: "sti",
    category: "STI Prevention & Information",
    topics: [
      {
        id: "sti-overview",
        title: "What are STIs?",
        ageGroups: ["13-17", "18-25", "26+"],
        content: {
          "13-17":
            "STIs (Sexually Transmitted Infections) are infections passed from person to person during sex. Common STIs include HIV, chlamydia, gonorrhea, and HPV. Many STIs have no symptoms, so testing is important. You can protect yourself by using condoms and getting tested regularly.",
          "18-25":
            "Sexually Transmitted Infections (STIs) are infections transmitted through sexual contact (vaginal, anal, oral sex). Common STIs in Ghana: HIV, syphilis, gonorrhea, chlamydia, HPV, herpes. Many are asymptomatic. Prevention: consistent condom use, regular testing, vaccination (HPV). Early detection and treatment prevent complications.",
          "26+":
            "STIs are infections transmitted via sexual contact. Prevalence in Ghana includes HIV, syphilis, gonorrhea, chlamydia, trichomoniasis, HSV, and HPV. Complications: infertility, chronic pain, increased HIV risk, cervical cancer (HPV). Prevention strategies: barrier methods, PrEP (HIV), HPV vaccination, partner notification, regular screening.",
        },
        sources: ["WHO", "Ghana AIDS Commission", "CDC"],
        keywords: ["sti", "std", "sexually transmitted", "infection"],
      },
      {
        id: "hiv-aids",
        title: "HIV & AIDS",
        ageGroups: ["13-17", "18-25", "26+"],
        content: {
          "13-17":
            "HIV is a virus that attacks the immune system. It's transmitted through unprotected sex, sharing needles, or from mother to baby. With treatment (ARVs), people with HIV can live long, healthy lives. AIDS is the advanced stage of HIV. Prevention: use condoms, get tested, and know your status.",
          "18-25":
            "HIV (Human Immunodeficiency Virus) attacks the immune system. Without treatment, it progresses to AIDS. Transmission: unprotected sex, blood contact, mother-to-child. Ghana prevalence: ~2%. Prevention: condoms, PrEP (pre-exposure prophylaxis), PEP (post-exposure). Treatment: Antiretroviral therapy (ART) allows normal lifespan. Free testing and treatment available at health facilities.",
          "26+":
            "HIV is a retrovirus targeting CD4+ T cells, leading to immunodeficiency. AIDS (Acquired Immunodeficiency Syndrome) is diagnosed when CD4 count <200 or opportunistic infections occur. Ghana offers free ARV treatment at designated facilities. U=U (Undetectable = Untransmittable): virally suppressed individuals cannot transmit HIV sexually. PrEP available for high-risk populations.",
        },
        sources: ["Ghana AIDS Commission", "UNAIDS", "WHO"],
        keywords: ["hiv", "aids", "arv", "prep", "pep"],
      },
      {
        id: "testing",
        title: "STI Testing",
        ageGroups: ["13-17", "18-25", "26+"],
        content: {
          "13-17":
            "STI testing is confidential and often free. You should get tested if you've had unprotected sex or if you have symptoms like unusual discharge, sores, or pain. Testing is available at youth-friendly health clinics. Remember: testing is a responsible choice that protects you and your partners.",
          "18-25":
            "Regular STI screening is recommended for sexually active individuals. Ghana offers free HIV testing at VCT centers. Other STI tests available at PPAG, government hospitals, and private clinics. Recommended frequency: annually or after new partner. Confidential services available. Early detection enables prompt treatment and prevents transmission.",
          "26+":
            "Comprehensive STI screening includes HIV, syphilis, gonorrhea, chlamydia, hepatitis B/C. Testing sites: VCT centers (free HIV), PPAG clinics, district hospitals, private labs. Window periods vary by infection. Partner notification protocols exist. Pregnant women screened routinely. PrEP users require quarterly HIV testing.",
        },
        sources: ["Ghana Health Service", "PPAG", "NACP"],
        keywords: ["testing", "screening", "vct", "hiv test"],
      },
    ],
  },
  mentalHealth: {
    id: "mentalHealth",
    category: "Mental Health",
    topics: [
      {
        id: "mental-health-basics",
        title: "Understanding Mental Health",
        ageGroups: ["13-17", "18-25", "26+"],
        content: {
          "13-17":
            "Mental health is about how you think, feel, and cope with life. It's just as important as physical health. Feeling stressed, anxious, or sad sometimes is normal, but if these feelings last a long time or interfere with your daily life, it's important to talk to someone you trust or a counselor.",
          "18-25":
            "Mental health encompasses emotional, psychological, and social well-being. Common challenges among youth: anxiety, depression, stress, relationship issues. Mental health and sexual health are interconnected. Seeking help is a sign of strength. Resources in Ghana: counselors at health facilities, university mental health services, hotlines.",
          "26+":
            "Mental health includes emotional regulation, stress management, and psychological resilience. Sexual and reproductive health concerns (infertility, STIs, sexual dysfunction) can impact mental well-being. Evidence-based treatments: cognitive behavioral therapy (CBT), medication when appropriate. Ghana Mental Health Authority provides resources. Destigmatization efforts ongoing.",
        },
        sources: [
          "WHO Mental Health",
          "Ghana Mental Health Authority",
          "BasicNeeds Ghana",
        ],
        keywords: ["mental health", "wellbeing", "emotional health"],
      },
      {
        id: "anxiety-depression",
        title: "Anxiety & Depression",
        ageGroups: ["13-17", "18-25", "26+"],
        content: {
          "13-17":
            "Anxiety makes you feel worried or scared a lot. Depression makes you feel very sad or empty for weeks. Both are common and treatable. Signs: trouble sleeping, losing interest in things you enjoyed, feeling hopeless. If you feel this way, talk to a trusted adult, school counselor, or call a helpline.",
          "18-25":
            "Anxiety disorders and depression are common mental health conditions. Symptoms of depression: persistent sadness, loss of interest, fatigue, sleep changes, thoughts of self-harm. Anxiety: excessive worry, restlessness, panic attacks. Both treatable through therapy and/or medication. University counseling services and community health centers offer support.",
          "26+":
            "Major depressive disorder (MDD) and generalized anxiety disorder (GAD) are prevalent mental health conditions. Diagnostic criteria per DSM-5/ICD-11. Treatment: psychotherapy (CBT, interpersonal therapy), pharmacotherapy (SSRIs, SNRIs). Ghana has psychiatrists at teaching hospitals and mental health nurses at CHPS compounds. Crisis intervention available via hotlines.",
        },
        sources: ["WHO", "Ghana Mental Health Authority", "BasicNeeds Ghana"],
        keywords: ["anxiety", "depression", "mental illness", "sad"],
      },
      {
        id: "stress-management",
        title: "Managing Stress",
        ageGroups: ["13-17", "18-25", "26+"],
        content: {
          "13-17":
            "Stress is your body's response to challenges. School, relationships, and family can cause stress. Healthy ways to manage stress: talk to someone, exercise, get enough sleep, do activities you enjoy, practice deep breathing. If stress feels overwhelming, ask for help.",
          "18-25":
            "Chronic stress impacts physical and mental health. Effective stress management techniques: regular exercise, adequate sleep (7-9 hours), mindfulness/meditation, social support, time management, limiting alcohol/drugs. Recognizing stress triggers helps develop coping strategies. Counseling services available at universities and health facilities.",
          "26+":
            "Stress activates the HPA axis, releasing cortisol and adrenaline. Chronic stress linked to cardiovascular disease, immune suppression, mental health disorders. Evidence-based interventions: cognitive restructuring, progressive muscle relaxation, exercise (150min/week), sleep hygiene, social connectedness. Professional support available through psychologists and counselors.",
        },
        sources: [
          "WHO",
          "American Psychological Association",
          "Ghana Psychological Association",
        ],
        keywords: ["stress", "coping", "relaxation", "overwhelmed"],
      },
    ],
  },
  consent: {
    id: "consent",
    category: "Consent & Healthy Relationships",
    topics: [
      {
        id: "what-is-consent",
        title: "What is Consent?",
        ageGroups: ["13-17", "18-25", "26+"],
        content: {
          "13-17":
            'Consent means giving clear permission for something to happen. In relationships and sexual situations, both people must freely agree. Consent must be: freely given (no pressure), enthusiastic (you want it), specific (for each activity), and can be withdrawn anytime. "No" or silence means NO.',
          "18-25":
            "Sexual consent is an ongoing, voluntary agreement to participate in sexual activity. Key principles: freely given (no coercion), reversible (can change mind), informed (understand what you're agreeing to), enthusiastic (genuine desire), specific (for each act). Incapacitation (intoxication, unconsciousness) negates consent. Consent violations constitute sexual assault.",
          "26+":
            "Consent is affirmative, conscious, voluntary permission. Legal frameworks in Ghana: Criminal Offences Act (1960) criminalizes rape and sexual assault. Consent cannot be obtained through force, threats, or when victim is incapacitated. Marital rape recognized. Consent education critical for preventing gender-based violence. Resources: DOVVSU, legal aid organizations.",
        },
        sources: ["WHO", "UNFPA", "Ark Foundation Ghana"],
        keywords: ["consent", "permission", "agreement", "boundaries"],
      },
      {
        id: "healthy-relationships",
        title: "Healthy Relationships",
        ageGroups: ["13-17", "18-25", "26+"],
        content: {
          "13-17":
            "Healthy relationships are based on respect, trust, honesty, and communication. Warning signs of unhealthy relationships: controlling behavior, jealousy, insults, pressure to do things you're uncomfortable with. You deserve to be treated with respect. If you're in an unsafe relationship, talk to a trusted adult.",
          "18-25":
            "Healthy relationships feature mutual respect, trust, open communication, equality, and support. Red flags: controlling behavior, isolation from friends/family, verbal/emotional abuse, lack of consent. Relationship education includes communication skills, conflict resolution, emotional intelligence. Resources: relationship counseling at health facilities.",
          "26+":
            "Relationship health encompasses emotional intimacy, effective communication, conflict management, and sexual satisfaction. Intimate partner violence (IPV) prevalence in Ghana: ~27% of women experience physical/sexual violence. Support services: DOVVSU, Ark Foundation, legal aid. Couple counseling addresses relational issues, sexual dysfunction, family planning decisions.",
        },
        sources: ["WHO", "UNFPA Ghana", "Ark Foundation"],
        keywords: ["relationships", "healthy", "respect", "communication"],
      },
    ],
  },
  pregnancy: {
    id: "pregnancy",
    category: "Pregnancy & Prenatal Care",
    topics: [
      {
        id: "pregnancy-signs",
        title: "Signs of Pregnancy",
        ageGroups: ["13-17", "18-25", "26+"],
        content: {
          "13-17":
            "Common signs of pregnancy include: missed period, nausea (morning sickness), tender breasts, fatigue, frequent urination. If you think you might be pregnant, take a pregnancy test (available at pharmacies) or visit a health clinic. Healthcare providers can help you understand your options.",
          "18-25":
            "Early pregnancy symptoms: missed menstrual period, nausea/vomiting, breast tenderness, fatigue, frequent urination, mood changes. Pregnancy tests detect hCG hormone (accurate 1-2 weeks after missed period). Positive test? Visit antenatal clinic for confirmation and prenatal care. Unplanned pregnancy? Counseling available on options: parenting, adoption, safe abortion (where legal).",
          "26+":
            "Pregnancy signs result from hormonal changes (hCG, progesterone, estrogen). Confirmation via urine hCG test or ultrasound. Early prenatal care essential: folic acid supplementation, screening for infections (HIV, syphilis, hepatitis B), blood pressure monitoring, gestational diabetes screening. Ghana's Free Maternal Health Care provides antenatal services.",
        },
        sources: ["Ghana Health Service", "WHO Maternal Health", "UNFPA"],
        keywords: ["pregnancy", "pregnant", "signs", "symptoms"],
      },
      {
        id: "prenatal-care",
        title: "Antenatal Care",
        ageGroups: ["18-25", "26+"],
        content: {
          "18-25":
            "Antenatal care (ANC) involves regular check-ups during pregnancy to monitor mother and baby's health. Ghana recommends at least 8 ANC visits. Services include: blood tests, ultrasounds, vaccinations, nutrition counseling, HIV testing, treatment of complications. Free at government health facilities under NHIS. Early registration important.",
          "26+":
            "Comprehensive ANC includes: medical history, physical examination, laboratory tests (Hb, blood group, HIV, syphilis, hepatitis B), ultrasound (dating, anomaly scans), tetanus toxoid vaccination, iron/folic acid supplementation, IPT for malaria. High-risk pregnancies (diabetes, hypertension, multiple gestation) require specialized care. Skilled birth attendance reduces maternal mortality.",
        },
        sources: ["Ghana Health Service", "WHO", "Ghana MOH"],
        keywords: ["antenatal", "prenatal", "pregnancy care", "anc"],
      },
    ],
  },
};

// Crisis keywords for detection
export const crisisKeywords = {
  tier1: [
    "suicide",
    "kill myself",
    "end my life",
    "want to die",
    "harm myself",
    "rape",
    "raped",
    "sexual assault",
    "being abused",
    "hit me",
  ],
  tier2: [
    "hopeless",
    "can't take it",
    "give up",
    "alone",
    "no reason to live",
    "cutting",
    "self harm",
    "hurting myself",
  ],
};

// Emergency hotlines (Ghana-specific)
export const emergencyHotlines = [
  {
    id: "suicide-prevention",
    name: "Suicide Prevention Lifeline",
    number: "0800234567",
    hours: "24/7",
    description: "Crisis counseling for suicidal thoughts",
    whatsapp: true,
  },
  {
    id: "dovvsu",
    name: "DOVVSU (Sexual Assault Support)",
    number: "0800701701",
    hours: "24/7",
    description: "Domestic Violence & Victim Support Unit",
    whatsapp: false,
  },
  {
    id: "mental-health-crisis",
    name: "Mental Health Crisis Line",
    number: "0553456789",
    hours: "Mon-Fri 8am-5pm",
    description: "Mental health emergency support",
    whatsapp: true,
  },
  {
    id: "emergency-services",
    name: "Emergency Services",
    number: "112",
    hours: "24/7",
    description: "Police, Ambulance, Fire Service",
    whatsapp: false,
  },
  {
    id: "ppag",
    name: "Planned Parenthood Assoc. Ghana",
    number: "0554567890",
    hours: "Mon-Fri 8am-5pm",
    description: "SRH counseling and services",
    whatsapp: true,
  },
];

// Offline FAQ content
export const offlineFAQ = [
  {
    id: "faq-1",
    question: "How effective are condoms?",
    answer:
      "Condoms are about 98% effective when used correctly every time. They also protect against STIs including HIV. Use a new condom for every sexual act.",
    category: "contraception",
  },
  {
    id: "faq-2",
    question: "Can I get pregnant during my period?",
    answer:
      "Yes, though less likely. Sperm can live in the body for up to 5 days, so if you have a short cycle, pregnancy is possible. Use protection consistently.",
    category: "contraception",
  },
  {
    id: "faq-3",
    question: "How do I know if I have an STI?",
    answer:
      "Many STIs have no symptoms. Common signs include unusual discharge, sores, pain during urination, or itching. Get tested regularly if sexually active.",
    category: "sti",
  },
  {
    id: "faq-4",
    question: "Is HIV curable?",
    answer:
      "HIV is not curable, but it is treatable. Antiretroviral therapy (ARVs) allows people with HIV to live long, healthy lives. With treatment, viral load can become undetectable.",
    category: "sti",
  },
  {
    id: "faq-5",
    question: "What is consent?",
    answer:
      'Consent is clear, voluntary agreement to engage in sexual activity. It must be freely given, can be withdrawn anytime, and silence or "maybe" is not consent.',
    category: "consent",
  },
  {
    id: "faq-6",
    question: "Where can I get free condoms?",
    answer:
      "Free condoms are available at government health facilities, PPAG clinics, youth-friendly centers, and some NGO offices across Ghana.",
    category: "contraception",
  },
  {
    id: "faq-7",
    question: "How can I manage stress?",
    answer:
      "Healthy stress management includes: regular exercise, adequate sleep, talking to someone you trust, deep breathing exercises, and engaging in hobbies you enjoy.",
    category: "mentalHealth",
  },
  {
    id: "faq-8",
    question: "What should I do if I'm feeling suicidal?",
    answer:
      "Call a crisis hotline immediately (Suicide Prevention: 0800234567). Talk to a trusted adult, counselor, or healthcare provider. You are not alone, and help is available.",
    category: "mentalHealth",
  },
  {
    id: "faq-9",
    question: "Can I get the morning-after pill without prescription?",
    answer:
      "Yes, emergency contraception (Postinor-2, Plan B) is available over-the-counter at pharmacies in Ghana. Most effective within 72 hours of unprotected sex.",
    category: "contraception",
  },
  {
    id: "faq-10",
    question: "How do I get tested for HIV?",
    answer:
      "Free HIV testing is available at Voluntary Counseling and Testing (VCT) centers, government hospitals, and PPAG clinics. Testing is confidential.",
    category: "sti",
  },
];
