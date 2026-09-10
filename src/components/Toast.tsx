import React from 'react';
import { CheckCircle2, ShieldCheck, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'security';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-18 left-4 right-4 z-50 flex justify-center pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-[#213145] text-[#eaf1ff] px-4 py-3 rounded-xl shadow-xl flex items-center justify-between gap-3 max-w-md w-full border border-[#3f465c]/40 pointer-events-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          {type === 'security' ? (
            <ShieldCheck className="w-5 h-5 text-[#94d4b3] shrink-0" />
          ) : type === 'info' ? (
            <Info className="w-5 h-5 text-[#ecc15a] shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#94d4b3] shrink-0" />
          )}
          <span className="text-sm font-medium leading-snug truncate">{message}</span>
        </div>
        <span className="text-[11px] font-semibold text-[#bec6e0] shrink-0 bg-[#3f465c]/50 px-2 py-0.5 rounded">
          خبرة الاستشارية
        </span>
      </div>
    </div>
  );
};
