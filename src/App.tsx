import React, { useEffect, useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Stethoscope,
  Activity,
  HeartPulse,
  Moon,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  Globe,
  Menu,
  X,
  Lock,
  Settings,
  UserCheck,
  Award,
  PhoneCall,
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  Info,
  Send,
  User,
  FileText,
  AlertCircle,
  Building2,
  Users,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  INITIAL_CLINIC_DATA,
  INITIAL_TESTIMONIALS,
  ClinicSiteData,
  Language,
  TestimonialItem,
} from './data/initialClinicData';
import { ExplorationIllustration, EQUIPMENT_IMAGES } from './components/MedicalIllustrations';
import { BonaprisoMap } from './components/BonaprisoMap';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AdminPortalModal } from './components/AdminPortalModal';
import { AppointmentModal } from './components/AppointmentModal';
import {
  ClinicalDetailModal,
  SelectedClinicalItem,
} from './components/ClinicalDetailModal';
import { LogoSplashLoader } from './components/LogoSplashLoader';
import { CardiologyInsightsSection } from './components/CardiologyInsightsSection';
import { MedicalLottie } from './components/MedicalLottie';

type PageView =
  | 'home'
  | 'about'
  | 'explorations'
  | 'pathologies'
  | 'insights'
  | 'testimonials'
  | 'contact';

export const PAGE_PATHS: Record<PageView, string> = {
  home: '/accueil',
  about: '/a-propos',
  pathologies: '/pathologies',
  explorations: '/explorations',
  insights: '/actualites-sante',
  testimonials: '/avis-patients',
  contact: '/contact',
};

export const PATH_TO_PAGE_MAP: Record<string, PageView> = {
  '/': 'home',
  '/accueil': 'home',
  '/home': 'home',
  '/a-propos': 'about',
  '/about': 'about',
  '/dr-annick-tcham': 'about',
  '/pathologies': 'pathologies',
  '/maladies': 'pathologies',
  '/maladies-du-coeur': 'pathologies',
  '/maladies-cardiovasculaires': 'pathologies',
  '/explorations': 'explorations',
  '/examens': 'explorations',
  '/examens-cardiologiques': 'explorations',
  '/actualites-sante': 'insights',
  '/actualites': 'insights',
  '/insights': 'insights',
  '/blog': 'insights',
  '/avis-patients': 'testimonials',
  '/avis': 'testimonials',
  '/testimonials': 'testimonials',
  '/contact': 'contact',
  '/rendez-vous': 'contact',
  '/plan-contact': 'contact',
};

export function getPathForPage(page: PageView): string {
  return PAGE_PATHS[page] || '/accueil';
}

