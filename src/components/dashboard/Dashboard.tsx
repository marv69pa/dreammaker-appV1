
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDream } from '@/contexts/DreamContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Moon, Settings, LogOut, Play, Calendar, CreditCard } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { dreams, setCurrentDream } = useDream(); // renamed context
  const [showSettings, setShowSettings] = useState(false);

  const createNewDreamscape = () => navigate('/create');

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Your Dreamscapes</h1>
        <div className="space-x-2">
          <Button onClick={() => setShowSettings(true)} variant="outline">
            <Settings size={18} className="mr-1" /> Settings
          </Button>
          <Button onClick={logout} variant="ghost"><LogOut size={18} /></Button>
        </div>
      </div>

      {showSettings && (
        <div className="mb-4 p-4 border rounded bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Settings (Coming Soon)</h2>
          <p className="text-sm text-gray-600">Settings functionality will be available in a future update.</p>
          <Button onClick={() => setShowSettings(false)} className="mt-2" size="sm">Close</Button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(dreams) && dreams.map((dscape, i) => (
          <Card key={i} onClick={() => { setCurrentDream(dscape); navigate('/play'); }} className="cursor-pointer">
            <CardHeader>
              <CardTitle>{dscape.title || 'Untitled'}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{dscape.description || 'No description provided.'}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Button onClick={createNewDreamscape} className="w-full">
          <PlusCircle className="mr-2" /> Create Dreamscape
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
