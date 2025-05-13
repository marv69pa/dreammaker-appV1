import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DreamSettings, DreamTheme } from '@/types';

interface DreamContextType {
  dreams: DreamSettings[];
  currentDream: DreamSettings | null;
  createDream: (dreamscape: Omit<DreamSettings, 'id' | 'createdAt'>) => void;
  updateDream: (id: string, dreamscape: Partial<DreamSettings>) => void;
  deleteDream: (id: string) => void;
  setCurrentDream: (dreamscape: DreamSettings | null) => void;
}

const defaultDreamContext: DreamContextType = {
  dreams: [],
  currentDream: null,
  createDream: () => {},
  updateDream: () => {},
  deleteDream: () => {},
  setCurrentDream: () => {}
};

const DreamContext = createContext<DreamContextType>(defaultDreamContext);

export const useDream = () => useContext(DreamContext);
export { useDream as useDreamscape };

export const DreamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dreams, setDreams] = useState<DreamSettings[]>(() => {
    const storedDreams = localStorage.getItem('dreammaker_dreams');
    return storedDreams ? JSON.parse(storedDreams) : [];
  });
  
  const [currentDream, setCurrentDream] = useState<DreamSettings | null>(null);

  const saveDreamsToStorage = (updatedDreams: DreamSettings[]) => {
    localStorage.setItem('dreammaker_dreams', JSON.stringify(updatedDreams));
  };

  const createDream = (dreamData: Omit<DreamSettings, 'id' | 'createdAt'>) => {
    const newDream: DreamSettings = {
  ...dreamData,
  id: uuidv4(),
  createdAt: new Date(),
  title: dreamData.title || 'Untitled Dreamscape',
  description: dreamData.visualStyle || 'No description provided.',
  audioUrl: '/placeholder-audio.mp3', // host this or replace with a valid URL
  thumbnail: dreamData.customImages?.[0] || '/placeholder-image.jpg' // fallback image
};
    
    const updatedDreams = [...dreams, newDream];
    setDreams(updatedDreams);
    saveDreamsToStorage(updatedDreams);
    return newDream;
  };

  const updateDream = (id: string, dreamData: Partial<DreamSettings>) => {
    const updatedDreams = dreams.map(dreamscape => 
      dreamscape.id === id ? { ...dreamscape, ...dreamData } : dreamscape
    );
    
    setDreams(updatedDreams);
    saveDreamsToStorage(updatedDreams);
    
    if (currentDream?.id === id) {
      setCurrentDream({ ...currentDream, ...dreamData });
    }
  };

  const deleteDream = (id: string) => {
    const updatedDreams = dreams.filter(dreamscape => dreamscape.id !== id);
    setDreams(updatedDreams);
    saveDreamsToStorage(updatedDreams);
    
    if (currentDream?.id === id) {
      setCurrentDream(null);
    }
  };

  return (
    <DreamContext.Provider
      value={{
        dreams,
        currentDream,
        createDream,
        updateDream,
        deleteDream,
        setCurrentDream
      }}
    >
      {children}
    </DreamContext.Provider>
  );
};
