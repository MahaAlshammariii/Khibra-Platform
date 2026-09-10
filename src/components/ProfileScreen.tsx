import React, { useState } from 'react';
import {
  CheckCircle2,
  Star,
  Clock,
  ShieldCheck,
  FileText,
  Award,
  Target,
  Building2,
  ChevronLeft,
  Calendar,
  Layers,
  Cloud,
  Cpu,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { Consultant } from '../types';

interface ProfileScreenProps {
  consultant: Consultant;
  onBack: () => void;
  onRequestConsultation: (consultant: Consultant) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  consultant,
  onBack,
  onRequestConsultation,
}) => {
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  const handleBookingClick = () => {
    setIsBookingLoading(true);
    setTimeout(() => {
      setIsBookingLoading(false);
      onRequestConsultation(consultant);
    }, 400);
  };

  return (
    <div className="flex flex-col w-full pb-28 px-4 max-w-md mx-auto animate-in fade-in duration-300">
      {/* Top Profile Dossier Card */}
      <section className="pt-2">
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#dce9ff]">
          <div className="flex items-start gap-3">
            {/* Avatar with Prestige Shield */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#e5eeff] shadow-inner ring-2 ring-[#dce9ff]">
                <img
                  src={consultant.avatar}
                  alt={consultant.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-[#0d533a] text-white flex items-center justify-center ring-2 ring-white shadow-xs"
                title="موثّق رسميًا"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Name & Senior Title */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-base font-bold text-[#0b1c30] truncate">
                  {consultant.name}
                </h2>
                <span className="inline-flex items-center gap-1 bg-[#ffdf99]/60 text-[#5c4500] px-2 py-0.5 rounded-full text-[11px] font-bold border border-[#ecc15a]/50">
                  <Award className="w-3 h-3 text-[#c29b38]" />
                  {consultant.badge}
                </span>
              </div>
              <p className="text-xs font-semibold text-[#0d533a] mt-0.5 leading-snug">
                {consultant.title}
              </p>
              <p className="text-[11px] text-[#565e74] truncate mt-0.5">
                {consultant.titleEn || consultant.category}
              </p>
            </div>
          </div>

          {/* Quick Metadata Grid */}
          <div className="mt-3.5 bg-[#eff4ff]/80 rounded-xl p-2.5 grid grid-cols-2 gap-y-2 gap-x-2 border border-[#d3e4fe]/60">
            <div className="flex items-center gap-1.5 min-w-0">
              <Star className="w-4 h-4 text-[#c29b38] fill-[#c29b38] shrink-0" />
              <span className="text-xs font-bold text-[#0b1c30]">
                {consultant.rating} / 5
              </span>
              <span className="text-[11px] text-[#565e74] truncate">
                ({consultant.reviewCount} استشارة)
              </span>
            </div>

            <div className="flex items-center gap-1.5 min-w-0">
              <Clock className="w-4 h-4 text-[#0d533a] shrink-0" />
              <span className="text-xs font-bold text-[#0b1c30] truncate">
                {consultant.responseSpeed}
              </span>
            </div>

            <div className="flex items-center gap-1.5 col-span-2 min-w-0 pt-0.5 border-t border-[#d3e4fe]/50">
              <ShieldCheck className="w-4 h-4 text-[#0d533a] shrink-0" />
              <span className="text-xs text-[#0b1c30] truncate font-medium">
                {consultant.ndaStatus}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Executive Summary */}
      <section className="mt-3">
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#dce9ff]">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-[#0d533a]" />
            <h3 className="text-sm font-bold text-[#0b1c30]">نبذة مهنية</h3>
          </div>
          <p className="text-xs text-[#404943] leading-relaxed text-justify font-medium">
            {consultant.bio}
          </p>
        </div>
      </section>

      {/* Section 2: Key Verified Achievements */}
      <section className="mt-3">
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#dce9ff]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#0d533a]" />
              <h3 className="text-sm font-bold text-[#0b1c30]">
                أبرز الإنجازات والخبرات
              </h3>
            </div>
            <span className="text-[10px] font-bold text-[#095138] bg-[#aff1cf]/50 px-2 py-0.5 rounded border border-[#94d4b3]/40">
              معتمد سيادياً
            </span>
          </div>

          <div className="space-y-2">
            {consultant.achievements.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 bg-[#eff4ff] p-2.5 rounded-xl border border-[#d3e4fe]/60"
              >
                <CheckCircle2 className="w-4 h-4 text-[#0d533a] shrink-0 mt-0.5" />
                <p className="text-xs text-[#0b1c30] leading-normal font-medium">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Direct Advisory Tracks */}
      <section className="mt-3">
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#dce9ff]">
          <div className="flex items-center gap-2 mb-2.5">
            <Target className="w-4 h-4 text-[#0d533a]" />
            <h3 className="text-sm font-bold text-[#0b1c30]">
              مجالات الاستشارة المباشرة
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {consultant.advisoryTracks.map((track, idx) => {
              const isExpanded = activeTrackIndex === idx;
              return (
                <div
                  key={track.id}
                  className="rounded-xl border border-[#dce9ff] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveTrackIndex(isExpanded ? null : idx)}
                    className="w-full flex items-center justify-between p-3 bg-[#eff4ff] hover:bg-[#e5eeff] text-right transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Layers className="w-4 h-4 text-[#0d533a] shrink-0" />
                      <span className="text-xs font-bold text-[#0b1c30] truncate">
                        {track.title} ({track.titleEn})
                      </span>
                    </div>
                    <ChevronLeft
                      className={`w-4 h-4 text-[#565e74] shrink-0 transition-transform duration-200 ${
                        isExpanded ? '-rotate-90' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="p-3 bg-white text-xs text-[#404943] leading-relaxed border-t border-[#dce9ff]">
                      <p>{track.description}</p>
                      <button
                        onClick={handleBookingClick}
                        className="mt-2 text-[11px] font-bold text-[#0d533a] hover:underline flex items-center gap-1"
                      >
                        <span>طلب استشارة في هذا المجال</span>
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Target Sectors */}
      <section className="mt-3">
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#dce9ff]">
          <div className="flex items-center gap-2 mb-2.5">
            <Building2 className="w-4 h-4 text-[#0d533a]" />
            <h3 className="text-sm font-bold text-[#0b1c30]">القطاعات المستهدفة</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {consultant.targetSectors.map((sector, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#0b1c30] text-xs font-semibold border border-[#d3e4fe]"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Guarantee Micro-banner */}
      <div className="mt-3">
        <div className="bg-[#dce9ff]/80 border border-[#d3e4fe] rounded-xl p-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0d533a] shrink-0" />
            <span className="text-[11px] font-medium text-[#404943]">
              استشارات محمية ببروتوكول السرية المؤسسية لمنصة خبرة
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#0d533a] shrink-0">
            Khibra Safe
          </span>
        </div>
      </div>

      {/* Sticky Bottom CTA Bar (Exact Image 14 & Image 16 match) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#f8f9ff]/92 backdrop-blur-xl p-3 border-t border-[#dce9ff] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0px)]">
        <div className="max-w-md mx-auto flex items-center gap-2">
          {/* Cancel / Back */}
          <button
            id="profile-cancel-btn"
            onClick={onBack}
            className="h-12 px-4 rounded-xl bg-[#dce9ff] text-[#0b1c30] text-xs font-bold hover:bg-[#cbdbf5] active:scale-95 transition-all flex items-center justify-center shrink-0"
          >
            إلغاء
          </button>

          {/* Primary Action: Book intro / consultation */}
          <button
            id="bookConsultBtn"
            onClick={handleBookingClick}
            disabled={isBookingLoading}
            className="flex-1 h-12 rounded-xl bg-[#0d533a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#093928] active:scale-98 transition-all"
          >
            {isBookingLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>جاري فتح النموذج والمطابقة...</span>
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                <span>طلب مكالمة تعريفية / استشارة</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
