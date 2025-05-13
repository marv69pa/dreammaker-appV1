import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

interface EnhancedAdamGuideProps {
  initialMessage?: string;
  showWelcome?: boolean;
}

const EnhancedAdamGuide: React.FC<EnhancedAdamGuideProps> = ({ 
  initialMessage,
  showWelcome = false
}) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(showWelcome);
  const [message, setMessage] = useState('');
  const [animationClass, setAnimationClass] = useState('animate-pulse');
  
  useEffect(() => {
    if (showWelcome && user) {
      setMessage(`Hello ${user.name}, my name is ADAM and I am your DreamMaker. I'll help you create your perfect dreamscape experience.`);
    } else if (initialMessage) {
      setMessage(initialMessage);
    } else {
      setMessage("I'm ADAM, your dreamscape guide. How can I assist you today?");
    }
    
    // Change animation every few seconds
    const animationInterval = setInterval(() => {
      const animations = ['animate-pulse', 'animate-bounce', 'animate-none'];
      const currentIndex = animations.indexOf(animationClass);
      const nextIndex = (currentIndex + 1) % animations.length;
      setAnimationClass(animations[nextIndex]);
    }, 5000);
    
    return () => clearInterval(animationInterval);
  }, [user, initialMessage, showWelcome, animationClass]);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="p-4 w-80 shadow-lg animate-in fade-in slide-in-from-bottom-5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border-indigo-200 dark:border-indigo-800">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full bg-indigo-400/20 ${animationClass}`}></div>
                <span className="text-white font-bold text-xs">ADAM</span>
              </div>
              <span className="font-medium text-indigo-700 dark:text-indigo-300">All Dreams Are Made</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-7 w-7">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mb-4 p-3 bg-white/80 dark:bg-black/20 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
            <p className="text-sm">{message}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs bg-white/50 dark:bg-black/20 border-indigo-200 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
              onClick={() => setMessage("To create a dreamscape, select a theme that resonates with you, add some inspiration images, and describe what you'd like to experience.")}
            >
              How to create a dreamscape?
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs bg-white/50 dark:bg-black/20 border-indigo-200 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
              onClick={() => setMessage("For the best experience, use headphones and find a quiet, comfortable place. Play your dreamscape as you're getting ready to sleep.")}
            >
              Tips for use
            </Button>
          </div>
        </Card>
      ) : (
        <Button 
          className="rounded-full h-14 w-14 shadow-lg flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-none"
          onClick={() => setIsOpen(true)}
        >
          <div className="relative h-8 w-8 rounded-full flex items-center justify-center">
            <div className={`absolute inset-0 rounded-full bg-white/20 ${animationClass}`}></div>
            <span className="text-white font-bold text-xs">ADAM</span>
          </div>
        </Button>
      )}
    </div>
  );
};

export default EnhancedAdamGuide;
