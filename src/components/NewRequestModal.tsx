import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Send,
  Bookmark,
  Sparkles,
  Clock,
  Award,
  ChevronLeft,
} from 'lucide-react';
import { Consultant } from '../types';

interface NewRequestModalProps {
  initialConsultant?: Consultant | null;
  onClose: () => void;
  onSubmitSuccess: (data: {
    title: string;
    engagementType: string;
    scope: string;
    duration: string;
  }) => void;
  onSaveDraft: () => void;
}

export const NewRequestModal: React.FC<NewRequestModalProps> = ({
  initialConsultant,
  onClose,
  onSubmitSuccess,
  onSaveDraft,
}) => {
  const [selectedEngagement, setSelectedEngagement] = useState<string>('استشارة استراتيجية');
  const [challengeTitle, setChallengeTitle] = useState<string>(
    initialConsultant ? `استشارة مع ${initialConsultant.name}: ` : ''
  );
  const [scopeText, setScopeText] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('شهر واحد');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const engagementTypes = [
    'استشارة استراتيجية',
    'قيادة تنفيذية مؤقتة',
    'مشروع محدد النطاق',
    'توجيه وتمكين قيادي',
  ];

  const durations = [
    'أسبوعان (جلسات مكثفة)',
    'شهر واحد',
    '3 أشهر',
    '6 أشهر فأكثر',
  ];

  const quickTags = [
    'حوكمة البيانات والامتثال',
    'تقييم البنية التشغيلية',
    'إدارة التغيير الاستراتيجي',
  ];

  const handleAppendTag = (tag: string) => {
    setScopeText((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) {
        return `• ${tag}`;
      }
      return `${trimmed}\n• ${tag}`;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess({
        title: challengeTitle || 'مبادرة التحول المؤسسي والذكاء الاصطناعي',
        engagementType: selectedEngagement,
        scope: scopeText,
        duration: selectedDuration,
      });
    }, 800);
  };

  return (
    <div className="flex flex-col w-full pb-32 px-4 max-w-md mx-auto animate-in fade-in duration-300">
      {/* Privacy & Sovereign Assurance Banner (Exact Image 18 match) */}
      <div className="mt-2 rounded-2xl bg-[#eff4ff] border border-[#d3e4fe] p-3.5 shadow-xs mb-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#d3e4fe] flex items-center justify-center shrink-0 text-[#0d533a]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#095138]">
                اتفاقية عدم إفصاح (NDA) مفعّلة تلقائياً
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#3f465c] text-[10px] font-bold">
                حماية سيادية
              </span>
            </div>
            <p className="text-[11px] text-[#565e74] mt-1 leading-relaxed font-medium">
              بيانات استشارتك الاستراتيجية مشفرة ومحمية بالكامل وفق ضوابط الهيئة الوطنية للأمن السيبراني (NCA).
            </p>
          </div>
        </div>
      </div>

      {initialConsultant && (
        <div className="mb-3 bg-white border border-[#0d533a]/30 rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={initialConsultant.avatar}
              alt={initialConsultant.name}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#0d533a]"
            />
            <span className="text-xs font-bold text-[#0b1c30]">
              المستشار المرشح: {initialConsultant.name}
            </span>
          </div>
          <span className="text-[11px] text-[#0d533a] font-bold bg-[#aff1cf]/50 px-2 py-0.5 rounded">
            محدد
          </span>
        </div>
      )}

      <form id="consultation-form" onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Field 1: Engagement Model (Exact Image 18 match) */}
        <div className="rounded-2xl bg-white border border-[#dce9ff] p-3.5 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
              <span className="w-1.5 h-3.5 rounded-full bg-[#0d533a] inline-block" />
              <span>نمط الاستشارة والتعاقد</span>
            </label>
            <span className="text-[11px] font-semibold text-[#ba1a1a]">إلزامي</span>
          </div>

          <div className="grid grid-cols-2 gap-2" id="engagement-types">
            {engagementTypes.map((type) => {
              const isSelected = selectedEngagement === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedEngagement(type)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all text-right border ${
                    isSelected
                      ? 'bg-[#0d533a] text-white border-[#0d533a] shadow-xs'
                      : 'bg-[#eff4ff] text-[#0b1c30] border-[#dce9ff] hover:bg-[#e5eeff]'
                  }`}
                >
                  <span className="truncate">{type}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0 mr-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Field 2: Challenge Title (Exact Image 18 match) */}
        <div className="rounded-2xl bg-white border border-[#dce9ff] p-3.5 shadow-xs flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="challenge-title-input"
              className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5"
            >
              <span className="w-1.5 h-3.5 rounded-full bg-[#0d533a] inline-block" />
              <span>مسمى التحدي أو المبادرة الاستراتيجية</span>
            </label>
            <span className="text-[11px] font-bold text-[#565e74]">
              {challengeTitle.length} / 80
            </span>
          </div>

          <input
            id="challenge-title-input"
            type="text"
            maxLength={80}
            value={challengeTitle}
            onChange={(e) => setChallengeTitle(e.target.value)}
            placeholder="مثال: استراتيجية التحول السحابي والذكاء الاصطناعي للمنظومة"
            className="w-full h-11 px-3 bg-[#eff4ff] text-[#0b1c30] rounded-xl text-xs placeholder:text-[#565e74] border border-[#dce9ff] focus:outline-none focus:ring-2 focus:ring-[#0d533a]/30 transition-colors"
            required
          />

          <span className="text-[11px] text-[#565e74] leading-relaxed font-medium">
            صياغة محددة وموجزة تسهم في رفع دقة خوارزمية مطابقة المستشار الأنسب.
          </span>
        </div>

        {/* Field 3: Scope & Objectives (Exact Image 18 match) */}
        <div className="rounded-2xl bg-white border border-[#dce9ff] p-3.5 shadow-xs flex flex-col gap-2">
          <label
            htmlFor="challenge-scope-textarea"
            className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5"
          >
            <span className="w-1.5 h-3.5 rounded-full bg-[#0d533a] inline-block" />
            <span>نطاق العمل ومخرجات الاستشارة</span>
          </label>

          <textarea
            id="challenge-scope-textarea"
            rows={3}
            value={scopeText}
            onChange={(e) => setScopeText(e.target.value)}
            placeholder="صف التحدي الحالي، النتائج المستهدفة، والمخرجات المطلوبة من المستشار بدقة..."
            className="w-full p-3 bg-[#eff4ff] text-[#0b1c30] rounded-xl text-xs placeholder:text-[#565e74] border border-[#dce9ff] focus:outline-none focus:ring-2 focus:ring-[#0d533a]/30 transition-colors resize-none leading-relaxed"
          />

          {/* Quick Scope Tags */}
          <div className="flex flex-col gap-1 mt-1">
            <span className="text-[11px] text-[#565e74] font-medium">
              إضافة سريعة لنطاق العمل المقترح:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleAppendTag(tag)}
                  className="px-2.5 py-1 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-[11px] font-semibold border border-[#dce9ff] transition-colors"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Field 4: Estimated Duration (Exact Image 18 match) */}
        <div className="rounded-2xl bg-white border border-[#dce9ff] p-3.5 shadow-xs flex flex-col gap-2.5">
          <label className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
            <span className="w-1.5 h-3.5 rounded-full bg-[#0d533a] inline-block" />
            <span>المدى الزمني التقديري للإنجاز</span>
          </label>

          <div className="grid grid-cols-2 gap-2" id="duration-pills">
            {durations.map((duration) => {
              const isSelected = selectedDuration === duration;
              return (
                <button
                  key={duration}
                  type="button"
                  onClick={() => setSelectedDuration(duration)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold text-center transition-all border ${
                    isSelected
                      ? 'bg-[#0d533a] text-white border-[#0d533a] shadow-xs'
                      : 'bg-[#eff4ff] text-[#0b1c30] border-[#dce9ff] hover:bg-[#e5eeff]'
                  }`}
                >
                  {duration}
                </button>
              );
            })}
          </div>
        </div>

        {/* Field 5: Executive Match Level (Exact Image 18 match) */}
        <div className="rounded-2xl bg-white border border-[#dce9ff] p-3.5 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#c29b38]" />
              <span className="text-xs font-bold text-[#0b1c30]">
                مستوى المستشار المطلوب
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#ffdf99] text-[#5c4500] text-[10px] font-bold border border-[#ecc15a]/50">
              نخبة C-Suite
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#d3e4fe] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#0d533a] shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0b1c30]">
                مستشار تنفيذي معتمد ومطابق
              </span>
              <span className="text-[11px] text-[#565e74] mt-0.5 leading-normal font-medium">
                خبرة استشارية تنفيذية معتمدة وموثقة لمجالس الإدارات والإدارات التنفيذية العليا.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[#565e74] text-[11px] font-medium">
            <Clock className="w-3.5 h-3.5 text-[#0d533a] shrink-0" />
            <span>
              يتم ترشيح ومطابقة أفضل 3 مستشارين معتمدين خلال أقل من 24 ساعة عمل.
            </span>
          </div>
        </div>

        {/* Auxiliary Action: Save draft (Exact Image 18 match) */}
        <div className="flex justify-center pt-1">
          <button
            type="button"
            onClick={onSaveDraft}
            className="text-xs font-semibold text-[#565e74] hover:text-[#0d533a] flex items-center gap-1.5 py-1 px-3 rounded-lg hover:bg-[#e5eeff] transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>حفظ الطلب كمسودة والعودة لاحقاً</span>
          </button>
        </div>
      </form>

      {/* Sticky Bottom Submission Bar (Exact Image 18 match) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#f8f9ff]/92 backdrop-blur-xl border-t border-[#dce9ff] p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0px)]">
        <div className="max-w-md mx-auto flex flex-col gap-1.5">
          <button
            form="consultation-form"
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-[#0d533a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#093928] active:scale-98 transition-all"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>جاري تشفير وتأكيد الطلب...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>إرسال الطلب للمطابقة</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-1 text-[#565e74] text-[11px] font-medium">
            <Lock className="w-3 h-3 text-[#0d533a]" />
            <span>طلب مشفر ومحمي بموجب اتفاقية سرية المعلومات</span>
          </div>
        </div>
      </div>
    </div>
  );
};
