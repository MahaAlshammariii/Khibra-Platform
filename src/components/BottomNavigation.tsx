import React from 'react';
import { Home, Briefcase, FileSpreadsheet, MessageSquare, UserCheck } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  activeProjectsCount?: number;
  unreadMessagesCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  activeProjectsCount = 3,
  unreadMessagesCount = 1,
}) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: 'الرئيسية',
      icon: Home,
    },
    {
      id: 'projects' as TabType,
      label: 'المشاريع',
      icon: Briefcase,
      badge: activeProjectsCount,
    },
    {
      id: 'requests' as TabType,
      label: 'الطلبات',
      icon: FileSpreadsheet,
    },
    {
      id: 'messages' as TabType,
      label: 'المحادثات',
      icon: MessageSquare,
      badge: unreadMessagesCount,
    },
    {
      id: 'account' as TabType,
      label: 'الحساب',
      icon: UserCheck,
    },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      aria-label="شريط التنقل السفلي"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#f8f9ff]/92 backdrop-blur-xl border-t border-[#dce9ff] shadow-[0_-2px_12px_rgba(11,28,48,0.05)] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] gap-1 transition-all rounded-xl py-1 px-2 ${
                isActive
                  ? 'text-[#0d533a] font-bold'
                  : 'text-[#565e74] hover:text-[#0b1c30]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-[#0d533a]' : 'text-[#565e74]'
                  }`}
                  strokeWidth={isActive ? 2.4 : 1.8}
                />
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] leading-tight ${isActive ? 'font-bold text-[#0d533a]' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-5 h-0.5 rounded-full bg-[#0d533a]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
