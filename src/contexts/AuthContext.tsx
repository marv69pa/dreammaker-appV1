import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const defaultAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true
};

const AuthContext = createContext<AuthContextType>({
  ...defaultAuthState,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfile: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  useEffect(() => {
    // Check for stored user data in localStorage
    const storedUser = localStorage.getItem('dreammaker_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('dreammaker_user');
        setAuthState({
          ...defaultAuthState,
          isLoading: false
        });
      }
    } else {
      setAuthState({
        ...defaultAuthState,
        isLoading: false
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would call an API
    const mockUser: User = {
      id: '1',
      email,
      name: 'Demo User',
      subscription: 'free'
    };
    
    localStorage.setItem('dreammaker_user', JSON.stringify(mockUser));
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false
    });
  };

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup - in a real app, this would call an API
    const mockUser: User = {
      id: '1',
      email,
      name,
      subscription: 'free'
    };
    
    localStorage.setItem('dreammaker_user', JSON.stringify(mockUser));
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('dreammaker_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const updateProfile = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      localStorage.setItem('dreammaker_user', JSON.stringify(updatedUser));
      setAuthState({
        ...authState,
        user: updatedUser
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
