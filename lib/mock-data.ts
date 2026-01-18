export type MedicineTradition = 'tcm' | 'ayurveda' | 'western' | 'unani';

export type TierLevel = 0 | 1 | 2 | 3 | 4;

export type InterventionType = 'foundation' | 'practice' | 'targeted' | 'medical';

export type SafetyLevel = 'safe' | 'caution' | 'risk';

export interface SafetyProfile {
  riskScore: number;
  interactions: string[];
  alerts: {
    level: SafetyLevel;
    message: string;
  }[];
}

export interface Intervention {
  id: string;
  name: string;
  tier: TierLevel;
  type: InterventionType;
  description: string;
  status: 'active' | 'completed' | 'paused';
  streak?: number;
  startDate: string;
  category: MedicineTradition | 'lifestyle';
  interactions: string[]; // Added for SafetyCenter
  tradition?: MedicineTradition; // Added alias for category in some contexts
}

export interface SafetyAlert {
  id: string;
  title: string;
  description: string;
  severity: 'risk' | 'caution' | 'safe';
  timestamp: string;
  source: string;
  substances: string[];
}

export interface Constitution {
  tcm: {
    bodyType: string;
    organImbalance: string;
  };
  ayurveda: {
    primaryDosha: string;
    secondaryDosha: string;
  };
  unani: {
    temperament: string;
    humor: string;
  };
}

export interface DailyPractice {
  id: string;
  name: string;
  tradition: MedicineTradition;
  type: string;        // Added
  difficulty: string;  // Added
  duration: string;
  description: string;
  constitutionBasis: string;
  imageUrl: string;
}

export interface UserProfile {
  id: string;
  name: string;
  constitution: Constitution;
  wisdomPoints: number;
  culturalStreak: number;
  foundationScores: {
    sleep: number;
    movement: number;
    nutrition: number;
    breath: number;
    community: number;
  };
  activeInterventions: Intervention[];
  safetyStatus: 'green' | 'yellow' | 'red';
  riskScore: number;
  bio: string; // Added
  goals: string[]; // Added
}

export interface MedicineTreatment {
  name: string;
  type: 'herb' | 'practice' | 'therapy' | 'drug' | 'diet';
  description: string;
  safetyLevel: SafetyLevel;
  safetyNote: string;
  imageUrl?: string;
}

export interface MedicineApproach {
  tradition: MedicineTradition;
  traditionName: string;
  diagnosis: string;
  approach: string;
  treatments: MedicineTreatment[];
  evidenceLevel: 1 | 2 | 3 | 4 | 5;
  evidenceType: string;
}

export interface Condition {
  id: string;
  name: string;
  description: string;
  approaches: MedicineApproach[];
  aiSynthesis: string;
  escalationTriggers: string[];
}

// ============================================
// MOCK DATA
// ============================================

export const mockInterventions: Intervention[] = [
  {
    id: 'int-01',
    name: 'Morning Warm Water',
    tier: 0,
    type: 'foundation',
    description: 'Drink 500ml warm water immediately upon waking to stimulate digestion.',
    status: 'active',
    streak: 14,
    startDate: '2024-01-01',
    category: 'lifestyle',
    interactions: [],
  },
  {
    id: 'int-02',
    name: 'Ashwagandha Root',
    tier: 3,
    type: 'targeted',
    description: '500mg extract for Vata grounding and stress reduction.',
    status: 'active',
    startDate: '2024-01-10',
    category: 'ayurveda',
    interactions: [],
  },
  {
    id: 'int-03',
    name: 'Turmeric (Curcumin)',
    tier: 3,
    type: 'targeted',
    description: 'High-potency curcumin with black pepper for inflammation.',
    status: 'paused',
    startDate: '2024-01-05',
    category: 'ayurveda',
    interactions: [],
  },
  {
    id: 'int-04',
    name: 'Sleep Hygiene Protocol',
    tier: 1,
    type: 'foundation',
    description: 'No screens 1 hour before bed, cool room temperature (68°F).',
    status: 'active',
    streak: 21,
    startDate: '2023-12-20',
    category: 'lifestyle',
    interactions: [], // Added
    tradition: 'western', // Added
  },
  {
    id: 'int-05',
    name: 'Qi Gong (Eight Brocades)',
    tier: 2,
    type: 'practice',
    description: 'Daily 20-minute sequence to cultivate metabolic energy.',
    status: 'completed',
    startDate: '2023-11-15',
    category: 'tcm',
    interactions: [],
  },
  {
    id: 'int-06',
    name: 'Ibuprofen (PRN)',
    tier: 4,
    type: 'medical',
    description: 'Use only for acute breakthrough pain > 7/10.',
    status: 'active',
    startDate: '2024-01-15',
    category: 'western',
    interactions: [],
  },
  {
    id: 'int-07',
    name: 'Acupuncture Series',
    tier: 4,
    type: 'medical',
    description: 'Weekly sessions targeting kidney meridian.',
    status: 'active',
    startDate: '2024-01-12',
    category: 'tcm',
    interactions: [],
  }
];


