import React, { useState } from 'react';
import {
  Briefcase,
  Clock,
  TrendingUp,
  MessageSquare,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Users,
  ShieldCheck,
  Building,
  ChevronLeft,
} from 'lucide-react';
import { ACTIVE_PROJECTS } from '../data/mockData';
import { ActiveProject } from '../types';

interface ProjectsScreenProps {
  onOpenChat: (consultantId: string) => void;
  onSelectProjectDetails: (project: ActiveProject) => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  onOpenChat,
  onSelectProjectDetails,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'in-progress' | 'partial' | 'review'>('all');

  const filterTabs = [
    { id: 'all' as const, label: 'الكل (3)' },
    { id: 'in-progress' as const, label: 'قيد التنفيذ (2)' },
    { id: 'partial' as const, label: 'مكتملة جزئياً (1)' },
    { id: 'review' as const, label: 'مراجعة العميل (1)' },
  ];

  const filteredProjects = ACTIVE_PROJECTS.filter((proj) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'in-progress') return proj.statusCode === 'in-progress';
    if (selectedFilter === 'review') return proj.statusCode === 'review';
    if (selectedFilter === 'partial') return proj.statusCode === 'partial';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-28 px-4 max-w-md mx-auto animate-in fade-in duration-300">
      {/* Executive Summary Banner (Exact HTML spec) */}
      <section className="mt-2 bg-[#eff4ff] border border-[#d3e4fe] rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0d533a] animate-pulse" />
            <h2 className="text-sm font-bold text-[#0b1c30]">
              نظرة عامة على المحفظة النشطة
            </h2>
          </div>
          <span className="text-[11px] font-bold text-[#565e74] bg-white px-2.5 py-0.5 rounded-full border border-[#dce9ff]">
            الربع الأول 2025
          </span>
        </div>

