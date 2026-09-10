import React, { useState } from 'react';
import {
  ShieldCheck,
  Calendar,
  FileText,
  CheckCircle2,
  Lock,
  Search,
  SlidersHorizontal,
  Bookmark,
  Sparkles,
} from 'lucide-react';
import { CONSULTANTS } from '../data/mockData';
import { Consultant } from '../types';

interface HomeScreenProps {
  onSelectConsultant: (consultant: Consultant) => void;
  onRequestConsultation: (consultant?: Consultant) => void;
  onOpenDelegationInfo?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectConsultant,
  onRequestConsultation,
  onOpenDelegationInfo,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tags = [
    { id: 'all', label: 'الكل' },
    { id: 'digital', label: '#التحول_الرقمي' },
    { id: 'projects', label: '#إدارة_المشاريع' },
    { id: 'cloud', label: '#البنية_التحتية_السحابية' },
    { id: 'ai', label: '#الذكاء_الاصطناعي' },
    { id: 'mna', label: '#الاستحواذ_والاندماج' },
    { id: 'governance', label: '#حوكمة_البيانات' },
  ];

  const filteredConsultants = CONSULTANTS.filter((consultant) => {
    const matchesSearch =
      consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultant.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultant.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultant.tags.some((t) => t.includes(searchQuery));

    if (!matchesSearch) return false;

    if (selectedTag === 'all') return true;
    if (selectedTag === 'digital') return consultant.tags.some((t) => t.includes('التحول') || t.includes('السحابية'));
    if (selectedTag === 'projects') return consultant.category.includes('2030') || consultant.tags.some((t) => t.includes('المشاريع'));
    if (selectedTag === 'cloud') return consultant.tags.some((t) => t.includes('السحابية'));
    if (selectedTag === 'ai') return consultant.tags.some((t) => t.includes('الاصطناعي'));
    if (selectedTag === 'mna') return consultant.tags.some((t) => t.includes('الاستحواذ') || t.includes('الخصخصة'));
    if (selectedTag === 'governance') return consultant.tags.some((t) => t.includes('حوكمة') || t.includes('البيانات'));

    return true;
  });

