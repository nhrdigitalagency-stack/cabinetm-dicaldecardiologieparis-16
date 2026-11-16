import React from 'react';
import {
  X,
  Clock,
  CheckCircle2,
  Stethoscope,
  Activity,
  Calendar,
  BookOpen,
} from 'lucide-react';
import {
  ClinicSiteData,
  ExplorationItem,
  HealthArticleItem,
  Language,
  PathologyItem,
} from '../data/initialClinicData';
import { ExplorationIllustration } from './MedicalIllustrations';

export type SelectedClinicalItem =
  | { kind: 'exploration'; item: ExplorationItem }
  | { kind: 'pathology'; item: PathologyItem }
  | { kind: 'article'; item: HealthArticleItem }
  | null;

interface ClinicalDetailModalProps {
  selected: SelectedClinicalItem;
  siteData?: ClinicSiteData;
  onSelectClinicalItem?: (item: SelectedClinicalItem) => void;
  onClose: () => void;
  lang: Language;
  onBookWithSubject: (subject: string) => void;
}

export const ClinicalDetailModal: React.FC<ClinicalDetailModalProps> = ({
  selected,
  siteData,
  onSelectClinicalItem,
  onClose,
  lang,
  onBookWithSubject,
}) => {
  if (!selected) return null;

  const linkedExplorations =
    selected.kind === 'article' && siteData
      ? siteData.explorations.filter((e) =>
          (selected.item.relatedExplorationIds || []).includes(e.id)
        )
      : [];

  const linkedPathologies =
    selected.kind === 'article' && siteData
      ? siteData.pathologies.filter((p) =>
          (selected.item.relatedPathologyIds || []).includes(p.id)
        )
      : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative my-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/95 hover:bg-slate-100 text-[#0F172A] shadow-sm border border-slate-200/80 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {selected.kind === 'exploration' && (
          <div>
            <ExplorationIllustration
              type={selected.item.illustrationType}
              className="w-full h-48"
            />
            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#0052CC] flex flex-wrap items-center gap-2">
                  <span>EXPLORATION CARDIOLOGIQUE #{selected.item.number}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-600">
                    {selected.item.sameDay
                      ? lang === 'fr'
                        ? 'Réalisé sur place le même jour'
                        : 'Performed on-site same day'
                      : lang === 'fr'
                        ? 'Sur programmation dédiée'
                        : 'Scheduled procedure'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-1">
                  {selected.item.title[lang]}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {selected.item.details[lang]}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0052CC] mb-1">
                    <Clock className="w-4 h-4" />
                    <span>{lang === 'fr' ? 'Durée & Compte-rendu' : 'Duration & Report'}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                    {selected.item.duration[lang]}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0052CC] mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{lang === 'fr' ? 'Préparation du patient' : 'Patient Preparation'}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                    {selected.item.preparation[lang]}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors"
                >
                  {lang === 'fr' ? 'Fermer' : 'Close'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const subj = selected.item.title[lang];
                    onClose();
                    onBookWithSubject(subj);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#061B49] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {lang === 'fr'
                      ? 'Planifier cet examen au Cabinet'
                      : 'Book This Exam at the Clinic'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {selected.kind === 'pathology' && (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F0F6FF] border border-blue-100 text-[#0052CC] flex items-center justify-center shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0052CC]">
                  PATHOLOGIE PRISE EN CHARGE #{selected.item.number}
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                  {selected.item.title[lang]}
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {selected.item.details[lang]}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1">
                  <Stethoscope className="w-4 h-4 text-[#0052CC]" />
                  <span>
                    {lang === 'fr' ? 'Signes d’alerte & Symptômes' : 'Warning Signs & Symptoms'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selected.item.symptoms[lang]}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0052CC] mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {lang === 'fr'
                      ? 'Prévention & Suivi au Cabinet'
                      : 'Prevention & Clinic Follow-Up'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selected.item.prevention[lang]}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors"
              >
                {lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
              <button
                type="button"
                onClick={() => {
                  const subj = selected.item.title[lang];
                  onClose();
                  onBookWithSubject(subj);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#061B49] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>
                  {lang === 'fr'
                    ? 'Prendre RDV pour cette pathologie'
                    : 'Book Consultation for This Condition'}
                </span>
              </button>
            </div>
          </div>
        )}

        {selected.kind === 'article' && (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#F0F6FF] border border-blue-100 text-[#0052CC] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-500">
                <span className="font-bold text-[#0052CC]">{selected.item.category[lang]}</span>
                <span> · </span>
                <span>{selected.item.date[lang]}</span>
                <span> · </span>
                <span>{selected.item.readTime[lang]}</span>
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
              {selected.item.title[lang]}
            </h3>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {selected.item.content[lang]}
            </p>

            {selected.item.keyTakeaways?.[lang] && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#0052CC]">
                  {lang === 'fr' ? 'Points clés à retenir :' : 'Key Takeaways:'}
                </div>
                <ul className="space-y-1.5">
                  {selected.item.keyTakeaways[lang].map((tip, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-[#0F172A] flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0052CC] shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(linkedExplorations.length > 0 || linkedPathologies.length > 0) &&
              onSelectClinicalItem && (
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    {lang === 'fr'
                      ? 'Services & Examens du Cabinet Associés :'
                      : 'Linked Clinic Services & Explorations:'}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {linkedExplorations.map((exp) => (
                      <button
                        key={exp.id}
                        type="button"
                        onClick={() =>
                          onSelectClinicalItem({ kind: 'exploration', item: exp })
                        }
                        className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-[#0052CC] text-slate-700 hover:text-white border border-slate-200/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Stethoscope className="w-3.5 h-3.5 shrink-0 text-[#0052CC] group-hover:text-white" />
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
                        className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-[#0052CC] text-slate-700 hover:text-white border border-slate-200/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Activity className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                        <span>{pat.title[lang]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors"
              >
                {lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
              <button
                type="button"
                onClick={() => {
                  const subj =
                    linkedExplorations[0]?.title[lang] || selected.item.title[lang];
                  onClose();
                  onBookWithSubject(subj);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0052CC] hover:bg-[#061B49] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Prendre Rendez-vous' : 'Book Appointment'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