export const mockUser: UserProfile = {
  id: 'user-123',
  name: 'Sarah',
  bio: 'Yoga instructor and wellness enthusiast healing from chronic fatigue.',
  goals: ['Balance Vata', 'Restore Energy', 'Sleep Better'],
  constitution: {
    tcm: {
      bodyType: 'Yin Deficiency',
      organImbalance: 'Kidney/Liver',
    },
    ayurveda: {
      primaryDosha: 'Vata',
      secondaryDosha: 'Pitta',
    },
    unani: {
      temperament: 'Cold & Dry',
      humor: 'Black Bile (Sauda)',
    },
  },
  wisdomPoints: 1250,
  culturalStreak: 12,
  foundationScores: {
    sleep: 72,
    movement: 85,
    nutrition: 78,
    breath: 65,
    community: 58,
  },
  safetyStatus: 'green',
  riskScore: 2,
  activeInterventions: [
    mockInterventions[0],
    mockInterventions[1],
    mockInterventions[2]
  ],
};

export const todaysPractice: DailyPractice = {
  id: 'practice-001',
  name: 'Pranayama for Vata Balance',
  tradition: 'ayurveda',
  type: 'Breathwork',         // Added
  difficulty: 'Beginner',     // Added
  duration: '5 minutes',
  description: 'Nadi Shodhana (alternate nostril breathing) is a powerful technique to calm the nervous system and balance Vata dosha, especially during the morning hours.',
  constitutionBasis: 'Recommended for your Vata-Pitta constitution to ground energy before the start of the day.',
  imageUrl: '/images/yoga_practice_1768698113268.png',
};

