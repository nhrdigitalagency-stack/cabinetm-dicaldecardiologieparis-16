import React, { useState, useEffect, useMemo } from 'react';
import {
  Star,
  MessageSquarePlus,
  CheckCircle2,
  Quote,
  Send,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  Award,
  ArrowUpDown,
  Pause,
  Play,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ClinicSiteData, Language, TestimonialItem } from '../data/initialClinicData';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  siteData: ClinicSiteData;
  lang: Language;
  onTestimonialAdded: (updatedList: TestimonialItem[]) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  siteData,
  lang,
  onTestimonialAdded,
}) => {
  const [sortBy, setSortBy] = useState<'newest' | 'rating'>('rating');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);

  const [patientName, setPatientName] = useState('');
  const [patientRole, setPatientRole] = useState('');
  const [serviceUsed, setServiceUsed] = useState(
    lang === 'fr' ? 'Consultation Cardiologique & Écoute' : 'Cardiology Consultation & Care'
  );
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const sortedTestimonials = useMemo(() => {
    const copy = [...testimonials];
    if (sortBy === 'rating') {
      return copy.sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }
    return copy.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [testimonials, sortBy]);

  // Auto-play slides to the next testimonial every 6 seconds (6000ms),
  // and pauses when the user interacts with the rating/newest toggle buttons.
  useEffect(() => {
    if (sortedTestimonials.length <= 1 || isAutoPlayPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sortedTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [sortedTestimonials.length, isAutoPlayPaused]);

  const handleSortInteraction = (mode: 'newest' | 'rating') => {
    setIsAutoPlayPaused(true);
    if (mode !== sortBy) {
      setSortBy(mode);
      setActiveSlide(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (patientName.trim().length < 2) {
      setErrorMsg(
        lang === 'fr'
          ? 'Veuillez renseigner votre nom ou vos initiales.'
          : 'Please enter your name or initials.'
      );
      return;
    }
    if (comment.trim().length < 10) {
      setErrorMsg(
        lang === 'fr'
          ? 'Merci de rédiger un témoignage d’au moins 10 caractères.'
          : 'Please write a testimonial of at least 10 characters.'
      );
      return;
    }

    setSubmitting(true);
    const newTestimonial: TestimonialItem = {
      _id: `testimonial-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      patientName: patientName.trim(),
      patientRole:
        patientRole.trim() ||
        (lang === 'fr' ? 'Patient du Cabinet · Douala' : 'Clinic Patient · Douala'),
      serviceUsed,
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
      verified: true,
    };

    let updatedList = [newTestimonial, ...testimonials];

    try {
      const resp = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: patientName.trim(),
          patientRole:
            patientRole.trim() ||
            (lang === 'fr' ? 'Patient du Cabinet · Douala' : 'Clinic Patient · Douala'),
          serviceUsed,
          rating,
          comment: comment.trim(),
        }),
      });
      if (resp.ok) {
        const data = await resp.json();
        if (Array.isArray(data.testimonials)) {
          updatedList = data.testimonials;
        }
      }
    } catch (err) {
      console.warn('API sync fallback to local persistence:', err);
    }

    // Persist to localStorage so the testimonial remains public and persistent
    try {
      localStorage.setItem('clinic_persistent_testimonials', JSON.stringify(updatedList));
    } catch {
      // ignore
    }

    onTestimonialAdded(updatedList);
    setSortBy('newest');
    setActiveSlide(0);
    setPatientName('');
    setPatientRole('');
    setComment('');
    setRating(5);
    setSuccessMsg(
      lang === 'fr'
        ? 'Merci ! Votre témoignage a été publié en direct et reste visible sur le site.'
        : 'Thank you! Your testimonial has been published live and remains visible on the site.'
    );
    setSubmitting(false);
  };

  const serviceOptions = [
    lang === 'fr' ? 'Consultation Cardiologique Complète' : 'Comprehensive Cardiology Consultation',
    ...siteData.explorations.map((e) => e.title[lang]),
    ...siteData.pathologies.map((p) => p.title[lang]),
  ];

  const currentFeatured = sortedTestimonials[activeSlide] || sortedTestimonials[0];
  const featuredRatingPercent = currentFeatured
    ? Math.min(100, Math.max(20, Math.round((currentFeatured.rating / 5) * 100)))
    : 100;

  return (
    <div className="space-y-8">
      {/* Section Header + Clean Segmented Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold tracking-wider uppercase text-[#0052CC]">
            {lang === 'fr'
              ? 'Témoignages Patients · Douala & Cameroun'
              : 'Patient Testimonials · Douala & Cameroon'}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] mt-1 tracking-tight">
            {lang === 'fr'
              ? 'La Confiance de nos Patients'
              : 'Trusted by Our Patients'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
            {lang === 'fr'
              ? 'Défilement automatique toutes les 6 secondes. Filtrez par note (5 étoiles en premier) ou par date de publication.'
              : 'Auto-plays every 6 seconds. Toggle between View by Rating (5-star reviews first) and View by Newest.'}
          </p>
        </div>

        {/* Responsive Sort Control: Clean Segmented Group + Select Dropdown */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-end w-full lg:w-auto">
          <div
            role="group"
            aria-label={lang === 'fr' ? 'Trier les témoignages' : 'Sort testimonials'}
            onMouseDown={() => setIsAutoPlayPaused(true)}
            onTouchStart={() => setIsAutoPlayPaused(true)}
            className="grid grid-cols-1 sm:grid-cols-2 items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80 w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={() => handleSortInteraction('rating')}
              onFocus={() => setIsAutoPlayPaused(true)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                sortBy === 'rating'
                  ? 'bg-white text-[#0F172A] shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#0052CC] shrink-0" />
              <span>
                {lang === 'fr' ? 'Par Note (5★) · View by Rating' : 'View by Rating (5★ First)'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSortInteraction('newest')}
              onFocus={() => setIsAutoPlayPaused(true)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                sortBy === 'newest'
                  ? 'bg-white text-[#0F172A] shadow-2xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>
                {lang === 'fr' ? 'Plus Récents · View by Newest' : 'View by Newest'}
              </span>
            </button>
          </div>

          {/* Synchronized Quick Select Dropdown */}
          <div className="relative w-full sm:w-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              aria-label={lang === 'fr' ? 'Ordre de tri des avis' : 'Review sort order'}
              value={sortBy}
              onFocus={() => setIsAutoPlayPaused(true)}
              onChange={(e) => handleSortInteraction(e.target.value as 'newest' | 'rating')}
              className="w-full sm:w-auto pl-8 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0052CC] shadow-2xs cursor-pointer"
            >
              <option value="rating">
                {lang === 'fr'
                  ? 'Trier : Note (5★ en premier)'
                  : 'Sort: View by Rating (5★ first)'}
              </option>
              <option value="newest">
                {lang === 'fr'
                  ? 'Trier : Plus récents d’abord'
                  : 'Sort: View by Newest (Chronological)'}
              </option>
            </select>
          </div>

          {/* Auto-Play Status & Toggle Button */}
          <button
            type="button"
            onClick={() => setIsAutoPlayPaused((prev) => !prev)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[#0052CC] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            {isAutoPlayPaused ? (
              <>
                <Play className="w-3.5 h-3.5 text-[#0052CC]" />
                <span>{lang === 'fr' ? 'En pause' : 'Paused'}</span>
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 text-slate-500" />
                <span>{lang === 'fr' ? 'Auto 6s' : 'Auto 6s'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Featured Testimonial Spotlight — Clean Editorial White Card with Blue Neon Hover */}
      {currentFeatured && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs relative overflow-hidden neon-blue-card">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1 min-h-[160px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${sortBy}-${currentFeatured._id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="space-y-4"
                >
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < currentFeatured.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono font-semibold text-slate-800 tabular-nums">
                      {currentFeatured.rating}.0 / 5
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#0052CC] font-medium">
                      {currentFeatured.serviceUsed}
                    </span>
                  </div>

                  <div className="relative">
                    <Quote className="w-6 h-6 text-[#0052CC]/25 mb-1.5" />
                    <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
                      “{currentFeatured.comment}”
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F0F6FF] text-[#0052CC] border border-[#0052CC]/15 font-bold text-xs flex items-center justify-center shrink-0">
                        {currentFeatured.patientName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {currentFeatured.patientName}
                        </div>
                        <div className="text-xs text-slate-500">{currentFeatured.patientRole}</div>
                      </div>
                    </div>

                    {/* Visual Star-Rating Progress Bar in Spotlight */}
                    <div className="w-full sm:w-64 bg-slate-50 rounded-xl p-3 border border-slate-200/70">
                      <div className="flex items-center justify-between text-[11px] font-semibold mb-1.5">
                        <span className="text-slate-600">
                          {lang === 'fr' ? 'Indice de satisfaction' : 'Satisfaction Rating'}
                        </span>
                        <span className="font-mono text-[#0052CC] tabular-nums">
                          {currentFeatured.rating} / 5 ({featuredRatingPercent}%)
                        </span>
                      </div>
                      <div
                        className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden"
                        role="progressbar"
                        aria-valuenow={currentFeatured.rating}
                        aria-valuemin={1}
                        aria-valuemax={5}
                      >
                        <motion.div
                          key={`feat-bar-${currentFeatured._id}`}
                          initial={{ width: '0%' }}
                          animate={{ width: `${featuredRatingPercent}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className="h-full rounded-full bg-[#0052CC]"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <div className="flex lg:flex-col items-center gap-2.5 self-end lg:self-center">
              <button
                type="button"
                onClick={() =>
                  setActiveSlide(
                    (prev) => (prev - 1 + sortedTestimonials.length) % sortedTestimonials.length
                  )
                }
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#0052CC] text-slate-700 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-semibold text-slate-500 tabular-nums">
                {activeSlide + 1}/{sortedTestimonials.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setActiveSlide((prev) => (prev + 1) % sortedTestimonials.length)
                }
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-[#0052CC] text-slate-700 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Suivant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Split: Published Testimonials Grid (7 cols) + Direct Submission Form (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={sortBy}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="grid grid-cols-1 gap-4"
            >
              {sortedTestimonials.map((item, idx) => {
                const ratingPercentage = Math.min(
                  100,
                  Math.max(20, Math.round((item.rating / 5) * 100))
                );
                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: idx * 0.04, ease: 'easeOut' }}
                    className="space-y-1.5"
                  >
                    <article className="bg-white rounded-2xl p-6 neon-blue-card flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5 text-amber-400">
                              {Array.from({ length: 5 }).map((_, starIdx) => (
                                <Star
                                  key={starIdx}
                                  className={`w-4 h-4 ${
                                    starIdx < item.rating
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-slate-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-mono font-semibold text-slate-800 tabular-nums">
                              {item.rating}.0 / 5
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1.5">
                            <span>{item.serviceUsed}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">
                              {new Date(item.createdAt).toLocaleDateString(
                                lang === 'fr' ? 'fr-FR' : 'en-US',
                                {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                }
                              )}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                          “{item.comment}”
                        </p>
                      </div>

                      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center shrink-0">
                            {item.patientName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900">{item.patientName}</h4>
                            <p className="text-xs text-slate-500">{item.patientRole}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                          <UserCheck className="w-4 h-4 text-[#0052CC]" />
                          <span>{lang === 'fr' ? 'Patient Vérifié' : 'Verified Patient'}</span>
                        </div>
                      </div>
                    </article>

                    {/* Visual Star-Rating Progress Bar Below Each Testimonial Card — Clean Single-Tone Blue */}
                    <div
                      className="bg-white rounded-xl px-4 py-2.5 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      aria-label={
                        lang === 'fr'
                          ? `Barre de progression de l'évaluation : ${item.rating} sur 5 étoiles`
                          : `Star rating progress bar: ${item.rating} out of 5 stars`
                      }
                    >
                      <div className="flex items-center justify-between sm:justify-start gap-2 shrink-0">
                        <span className="text-[11px] font-medium text-slate-500">
                          {lang === 'fr' ? 'Score d’évaluation' : 'Rating Score'}
                        </span>
                        <span className="text-xs font-mono font-semibold text-slate-800 tabular-nums">
                          {item.rating}.0 / 5 ({ratingPercentage}%)
                        </span>
                      </div>

                      <div className="flex-1 sm:max-w-xs w-full">
                        <div
                          className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden"
                          role="progressbar"
                          aria-valuenow={item.rating}
                          aria-valuemin={1}
                          aria-valuemax={5}
                        >
                          <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: `${ratingPercentage}%` }}
                            transition={{ duration: 0.5, delay: idx * 0.04, ease: 'easeOut' }}
                            className="h-full rounded-full bg-[#0052CC]"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Direct Public Testimonial Submission Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 neon-blue-card sticky top-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#F0F6FF] text-[#0052CC] flex items-center justify-center shrink-0">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {lang === 'fr' ? 'Témoigner sur le site' : 'Share Your Experience'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'fr'
                  ? 'Publication immédiate visible par tous les visiteurs'
                  : 'Published immediately for all visitors to see'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {lang === 'fr'
                  ? 'Votre nom complet (ou initiales) *'
                  : 'Your full name (or initials) *'}
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder={lang === 'fr' ? 'Ex: Paulin N. ou Clarisse T.' : 'e.g. Paulin N.'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#0052CC] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {lang === 'fr' ? 'Quartier / Ville au Cameroun' : 'Neighborhood / City in Cameroon'}
              </label>
              <input
                type="text"
                value={patientRole}
                onChange={(e) => setPatientRole(e.target.value)}
                placeholder={
                  lang === 'fr'
                    ? 'Ex: Patient · Bonapriso, Douala ou Yaoundé'
                    : 'e.g. Patient · Bonapriso, Douala or Yaounde'
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#0052CC] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {lang === 'fr'
                  ? 'Consultation ou examen réalisé'
                  : 'Consultation or Exam Received'}
              </label>
              <select
                value={serviceUsed}
                onChange={(e) => setServiceUsed(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#0052CC]"
              >
                {serviceOptions.map((opt, idx) => (
                  <option key={idx} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {lang === 'fr' ? 'Votre note d’appréciation (1 à 5 ★)' : 'Your Rating (1 to 5 ★)'}
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <button
                    key={starValue}
                    type="button"
                    onClick={() => setRating(starValue)}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-[#F0F6FF] border border-slate-200 transition-colors cursor-pointer"
                    aria-label={`${starValue} stars`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        starValue <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-semibold text-slate-600 ml-2 tabular-nums">
                  {rating}/5 ({Math.round((rating / 5) * 100)}%)
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {lang === 'fr' ? 'Votre témoignage *' : 'Your Testimonial *'}
              </label>
              <textarea
                rows={4}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={
                  lang === 'fr'
                    ? "Partagez votre expérience concernant l'accueil, l'écoute du Dr Annick TCHAM, les examens sur place ou le suivi..."
                    : 'Share your experience regarding the welcome, Dr Annick TCHAM’s listening, on-site exams, or follow-up...'
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-[#0052CC] transition-all"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-5 rounded-xl bg-[#0052CC] hover:bg-[#061B49] disabled:opacity-60 text-white text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>
                {submitting
                  ? lang === 'fr'
                    ? 'Publication en cours...'
                    : 'Publishing...'
                  : lang === 'fr'
                    ? 'Publier mon témoignage'
                    : 'Publish My Testimonial'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
