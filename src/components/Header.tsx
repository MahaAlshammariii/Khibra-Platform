import React from 'react';
import { ArrowRight, Bell, Share2, X, ShieldCheck, User } from 'lucide-react';
import { APP_LOGO_URL, USER_PROFILE } from '../data/mockData';
import { TabType } from '../types';

interface HeaderProps {
  currentView: 'main' | 'profile' | 'new-request' | 'chat';
  activeTab: TabType;
  onBack?: () => void;
  onShare?: () => void;
  onOpenNotifications?: () => void;
  chatConsultantName?: string;
  hasUnreadNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  activeTab,
  onBack,
  onShare,
  onOpenNotifications,
  chatConsultantName,
  hasUnreadNotifications = true,
}) => {
  if (currentView === 'profile') {
    return (
      <header
        id="app-header-profile"
        className="fixed top-0 left-0 right-0 z-50 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#dce9ff]/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
      >
        <div className="max-w-md mx-auto h-14 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              id="header-profile-back-btn"
              aria-label="رجوع"
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#0b1c30] hover:bg-[#e5eeff] active:scale-95 transition-all"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <img
              src={APP_LOGO_URL}
              alt="شعار خبرة"
              referrerPolicy="no-referrer"
              className="h-8 w-auto object-contain rounded-md"
            />
            <h1 className="text-lg font-bold text-[#0b1c30] tracking-tight mr-1">
              الملف المهني
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              id="header-profile-share-btn"
              aria-label="مشاركة الملف"
              onClick={onShare}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#0d533a] hover:bg-[#aff1cf]/20 active:scale-95 transition-all"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#0d533a] flex items-center justify-center shadow-sm">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (currentView === 'new-request') {
    return (
      <header
        id="app-header-request"
        className="fixed top-0 left-0 right-0 z-50 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#dce9ff]/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
      >
        <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img
              src={APP_LOGO_URL}
              alt="شعار خبرة"
              referrerPolicy="no-referrer"
              className="h-8 w-auto object-contain rounded-md"
            />
            <h1 className="text-lg font-bold text-[#0b1c30] tracking-tight">
              طلب استشارة جديدة
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0d533a] flex items-center justify-center shadow-sm">
              <User className="w-4 h-4 text-white" />
            </div>
            <button
              id="header-request-close-btn"
              aria-label="إغلاق"
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#565e74] hover:text-[#0b1c30] hover:bg-[#e5eeff] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  if (currentView === 'chat') {
    return (
      <header
        id="app-header-chat"
        className="fixed top-0 left-0 right-0 z-50 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#dce9ff]/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
      >
        <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              id="header-chat-back-btn"
              aria-label="رجوع"
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#0b1c30] hover:bg-[#e5eeff] active:scale-95 transition-all"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold text-[#0b1c30]">
                  {chatConsultantName || 'المحادثة الاستشارية'}
                </h1>
                <span className="w-2 h-2 rounded-full bg-[#0d533a] inline-block"></span>
              </div>
              <span className="text-[11px] text-[#565e74] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0d533a]" />
                محادثة مشفرة بموجب اتفاقية NDA
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#0d533a] bg-[#aff1cf]/40 px-2 py-0.5 rounded-full">
              Khibra Safe
            </span>
          </div>
        </div>
      </header>
    );
  }

  // Main Tabs Headers
  if (activeTab === 'projects') {
    return (
      <header
        id="app-header-projects"
        className="fixed top-0 left-0 right-0 z-50 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#dce9ff]/60 shadow-[0_1px_8px_rgba(11,28,48,0.04)]"
      >
        <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={APP_LOGO_URL}
              alt="شعار خبرة"
              referrerPolicy="no-referrer"
              className="h-8 w-auto object-contain rounded-md"
            />
            <div className="flex flex-col">
              <span className="text-[11px] text-[#565e74] leading-none font-medium">منصة خبرة</span>
              <h1 className="text-lg font-bold text-[#0b1c30] leading-tight">Active Projects</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="header-projects-notifications-btn"
              aria-label="الإشعارات"
              onClick={onOpenNotifications}
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#565e74] hover:text-[#0b1c30] hover:bg-[#e5eeff] transition-colors"
            >
              <Bell className="w-5 h-5" />
              {hasUnreadNotifications && (
                <span className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white" />
              )}
            </button>
            <img
              src={USER_PROFILE.avatar}
              alt="الملف الشخصي"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover shadow-sm ring-1 ring-[#0d533a]/20"
            />
          </div>
        </div>
      </header>
    );
  }

  // Default Home / Main Header (Image 12)
  return (
    <header
      id="app-header-home"
      className="fixed top-0 left-0 right-0 z-50 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#dce9ff]/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
    >
      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src={APP_LOGO_URL}
            alt="شعار خبرة"
            referrerPolicy="no-referrer"
            className="h-8 w-auto object-contain rounded-md"
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-[#0b1c30] leading-tight">
              Khibra | خبرة
            </h1>
            <span className="text-[11px] text-[#565e74] font-medium leading-none">
              Al Raisiya
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="header-home-notifications-btn"
            aria-label="الإشعارات"
            onClick={onOpenNotifications}
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#565e74] hover:text-[#0b1c30] hover:bg-[#e5eeff] transition-colors"
          >
            <Bell className="w-5 h-5" />
            {hasUnreadNotifications && (
              <span className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white" />
            )}
          </button>
          <div className="relative">
            <img
              src={USER_PROFILE.avatar}
              alt="الملف الشخصي"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover shadow-sm ring-2 ring-[#0d533a]/30"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#0d533a] ring-2 ring-white" />
          </div>
        </div>
      </div>
    </header>
  );
};
