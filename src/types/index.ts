export interface User {
  id: string;
  name: string;
  email: string;
  university: string;
  fraternity: string;
  gradYear: number;
  industry: string;
  bio: string;
  avatarUrl: string;
  location?: string;
  connections: string[];
  pendingConnections: string[];
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message | null;
  updatedAt: Date;
}

export interface ConnectionRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export const FRATERNITIES = [
  'Alpha Phi Alpha',
  'Alpha Kappa Alpha',
  'Kappa Alpha Psi',
  'Omega Psi Phi',
  'Delta Sigma Theta',
  'Phi Beta Sigma',
  'Zeta Phi Beta',
  'Sigma Gamma Rho',
  'Alpha Tau Omega',
  'Beta Theta Pi',
  'Chi Phi',
  'Delta Chi',
  'Delta Kappa Epsilon',
  'Delta Tau Delta',
  'Kappa Alpha Order',
  'Kappa Sigma',
  'Lambda Chi Alpha',
  'Phi Delta Theta',
  'Phi Gamma Delta',
  'Phi Kappa Psi',
  'Phi Kappa Sigma',
  'Phi Kappa Tau',
  'Pi Kappa Alpha',
  'Pi Kappa Phi',
  'Sigma Alpha Epsilon',
  'Sigma Chi',
  'Sigma Nu',
  'Sigma Phi Epsilon',
  'Tau Kappa Epsilon',
  'Theta Chi',
  'Alpha Chi Omega',
  'Alpha Delta Pi',
  'Alpha Gamma Delta',
  'Alpha Omicron Pi',
  'Alpha Phi',
  'Chi Omega',
  'Delta Delta Delta',
  'Delta Gamma',
  'Delta Zeta',
  'Gamma Phi Beta',
  'Kappa Alpha Theta',
  'Kappa Delta',
  'Kappa Kappa Gamma',
  'Phi Mu',
  'Pi Beta Phi',
  'Sigma Kappa',
  'Zeta Tau Alpha',
];

export const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Consulting',
  'Law',
  'Education',
  'Marketing',
  'Real Estate',
  'Engineering',
  'Media & Entertainment',
  'Non-Profit',
  'Government',
  'Entrepreneurship',
  'Sales',
  'Human Resources',
  'Other',
];