export const mockConditions: Condition[] = [
  {
    id: 'cond-001',
    name: 'Lower Back Pain',
    description: 'Chronic or acute pain in the lumbar region affecting mobility and quality of life.',
    approaches: [
      {
        tradition: 'tcm',
        traditionName: 'Traditional Chinese Medicine',
        diagnosis: 'Kidney Qi Deficiency & Blood Stasis',
        approach: 'Tonify Kidneys, move Blood, and clear cold/dampness.',
        treatments: [
          {
            name: 'Acupuncture',
            type: 'therapy',
            description: 'Targeting UB23, UB40, and Ashi points to release stagnation.',
            safetyLevel: 'safe',
            safetyNote: 'Performed by licensed practitioner only.',
            imageUrl: '/images/tcm_herbs_acupuncture_1768697856023.png',
          },
          {
            name: 'Du Huo Ji Sheng Tang',
            type: 'herb',
            description: 'Herbal formula for chronic lower back pain with cold signs.',
            safetyLevel: 'caution',
            safetyNote: 'Monitor liver enzymes with long-term use.',
            imageUrl: '/images/tcm_herbs_acupuncture_1768697856023.png',
          },
        ],
        evidenceLevel: 4,
        evidenceType: 'Systematic Review (2024)',
      },
      {
        tradition: 'ayurveda',
        traditionName: 'Ayurveda',
        diagnosis: 'Kati Shoola (Vata aggravation)',
        approach: 'Pacify Vata dosha through oil applications and warming therapies.',
        treatments: [
          {
            name: 'Kati Basti',
            type: 'therapy',
            description: 'Warm herbal oil pool retained on the lower back.',
            safetyLevel: 'safe',
            safetyNote: 'Ensure oil temperature is safe.',
            imageUrl: '/images/ayurveda_spices_1768697869474.png',
          },
          {
            name: 'Ashwagandha',
            type: 'herb',
            description: 'Nervine tonic to reduce pain sensitivity and strengthen tissue.',
            safetyLevel: 'safe',
            safetyNote: 'Avoid in pregnancy without consultation.',
            imageUrl: '/images/ayurveda_spices_1768697869474.png',
          },
        ],
        evidenceLevel: 3,
        evidenceType: 'Clinical Trial',
      },
      {
        tradition: 'western',
        traditionName: 'Western Medicine',
        diagnosis: 'Mechanical Lumbar Strain',
        approach: 'Reduce inflammation and improve biomechanics.',
        treatments: [
          {
            name: 'Physical Therapy',
            type: 'therapy',
            description: 'Core strengthening exercises and posture correction.',
            safetyLevel: 'safe',
            safetyNote: 'Guided by a DPT.',
            imageUrl: '/images/western_medicine_1768697895807.png',
          },
          {
            name: 'NSAIDs',
            type: 'drug',
            description: 'Ibuprofen or Naproxen for acute inflammation control.',
            safetyLevel: 'caution',
            safetyNote: 'Take with food; avoid if history of ulcers.',
            imageUrl: '/images/western_medicine_1768697895807.png',
          },
        ],
        evidenceLevel: 5,
        evidenceType: 'Meta-Analysis (2023)',
      },
      {
        tradition: 'unani',
        traditionName: 'Unani Medicine',
        diagnosis: 'Wanda-e-Mafasil',
        approach: 'Eliminate morbid matter and strengthen the joint.',
        treatments: [
          {
            name: 'Cupping (Hijama)',
            type: 'therapy',
            description: 'Dry cupping to divert morbid material.',
            safetyLevel: 'safe',
            safetyNote: 'Performed by certified practitioner.',
            imageUrl: '/images/unani_medicine_1768697882747.png',
          },
          {
            name: 'Suranjan (Colchicum)',
            type: 'herb',
            description: 'Anti-inflammatory herb specific for joints.',
            safetyLevel: 'caution',
            safetyNote: 'Toxic in high doses; strict dosage required.',
            imageUrl: '/images/unani_medicine_1768697882747.png',
          }
        ],
        evidenceLevel: 3,
        evidenceType: 'Historical/Clinical',
      }
    ],
    aiSynthesis: 'All systems recognize inflammation but attribute it to different root causes. Western medicine offers immediate relief, while TCM and Ayurveda focus on long-term balance through kidney/vata support.',
    escalationTriggers: [
      'Pain radiating down the leg (Sciatica)',
      'Numbness or weakness in legs',
      'Loss of bladder/bowel control',
      'Fever associated with back pain'
    ]
  },
  {
    id: 'cond-002',
    name: 'General Anxiety',
    description: 'Persistent feelings of worry, nervousness, or unease affecting daily functioning.',
    approaches: [
      {
        tradition: 'tcm',
        traditionName: 'Traditional Chinese Medicine',
        diagnosis: 'Heart Blood Deficiency & Shen Disturbance',
        approach: 'Nourish Heart Blood and calm the Spirit (Shen).',
        treatments: [
          {
            name: 'Suan Zao Ren Tang',
            type: 'herb',
            description: 'Sour Jujube Decoction for insomnia and palpitations.',
            safetyLevel: 'safe',
            safetyNote: 'May cause drowsiness.',
            imageUrl: '/images/tcm_herbs_acupuncture_1768697856023.png',
          },
          {
            name: 'Acupuncture (Heart 7)',
            type: 'therapy',
            description: 'Shenmen point to calm the mind.',
            safetyLevel: 'safe',
            safetyNote: 'Professional administration required.',
            imageUrl: '/images/tcm_herbs_acupuncture_1768697856023.png',
          },
        ],
        evidenceLevel: 3,
        evidenceType: 'Meta-Analysis (2022)',
      },
      {
        tradition: 'ayurveda',
        traditionName: 'Ayurveda',
        diagnosis: 'Vata Imbalance (Manovaha Srotas)',
        approach: 'Grounding therapies and nervine tonics.',
        treatments: [
          {
            name: 'Brahmi (Bacopa)',
            type: 'herb',
            description: 'Cognitive enhancer and anxiolytic.',
            safetyLevel: 'safe',
            safetyNote: 'Take with ghee for better absorption.',
            imageUrl: '/images/ayurveda_spices_1768697869474.png',
          },
          {
            name: 'Shirodhara',
            type: 'therapy',
            description: 'Pouring warm oil on the forehead.',
            safetyLevel: 'safe',
            safetyNote: 'Requires trained therapist.',
            imageUrl: '/images/ayurveda_spices_1768697869474.png',
          },
        ],
        evidenceLevel: 4,
        evidenceType: 'Systematic Review',
      },
      {
        tradition: 'western',
        traditionName: 'Western Medicine',
        diagnosis: 'Generalized Anxiety Disorder (GAD)',
        approach: 'CBT and/or SSRIs.',
        treatments: [
          {
            name: 'CBT',
            type: 'therapy',
            description: 'Cognitive Behavioral Therapy to reframe thought patterns.',
            safetyLevel: 'safe',
            safetyNote: 'No side effects.',
            imageUrl: '/images/western_medicine_1768697895807.png',
          },
          {
            name: 'Sertraline',
            type: 'drug',
            description: 'SSRI medication for mood regulation.',
            safetyLevel: 'caution',
            safetyNote: 'Monitor for suicide risk in early treatment.',
            imageUrl: '/images/western_medicine_1768697895807.png',
          },
        ],
        evidenceLevel: 5,
        evidenceType: 'Clinical Guidelines',
      },
      {
        tradition: 'unani',
        traditionName: 'Unani Medicine',
        diagnosis: 'Malikhuliya (Melancholia)',
        approach: 'Use of Muqawwiyat-e-Qalb (Heart tonics).',
        treatments: [
          {
            name: 'Khamira Gaozaban',
            type: 'herb',
            description: 'Herbal confection to strengthen heart and brain.',
            safetyLevel: 'safe',
            safetyNote: 'Contains sugar, use caution in diabetes.',
            imageUrl: '/images/unani_medicine_1768697882747.png',
          }
        ],
        evidenceLevel: 2,
        evidenceType: 'Historical Text',
      }
    ],
    aiSynthesis: 'Anxiety is viewed as a disruption of the Spirit/Shen in Eastern traditions and neurochemical imbalance in Western medicine. Integrative approaches combining CBT with grounding herbs like Ashwagandha show promise.',
    escalationTriggers: [
      'Panic attacks lasting > 1 hour',
      'Thoughts of self-harm',
      'Inability to function at work/home'
    ]
  },
  {
    id: 'cond-003',
    name: 'Insomnia',
    description: 'Difficulty falling asleep or staying asleep, affecting daytime energy.',
    approaches: [
      {
        tradition: 'tcm',
        traditionName: 'Traditional Chinese Medicine',
        diagnosis: 'Liver Fire Disturbing Spirit',
        approach: 'Clear heat and calm the spirit.',
        treatments: [
          {
            name: 'Long Dan Xie Gan Tang',
            type: 'herb',
            description: 'Gentiana decoction to drain liver fire.',
            safetyLevel: 'caution',
            safetyNote: 'Potent formula, short-term use only.',
            imageUrl: '/images/tcm_herbs_acupuncture_1768697856023.png',
          },
          {
            name: 'Acupuncture (Liver 3)',
            type: 'therapy',
            description: 'Taichong point to move qi and clear heat.',
            safetyLevel: 'safe',
            safetyNote: 'Professional administration.',
            imageUrl: '/images/tcm_herbs_acupuncture_1768697856023.png',
          }
        ],
        evidenceLevel: 3,
        evidenceType: 'RCT'
      },
      {
        tradition: 'ayurveda',
        traditionName: 'Ayurveda',
        diagnosis: 'Vata Aggravation',
        approach: 'Grounding rituals and warm oils.',
        treatments: [
          {
            name: 'Warm Milk with Nutmeg',
            type: 'diet',
            description: 'Natural sedative properties.',
            safetyLevel: 'safe',
            safetyNote: 'Avoid if lactose intolerant.',
            imageUrl: '/images/ayurveda_spices_1768697869474.png',
          },
          {
            name: 'Abhyanga (Self-Massage)',
            type: 'therapy',
            description: 'Warm sesame oil massage before bed.',
            safetyLevel: 'safe',
            safetyNote: 'Protect sheets from oil.',
            imageUrl: '/images/ayurveda_spices_1768697869474.png',
          }
        ],
        evidenceLevel: 4,
        evidenceType: 'Traditional Practice'
      },
      {
        tradition: 'western',
        traditionName: 'Western Medicine',
        diagnosis: 'Chronic Insomnia',
        approach: 'Sleep hygiene and pharmacotherapy.',
        treatments: [
          {
            name: 'Melatonin',
            type: 'drug',
            description: 'Hormone supplement to regulate sleep cycle.',
            safetyLevel: 'safe',
            safetyNote: 'May cause vivid dreams.',
            imageUrl: '/images/western_medicine_1768697895807.png',
          },
          {
            name: 'Zolpidem',
            type: 'drug',
            description: 'Sedative-hypnotic for short-term use.',
            safetyLevel: 'caution',
            safetyNote: 'Risk of dependency.',
            imageUrl: '/images/western_medicine_1768697895807.png',
          }
        ],
        evidenceLevel: 5,
        evidenceType: 'Clinical Guidelines'
      },
      {
        tradition: 'unani',
        traditionName: 'Unani Medicine',
        diagnosis: 'Sahr (Sleeplessness)',
        approach: 'Moisturizing the brain (Tarwih).',
        treatments: [
          {
            name: 'Oil of Pumpkin Seeds',
            type: 'herb',
            description: 'Massage on scalp to induce sleep.',
            safetyLevel: 'safe',
            safetyNote: 'External use only.',
            imageUrl: '/images/unani_medicine_1768697882747.png',
          }
        ],
        evidenceLevel: 2,
        evidenceType: 'Historical Text'
      }
    ],
    aiSynthesis: 'Integrative protocols suggest starting with sleep hygiene (Western) and grounding rituals (Ayurveda) before considering pharmacological interventions.',
    escalationTriggers: [
      'Sleep deprivation causing hallucinations',
      'falling asleep while driving',
      'Chronic insomnia > 3 months'
    ]
  },
  {
    id: 'cond-004',
    name: 'Digestive Health (IBS/Bloating)',
    description: 'Chronic bloating, irregular digestion, and discomfort.',
    approaches: [
      {
        tradition: 'ayurveda',
        traditionName: 'Ayurveda',
        diagnosis: 'Agni Mandya (Weak Digestive Fire)',
        approach: 'Reset digestive fire with spices.',
        treatments: [
          {
            name: 'CCF Tea',
            type: 'diet',
            description: 'Cumin, Coriander, Fennel tea to aid digestion.',
            safetyLevel: 'safe',
            safetyNote: 'Safe for daily use.',
            imageUrl: '/images/ayurveda_spices_1768697869474.png',
          }
        ],
        evidenceLevel: 5,
        evidenceType: 'Traditional Practice'
      },
      {
        tradition: 'tcm',
        traditionName: 'Traditional Chinese Medicine',
        diagnosis: 'Spleen Qi Deficiency',
        approach: 'Tonify Spleen and remove dampness.',
        treatments: [
          {
            name: 'Acupuncture (Stomach 36)',
            type: 'therapy',
            description: 'Zusanli point to strengthen digestion and immunity.',
            safetyLevel: 'safe',
            safetyNote: 'Professional administration.',
            imageUrl: '/images/tcm_herbs_acupuncture_1768697856023.png',
          }
        ],
        evidenceLevel: 3,
        evidenceType: 'RCT'
      },
      {
        tradition: 'western',
        traditionName: 'Western Medicine',
        diagnosis: 'Irritable Bowel Syndrome',
        approach: 'Dietary modification (FODMAP) and stress reduction.',
        treatments: [
          {
            name: 'Low FODMAP Diet',
            type: 'diet',
            description: 'Elimination of fermentable carbs.',
            safetyLevel: 'safe',
            safetyNote: 'Consult dietitian for long term.',
            imageUrl: '/images/western_medicine_1768697895807.png',
          }
        ],
        evidenceLevel: 5,
        evidenceType: 'Clinical Guidelines'
      },
      {
        tradition: 'unani',
        traditionName: 'Unani Medicine',
        diagnosis: 'Zuoful Meda',
        approach: 'Strengthening the stomach.',
        treatments: [
          {
            name: 'Cupping Therapy (Hijama)',
            type: 'therapy',
            description: 'Dry cupping on abdomen to stimulate blood flow.',
            safetyLevel: 'caution',
            safetyNote: 'Professional administration only.',
            imageUrl: '/images/unani_cupping_1768695984438.png',
          }
        ],
        evidenceLevel: 4,
        evidenceType: 'Historical Text'
      }
    ],
    aiSynthesis: 'A multi-modal approach focusing on restoring digestive rhythm (Ayurveda) and identifying dietary triggers (Western) offers the best long-term relief.',
    escalationTriggers: [
      'Blood in stool',
      'Unexplained weight loss',
      'Severe abdominal pain'
    ]
  },
  {
    id: 'cond-005',
    name: 'Migraine & Chronic Headaches',
    description: 'Severe, recurring headaches often accompanied by nausea and light sensitivity.',
    approaches: [
      {
        tradition: 'western',
        traditionName: 'Western Medicine',
        diagnosis: 'Migraine with Aura',
        approach: 'Abortive and preventive medication.',
        treatments: [
          {
            name: 'Sumatriptan (Imitrex)',
            type: 'pharmaceutical',
            description: 'Triptan class drug to block pain pathways.',
            safetyLevel: 'caution',
            safetyNote: 'Do not use with SSRIs.',
            imageUrl: '/images/western_pills_1768697895807.png',
          },
          {
            name: 'Ibuprofen',
            type: 'pharmaceutical',
            description: 'NSAID for mild attacks.',
            safetyLevel: 'safe',
            safetyNote: 'Take with food.',
          }
        ],
        evidenceLevel: 5,
        evidenceType: 'Clinical Guidelines'
      },
      {
        tradition: 'tcm',
        traditionName: 'TCM',
        diagnosis: 'Liver Yang Rising',
        approach: 'Anchor Yang and nourish Yin.',
        treatments: [
          {
            name: 'Acupuncture (Liver 3)',
            type: 'therapy',
            description: 'Points to descend energy from the head.',
            safetyLevel: 'safe',
            safetyNote: 'Safe.',
            imageUrl: '/images/tcm_herbs_acupuncture_1768697856023.png',
          }
        ],
        evidenceLevel: 3,
        evidenceType: 'RCT'
      }
    ],
    aiSynthesis: 'Combining acute relief (Western) with preventative stress management (TCM/Ayurveda) is highly effective.',
    escalationTriggers: ['Sudden "worst headache of life"', 'Neurological deficits']
  },
  {
    id: 'cond-006',
    name: 'Mild Depression & Mood',
    description: 'Persistent low mood, lack of energy, and sleep disturbance.',
    approaches: [
      {
        tradition: 'western',
        traditionName: 'Western Medicine',
        diagnosis: 'Major Depressive Disorder',
        approach: 'Neurotransmitter regulation.',
        treatments: [
          {
            name: 'Sertraline (Zoloft)',
            type: 'pharmaceutical',
            description: 'SSRI to increase serotonin.',
            safetyLevel: 'risk',
            safetyNote: 'Monitor for side effects.',
            imageUrl: '/images/western_medicine_1768697895807.png',
          },
          {
            name: 'CBT Therapy',
            type: 'therapy',
            description: 'Cognitive Behavioral Therapy.',
            safetyLevel: 'safe',
            safetyNote: 'None.',
          }
        ],
        evidenceLevel: 5,
        evidenceType: 'Clinical Guidelines'
      },
      {
        tradition: 'ayurveda',
        traditionName: 'Ayurveda',
        diagnosis: 'Kapha Depression',
        approach: 'Stimulate movement and energy.',
        treatments: [
          {
            name: 'Ashwagandha',
            type: 'herb',
            description: 'Adaptogen to stabilize mood and stress.',
            safetyLevel: 'safe',
            safetyNote: 'Avoid in hyperthyroid.',
            imageUrl: '/images/ayurveda_spices_1768697869474.png',
          }
        ],
        evidenceLevel: 4,
        evidenceType: 'Scientific Studies'
      }
    ],
    aiSynthesis: 'Holistic support including therapy and lifestyle changes is crucial alongside any medication.',
    escalationTriggers: ['Suicidal ideation', 'Self-harm']
  }
];