        {/* 3-Item Stats Strip */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-3 rounded-xl flex flex-col justify-center items-center text-center shadow-xs border border-[#dce9ff]">
            <span className="text-2xl font-bold text-[#0d533a] leading-none">
              3
            </span>
            <span className="text-[11px] font-semibold text-[#565e74] mt-1">
              مشاريع نشطة
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl flex flex-col justify-center items-center text-center shadow-xs border border-[#dce9ff]">
            <div className="flex items-center gap-1 text-[#c29b38]">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-sm font-bold text-[#0b1c30]">3 أيام</span>
            </div>
            <span className="text-[11px] font-semibold text-[#565e74] mt-1">
              المرحلة القادمة
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl flex flex-col justify-center items-center text-center shadow-xs border border-[#dce9ff]">
            <span className="text-2xl font-bold text-[#0d533a] leading-none">
              68%
            </span>
            <span className="text-[11px] font-semibold text-[#565e74] mt-1">
              الإنجاز التراكمي
            </span>
          </div>
        </div>
      </section>

      {/* Filter Pills (Exact HTML spec) */}
      <section
        id="status-filters"
        aria-label="تصفية المشاريع"
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3"
      >
        {filterTabs.map((tab) => {
          const isSelected = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`h-8 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 border ${
                isSelected
                  ? 'bg-[#0d533a] text-white border-[#0d533a] shadow-xs'
                  : 'bg-white text-[#565e74] border-[#dce9ff] hover:bg-[#eff4ff]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </section>

      {/* Projects Feed */}
      <div className="flex flex-col gap-3.5" id="projects-container">
        {filteredProjects.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#dce9ff] text-xs text-[#565e74]">
            لا توجد مشاريع في هذا القسم حالياً.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <article
              key={project.id}
              id={`project-card-${project.id}`}
              className="bg-white rounded-2xl p-4 shadow-xs border border-[#dce9ff] flex flex-col gap-3 transition-all hover:shadow-md"
            >
              {/* Top Row */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-[#0b1c30] leading-snug">
                    {project.title}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
                      project.statusCode === 'review'
                        ? 'bg-[#ffdf99] text-[#5c4500] border border-[#ecc15a]/50'
                        : 'bg-[#aff1cf]/60 text-[#095138] border border-[#94d4b3]/50'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        project.statusCode === 'review'
                          ? 'bg-[#c29b38]'
                          : 'bg-[#0d533a] animate-ping'
                      }`}
                    />
                    {project.statusText}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[#565e74] text-[11px] font-medium">
                  <span>{project.type}</span>
                  <span>•</span>
                  <span>{project.weekProgress}</span>
                </div>
              </div>

              {/* Expert Dossier Row */}
              <div className="flex items-center justify-between bg-[#eff4ff] p-2.5 rounded-xl border border-[#d3e4fe]/60">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-10 h-10 shrink-0">
                    <img
                      src={project.consultant.avatar}
                      alt={project.consultant.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover shadow-xs ring-1 ring-white"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#ffdf99] flex items-center justify-center text-[#5c4500] shadow-xs">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-[#0b1c30] truncate">
                        {project.consultant.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-[#ffdf99]/50 text-[#5c4500] font-bold rounded">
                        {project.consultant.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#565e74] truncate font-medium">
                      {project.consultant.title}
                    </span>
                  </div>
                </div>

                <button
                  id={`btn-chat-consultant-${project.id}`}
                  onClick={() => onOpenChat(project.consultant.id)}
                  aria-label={`محادثة ${project.consultant.name}`}
                  className="h-8 px-2.5 rounded-lg bg-white border border-[#dce9ff] text-[#0d533a] text-xs font-bold flex items-center gap-1 shrink-0 hover:bg-[#0d533a] hover:text-white transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>محادثة</span>
                </button>
              </div>

              {/* Progress & Milestones Section */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[#0b1c30]">
                  <span className="text-xs font-bold text-[#0d533a]">
                    {project.currentMilestoneTitle}
                  </span>
                  <span className="text-xs font-bold text-[#0d533a]">
                    {project.progressPercent}%
                  </span>
                </div>

                {/* Linear Progress Bar */}
                <div className="w-full h-2 rounded-full bg-[#e5eeff] overflow-hidden">
                  <div
                    className="h-full bg-[#0d533a] rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${project.progressPercent}%` }}
                  />
                </div>

                {/* Milestone summary indicators */}
                <div className="flex items-center justify-between text-[#565e74] text-[11px] font-medium pt-0.5">
                  <span className="text-[#0d533a] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    المرحلة الأولى
                  </span>
                  <span className="text-[#0b1c30] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d533a]" />
                    المرحلة الجارية
                  </span>
                  <span className="text-[#565e74]/70">الاعتماد النهائي</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[#e5eeff]" />

              {/* Bottom Meta & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#565e74] text-[11px] font-medium">
                  {project.nextMeeting ? (
                    <>
                      <Users className="w-3.5 h-3.5 text-[#0d533a]" />
                      <span>
                        الاجتماع القادم:{' '}
                        <strong className="text-[#0b1c30] font-bold">
                          {project.nextMeeting}
                        </strong>
                      </span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-3.5 h-3.5 text-[#c29b38]" />
                      <span>
                        موعد التسليم:{' '}
                        <strong className="text-[#0b1c30] font-bold">
                          {project.deliveryDeadline}
                        </strong>{' '}
                        {project.deliveryDaysNotice && `(${project.deliveryDaysNotice})`}
                      </span>
                    </>
                  )}
                </div>

                <button
                  id={`btn-details-${project.id}`}
                  onClick={() => onSelectProjectDetails(project)}
                  className="h-8 px-3 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-xs font-bold flex items-center gap-1 transition-colors border border-[#d3e4fe]"
                >
                  <span>التفاصيل</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Security Footer (Exact HTML spec) */}
      <footer className="mt-4 bg-[#eff4ff] border border-[#d3e4fe] rounded-xl p-3 flex items-center gap-2.5 text-[#565e74]">
        <div className="w-7 h-7 rounded-full bg-[#d3e4fe] flex items-center justify-center text-[#0d533a] shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <p className="text-[11px] font-medium leading-relaxed">
          جميع المشاريع ومخرجاتها مشفرة ومحمية ببروتوكول اتفاقية عدم الإفصاح (
          <strong className="text-[#0b1c30] font-bold">NDA</strong>) المؤسسي المعتمد لدى خبرة.
        </p>
      </footer>
    </div>
  );
};
