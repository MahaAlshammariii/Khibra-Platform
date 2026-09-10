import React from 'react';
import { LayoutGrid, User, FileEdit, Briefcase } from 'lucide-react';
import { TabType } from '../types';

export type ScreenId = 'screen-home' | 'screen-profile' | 'screen-request' | 'screen-projects';

interface ScreenSwitcherProps {
  currentView: 'main' | 'profile' | 'new-request' | 'chat';
  activeTab: TabType;
  onNavigateToScreen: (screenId: ScreenId) => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentView,
  activeTab,
  onNavigateToScreen,
}) => {
  let activeScreen: ScreenId = 'screen-home';
  if (currentView === 'profile') {
    activeScreen = 'screen-profile';
  } else if (currentView === 'new-request') {
    activeScreen = 'screen-request';
  } else if (currentView === 'main' && activeTab === 'projects') {
    activeScreen = 'screen-projects';
  } else if (currentView === 'main' && activeTab === 'home') {
    activeScreen = 'screen-home';
  }

  const screens = [
    {
      id: 'screen-home' as ScreenId,
      name: '1. الرئيسية',
      subtitle: 'قائمة الخبراء',
      icon: LayoutGrid,
    },
    {
      id: 'screen-profile' as ScreenId,
      name: '2. الملف المهني',
      subtitle: 'د. فهد العتيبي',
      icon: User,
    },
    {
      id: 'screen-request' as ScreenId,
      name: '3. طلب استشارة',
      subtitle: 'نموذج التعاقد',
      icon: FileEdit,
    },
    {
      id: 'screen-projects' as ScreenId,
      name: '4. المشاريع النشطة',
      subtitle: 'متابعة الإنجاز',
      icon: Briefcase,
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto px-3 pt-2 pb-1">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-1.5 border border-[#dce9ff] shadow-xs">
        <div className="flex items-center justify-between px-2 py-1 mb-1 text-[11px] text-[#565e74]">
          <span className="font-bold text-[#0d533a] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#0d533a] animate-pulse" />
            شاشات التطبيق الـ 4 المصممة:
          </span>
          <span className="text-[10px] bg-[#eff4ff] text-[#0d533a] px-2 py-0.5 rounded-full font-semibold border border-[#d3e4fe]">
            اضغط للتنقل السريع
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {screens.map((screen) => {
            const Icon = screen.icon;
            const isCurrent = activeScreen === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => onNavigateToScreen(screen.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all text-center min-h-[44px] ${
                  isCurrent
                    ? 'bg-[#0d533a] text-white shadow-xs font-bold'
                    : 'bg-[#f8f9ff] text-[#404943] hover:bg-[#e5eeff] hover:text-[#0b1c30] border border-[#dce9ff]/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 mb-1 ${isCurrent ? 'text-white' : 'text-[#0d533a]'}`} />
                <span className="text-[10px] leading-tight font-bold whitespace-nowrap">
                  {screen.name}
                </span>
                <span
                  className={`text-[9px] leading-none mt-0.5 truncate max-w-full px-0.5 ${
                    isCurrent ? 'text-[#aff1cf]' : 'text-[#565e74]'
                  }`}
                >
                  {screen.subtitle}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
