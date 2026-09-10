export interface Consultant {
  id: string;
  name: string;
  nameEn: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  badge: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  responseSpeed: string;
  ndaStatus: string;
  bio: string;
  achievements: {
    icon: string;
    text: string;
    highlight?: string;
  }[];
  advisoryTracks: {
    id: string;
    title: string;
    titleEn: string;
    description: string;
  }[];
  targetSectors: string[];
  tags: string[];
  verifiedStat: string;
}

export interface ProjectMilestone {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  date?: string;
}

export interface ActiveProject {
  id: string;
  title: string;
  type: string;
  weekProgress: string;
  statusText: string;
  statusCode: 'in-progress' | 'review' | 'partial';
  consultant: {
    name: string;
    title: string;
    badge: string;
    avatar: string;
    id: string;
  };
  currentMilestoneTitle: string;
  progressPercent: number;
  milestones: ProjectMilestone[];
  deliveryDeadline: string;
  deliveryDaysNotice?: string;
  nextMeeting?: string;
  category: 'in-progress' | 'review' | 'partial';
}

export interface ConsultationRequestForm {
  engagementType: string;
  challengeTitle: string;
  scope: string;
  duration: string;
  consultantLevel: string;
  targetConsultantId?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isConsultant: boolean;
  hasAttachment?: {
    name: string;
    size: string;
    type: string;
  };
}

export type TabType = 'home' | 'projects' | 'requests' | 'messages' | 'account';
