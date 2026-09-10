import React from 'react';
import {
  ShieldCheck,
  Award,
  FileCheck,
  Lock,
  Building,
  CheckCircle2,
  ExternalLink,
  Download,
  Key,
  Globe,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { USER_PROFILE } from '../data/mockData';

interface AccountScreenProps {
  onShowToast: (msg: string) => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ onShowToast }) => {
  return (
    <div className="flex flex-col w-full pb-28 px-4 max-w-md mx-auto animate-in fade-in duration-300">
      {/* Profile Card */}
      <section className="mt-2 bg-white rounded-2xl p-4 shadow-xs border border-[#dce9ff]">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src={USER_PROFILE.avatar}
              alt={USER_PROFILE.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#0d533a]/30 shadow-xs"
            />
            <span className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-[#0d533a] text-white flex items-center justify-center ring-2 ring-white shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-base font-bold text-[#0b1c30] truncate">
                {USER_PROFILE.name}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#aff1cf]/60 text-[#095138] border border-[#94d4b3]/50">
                مفوّض معتمد
              </span>
            </div>
            <p className="text-xs font-semibold text-[#0d533a] mt-0.5 truncate">
              {USER_PROFILE.title}
            </p>
            <p className="text-[11px] text-[#565e74] truncate mt-0.5">
              {USER_PROFILE.organization}
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Delegation File Details */}
      <section className="mt-3 bg-[#eff4ff] rounded-2xl p-4 border border-[#d3e4fe]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-[#0d533a]" />
            <h3 className="text-xs font-bold text-[#0b1c30]">
              ملف التفويض الاستراتيجي النشط
            </h3>
          </div>
          <span className="text-[10px] font-bold text-[#095138] bg-[#aff1cf]/60 px-2 py-0.5 rounded-full">
            ساري المفعول
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-[#0b1c30]">
          <div className="flex justify-between py-1 border-b border-[#dce9ff]/60">
            <span className="text-[#565e74]">البرنامج المفوّض:</span>
            <span className="font-bold">برنامج التحول الرقمي والتميز المؤسسي</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#dce9ff]/60">
            <span className="text-[#565e74]">مستوى الصلاحية:</span>
            <span className="font-bold text-[#0d533a]">تعاقد استشاري سيادي C-Suite</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#565e74]">تاريخ الاعتماد:</span>
            <span className="font-bold">1446/01/15 هـ</span>
          </div>
        </div>
      </section>

      {/* Sovereign Cybersecurity & NDA Compliance */}
      <section className="mt-3 bg-white rounded-2xl p-4 shadow-xs border border-[#dce9ff]">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-[#0d533a]" />
          <h3 className="text-xs font-bold text-[#0b1c30]">
            الامتثال السيبراني واتفاقيات السرية (NDA)
          </h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#eff4ff] border border-[#d3e4fe]/70 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0d533a]" />
              <div>
                <p className="font-bold text-[#0b1c30]">اتفاقية عدم الإفصاح الموحدة</p>
                <p className="text-[10px] text-[#565e74]">موقعة رقمياً ومشفرة ومحمية</p>
              </div>
            </div>
            <button
              onClick={() => onShowToast('جاري تحميل شهادة اتفاقية عدم الإفصاح (NDA)...')}
              className="text-[#0d533a] hover:bg-[#dce9ff] p-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#eff4ff] border border-[#d3e4fe]/70 text-xs">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[#0d533a]" />
              <div>
                <p className="font-bold text-[#0b1c30]">ضوابط الهيئة الوطنية للأمن السيبراني</p>
                <p className="text-[10px] text-[#565e74]">NCA-ECC متوافق بنسبة 100%</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#095138] bg-[#aff1cf]/50 px-2 py-0.5 rounded">
              معتمد
            </span>
          </div>
        </div>
      </section>

      {/* Platform & Governance Preferences */}
      <section className="mt-3 bg-white rounded-2xl p-4 shadow-xs border border-[#dce9ff] space-y-2.5">
        <button
          onClick={() => onShowToast('المنصة تدعم الواجهتين العربية والإنجليزية.')}
          className="w-full flex items-center justify-between py-1 text-xs text-[#0b1c30] hover:text-[#0d533a]"
        >
          <span className="flex items-center gap-2 font-bold">
            <Globe className="w-4 h-4 text-[#565e74]" />
            اللغة (Language)
          </span>
          <span className="text-xs text-[#565e74] font-medium">العربية (Arabic)</span>
        </button>

        <div className="h-px bg-[#e5eeff]" />

        <button
          onClick={() => onShowToast('تم التحقق من ربط مركز الدعم الفني المباشر لخدمة كبار الشخصيات.')}
          className="w-full flex items-center justify-between py-1 text-xs text-[#0b1c30] hover:text-[#0d533a]"
        >
          <span className="flex items-center gap-2 font-bold">
            <HelpCircle className="w-4 h-4 text-[#565e74]" />
            الدعم المؤسسي المباشر (Concierge)
          </span>
          <span className="text-xs text-[#0d533a] font-bold">متاح 24/7</span>
        </button>
      </section>
    </div>
  );
};
