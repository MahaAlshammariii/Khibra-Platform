import React, { useState } from 'react';
import { CONSULTANTS, ACTIVE_PROJECTS } from './data/mockData';
import { Consultant, ActiveProject, TabType } from './types';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { HomeScreen } from './components/HomeScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { NewRequestModal } from './components/NewRequestModal';
import { ProjectsScreen } from './components/ProjectsScreen';
import { ChatScreen } from './components/ChatScreen';
import { AccountScreen } from './components/AccountScreen';
import { ProjectDetailsModal } from './components/ProjectDetailsModal';
import { ScreenSwitcher, ScreenId } from './components/ScreenSwitcher';
import { Toast } from './components/Toast';
import { CheckCircle2, ShieldCheck, ArrowLeft, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [currentView, setCurrentView] = useState<'main' | 'profile' | 'new-request' | 'chat'>('main');
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant>(CONSULTANTS[0]);
  const [activeChatConsultantId, setActiveChatConsultantId] = useState<string>('dr-fahad');
  const [inspectedProject, setInspectedProject] = useState<ActiveProject | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info' | 'security'>('success');
  const [showMatchSuccessModal, setShowMatchSuccessModal] = useState<boolean>(false);
  const [lastSubmittedRequest, setLastSubmittedRequest] = useState<{
    title: string;
    engagementType: string;
  } | null>(null);

  const triggerToast = (msg: string, type: 'success' | 'info' | 'security' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Navigations
  const handleSelectConsultantProfile = (consultant: Consultant) => {
    setSelectedConsultant(consultant);
    setCurrentView('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestConsultation = (consultant?: Consultant) => {
    if (consultant) {
      setSelectedConsultant(consultant);
    }
    setCurrentView('new-request');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChat = (consultantId: string) => {
    setActiveChatConsultantId(consultantId);
    setCurrentView('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'requests') {
      setCurrentView('new-request');
    } else if (tab === 'messages') {
      setCurrentView('chat');
    } else {
      setCurrentView('main');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShareProfile = () => {
    navigator.clipboard?.writeText(window.location.href);
    triggerToast('تم نسخ رابط الملف المهني الموثّق بنجاح');
  };

  const handleSaveDraft = () => {
    triggerToast('تم حفظ مسودة الطلب الاستشاري وتشفير البيانات', 'security');
  };

  const handleSubmitRequestSuccess = (data: {
    title: string;
    engagementType: string;
  }) => {
    setLastSubmittedRequest(data);
    setShowMatchSuccessModal(true);
  };

  const handleNavigateToScreen = (screenId: ScreenId) => {
    if (screenId === 'screen-home') {
      setCurrentView('main');
      setActiveTab('home');
    } else if (screenId === 'screen-profile') {
      setSelectedConsultant(CONSULTANTS[0]);
      setCurrentView('profile');
    } else if (screenId === 'screen-request') {
      setSelectedConsultant(CONSULTANTS[0]);
      setCurrentView('new-request');
    } else if (screenId === 'screen-projects') {
      setCurrentView('main');
      setActiveTab('projects');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col antialiased selection:bg-[#aff1cf] selection:text-[#002114]" dir="rtl">
      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />

      {/* Adaptive Header */}
      <Header
        currentView={currentView}
        activeTab={activeTab}
        onBack={handleBackToMain}
        onShare={handleShareProfile}
        chatConsultantName={
          CONSULTANTS.find((c) => c.id === activeChatConsultantId)?.name
        }
        onOpenNotifications={() =>
          triggerToast('لديك 3 تحديثات تنفيذية على مشاريع الربع الأول النشطة', 'info')
        }
      />

      {/* Screen Switcher Bar for Quick Verification of All 4 Uploaded Design Screens */}
      <div className="pt-16 w-full flex flex-col items-center">
        <ScreenSwitcher
          currentView={currentView}
          activeTab={activeTab}
          onNavigateToScreen={handleNavigateToScreen}
        />
      </div>

      {/* Main Screen Content Body */}
      <main className="flex-1 w-full flex flex-col items-center">
        {currentView === 'profile' ? (
          <ProfileScreen
            consultant={selectedConsultant}
            onBack={handleBackToMain}
            onRequestConsultation={handleRequestConsultation}
          />
        ) : currentView === 'new-request' ? (
          <NewRequestModal
            initialConsultant={selectedConsultant}
            onClose={handleBackToMain}
            onSubmitSuccess={handleSubmitRequestSuccess}
            onSaveDraft={handleSaveDraft}
          />
        ) : currentView === 'chat' ? (
          <ChatScreen
            consultantId={activeChatConsultantId}
            onBack={handleBackToMain}
            onRequestMeeting={() => handleRequestConsultation(selectedConsultant)}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeScreen
                onSelectConsultant={handleSelectConsultantProfile}
                onRequestConsultation={handleRequestConsultation}
                onOpenDelegationInfo={() => {
                  setActiveTab('account');
                  triggerToast('تم فتح ملف التفويض الاستراتيجي النشط', 'security');
                }}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsScreen
                onOpenChat={handleOpenChat}
                onSelectProjectDetails={(proj) => setInspectedProject(proj)}
              />
            )}

            {activeTab === 'account' && (
              <AccountScreen onShowToast={(msg) => triggerToast(msg, 'info')} />
            )}
          </>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      {(currentView === 'main' || currentView === 'profile') && (
        <BottomNavigation
          activeTab={currentView === 'profile' ? 'home' : activeTab}
          onTabChange={handleTabChange}
          activeProjectsCount={ACTIVE_PROJECTS.length}
          unreadMessagesCount={1}
        />
      )}

      {/* Project Details Modal */}
      {inspectedProject && (
        <ProjectDetailsModal
          project={inspectedProject}
          onClose={() => setInspectedProject(null)}
          onOpenChat={handleOpenChat}
        />
      )}

      {/* Matching Success Modal */}
      {showMatchSuccessModal && (
        <div className="fixed inset-0 z-50 bg-[#0b1c30]/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full border border-[#dce9ff] text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#aff1cf]/60 text-[#095138] flex items-center justify-center mb-3.5 shadow-xs">
              <CheckCircle2 className="w-9 h-9 text-[#0d533a]" />
            </div>

            <span className="text-[11px] font-bold text-[#095138] bg-[#aff1cf]/50 px-3 py-0.5 rounded-full border border-[#94d4b3]/50 mb-1">
              تم إرسال الطلب والتشفير بنجاح
            </span>

            <h3 className="text-lg font-bold text-[#0b1c30] mt-1">
              جاري مطابقة نخبة المستشارين
            </h3>

            <p className="text-xs text-[#565e74] mt-2 leading-relaxed">
              تم تسجيل مبادرتكم «{lastSubmittedRequest?.title}» تحت مظلة اتفاقية السرية السيادية (NDA)، وسيتم ترشيح أفضل 3 مستشارين معتمدين خلال أقل من 24 ساعة.
            </p>

            <div className="w-full bg-[#eff4ff] rounded-xl p-3 my-4 border border-[#d3e4fe] flex items-center gap-2.5 text-right">
              <ShieldCheck className="w-5 h-5 text-[#0d533a] shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#0b1c30]">
                  المستشار المباشر: {selectedConsultant.name}
                </span>
                <span className="text-[11px] text-[#565e74] truncate">
                  تم إرسال إشعار فوري لجدولة المكالمة التعريفية
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowMatchSuccessModal(false);
                  setCurrentView('chat');
                  setActiveChatConsultantId(selectedConsultant.id);
                }}
                className="w-full h-11 rounded-xl bg-[#0d533a] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#093928] transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>بدء المحادثة المشفرة المباشرة</span>
              </button>

              <button
                onClick={() => {
                  setShowMatchSuccessModal(false);
                  setCurrentView('main');
                  setActiveTab('projects');
                }}
                className="w-full h-11 rounded-xl bg-[#eff4ff] text-[#0b1c30] text-xs font-bold hover:bg-[#dce9ff] transition-colors"
              >
                <span>الانتقال إلى المشاريع النشطة</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
