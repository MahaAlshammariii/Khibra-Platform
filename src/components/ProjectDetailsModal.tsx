import React from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  FileText,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Building,
} from 'lucide-react';
import { ActiveProject } from '../types';

interface ProjectDetailsModalProps {
  project: ActiveProject | null;
  onClose: () => void;
  onOpenChat: (consultantId: string) => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  onOpenChat,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0b1c30]/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-[#dce9ff] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#e5eeff]">
          <div>
            <span className="text-[11px] font-bold text-[#0d533a] bg-[#aff1cf]/50 px-2.5 py-0.5 rounded-full">
              {project.type}
            </span>
            <h3 className="text-base font-bold text-[#0b1c30] mt-1 leading-snug">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] text-[#565e74] hover:text-[#0b1c30] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Assigned Consultant */}
        <div className="my-3.5 bg-[#eff4ff] p-3 rounded-xl border border-[#d3e4fe] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={project.consultant.avatar}
              alt={project.consultant.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover shadow-xs"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-[#0b1c30]">
                  {project.consultant.name}
                </span>
                <span className="text-[10px] bg-[#ffdf99] text-[#5c4500] font-bold px-1.5 py-0.2 rounded">
                  {project.consultant.badge}
                </span>
              </div>
              <p className="text-[11px] text-[#565e74] mt-0.5">
                {project.consultant.title}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenChat(project.consultant.id);
            }}
            className="h-8 px-2.5 rounded-lg bg-[#0d533a] text-white text-xs font-bold flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>محادثة</span>
          </button>
        </div>

        {/* Overall Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-bold text-[#0b1c30] mb-1.5">
            <span>نسبة إنجاز المشروع الكلية</span>
            <span className="text-[#0d533a]">{project.progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#e5eeff] overflow-hidden">
            <div
              className="h-full bg-[#0d533a] rounded-full"
              style={{ width: `${project.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Milestones Roadmap */}
        <div className="space-y-2 mb-4">
          <h4 className="text-xs font-bold text-[#0b1c30]">مراحل ومخرجات المشروع:</h4>
          {project.milestones.map((m, idx) => (
            <div
              key={m.id}
              className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-2 ${
                m.status === 'completed'
                  ? 'bg-[#eff4ff] border-[#aff1cf]'
                  : m.status === 'in-progress'
                  ? 'bg-white border-[#0d533a] ring-1 ring-[#0d533a]/20'
                  : 'bg-[#f8f9ff] border-[#dce9ff] text-[#565e74]'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="mt-0.5">
                  {m.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-[#0d533a]" />
                  ) : m.status === 'in-progress' ? (
                    <Clock className="w-4 h-4 text-[#c29b38]" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-[#565e74] inline-block" />
                  )}
                </span>
                <div>
                  <span className="font-bold text-[#0b1c30]">{m.title}</span>
                  {m.date && (
                    <p className="text-[11px] text-[#565e74] mt-0.5">{m.date}</p>
                  )}
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  m.status === 'completed'
                    ? 'bg-[#aff1cf]/60 text-[#095138]'
                    : m.status === 'in-progress'
                    ? 'bg-[#ffdf99] text-[#5c4500]'
                    : 'bg-[#e5eeff] text-[#565e74]'
                }`}
              >
                {m.status === 'completed'
                  ? 'مكتمل'
                  : m.status === 'in-progress'
                  ? 'جاري العمل'
                  : 'مجدول'}
              </span>
            </div>
          ))}
        </div>

        {/* NDA & Security Badge */}
        <div className="bg-[#eff4ff] p-2.5 rounded-xl border border-[#d3e4fe] flex items-center gap-2 text-[#565e74] text-[11px]">
          <ShieldCheck className="w-4 h-4 text-[#0d533a] shrink-0" />
          <span>المخرجات والوثائق مشفرة ومحمية بموجب اتفاقية عدم الإفصاح المعتمدة</span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full h-11 mt-4 rounded-xl bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold transition-colors"
        >
          إغلاق النافذة
        </button>
      </div>
    </div>
  );
};
