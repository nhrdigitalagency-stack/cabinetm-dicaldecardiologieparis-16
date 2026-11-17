export type Language = 'fr' | 'en';

export interface ExplorationItem {
  id: string;
  number: string;
  title: { fr: string; en: string };
  shortDesc: { fr: string; en: string };
  details: { fr: string; en: string };
  duration: { fr: string; en: string };
  preparation: { fr: string; en: string };
  sameDay: boolean;
  illustrationType: string;
}

export interface PathologyItem {
  id: string;
  number: string;
  title: { fr: string; en: string };
  shortDesc: { fr: string; en: string };
  details: { fr: string; en: string };
  symptoms: { fr: string; en: string };
  prevention: { fr: string; en: string };
  category?: string;
}

export interface ParticularityItem {
  id: string;
  iconName: string;
  title: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  description: { fr: string; en: string };
}

export interface LandmarkItem {
  id: string;
  name: { fr: string; en: string };
  zone: string;
  coordinates: { x: number; y: number };
  isHighlight?: boolean;
}

export interface HealthArticleItem {
  id: string;
  title: { fr: string; en: string };
  summary: { fr: string; en: string };
  content: { fr: string; en: string };
  category: { fr: string; en: string };
  readTime: { fr: string; en: string };
  date: { fr: string; en: string };
  illustrationType:
    | 'sleep-apnea'
    | 'hypertension'
    | 'rhythm'
    | 'stress-test'
    | 'vascular'
    | 'checkup'
    | 'echo-doppler';
  keyTakeaways?: { fr: string[]; en: string[] };
  seoKeywords?: string[];
  relatedExplorationIds?: string[];
  relatedPathologyIds?: string[];
}

