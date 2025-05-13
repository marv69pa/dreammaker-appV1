
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Bot, X } from 'lucide-react';

interface AdamGuideProps {
  initialMessage?: string;
}

const AdamGuide: React.FC<AdamGuideProps> = ({
  initialMessage = "Hi, I'm ADAM (All Dreams Are Made). I'm here to help you create your dreamscape experience. Need assistance?"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  return (
    <>
      {/* Centered Placeholder */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 50,
        pointerEvents: 'none',
        textAlign: 'center'
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          animation: 'pulse 2s infinite'
        }} />
        <p style={{ color: '#ccc', marginTop: '10px', fontStyle: 'italic' }}>ADAM is listening...</p>
      </div>

      {/* Bottom-right Prompt Box */}
      <div className="fixed bottom-4 right-4 z-50">
        {isOpen ? (
          <Card className="p-4 w-80 bg-white shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">ADAM</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X size={18} /></Button>
            </div>
            <p className="text-sm">{message}</p>
          </Card>
        ) : (
          <Button onClick={() => setIsOpen(true)} className="shadow-lg" variant="outline">
            <Bot className="mr-2" size={18} /> Tips from ADAM
          </Button>
        )}
      </div>

      <style>
        {`@keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.6; }
            100% { transform: scale(1); opacity: 1; }
        }`}
      </style>
    </>
  );
};

export default AdamGuide;
