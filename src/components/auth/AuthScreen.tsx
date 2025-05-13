import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuth } from '@/contexts/AuthContext';

const AuthScreen: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);

  if (isAuthenticated) {
    return null; // If already authenticated, don't show auth screen
  }

  const toggleForm = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">DreamMaker</h1>
          <p className="text-muted-foreground">Create personalized dreamscape experiences</p>
        </div>
        
        {isLoginView ? (
          <LoginForm onToggleForm={toggleForm} />
        ) : (
          <SignupForm onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