export function getPageFromLocation(): PageView {
  if (typeof window === 'undefined') return 'home';
  const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  if (PATH_TO_PAGE_MAP[pathname]) {
    return PATH_TO_PAGE_MAP[pathname];
  }
  const params = new URLSearchParams(window.location.search);
  const sec = params.get('section') as PageView | null;
  if (sec && PAGE_PATHS[sec]) {
    return sec;
  }
  return 'home';
}

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [activePage, setActivePage] = useState<PageView>(() => getPageFromLocation());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSplashLoading, setIsSplashLoading] = useState(true);

  const [siteData, setSiteData] = useState<ClinicSiteData>(INITIAL_CLINIC_DATA);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);

  // Interactive states for new sections
  const [expandedPathologyId, setExpandedPathologyId] = useState<string | null>('hta');
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('ecg');
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  // Inline Strategic Appointment Section state (Section 9)
  const [inlineName, setInlineName] = useState('');
  const [inlinePhone, setInlinePhone] = useState('');
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlineDate, setInlineDate] = useState('');
  const [inlineTime, setInlineTime] = useState('Matin (08h00 - 12h30)');
  const [inlineService, setInlineService] = useState(
    'Bilan Cardiologique Complet (Consultation + ECG + Écho sur place)'
  );
  const [inlineNotes, setInlineNotes] = useState('');
  const [inlineUrgent, setInlineUrgent] = useState(false);
  const [inlineSubmitting, setInlineSubmitting] = useState(false);
  const [inlineSuccess, setInlineSuccess] = useState<string | null>(null);
  const [inlineError, setInlineError] = useState<string | null>(null);

  // Modals state
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [preselectedSubject, setPreselectedSubject] = useState<string>('');
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedClinicalItem, setSelectedClinicalItem] = useState<SelectedClinicalItem>(null);
  const [copiedFooterField, setCopiedFooterField] = useState<string | null>(null);

  // Handle URL Sync, Browser Back/Forward (popstate) & Direct Navigation
  useEffect(() => {
    // If user opened "/" or an alias or query string, sync URL cleanly to /accueil or target route
    const currentTarget = getPathForPage(activePage);
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
      if (currentPath === '/' || currentPath === '/home' || !PATH_TO_PAGE_MAP[currentPath]) {
        window.history.replaceState({ page: activePage }, '', currentTarget);
      }
    }

    const handlePopState = () => {
      const page = getPageFromLocation();
      setActivePage(page);
    };

    window.addEventListener('popstate', handlePopState);

    let mounted = true;
    const loadSiteData = async () => {
      try {
        const res = await fetch('/api/site-data');
        if (res.ok) {
          const data = await res.json();
          if (!mounted || !data) return;
          if (data.siteData) setSiteData(data.siteData);
          if (Array.isArray(data.testimonials) && data.testimonials.length > 0) {
            setTestimonials(data.testimonials);
          }
          return;
        }
      } catch (e) {
        console.warn('Backend /api/site-data unreachable, trying direct Sanity fallback:', e);
      }

      // Direct Sanity CDN fallback query (public read access)
      try {
        const query = encodeURIComponent(
          '{ "config": *[_type == "clinicConfig" && _id == "clinic-config-paris16"][0], "testimonials": *[_type == "testimonial"] | order(createdAt desc) }'
        );
        const sanityRes = await fetch(
          `https://l3036eyt.api.sanity.io/v2024-01-01/data/query/production?query=${query}`
        );
        if (sanityRes.ok && mounted) {
          const sData = await sanityRes.json();
          if (sData.result?.config?.payload) {
            setSiteData(sData.result.config.payload);
          }
          if (Array.isArray(sData.result?.testimonials) && sData.result.testimonials.length > 0) {
            setTestimonials(sData.result.testimonials);
          }
        }
      } catch (err) {
        console.error('Direct Sanity fallback error:', err);
      }
    };

    loadSiteData();
    return () => {
      mounted = false;
      window.removeEventListener('popstate', handlePopState);
    };
  }, [activePage]);

  // Dynamic Local & National SEO (Douala, Bonapriso & Cameroun) per Page & Language
  useEffect(() => {
    const seoData: Record<
      PageView,
      {
        title: { fr: string; en: string };
        description: { fr: string; en: string };
        keywords: { fr: string; en: string };
      }
    > = {
      home: {
        title: {
          fr: 'Cardiologue à Douala (Bonapriso) & Cameroun | Cabinet Médical de Cardiologie Paris 16 — Dr Annick TCHAM',
          en: 'Cardiologist in Douala (Bonapriso) & Cameroon | Paris 16 Cardiology Clinic — Dr Annick TCHAM',
        },
        description: {
          fr: 'Cabinet de cardiologie à Douala Bonapriso dirigé par le Dr Annick TCHAM. Consultations, ECG, Échocardiographie Doppler, Holter, MAPA et apnée du sommeil sur place le même jour (+237 693 44 78 10).',
          en: 'Cardiology clinic in Douala Bonapriso led by Dr Annick TCHAM. Consultations, ECG, Doppler Echo, Holter, ABPM and sleep apnea tests on-site (+237 693 44 78 10).',
        },
        keywords: {
          fr: 'cardiologue Douala, cardiologue Bonapriso, cardiologue Cameroun, Dr Annick TCHAM, Cabinet Médical de Cardiologie Paris 16, échocardiographie Doppler Douala, ECG Douala, Holter ECG Cameroun, MAPA Douala, apnée du sommeil Cameroun',
          en: 'cardiologist Douala, cardiologist Cameroon, Dr Annick TCHAM, Paris 16 cardiology, echocardiography Douala, Holter ECG Cameroon, ABPM Douala, sleep apnea Cameroon',
        },
      },
      about: {
        title: {
          fr: 'Dr Annick TCHAM · Cardiologue à Douala Bonapriso, Cameroun | Cabinet Médical de Cardiologie Paris 16',
          en: 'Dr Annick TCHAM · Cardiologist in Douala Bonapriso, Cameroon | Paris 16 Cardiology Clinic',
        },
        description: {
          fr: 'Découvrez le parcours d’excellence du Dr Annick TCHAM, médecin cardiologue à Douala Bonapriso. Spécialiste des pathologies cardiovasculaires formé en France et au Cameroun.',
          en: 'Discover Dr Annick TCHAM, expert cardiologist in Douala Bonapriso. Specialized in cardiovascular diseases with medical excellence from France and Cameroon.',
        },
        keywords: {
          fr: 'Dr Annick TCHAM, médecin cardiologue Douala, cardiologue femme Cameroun, parcours cardiologue Paris Douala, consultation cardiologie Bonapriso',
          en: 'Dr Annick TCHAM, cardiologist Douala, medical doctor Cameroon, Bonapriso cardiology clinic',
        },
      },
      pathologies: {
        title: {
          fr: 'Spécialités Cardiologiques à Douala & Cameroun : HTA, Arythmie, AVC, Insuffisance Cardiaque | Dr Annick TCHAM',
          en: 'Cardiology Specialties in Douala & Cameroon: Hypertension, Arrhythmia, Stroke, Heart Failure | Dr Annick TCHAM',
        },
        description: {
          fr: 'Prise en charge spécialisée à Douala : hypertension artérielle (HTA), troubles du rythme, palpitations, insuffisance cardiaque, prévention AVC et apnée du sommeil.',
          en: 'Specialized care in Douala: hypertension, arrhythmias, heart palpitations, heart failure, stroke prevention and obstructive sleep apnea.',
        },
        keywords: {
          fr: 'hypertension artérielle Douala, HTA Cameroun, arythmie cardiaque Douala, insuffisance cardiaque Cameroun, prévention AVC Douala, apnée du sommeil Bonapriso',
          en: 'hypertension Douala, heart arrhythmia Cameroon, stroke prevention Douala, heart failure care Cameroon',
        },
      },
      explorations: {
        title: {
          fr: 'ECG, Échocardiographie Doppler, Holter, MAPA & Apnée du Sommeil à Douala (Bonapriso) | Cameroun',
          en: 'ECG, Doppler Echocardiography, Holter, ABPM & Sleep Apnea in Douala (Bonapriso) | Cameroon',
        },
        description: {
          fr: 'Plateau technique moderne à Bonapriso Douala : Échocardiographie Doppler couleur, Holter ECG 24h-72h, Holter tensionnel MAPA, Polygraphie du sommeil et Épreuve d’effort.',
          en: 'Modern cardiology equipment in Bonapriso Douala: Color Doppler echocardiography, 24-72h Holter ECG, ABPM blood pressure monitor, sleep apnea polygraphy, and stress test.',
        },
        keywords: {
          fr: 'échocardiographie Doppler Douala, Holter ECG 24h Cameroun, MAPA tensionnel Douala, épreuve d effort Bonapriso, polygraphie ventilatoire Douala, dépistage apnée du sommeil Cameroun',
          en: 'Doppler echo Douala, Holter ECG Cameroon, ABPM Douala, exercise stress test Douala, sleep apnea test Cameroon',
        },
      },
      insights: {
        title: {
          fr: 'Cardiology Insights · Blog Santé du Cœur, HTA & Prévention Cardiovasculaire à Douala | Dr Annick TCHAM',
          en: 'Cardiology Insights · Heart Health, Blood Pressure & Prevention Blog in Douala | Dr Annick TCHAM',
        },
        description: {
          fr: 'Conseils pratiques et articles médicaux rédigés par le Dr Annick TCHAM : maîtriser son HTA, alimentation du cœur, reconnaître les signes d’alerte cardiaque au Cameroun.',
          en: 'Cardiology articles and medical tips by Dr Annick TCHAM: managing hypertension, healthy heart diet, and warning signs of cardiovascular issues in Cameroon.',
        },
        keywords: {
          fr: 'blog cardiologie Douala, conseils tension artérielle Cameroun, prévention infarctus Douala, alimentation cœur Cameroun, Dr Annick TCHAM blog',
          en: 'cardiology blog Douala, blood pressure advice Cameroon, heart health tips Douala',
        },
      },
      testimonials: {
        title: {
          fr: 'Avis Patients & Témoignages Cardiologue Douala | Cabinet Médical de Cardiologie Paris 16',
          en: 'Patient Reviews & Testimonials Cardiologist Douala | Paris 16 Cardiology Clinic',
        },
        description: {
          fr: 'Consultez les retours d’expérience et avis vérifiés des patients suivis par le Dr Annick TCHAM au Cabinet Médical de Cardiologie Paris 16 à Bonapriso, Douala.',
          en: 'Read authentic patient reviews and feedback for Dr Annick TCHAM at Paris 16 Cardiology Clinic in Douala Bonapriso (Cameroon).',
        },
        keywords: {
          fr: 'avis cardiologue Douala, témoignages Dr Annick TCHAM, meilleur cardiologue Bonapriso, avis Cabinet Cardiologie Paris 16',
          en: 'cardiologist reviews Douala, patient testimonials Cameroon, Dr Annick TCHAM reviews',
        },
      },
      contact: {
        title: {
          fr: 'Plan d’Accès Bonapriso Douala & Rendez-vous Cardiologue Cameroun (+237 693 44 78 10)',
          en: 'Bonapriso Douala Map & Cardiologist Appointment Cameroon (+237 693 44 78 10)',
        },
        description: {
          fr: 'Cabinet de cardiologie situé fin rue pavée de l’École publique de Bonapriso, Douala. Contact direct WhatsApp/Tél : +237 693 44 78 10. Prise de rendez-vous en ligne.',
          en: 'Cardiology clinic located in Bonapriso, Douala. Direct contact WhatsApp/Phone: +237 693 44 78 10. Online booking and emergency consultations.',
        },
        keywords: {
          fr: 'adresse cardiologue Douala, plan Bonapriso cardiologie, numéro cardiologue Cameroun, rendez-vous Dr Annick TCHAM, urgence cardiologique Douala',
          en: 'cardiologist address Douala, Bonapriso cardiology clinic map, cardiologist phone Cameroon',
        },
      },
    };

    const currentSeo = seoData[activePage];
    const pageTitle = currentSeo.title[lang];
    const pageDesc = currentSeo.description[lang];
    const pageKeywords = currentSeo.keywords[lang];
    const canonicalUrl = `https://cabinetm-dicaldecardiologieparis-16.vercel.app${getPathForPage(activePage)}`;

    document.title = pageTitle;
    document.documentElement.lang = lang === 'fr' ? 'fr-CM' : 'en';

    const updateOrCreateMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const name = selector.match(/meta\[name="([^"]+)"\]/)?.[1];
          if (name) el.name = name;
        } else if (selector.startsWith('meta[property=')) {
          const prop = selector.match(/meta\[property="([^"]+)"\]/)?.[1];
          if (prop) el.setAttribute('property', prop);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    updateOrCreateMeta('meta[name="description"]', 'content', pageDesc);
    updateOrCreateMeta('meta[name="keywords"]', 'content', pageKeywords);
    updateOrCreateMeta('meta[property="og:title"]', 'content', pageTitle);
    updateOrCreateMeta('meta[property="og:description"]', 'content', pageDesc);
    updateOrCreateMeta('meta[property="og:url"]', 'content', canonicalUrl);
    updateOrCreateMeta('meta[name="twitter:title"]', 'content', pageTitle);
    updateOrCreateMeta('meta[name="twitter:description"]', 'content', pageDesc);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalLink) {
      canonicalLink.href = canonicalUrl;
    }
  }, [activePage, lang]);

  const openBookingWithSubject = (subject = '') => {
    setPreselectedSubject(subject);
    setAppointmentModalOpen(true);
  };

  const navigateToPage = (page: PageView, pushHistory = true) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    const targetPath = getPathForPage(page);
    if (pushHistory && typeof window !== 'undefined') {
      const currentPath = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
      if (currentPath !== targetPath) {
        window.history.pushState({ page }, '', targetPath);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFooterField(key);
    setTimeout(() => setCopiedFooterField(null), 2200);
  };

  const handleInlineAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineError(null);
    setInlineSuccess(null);

    if (!inlineName.trim() || !inlinePhone.trim() || !inlineDate) {
      setInlineError(
        lang === 'fr'
          ? 'Veuillez renseigner votre nom, votre téléphone et la date souhaitée.'
          : 'Please enter your name, phone number, and preferred date.'
      );
      return;
    }

    setInlineSubmitting(true);
    try {
      const resp = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: inlineName.trim(),
          phone: inlinePhone.trim(),
          email: inlineEmail.trim(),
          preferredDate: inlineDate,
          preferredTime: inlineTime,
          reason: inlineUrgent ? 'Consultation Urgente' : 'Consultation Planifiée',
          explorationOrPathology: inlineService,
          notes: inlineNotes.trim(),
          isUrgent: inlineUrgent,
        }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        setInlineError(data.error || 'Erreur');
      } else {
        setInlineSuccess(
          lang === 'fr'
            ? `Rendez-vous enregistré pour ${inlineName} le ${inlineDate} ! Le secrétariat du ${siteData.doctorName} vous contactera rapidement.`
            : `Appointment registered for ${inlineName} on ${inlineDate}! ${siteData.doctorName}'s office will contact you shortly.`
        );
        setInlineName('');
        setInlinePhone('');
        setInlineEmail('');
        setInlineNotes('');
      }
    } catch {
      setInlineError(
        lang === 'fr'
          ? 'Erreur réseau. Appelez directement le +237 693 44 78 10.'
          : 'Network error. Call +237 693 44 78 10 directly.'
      );
    } finally {
      setInlineSubmitting(false);
    }
  };

  const whatsappUrgenceHref = `https://wa.me/${siteData.whatsappNumber}?text=${encodeURIComponent(
    lang === 'fr'
      ? `URGENCE CARDIOLOGIQUE — Bonjour ${siteData.doctorName} (${siteData.clinicName.fr}), j'ai besoin d'une prise en charge ou d'un rendez-vous rapide.`
      : `CARDIAC EMERGENCY — Hello ${siteData.doctorName} (${siteData.clinicName.en}), I need urgent cardiological care or a fast appointment.`
  )}`;

  const navItems: Array<{
    id: PageView;
    label: { fr: string; en: string };
    shortLabel: { fr: string; en: string };
  }> = [
    {
      id: 'home',
      label: { fr: 'Accueil', en: 'Home' },
      shortLabel: { fr: 'Accueil', en: 'Home' },
    },
    {
      id: 'about',
      label: { fr: 'Dr TCHAM', en: 'Dr TCHAM' },
      shortLabel: { fr: 'Dr TCHAM', en: 'Dr TCHAM' },
    },
    {
      id: 'pathologies',
      label: { fr: 'Spécialités', en: 'Specialties' },
      shortLabel: { fr: 'Spécialités', en: 'Specialties' },
    },
    {
      id: 'explorations',
      label: { fr: 'Explorations', en: 'Explorations' },
      shortLabel: { fr: 'Explorations', en: 'Explorations' },
    },
    {
      id: 'insights',
      label: { fr: 'Cardiology Insights', en: 'Cardiology Insights' },
      shortLabel: { fr: 'Blog Santé', en: 'Insights' },
    },
    {
      id: 'testimonials',
      label: { fr: 'Témoignages', en: 'Testimonials' },
      shortLabel: { fr: 'Avis', en: 'Reviews' },
    },
    {
      id: 'contact',
      label: { fr: 'Plan & Contact', en: 'Map & Contact' },
      shortLabel: { fr: 'Contact', en: 'Contact' },
    },
  ];

  const getParticularityIcon = (iconName: string) => {
    switch (iconName) {
      case 'heart-handshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'cpu':
        return <Activity className="w-5 h-5" />;
      case 'phone-call':
        return <PhoneCall className="w-5 h-5" />;
      case 'building-shield':
        return <Building2 className="w-5 h-5" />;
      default:
        return <ShieldCheck className="w-5 h-5" />;
    }
  };

  // Word-by-word Text Mask Reveal helper for Doctor Biography (Section 2)
  const bioWords = siteData.synthesisParagraph1[lang].split(' ');

  const handleSplashComplete = () => {
    setIsSplashLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 5-SECOND LOGO SPLASH SCREEN WITH IMMERSIVE EXIT PORTAL */}
      <LogoSplashLoader
        isVisible={isSplashLoading}
        siteData={siteData}
        lang={lang}
        onComplete={handleSplashComplete}
      />

      {/* MAIN APPLICATION CONTAINER — No transform/filter left on root so sticky header & fixed modals work 100% natively */}
      <div
        className={`min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] w-full max-w-[100vw] overflow-x-clip transition-opacity duration-700 ${
          isSplashLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* BACKDROP OVERLAY FOR MOBILE & TABLET MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/35 backdrop-blur-[2px] z-40 lg:hidden"
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* FLOATING TRANSPARENT ROUNDED HEADER — Calibrated for Mobile (320px+), Tablet (640px–1023px), Laptop (1024px–1279px) & Desktop (1280px+) with >= 48x48px Touch Targets */}
        <div className="sticky top-2 sm:top-3 z-50 w-full px-2 sm:px-4 lg:px-4 xl:px-8">
          <header className="max-w-7xl mx-auto bg-white/92 backdrop-blur-xl rounded-2xl sm:rounded-full border border-slate-200/90 shadow-[0_8px_28px_-10px_rgba(15,23,42,0.1)] px-2.5 sm:px-4 lg:px-4 xl:px-6 min-h-[60px] sm:min-h-[68px] lg:min-h-[72px] xl:min-h-20 py-1.5 flex items-center justify-between gap-1.5 sm:gap-3 lg:gap-2 xl:gap-4 transition-all">
            {/* Zone 1: Brand Wordmark + Official Logo — >= 48x48px Accessible Touch Target */}
            <a
              href="/accueil"
              onClick={(e) => {
                e.preventDefault();
                navigateToPage('home');
              }}
              className="min-h-[48px] min-w-[48px] py-1 px-1 rounded-xl flex items-center gap-1.5 sm:gap-2.5 text-left shrink cursor-pointer group"
              title={lang === 'fr' ? 'Cabinet Médical de Cardiologie Paris 16 — Accueil' : 'Paris 16 Cardiology Clinic — Home'}
            >
              <img
                src={siteData.logoUrl}
                alt={siteData.clinicName[lang]}
                referrerPolicy="no-referrer"
                className="w-9 h-9 sm:w-10 sm:h-10 xl:w-11 xl:h-11 object-contain rounded-xl bg-white p-0.5 sm:p-1 border border-slate-200 group-hover:border-[#0052CC] transition-colors shrink-0"
              />
              <div className="leading-tight min-w-0">
                <span className="block text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate">
                  Cabinet Médical
                </span>
                <span className="block text-[11px] sm:text-sm xl:text-[15px] font-extrabold tracking-tight text-[#0F172A] truncate">
                  Cardiologie <span className="text-[#0052CC]">Paris 16</span>
                </span>
              </div>
            </a>

            {/* Zone 2: Laptop (1024px–1279px) & Desktop (1280px+) Single-Line Navigation — >= 48x48px Touch Targets */}
            <nav
              aria-label={lang === 'fr' ? 'Navigation principale' : 'Primary navigation'}
              className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1.5 2xl:gap-2 text-xs xl:text-[13px] font-semibold text-[#061B49]/90 shrink-0"
            >
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <a
                    key={item.id}
                    href={getPathForPage(item.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPage(item.id);
                    }}
                    className={`min-h-[48px] min-w-[48px] inline-flex items-center justify-center px-2.5 xl:px-3.5 py-2 rounded-full whitespace-nowrap shrink-0 transition-all cursor-pointer nav-link-underline ${
                      isActive
                        ? 'bg-[#EBF3FC] text-[#0052CC] font-extrabold nav-link-active'
                        : 'hover:text-[#0052CC] hover:bg-slate-100/70'
                    }`}
                  >
                    {/* Concise label on standard 1024px-1279px laptops so it never overflows; full label on 1280px+ */}
                    <span className="xl:hidden">{item.shortLabel[lang]}</span>
                    <span className="hidden xl:inline">{item.label[lang]}</span>
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Language Switch + Primary CTA + Hamburger Button — All >= 48x48px Touch Targets */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Compact 48x48px Language Toggle for compact phones (< 640px) */}
              <button
                type="button"
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en Français'}
                className="sm:hidden min-h-[48px] min-w-[48px] px-2.5 rounded-full bg-[#F4F8FD] hover:bg-slate-200/80 border border-slate-200/90 text-[11px] font-extrabold text-[#0F172A] inline-flex items-center justify-center gap-1 transition-colors cursor-pointer shrink-0"
              >
                <Globe className="w-3.5 h-3.5 text-[#0052CC] shrink-0" />
                <span>{lang.toUpperCase()}</span>
              </button>

              {/* Full FR / EN Switcher for Tablet, Laptop & Desktop (>= 640px) — Each button >= 48x48px */}
              <div className="hidden sm:flex items-center bg-[#F4F8FD] p-0.5 rounded-full border border-slate-200/90">
                <Globe className="w-3.5 h-3.5 text-[#0052CC] ml-2 mr-0.5 hidden xl:block" />
                <button
                  type="button"
                  onClick={() => setLang('fr')}
                  aria-label="Français"
                  className={`min-h-[48px] min-w-[48px] inline-flex items-center justify-center px-3 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    lang === 'fr'
                      ? 'bg-[#061B49] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-[#061B49]'
                  }`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  aria-label="English"
                  className={`min-h-[48px] min-w-[48px] inline-flex items-center justify-center px-3 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    lang === 'en'
                      ? 'bg-[#061B49] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-[#061B49]'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Primary CTA Button — Solid Clinical Blue (10% Accent Rule) — >= 48x48px Touch Target */}
              <button
                type="button"
                onClick={() => openBookingWithSubject()}
                className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 xl:px-5 py-2.5 rounded-full bg-[#0052CC] hover:bg-[#061B49] text-white text-xs font-bold shadow-xs transition-all whitespace-nowrap shrink-0 cursor-pointer btn-hover-lift hover:scale-[1.03] active:scale-[0.97]"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">
                  {lang === 'fr' ? 'Prendre RDV' : 'Book Visit'}
                </span>
                <span className="sm:hidden">{lang === 'fr' ? 'RDV' : 'Book'}</span>
              </button>

              {/* Mobile & Tablet Menu Toggle Button (< 1024px) — >= 48x48px Touch Target */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden min-h-[48px] min-w-[48px] px-3 sm:px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0F172A] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 border border-slate-200/80"
                aria-label="Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#0F172A]" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
                <span className="hidden md:inline text-xs font-bold">
                  {mobileMenuOpen
                    ? lang === 'fr'
                      ? 'Fermer'
                      : 'Close'
                    : 'Menu'}
                </span>
              </button>
            </div>
          </header>

          {/* Responsive Animated Phone & Tablet Navigation Drawer (< 1024px) — All interactive items >= 48x48px */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="lg:hidden mt-2 max-w-7xl mx-auto bg-white/98 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-xl p-3.5 sm:p-5 space-y-3 max-h-[82vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0052CC]">
                    {lang === 'fr'
                      ? 'Navigation · Cabinet Cardiologie Paris 16'
                      : 'Navigation · Paris 16 Cardiology Clinic'}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {siteData.doctorName}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {navItems.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                      <a
                        key={item.id}
                        href={getPathForPage(item.id)}
                        onClick={(e) => {
                          e.preventDefault();
                          navigateToPage(item.id);
                        }}
                        className={`min-h-[48px] min-w-[48px] w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#0052CC] text-white shadow-xs'
                            : 'bg-slate-50 text-[#0F172A] hover:bg-[#F0F6FF] hover:text-[#0052CC]'
                        }`}
                      >
                        <span>{item.label[lang]}</span>
                        <ArrowRight
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-white' : 'text-slate-400'
                          }`}
                        />
                      </a>
                    );
                  })}
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openBookingWithSubject();
                    }}
                    className="min-h-[48px] min-w-[48px] w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0052CC] hover:bg-[#061B49] text-white text-xs font-extrabold inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>
                      {lang === 'fr'
                        ? 'Prendre Rendez-vous Maintenant'
                        : 'Book Appointment Now'}
                    </span>
                  </button>

                  <div className="flex items-center justify-between sm:justify-end gap-3 px-2 text-xs text-slate-600">
                    <a
                      href={`tel:${siteData.phone.replace(/\s+/g, '')}`}
                      className="min-h-[48px] min-w-[48px] px-3 rounded-xl bg-slate-50 hover:bg-slate-100 font-mono font-bold text-[#0052CC] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#0052CC]" />
                      <span>{siteData.phone}</span>
                    </a>
                    <span className="font-semibold text-slate-700">· Bonapriso</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      {/* MAIN PAGE CONTENT */}
      <main className="flex-1">
        {/* SUBPAGE HEADER BANNER (When viewing dedicated subpages) */}
        {activePage !== 'home' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
            <div className="rounded-3xl bg-[#0F172A] border border-slate-800 text-white p-8 sm:p-12 shadow-lg relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-300">
                    <span>{siteData.clinicName[lang]}</span>
                    <span>·</span>
                    <span>{siteData.doctorName}</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold mt-2 tracking-tight">
                    {activePage === 'about' &&
                      (lang === 'fr'
                        ? 'Présentation du Dr Annick TCHAM & du Cabinet'
                        : 'Meet Dr Annick TCHAM & Our Practice')}
                    {activePage === 'explorations' &&
                      (lang === 'fr'
                        ? 'Technologies & 8 Explorations Cardiologiques'
                        : 'Medical Technologies & 8 Cardiac Explorations')}
                    {activePage === 'pathologies' &&
                      (lang === 'fr'
                        ? 'Spécialités Médicales & 8 Pathologies Prises en Charge'
                        : 'Medical Specialties & 8 Conditions Treated')}
                    {activePage === 'insights' &&
                      (lang === 'fr'
                        ? 'Cardiology Insights · Blog & Conseils Santé du Cœur'
                        : 'Cardiology Insights · Heart Health Tips & Clinical Guides')}
                    {activePage === 'testimonials' &&
                      (lang === 'fr'
                        ? 'Témoignages Patients en Direct'
                        : 'Live Patient Testimonials')}
                    {activePage === 'contact' &&
                      (lang === 'fr'
                        ? 'Localisation, Plan d’Accès Bonapriso & Rendez-vous'
                        : 'Location, Bonapriso Map & Appointments')}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl">
                    {siteData.sloganPrimary[lang]} {siteData.sloganSecondary[lang]}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href="/accueil"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPage('home');
                    }}
                    className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {lang === 'fr' ? '← Accueil' : '← Home'}
                  </a>
                  <button
                    type="button"
                    onClick={() => openBookingWithSubject()}
                    className="min-h-[48px] min-w-[48px] inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#0041A3] text-white text-xs font-extrabold shadow-xs transition-colors cursor-pointer"
                  >
                    {lang === 'fr' ? 'Prendre RDV' : 'Book Visit'}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            SECTION 1: HERO SECTION WITH ZOOMING PORTRAIT BACKGROUND & DARK SCRIM
           ===================================================================== */}
        {activePage === 'home' && (
          <section className="relative mx-3 sm:mx-6 lg:mx-8 mt-4 rounded-3xl overflow-hidden min-h-[620px] lg:min-h-[680px] flex items-center shadow-xl border border-slate-800/40">
            {/* Background Image with Continuous Zoom Animation (Ken Burns) */}
            <div className="absolute inset-0 overflow-hidden z-0">
              <img
                src={siteData.doctorPortraitUrl}
                alt={`${siteData.doctorName} - ${siteData.clinicName[lang]}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center sm:object-[center_20%] animate-hero-zoom"
              />
              {/* Semi-transparent dark overlay calibrated so background portrait remains clearly visible */}
              <div className="absolute inset-0 bg-slate-950/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/55 to-slate-950/30" />
            </div>

            {/* Foreground Hero Content — Extra bottom padding so bottom wave never overlaps text */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-12 pb-24 sm:py-20 lg:py-24 relative z-10 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Left Column (7 cols): Slogans, Headline, Synthesis & Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55 }}
                  className="lg:col-span-7 space-y-5 sm:space-y-6 text-white"
                >
                  <div className="inline-flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-sky-300">
                    <span>{siteData.sloganPrimary[lang]}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-white">{siteData.doctorName}</span>
                  </div>

                  <h1
                    className="text-2xl sm:text-4xl lg:text-[52px] font-extrabold text-white leading-[1.14] tracking-tight"
                    style={{ textWrap: 'balance' }}
                  >
                    {lang === 'fr' ? (
                      <>
                        Cabinet Médical de Cardiologie{' '}
                        <span className="text-sky-300">Paris 16</span>
                      </>
                    ) : (
                      <>
                        Cardiology Medical Practice{' '}
                        <span className="text-sky-300">Paris 16</span>
                      </>
                    )}
                  </h1>

                  {/* Live Lottie ECG Monitor Wave & Pulse Inspired by the Official Logo */}
                  <div className="flex items-center gap-3">
                    <MedicalLottie variant="heartbeat-pulse" className="w-11 h-11" />
                    <MedicalLottie variant="ecg-monitor" className="w-48 sm:w-64 h-10" />
                  </div>

                  <p className="text-base sm:text-xl font-medium text-slate-200 italic">
                    “{siteData.sloganSecondary[lang]}”
                  </p>

                  <p className="text-sm sm:text-base text-slate-200/95 leading-relaxed max-w-2xl">
                    {siteData.synthesisParagraph1[lang]} {siteData.synthesisParagraph2[lang]}
                  </p>

                  {/* Primary & Secondary Action Buttons — Solid Clinical Blue CTA (10% Accent Rule) */}
                  <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-2">
                    <button
                      type="button"
                      onClick={() => openBookingWithSubject()}
                      className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#0052CC] hover:bg-[#0041A3] text-white text-xs sm:text-sm font-bold shadow-lg flex items-center justify-center gap-2.5 btn-hover-lift hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>
                        {lang === 'fr' ? 'Prendre Rendez-vous' : 'Book an Appointment'}
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>

                    <a
                      href="/explorations"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToPage('explorations');
                      }}
                      className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 btn-hover-lift hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Stethoscope className="w-4 h-4 text-sky-300 shrink-0" />
                      <span>
                        {lang === 'fr'
                          ? '8 Explorations Sur Place'
                          : '8 On-Site Explorations'}
                      </span>
                    </a>
                  </div>

                  {/* Direct Phone & Address Bar */}
                  <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-200">
                    <a
                      href={`tel:${siteData.phone.replace(/\s+/g, '')}`}
                      className="flex items-center gap-2 font-mono font-bold text-white hover:text-sky-300"
                    >
                      <PhoneCall className="w-4 h-4 text-sky-300 shrink-0" />
                      <span>{siteData.phone}</span>
                    </a>
                    <span className="hidden sm:inline text-white/30">|</span>
                    <div className="flex items-start sm:items-center gap-2">
                      <MapPin className="w-4 h-4 text-sky-300 shrink-0 mt-0.5 sm:mt-0" />
                      <span className="break-words">{siteData.addressShort[lang]}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column (5 cols): Glassmorphic Logo & Quick Highlights Over the Zooming Background */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="lg:col-span-5 flex flex-col gap-4"
                >
                  <div className="bg-slate-900/55 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-white/20 text-white shadow-2xl space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <img
                        src={siteData.logoUrl}
                        alt="Logo Officiel Cabinet Paris 16"
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-white p-2 shadow-md shrink-0"
                      />
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-sky-300">
                          {siteData.specialty[lang]}
                        </div>
                        <h2 className="text-lg sm:text-xl font-extrabold text-white">
                          {siteData.doctorName}
                        </h2>
                        <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                          {lang === 'fr'
                            ? 'Bilan complet sur place le même jour à Bonapriso'
                            : 'Complete same-day on-site cardiac workup in Bonapriso'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                      {[
                        {
                          title: { fr: 'Accueil & Écoute', en: 'Active Listening' },
                          sub: { fr: 'Sans précipitation', en: 'Unhurried care' },
                        },
                        {
                          title: { fr: 'Bilan Même Jour', en: 'Same-Day Workup' },
                          sub: { fr: 'ECG, Écho, Holter, MAPA', en: 'ECG, Echo, Holter, ABPM' },
                        },
                        {
                          title: { fr: 'Apnée du Sommeil', en: 'Sleep Apnea' },
                          sub: { fr: 'Polygraphie nocturne', en: 'Nocturnal polygraphy' },
                        },
                        {
                          title: { fr: 'Suivi Continu', en: 'Phone Follow-Up' },
                          sub: { fr: 'Rappels & contrôle', en: 'Checkup reminders' },
                        },
                      ].map((pill, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs"
                        >
                          <div className="text-xs font-bold text-white">{pill.title[lang]}</div>
                          <div className="text-[11px] text-slate-300 mt-0.5">{pill.sub[lang]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Animated Undulating Wave Divider at Bottom of Hero */}
            <div className="absolute bottom-0 inset-x-0 overflow-hidden leading-none pointer-events-none z-10">
              <svg
                viewBox="0 0 1440 70"
                preserveAspectRatio="none"
                className="w-[105%] h-10 sm:h-14 animate-wave-svg"
              >
                <path
                  d="M0,32 C320,72 640,0 960,36 C1200,64 1360,16 1440,32 L1440,70 L0,70 Z"
                  fill="#F8FAFC"
                />
              </svg>
            </div>
          </section>
        )}

        {/* =====================================================================
            SECTION 2: PRÉSENTATION DU MÉDECIN (DR ANNICK TCHAM)
            - Image Clip Reveal, Scroll Parallax, Word-by-Word Text Mask Reveal, Signature Reveal
           ===================================================================== */}
        {(activePage === 'home' || activePage === 'about') && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
            <div className="bg-white rounded-3xl p-5 sm:p-10 lg:p-12 section-hover-border">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Doctor Portrait with Clip Reveal & Clean Editorial Caption Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-5"
                >
                  <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-md bg-white group">
                    <div className="overflow-hidden h-[340px] sm:h-[410px] bg-slate-100">
                      <img
                        src={siteData.doctorPortraitUrl}
                        alt={siteData.doctorName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="bg-slate-50 p-5 text-[#0F172A] border-t border-slate-200/80">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC] block">
                        {siteData.specialty[lang]} · Bonapriso, Douala
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold mt-0.5 text-[#0F172A]">
                        {siteData.doctorName}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">{siteData.clinicName[lang]}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Word-by-Word Presentation, 4 Pillars & Progressive Signature Draw (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                      {lang === 'fr'
                        ? 'SECTION 02 · PRÉSENTATION DU MÉDECIN & ENGAGEMENT'
                        : 'SECTION 02 · PHYSICIAN PROFILE & COMMITMENT'}
                    </p>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] mt-1 tracking-tight">
                      {siteData.doctorName},{' '}
                      <span className="text-[#0052CC]">{siteData.specialty[lang]}</span>
                    </h2>
                  </div>

                  {/* Word-by-Word Text Mask Reveal — Always 100% visible */}
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {bioWords.map((word, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: Math.min(idx * 0.015, 0.6) }}
                        className="inline-block mr-1.5"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </p>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {siteData.synthesisParagraph2[lang]}
                  </p>

                  {/* The 4 Differentiators ("Notre Particularité") — Clean 60-30-10 surfaces */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {siteData.particularities.map((part, i) => (
                      <motion.div
                        key={part.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.08 }}
                        className="p-4 rounded-2xl bg-slate-50/80 wave-hover-card"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-9 h-9 rounded-xl bg-[#F0F6FF] text-[#0052CC] border border-blue-100 flex items-center justify-center shrink-0">
                            {getParticularityIcon(part.iconName)}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#0F172A]">
                              {part.title[lang]}
                            </h4>
                            <p className="text-[11px] font-semibold text-[#0052CC]">
                              {part.subtitle[lang]}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {part.description[lang]}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progressive SVG Signature Reveal + CTA */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {lang === 'fr' ? 'Signature Médicale Officielle' : 'Official Medical Signature'}
                      </div>
                      <svg viewBox="0 0 260 56" className="w-52 h-12 mt-1" fill="none">
                        <path
                          d="M12 40 C28 14, 44 12, 52 38 C58 22, 74 18, 86 34 C98 46, 118 14, 134 26 C148 36, 162 20, 184 28 C204 34, 225 18, 248 24"
                          stroke="#0052CC"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          className="animate-signature-draw"
                        />
                        <path
                          d="M42 46 L210 42"
                          stroke="#94A3B8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <text
                          x="14"
                          y="52"
                          fill="#0F172A"
                          fontSize="10"
                          fontWeight="600"
                          fontStyle="italic"
                        >
                          Dr Annick TCHAM · Cardiologue Paris 16
                        </text>
                      </svg>
                    </div>

                    <button
                      type="button"
                      onClick={() => openBookingWithSubject()}
                      className="px-6 py-3.5 rounded-full bg-[#0052CC] hover:bg-[#061B49] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <span>
                        {lang === 'fr'
                          ? 'Prendre RDV avec le Dr TCHAM'
                          : 'Book with Dr TCHAM'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            SECTION 3: SPÉCIALITÉS MÉDICALES & 8 PATHOLOGIES PRISES EN CHARGE
            - Stagger Cards Reveal, 3D Card Hover, Icon Draw, Inline Card Expansion
           ===================================================================== */}
        {(activePage === 'home' || activePage === 'pathologies') && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                  {lang === 'fr'
                    ? 'SECTION 03 · SPÉCIALITÉS MÉDICALES & PATHOLOGIES'
                    : 'SECTION 03 · MEDICAL SPECIALTIES & CONDITIONS'}
                </p>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] mt-1 tracking-tight">
                  {lang === 'fr'
                    ? 'Les 8 Pathologies Cardiovasculaires Prises en Charge'
                    : 'The 8 Cardiovascular Conditions We Treat'}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-2xl">
                  {lang === 'fr'
                    ? 'Cliquez sur une pathologie pour agrandir la carte et consulter les symptômes, la prévention et le protocole de suivi.'
                    : 'Click any condition card to expand it and inspect symptoms, prevention, and clinical follow-up.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteData.pathologies.map((pat, idx) => {
                const isExpanded = expandedPathologyId === pat.id;
                return (
                  <motion.div
                    key={pat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className={`bg-white rounded-3xl p-6 card-hover-border flex flex-col justify-between transition-all ${
                      isExpanded
                        ? 'md:col-span-2 ring-2 ring-[#0052CC] bg-slate-50/60'
                        : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="w-11 h-11 rounded-2xl bg-[#F0F6FF] text-[#0052CC] border border-blue-100 flex items-center justify-center font-mono font-bold text-sm">
                          {pat.number}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedPathologyId(isExpanded ? null : pat.id)
                          }
                          className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>{isExpanded ? (lang === 'fr' ? 'Réduire' : 'Collapse') : (lang === 'fr' ? 'Développer' : 'Expand')}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A]">
                        {pat.title[lang]}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {pat.shortDesc[lang]}
                      </p>

                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-slate-200/80 space-y-3"
                        >
                          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                            {pat.details[lang]}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3 rounded-2xl bg-white border border-slate-200">
                              <div className="text-[11px] font-bold uppercase text-slate-500">
                                {lang === 'fr' ? 'Symptômes fréquents' : 'Common Symptoms'}
                              </div>
                              <p className="text-xs text-slate-700 mt-1">{pat.symptoms[lang]}</p>
                            </div>
                            <div className="p-3 rounded-2xl bg-white border border-slate-200">
                              <div className="text-[11px] font-bold uppercase text-[#0052CC]">
                                {lang === 'fr' ? 'Prévention & Suivi' : 'Prevention & Care'}
                              </div>
                              <p className="text-xs text-slate-700 mt-1">{pat.prevention[lang]}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedClinicalItem({ kind: 'pathology', item: pat })
                        }
                        className="text-xs font-bold text-[#0052CC] hover:text-[#061B49] transition-colors cursor-pointer"
                      >
                        {lang === 'fr' ? 'Fiche clinique complète' : 'Full clinical sheet'}
                      </button>
                      <button
                        type="button"
                        onClick={() => openBookingWithSubject(pat.title[lang])}
                        className="px-3.5 py-2 rounded-full bg-slate-100 hover:bg-[#0052CC] text-[#0F172A] hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>{lang === 'fr' ? 'Prendre RDV' : 'Book'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* =====================================================================
            SECTION 4: PARCOURS DE SOINS RASSURANT (CLEAN ARCHITECTURAL TIMELINE)
            - 60-30-10 Neutral White Surface with Single-Tone Clinical Blue Progress
           ===================================================================== */}
        {(activePage === 'home' || activePage === 'about') && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="bg-white rounded-3xl p-7 sm:p-12 text-[#0F172A] section-hover-border relative overflow-hidden">
              <div className="max-w-2xl mb-10">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                  {lang === 'fr'
                    ? 'SECTION 04 · PARCOURS DE SOINS DU PATIENT'
                    : 'SECTION 04 · PATIENT CARE JOURNEY'}
                </p>
                <h2 className="text-2xl sm:text-4xl font-extrabold mt-1 tracking-tight text-[#0F172A]">
                  {lang === 'fr'
                    ? 'Votre Parcours Cardiologique en 4 Étapes Simples'
                    : 'Your Cardiology Care Journey in 4 Clear Steps'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {lang === 'fr'
                    ? 'Tout est organisé au Cabinet Médical de Cardiologie Paris 16 pour vous éviter les déplacements multiples et vous offrir un diagnostic complet le jour même.'
                    : 'Everything at Paris 16 Cardiology Medical Practice is designed to spare you multiple trips and provide a complete same-day diagnosis.'}
                </p>
              </div>

              {/* Animated Progress Line & 4 Steps */}
              <div className="relative">
                <div className="hidden lg:block absolute top-8 left-10 right-10 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                    className="h-full bg-[#0052CC]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {[
                    {
                      step: '01',
                      title: {
                        fr: 'Accueil & Écoute',
                        en: 'Welcome & Listening',
                      },
                      desc: {
                        fr: 'On écoute votre histoire et vos symptômes sans précipitation dans un cadre apaisant.',
                        en: 'We listen to your medical history and symptoms without rushing in a reassuring setting.',
                      },
                    },
                    {
                      step: '02',
                      title: {
                        fr: 'Explorations Sur Place',
                        en: 'On-Site Explorations',
                      },
                      desc: {
                        fr: 'ECG, Échocardiographie Doppler, Holter, MAPA ou Polygraphie réalisés le même jour sur place.',
                        en: 'ECG, Doppler Echocardiography, Holter, ABPM, or Polygraphy performed on-site the same day.',
                      },
                    },
                    {
                      step: '03',
                      title: {
                        fr: 'Explications Simples',
                        en: 'Plain-Language Diagnosis',
                      },
                      desc: {
                        fr: 'Compte-rendu immédiat expliqué en langage clair par le Dr Annick TCHAM.',
                        en: 'Immediate diagnostic report explained in plain, understandable language by Dr Annick TCHAM.',
                      },
                    },
                    {
                      step: '04',
                      title: {
                        fr: 'Suivi Téléphonique',
                        en: 'Continuous Follow-Up',
                      },
                      desc: {
                        fr: 'Après la consultation, suivi téléphonique, rappel de vos contrôles et accompagnement.',
                        en: 'After your visit, dedicated phone follow-up, checkup reminders, and ongoing care.',
                      },
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.12 }}
                      className="bg-slate-50/90 border border-slate-200/80 rounded-2xl p-5 hover:border-[#0052CC]/30 transition-all"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-[#0052CC] text-white font-mono font-extrabold text-sm flex items-center justify-center shadow-xs mb-4">
                        {item.step}
                      </div>
                      <h3 className="text-base font-extrabold text-[#0F172A]">
                        {item.title[lang]}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {item.desc[lang]}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            SECTION 5: TECHNOLOGIES & ÉQUIPEMENTS MÉDICAUX (8 EXPLORATIONS)
            - Image Zoom Reveal, Interactive Hotspots & Floating Labels, Sleep Apnea Banner
           ===================================================================== */}
        {(activePage === 'home' || activePage === 'explorations') && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                  <MedicalLottie variant="ecg-monitor" className="w-20 h-7" />
                  <span>
                    {lang === 'fr'
                      ? 'SECTION 05 · TECHNOLOGIES & EXPLORATIONS CARDIOLOGIQUES'
                      : 'SECTION 05 · TECHNOLOGIES & CARDIAC EXPLORATIONS'}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] mt-1 tracking-tight">
                  {lang === 'fr'
                    ? 'Plateau Technique & 8 Explorations Sur Place'
                    : 'Diagnostic Platform & 8 On-Site Explorations'}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-3xl leading-relaxed">
                  {lang === 'fr'
                    ? 'Examens réalisés sur place le jour même sans délai d’attente. Pour les examens directs (ECG, Échocardiographie Doppler, Épreuve d’effort, Doppler vasculaire), résultats remis le jour même. Pour les enregistrements continus (Holter ECG, MAPA, Polygraphie de l’apnée du sommeil), pose le jour même et résultat remis le jour de la dépose de l’appareil.'
                    : 'Examinations performed on-site the same day without delay. Direct tests (ECG, Doppler Echo, Stress Test, Vascular Doppler) have same-day reports. Continuous monitoring devices (Holter ECG, ABPM, Sleep Polygraphy) are fitted same day, with results delivered on device return.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteData.explorations.map((exp, idx) => {
                const isHotspotOpen = activeHotspotId === exp.id;
                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    className="bg-white rounded-3xl overflow-hidden wave-hover-card flex flex-col justify-between group"
                  >
                    <div>
                      {/* Visual Equipment Slot with Interactive Hotspot & Floating Label */}
                      <div className="relative">
                        <ExplorationIllustration
                          type={exp.illustrationType}
                          className="w-full h-48"
                        />

                        {/* Floating Tech Label */}
                        <div
                          className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg backdrop-blur-md text-white text-[11px] font-mono font-bold shadow-xs flex items-center gap-1.5 ${
                            exp.badgeText?.fr.includes('Dépose')
                              ? 'bg-amber-950/85 border border-amber-500/40 text-amber-200'
                              : exp.sameDay
                                ? 'bg-slate-900/85 border border-slate-700/60 text-white'
                                : 'bg-indigo-950/85 border border-indigo-500/40 text-indigo-200'
                          }`}
                        >
                          <span>#{exp.number}</span>
                          <span className="opacity-40">·</span>
                          <span>
                            {exp.badgeText
                              ? exp.badgeText[lang]
                              : exp.sameDay
                                ? lang === 'fr'
                                  ? 'Même Jour'
                                  : 'Same Day'
                                : 'Sur RDV'}
                          </span>
                        </div>

                        {/* Interactive Hotspot Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspotId(isHotspotOpen ? null : exp.id);
                          }}
                          aria-expanded={isHotspotOpen}
                          className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer ${
                            isHotspotOpen
                              ? 'bg-[#0052CC] text-white ring-2 ring-white'
                              : 'bg-white/95 text-[#0F172A] hover:bg-[#0052CC] hover:text-white'
                          }`}
                          title={lang === 'fr' ? 'Caractéristiques techniques' : 'Technical specs'}
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-5 space-y-3">
                        <div
                          onClick={() =>
                            setSelectedClinicalItem({ kind: 'exploration', item: exp })
                          }
                          className="cursor-pointer space-y-1.5"
                        >
                          <h3 className="text-base font-extrabold text-[#0F172A] group-hover:text-[#0052CC] transition-colors">
                            {exp.title[lang]}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {exp.shortDesc[lang]}
                          </p>

                          {/* Explicit Result Timing Indicator */}
                          <div className="pt-1.5">
                            {exp.badgeText?.fr.includes('Dépose') ? (
                              <div className="w-full p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-2 text-left">
                                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                <div className="text-[11px] leading-snug">
                                  <span className="font-bold text-amber-950 block">
                                    {lang === 'fr'
                                      ? 'Pose le jour même au cabinet'
                                      : 'Same-day on-site fitting'}
                                  </span>
                                  <span className="text-amber-800 font-medium">
                                    {lang === 'fr'
                                      ? 'Résultat le jour de la dépose de l’appareil'
                                      : 'Results upon device return (next day)'}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <div className="w-full p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200/90 flex items-start gap-2 text-left">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <div className="text-[11px] leading-snug">
                                  <span className="font-bold text-emerald-950 block">
                                    {lang === 'fr'
                                      ? 'Examen réalisé sur place'
                                      : 'Performed on-site'}
                                  </span>
                                  <span className="text-emerald-800 font-medium">
                                    {lang === 'fr'
                                      ? 'Résultat & compte-rendu le jour même'
                                      : 'Immediate report on the same day'}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Expandable Technical Specs Box — Clean Slate Surface */}
                        {isHotspotOpen && (
                          <div className="bg-slate-50 text-[#0F172A] p-3.5 rounded-2xl text-xs border border-slate-200 space-y-2">
                            <div className="font-bold text-[#0052CC] flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#0052CC] shrink-0" />
                              <span>{exp.duration[lang]}</span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed">
                              {exp.preparation[lang]}
                            </p>
                            {exp.resultTiming && (
                              <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-700">
                                <strong className="text-[#0052CC] block mb-0.5">
                                  {lang === 'fr' ? 'Remise du résultat :' : 'Result delivery:'}
                                </strong>
                                {exp.resultTiming[lang]}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedClinicalItem({ kind: 'exploration', item: exp })
                        }
                        className="text-xs font-bold text-[#0052CC] hover:text-[#061B49] transition-colors cursor-pointer"
                      >
                        {lang === 'fr' ? 'Détails & Préparation' : 'Details & Prep'}
                      </button>
                      <button
                        type="button"
                        onClick={() => openBookingWithSubject(exp.title[lang])}
                        className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#0052CC] text-[#0F172A] group-hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Réserver"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Featured Flyer Alert Banner: Dépistage de l'Apnée du Sommeil — Calm Clinical Navy */}
            <div className="rounded-3xl bg-[#0F172A] border border-slate-800 p-6 sm:p-9 text-white shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-2xl bg-[#0052CC]/25 border border-sky-400/30 text-sky-300 flex items-center justify-center shrink-0">
                  <Moon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-300">
                    {lang === 'fr'
                      ? 'DÉPISTAGE DE L’APNÉE DU SOMMEIL · POLYGRAPHIE VENTILATOIRE'
                      : 'SLEEP APNEA SCREENING · RESPIRATORY POLYGRAPHY'}
                  </p>
                  <h3 className="text-lg sm:text-2xl font-extrabold mt-1 text-white">
                    {siteData.sleepApneaBanner[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
                    {siteData.sleepApneaSubtext[lang]}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  openBookingWithSubject(
                    lang === 'fr'
                      ? 'Dépistage de l’apnée du sommeil (Polygraphie ventilatoire)'
                      : 'Sleep Apnea Screening (Respiratory Polygraphy)'
                  )
                }
                className="px-6 py-3.5 rounded-full bg-[#0052CC] hover:bg-[#0041A3] text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 whitespace-nowrap shrink-0 shadow-xs transition-colors cursor-pointer"
              >
                <span>
                  {lang === 'fr' ? 'Réserver mon dépistage' : 'Book Sleep Screening'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Corporate & Community Screening Banner: Visites Systématiques & Dépistages */}
            <div className="rounded-3xl bg-gradient-to-r from-[#061B49] via-[#0052CC] to-[#0A2540] border border-blue-400/30 p-6 sm:p-9 text-white shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-2xl bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-sky-200" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/15 text-[10.5px] font-mono font-bold uppercase tracking-wider text-sky-200">
                    <span>
                      {lang === 'fr'
                        ? 'SANTÉ AU TRAVAIL & ENTREPRISES · DOUALA & CAMEROUN'
                        : 'OCCUPATIONAL HEALTH & CORPORATE · CAMEROON'}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-extrabold mt-1 text-white">
                    {lang === 'fr'
                      ? 'Visites Médicales Systématiques & Campagnes de Dépistage'
                      : 'Corporate Systematic Check-ups & Screening Campaigns'}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1.5 max-w-3xl leading-relaxed">
                    {lang === 'fr'
                      ? 'Le cabinet accompagne les entreprises, institutions et collectivités pour les bilans annuels systématiques des salariés et cadres (aptitude cardiologique, prévention des AVC) et organise des campagnes ciblées de dépistage en milieu professionnel (hypertension artérielle, risque cardiovasculaire, apnée du sommeil).'
                      : 'We support businesses and organizations with annual systematic medical check-ups for employees and executives (fitness-to-work cardiology, stroke prevention) and organize custom on-site screening campaigns (hypertension, cardiovascular risk, sleep apnea).'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() =>
                    openBookingWithSubject(
                      lang === 'fr'
                        ? 'Visite Systématique & Bilan de Santé d’Entreprise'
                        : 'Corporate Systematic Health Check-up'
                    )
                  }
                  className="px-5 py-3 rounded-full bg-white hover:bg-slate-100 text-[#0052CC] text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 whitespace-nowrap shadow-md transition-all cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-[#0052CC]" />
                  <span>{lang === 'fr' ? 'Bilan Entreprise' : 'Corporate Checkup'}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    openBookingWithSubject(
                      lang === 'fr'
                        ? 'Campagne de Dépistage Cardiovasculaire (Entreprise / Collectivité)'
                        : 'Cardiovascular Screening Campaign'
                    )
                  }
                  className="px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer"
                >
                  <Users className="w-4 h-4 text-sky-200" />
                  <span>{lang === 'fr' ? 'Campagne Dépistage' : 'Screening Campaign'}</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            SECTION 6: CHIFFRES CLÉS & STATISTIQUES VÉRIFIÉS DU CABINET
            - Utilise uniquement les données réelles et vérifiées du cabinet
           ===================================================================== */}
        {activePage === 'home' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="bg-white rounded-3xl p-6 sm:p-10 section-hover-border space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                    {lang === 'fr'
                      ? 'SECTION 06 · INDICATEURS CLINIQUES VÉRIFIÉS DU CABINET'
                      : 'SECTION 06 · VERIFIED CLINICAL INDICATORS'}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1">
                    {lang === 'fr'
                      ? 'Le Cabinet Médical de Cardiologie Paris 16 en Chiffres Réels'
                      : 'Paris 16 Cardiology Medical Practice in Verified Figures'}
                  </h2>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {siteData.doctorName} · Bonapriso, Douala
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    number: '08',
                    unit: lang === 'fr' ? 'Pathologies' : 'Conditions',
                    title: {
                      fr: 'Pathologies Cardiovasculaires Prises en Charge',
                      en: 'Cardiovascular Conditions Treated',
                    },
                    desc: {
                      fr: 'HTA, Insuffisance cardiaque, Arythmie, Angor, Infarctus, AVC, Embolie, Apnée.',
                      en: 'Hypertension, Heart Failure, Arrhythmia, Angina, MI, Stroke, PE, Sleep Apnea.',
                    },
                    progress: 100,
                  },
                  {
                    number: '08',
                    unit: lang === 'fr' ? 'Explorations' : 'Explorations',
                    title: {
                      fr: 'Examens Cardiologiques Réalisés Sur Place',
                      en: 'Cardiological Exams Performed On-Site',
                    },
                    desc: {
                      fr: 'ECG, Holter ECG, MAPA, Écho Doppler, ETO, Doppler vasculaire, Effort, Polygraphie.',
                      en: 'ECG, Holter, ABPM, Echo Doppler, TEE, Vascular Doppler, Stress Test, Polygraphy.',
                    },
                    progress: 100,
                  },
                  {
                    number: '01',
                    unit: lang === 'fr' ? 'Seul Lieu' : 'Single Hub',
                    title: {
                      fr: 'Bilan Complet Réalisé le Même Jour',
                      en: 'Complete Workup on the Same Day',
                    },
                    desc: {
                      fr: "Pas besoin d'aller dans 3 endroits différents : plateau technique réuni à Bonapriso.",
                      en: 'No need to visit 3 different locations: full diagnostic suite in Bonapriso.',
                    },
                    progress: 100,
                  },
                  {
                    number: '04',
                    unit: lang === 'fr' ? 'Engagements' : 'Pillars',
                    title: {
                      fr: 'Piliers de Notre Particularité Médicale',
                      en: 'Core Pillars of Our Medical Care',
                    },
                    desc: {
                      fr: 'Accueil & écoute sans précipitation, Technologie, Suivi téléphonique et Rapidité.',
                      en: 'Unhurried listening, On-site technology, Phone follow-up, and Fast scheduling.',
                    },
                    progress: 100,
                  },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="p-6 rounded-2xl bg-slate-50/90 border border-slate-200/80 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#0F172A] tabular-nums">
                          {stat.number}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                          {stat.unit}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-[#0F172A] mt-2">
                        {stat.title[lang]}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {stat.desc[lang]}
                      </p>
                    </div>

                    {/* Animated Progress Bar Reveal — Clean Single-Tone Clinical Blue */}
                    <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <motion.div
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${stat.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.2 }}
                        className="h-full rounded-full bg-[#0052CC]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            SECTION 7: TÉMOIGNAGES DES PATIENTS (SMOOTH SLIDER + DIRECT PUBLISH)
           ===================================================================== */}
        {(activePage === 'home' || activePage === 'testimonials') && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <TestimonialsSection
              testimonials={testimonials}
              siteData={siteData}
              lang={lang}
              onTestimonialAdded={(updatedList) => setTestimonials(updatedList)}
            />
          </section>
        )}

        {/* =====================================================================
            SECTION 8: GALERIE VISUELLE DU CABINET MÉDICAL, APPAREILS & CONSEILS SANTÉ
            - Clean White Cards (60-30-10 Rule) so medical photography stands out cleanly
           ===================================================================== */}
        {activePage === 'home' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                  {lang === 'fr'
                    ? 'SECTION 08 · GALERIE DES APPAREILS MÉDICAUX & PRÉVENTION'
                    : 'SECTION 08 · MEDICAL EQUIPMENT GALLERY & PREVENTION'}
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F172A] mt-1">
                  {lang === 'fr'
                    ? 'Nos Équipements de Pointe & Dossiers de Prévention'
                    : 'Our Advanced Medical Devices & Prevention Insights'}
                </h2>
              </div>
              <a
                href="/explorations"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage('explorations');
                }}
                className="px-4 py-2.5 rounded-full bg-white border border-slate-200 hover:border-[#0052CC] text-xs font-bold text-[#0F172A] flex items-center gap-2 self-start cursor-pointer transition-colors"
              >
                <span>
                  {lang === 'fr' ? 'Voir les 8 explorations' : 'View All 8 Explorations'}
                </span>
                <ArrowRight className="w-4 h-4 text-[#0052CC]" />
              </a>
            </div>

            {/* Equipment Showcase Grid — Clean White Cards + Real Medical Device Photographs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
              {[
                {
                  span: 'lg:col-span-4',
                  src: EQUIPMENT_IMAGES.echoDoppler,
                  tag: { fr: 'IMAGERIE CARDIAQUE HD', en: 'HD CARDIAC IMAGING' },
                  title: {
                    fr: 'Échocardiographie Doppler Couleur',
                    en: 'Color Doppler Echocardiography',
                  },
                  desc: {
                    fr: 'Analyse en temps réel du muscle cardiaque, des valves et des flux intracardiaques sur place.',
                    en: 'Real-time assessment of heart muscle, valves, and intracardiac blood flow on-site.',
                  },
                },
                {
                  span: 'lg:col-span-4',
                  src: EQUIPMENT_IMAGES.etoProbe,
                  tag: { fr: 'SONDE MULTIPLAN HD', en: 'MULTIPLANE TEE PROBE' },
                  title: {
                    fr: 'Échographie Trans-Œsophagienne (ETO)',
                    en: 'Transesophageal Echocardiography (TEE)',
                  },
                  desc: {
                    fr: 'Imagerie ultrasonore haute précision des valves cardiaques et des cavités auriculaires.',
                    en: 'High-precision ultrasound imaging of heart valves and atrial chambers.',
                  },
                },
                {
                  span: 'lg:col-span-4',
                  src: EQUIPMENT_IMAGES.vascularDoppler,
                  tag: { fr: 'ARTÈRES & VEINES', en: 'ARTERIES & VEINS' },
                  title: {
                    fr: 'Écho-Doppler Vasculaire (Carotides & Membres)',
                    en: 'Vascular Color Doppler (Carotid & Limbs)',
                  },
                  desc: {
                    fr: 'Dépistage des sténoses carotidiennes, prévention des AVC et exploration veineuse et artérielle.',
                    en: 'Carotid stenosis screening, stroke prevention, and venous/arterial exploration.',
                  },
                },
                {
                  span: 'lg:col-span-4',
                  src: EQUIPMENT_IMAGES.ecgHolter,
                  tag: { fr: 'ÉLECTROCARDIOGRAPHIE', en: '12-LEAD ECG' },
                  title: {
                    fr: 'ECG Numérique 12 Dérivations',
                    en: 'Digital 12-Lead Electrocardiogram',
                  },
                  desc: {
                    fr: 'Tracé immédiat au repos pour détecter troubles du rythme, ischémie et anomalies de conduction.',
                    en: 'Immediate resting trace to detect arrhythmias, ischemia, and conduction abnormalities.',
                  },
                },
                {
                  span: 'lg:col-span-4',
                  src: EQUIPMENT_IMAGES.holterWearable,
                  tag: { fr: 'RYTHMOLOGIE 24H–72H', en: '24H–72H HOLTER' },
                  title: {
                    fr: 'Boîtier Holter ECG Portable (24h–72h)',
                    en: 'Wearable 24h–72h Holter ECG Recorder',
                  },
                  desc: {
                    fr: 'Enregistrement continu jour et nuit des palpitations et arythmies intermittentes.',
                    en: 'Continuous day-and-night recording of palpitations and intermittent arrhythmias.',
                  },
                },
                {
                  span: 'lg:col-span-4',
                  src: EQUIPMENT_IMAGES.mapa,
                  tag: { fr: 'SUIVI TENSIONNEL', en: 'BLOOD PRESSURE' },
                  title: {
                    fr: 'Holter Tensionnel (MAPA 24h)',
                    en: '24h ABPM Blood Pressure Monitor',
                  },
                  desc: {
                    fr: 'Mesure automatique jour et nuit pour un équilibrage précis de l’hypertension artérielle (HTA).',
                    en: 'Automated day and night monitoring for accurate hypertension care.',
                  },
                },
                {
                  span: 'lg:col-span-6',
                  src: EQUIPMENT_IMAGES.stressTest,
                  tag: { fr: 'EXPLORATION FONCTIONNELLE', en: 'EXERCISE CARDIOLOGY' },
                  title: {
                    fr: 'Plateau d’Épreuve d’Effort Cardiologique',
                    en: 'Cardiac Exercise Stress Test Suite',
                  },
                  desc: {
                    fr: 'Cyclo-ergomètre médical connecté à une surveillance ECG 12 dérivations continue à l’effort.',
                    en: 'Medical ergometer connected to continuous 12-lead exercise ECG telemetry.',
                  },
                },
                {
                  span: 'lg:col-span-6',
                  src: EQUIPMENT_IMAGES.polygraphy,
                  tag: { fr: 'SOMMEIL & CARDIOLOGIE', en: 'SLEEP & HEART CARE' },
                  title: {
                    fr: 'Polygraphie Ventilatoire Nocturne (Apnée du Sommeil)',
                    en: 'Nocturnal Respiratory Polygraphy (Sleep Apnea)',
                  },
                  desc: {
                    fr: 'Vous ronflez ? Vous êtes fatigué au réveil ? Enregistrement nocturne complet à domicile.',
                    en: 'Snoring or waking up exhausted? Complete overnight home respiratory recording.',
                  },
                },
              ].map((eq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  onClick={() => openBookingWithSubject(eq.title[lang])}
                  className={`${eq.span} bg-white rounded-3xl overflow-hidden flex flex-col justify-between group cursor-pointer wave-hover-card`}
                >
                  <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-100">
                    <img
                      src={eq.src}
                      alt={eq.title[lang]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                    <span className="absolute top-3.5 left-3.5 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[#0F172A] border border-slate-200/80 shadow-2xs">
                      {eq.tag[lang]}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6 text-[#0F172A] flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] group-hover:text-[#0052CC] transition-colors">
                        {eq.title[lang]}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {eq.desc[lang]}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0052CC]">
                      <span>{lang === 'fr' ? 'Planifier cet examen' : 'Schedule this exam'}</span>
                      <ArrowRight className="w-4 h-4 text-[#0052CC] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Clinic Interior & Consultation Showcase Card with Real Photography + Lottie */}
            <div className="bg-white rounded-3xl overflow-hidden wave-hover-card grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 relative min-h-[240px] sm:min-h-[280px] overflow-hidden bg-slate-100">
                <img
                  src={EQUIPMENT_IMAGES.clinicInterior}
                  alt={siteData.clinicName[lang]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white flex items-center gap-3">
                  <img
                    src={siteData.logoUrl}
                    alt={siteData.clinicName[lang]}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl bg-white p-1 object-contain shrink-0 shadow-md"
                  />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-sky-300">
                      Bonapriso, Douala · Cameroun
                    </div>
                    <div className="text-sm font-extrabold">{siteData.clinicName[lang]}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-5">
                <div className="space-y-2.5">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                    <MedicalLottie variant="heartbeat-pulse" className="w-8 h-8" />
                    <span>{siteData.sloganPrimary[lang]}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                    {lang === 'fr'
                      ? 'Un Plateau Cardiologique Complet Réuni en un Seul Lieu à Bonapriso'
                      : 'A Complete Cardiology Diagnostic Center Under One Roof in Bonapriso'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {siteData.addressFull[lang]} — {siteData.synthesisParagraph2[lang]}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => openBookingWithSubject()}
                    className="px-5 py-3 rounded-full bg-[#0052CC] hover:bg-[#061B49] text-white text-xs font-extrabold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>
                      {lang === 'fr' ? 'Prendre Rendez-vous' : 'Book an Appointment'}
                    </span>
                  </button>
                  <a
                    href="/actualites-sante"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPage('insights');
                    }}
                    className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-extrabold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>
                      {lang === 'fr'
                        ? 'Lire le Blog Cardiology Insights'
                        : 'Read Cardiology Insights Blog'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#0052CC]" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =====================================================================
            SECTION 8B: CARDIOLOGY INSIGHTS — BLOG SANTÉ DU CŒUR & MAILLAGE INTERNE SEO
            - Heart Health Tips with direct backlinks to clinic Explorations & Pathologies
           ===================================================================== */}
        {(activePage === 'home' || activePage === 'insights') && (
          <CardiologyInsightsSection
            siteData={siteData}
            lang={lang}
            onSelectClinicalItem={(item) => setSelectedClinicalItem(item)}
            onBookWithSubject={(subj) => openBookingWithSubject(subj)}
            onNavigateToSection={(sec) => navigateToPage(sec)}
          />
        )}

        {/* =====================================================================
            SECTION 9: SECTION STRATÉGIQUE DE PRISE DE RENDEZ-VOUS + PLAN D'ACCÈS
            - Clean 60-30-10 Split Surface (Clinical Slate Info + Crisp White Form)
           ===================================================================== */}
        {(activePage === 'home' || activePage === 'contact') && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
            {/* Strategic Direct Booking Block */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-[#0F172A] border border-slate-800 p-6 sm:p-10 lg:p-12 text-white shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Column (5 cols): Direct Conversion Pitch & Emergency Contacts */}
                <div className="lg:col-span-5 space-y-5">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-sky-300">
                    {lang === 'fr'
                      ? 'SECTION 09 · PRISE DE RENDEZ-VOUS STRATÉGIQUE'
                      : 'SECTION 09 · DIRECT APPOINTMENT BOOKING'}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight text-white">
                    {lang === 'fr' ? (
                      <>
                        Planifiez Votre Consultation avec le{' '}
                        <span className="text-sky-300">{siteData.doctorName}</span>
                      </>
                    ) : (
                      <>
                        Schedule Your Consultation with{' '}
                        <span className="text-sky-300">{siteData.doctorName}</span>
                      </>
                    )}
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {lang === 'fr'
                      ? 'Rendez-vous rapide, même en urgence. Bilan cardiologique complet (ECG, Échocardiographie Doppler, Holter, MAPA, Polygraphie) réalisé sur place le même jour.'
                      : 'Fast appointment scheduling, including emergencies. Complete cardiology workup performed on-site the very same day.'}
                  </p>

                  <div className="space-y-3 pt-2">
                    <a
                      href={`tel:${siteData.phone.replace(/\s+/g, '')}`}
                      className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3.5 transition-colors"
                    >
                      <div className="w-11 h-11 rounded-xl bg-[#0052CC] text-white flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-300">
                          {lang === 'fr' ? 'Ligne directe & Urgences' : 'Direct Line & Emergencies'}
                        </div>
                        <div className="text-base sm:text-lg font-extrabold font-mono tabular-nums text-white">
                          {siteData.phone}
                        </div>
                      </div>
                    </a>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-slate-800 text-sky-300 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-300">
                          {lang === 'fr' ? 'Adresse à Bonapriso, Douala' : 'Bonapriso Address'}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          {siteData.addressShort[lang]}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (7 cols): Interactive Conversion Form */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 text-[#0F172A] shadow-lg">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0F172A] mb-4">
                    {lang === 'fr'
                      ? 'Formulaire de Réservation Rapide'
                      : 'Fast Appointment Booking Form'}
                  </h3>

                  <form onSubmit={handleInlineAppointmentSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#061B49] mb-1">
                          {lang === 'fr' ? 'Nom et Prénom *' : 'Full Name *'}
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={inlineName}
                            onChange={(e) => setInlineName(e.target.value)}
                            placeholder={lang === 'fr' ? 'Votre nom complet' : 'Your full name'}
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#F4F8FD] border border-slate-200 text-sm text-[#061B49] focus:outline-none focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/15 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#061B49] mb-1">
                          {lang === 'fr' ? 'Téléphone / WhatsApp *' : 'Phone / WhatsApp *'}
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            value={inlinePhone}
                            onChange={(e) => setInlinePhone(e.target.value)}
                            placeholder="+237 6..."
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#F4F8FD] border border-slate-200 text-sm text-[#061B49] font-mono focus:outline-none focus:border-[#0052CC] focus:ring-2 focus:ring-[#0052CC]/15 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#061B49] mb-1">
                          {lang === 'fr' ? 'E-mail (optionnel)' : 'Email (optional)'}
                        </label>
                        <input
                          type="email"
                          value={inlineEmail}
                          onChange={(e) => setInlineEmail(e.target.value)}
                          placeholder="patient@email.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FD] border border-slate-200 text-sm text-[#061B49] focus:outline-none focus:border-[#0052CC]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#061B49] mb-1">
                          {lang === 'fr' ? 'Date souhaitée *' : 'Preferred Date *'}
                        </label>
                        <input
                          type="date"
                          required
                          value={inlineDate}
                          onChange={(e) => setInlineDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FD] border border-slate-200 text-sm text-[#061B49] font-mono focus:outline-none focus:border-[#0052CC]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#061B49] mb-1">
                          {lang === 'fr' ? 'Heure / Créneau souhaité *' : 'Preferred Time / Slot *'}
                        </label>
                        <select
                          value={inlineTime}
                          onChange={(e) => setInlineTime(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#F4F8FD] border border-slate-200 text-xs font-semibold text-[#061B49] focus:outline-none focus:border-[#0052CC]"
                        >
                          <option value="08h30">08h30 (Matin)</option>
                          <option value="09h00">09h00 (Matin)</option>
                          <option value="09h30">09h30 (Matin)</option>
                          <option value="10h00">10h00 (Matin)</option>
                          <option value="10h30">10h30 (Matin)</option>
                          <option value="11h00">11h00 (Matin)</option>
                          <option value="11h30">11h30 (Matin)</option>
                          <option value="14h00">14h00 (Après-midi)</option>
                          <option value="14h30">14h30 (Après-midi)</option>
                          <option value="15h00">15h00 (Après-midi)</option>
                          <option value="15h30">15h30 (Après-midi)</option>
                          <option value="16h00">16h00 (Après-midi)</option>
                          <option value="16h30">16h30 (Après-midi)</option>
                          <option value="17h00">17h00 (Après-midi)</option>
                          <option value="Matinée (08h00 - 12h30)">
                            {lang === 'fr' ? 'Matinée (08h00 - 12h30)' : 'Morning (08:00 - 12:30)'}
                          </option>
                          <option value="Après-midi (13h30 - 18h00)">
                            {lang === 'fr'
                              ? 'Après-midi (13h30 - 18h00)'
                              : 'Afternoon (13:30 - 18:00)'}
                          </option>
                          <option value="Urgence dès que possible">
                            {lang === 'fr' ? 'Urgence dès que possible' : 'Urgent / Earliest Slot'}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#061B49] mb-1">
                        {lang === 'fr'
                          ? 'Motif de consultation ou examen souhaité'
                          : 'Reason for Consultation or Exam'}
                      </label>
                      <select
                        value={inlineService}
                        onChange={(e) => setInlineService(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FD] border border-slate-200 text-sm text-[#061B49] focus:outline-none focus:border-[#0052CC]"
                      >
                        <option value="Bilan Cardiologique Complet (Consultation + ECG + Écho sur place)">
                          {lang === 'fr'
                            ? 'Bilan Cardiologique Complet (Consultation + ECG + Écho sur place)'
                            : 'Complete Cardiology Workup (Consultation + On-site ECG + Echo)'}
                        </option>
                        <option value="Visite Systématique & Bilan de Santé d’Entreprise">
                          {lang === 'fr'
                            ? 'Visite Systématique & Bilan de Santé d’Entreprise (Médecine du Travail)'
                            : 'Corporate Systematic Health Check-up (Occupational Health)'}
                        </option>
                        <option value="Campagne de Dépistage Cardiovasculaire (Entreprise / Collectivité)">
                          {lang === 'fr'
                            ? 'Campagne de Dépistage Cardiovasculaire (Entreprise / Collectivité)'
                            : 'Cardiovascular Screening Campaign (Corporate / Community)'}
                        </option>
                        <option value="Dépistage Apnée du Sommeil (Polygraphie ventilatoire)">
                          {lang === 'fr'
                            ? 'Dépistage Apnée du Sommeil (Polygraphie ventilatoire)'
                            : 'Sleep Apnea Screening (Respiratory Polygraphy)'}
                        </option>
                        {siteData.explorations.map((e) => (
                          <option key={e.id} value={e.title[lang]}>
                            {e.title[lang]}
                          </option>
                        ))}
                        {siteData.pathologies.map((p) => (
                          <option key={p.id} value={p.title[lang]}>
                            {p.title[lang]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#061B49] mb-1">
                        {lang === 'fr' ? 'Précisions ou symptômes' : 'Symptoms or notes'}
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          value={inlineNotes}
                          onChange={(e) => setInlineNotes(e.target.value)}
                          placeholder={
                            lang === 'fr'
                              ? 'Ex: contrôle tension, palpitations, fatigue au réveil...'
                              : 'e.g. BP check, palpitations, morning fatigue...'
                          }
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#F4F8FD] border border-slate-200 text-sm text-[#061B49] focus:outline-none focus:border-[#0052CC]"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inlineUrgent}
                        onChange={(e) => setInlineUrgent(e.target.checked)}
                        className="w-4 h-4 accent-[#DC141C] rounded"
                      />
                      <AlertCircle className="w-4 h-4 text-[#DC141C] shrink-0" />
                      <span className="text-xs font-semibold text-red-900">
                        {lang === 'fr'
                          ? 'Rendez-vous prioritaire / Urgence cardiologique'
                          : 'Priority appointment / Cardiac emergency'}
                      </span>
                    </label>

                    {inlineError && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold">
                        {inlineError}
                      </div>
                    )}

                    {inlineSuccess && (
                      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{inlineSuccess}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={inlineSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#0052CC] hover:bg-[#061B49] text-white text-sm font-extrabold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {inlineSubmitting
                          ? lang === 'fr'
                            ? 'Enregistrement en cours...'
                            : 'Booking...'
                          : lang === 'fr'
                            ? 'Valider mon Rendez-vous au Cabinet'
                            : 'Confirm My Clinic Appointment'}
                      </span>
                    </button>

                    <div className="flex items-center gap-2 pt-1">
                      <div className="h-px bg-slate-200 flex-1" />
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {lang === 'fr' ? 'OU' : 'OR'}
                      </span>
                      <div className="h-px bg-slate-200 flex-1" />
                    </div>

                    <a
                      href={`https://wa.me/${siteData.whatsappNumber}?text=${encodeURIComponent(
                        lang === 'fr'
                          ? `Bonjour Dr Annick TCHAM (Cabinet Médical de Cardiologie Paris 16), je souhaite prendre rendez-vous.\nNom : ${inlineName || '...'}\nMotif : ${inlineService}\nDate souhaitée : ${inlineDate || '...'}\nHeure souhaitée : ${inlineTime || '...'}${inlineNotes ? `\nPrécisions : ${inlineNotes}` : ''}${inlineUrgent ? '\nURGENCE : Oui' : ''}`
                          : `Hello Dr Annick TCHAM (Paris 16 Cardiology Medical Practice), I would like to book an appointment.\nName: ${inlineName || '...'}\nReason: ${inlineService}\nPreferred Date: ${inlineDate || '...'}\nPreferred Time: ${inlineTime || '...'}${inlineNotes ? `\nNotes: ${inlineNotes}` : ''}${inlineUrgent ? '\nURGENT: Yes' : ''}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-200" />
                      <span>
                        {lang === 'fr'
                          ? 'Réserver Directement par WhatsApp'
                          : 'Book Directly via WhatsApp'}
                      </span>
                    </a>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Interactive Bonapriso Map & 13 Landmarks */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                  {lang === 'fr'
                    ? 'PLAN D’ACCÈS BONAPRISO · 13 REPÈRES GÉOGRAPHIQUES'
                    : 'BONAPRISO ACCESS MAP · 13 GEOGRAPHICAL LANDMARKS'}
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1">
                  {siteData.addressFull[lang]}
                </h3>
              </div>

              <BonaprisoMap
                siteData={siteData}
                lang={lang}
                onBookClick={() => openBookingWithSubject()}
              />
            </div>
          </section>
        )}

        {/* =====================================================================
            SECTION SEO & FAQ CARDIOLOGIQUE — DOUALA (BONAPRISO) & TOUT LE CAMEROUN
           ===================================================================== */}
        {(activePage === 'home' || activePage === 'contact' || activePage === 'about') && (
          <section
            aria-label={
              lang === 'fr'
                ? 'Questions fréquentes et couverture cardiologique à Douala et au Cameroun'
                : 'Frequently Asked Questions and Cardiology Coverage in Douala & Cameroon'
            }
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-10 section-hover-border space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                    {lang === 'fr'
                      ? 'CENTRE DE RÉFÉRENCE CARDIOLOGIQUE · DOUALA (BONAPRISO) & CAMEROUN'
                      : 'CARDIOLOGY REFERENCE CENTER · DOUALA (BONAPRISO) & CAMEROON'}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1">
                    {lang === 'fr'
                      ? 'Questions Fréquentes & Accueil des Patients de Douala et du Cameroun'
                      : 'FAQ & Care for Patients Across Douala and All of Cameroon'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-3xl">
                    {lang === 'fr'
                      ? 'Situé à Bonapriso (Douala), le Cabinet Médical de Cardiologie Paris 16 du Dr Annick TCHAM reçoit les patients de tous les quartiers de Douala ainsi que des 10 régions du Cameroun pour un bilan complet réalisé le jour même.'
                      : 'Located in Bonapriso (Douala), Dr Annick TCHAM’s Paris 16 Cardiology Medical Practice welcomes patients from all Douala neighborhoods and across all 10 regions of Cameroon for same-day cardiac evaluations.'}
                  </p>
                </div>

                <a
                  href={`tel:${siteData.phone.replace(/\s+/g, '')}`}
                  className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-xs font-extrabold font-mono flex items-center gap-2 self-start lg:self-end shrink-0 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-[#0052CC]" />
                  <span>{siteData.phone} · Douala, Cameroun</span>
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Interactive FAQ Accordion matching JSON-LD FAQPage (7 cols) */}
                <div className="lg:col-span-7 space-y-3">
                  {[
                    {
                      q: {
                        fr: 'Où se trouve le Cabinet Médical de Cardiologie Paris 16 à Douala ?',
                        en: 'Where is the Paris 16 Cardiology Medical Practice located in Douala?',
                      },
                      a: {
                        fr: 'Le cabinet du Dr Annick TCHAM est situé à Bonapriso, Douala (Fin rue pavée de l’École publique de Bonapriso, groupe 1), à proximité immédiate de l’École publique de Bonapriso, de la Rue Njo-Njo, du Casino Marbella, de l’Hôtel de l’Air et du Carrefour Bonadouma Home.',
                        en: 'Dr Annick TCHAM’s clinic is located in Bonapriso, Douala (End of the paved street of Bonapriso Public School, Group 1), right next to Bonapriso Public School, Rue Njo-Njo, Casino Marbella, and Hôtel de l’Air.',
                      },
                    },
                    {
                      q: {
                        fr: 'Quels examens cardiologiques réalisez-vous sur place le même jour à Douala ?',
                        en: 'Which cardiological exams are performed on-site the same day in Douala?',
                      },
                      a: {
                        fr: 'Nous réalisons les 8 explorations cardiologiques sur place : ECG 12 dérivations, Holter ECG (24h–72h), Holter tensionnel (MAPA), Échocardiographie Doppler couleur, Échographie trans-œsophagienne (ETO), Écho-Doppler vasculaire, Épreuve d’effort et Polygraphie ventilatoire nocturne.',
                        en: 'We perform all 8 cardiac explorations on-site: 12-lead ECG, Holter ECG, 24h ABPM Blood Pressure Monitor, Color Doppler Echocardiography, Transesophageal Echocardiography (TEE), Vascular Doppler, Exercise Stress Test, and Nocturnal Respiratory Polygraphy.',
                      },
                    },
                    {
                      q: {
                        fr: 'Faites-vous le dépistage de l’apnée du sommeil au Cameroun ?',
                        en: 'Do you provide sleep apnea screening in Cameroon?',
                      },
                      a: {
                        fr: 'Oui. « Vous ronflez ? Vous êtes fatigué au réveil ? Pensez au dépistage de l’apnée du sommeil. » Le cabinet réalise la polygraphie ventilatoire nocturne pour dépister et traiter les apnées du sommeil souvent responsables d’hypertension artérielle résistante et d’arythmies.',
                        en: 'Yes. “Do you snore? Do you wake up tired? Consider sleep apnea screening.” Our clinic performs nocturnal respiratory polygraphy to diagnose and treat sleep apnea.',
                      },
                    },
                    {
                      q: {
                        fr: 'Comment s’organise le bilan pour les patients venant de Yaoundé, Bafoussam, Kribi, Limbe ou d’autres villes du Cameroun ?',
                        en: 'How are appointments organized for patients traveling from Yaounde, Bafoussam, Kribi, Limbe, or other cities in Cameroon?',
                      },
                      a: {
                        fr: 'Grâce à notre plateau technique complet réuni en un seul lieu à Bonapriso (Douala), les patients en provenance de Yaoundé, Bafoussam, Limbe, Buea, Kribi, Edéa, Nkongsamba ou Garoua réalisent leur consultation spécialisée et tous leurs examens (ECG, Écho Doppler, Holter, MAPA) le même jour, puis bénéficient de notre suivi téléphonique continu.',
                        en: 'Thanks to our all-in-one diagnostic platform in Bonapriso (Douala), patients traveling from Yaounde, Bafoussam, Limbe, Buea, Kribi, Edea, or Garoua complete their consultation and exams on the very same day, followed by remote telephone follow-up.',
                      },
                    },
                  ].map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200/90 bg-slate-50/70 overflow-hidden transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                          className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/80 transition-colors"
                          aria-expanded={isOpen}
                        >
                          <h3 className="text-xs sm:text-sm font-extrabold text-[#0F172A]">
                            {faq.q[lang]}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-[#0052CC] shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white">
                            {faq.a[lang]}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Regional & City Coverage Directory for Douala & Cameroon (5 cols) */}
                <div className="lg:col-span-5 bg-slate-50 border border-slate-200/90 rounded-3xl p-6 text-[#0F172A] space-y-5">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0052CC]">
                      {lang === 'fr'
                        ? 'RAYONNEMENT MÉDICAL · DOUALA & CAMEROUN'
                        : 'REGIONAL COVERAGE · DOUALA & CAMEROON'}
                    </span>
                    <h3 className="text-lg font-extrabold mt-1 text-[#0F172A]">
                      {lang === 'fr'
                        ? 'Votre Cardiologue de Proximité à Douala & au Cameroun'
                        : 'Your Trusted Cardiologist in Douala & Across Cameroon'}
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80">
                      <div className="font-bold text-[#0F172A] mb-1">
                        {lang === 'fr'
                          ? 'Quartiers de Douala desservis (Accès rapide Bonapriso) :'
                          : 'Douala Neighborhoods Served (Fast Access to Bonapriso):'}
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        Bonapriso · Akwa · Bonanjo · Bali · Koumassi · New-Bell · Deïdo · Bonamoussadi · Makepe · Logpom · Kotto · Ndokoti · Bonabéri · Yassa · Japoma.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80">
                      <div className="font-bold text-[#0F172A] mb-1">
                        {lang === 'fr'
                          ? 'Villes & Régions du Cameroun accompagnées :'
                          : 'Cameroon Cities & Regions Served:'}
                      </div>
                      <p className="text-slate-600 leading-relaxed">
                        Douala (Littoral) · Yaoundé (Centre) · Bafoussam & Dschang (Ouest) · Kribi & Edéa · Limbe & Buea (Sud-Ouest) · Nkongsamba · Bamenda · Bertoua · Ebolowa · Ngaoundéré · Garoua · Maroua.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openBookingWithSubject()}
                    className="w-full py-3 px-4 rounded-xl bg-[#0052CC] hover:bg-[#061B49] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>
                      {lang === 'fr'
                        ? 'Réserver mon Bilan Cardiologique à Douala'
                        : 'Book My Cardiology Workup in Douala'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* =====================================================================
          SECTION 10: FOOTER MÉDICAL PREMIUM (DISPOSITION SANS CHEVAUCHEMENT AVEC URGENCE)
         ===================================================================== */}
      <footer className="bg-[#0F172A] text-white pt-16 pb-24 sm:pb-20 border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
            {/* Brand Column (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={siteData.logoUrl}
                  alt={siteData.clinicName[lang]}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-contain rounded-2xl bg-white p-1.5 shadow-md"
                />
                <div>
                  <div className="text-base font-extrabold text-white">
                    {siteData.clinicName[lang]}
                  </div>
                  <div className="text-xs font-semibold text-sky-300">
                    {siteData.doctorName} · {siteData.specialty[lang]}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {siteData.synthesisParagraph1[lang]}
              </p>
              <div className="text-xs font-semibold text-slate-300">
                {siteData.sloganPrimary[lang]} {siteData.sloganSecondary[lang]}
              </div>
            </div>

            {/* Quick Links (2 cols) — All navigation buttons >= 48x48px touch target */}
            <div className="lg:col-span-2 space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                {lang === 'fr' ? 'Navigation' : 'Quick Links'}
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={getPathForPage(item.id)}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToPage(item.id);
                      }}
                      className="min-h-[48px] min-w-[48px] w-full sm:w-auto px-2 -mx-2 rounded-xl inline-flex items-center text-left hover:bg-slate-800/60 hover:text-white nav-link-underline transition-colors cursor-pointer"
                    >
                      {item.label[lang]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Explorations Links (3 cols) — All clinical buttons >= 48x48px touch target */}
            <div className="lg:col-span-3 space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                {lang === 'fr' ? 'Explorations Sur Place' : 'On-Site Explorations'}
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {siteData.explorations.slice(0, 6).map((exp) => (
                  <li key={exp.id}>
                    <a
                      href="/explorations"
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToPage('explorations');
                        setSelectedClinicalItem({ kind: 'exploration', item: exp });
                      }}
                      className="min-h-[48px] min-w-[48px] w-full sm:w-auto px-2 -mx-2 rounded-xl inline-flex items-center text-left hover:bg-slate-800/60 hover:text-white nav-link-underline transition-colors cursor-pointer"
                    >
                      {exp.title[lang]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us & Copy Buttons (3 cols) — All links & copy buttons >= 48x48px touch target */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                {lang === 'fr' ? 'Contact & Rendez-vous' : 'Contact Us'}
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{siteData.addressShort[lang]}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <a
                    href={`tel:${siteData.phone.replace(/\s+/g, '')}`}
                    className="min-h-[48px] min-w-[48px] px-2 rounded-lg inline-flex items-center gap-2 font-mono font-bold text-white hover:text-sky-300 break-words"
                  >
                    <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{siteData.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopyText(siteData.phone, 'footer-phone')}
                    className="min-h-[48px] min-w-[48px] px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white inline-flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                  >
                    {copiedFooterField === 'footer-phone'
                      ? lang === 'fr'
                        ? 'Copié'
                        : 'Copied'
                      : lang === 'fr'
                        ? 'Copier'
                        : 'Copy'}
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <a
                    href={`mailto:${siteData.email}`}
                    className="min-h-[48px] min-w-[48px] px-2 rounded-lg inline-flex items-center gap-2 font-medium text-white hover:text-sky-300 break-all"
                  >
                    <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{siteData.email}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopyText(siteData.email, 'footer-email')}
                    className="min-h-[48px] min-w-[48px] px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white inline-flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                  >
                    {copiedFooterField === 'footer-email'
                      ? lang === 'fr'
                        ? 'Copié'
                        : 'Copied'
                      : lang === 'fr'
                        ? 'Copier'
                        : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Gear Setting Button — Discreet Gear Wheel, without "Accès admin" text */}
          <div className="pt-6 sm:pr-48 flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 sm:gap-6 text-xs text-slate-400">
            <button
              type="button"
              onClick={() => setAdminModalOpen(true)}
              aria-label="Configuration"
              title="Configuration"
              className="w-11 h-11 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-sky-400 border border-slate-800 hover:border-sky-500/40 inline-flex items-center justify-center transition-all duration-300 gear-spin-hover cursor-pointer shrink-0 shadow-sm"
            >
              <Settings className="w-5 h-5" />
            </button>

            <div className="leading-relaxed">
              © {new Date().getFullYear()} {siteData.clinicName[lang]} — {siteData.doctorName}.{' '}
              {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING BUTTON (BOTTOM RIGHT) — Written strictly "Urgence" with >= 48x48px Touch Target */}
      <a
        href={whatsappUrgenceHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Urgence"
        className="min-h-[48px] min-w-[48px] fixed bottom-5 right-5 z-40 inline-flex items-center justify-center gap-2 bg-[#DC141C] hover:bg-[#b81017] text-white px-5 py-3.5 rounded-full shadow-2xl transition-all duration-200 hover:-translate-y-1 animate-urgent-pulse"
      >
        <PhoneCall className="w-5 h-5 text-white shrink-0" />
        <span className="text-sm font-extrabold tracking-wide">Urgence</span>
      </a>

      {/* MODALS */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        siteData={siteData}
        lang={lang}
        preselectedSubject={preselectedSubject}
      />

      <ClinicalDetailModal
        selected={selectedClinicalItem}
        onClose={() => setSelectedClinicalItem(null)}
        lang={lang}
        onBookWithSubject={(subj) => openBookingWithSubject(subj)}
        siteData={siteData}
        onSelectClinicalItem={(item) => setSelectedClinicalItem(item)}
      />

      <AdminPortalModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        siteData={siteData}
        testimonials={testimonials}
        lang={lang}
        onSiteDataUpdated={(updated) => setSiteData(updated)}
        onTestimonialsUpdated={(updatedList) => setTestimonials(updatedList)}
      />
      </div>
    </>
  );
}
