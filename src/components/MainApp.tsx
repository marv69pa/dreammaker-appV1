import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthScreen from './auth/AuthScreen';
import Dashboard from './dashboard/Dashboard';
import DreamCreator from './dreammaker/DreamCreator';
import DreamPlayer from './dreammaker/DreamPlayer';
import SubscriptionPlans from './dreammaker/SubscriptionPlans';
import EnhancedAdamGuide from './dreammaker/EnhancedAdamGuide';
import { DreamProvider } from '@/contexts/DreamContext';

const MainApp: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <DreamProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <AuthScreen />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/create" element={isAuthenticated ? <DreamCreator /> : <Navigate to="/" />} />
          <Route path="/play" element={isAuthenticated ? <DreamPlayer /> : <Navigate to="/" />} />
          <Route path="/subscription" element={isAuthenticated ? <SubscriptionPlans /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <EnhancedAdamGuide showWelcome={!isAuthenticated} />
      </div>
    </DreamProvider>
  );
};

export default MainApp;
