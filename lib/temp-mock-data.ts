export const additionalConditions = [
    {
        id: 'cond-007',
        name: 'Hypertension (High Blood Pressure)',
        description: 'Chronic elevated blood pressure increasing heart risk.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western Medicine',
                diagnosis: 'Essential Hypertension',
                approach: 'ACE inhibitors and lifestyle.',
                treatments: [
                    { name: 'Lisinopril', type: 'drug', description: 'ACE inhibitor.', safetyLevel: 'safe', safetyNote: 'Monitor Potassium.' },
                    { name: 'Amlodipine', type: 'drug', description: 'Calcium channel blocker.', safetyLevel: 'safe', safetyNote: 'May cause swelling.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            },
            {
                tradition: 'tcm',
                traditionName: 'TCM',
                diagnosis: 'Liver Yang Rising',
                approach: 'Sedate Liver Yang.',
                treatments: [
                    { name: 'Tian Ma Gou Teng Yin', type: 'herb', description: 'Formula to clear heat.', safetyLevel: 'safe', safetyNote: 'Consult practitioner.' }
                ],
                evidenceLevel: 3, evidenceType: 'RCT'
            }
        ],
        aiSynthesis: 'Lifestyle modification is key.',
        escalationTriggers: ['BP > 180/120']
    },
    {
        id: 'cond-008',
        name: 'Type 2 Diabetes',
        description: 'Insulin resistance and high blood sugar.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western Medicine',
                diagnosis: 'Diabetes Mellitus',
                approach: 'Glycemic control.',
                treatments: [
                    { name: 'Metformin', type: 'drug', description: 'First-line medication.', safetyLevel: 'safe', safetyNote: 'GI side effects.' },
                    { name: 'Insulin', type: 'drug', description: 'Hormone replacement.', safetyLevel: 'caution', safetyNote: 'Hypoglycemia risk.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            },
            {
                tradition: 'ayurveda',
                traditionName: 'Ayurveda',
                diagnosis: 'Prameha',
                approach: 'Kapha pacifying diet.',
                treatments: [
                    { name: 'Bitter Melon', type: 'diet', description: 'Lowers blood sugar.', safetyLevel: 'safe', safetyNote: 'Monitor glucose.' },
                    { name: 'Gurmar (Gymnema)', type: 'herb', description: 'Sugar destroyer.', safetyLevel: 'safe', safetyNote: 'None.' }
                ],
                evidenceLevel: 4, evidenceType: 'Studies'
            }
        ],
        aiSynthesis: 'Diet is the cornerstone of management.',
        escalationTriggers: ['Uncontrolled Hyperglycemia']
    },
    {
        id: 'cond-009',
        name: 'Asthma',
        description: 'Airway inflammation and constriction.',
        approaches: [
            {
                tradition: 'western',
                diagnosis: 'Asthma',
                traditionName: 'Western',
                approach: 'Bronchodilators.',
                treatments: [
                    { name: 'Albuterol', type: 'drug', description: 'Rescue inhaler.', safetyLevel: 'safe', safetyNote: 'Jitters.' },
                    { name: 'Fluticasone', type: 'drug', description: 'Steroid inhaler.', safetyLevel: 'safe', safetyNote: 'Rinse mouth.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Avoid triggers.',
        escalationTriggers: ['Status Asthmaticus']
    },
    {
        id: 'cond-010',
        name: 'Osteoarthritis',
        description: 'Joint degeneration and pain.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'OA',
                approach: 'Pain management.',
                treatments: [
                    { name: 'Diclofenac', type: 'drug', description: 'Topical NSAID.', safetyLevel: 'safe', safetyNote: 'Skin irritation.' },
                    { name: 'Naproxen', type: 'drug', description: 'Oral NSAID.', safetyLevel: 'caution', safetyNote: 'Stomach ulcers.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            },
            {
                tradition: 'ayurveda',
                traditionName: 'Ayurveda',
                diagnosis: 'Sandhivata',
                approach: 'Anti-inflammatory.',
                treatments: [
                    { name: 'Turmeric (Curcumin)', type: 'herb', description: 'Potent anti-inflammatory.', safetyLevel: 'safe', safetyNote: 'Blood thinning.' }
                ],
                evidenceLevel: 4, evidenceType: 'Meta-analysis'
            }
        ],
        aiSynthesis: 'Movement and inflammation control.',
        escalationTriggers: ['Immobility']
    },
    {
        id: 'cond-011',
        name: 'Eczema (Atopic Dermatitis)',
        description: 'Itchy, inflamed skin condition.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Eczema',
                approach: 'Moisturizers and steroids.',
                treatments: [
                    { name: 'Hydrocortisone', type: 'drug', description: 'Topical steroid.', safetyLevel: 'safe', safetyNote: 'Skin thinning.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            },
            {
                tradition: 'unani',
                traditionName: 'Unani',
                diagnosis: 'Fasad-e-Dam',
                approach: 'Blood purification.',
                treatments: [
                    { name: 'Neem', type: 'herb', description: 'Antibacterial herb.', safetyLevel: 'safe', safetyNote: 'None.' }
                ],
                evidenceLevel: 3, evidenceType: 'Tradition'
            }
        ],
        aiSynthesis: 'Identify allergens.',
        escalationTriggers: ['Infection']
    },
    {
        id: 'cond-012',
        name: 'Hypothyroidism',
        description: 'Underactive thyroid gland.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Hypothyroid',
                approach: 'Hormone replacement.',
                treatments: [
                    { name: 'Levothyroxine', type: 'drug', description: 'Synthetic T4.', safetyLevel: 'safe', safetyNote: 'Take on empty stomach.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Monitor TSH.',
        escalationTriggers: ['Myxedema']
    },
    {
        id: 'cond-013',
        name: 'GERD (Acid Reflux)',
        description: 'Stomach acid flowing back into esophagus.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'GERD',
                approach: 'Acid suppression.',
                treatments: [
                    { name: 'Omeprazole', type: 'drug', description: 'PPI.', safetyLevel: 'safe', safetyNote: 'Nutrient absorption.' },
                    { name: 'Famotidine', type: 'drug', description: 'H2 blocker.', safetyLevel: 'safe', safetyNote: 'None.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Dietary habits.',
        escalationTriggers: ['Barretts Esophagus']
    },
    {
        id: 'cond-014',
        name: 'High Cholesterol',
        description: 'Elevated lipids in blood.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Hyperlipidemia',
                approach: 'Statins.',
                treatments: [
                    { name: 'Atorvastatin (Lipitor)', type: 'drug', description: 'Statin.', safetyLevel: 'safe', safetyNote: 'Muscle pain.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Diet and exercise.',
        escalationTriggers: ['Heart Attack']
    },
    {
        id: 'cond-015',
        name: 'ADHD',
        description: 'Attention deficit and hyperactivity.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'ADHD',
                approach: 'Stimulants.',
                treatments: [
                    { name: 'Adderall', type: 'drug', description: 'Stimulant.', safetyLevel: 'caution', safetyNote: 'Addictive potential.' },
                    { name: 'Ritalin', type: 'drug', description: 'Stimulant.', safetyLevel: 'caution', safetyNote: 'Insomnia.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Behavioral structure.',
        escalationTriggers: ['Social dysfunction']
    },
    {
        id: 'cond-016',
        name: 'Acne Vulgaris',
        description: 'Skin breakouts.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Acne',
                approach: 'Retinoids.',
                treatments: [
                    { name: 'Isotretinoin (Accutane)', type: 'drug', description: 'Strong retinoid.', safetyLevel: 'risk', safetyNote: 'Birth defects.' },
                    { name: 'Benzoyl Peroxide', type: 'drug', description: 'Antimicrobial.', safetyLevel: 'safe', safetyNote: 'Bleaches fabric.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Skincare routine.',
        escalationTriggers: ['Scarring']
    },
    {
        id: 'cond-017',
        name: 'Menopause Symptoms',
        description: 'Hormonal transition symptoms.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Menopause',
                approach: 'HRT.',
                treatments: [
                    { name: 'Estrogen Patch', type: 'drug', description: 'Hormone therapy.', safetyLevel: 'caution', safetyNote: 'Cancer risk.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            },
            {
                tradition: 'western',
                traditionName: 'Herbal',
                diagnosis: 'Hormone Balance',
                approach: 'Phytoestrogens.',
                treatments: [
                    { name: 'Black Cohosh', type: 'herb', description: 'Relieves hot flashes.', safetyLevel: 'safe', safetyNote: 'Liver safety.' }
                ],
                evidenceLevel: 3, evidenceType: 'Study'
            }
        ],
        aiSynthesis: 'Symptom management.',
        escalationTriggers: ['Osteoporosis']
    },
    {
        id: 'cond-018',
        name: 'PCOS',
        description: 'Polycystic Ovary Syndrome.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'PCOS',
                approach: 'Insulin sensitizers.',
                treatments: [
                    { name: 'Metformin', type: 'drug', description: 'Regulates cycle.', safetyLevel: 'safe', safetyNote: 'GI issues.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Lifestyle and diet.',
        escalationTriggers: ['Infertility']
    },
    {
        id: 'cond-019',
        name: 'Chronic Back Pain',
        description: 'Persistent spinal pain.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Lumbago',
                approach: 'Analgesics.',
                treatments: [
                    { name: 'Tramadol', type: 'drug', description: 'Opioid-like analgesic.', safetyLevel: 'caution', safetyNote: 'Dependency.' },
                    { name: 'Cyclobenzaprine', type: 'drug', description: 'Muscle relaxant.', safetyLevel: 'safe', safetyNote: 'Drowsiness.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Physical therapy.',
        escalationTriggers: ['Nerve damage']
    },
    {
        id: 'cond-020',
        name: 'Seasonal Allergies',
        description: 'Immune response to pollen.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Allergic Rhinitis',
                approach: 'Antihistamines.',
                treatments: [
                    { name: 'Loratadine (Claritin)', type: 'drug', description: 'Antihistamine.', safetyLevel: 'safe', safetyNote: 'None.' },
                    { name: 'Cetirizine (Zyrtec)', type: 'drug', description: 'Antihistamine.', safetyLevel: 'safe', safetyNote: 'Drowsiness.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Avoid allergens.',
        escalationTriggers: ['Anaphylaxis']
    },
    {
        id: 'cond-021',
        name: 'Influenza',
        description: 'Viral respiratory infection.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Flu',
                approach: 'Antivirals.',
                treatments: [
                    { name: 'Oseltamivir (Tamiflu)', type: 'drug', description: 'Antiviral.', safetyLevel: 'safe', safetyNote: 'Take within 48h.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Rest and hydration.',
        escalationTriggers: ['Pneumonia']
    },
    {
        id: 'cond-022',
        name: 'Acute Bronchitis',
        description: 'Chest cold.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Bronchitis',
                approach: 'Symptomatic relief.',
                treatments: [
                    { name: 'Albuterol', type: 'drug', description: 'Bronchodilator.', safetyLevel: 'safe', safetyNote: 'Jitters.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Soothe cough.',
        escalationTriggers: ['Chronic Bronchitis']
    },
    {
        id: 'cond-023',
        name: 'UTI (Urinary Tract Infection)',
        description: 'Bacterial infection of bladder.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Cystitis',
                approach: 'Antibiotics.',
                treatments: [
                    { name: 'Ciprofloxacin', type: 'drug', description: 'Antibiotic.', safetyLevel: 'safe', safetyNote: 'Finish course.' },
                    { name: 'Nitrofurantoin', type: 'drug', description: 'Antibiotic.', safetyLevel: 'safe', safetyNote: 'Urine discoloration.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Hygiene and hydration.',
        escalationTriggers: ['Kidney Infection']
    },
    {
        id: 'cond-024',
        name: 'Kidney Stones',
        description: 'Hard deposits in kidneys.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Nephrolithiasis',
                approach: 'Expulsion therapy.',
                treatments: [
                    { name: 'Tamsulosin', type: 'drug', description: 'Alpha blocker.', safetyLevel: 'safe', safetyNote: 'Dizziness.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Hydration.',
        escalationTriggers: ['Obstruction']
    },
    {
        id: 'cond-025',
        name: 'Gout',
        description: 'Arthritis from uric acid crystals.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Gout',
                approach: 'Urate lowering.',
                treatments: [
                    { name: 'Allopurinol', type: 'drug', description: 'Lowers uric acid.', safetyLevel: 'safe', safetyNote: 'Rash.' },
                    { name: 'Colchicine', type: 'drug', description: 'Acute flare.', safetyLevel: 'caution', safetyNote: 'GI toxicity.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Diet low in purines.',
        escalationTriggers: ['Tophi']
    },
    {
        id: 'cond-026',
        name: 'Fibromyalgia',
        description: 'Widespread muscle pain.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Fibromyalgia',
                approach: 'Nerve pain meds.',
                treatments: [
                    { name: 'Duloxetine (Cymbalta)', type: 'drug', description: 'SNRI.', safetyLevel: 'safe', safetyNote: 'Mood changes.' },
                    { name: 'Lyrica', type: 'drug', description: 'Anticonvulsant.', safetyLevel: 'caution', safetyNote: 'Weight gain.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Gentle movement.',
        escalationTriggers: ['Depression']
    },
    {
        id: 'cond-027',
        name: 'Psoriasis',
        description: 'Autoimmune skin patches.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Psoriasis',
                approach: 'Immune modulation.',
                treatments: [
                    { name: 'Methotrexate', type: 'drug', description: 'Immunosuppressant.', safetyLevel: 'risk', safetyNote: 'Liver toxicity.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Stress management.',
        escalationTriggers: ['Psoriatic Arthritis']
    },
    {
        id: 'cond-028',
        name: 'Bipolar Disorder',
        description: 'Mood swings from mania to depression.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Bipolar I',
                approach: 'Mood stabilizers.',
                treatments: [
                    { name: 'Lithium', type: 'drug', description: 'Mood stabilizer.', safetyLevel: 'risk', safetyNote: 'Narrow therapeutic window.' },
                    { name: 'Lamotrigine', type: 'drug', description: 'Mood stabilizer.', safetyLevel: 'safe', safetyNote: 'Rash.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Strict medication adherence.',
        escalationTriggers: ['Mania']
    },
    {
        id: 'cond-029',
        name: 'Schizophrenia',
        description: 'Psychosis and thought disorder.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Schizophrenia',
                approach: 'Antipsychotics.',
                treatments: [
                    { name: 'Risperidone', type: 'drug', description: 'Antipsychotic.', safetyLevel: 'caution', safetyNote: 'Movement disorders.' },
                    { name: 'Olanzapine', type: 'drug', description: 'Antipsychotic.', safetyLevel: 'caution', safetyNote: 'Metabolic syndrome.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Social support.',
        escalationTriggers: ['Psychotic Break']
    },
    {
        id: 'cond-030',
        name: 'Glaucoma',
        description: 'High eye pressure.',
        approaches: [
            {
                tradition: 'western',
                traditionName: 'Western',
                diagnosis: 'Open Angle Glaucoma',
                approach: 'Pressure lowering drops.',
                treatments: [
                    { name: 'Latanoprost', type: 'drug', description: 'Prostaglandin analog.', safetyLevel: 'safe', safetyNote: 'Eye color change.' }
                ],
                evidenceLevel: 5, evidenceType: 'Guidelines'
            }
        ],
        aiSynthesis: 'Regular checkups.',
        escalationTriggers: ['Vision Loss']
    }
];
