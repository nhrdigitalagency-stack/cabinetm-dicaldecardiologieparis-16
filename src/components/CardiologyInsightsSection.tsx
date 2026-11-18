import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Stethoscope,
  Activity,
  CheckCircle2,
  Search,
  Calendar,
  Tag,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ClinicSiteData,
  ExplorationItem,
  HealthArticleItem,
  Language,
  PathologyItem,
} from '../data/initialClinicData';
import { ExplorationIllustration } from './MedicalIllustrations';
import { SelectedClinicalItem } from './ClinicalDetailModal';

interface CardiologyInsightsSectionProps {
  siteData: ClinicSiteData;
  lang: Language;
  onSelectClinicalItem: (item: SelectedClinicalItem) => void;
  onBookWithSubject: (subject: string) => void;
  onNavigateToSection: (section: 'explorations' | 'pathologies' | 'insights') => void;
}

export const CardiologyInsightsSection: React.FC<CardiologyInsightsSectionProps> = ({
  siteData,
  lang,
  onSelectClinicalItem,
  onBookWithSubject,
  onNavigateToSection,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    siteData.articles[0]?.id || null
  );

  const mapArticleIllustration = (
    illustrationType: HealthArticleItem['illustrationType']
  ): string => {
    switch (illustrationType) {
      case 'sleep-apnea':
        return 'polygraphy';
      case 'hypertension':
        return 'hypertension';
      case 'rhythm':
        return 'holter-ecg';
      case 'stress-test':
        return 'stress-test';
      case 'vascular':
        return 'vascular';
      case 'checkup':
        return 'clinic-interior';
      default:
        return 'echo-doppler';
    }
  };

  const filterCategories = [
    { id: 'all', label: { fr: 'Tous les Articles', en: 'All Insights' } },
    { id: 'sleep-apnea', label: { fr: 'Apnée du Sommeil', en: 'Sleep Apnea' } },
    { id: 'hypertension', label: { fr: 'Hypertension & MAPA', en: 'Hypertension & ABPM' } },
    { id: 'rhythm', label: { fr: 'Rythmologie & Holter', en: 'Arrhythmia & Holter' } },
    { id: 'stress-test', label: { fr: 'Effort & Coronaires', en: 'Exercise & Coronary' } },
    { id: 'vascular', label: { fr: 'AVC & Doppler Vasculaire', en: 'Stroke & Vascular' } },
    { id: 'checkup', label: { fr: 'Bilan Même Jour', en: 'Same-Day Workup' } },
  ];

  const filteredArticles = useMemo(() => {
    return siteData.articles.filter((article) => {
      const matchesFilter =
        selectedFilter === 'all' || article.illustrationType === selectedFilter;
      if (!matchesFilter) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        article.title[lang].toLowerCase().includes(q) ||
        article.summary[lang].toLowerCase().includes(q) ||
        article.content[lang].toLowerCase().includes(q) ||
        article.category[lang].toLowerCase().includes(q) ||
        (article.seoKeywords || []).some((kw) => kw.toLowerCase().includes(q))
      );
    });
  }, [siteData.articles, selectedFilter, searchQuery, lang]);

  const getLinkedExplorations = (article: HealthArticleItem): ExplorationItem[] => {
    const ids = article.relatedExplorationIds || [];
    if (ids.length > 0) {
      return siteData.explorations.filter((e) => ids.includes(e.id));
    }
    if (article.illustrationType === 'sleep-apnea') {
      return siteData.explorations.filter((e) =>
        ['polygraphie-ventilatoire', 'holter-tensionnel-mapa'].includes(e.id)
      );
    }
    if (article.illustrationType === 'hypertension') {
      return siteData.explorations.filter((e) =>
        ['holter-tensionnel-mapa', 'echocardiographie-doppler'].includes(e.id)
      );
    }
    return siteData.explorations.slice(0, 3);
  };

  const getLinkedPathologies = (article: HealthArticleItem): PathologyItem[] => {
    const ids = article.relatedPathologyIds || [];
    if (ids.length > 0) {
      return siteData.pathologies.filter((p) => ids.includes(p.id));
    }
    return siteData.pathologies.slice(0, 2);
  };

  // Structured Data JSON-LD for Cardiology Insights Blog (Douala & Cameroon SEO)
  const blogJsonLd = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name:
        lang === 'fr'
          ? 'Cardiology Insights · Conseils & Prévention Cardiologique — Cabinet Médical de Cardiologie Paris 16 (Douala, Cameroun)'
          : 'Cardiology Insights · Heart Health Tips & Prevention — Paris 16 Cardiology Clinic (Douala, Cameroon)',
      description:
        lang === 'fr'
          ? 'Articles médicaux et conseils de prévention cardiovasculaire rédigés par le Dr Annick TCHAM, Cardiologue à Bonapriso, Douala (Cameroun).'
          : 'Medical articles and cardiovascular prevention tips by Dr Annick TCHAM, Cardiologist in Bonapriso, Douala (Cameroon).',
      publisher: {
        '@type': 'MedicalClinic',
        name: siteData.clinicName[lang],
        telephone: siteData.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteData.addressShort[lang],
          addressLocality: 'Bonapriso, Douala',
          addressRegion: 'Littoral',
          addressCountry: 'CM',
        },
      },
      blogPost: siteData.articles.map((art) => ({
        '@type': 'BlogPosting',
        headline: art.title[lang],
        description: art.summary[lang],
        articleBody: art.content[lang],
        author: {
          '@type': 'Physician',
          name: siteData.doctorName,
          medicalSpecialty: 'Cardiovascular',
        },
        keywords: (art.seoKeywords || []).join(', '),
      })),
    };
  }, [siteData, lang]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
      {/* Embedded JSON-LD for Search Engine Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Section Header — Clean 60-30-10 Typography */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold tracking-wider uppercase text-[#0052CC]">
            {lang === 'fr'
              ? 'Cardiology Insights · Blog & Conseils Santé du Cœur'
              : 'Cardiology Insights · Heart Health Blog & Prevention'}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] mt-1 tracking-tight">
            {lang === 'fr'
              ? 'Conseils Médicaux & Prévention Cardiovasculaire'
              : 'Heart Health Tips & Clinical Prevention Guides'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {lang === 'fr'
              ? 'Consultez les guides pratiques du Dr Annick TCHAM pour comprendre vos symptômes, adopter les bons réflexes et accéder directement aux examens cardiologiques correspondants réalisés sur place à Bonapriso.'
              : 'Explore Dr Annick TCHAM’s medical guides to understand your symptoms, adopt heart-healthy habits, and connect directly with the corresponding on-site cardiac explorations in Bonapriso.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-80 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'fr'
                ? 'Rechercher un sujet (HTA, MAPA, apnée, ECG...)'
                : 'Search topics (BP, ABPM, sleep apnea, ECG...)'
            }
            aria-label={lang === 'fr' ? 'Rechercher un article' : 'Search articles'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0052CC] shadow-2xs"
          />
        </div>
      </div>

      {/* Interactive Segmented Category Filter Bar */}
      <div
        role="tablist"
        aria-label={lang === 'fr' ? 'Catégories Cardiology Insights' : 'Cardiology Insights categories'}
        className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/70 w-fit"
      >
        {filterCategories.map((cat) => {
          const isActive = selectedFilter === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-white text-[#0F172A] shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label[lang]}
            </button>
          );
        })}
      </div>

      {/* Articles Grid with Direct Clinic Service Backlinks */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedFilter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredArticles.map((article, idx) => {
            const linkedExplorations = getLinkedExplorations(article);
            const linkedPathologies = getLinkedPathologies(article);
            const isExpanded = expandedArticleId === article.id;

            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="bg-white rounded-2xl overflow-hidden wave-hover-card flex flex-col justify-between"
              >
                <div>
                  {/* Article Visual Header */}
                  <div className="relative h-52 overflow-hidden">
                    <ExplorationIllustration
                      type={mapArticleIllustration(article.illustrationType)}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Article Body */}
                  <div className="p-6 space-y-4">
                    {/* Quiet Unboxed Metadata (Zero-Pill Rule) */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-[#0052CC]">
                        {article.category[lang]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {article.readTime[lang]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{siteData.doctorName}</span>
                    </div>

                    <h3
                      onClick={() =>
                        onSelectClinicalItem({ kind: 'article', item: article })
                      }
                      className="text-lg sm:text-xl font-bold text-[#0F172A] hover:text-[#0052CC] transition-colors cursor-pointer leading-snug"
                    >
                      {article.title[lang]}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {article.summary[lang]}
                    </p>

                    {/* Expandable Full Medical Guide + Heart Health Tips */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22 }}
                          className="space-y-4 pt-3 border-t border-slate-100 overflow-hidden"
                        >
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                            {article.content[lang]}
                          </p>

                          {article.keyTakeaways &&
                            article.keyTakeaways[lang] &&
                            article.keyTakeaways[lang].length > 0 && (
                              <div className="space-y-2">
                                <h4 className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                                  <CheckCircle2 className="w-4 h-4 text-[#0052CC] shrink-0" />
                                  <span>
                                    {lang === 'fr'
                                      ? 'Conseils Clés pour Votre Cœur :'
                                      : 'Key Heart Health Tips:'}
                                  </span>
                                </h4>
                                <ul className="space-y-1.5">
                                  {article.keyTakeaways[lang].map((tip, tIdx) => (
                                    <li
                                      key={tIdx}
                                      className="text-xs text-slate-600 flex items-start gap-2"
                                    >
                                      <span className="font-mono font-semibold text-[#0052CC] shrink-0">
                                        {tIdx + 1}.
                                      </span>
                                      <span>{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          {article.seoKeywords && article.seoKeywords.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 pt-1">
                              <Tag className="w-3 h-3 text-slate-400 shrink-0" />
                              {article.seoKeywords.map((kw, kIdx) => (
                                <React.Fragment key={kIdx}>
                                  {kIdx > 0 && <span aria-hidden="true">·</span>}
                                  <span>{kw}</span>
                                </React.Fragment>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* INTERNAL SEO BACKLINKS TO CLINIC SERVICES */}
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-slate-500">
                          {lang === 'fr'
                            ? 'Services & Examens du Cabinet Associés :'
                            : 'Related Clinic Services & Explorations:'}
                        </span>
                        <a
                          href="/explorations"
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigateToSection('explorations');
                          }}
                          className="text-[11px] font-semibold text-[#0052CC] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>
                            {lang === 'fr' ? 'Tous les examens' : 'All explorations'}
                          </span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      {/* Linked Explorations Buttons */}
                      <div className="flex flex-wrap gap-1.5">
                        {linkedExplorations.map((exp) => (
                          <button
                            key={exp.id}
                            type="button"
                            onClick={() =>
                              onSelectClinicalItem({ kind: 'exploration', item: exp })
                            }
                            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-[#F0F6FF] text-slate-700 hover:text-[#0052CC] border border-slate-200/80 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Stethoscope className="w-3.5 h-3.5 text-[#0052CC] shrink-0" />
                            <span>{exp.title[lang]}</span>
                          </button>
                        ))}

                        {linkedPathologies.map((pat) => (
                          <button
                            key={pat.id}
                            type="button"
                            onClick={() =>
                              onSelectClinicalItem({ kind: 'pathology', item: pat })
                            }
                            className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-[#F0F6FF] text-slate-700 hover:text-[#0052CC] border border-slate-200/80 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Activity className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>{pat.title[lang]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedArticleId(isExpanded ? null : article.id)
                      }
                      className="text-xs font-semibold text-slate-700 hover:text-[#0052CC] flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#0052CC]" />
                      <span>
                        {isExpanded
                          ? lang === 'fr'
                            ? 'Masquer le guide'
                            : 'Hide guide'
                          : lang === 'fr'
                            ? 'Lire le guide complet'
                            : 'Read full guide'}
                      </span>
                    </button>

                    <span className="text-slate-300">|</span>

                    <button
                      type="button"
                      onClick={() =>
                        onSelectClinicalItem({ kind: 'article', item: article })
                      }
                      className="text-xs font-semibold text-[#0052CC] hover:underline cursor-pointer"
                    >
                      {lang === 'fr' ? 'Fiche détaillée' : 'Detailed sheet'}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onBookWithSubject(
                        linkedExplorations[0]?.title[lang] || article.title[lang]
                      )
                    }
                    className="px-4 py-2 rounded-lg bg-[#0052CC] hover:bg-[#061B49] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'fr' ? 'Prendre RDV' : 'Book Checkup'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Empty Search State */}
      {filteredArticles.length === 0 && (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 space-y-3">
          <p className="text-sm font-semibold text-slate-900">
            {lang === 'fr'
              ? 'Aucun article ne correspond à votre recherche.'
              : 'No heart health articles match your search.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-lg bg-[#0052CC] text-white text-xs font-semibold cursor-pointer"
          >
            {lang === 'fr' ? 'Afficher tous les articles' : 'Show all articles'}
          </button>
        </div>
      )}
    </section>
  );
};
