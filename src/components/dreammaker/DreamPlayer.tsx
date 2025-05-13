
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDreamscape } from '@/contexts/DreamContext';  // updated reference
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Play, Pause, Download, Moon, Volume2 } from 'lucide-react';

const DreamPlayer: React.FC = () => {
  const navigate = useNavigate();
  const { currentDreamscape } = useDreamscape(); // renamed context hook
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState<HTMLAudioElement | null>(
    currentDreamscape?.audioUrl ? new Audio(currentDreamscape.audioUrl) : null
  );

  useEffect(() => {
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(e => console.error("Playback error:", e));
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying, audio]);

  return (
    <div className="p-6">
      <Button onClick={() => navigate(-1)} variant="ghost" className="mb-4"><ArrowLeft /> Back</Button>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{currentDreamscape?.title || "Untitled Dreamscape"}</CardTitle>
        </CardHeader>
        <CardContent>
          {audio ? (
            <div className="text-sm text-gray-700 mb-4">Playing: {currentDreamscape?.audioUrl}</div>
          ) : (
            <div className="text-sm text-red-500 mb-4">No audio found for this dreamscape.</div>
          )}
          <div className="flex items-center space-x-4">
            <Button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Volume2 size={20} />
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
        </CardContent>
        <CardFooter>
          <Label htmlFor="sleep-timer">Sleep Timer</Label>
          <Slider id="sleep-timer" defaultValue={[10]} max={60} step={5} className="mt-2" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default DreamPlayer;