export interface TestimonialItem {
  _id: string;
  patientName: string;
  patientRole: string;
  serviceUsed: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AppointmentItem {
  _id: string;
  patientName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  reason?: string;
  explorationOrPathology: string;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  isUrgent?: boolean;
  createdAt: string;
}

export interface ClinicSiteData {
  clinicName: { fr: string; en: string };
  doctorName: string;
  specialty: { fr: string; en: string };
  phone: string;
  whatsappNumber: string;
  email: string;
  addressFull: { fr: string; en: string };
  addressShort: { fr: string; en: string };
  sloganPrimary: { fr: string; en: string };
  sloganSecondary: { fr: string; en: string };
  sleepApneaBanner: { fr: string; en: string };
  sleepApneaSubtext: { fr: string; en: string };
  synthesisParagraph1: { fr: string; en: string };
  synthesisParagraph2: { fr: string; en: string };
  logoUrl: string;
  doctorPortraitUrl: string;
  explorations: ExplorationItem[];
  pathologies: PathologyItem[];
  particularities: ParticularityItem[];
  articles: HealthArticleItem[];
  landmarks: LandmarkItem[];
}

export const INITIAL_CLINIC_DATA: ClinicSiteData = {
  clinicName: {
    fr: 'Cabinet Médical de Cardiologie Paris 16',
    en: 'Paris 16 Cardiology Medical Clinic',
  },
  doctorName: 'Dr Annick TCHAM',
  specialty: {
    fr: 'Médecin Spécialiste en Cardiologie',
    en: 'Specialist Physician in Cardiology',
  },
  phone: '+237 693 44 78 10',
  whatsappNumber: '237693447810',
  email: 'cmc.annicktcham@gmail.com',
  addressFull: {
    fr: 'Fin rue pavée de l’École publique de Bonapriso, groupe 1, Douala — Cameroun',
    en: 'End of paved street of Bonapriso Public School, Group 1, Douala — Cameroon',
  },
  addressShort: {
    fr: 'Fin rue pavée École publique Bonapriso, Douala',
    en: 'End of paved street Bonapriso Public School, Douala',
  },
  sloganPrimary: {
    fr: 'La Santé, Notre Priorité.',
    en: 'Health, Our Priority.',
  },
  sloganSecondary: {
    fr: 'Le Professionnalisme, Notre Obligation.',
    en: 'Professionalism, Our Obligation.',
  },
  sleepApneaBanner: {
    fr: 'Dépistage de l’Apnée du Sommeil par Polygraphie Ventilatoire à Bonapriso',
    en: 'Sleep Apnea Screening with Respiratory Polygraphy in Bonapriso',
  },
  sleepApneaSubtext: {
    fr: 'Vous ronflez, vous vous réveillez fatigué ou avec des maux de tête ? Notre cabinet réalise le dépistage complet sur place le même jour.',
    en: 'Do you snore, wake up fatigued or with morning headaches? Our clinic provides comprehensive on-site sleep testing the same day.',
  },
  synthesisParagraph1: {
    fr: 'Le Dr Annick TCHAM est médecin cardiologue dévouée à la prévention, au diagnostic précoce et à la prise en charge personnalisée des pathologies cardiovasculaires à Douala, Cameroun.',
    en: 'Dr Annick TCHAM is a dedicated cardiologist committed to prevention, early diagnosis, and personalized cardiovascular care in Douala, Cameroon.',
  },
  synthesisParagraph2: {
    fr: 'Implanté à Bonapriso, le Cabinet Médical de Cardiologie Paris 16 dispose d’un plateau technique d’imagerie et d’exploration moderne pour réaliser vos bilans cardiaques complets sans multiplication de vos trajets.',
    en: 'Located in Bonapriso, Paris 16 Cardiology Clinic gathers a state-of-the-art diagnostic platform on-site, allowing comprehensive cardiac workups without multiple trips across town.',
  },
  logoUrl: '/assets/aistudio/Logo_de_cardiologie_moderne___Paris_16_65e1e514.png',
  doctorPortraitUrl:
    '/assets/aistudio/Portrait_professionnel_d_une_m_decin_africaine_itin_rante_4dbc2b99.png',

  explorations: [
    {
      id: 'ecg-12',
      number: '01',
      title: {
        fr: 'Électrocardiogramme (ECG 12 Dérivations)',
        en: '12-Lead Electrocardiogram (ECG)',
      },
      shortDesc: {
        fr: 'Tracé électrique immédiat au repos pour analyser le rythme et détecter l’ischémie.',
        en: 'Immediate resting electrical trace to analyze heart rhythm and detect ischemia.',
      },
      details: {
        fr: 'Examen de référence indolore et rapide enregistrant l’activité électrique du cœur sur 12 dérivations. Détecte les troubles du rythme, les blocs de conduction, les signes d’hypertrophie ou d’infarctus.',
        en: 'Painless, reference exam recording electrical heart activity across 12 leads. Detects arrhythmias, conduction blocks, ventricular hypertrophy, and ischemic changes.',
      },
      duration: { fr: '10 à 15 minutes', en: '10 to 15 minutes' },
      preparation: { fr: 'Aucune préparation particulière requise.', en: 'No special preparation needed.' },
      sameDay: true,
      illustrationType: 'ecg',
    },
    {
      id: 'echocardiographie-doppler',
      number: '02',
      title: {
        fr: 'Échocardiographie Doppler Couleur',
        en: 'Color Doppler Echocardiography',
      },
      shortDesc: {
        fr: 'Échographie du cœur pour évaluer les cavités, les valves et la fonction contractile.',
        en: 'Ultrasound exam evaluating heart chambers, valves, and contractile function.',
      },
      details: {
        fr: 'Examen ultrasonore de pointe visualisant en temps réel les parois cardiaques, la contraction du ventricule gauche et les flux sanguins valvulaires grâce au Doppler couleur pulsé et continu.',
        en: 'Advanced ultrasound examination assessing cardiac walls, left ventricular function, and blood flow through valves in real time.',
      },
      duration: { fr: '25 à 35 minutes', en: '25 to 35 minutes' },
      preparation: { fr: 'Torse nu, examen indolore sans injection.', en: 'Bare chest, painless non-invasive exam.' },
      sameDay: true,
      illustrationType: 'echo-doppler',
    },
    {
      id: 'holter-ecg',
      number: '03',
      title: {
        fr: 'Holter ECG (24h à 72h)',
        en: 'Holter ECG (24h to 72h)',
      },
      shortDesc: {
        fr: 'Enregistrement continu du rythme cardiaque pendant vos activités quotidiennes.',
        en: 'Continuous recording of heart rhythm during daily activities.',
      },
      details: {
        fr: 'Boîtier miniature léger fixé au thorax pour enregistrer chaque battement jour et nuit. Idéal pour explorer les palpitations, malaises inexpliqués, syncopes ou surveiller un traitement antiarythmique.',
        en: 'Lightweight miniature recorder worn on chest to record every beat 24h-72h. Ideal for palpitations, dizzy spells, syncope, or monitoring arrhythmia therapy.',
      },
      duration: { fr: 'Pose en 15 min · Enregistrement 24h à 72h', en: '15 min setup · 24h to 72h recording' },
      preparation: { fr: 'Porter des vêtements amples, éviter de mouiller le boîtier.', en: 'Wear loose clothing, avoid wetting the monitor.' },
      sameDay: true,
      illustrationType: 'holter-ecg',
    },
    {
      id: 'holter-tensionnel-mapa',
      number: '04',
      title: {
        fr: 'Holter Tensionnel (MAPA 24h)',
        en: 'Blood Pressure Holter (24h ABPM)',
      },
      shortDesc: {
        fr: 'Mesure automatique de la tension artérielle sur 24h de jour comme de nuit.',
        en: 'Automated 24-hour blood pressure measurement day and night.',
      },
      details: {
        fr: 'Mesure ambulatoire de la pression artérielle (MAPA) confirmant le diagnostic d’hypertension artérielle, dépistant l’effet blouse blanche, l’HTA masquée et évaluant le profil tensionnel nocturne.',
        en: 'Ambulatory blood pressure monitoring confirming hypertension, detecting white-coat or masked hypertension, and checking nocturnal dipping.',
      },
      duration: { fr: 'Pose en 10 min · Enregistrement 24 heures', en: '10 min setup · 24-hour recording' },
      preparation: { fr: 'Garder le brassard au bras pendant 24h, tenir un carnet d’activités.', en: 'Keep arm cuff on for 24h, keep activity log.' },
      sameDay: true,
      illustrationType: 'mapa',
    },
    {
      id: 'epreuve-effort',
      number: '05',
      title: {
        fr: 'Épreuve d’Effort Cardiologique',
        en: 'Cardiac Stress Test',
      },
      shortDesc: {
        fr: 'Test sur cyclo-ergomètre avec surveillance ECG continue sous charge d’effort.',
        en: 'Exercise test on cycle ergometer with continuous ECG monitoring.',
      },
      details: {
        fr: 'Évaluation des capacités coronaires et cardiorespiratoires sous effort physique progressif. Permet de démasquer une ischémie myocardique, d’évaluer la tolérance à l’effort et d’adapter l’activité sportive.',
        en: 'Assessment of coronary and cardiorespiratory response under progressive exercise. Unmasks myocardial ischemia, evaluates exercise tolerance, guides athletic clearance.',
      },
      duration: { fr: '30 à 45 minutes', en: '30 to 45 minutes' },
      preparation: { fr: 'Tenue de sport confortable, éviter un repas copieux juste avant.', en: 'Comfortable workout clothes, avoid heavy meals right before.' },
      sameDay: true,
      illustrationType: 'stress-test',
    },
    {
      id: 'doppler-vasculaire',
      number: '06',
      title: {
        fr: 'Écho-Doppler Vasculaire (Carotides & Membres)',
        en: 'Vascular Color Doppler (Carotid & Limbs)',
      },
      shortDesc: {
        fr: 'Exploration des artères carotides et vaisseaux périphériques pour prévenir les AVC.',
        en: 'Exploration of carotid arteries and peripheral vessels to prevent stroke.',
      },
      details: {
        fr: 'Examen échographique visualisant la paroi des artères carotides, vertébrales et des membres. Mesure l’épaisseur intima-média, repère les plaques d’athérome et prévient les accidents vasculaires cérébraux.',
        en: 'Ultrasound examination of carotid and peripheral vessels, measuring intima-media thickness, plaque presence, and preventing stroke.',
      },
      duration: { fr: '20 à 30 minutes', en: '20 to 30 minutes' },
      preparation: { fr: 'Aucune préparation particulière requise.', en: 'No special preparation needed.' },
      sameDay: true,
      illustrationType: 'vascular',
    },
    {
      id: 'echographie-transoesophagienne-eto',
      number: '07',
      title: {
        fr: 'Échographie Trans-Œsophagienne (ETO)',
        en: 'Transesophageal Echocardiography (TEE)',
      },
      shortDesc: {
        fr: 'Sonde ultrasonore à proximité immédiate du cœur pour une précision millimétrique.',
        en: 'Ultrasound probe placed close to the heart for millimeter precision.',
      },
      details: {
        fr: 'Examen approfondi permettant de visualiser avec une clarté exceptionnelle les valves cardiaques, l’auricule gauche et l’aorte thoracique. Recherche de thrombus, d’endocardite ou de shunt intracardiaque.',
        en: 'In-depth ultrasound providing exceptional visualization of valves, left atrial appendage, and thoracic aorta. Searches for clots, endocarditis, or shunts.',
      },
      duration: { fr: '30 minutes', en: '30 minutes' },
      preparation: { fr: 'À jeun strict 4 à 6 heures avant l’examen.', en: 'Strict fasting 4 to 6 hours before procedure.' },
      sameDay: false,
      illustrationType: 'eto',
    },
    {
      id: 'polygraphie-ventilatoire',
      number: '08',
      title: {
        fr: 'Polygraphie Ventilatoire Nocturne (Apnée du Sommeil)',
        en: 'Nocturnal Respiratory Polygraphy (Sleep Apnea)',
      },
      shortDesc: {
        fr: 'Dépistage nocturne à domicile des arrêts respiratoires et de la baisse d’oxygène.',
        en: 'Nocturnal home screening for breathing pauses and oxygen desaturations.',
      },
      details: {
        fr: 'Enregistrement du débit respiratoire, des mouvements thoraciques, des ronflements et de la saturation en oxygène pendant la nuit à domicile. Confirme le diagnostic du syndrome d’apnées obstructives du sommeil (SAOS).',
        en: 'Home recording of respiratory airflow, chest effort, snoring, and blood oxygen levels throughout sleep. Confirms obstructive sleep apnea diagnosis.',
      },
      duration: { fr: 'Explication en consultation · Nuit d’enregistrement', en: 'Clinic setup · Overnight sleep study' },
      preparation: { fr: 'Boîtier autonome simple à positionner chez soi au coucher.', en: 'Simple wearable kit placed at bedtime at home.' },
      sameDay: true,
      illustrationType: 'polygraphie',
    },
  ],

  pathologies: [
    {
      id: 'hta',
      number: '01',
      category: 'hypertension',
      title: {
        fr: 'Hypertension Artérielle (HTA)',
        en: 'Arterial Hypertension',
      },
      shortDesc: {
        fr: 'Dépistage précoce, bilan de retentissement et équilibre tensionnel personnalisé.',
        en: 'Early screening, organ damage workup, and personalized blood pressure control.',
      },
      details: {
        fr: 'L’hypertension est la première maladie cardiovasculaire en Afrique subsaharienne. Souvent silencieuse, elle fragilise le cœur, les reins et les artères cérébrales si elle n’est pas rigoureusement contrôlée.',
        en: 'Hypertension is the leading cardiovascular disease in sub-Saharan Africa. Often silent, it damages the heart, kidneys, and brain vessels without strict management.',
      },
      symptoms: {
        fr: 'Maux de tête matinaux, vertiges, bourdonnements d’oreille, essoufflement à l’effort, fatigue anormale.',
        en: 'Morning headaches, dizziness, tinnitus, exertional shortness of breath, unusual fatigue.',
      },
      prevention: {
        fr: 'Contrôle régulier, réduction du sel et du bouillon cube, activité physique, bilan MAPA 24h et écho cardiaque.',
        en: 'Regular checks, sodium restriction, exercise, 24h ABPM verification, and echocardiography.',
      },
    },
    {
      id: 'insuffisance-cardiaque',
      number: '02',
      category: 'heart-failure',
      title: {
        fr: 'Insuffisance Cardiaque',
        en: 'Heart Failure',
      },
      shortDesc: {
        fr: 'Diagnostic précis par échocardiographie Doppler et optimisation thérapeutique.',
        en: 'Precise echo diagnosis and tailored guideline-directed medical therapy.',
      },
      details: {
        fr: 'Incapacité du cœur à pomper suffisamment de sang pour couvrir les besoins de l’organisme, consécutive à une HTA ancienne ou une atteinte du muscle cardiaque.',
        en: 'Inability of the heart to pump enough blood for bodily needs, often following long-standing hypertension or myocardial disease.',
      },
      symptoms: {
        fr: 'Essoufflement progressif, gonflement des chevilles et des jambes, fatigue intense au moindre effort.',
        en: 'Progressive shortness of breath, swollen ankles and legs, severe exertional fatigue.',
      },
      prevention: {
        fr: 'Contrôle strict de la tension, pesée quotidienne, respect du traitement et régime peu salé.',
        en: 'Strict BP control, daily weighing, medication adherence, low-sodium diet.',
      },
    },
    {
      id: 'arythmies-palpitations',
      number: '03',
      category: 'rhythm',
      title: {
        fr: 'Troubles du Rythme & Palpitations',
        en: 'Arrhythmias & Palpitations',
      },
      shortDesc: {
        fr: 'Enregistrement Holter ECG pour identifier fibrillation atriale et extrasystoles.',
        en: 'Holter ECG monitoring to diagnose atrial fibrillation and premature beats.',
      },
      details: {
        fr: 'Battements trop rapides, trop lents ou désordonnés. La fibrillation atriale non diagnostiquée multiplie par 5 le risque d’accident vasculaire cérébral (AVC).',
        en: 'Heartbeats that are irregular, too fast, or too slow. Undiagnosed atrial fibrillation increases stroke risk fivefold.',
      },
      symptoms: {
        fr: 'Palpitations, sensation de cœur qui s’emballe, malaises, vertiges, essoufflement soudain.',
        en: 'Palpitations, racing heartbeat, near-fainting, dizziness, sudden shortness of breath.',
      },
      prevention: {
        fr: 'Holter ECG 24h-72h, limitation des stimulants et de l’alcool, bilan électrolytique.',
        en: '24h-72h Holter ECG, limiting stimulants and alcohol, electrolyte check.',
      },
    },
    {
      id: 'angor-angine-poitrine',
      number: '04',
      category: 'coronary',
      title: {
        fr: 'Angine de Poitrine (Angor)',
        en: 'Angina Pectoris',
      },
      shortDesc: {
        fr: 'Dépistage de l’ischémie coronarienne par ECG, épreuve d’effort et bilan lipidique.',
        en: 'Coronary ischemia screening via ECG, stress test, and lipid profiling.',
      },
      details: {
        fr: 'Douleur ou serrement thoracique survenant lorsque les artères coronaires sont rétrécies par des plaques de cholestérol et n’apportent plus assez d’oxygène au cœur.',
        en: 'Chest discomfort or tightness occurring when coronary arteries are narrowed by cholesterol plaques, starving heart muscle of oxygen.',
      },
      symptoms: {
        fr: 'Douleur d’écrasement ou d’oppression rétro-sternale irradiant vers le bras gauche ou la mâchoire.',
        en: 'Crushing chest tightness radiating to the left arm, neck, or jaw.',
      },
      prevention: {
        fr: 'Contrôle du cholestérol, arrêt du tabac, dépistage du diabète et épreuve d’effort.',
        en: 'Cholesterol control, smoking cessation, diabetes screening, and stress testing.',
      },
    },
    {
      id: 'infarctus-myocarde',
      number: '05',
      category: 'coronary',
      title: {
        fr: 'Infarctus du Myocarde & Post-Infarctus',
        en: 'Myocardial Infarction & Recovery',
      },
      shortDesc: {
        fr: 'Prévention secondaire, surveillance échographique et réadaptation cardiologique.',
        en: 'Secondary prevention, echocardiographic monitoring, and cardiac rehab.',
      },
      details: {
        fr: 'Obstruction aiguë d’une artère coronaire. Notre cabinet assure le bilan post-infarctus, la prévention des récidives et l’adaptation précise des protecteurs cardiovasculaires.',
        en: 'Acute blockage of a coronary artery. Our clinic provides post-MI workups, secondary prevention, and precise pharmacological optimization.',
      },
      symptoms: {
        fr: 'Douleur thoracique violente et prolongée, sueurs froides, angoisse, nausées.',
        en: 'Severe prolonged chest crushing pain, cold sweats, anxiety, nausea.',
      },
      prevention: {
        fr: 'Observance stricte du traitement antiagrégant, contrôle de la tension et suivi régulier.',
        en: 'Strict antiplatelet adherence, BP control, and regular cardiac checkups.',
      },
    },
    {
      id: 'avc-prevention',
      number: '06',
      category: 'vascular',
      title: {
        fr: 'Prévention de l’Accident Vasculaire Cérébral (AVC)',
        en: 'Stroke Prevention',
      },
      shortDesc: {
        fr: 'Bilan étiologique complet : écho-doppler des carotides et recherche d’arythmie.',
        en: 'Comprehensive etiologic workup: carotid Doppler and rhythm monitoring.',
      },
      details: {
        fr: 'L’AVC est souvent d’origine cardiovasculaire (embolie d’un caillot formé dans l’oreillette gauche ou fragmentation d’une plaque carotidienne sténosante).',
        en: 'Stroke often originates in the cardiovascular system (cardioembolic clot from the atrium or carotid plaque embolization).',
      },
      symptoms: {
        fr: 'Faiblesse ou paralysie brutale d’un côté du visage ou du corps, difficulté d’élocution.',
        en: 'Sudden weakness/numbness on one side of face/body, speech difficulty.',
      },
      prevention: {
        fr: 'Écho-Doppler des vaisseaux du cou, dépistage de l’arythmie (Holter) et équilibre tensionnel.',
        en: 'Carotid ultrasound, Holter ECG for occult arrhythmia, and strict BP control.',
      },
    },
    {
      id: 'embolie-pulmonaire',
      number: '07',
      category: 'vascular',
      title: {
        fr: 'Thrombose Veineuse & Embolie Pulmonaire',
        en: 'Venous Thrombosis & Pulmonary Embolism',
      },
      shortDesc: {
        fr: 'Écho-Doppler veineux des membres inférieurs et suivi anticoagulant rigoureux.',
        en: 'Lower limb venous Doppler and rigorous anticoagulation management.',
      },
      details: {
        fr: 'Formation d’un caillot (thrombose) dans les veines profondes des jambes risquant de migrer vers les artères pulmonaires.',
        en: 'Blood clot formation in deep leg veins that may migrate and obstruct pulmonary arteries.',
      },
      symptoms: {
        fr: 'Douleur et gonflement d’un mollet, essoufflement soudain, douleur thoracique brutale.',
        en: 'Calf swelling and pain, sudden unexplained shortness of breath, pleuritic chest pain.',
      },
      prevention: {
        fr: 'Hydratation, bas de compression lors des voyages, mobilité et écho-Doppler précoce.',
        en: 'Hydration, compression socks when traveling, active mobility, early Doppler.',
      },
    },
    {
      id: 'apnee-du-sommeil',
      number: '08',
      category: 'sleep-apnea',
      title: {
        fr: 'Syndrome d’Apnées Obstructives du Sommeil (SAOS)',
        en: 'Obstructive Sleep Apnea (OSA)',
      },
      shortDesc: {
        fr: 'Dépistage ambulatoire complet par polygraphie ventilatoire nocturne à domicile.',
        en: 'Full ambulatory screening via overnight home respiratory polygraphy.',
      },
      details: {
        fr: 'Arrêts respiratoires répétés pendant le sommeil favorisant l’hypertension réfractaire, les troubles du rythme et l’accident vasculaire cérébral.',
        en: 'Repetitive breathing pauses during sleep fueling refractory hypertension, nocturnal arrhythmias, and stroke risk.',
      },
      symptoms: {
        fr: 'Ronflements sonores, pauses respiratoires constatées par le conjoint, fatigue au réveil, somnolence diurne.',
        en: 'Loud snoring, witnessed pauses, unrefreshing sleep, daytime sleepiness.',
      },
      prevention: {
        fr: 'Polygraphie ventilatoire nocturne, gestion du poids, appareillage CPAP si indiqué.',
        en: 'Nocturnal polygraphy, weight management, CPAP therapy when indicated.',
      },
    },
  ],

  particularities: [
    {
      id: 'ecoute',
      iconName: 'heart-handshake',
      title: {
        fr: 'Accueil & Écoute Sans Précipitation',
        en: 'Warm Welcome & Unhurried Listening',
      },
      subtitle: {
        fr: 'Temps dédié à chaque patient',
        en: 'Dedicated time for every patient',
      },
      description: {
        fr: 'Chaque consultation prend le temps nécessaire pour écouter vos symptômes, retracer vos antécédents et vous expliquer clairement les résultats.',
        en: 'Every consultation takes all the necessary time to listen to your history, assess symptoms, and explain results clearly.',
      },
    },
    {
      id: 'technologie',
      iconName: 'cpu',
      title: {
        fr: 'Technologie de Pointe Sur Place',
        en: 'Advanced On-Site Technology',
      },
      subtitle: {
        fr: 'Bilan complet le même jour',
        en: 'Full same-day diagnostic suite',
      },
      description: {
        fr: 'ECG, Échocardiographie Doppler, Holter ECG, MAPA et Polygraphie ventilatoire réunis au cabinet à Bonapriso.',
        en: 'ECG, Doppler Echo, Holter, ABPM, and Respiratory Polygraphy gathered at our clinic in Bonapriso.',
      },
    },
    {
      id: 'suivi',
      iconName: 'phone-call',
      title: {
        fr: 'Suivi Téléphonique Dédié',
        en: 'Dedicated Telephone Follow-Up',
      },
      subtitle: {
        fr: 'Accompagnement continu',
        en: 'Continuous patient support',
      },
      description: {
        fr: 'Un accompagnement après la consultation avec rappels de contrôles, conseils d’observance et suivi attentif de votre traitement.',
        en: 'Post-consultation support with checkup reminders, adherence advice, and attentive monitoring of your treatment.',
      },
    },
    {
      id: 'rapidite',
      iconName: 'zap',
      title: {
        fr: 'Rapidité & Réactivité',
        en: 'Speed & Responsiveness',
      },
      subtitle: {
        fr: 'Prise en charge rapide',
        en: 'Fast scheduling and emergencies',
      },
      description: {
        fr: 'Prise de rendez-vous fluide, comptes-rendus immédiats et créneaux réservés aux urgences cardiologiques.',
        en: 'Smooth appointment booking, immediate clinical reports, and priority slots for cardiac emergencies.',
      },
    },
  ],

  articles: [
    {
      id: 'apnee-sommeil-hypertension',
      illustrationType: 'sleep-apnea',
      title: {
        fr: 'Apnée du Sommeil et Hypertension Résistante : Le Lien Souvent Méconnu',
        en: 'Sleep Apnea and Resistant Hypertension: The Overlooked Connection',
      },
      category: {
        fr: 'Apnée du Sommeil',
        en: 'Sleep Apnea',
      },
      date: {
        fr: '12 Novembre 2026',
        en: 'November 12, 2026',
      },
      readTime: {
        fr: '5 min de lecture',
        en: '5 min read',
      },
      summary: {
        fr: 'Pourquoi une tension artérielle reste-t-elle élevée malgré 2 ou 3 médicaments ? L’apnée du sommeil est la première cause secondaire curable.',
        en: 'Why does blood pressure remain high despite multiple medications? Sleep apnea is the leading curable secondary cause.',
      },
      content: {
        fr: 'Lors de chaque pause respiratoire nocturne, l’organisme subit une chute brutale d’oxygène (hypoxie) stimulant une décharge intense d’adrénaline. Cette poussée hypertensive répétée plusieurs dizaines de fois par nuit empêche le repos cardiovasculaire nocturne. Une polygraphie ventilatoire permet de poser le diagnostic et de restaurer un sommeil réparateur.',
        en: 'During each nocturnal apnea, the body experiences oxygen drops that trigger adrenaline surges. Repeating dozens of times per night, these spikes prevent nocturnal blood pressure dipping. A respiratory polygraphy confirms the diagnosis and helps restore restorative sleep.',
      },
      keyTakeaways: {
        fr: [
          'Le ronflement sévère et la fatigue au réveil sont des signes cardinaux.',
          'L’apnée aggrave le risque d’AVC et de fibrillation atriale.',
          'Le dépistage se fait en une nuit à domicile à Bonapriso.',
        ],
        en: [
          'Severe snoring and morning fatigue are major red flags.',
          'Apnea increases stroke and atrial fibrillation risks.',
          'Screening is completed overnight at home in Bonapriso.',
        ],
      },
      seoKeywords: [
        'apnée du sommeil Douala',
        'polygraphie ventilatoire Cameroun',
        'hypertension résistante Bonapriso',
        'SAOS cardiologue',
      ],
      relatedExplorationIds: ['polygraphie-ventilatoire', 'holter-tensionnel-mapa'],
      relatedPathologyIds: ['apnee-du-sommeil', 'hta'],
    },
    {
      id: 'mapa-vs-tension-cabinet',
      illustrationType: 'hypertension',
      title: {
        fr: 'Pourquoi la Mesure Ambulatoire (MAPA 24h) est Supérieure à la Tension Prise au Cabinet',
        en: 'Why Ambulatory BP Monitoring (24h ABPM) Outperforms Clinic Readings',
      },
      category: {
        fr: 'Hypertension & MAPA',
        en: 'Hypertension & ABPM',
      },
      date: {
        fr: '08 Novembre 2026',
        en: 'November 8, 2026',
      },
      readTime: {
        fr: '4 min de lecture',
        en: '4 min read',
      },
      summary: {
        fr: 'L’effet "blouse blanche" peut fausser jusqu’à 25 % des consultations. Découvrez l’intérêt du Holter tensionnel 24h.',
        en: 'White-coat hypertension affects up to 25% of clinical visits. Discover how 24h ABPM provides accurate diagnostic clarity.',
      },
      content: {
        fr: 'Une tension ponctuelle ne reflète pas vos variations quotidiennes. Le Holter tensionnel enregistre automatiquement votre pression toutes les 15 minutes le jour et 30 minutes la nuit. Il permet de repérer l’HTA masquée et l’absence de baisse tensionnelle nocturne (non-dipping), marqueur majeur de risque cardiovasculaire.',
        en: 'A single office reading cannot capture circadian variations. ABPM records blood pressure every 15 minutes during the day and 30 minutes at night, uncovering masked hypertension and non-dipping patterns.',
      },
      keyTakeaways: {
        fr: [
          'Élimine l’anxiété liée à la mesure médicale (blouse blanche).',
          'Analyse la baisse tensionnelle nocturne essentielle pour le cœur.',
          'Pose et restitution le même jour au cabinet à Bonapriso.',
        ],
        en: [
          'Eliminates anxiety-driven office spikes.',
          'Analyzes vital nighttime blood pressure dipping.',
          'Setup and report available directly in Bonapriso.',
        ],
      },
      seoKeywords: ['MAPA Douala', 'Holter tensionnel Bonapriso', 'HTA blouse blanche Cameroun'],
      relatedExplorationIds: ['holter-tensionnel-mapa', 'echocardiographie-doppler'],
      relatedPathologyIds: ['hta', 'insuffisance-cardiaque'],
    },
    {
      id: 'palpitations-holter-ecg',
      illustrationType: 'rhythm',
      title: {
        fr: 'Palpitations et Battements Irréguliers : Quand s’Inquiéter et Pourquoi Poser un Holter ECG ?',
        en: 'Palpitations & Irregular Beats: Warning Signs and When to Wear a Holter',
      },
      category: {
        fr: 'Rythmologie & Holter',
        en: 'Arrhythmia & Holter',
      },
      date: {
        fr: '02 Novembre 2026',
        en: 'November 2, 2026',
      },
      readTime: {
        fr: '6 min de lecture',
        en: '6 min read',
      },
      summary: {
        fr: 'Un cœur qui s’emballe ou saute des battements ? Apprenez à distinguer l’extrasystole bénigne de la fibrillation atriale.',
        en: 'A racing or skipping heart? Learn how to distinguish harmless premature beats from dangerous atrial fibrillation.',
      },
      content: {
        fr: 'Les palpitations intermittentes disparaissent souvent dès que le patient arrive au cabinet. Le Holter ECG portable permet d’enregistrer 100 000 battements sur 24 à 72 heures sans gêner vos activités quotidiennes, identifiant la cause précise de vos symptômes.',
        en: 'Intermittent arrhythmias often subside before arriving at a clinic. A wearable 24h-72h Holter records 100,000 beats during normal life, capturing elusive arrhythmias.',
      },
      keyTakeaways: {
        fr: [
          'L’ECG standard au repos est souvent normal lors de crises fugaces.',
          'Le Holter 24h-72h capture l’arythmie en conditions réelles de vie.',
          'Dépistage précoce indispensable pour prévenir les AVC.',
        ],
        en: [
          'Standard resting ECG is often normal between episodes.',
          'Wearable Holter captures anomalies in real daily conditions.',
          'Crucial early screening to prevent embolic stroke.',
        ],
      },
      seoKeywords: [
        'Holter ECG Douala',
        'arythmie cardiaque Bonapriso',
        'fibrillation atriale Cameroun',
      ],
      relatedExplorationIds: ['holter-ecg', 'ecg-12'],
      relatedPathologyIds: ['arythmies-palpitations', 'avc-prevention'],
    },
    {
      id: 'douleur-thoracique-effort',
      illustrationType: 'stress-test',
      title: {
        fr: 'Douleurs Thoraciques à l’Effort : Comment Démasquer l’Angine de Poitrine ?',
        en: 'Exertional Chest Pain: How Stress Testing Unmasks Angina Pectoris',
      },
      category: {
        fr: 'Effort & Coronaires',
        en: 'Exercise & Coronary',
      },
      date: {
        fr: '26 Octobre 2026',
        en: 'October 26, 2026',
      },
      readTime: {
        fr: '5 min de lecture',
        en: '5 min read',
      },
      summary: {
        fr: 'Un serrement dans la poitrine lors de la marche rapide ou de la montée d’escaliers ? Évaluez vos artères coronaires.',
        en: 'Chest tightness when climbing stairs or walking briskly? Evaluate your coronary reserve with dedicated exercise testing.',
      },
      content: {
        fr: 'Au repos, le cœur peut recevoir suffisamment d’oxygène malgré une artère rétrécie. C’est lors de l’effort physique que l’ischémie myocardique se révèle sur le tracé électrique continu. L’épreuve d’effort cardiologique permet d’orienter la stratégie thérapeutique avant l’accident aigu.',
        en: 'At rest, heart muscle may receive adequate oxygen even with narrow coronary arteries. During graded exercise, myocardial ischemia manifests on continuous ECG, enabling timely revascularization.',
      },
      keyTakeaways: {
        fr: [
          'Toute oppression thoracique d’effort nécessite un avis cardiologique.',
          'L’épreuve d’effort teste la tolérance myocardique sous charge continue.',
          'Permet de sécuriser la reprise du sport ou le suivi coronaire.',
        ],
        en: [
          'Any exertional chest oppression demands urgent cardiac review.',
          'Stress test challenges myocardial reserve safely on-site.',
          'Secures safe return to athletic activities and work.',
        ],
      },
      seoKeywords: [
        'épreuve d’effort Douala',
        'angine de poitrine Cameroun',
        'cardiologue Bonapriso sport',
      ],
      relatedExplorationIds: ['epreuve-effort', 'ecg-12'],
      relatedPathologyIds: ['angor-angine-poitrine', 'infarctus-myocarde'],
    },
    {
      id: 'prevention-avc-doppler',
      illustrationType: 'vascular',
      title: {
        fr: 'Prévention de l’AVC : Pourquoi Surveiller ses Artères Carotides par Écho-Doppler ?',
        en: 'Stroke Prevention: Why Check Carotid Arteries with Ultrasound Doppler',
      },
      category: {
        fr: 'AVC & Doppler Vasculaire',
        en: 'Stroke & Vascular',
      },
      date: {
        fr: '18 Octobre 2026',
        en: 'October 18, 2026',
      },
      readTime: {
        fr: '4 min de lecture',
        en: '4 min read',
      },
      summary: {
        fr: 'Les sténoses carotidiennes sont responsables d’un quart des AVC ischémiques. Un examen indolore de 20 minutes permet de les dépister.',
        en: 'Carotid artery narrowing causes a quarter of ischemic strokes. A 20-minute painless ultrasound provides essential screening.',
      },
      content: {
        fr: 'Les artères carotides amènent le sang oxygéné au cerveau. Avec les années, le tabac, l’hypertension ou le cholestérol, des plaques athéromateuses peuvent s’y former. L’écho-Doppler vasculaire visualise l’intérieur du vaisseau et mesure la vitesse du flux sanguin.',
        en: 'Carotid arteries supply oxygenated blood to the brain. Over time, high blood pressure and cholesterol foster atherosclerotic plaques. Color Doppler visualizes vessel lumen and flow velocity with pinpoint accuracy.',
      },
      keyTakeaways: {
        fr: [
          'Examen ultrasonore totalement indolore, sans produit de contraste.',
          'Dépiste les plaques vulnérables avant la survenue d’un accident neurologique.',
          'Recommandé après 50 ans en cas d’HTA, tabac ou diabète.',
        ],
        en: [
          'Completely painless ultrasound without contrast injection.',
          'Detects vulnerable plaques before clinical neurological events.',
          'Recommended after 50 for patients with BP, smoking, or diabetes.',
        ],
      },
      seoKeywords: [
        'écho doppler carotides Douala',
        'prévention AVC Cameroun',
        'doppler vasculaire Bonapriso',
      ],
      relatedExplorationIds: ['doppler-vasculaire', 'echocardiographie-doppler'],
      relatedPathologyIds: ['avc-prevention', 'hta'],
    },
    {
      id: 'bilan-cardiologique-meme-jour',
      illustrationType: 'checkup',
      title: {
        fr: 'Le Bilan Cardiologique Complet le Même Jour : Pourquoi Centraliser vos Examens ?',
        en: 'Comprehensive Same-Day Cardiac Workup: The Benefits of Centralized Care',
      },
      category: {
        fr: 'Bilan Même Jour',
        en: 'Same-Day Workup',
      },
      date: {
        fr: '10 Octobre 2026',
        en: 'October 10, 2026',
      },
      readTime: {
        fr: '4 min de lecture',
        en: '4 min read',
      },
      summary: {
        fr: 'Fini les semaines d’attente et les déplacements multiples : consultation, ECG, Échocardiographie et pose de Holter réunis à Bonapriso.',
        en: 'No more weeks of waiting and cross-city travel: consultation, ECG, Echo, and Holter gathered in one single visit.',
      },
      content: {
        fr: 'Au Cabinet Médical de Cardiologie Paris 16, nous avons conçu un parcours patient optimisé où le médecin réalise lui-même vos explorations lors de votre venue. Vous repartez avec un diagnostic clair, vos ordonnances et un compte-rendu commenté.',
        en: 'At Paris 16 Cardiology Clinic, we designed an optimized clinical journey where Dr Annick TCHAM performs exams during your visit. You leave with an immediate diagnosis, medications, and clear guidance.',
      },
      keyTakeaways: {
        fr: [
          'Plateau technique complet réuni au cabinet à Bonapriso.',
          'Résultats et explications immédiats par le Dr Annick TCHAM.',
          'Gain de temps précieux et diagnostic sans dispersion médicale.',
        ],
        en: [
          'Complete diagnostic platform united in Bonapriso.',
          'Immediate results and plain-language physician counseling.',
          'Saves precious time and ensures clinical consistency.',
        ],
      },
      seoKeywords: [
        'bilan cardiologique Douala',
        'cardiologue Bonapriso consultation',
        'cabinet cardiologie Paris 16',
      ],
      relatedExplorationIds: ['ecg-12', 'echocardiographie-doppler', 'holter-tensionnel-mapa'],
      relatedPathologyIds: ['hta', 'insuffisance-cardiaque', 'arythmies-palpitations'],
    },
  ],

  landmarks: [
    {
      id: 'ecole-publique-bonapriso',
      name: {
        fr: 'École Publique de Bonapriso (Groupe 1)',
        en: 'Bonapriso Public School (Group 1)',
      },
      zone: 'Bonapriso Centre',
      coordinates: { x: 50, y: 44 },
      isHighlight: true,
    },
    {
      id: 'rue-njo-njo',
      name: {
        fr: 'Rue Njo-Njo',
        en: 'Njo-Njo Street',
      },
      zone: 'Bonapriso',
      coordinates: { x: 38, y: 32 },
    },
    {
      id: 'carrefour-casino-marbella',
      name: {
        fr: 'Carrefour Casino Marbella',
        en: 'Casino Marbella Junction',
      },
      zone: 'Bonapriso',
      coordinates: { x: 68, y: 24 },
    },
    {
      id: 'carrefour-shell-new-bell',
      name: {
        fr: 'Carrefour Shell New-Bell',
        en: 'Shell New-Bell Junction',
      },
      zone: 'Axe New-Bell / Bonapriso',
      coordinates: { x: 24, y: 62 },
    },
    {
      id: 'hotel-de-l-air',
      name: {
        fr: 'Hôtel de l’Air',
        en: 'Air Hotel',
      },
      zone: 'Bonapriso Sud',
      coordinates: { x: 74, y: 56 },
    },
    {
      id: 'carrefour-armand',
      name: {
        fr: 'Carrefour Armand',
        en: 'Armand Junction',
      },
      zone: 'Bonapriso',
      coordinates: { x: 44, y: 58 },
    },
    {
      id: 'marche-des-fleurs',
      name: {
        fr: 'Marché des Fleurs',
        en: 'Flower Market',
      },
      zone: 'Bonapriso Nord',
      coordinates: { x: 30, y: 22 },
    },
    {
      id: 'carrefour-soppo-priso',
      name: {
        fr: 'Carrefour Soppo Priso',
        en: 'Soppo Priso Junction',
      },
      zone: 'Bonapriso',
      coordinates: { x: 62, y: 40 },
    },
    {
      id: 'avenue-de-gaulle',
      name: {
        fr: 'Avenue Général de Gaulle',
        en: 'General de Gaulle Avenue',
      },
      zone: 'Axe Bonanjo / Bonapriso',
      coordinates: { x: 18, y: 36 },
    },
    {
      id: 'carrefour-clerge',
      name: {
        fr: 'Carrefour Maison du Clergé',
        en: 'Clergy House Junction',
      },
      zone: 'Bonapriso Est',
      coordinates: { x: 80, y: 48 },
    },
    {
      id: 'boulevard-de-la-liberte',
      name: {
        fr: 'Boulevard de la Liberté (Akwa liaison)',
        en: 'Liberty Boulevard (Akwa link)',
      },
      zone: 'Liaison Akwa',
      coordinates: { x: 26, y: 14 },
    },
    {
      id: 'pharmacie-de-bonapriso',
      name: {
        fr: 'Pharmacie de Bonapriso',
        en: 'Bonapriso Pharmacy',
      },
      zone: 'Bonapriso Centre',
      coordinates: { x: 56, y: 28 },
    },
    {
      id: 'station-total-bonapriso',
      name: {
        fr: 'Station TotalEnergies Bonapriso',
        en: 'TotalEnergies Station Bonapriso',
      },
      zone: 'Bonapriso',
      coordinates: { x: 42, y: 72 },
    },
  ],
};

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    _id: 'testi-1',
    patientName: 'Jean-Paul Mbarga',
    patientRole: 'Cadre d’entreprise · Douala (Bonanjo)',
    serviceUsed: 'Bilan Cardiologique Complet + Échocardiographie Doppler',
    rating: 5,
    comment:
      'Une prise en charge d’une rare qualité à Douala. Dr Annick TCHAM prend le temps d’écouter sans aucune précipitation. Tous les examens (ECG, Échocardiographie) ont été réalisés sur place le matin même. Je recommande vivement !',
    createdAt: '2026-11-04T10:15:00.000Z',
  },
  {
    _id: 'testi-2',
    patientName: 'Sandrine Kuate',
    patientRole: 'Enseignante · Bonapriso',
    serviceUsed: 'Dépistage Apnée du Sommeil (Polygraphie ventilatoire)',
    rating: 5,
    comment:
      'Je me réveillais épuisée chaque matin avec une tension difficile à stabiliser. Grâce à la polygraphie ventilatoire posée au cabinet, le diagnostic a été posé en 24h. Mon sommeil et ma tension sont enfin redevenus normaux.',
    createdAt: '2026-11-08T14:30:00.000Z',
  },
  {
    _id: 'testi-3',
    patientName: 'El Hadj Oumarou',
    patientRole: 'Commerçant · Akwa',
    serviceUsed: 'Holter Tensionnel (MAPA 24h) & Équilibre HTA',
    rating: 5,
    comment:
      'Très impressionné par la modernité du cabinet et la gentillesse du secrétariat. Le suivi téléphonique après ma consultation pour vérifier la tolérance de mon nouveau traitement m’a particulièrement touché.',
    createdAt: '2026-11-11T09:00:00.000Z',
  },
  {
    _id: 'testi-4',
    patientName: 'Clarisse Eboué',
    patientRole: 'Patiente du Cabinet · Douala',
    serviceUsed: 'Holter ECG 48h & Consultation Rythmologie',
    rating: 5,
    comment:
      'Des palpitations qui m’angoissaient depuis des mois. Le Dr TCHAM a su me rassurer, m’expliquer simplement ce que j’avais et poser le bon diagnostic avec le boîtier Holter portable. Merci docteur !',
    createdAt: '2026-11-13T16:20:00.000Z',
  },
];
