import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    email: 'sarah@example.com',
    password: 'password123',
    university: 'University of Texas',
    fraternity: 'Kappa Kappa Gamma',
    gradYear: 2022,
    industry: 'Technology',
    bio: 'Software Engineer passionate about building products that make a difference. Always looking to connect with fellow Greeks!',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    location: 'Austin, TX',
    connections: ['2', '3', '4'],
    pendingConnections: [],
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    password: 'password123',
    university: 'Stanford University',
    fraternity: 'Sigma Chi',
    gradYear: 2021,
    industry: 'Finance',
    bio: 'Investment banker at Goldman Sachs. Stanford Sigma Chi alum. Love helping brothers navigate their careers.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    location: 'New York, NY',
    connections: ['1', '3'],
    pendingConnections: [],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    password: 'password123',
    university: 'UCLA',
    fraternity: 'Delta Gamma',
    gradYear: 2023,
    industry: 'Marketing',
    bio: 'Marketing Manager at a tech startup. UCLA Delta Gamma. Passionate about brand storytelling and Greek life.',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    location: 'Los Angeles, CA',
    connections: ['1', '2'],
    pendingConnections: [],
  },
  {
    id: '4',
    name: 'James Thompson',
    email: 'james@example.com',
    password: 'password123',
    university: 'University of Michigan',
    fraternity: 'Beta Theta Pi',
    gradYear: 2020,
    industry: 'Consulting',
    bio: 'Strategy Consultant at McKinsey. Michigan Beta alum. Love mentoring young professionals.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    location: 'Chicago, IL',
    connections: ['1'],
    pendingConnections: [],
  },
  {
    id: '5',
    name: 'Ashley Williams',
    email: 'ashley@example.com',
    password: 'password123',
    university: 'Duke University',
    fraternity: 'Alpha Chi Omega',
    gradYear: 2022,
    industry: 'Healthcare',
    bio: 'Medical student at Johns Hopkins. Duke Alpha Chi Omega. Balancing medicine and Greek connections.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    location: 'Baltimore, MD',
    connections: [],
    pendingConnections: ['1'],
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('greeklink_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('greeklink_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    // Check if email exists
    if (MOCK_USERS.some(u => u.email === userData.email)) {
      return false;
    }
    
    const newUser: User = {
      id: String(Date.now()),
      name: userData.name || '',
      email: userData.email || '',
      university: userData.university || '',
      fraternity: userData.fraternity || '',
      gradYear: userData.gradYear || new Date().getFullYear(),
      industry: userData.industry || '',
      bio: userData.bio || '',
      avatarUrl: '',
      location: userData.location || '',
      connections: [],
      pendingConnections: [],
    };
    
    setCurrentUser(newUser);
    localStorage.setItem('greeklink_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('greeklink_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (currentUser) {
      const updated = { ...currentUser, ...updates };
      setCurrentUser(updated);
      localStorage.setItem('greeklink_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      isLoading,
      login,
      register,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Export mock users for other components
export const getMockUsers = () => MOCK_USERS.map(({ password, ...user }) => user);
