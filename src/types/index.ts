export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  subscription?: 'free' | 'premium';
}

export type DreamTheme = 'Adventure' | 'Tranquility' | 'Romance' | 'Fantasy';

export interface DreamSettings {
  id: string;
  theme: DreamTheme;
  customImages?: string[];
  visualStyle?: string;
  soundscape?: string;
  duration?: number;
  title: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