// ============================================
// TIER SYSTEM
// ============================================

export interface TierInfo {
  level: number;
  name: string;
  description: string;
  focus: string;
  icon: string; // Emoji for now
}

export const tierSystem: TierInfo[] = [
  { level: 0, name: 'Foundation', description: 'Sleep, Movement, Nutrition, Breath, Community', focus: 'Stability', icon: '🏠' },
  { level: 1, name: 'Physiologic', description: 'Bio-hacking & optimizing biological function', focus: 'Function', icon: '⚡' },
  { level: 2, name: 'Cultural', description: 'Traditional wisdom practices (Yoga, Qi Gong)', focus: 'Balance', icon: '☯️' },
  { level: 3, name: 'Targeted', description: 'Specific herbs & supplements for issues', focus: 'Correction', icon: '🎯' },
  { level: 4, name: 'Medical', description: 'Professional intervention & pharmaceuticals', focus: 'Rescue', icon: '⚕️' },
];

// ============================================
// ANALYTICS DATA
// ============================================

export const mockAnalytics = {
  foundationTrend: [
    { date: '2025-01-10', score: 65 },
    { date: '2025-01-11', score: 68 },
    { date: '2025-01-12', score: 70 },
    { date: '2025-01-13', score: 69 },
    { date: '2025-01-14', score: 72 },
    { date: '2025-01-15', score: 75 },
    { date: '2025-01-16', score: 78 },
  ],
  symptomTracking: [
    { date: '2025-01-10', painLevel: 7, energy: 4, mood: 5 },
    { date: '2025-01-11', painLevel: 6, energy: 5, mood: 6 },
    { date: '2025-01-12', painLevel: 6, energy: 5, mood: 6 },
    { date: '2025-01-13', painLevel: 5, energy: 6, mood: 7 },
    { date: '2025-01-14', painLevel: 4, energy: 7, mood: 8 },
    { date: '2025-01-15', painLevel: 3, energy: 7, mood: 8 },
    { date: '2025-01-16', painLevel: 3, energy: 8, mood: 9 },
  ],
  interventionEffectiveness: [
    { name: 'Turmeric', improvement: 45, tradition: 'ayurveda' },
    { name: 'Acupuncture', improvement: 60, tradition: 'tcm' },
    { name: 'Physio', improvement: 30, tradition: 'western' },
  ],
  safetyPrevention: {
    rate: 98.5,
    prevented: 12,
    total: 800
  }
};