  return (
    <div className="flex flex-col w-full pb-24 px-4 max-w-md mx-auto animate-in fade-in duration-300">
      {/* Search & Strategic Filter Strip */}
      <div className="pt-2 pb-3">
        <div className="relative flex items-center">
          <input
            id="home-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم، المجال، أو المبادرة الاستراتيجية..."
            className="w-full h-11 pr-10 pl-10 bg-white rounded-xl border border-[#dce9ff] text-sm text-[#0b1c30] placeholder:text-[#565e74] focus:outline-none focus:ring-2 focus:ring-[#0d533a]/30 shadow-xs transition-all"
          />
          <Search className="w-4 h-4 text-[#565e74] absolute right-3 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#565e74] hover:text-[#0b1c30] absolute left-3"
            >
              مسح
            </button>
          )}
        </div>
      </div>

      {/* Strategic Delegation File Card (Image 12) */}
      <section
        id="strategic-delegation-card"
        onClick={onOpenDelegationInfo}
        className="mb-4 bg-[#eff4ff] border border-[#d3e4fe] rounded-2xl p-3.5 shadow-xs flex items-center justify-between cursor-pointer hover:bg-[#e5eeff] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#d3e4fe] text-[#0d533a] flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] text-[#565e74] font-medium leading-tight">
              ملف التفويض الاستراتيجي النشط
            </span>
            <span className="text-sm font-bold text-[#0b1c30] truncate leading-snug">
              برنامج التحول الرقمي والتميز المؤسسي
            </span>
          </div>
        </div>
        <span className="shrink-0 text-[11px] font-bold text-[#095138] bg-[#aff1cf]/60 px-2.5 py-1 rounded-full border border-[#94d4b3]/50 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          موثّق حكومياً
        </span>
      </section>

      {/* Filter Pills Tag Strip (Image 12) */}
      <section
        id="filter-tags-strip"
        aria-label="وسوم التصفية"
        className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 pt-0.5"
      >
        {tags.map((tag) => {
          const isSelected = selectedTag === tag.id;
          return (
            <button
              key={tag.id}
              id={`filter-tag-${tag.id}`}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                isSelected
                  ? 'bg-[#0d533a] text-white shadow-xs'
                  : 'bg-white text-[#565e74] hover:bg-[#e5eeff] border border-[#dce9ff]'
              }`}
            >
              {tag.label}
            </button>
          );
        })}
      </section>

      {/* Section Header: Recommended Experts */}
      <div className="flex items-center justify-between mb-3 mt-1">
        <div>
          <h2 className="text-lg font-bold text-[#0b1c30] leading-tight flex items-center gap-1.5">
            <span>الخبراء المرشحون لك</span>
          </h2>
          <p className="text-xs text-[#565e74] mt-0.5 font-medium">
            بناءً على متطلبات مشروع التحول الاستراتيجي
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 bg-[#aff1cf]/50 text-[#095138] font-bold text-xs px-2.5 py-1 rounded-full border border-[#94d4b3]/40 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#0d533a] animate-pulse" />
          {filteredConsultants.length} خبراء متاحون
        </span>
      </div>

      {/* Consultants List */}
      <div className="flex flex-col gap-3.5" id="consultants-list">
        {filteredConsultants.map((consultant) => (
          <article
            key={consultant.id}
            id={`consultant-card-${consultant.id}`}
            className="bg-white rounded-2xl p-4 shadow-xs border border-[#dce9ff] flex flex-col gap-3 transition-all hover:shadow-md hover:border-[#0d533a]/30"
          >
            {/* Header / Avatar / Name */}
            <div className="flex items-start gap-3">
              <div className="relative shrink-0">
                <img
                  src={consultant.avatar}
                  alt={consultant.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#e5eeff] shadow-xs bg-[#e5eeff]"
                />
                <span
                  className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-[#0d533a] text-white flex items-center justify-center ring-2 ring-white shadow-xs"
                  title="موثّق ومعتمد"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-base font-bold text-[#0b1c30] truncate">
                    {consultant.name}
                  </h3>
                  <span className="text-xs text-[#565e74] font-medium truncate">
                    | {consultant.nameEn}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#ffdf99]/60 text-[#5c4500] border border-[#ecc15a]/50">
                    موثّق
                  </span>
                </div>

                <p className="text-xs text-[#0b1c30] mt-0.5 line-clamp-1 font-medium">
                  {consultant.title}
                </p>

                {/* Category Pill */}
                <div className="mt-1.5">
                  <span className="inline-flex items-center gap-1 bg-[#aff1cf]/40 text-[#095138] text-[11px] font-bold px-2 py-0.5 rounded-lg border border-[#94d4b3]/40">
                    <span>{consultant.category}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Tags Strip */}
            <div className="flex flex-wrap gap-1.5">
              {consultant.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#0b1c30] text-[11px] font-medium border border-[#dce9ff]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Verified Achievement Box (Exact Image 12 match) */}
            <div className="bg-[#eff4ff]/80 border border-[#d3e4fe]/80 rounded-xl p-2.5 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0d533a] shrink-0 mt-0.5" />
              <p className="text-xs text-[#0b1c30] leading-relaxed font-medium">
                {consultant.verifiedStat}
              </p>
            </div>

            {/* Action Buttons Row (Exact Image 12 match) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* View Profile */}
              <button
                id={`btn-view-profile-${consultant.id}`}
                onClick={() => onSelectConsultant(consultant)}
                className="h-10 rounded-xl bg-[#eff4ff] text-[#0b1c30] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#dce9ff] active:scale-98 transition-all border border-[#d3e4fe]"
              >
                <FileText className="w-4 h-4 text-[#0d533a]" />
                <span>عرض الملف</span>
              </button>

              {/* Request Advisory */}
              <button
                id={`btn-request-consult-${consultant.id}`}
                onClick={() => onRequestConsultation(consultant)}
                className="h-10 rounded-xl bg-[#0d533a] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#093928] active:scale-98 transition-all shadow-xs"
              >
                <Calendar className="w-4 h-4" />
                <span>طلب استشارة</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* NDA Sovereign Assurance Footer Strip (Exact Image 12 match) */}
      <footer className="mt-4 bg-[#eff4ff] border border-[#d3e4fe] rounded-xl p-3 flex items-center justify-center gap-2 text-center text-[#404943]">
        <Lock className="w-4 h-4 text-[#0d533a] shrink-0" />
        <span className="text-xs font-semibold text-[#0b1c30]">
          جميع الجلسات الاستشارية مشمولة باتفاقيات عدم إفصاح رسمية (NDA) معتمدة
        </span>
      </footer>
    </div>
  );
};
