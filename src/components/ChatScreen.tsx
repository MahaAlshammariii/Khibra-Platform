import React, { useState } from 'react';
import {
  Send,
  Paperclip,
  FileText,
  CheckCheck,
  ShieldCheck,
  Calendar,
  Lock,
  PhoneCall,
  Video,
} from 'lucide-react';
import { CONSULTANTS, INITIAL_CHAT_MESSAGES, USER_PROFILE } from '../data/mockData';
import { ChatMessage } from '../types';

interface ChatScreenProps {
  consultantId: string;
  onBack: () => void;
  onRequestMeeting?: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({
  consultantId,
  onBack,
  onRequestMeeting,
}) => {
  const consultant =
    CONSULTANTS.find((c) => c.id === consultantId) || CONSULTANTS[0];

  const [messages, setMessages] = useState<ChatMessage[]>(
    INITIAL_CHAT_MESSAGES[consultantId] || [
      {
        id: 'init-1',
        senderId: consultant.id,
        senderName: consultant.name,
        text: `مرحباً سعادة المهندس عبدالعزيز، يسعدني التنسيق والبدء معكم في استشارة ${consultant.title}.`,
        timestamp: 'اليوم 09:00 ص',
        isConsultant: true,
      },
    ]
  );

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      senderName: USER_PROFILE.name,
      text: inputMessage,
      timestamp: 'الآن',
      isConsultant: false,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Simulate polite advisor reply
    setTimeout(() => {
      const autoReply: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        senderId: consultant.id,
        senderName: consultant.name,
        text: 'تم استلام استفساركم باهتمام، وجاري مراجعة النطاق التنفيذي المرفق وموافاتكم خلال جلسة العمل القادمة.',
        timestamp: 'الآن',
        isConsultant: true,
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] max-w-md mx-auto animate-in fade-in duration-300">
      {/* Encrypted Session Notice Banner */}
      <div className="bg-[#eff4ff] border-b border-[#d3e4fe] px-4 py-2 flex items-center justify-between text-[11px] text-[#565e74]">
        <div className="flex items-center gap-1.5 font-medium">
          <Lock className="w-3.5 h-3.5 text-[#0d533a]" />
          <span>المحادثة محمية ببروتوكول التشفير العسكري ووثيقة NDA</span>
        </div>
        <button
          onClick={onRequestMeeting}
          className="text-[#0d533a] font-bold flex items-center gap-1 hover:underline"
        >
          <Calendar className="w-3 h-3" />
          <span>حجز مكالمة</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.isConsultant ? 'items-start' : 'items-end'
            }`}
          >
            <div className="flex items-center gap-1 mb-1 text-[11px] text-[#565e74]">
              <span>{msg.senderName}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                msg.isConsultant
                  ? 'bg-white text-[#0b1c30] border border-[#dce9ff] shadow-xs'
                  : 'bg-[#0d533a] text-white shadow-xs'
              }`}
            >
              <p>{msg.text}</p>

              {msg.hasAttachment && (
                <div
                  className={`mt-2 p-2.5 rounded-xl flex items-center justify-between gap-2 border ${
                    msg.isConsultant
                      ? 'bg-[#eff4ff] border-[#d3e4fe] text-[#0b1c30]'
                      : 'bg-[#093928] border-white/20 text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-[#0d533a] shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold truncate text-[11px]">
                        {msg.hasAttachment.name}
                      </span>
                      <span className="text-[10px] opacity-75">
                        {msg.hasAttachment.size} • {msg.hasAttachment.type}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#aff1cf]/50 text-[#095138]">
                    تحميل
                  </span>
                </div>
              )}
            </div>

            {!msg.isConsultant && (
              <div className="flex items-center gap-1 text-[10px] text-[#565e74] mt-0.5">
                <span>تمت القراءة</span>
                <CheckCheck className="w-3 h-3 text-[#0d533a]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sticky Chat Input Bar */}
      <div className="bg-white border-t border-[#dce9ff] p-3 pb-[env(safe-area-inset-bottom,12px)]">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button
            type="button"
            className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#565e74] hover:text-[#0b1c30] hover:bg-[#dce9ff] flex items-center justify-center transition-colors shrink-0"
            title="إرفاق ملف استشاري مشفر"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="اكتب استفسارك أو طلبك الاستشاري..."
            className="flex-1 h-10 px-3.5 bg-[#eff4ff] text-[#0b1c30] rounded-xl text-xs placeholder:text-[#565e74] border border-[#dce9ff] focus:outline-none focus:ring-2 focus:ring-[#0d533a]/30 transition-colors"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="w-10 h-10 rounded-xl bg-[#0d533a] text-white flex items-center justify-center hover:bg-[#093928] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