// ============================================
// PRACTITIONERS DATA
// ============================================

export interface Practitioner {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  availability: string;
  tags: string[];
  tradition: MedicineTradition;
  imageUrl?: string;
}

export const mockPractitioners: Practitioner[] = [
  {
    id: 'prac-001',
    name: 'Dr. Sarah Chen',
    specialty: 'Acupuncture & Herbal Medicine',
    location: 'San Francisco, CA',
    rating: 4.9,
    reviews: 124,
    availability: 'Available Today',
    tags: ['Pain Management', 'Fertility', 'Anxiety'],
    tradition: 'tcm',
    imageUrl: '/images/practitioner_sarah.jpg'
  },
  {
    id: 'prac-002',
    name: 'Dr. Raj Patel',
    specialty: 'Ayurvedic Physician',
    location: 'New York, NY',
    rating: 4.8,
    reviews: 98,
    availability: 'Next Week',
    tags: ['Diet & Nutrition', 'Panchakarma', 'Skin Health'],
    tradition: 'ayurveda',
    imageUrl: '/images/practitioner_raj.jpg'
  },
  {
    id: 'prac-003',
    name: 'Elena Rostova',
    specialty: 'Unani Hakim',
    location: 'London, UK',
    rating: 4.9,
    reviews: 45,
    availability: 'Available Tomorrow',
    tags: ['Cupping Therapy', 'Herbal Tonics'],
    tradition: 'unani'
  },
  {
    id: 'prac-004',
    name: 'Dr. Aarav Patel',
    specialty: 'Ayurvedic Specialist',
    location: 'Mumbai, India',
    rating: 4.7,
    reviews: 200,
    availability: 'Available Today',
    tags: ['Digestive Health', 'Stress Management'],
    tradition: 'ayurveda'
  }
];

