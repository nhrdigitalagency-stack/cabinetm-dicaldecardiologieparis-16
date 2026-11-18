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
  resultTiming?: { fr: string; en: string };
  badgeText?: { fr: string; en: string };
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
  category?: string;
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
  verified?: boolean;
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
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
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
    en: 'Paris 16 Cardiology Medical Practice',
  },
  doctorName: 'Dr Annick TCHAM',
  specialty: {
    fr: 'Cardiologue',
    en: 'Specialist Cardiologist',
  },
  phone: '+237 693 44 78 10',
  whatsappNumber: '237693447810',
  email: 'cmc.annicktcham@gmail.com',
  addressFull: {
    fr: 'Fin rue pavée de l’École publique de Bonapriso, groupe 1, à proximité de l’École publique de Bonapriso, Douala.',
    en: 'End of paved street of Bonapriso Public School, Group 1, near Bonapriso Public School, Douala.',
  },
  addressShort: {
    fr: 'Fin rue pavée de l’École publique de Bonapriso, groupe 1.',
    en: 'End of paved street of Bonapriso Public School, Group 1.',
  },
  sloganPrimary: {
    fr: 'La Santé, Notre Priorité.',
    en: 'Your Health, Our Priority.',
  },
  sloganSecondary: {
    fr: 'Le Professionnalisme, Notre Obligation.',
    en: 'Professionalism, Our Obligation.',
  },
  sleepApneaBanner: {
    fr: '« Vous ronflez ? Vous êtes fatigué au réveil ? Pensez au dépistage de l’apnée du sommeil. »',
    en: '“Do you snore? Do you wake up feeling exhausted? Consider sleep apnea screening.”',
  },
  sleepApneaSubtext: {
    fr: 'L’apnée du sommeil multiplie les risques d’hypertension artérielle résistante, d’arythmie et d’AVC. Notre cabinet réalise la polygraphie ventilatoire complète pour un diagnostic précis.',
    en: 'Sleep apnea significantly increases the risk of resistant high blood pressure, arrhythmia, and stroke. Our clinic performs complete respiratory polygraphy for an accurate diagnosis.',
  },
  synthesisParagraph1: {
    fr: "Le Cabinet Médical de Cardiologie Paris 16, dirigé par le Dr Annick TCHAM, cardiologue, est spécialisé dans la prise en charge des maladies cardiovasculaires et la réalisation d'explorations cardiologiques.",
    en: 'The Paris 16 Cardiology Medical Practice, led by Dr Annick TCHAM, cardiologist, specializes in the management of cardiovascular diseases and comprehensive cardiological explorations.',
  },
  synthesisParagraph2: {
    fr: "Il propose notamment le suivi de l'hypertension artérielle, des troubles du rythme cardiaque, de l'insuffisance cardiaque, le dépistage de l'apnée du sommeil, ainsi que la réalisation de visites médicales systématiques d'entreprise et de campagnes ciblées de dépistage cardiovasculaire.",
    en: 'It specifically offers continuous monitoring of hypertension, heart rhythm disorders, heart failure, specialized sleep apnea screening, as well as systematic corporate medical check-ups and targeted cardiovascular screening campaigns.',
  },
  logoUrl: '/assets/branding/logo-paris16.png',
  doctorPortraitUrl: '/assets/branding/dr-annick-tcham.png',

  explorations: [
    {
      id: 'ecg',
      number: '01',
      title: {
        fr: 'ECG (Électrocardiogramme)',
        en: 'ECG (Resting Electrocardiogram)',
      },
      shortDesc: {
        fr: 'Enregistrement immédiat de l’activité électrique du cœur au repos en cabinet.',
        en: 'Immediate recording of the heart’s electrical activity at rest in our clinic.',
      },
      details: {
        fr: "L'électrocardiogramme (ECG) 12 dérivations est l'examen de référence réalisé systématiquement lors de la consultation. Indolore et immédiat, il détecte les troubles du rythme, les troubles de la conduction et les signes de souffrance coronarienne.",
        en: 'The 12-lead electrocardiogram (ECG) is the baseline examination performed during your consultation. Painless and immediate, it detects rhythm disorders, conduction abnormalities, and signs of coronary ischemia.',
      },
      duration: {
        fr: '10 minutes · Réalisation & résultat le jour même',
        en: '10 minutes · Same-day execution & report',
      },
      preparation: {
        fr: 'Aucune préparation particulière requise.',
        en: 'No special preparation required.',
      },
      sameDay: true,
      badgeText: {
        fr: 'Résultat Immédiat',
        en: 'Immediate Result',
      },
      resultTiming: {
        fr: 'Tracé et interprétation remis immédiatement en main propre lors de votre consultation le jour même.',
        en: 'Tracing and detailed interpretation delivered immediately on the same day during your consultation.',
      },
      illustrationType: 'ecg',
    },
    {
      id: 'holter-ecg',
      number: '02',
      title: {
        fr: 'Holter ECG',
        en: 'Holter ECG (24h–72h Rhythm Monitoring)',
      },
      shortDesc: {
        fr: 'Surveillance continue du rythme cardiaque sur 24h à 72h dans votre vie quotidienne.',
        en: 'Continuous 24h-to-72h heart rhythm monitoring during your normal daily activities.',
      },
      details: {
        fr: "Un boîtier discret et léger enregistre chaque battement de votre cœur pendant 24 heures ou plus. Il permet de diagnostiquer les palpitations intermittentes, les malaises ou les arythmies silencieuses qui n'apparaissent pas lors d'un ECG standard.",
        en: 'A compact, lightweight recorder captures every heartbeat over 24 hours or more. It diagnoses intermittent palpitations, dizziness, or silent arrhythmias that may not appear during a brief resting ECG.',
      },
      duration: {
        fr: 'Pose en 15 min · Enregistrement 24h à 72h',
        en: '15 min fitting · 24h to 72h recording',
      },
      preparation: {
        fr: 'Prendre sa douche avant la pose. Porter un vêtement ample.',
        en: 'Shower prior to device placement. Wear comfortable, loose clothing.',
      },
      sameDay: true,
      badgeText: {
        fr: 'Résultat à la Dépose',
        en: 'Result at Device Return',
      },
      resultTiming: {
        fr: 'Pose de l’appareil sur place le jour même. Le résultat complet et l’analyse du rythme vous sont remis le jour de la dépose de l’appareil (dès le lendemain lors de la restitution).',
        en: 'Device is fitted on-site the same day. Complete rhythm report is delivered the day the device is returned (the next day upon return).',
      },
      illustrationType: 'holter-ecg',
    },
    {
      id: 'holter-tensionnel-mapa',
      number: '03',
      title: {
        fr: 'Holter tensionnel (MAPA)',
        en: 'Ambulatory Blood Pressure Monitoring (ABPM / MAPA)',
      },
      shortDesc: {
        fr: 'Mesure Automatique de la Pression Artérielle jour et nuit sur 24 heures.',
        en: 'Automated 24-hour day and night blood pressure measurement.',
      },
      details: {
        fr: "La MAPA mesure automatiquement votre tension artérielle toutes les 15 à 30 minutes le jour et la nuit. Cet examen élimine « l'effet blouse blanche », confirme le diagnostic d'hypertension artérielle et vérifie l'efficacité de votre traitement sur 24h.",
        en: 'ABPM automatically measures your blood pressure every 15 to 30 minutes throughout the day and night. It eliminates the “white-coat effect,” confirms hypertension diagnosis, and verifies 24-hour treatment efficacy.',
      },
      duration: {
        fr: 'Pose en 15 min · Mesure tensionnelle sur 24h',
        en: '15 min fitting · 24h blood pressure monitoring',
      },
      preparation: {
        fr: 'Porter des manches larges pour le brassard tensionnel.',
        en: 'Wear loose sleeves to accommodate the blood pressure cuff.',
      },
      sameDay: true,
      badgeText: {
        fr: 'Résultat à la Dépose',
        en: 'Result at Device Return',
      },
      resultTiming: {
        fr: 'Pose de l’appareil sur place le jour même. Le bilan tensionnel complet (profil nycthéméral jour/nuit) vous est remis le jour de la dépose de l’appareil (dès le lendemain).',
        en: 'Device is fitted on-site the same day. Detailed 24h blood pressure report is delivered the day the device is returned (the next day).',
      },
      illustrationType: 'mapa',
    },
    {
      id: 'echocardiographie-doppler',
      number: '04',
      title: {
        fr: 'Échocardiographie Doppler',
        en: 'Transthoracic Doppler Echocardiography',
      },
      shortDesc: {
        fr: 'Imagerie par ultrasons haute précision du muscle cardiaque, des valves et des flux.',
        en: 'High-precision ultrasound imaging of the heart muscle, valves, and blood flow.',
      },
      details: {
        fr: "Réalisée directement au cabinet par le Dr Annick TCHAM, l'échocardiographie Doppler permet de visualiser en temps réel la contraction du cœur, l'état des valves cardiaques, le péricarde et les pressions intracardiaques, sans aucune irradiation.",
        en: 'Performed directly on-site by Dr Annick TCHAM, Doppler echocardiography visualizes heart muscle contraction, heart valves, pericardium, and intracardiac pressures in real time with zero radiation.',
      },
      duration: {
        fr: '25 à 30 minutes · Compte-rendu immédiat',
        en: '25 to 30 minutes · Immediate report',
      },
      preparation: {
        fr: 'Aucune préparation nécessaire. Il n’est pas nécessaire d’être à jeun.',
        en: 'No special preparation needed. Fasting is not required.',
      },
      sameDay: true,
      badgeText: {
        fr: 'Résultat Immédiat',
        en: 'Immediate Result',
      },
      resultTiming: {
        fr: 'Examen réalisé sur place · Compte-rendu médical complet et explications détaillées remis en main propre le jour même.',
        en: 'On-site exam · Full medical report and detailed debrief delivered on the same day.',
      },
      illustrationType: 'echo-doppler',
    },
    {
      id: 'echographie-trans-oesophagienne',
      number: '05',
      title: {
        fr: 'Échographie trans-œsophagienne',
        en: 'Transesophageal Echocardiography (TEE)',
      },
      shortDesc: {
        fr: 'Exploration ultrasonore approfondie des structures fines du cœur et des valves.',
        en: 'In-depth ultrasound exploration of fine cardiac structures and valves.',
      },
      details: {
        fr: "L'échographie trans-œsophagienne (ETO) offre des images d'une netteté exceptionnelle des oreillettes, des valves cardiaques et de l'aorte thoracique. Elle est indispensable dans le bilan d'AVC d'origine cardiaque, d'endocardite ou avant certaines interventions.",
        en: 'Transesophageal echocardiography (TEE) provides ultra-high-resolution images of the atria, heart valves, and thoracic aorta. It is essential when investigating cardioembolic stroke, endocarditis, or complex valve disease.',
      },
      duration: {
        fr: '30 minutes · Surveillance dédiée',
        en: '30 minutes · Dedicated monitoring',
      },
      preparation: {
        fr: 'Être strictement à jeun (solides et liquides) au moins 6 heures avant l’examen.',
        en: 'Strict fasting (no food or liquids) for at least 6 hours prior to the exam.',
      },
      sameDay: false,
      badgeText: {
        fr: 'Sur Programmation',
        en: 'Scheduled Procedure',
      },
      resultTiming: {
        fr: 'Examen réalisé sur programmation dédiée avec remise du compte-rendu le jour de l’examen.',
        en: 'Scheduled procedure with medical report delivered the day of the exam.',
      },
      illustrationType: 'eto',
    },
    {
      id: 'echo-doppler-vasculaire',
      number: '06',
      title: {
        fr: 'Écho-Doppler vasculaire',
        en: 'Vascular Doppler Ultrasound (Arteries & Veins)',
      },
      shortDesc: {
        fr: 'Examen des artères du cou (carotides), de l’aorte et des vaisseaux des membres.',
        en: 'Ultrasound assessment of neck arteries (carotids), aorta, and limb vessels.',
      },
      details: {
        fr: "L'écho-Doppler vasculaire analyse la circulation dans les artères et les veines. Il permet de dépister les plaques d'athérome (carotides, artères des jambes), les anévrismes ou les thromboses veineuses profondes (phlébites) sur place.",
        en: 'Vascular Doppler ultrasound analyzes blood flow in arteries and veins. It screens for atherosclerotic plaques (carotids, leg arteries), aneurysms, and deep vein thrombosis (DVT) directly at our practice.',
      },
      duration: {
        fr: '20 à 30 minutes · Compte-rendu le jour même',
        en: '20 to 30 minutes · Same-day report',
      },
      preparation: {
        fr: 'Aucune préparation spécifique (à jeun uniquement si Doppler de l’aorte abdominale).',
        en: 'No preparation required (fasting only if abdominal aorta Doppler is scheduled).',
      },
      sameDay: true,
      badgeText: {
        fr: 'Résultat Immédiat',
        en: 'Immediate Result',
      },
      resultTiming: {
        fr: 'Examen réalisé sur place · Compte-rendu et clichés remis en main propre le jour même.',
        en: 'On-site exam · Full report and imaging delivered on the same day.',
      },
      illustrationType: 'vascular',
    },
    {
      id: 'epreuve-effort',
      number: '07',
      title: {
        fr: 'Épreuve d’effort',
        en: 'Cardiac Stress Test (Exercise ECG)',
      },
      shortDesc: {
        fr: 'Évaluation de la performance cardiaque et coronarienne pendant un effort contrôlé.',
        en: 'Evaluation of cardiac and coronary performance during controlled physical exercise.',
      },
      details: {
        fr: "L'épreuve d'effort enregistre en continu votre électrocardiogramme et votre tension artérielle pendant un exercice progressif. Elle révèle les souffrances coronariennes d'effort, évalue les essoufflements et sécurise la reprise sportive.",
        en: 'The cardiac stress test continuously records your ECG and blood pressure during progressive exercise. It uncovers exercise-induced coronary ischemia, evaluates shortness of breath, and clears athletes for safe activity.',
      },
      duration: {
        fr: '30 à 40 minutes avec récupération',
        en: '30 to 40 minutes including recovery',
      },
      preparation: {
        fr: 'Prévoir une tenue et des chaussures de sport confortables. Ne pas être à jeun.',
        en: 'Bring comfortable sportswear and sneakers. Eat a light meal beforehand.',
      },
      sameDay: true,
      badgeText: {
        fr: 'Résultat Immédiat',
        en: 'Immediate Result',
      },
      resultTiming: {
        fr: 'Interprétation cardiologique immédiate et conclusions d’aptitude remises après la phase de récupération.',
        en: 'Immediate cardiological debrief and fitness-to-exercise conclusions delivered post-recovery.',
      },
      illustrationType: 'stress-test',
    },
    {
      id: 'polygraphie-ventilatoire',
      number: '08',
      title: {
        fr: 'Polygraphie ventilatoire',
        en: 'Nocturnal Respiratory Polygraphy (Sleep Apnea)',
      },
      shortDesc: {
        fr: 'Dépistage nocturne à domicile du syndrome d’apnées du sommeil et des ronflements.',
        en: 'At-home overnight screening for obstructive sleep apnea and snoring.',
      },
      details: {
        fr: "Vous ronflez ? Vous êtes fatigué au réveil ? La polygraphie ventilatoire enregistre pendant votre sommeil à domicile votre flux respiratoire, l'oxygénation du sang, la fréquence cardiaque et les mouvements thoraciques pour diagnostiquer l'apnée du sommeil.",
        en: 'Do you snore or wake up tired? Respiratory polygraphy records your airflow, blood oxygen saturation, heart rate, and chest movements while you sleep in your own bed to accurately diagnose sleep apnea.',
      },
      duration: {
        fr: 'Pose au cabinet · Enregistrement 1 nuit',
        en: 'Clinic setup · 1-night home recording',
      },
      preparation: {
        fr: 'Apporter un tee-shirt en coton confortable pour l’installation des capteurs.',
        en: 'Bring a comfortable cotton T-shirt for sensor fitting.',
      },
      sameDay: true,
      badgeText: {
        fr: 'Résultat à la Dépose',
        en: 'Result at Device Return',
      },
      resultTiming: {
        fr: 'Pose du dispositif au cabinet le jour même. Le compte-rendu complet (index d’apnées, désaturations, tracé respiratoire) vous est remis le jour de la dépose de l’appareil (dès le lendemain lors de la restitution).',
        en: 'Device is fitted on-site the same day. Complete sleep apnea report is delivered the day the device is returned (the next day upon return).',
      },
      illustrationType: 'polygraphy',
    },
  ],

  pathologies: [
    {
      id: 'hta',
      number: '01',
      category: 'vascular',
      title: {
        fr: 'Hypertension Artérielle (HTA)',
        en: 'Arterial Hypertension (High Blood Pressure)',
      },
      shortDesc: {
        fr: 'Dépistage précis, bilan de retentissement et équilibrage thérapeutique personnalisé.',
        en: 'Accurate screening, target-organ assessment, and personalized blood pressure stabilization.',
      },
      details: {
        fr: "L'hypertension artérielle est une élévation chronique de la pression du sang dans les artères. Souvent silencieuse, elle représente le premier facteur de risque d'AVC et d'insuffisance cardiaque. Le Dr Annick TCHAM assure un diagnostic précis par MAPA (Holter tensionnel) et un traitement sur mesure.",
        en: 'Arterial hypertension is a chronic elevation of blood pressure in the arteries. Often silent, it is the leading risk factor for stroke and heart failure. Dr Annick TCHAM provides accurate diagnosis via ABPM and tailored treatment.',
      },
      symptoms: {
        fr: 'Céphalées matinales, vertiges, bourdonnements d’oreilles, fatigue ou absence totale de symptômes.',
        en: 'Morning headaches, dizziness, tinnitus, fatigue, or completely asymptomatic presentation.',
      },
      prevention: {
        fr: 'Mesure régulière de la tension, réduction du sel, activité physique adaptée et suivi cardiologique.',
        en: 'Regular blood pressure checks, sodium reduction, adapted physical activity, and cardiology follow-up.',
      },
    },
    {
      id: 'insuffisance-cardiaque',
      number: '02',
      category: 'vascular',
      title: {
        fr: 'Insuffisance cardiaque',
        en: 'Heart Failure Management',
      },
      shortDesc: {
        fr: 'Évaluation échocardiographique de la fonction cardiaque et suivi rapproché.',
        en: 'Echocardiographic evaluation of ventricular function and close clinical monitoring.',
      },
      details: {
        fr: "L'insuffisance cardiaque survient lorsque le muscle cardiaque ne pompe plus efficacement le sang pour répondre aux besoins de l'organisme. Notre cabinet réalise l'échocardiographie Doppler sur place et met en place un protocole thérapeutique moderne avec suivi téléphonique.",
        en: 'Heart failure occurs when the heart muscle no longer pumps blood effectively enough to meet the body’s needs. Our clinic performs on-site Doppler echocardiography and establishes modern treatment protocols with phone follow-up.',
      },
      symptoms: {
        fr: 'Essoufflement à l’effort ou au repos, œdèmes des membres inférieurs, fatigue inhabituelle.',
        en: 'Shortness of breath during exertion or at rest, lower limb swelling, unusual fatigue.',
      },
      prevention: {
        fr: 'Contrôle strict de la tension artérielle, observance du traitement et surveillance du poids.',
        en: 'Strict blood pressure control, medication adherence, and daily weight monitoring.',
      },
    },
    {
      id: 'troubles-rythme',
      number: '03',
      category: 'rhythm',
      title: {
        fr: 'Troubles du rythme cardiaque (Arythmie)',
        en: 'Heart Rhythm Disorders (Arrhythmia)',
      },
      shortDesc: {
        fr: 'Diagnostic des palpitations, fibrillation atriale, tachycardies et bradycardies.',
        en: 'Diagnosis of palpitations, atrial fibrillation, tachycardia, and bradycardia.',
      },
      details: {
        fr: 'Les arythmies correspondent à des battements cardiaques trop rapides, trop lents ou irréguliers. Grâce à l’ECG de repos et au Holter ECG de 24h à 72h disponibles au cabinet, nous identifions précisément chaque anomalie électrique pour prévenir toute complication.',
        en: 'Arrhythmias involve heartbeats that are too fast, too slow, or irregular. Using resting ECG and 24h-to-72h Holter ECG available on-site, we pinpoint electrical anomalies to prevent complications.',
      },
      symptoms: {
        fr: 'Palpitations, sensation de cœur qui s’emballe ou de pause cardiaque, malaises, essoufflement.',
        en: 'Palpitations, sensation of racing or skipped heartbeats, lightheadedness, shortness of breath.',
      },
      prevention: {
        fr: 'Bilan par Holter ECG dès les premières palpitations et dépistage de la fibrillation auriculaire.',
        en: 'Holter ECG evaluation at the first sign of palpitations and screening for atrial fibrillation.',
      },
    },
    {
      id: 'angine-poitrine',
      number: '04',
      category: 'emergency',
      title: {
        fr: 'Angine de poitrine',
        en: 'Angina Pectoris (Coronary Insufficiency)',
      },
      shortDesc: {
        fr: 'Exploration des douleurs thoraciques et dépistage de la maladie coronarienne.',
        en: 'Evaluation of chest pain and early detection of coronary artery disease.',
      },
      details: {
        fr: "L'angine de poitrine (ou angor) traduit un manque d'oxygénation du muscle cardiaque dû au rétrécissement des artères coronaires. Un diagnostic rapide par ECG, échocardiographie et épreuve d'effort permet de protéger le myocarde avant tout accident aigu.",
        en: 'Angina pectoris reflects insufficient oxygenation of the heart muscle caused by narrowed coronary arteries. Rapid diagnosis via ECG, echocardiography, and stress testing protects the myocardium before an acute event.',
      },
      symptoms: {
        fr: 'Douleur ou oppression thoracique à l’effort, irradiant parfois vers le bras gauche ou la mâchoire.',
        en: 'Chest pain or tightness during exertion, sometimes radiating to the left arm or jaw.',
      },
      prevention: {
        fr: 'Épreuve d’effort préventive, équilibrage du cholestérol, du diabète et arrêt du tabac.',
        en: 'Preventive stress testing, cholesterol and diabetes control, and smoking cessation.',
      },
    },
    {
      id: 'infarctus-myocarde',
      number: '05',
      category: 'emergency',
      title: {
        fr: 'Infarctus du myocarde',
        en: 'Myocardial Infarction (Heart Attack)',
      },
      shortDesc: {
        fr: 'Diagnostic d’urgence, réadaptation et suivi post-infarctus rigoureux.',
        en: 'Emergency diagnosis, cardiac rehabilitation, and rigorous post-infarction follow-up.',
      },
      details: {
        fr: "L'infarctus du myocarde est une urgence absolue provoquée par l'obstruction d'une artère coronaire. Le cabinet assure le dépistage précoce des syndromes coronariens ainsi que le suivi complet au long cours après un infarctus pour éviter toute récidive.",
        en: 'Myocardial infarction is a critical emergency caused by a blocked coronary artery. Our practice provides early coronary syndrome detection and comprehensive long-term post-infarction care to prevent recurrence.',
      },
      symptoms: {
        fr: 'Douleur thoracique intense et prolongée, sueurs, nausées, essoufflement brutal.',
        en: 'Intense and prolonged chest pain, sweating, nausea, sudden shortness of breath.',
      },
      prevention: {
        fr: 'Suivi cardiologique régulier, contrôle des facteurs de risque cardiovasculaire et prise en charge rapide.',
        en: 'Regular cardiological checkups, cardiovascular risk factor control, and rapid medical intervention.',
      },
    },
    {
      id: 'avc-cardiaque',
      number: '06',
      category: 'vascular',
      title: {
        fr: 'AVC d’origine cardiaque',
        en: 'Cardioembolic Stroke Prevention & Care',
      },
      shortDesc: {
        fr: 'Recherche des causes cardiaques d’AVC (arythmie emboligène, thrombus, foramen ovale).',
        en: 'Investigation of cardiac causes of stroke (embolic arrhythmia, thrombus, PFO).',
      },
      details: {
        fr: 'Près d’un tiers des accidents vasculaires cérébraux (AVC) ont une origine cardiaque, souvent liée à une fibrillation atriale silencieuse ou une anomalie intracardiaque. Nous réalisons le Holter ECG, l’écho-Doppler des troncs supra-aortiques et l’échographie trans-œsophagienne.',
        en: 'Nearly one-third of strokes originate in the heart, often linked to silent atrial fibrillation or intracardiac anomalies. We perform Holter ECG, supra-aortic Doppler ultrasound, and transesophageal echocardiography.',
      },
      symptoms: {
        fr: 'Faiblesse brutale d’un côté du corps, trouble de la parole, baisse soudaine de la vision.',
        en: 'Sudden weakness on one side of the body, speech difficulty, sudden vision loss.',
      },
      prevention: {
        fr: 'Dépistage des arythmies silencieuses, écho-Doppler vasculaire et traitement anticoagulant adapté.',
        en: 'Silent arrhythmia screening, vascular Doppler ultrasound, and tailored anticoagulation therapy.',
      },
    },
    {
      id: 'embolie-pulmonaire',
      number: '07',
      category: 'emergency',
      title: {
        fr: 'Embolie pulmonaire',
        en: 'Pulmonary Embolism & Venous Thrombosis',
      },
      shortDesc: {
        fr: 'Évaluation cardio-vasculaire d’urgence, écho-Doppler veineux et suivi anticoagulant.',
        en: 'Urgent cardiovascular evaluation, venous Doppler ultrasound, and anticoagulation follow-up.',
      },
      details: {
        fr: "L'embolie pulmonaire résulte de la migration d'un caillot sanguin (souvent issu des veines des jambes) vers les artères pulmonaires. Le cabinet réalise l'échocardiographie et l'écho-Doppler vasculaire pour évaluer le retentissement sur le cœur droit et sécuriser le traitement.",
        en: 'Pulmonary embolism results from a blood clot migrating to the pulmonary arteries. Our clinic performs echocardiography and vascular Doppler ultrasound to assess right heart strain and secure long-term care.',
      },
      symptoms: {
        fr: 'Essoufflement soudain, douleur thoracique latérale, tachycardie, douleur au mollet (phlébite).',
        en: 'Sudden shortness of breath, pleuritic chest pain, tachycardia, calf pain or swelling (DVT).',
      },
      prevention: {
        fr: 'Dépistage de la thrombose veineuse par écho-Doppler et suivi rigoureux du traitement.',
        en: 'Venous thrombosis screening via Doppler ultrasound and rigorous anticoagulation monitoring.',
      },
    },
    {
      id: 'apnee-sommeil',
      number: '08',
      category: 'sleep',
      title: {
        fr: 'Troubles du sommeil / Apnées du sommeil',
        en: 'Sleep Disorders / Obstructive Sleep Apnea',
      },
      shortDesc: {
        fr: 'Vous ronflez ? Vous êtes fatigué au réveil ? Dépistage complet par polygraphie ventilatoire.',
        en: 'Do you snore? Tired upon waking? Complete screening via respiratory polygraphy.',
      },
      details: {
        fr: "Le syndrome d'apnées du sommeil provoque des arrêts respiratoires répétés la nuit, entraînant fatigue chronique, somnolence diurne, hypertension artérielle résistante et troubles du rythme. Notre cabinet propose un dépistage simple et fiable par polygraphie ventilatoire nocturne.",
        en: 'Sleep apnea syndrome causes repeated breathing pauses during sleep, leading to chronic fatigue, daytime sleepiness, resistant hypertension, and arrhythmias. Our clinic offers reliable screening via nocturnal respiratory polygraphy.',
      },
      symptoms: {
        fr: 'Ronflements nocturnes, pauses respiratoires constatées, fatigue dès le réveil, somnolence en journée, HTA résistante.',
        en: 'Nighttime snoring, witnessed breathing pauses, morning exhaustion, daytime sleepiness, resistant high blood pressure.',
      },
      prevention: {
        fr: 'Dépistage précoce par polygraphie ventilatoire dès l’apparition de ronflements ou fatigue matinale.',
        en: 'Early respiratory polygraphy screening as soon as snoring or morning fatigue appears.',
      },
    },
  ],

  particularities: [
    {
      id: 'accueil-ecoute',
      iconName: 'heart-handshake',
      title: {
        fr: "L'accueil et l'écoute",
        en: 'Warm Welcome & Active Listening',
      },
      subtitle: {
        fr: 'Notre différence humaine',
        en: 'Our human difference',
      },
      description: {
        fr: 'Ici, on ne regarde pas que votre maladie, on écoute aussi votre histoire. Consultation sans précipitation, explications en langage simple.',
        en: 'Here, we do not just look at your condition—we also listen to your story. Unhurried consultations with clear explanations in plain language.',
      },
    },
    {
      id: 'technologie-sur-place',
      iconName: 'cpu',
      title: {
        fr: 'La technologie sur place',
        en: 'All-in-One On-Site Technology',
      },
      subtitle: {
        fr: 'Bilan complet le même jour',
        en: 'Complete same-day checkup',
      },
      description: {
        fr: "Échographie cardiaque, ECG, Holter, MAPA, polygraphie ventilatoire et bilan complet sur place, le même jour. Pas besoin d'aller dans 3 endroits différents.",
        en: 'Cardiac ultrasound, ECG, Holter, ABPM (MAPA), respiratory polygraphy, and full cardiac workup on-site the very same day. No need to visit 3 different centers.',
      },
    },
    {
      id: 'suivi-continu',
      iconName: 'phone-call',
      title: {
        fr: 'Le suivi personnalisé',
        en: 'Continuous Personal Follow-Up',
      },
      subtitle: {
        fr: 'Accompagnement dans le temps',
        en: 'Long-term patient care',
      },
      description: {
        fr: 'Après votre consultation, on ne vous laisse pas seul. Suivi téléphonique, rappel de vos contrôles et suivi dans le temps.',
        en: 'After your consultation, you are never left on your own. Dedicated phone follow-up, checkup reminders, and long-term therapeutic monitoring.',
      },
    },
    {
      id: 'rapidite-urgence',
      iconName: 'zap',
      title: {
        fr: 'La rapidité & urgences',
        en: 'Fast Appointments & Emergencies',
      },
      subtitle: {
        fr: 'Réactivité médicale immédiate',
        en: 'Immediate medical responsiveness',
      },
      description: {
        fr: 'Rendez-vous rapide, même en urgence, pour une prise en charge précoce et sécurisée de vos symptômes cardiovasculaires.',
        en: 'Fast appointment scheduling, including urgent consultations, ensuring early and safe management of your cardiovascular symptoms.',
      },
    },
    {
      id: 'visites-systematiques-depistage',
      iconName: 'building-shield',
      title: {
        fr: 'Visites Systématiques & Dépistages',
        en: 'Corporate Check-ups & Screenings',
      },
      subtitle: {
        fr: 'Santé d’entreprise & prévention active',
        en: 'Occupational health & prevention',
      },
      description: {
        fr: 'Visites médicales systématiques annuelles pour entreprises et institutions (bilans cadres et personnel, aptitude cardiologique) et organisation de campagnes de dépistage (HTA, risque cardiovasculaire, apnée du sommeil).',
        en: 'Annual systematic medical check-ups for corporations (executive fitness-to-work, employee heart health) and organized screening campaigns (hypertension, cardiovascular risk, sleep apnea).',
      },
    },
  ],

  articles: [
    {
      id: 'article-apnee-sommeil',
      illustrationType: 'sleep-apnea',
      title: {
        fr: 'Vous ronflez ? Pourquoi l’apnée du sommeil fatigue votre cœur',
        en: 'Do You Snore? Why Sleep Apnea Exhausts Your Heart',
      },
      category: {
        fr: 'Dépistage Cardiaque',
        en: 'Cardiac Screening',
      },
      date: {
        fr: 'Prévention Sommeil & Cœur',
        en: 'Sleep & Heart Prevention',
      },
      readTime: {
        fr: '3 min de lecture',
        en: '3 min read',
      },
      summary: {
        fr: 'Découvrez le lien direct entre les pauses respiratoires nocturnes, la fatigue matinale et l’hypertension artérielle résistante.',
        en: 'Discover the direct link between nighttime breathing pauses, morning exhaustion, and resistant high blood pressure.',
      },
      content: {
        fr: "Le syndrome d'apnées obstructives du sommeil (SAOS) provoque des micro-éveils et des chutes répétées d'oxygène pendant la nuit. Votre cœur est alors soumis à un stress permanent, augmentant fortement le risque d'hypertension artérielle, de fibrillation atriale et d'AVC. Au Cabinet Médical de Cardiologie Paris 16, le Dr Annick TCHAM réalise la polygraphie ventilatoire pour un diagnostic rapide et sans hospitalisation.",
        en: 'Obstructive sleep apnea (OSA) causes repeated oxygen drops and micro-arousals throughout the night. Your heart undergoes continuous stress, sharply increasing the risk of hypertension, atrial fibrillation, and stroke. At Paris 16 Cardiology Medical Practice, Dr Annick TCHAM performs respiratory polygraphy for a fast, outpatient diagnosis.',
      },
      keyTakeaways: {
        fr: [
          'Le ronflement sévère et la fatigue au réveil sont des signes cardinaux.',
          'L’apnée aggrave le risque d’AVC et d’hypertension résistante.',
          'Le dépistage se fait en une nuit à domicile à Bonapriso.',
        ],
        en: [
          'Severe snoring and morning exhaustion are major warning signs.',
          'Apnea increases the risk of stroke and refractory hypertension.',
          'Screening is completed overnight at home in Bonapriso.',
        ],
      },
      seoKeywords: [
        'apnée du sommeil Douala',
        'polygraphie ventilatoire Cameroun',
        'hypertension résistante Bonapriso',
      ],
      relatedExplorationIds: ['polygraphie-ventilatoire', 'holter-tensionnel-mapa'],
      relatedPathologyIds: ['apnee-sommeil', 'hta'],
    },
    {
      id: 'article-hta-silencieuse',
      illustrationType: 'hypertension',
      title: {
        fr: 'L’intérêt du Holter Tensionnel (MAPA) sur 24 heures',
        en: 'Why 24-Hour Ambulatory Blood Pressure Monitoring (MAPA) Matters',
      },
      category: {
        fr: 'Hypertension Artérielle',
        en: 'Arterial Hypertension',
      },
      date: {
        fr: 'Suivi Tensionnel',
        en: 'Blood Pressure Care',
      },
      readTime: {
        fr: '4 min de lecture',
        en: '4 min read',
      },
      summary: {
        fr: 'Une seule mesure en consultation ne suffit pas toujours. La MAPA analyse votre tension le jour et pendant votre sommeil.',
        en: 'A single clinic reading is not always enough. ABPM analyzes your blood pressure throughout the day and during sleep.',
      },
      content: {
        fr: "L'hypertension artérielle est souvent appelée le « tueur silencieux » car elle évolue longtemps sans symptôme. Le Holter tensionnel (MAPA) posé au cabinet permet d'évaluer votre profil tensionnel réel dans votre vie quotidienne et la nuit, afin d'ajuster votre traitement avec une précision optimale.",
        en: 'Hypertension is often called the “silent killer” because it progresses without symptoms. The 24-hour ABPM fitted at our clinic evaluates your true blood pressure profile during daily life and sleep, allowing precise treatment optimization.',
      },
      keyTakeaways: {
        fr: [
          'Élimine le faux pic tensionnel lié à l’effet blouse blanche.',
          'Vérifie la baisse tensionnelle nocturne indispensable pour préserver les artères.',
          'Pose et compte-rendu commenté directement au cabinet à Bonapriso.',
        ],
        en: [
          'Eliminates anxiety-driven white-coat spikes.',
          'Verifies vital nighttime blood pressure dipping.',
          'Direct fitting and doctor counseling at our Bonapriso practice.',
        ],
      },
      seoKeywords: [
        'MAPA Douala',
        'Holter tensionnel Bonapriso',
        'HTA blouse blanche Cameroun',
      ],
      relatedExplorationIds: ['holter-tensionnel-mapa', 'echocardiographie-doppler'],
      relatedPathologyIds: ['hta', 'insuffisance-cardiaque'],
    },
    {
      id: 'article-bilan-meme-jour',
      illustrationType: 'checkup',
      title: {
        fr: 'Pourquoi réaliser son bilan cardiologique complet le même jour ?',
        en: 'Why Complete Your Full Cardiology Workup on the Same Day?',
      },
      category: {
        fr: 'Excellence Technologique',
        en: 'Clinical Technology',
      },
      date: {
        fr: 'Parcours Patient',
        en: 'Patient Journey',
      },
      readTime: {
        fr: '3 min de lecture',
        en: '3 min read',
      },
      summary: {
        fr: 'ECG, Échocardiographie Doppler, Holter et Polygraphie réunis sur un seul plateau technique à Bonapriso.',
        en: 'ECG, Doppler Echocardiography, Holter, and Polygraphy united in a single clinical center in Bonapriso.',
      },
      content: {
        fr: "Multiplier les rendez-vous dans différents centres retarde le diagnostic et génère du stress. Au Cabinet Médical de Cardiologie Paris 16 à Bonapriso, nous avons réuni l'ensemble du plateau technique (ECG, Échocardiographie Doppler, Holter ECG, MAPA, Polygraphie ventilatoire) pour vous offrir un bilan complet le même jour avec des explications claires.",
        en: 'Juggling appointments across multiple facilities delays diagnosis and increases stress. At Paris 16 Cardiology Medical Practice in Bonapriso, we bring together the full technical platform (ECG, Doppler Echocardiography, Holter, ABPM, Polygraphy) to deliver a complete same-day workup with clear explanations.',
      },
      keyTakeaways: {
        fr: [
          'Plateau technique complet centralisé à Bonapriso.',
          'Résultats et explications immédiats par le Dr Annick TCHAM.',
          'Diagnostic rapide sans multiplication de vos trajets.',
        ],
        en: [
          'Comprehensive diagnostic platform united in Bonapriso.',
          'Immediate results and physician guidance by Dr Annick TCHAM.',
          'Fast diagnosis without multiple cross-town trips.',
        ],
      },
      seoKeywords: [
        'bilan cardiologique Douala',
        'cardiologue Bonapriso consultation',
        'plateau technique cardiologie Cameroun',
      ],
      relatedExplorationIds: ['ecg', 'echocardiographie-doppler', 'holter-tensionnel-mapa'],
      relatedPathologyIds: ['hta', 'troubles-rythme', 'insuffisance-cardiaque'],
    },
  ],

  landmarks: [
    {
      id: 'ecole-publique-bonapriso',
      name: {
        fr: 'École publique de Bonapriso (Fin rue pavée, Groupe 1)',
        en: 'Bonapriso Public School (End of paved street, Group 1)',
      },
      zone: 'Proximité immédiate du Cabinet',
      coordinates: { x: 52, y: 46 },
      isHighlight: true,
      category: 'ecole',
    },
    {
      id: 'carrefour-shell-new-bell',
      name: {
        fr: 'Carrefour Shell New-Bell',
        en: 'Shell New-Bell Crossroads',
      },
      zone: 'Accès Nord-Est',
      coordinates: { x: 78, y: 20 },
      category: 'carrefour',
    },
    {
      id: 'carrefour-casino-marbella',
      name: {
        fr: 'Carrefour Casino Marbella',
        en: 'Casino Marbella Crossroads',
      },
      zone: 'Axe central Bonapriso',
      coordinates: { x: 45, y: 28 },
      category: 'carrefour',
    },
    {
      id: 'casino-marbella',
      name: {
        fr: 'Casino Marbella',
        en: 'Casino Marbella',
      },
      zone: 'Repère Rue Njo-njo',
      coordinates: { x: 38, y: 30 },
      category: 'commerce',
    },
    {
      id: 'rue-njo-njo',
      name: {
        fr: 'Rue Njo-njo',
        en: 'Rue Njo-njo',
      },
      zone: 'Artère principale Bonapriso',
      coordinates: { x: 30, y: 42 },
      category: 'axe',
    },
    {
      id: 'kmc',
      name: {
        fr: 'KMC',
        en: 'KMC Landmark',
      },
      zone: 'Secteur Rue Njo-njo',
      coordinates: { x: 25, y: 52 },
      category: 'commerce',
    },
    {
      id: 'ecole-americaine',
      name: {
        fr: 'École Américaine',
        en: 'American School of Douala',
      },
      zone: 'Repère Ouest Bonapriso',
      coordinates: { x: 20, y: 66 },
      category: 'ecole',
    },
    {
      id: 'carrefour-bonadouma-home',
      name: {
        fr: 'Carrefour Bonadouma Home',
        en: 'Bonadouma Home Crossroads',
      },
      zone: 'Accès Sud Bonapriso',
      coordinates: { x: 48, y: 74 },
      category: 'carrefour',
    },
    {
      id: 'bonadouma-home',
      name: {
        fr: 'Bonadouma Home',
        en: 'Bonadouma Home',
      },
      zone: 'Repère Bonadouma',
      coordinates: { x: 56, y: 78 },
      category: 'commerce',
    },
    {
      id: 'carrefour-hotel-air',
      name: {
        fr: 'Carrefour Hôtel de l’air',
        en: 'Hôtel de l’Air Crossroads',
      },
      zone: 'Axe Hôtel de l’air',
      coordinates: { x: 18, y: 26 },
      category: 'carrefour',
    },
    {
      id: 'hotel-noubou',
      name: {
        fr: 'Hôtel Noubou',
        en: 'Noubou Hotel',
      },
      zone: 'Axe Est / New-Bell',
      coordinates: { x: 82, y: 44 },
      category: 'hotel',
    },
    {
      id: 'edmac',
      name: {
        fr: 'EDMAC',
        en: 'EDMAC Landmark',
      },
      zone: 'Secteur École Publique',
      coordinates: { x: 66, y: 56 },
      category: 'commerce',
    },
    {
      id: 'direction-marche-fleurs',
      name: {
        fr: 'Direction venant du marché des fleurs',
        en: 'Direction coming from the Flower Market (Marché des Fleurs)',
      },
      zone: 'Voie d’accès principale',
      coordinates: { x: 80, y: 80 },
      category: 'axe',
    },
  ],
};

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    _id: 'testimonial-1',
    patientName: 'Jean-Paul Mbarga',
    patientRole: 'Patient suivi pour HTA · Bonapriso, Douala',
    serviceUsed: 'Consultation + Échocardiographie Doppler & MAPA',
    rating: 5,
    comment:
      "Un accueil exceptionnel par le Dr Annick TCHAM. Pour la première fois, on a pris le temps de m'écouter sans précipitation et de m'expliquer mon hypertension en langage simple. J'ai pu faire mon ECG, mon échographie cardiaque et la pose du Holter tensionnel le même jour sur place.",
    createdAt: '2026-10-18T10:30:00.000Z',
    verified: true,
  },
  {
    _id: 'testimonial-2',
    patientName: 'Clarisse Ndongo',
    patientRole: 'Patiente · Akwa, Douala',
    serviceUsed: 'Polygraphie ventilatoire (Apnée du sommeil)',
    rating: 5,
    comment:
      "Je me réveillais épuisée chaque matin avec une tension instable. Le dépistage de l'apnée du sommeil au Cabinet Médical de Cardiologie Paris 16 a changé mon quotidien. Le suivi téléphonique après la consultation prouve un vrai professionnalisme.",
    createdAt: '2026-10-29T14:15:00.000Z',
    verified: true,
  },
  {
    _id: 'testimonial-3',
    patientName: 'Samuel Ekani',
    patientRole: 'Cadre supérieur · Bonanjo, Douala',
    serviceUsed: 'Urgence Palpitations & Holter ECG',
    rating: 5,
    comment:
      'Rendez-vous obtenu très rapidement suite à des palpitations inquiétantes. Plateau technique moderne digne des meilleurs standards internationaux et suivi personnalisé remarquable. Merci Docteur TCHAM !',
    createdAt: '2026-11-04T09:00:00.000Z',
    verified: true,
  },
];
