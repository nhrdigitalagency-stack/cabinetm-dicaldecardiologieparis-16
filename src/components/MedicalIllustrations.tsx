import React, { useState } from 'react';
import { Activity, HeartPulse, Moon, Stethoscope, Gauge } from 'lucide-react';

export const EQUIPMENT_IMAGES = {
  ecgHolter: '/src/assets/images/ecg_holter_device_1794470525624.jpg',
  holterWearable: '/src/assets/images/holter_ecg_wearable_1794561605267.jpg',
  echoDoppler: '/src/assets/images/echo_doppler_scanner_1794470527211.jpg',
  etoProbe: '/src/assets/images/eto_transesophageal_probe_1794561607480.jpg',
  vascularDoppler: '/src/assets/images/vascular_doppler_carotid_1794561608731.jpg',
  mapa: '/src/assets/images/mapa_blood_pressure_1794470528253.jpg',
  stressTest: '/src/assets/images/stress_test_ergometer_1794470530593.jpg',
  polygraphy: '/src/assets/images/sleep_apnea_polygraphy_1794470532108.jpg',
  hypertensionConsult: '/src/assets/images/hypertension_heart_consultation_1794561611506.jpg',
  clinicInterior: '/src/assets/images/cardiology_clinic_interior_1794561610577.jpg',
};

interface IllustrationProps {
  type: string;
  className?: string;
}

export const ExplorationIllustration: React.FC<IllustrationProps> = ({
  type,
  className = 'w-full h-48',
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  const getEquipmentConfig = () => {
    switch (type) {
      case 'ecg':
        return {
          src: EQUIPMENT_IMAGES.ecgHolter,
          alt: 'Appareil ECG 12 dérivations — Cabinet Médical de Cardiologie Paris 16',
          badge: 'ECG 12 Dérivations',
          sub: 'Tracé immédiat au repos',
          objectPos: 'object-center',
          icon: Activity,
        };
      case 'holter-ecg':
      case 'rhythm':
        return {
          src: EQUIPMENT_IMAGES.holterWearable,
          alt: 'Boîtier Holter ECG numérique portable 24h à 72h',
          badge: 'Holter ECG 24h–72h',
          sub: 'Enregistreur continu portable',
          objectPos: 'object-center',
          icon: HeartPulse,
        };
      case 'mapa':
        return {
          src: EQUIPMENT_IMAGES.mapa,
          alt: 'Holter tensionnel MAPA 24 heures et brassard médical',
          badge: 'MAPA 24 Heures',
          sub: 'Mesure tensionnelle jour & nuit',
          objectPos: 'object-center',
          icon: Gauge,
        };
      case 'hypertension':
        return {
          src: EQUIPMENT_IMAGES.hypertensionConsult,
          alt: 'Consultation spécialisée Hypertension Artérielle (HTA) et prévention cardiaque',
          badge: 'Suivi Hypertension (HTA)',
          sub: 'Contrôle tensionnel & prévention',
          objectPos: 'object-center',
          icon: Gauge,
        };
      case 'echo-doppler':
      case 'checkup':
        return {
          src: EQUIPMENT_IMAGES.echoDoppler,
          alt: 'Échographe Doppler couleur cardiaque haute définition',
          badge: 'Écho-Doppler Couleur',
          sub: 'Imagerie myocardique & valvulaire',
          objectPos: 'object-center',
          icon: Stethoscope,
        };
      case 'eto':
        return {
          src: EQUIPMENT_IMAGES.etoProbe,
          alt: 'Système d’échographie trans-œsophagienne haute résolution (ETO)',
          badge: 'Imagerie ETO HD',
          sub: 'Sonde multiplan haute précision',
          objectPos: 'object-center',
          icon: Stethoscope,
        };
      case 'vascular':
        return {
          src: EQUIPMENT_IMAGES.vascularDoppler,
          alt: 'Écho-Doppler vasculaire artériel et veineux des carotides et membres',
          badge: 'Doppler Vasculaire',
          sub: 'Artères carotides, aorte & membres',
          objectPos: 'object-center',
          icon: Activity,
        };
      case 'stress-test':
        return {
          src: EQUIPMENT_IMAGES.stressTest,
          alt: 'Plateau d’épreuve d’effort cardiologique avec cyclo-ergomètre médical',
          badge: 'Épreuve d’Effort',
          sub: 'Ergométrie & télémétrie ECG',
          objectPos: 'object-center',
          icon: HeartPulse,
        };
      case 'clinic-interior':
        return {
          src: EQUIPMENT_IMAGES.clinicInterior,
          alt: 'Plateau technique et accueil du Cabinet Médical de Cardiologie Paris 16 à Bonapriso',
          badge: 'Cabinet Paris 16 · Bonapriso',
          sub: 'Plateau cardiologique sur place',
          objectPos: 'object-center',
          icon: Stethoscope,
        };
      default:
        return {
          src: EQUIPMENT_IMAGES.polygraphy,
          alt: 'Polygraphe ventilatoire nocturne pour dépistage de l’apnée du sommeil',
          badge: 'Polygraphie Nocturne',
          sub: 'Dépistage Apnée du Sommeil · SpO2',
          objectPos: 'object-center',
          icon: Moon,
        };
    }
  };

  const config = getEquipmentConfig();
  const Icon = config.icon;

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 flex items-center justify-center group ${className}`}
    >
      {!imgFailed ? (
        <img
          src={config.src}
          alt={config.alt}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className={`w-full h-full object-cover ${config.objectPos} transition-transform duration-700 ease-out group-hover:scale-105`}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-slate-700 p-4 text-center">
          <Icon className="w-9 h-9 text-[#0052CC] mb-2" />
          <span className="text-xs font-semibold">{config.badge}</span>
        </div>
      )}

      {/* Measured Dark Neutral Scrim for Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent pointer-events-none" />

      {/* Bottom Equipment Caption — Clean White & Blue Icon (No Loud Red Box) */}
      <div className="absolute bottom-2.5 left-3 right-12 flex items-start gap-2.5 pointer-events-none">
        <div className="w-7 h-7 rounded-lg bg-white/95 text-[#0052CC] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <Icon className="w-3.5 h-3.5" />
        </div>
        <div className="min-w-0 leading-tight">
          <div className="text-[11px] font-bold text-white break-words">
            {config.badge}
          </div>
          <div className="text-[10.5px] font-medium text-slate-200 break-words mt-0.5">
            {config.sub}
          </div>
        </div>
      </div>
    </div>
  );
};