export const mockSafetyAlerts: SafetyAlert[] = [
  {
    id: 'alert-001',
    title: 'New Interaction Detected',
    description: 'Potential interaction between Turmeric and blood thinners found in recent study.',
    severity: 'caution',
    timestamp: '2025-01-16T10:00:00Z',
    source: 'WHO Database',
    substances: ['Curcumin', 'Warfarin']
  },
  {
    id: 'alert-002',
    title: 'Safe Combination Verified',
    description: 'Ashwagandha and warm milk (Anupana) verified as synergistic.',
    severity: 'safe',
    timestamp: '2025-01-15T14:30:00Z',
    source: 'Ayurvedic Formulary',
    substances: ['Ashwagandha', 'Milk']
  }
];

export interface WisdomInsight {
  id: string;
  type: 'community' | 'research' | 'personal' | 'seasonal';
  title: string;
  content: string;
  timestamp: string;
  tradition?: MedicineTradition;
  source: string;
}

export const mockWisdomInsights: WisdomInsight[] = [
  {
    id: 'ins-001',
    type: 'seasonal',
    title: 'Winter Solstice Transition',
    content: 'As we move into deep winter, prioritize kidney warmth and root vegetables. The Water element is dominant.',
    timestamp: '2025-01-16T08:00:00Z',
    tradition: 'tcm',
    source: 'Seasonal Almanac'
  },
  {
    id: 'ins-002',
    type: 'research',
    title: 'Ashwagandha & Cortisol',
    content: 'New double-blind study confirms 30% reduction in morning serum cortisol levels with 600mg daily KSM-66.',
    timestamp: '2025-01-15T14:20:00Z',
    tradition: 'ayurveda',
    source: 'Journal of Integrative Med'
  },
  {
    id: 'ins-003',
    type: 'community',
    title: 'Local Herb Walk',
    content: 'Dr. Sarah Jenkins is leading a foraging walk this Saturday at Austin Greenbelt. 5 spots remaining.',
    timestamp: '2025-01-14T09:00:00Z',
    tradition: 'western',
    source: 'Austin Herbal Guild'
  },
  {
    id: 'ins-004',
    type: 'personal',
    title: 'Streak Milestone',
    content: 'You checked in with your emotions 7 days in a row! This consistency builds emotional intelligence.',
    timestamp: '2025-01-16T07:00:00Z',
    source: 'WisdomPath AI'
  }
];


