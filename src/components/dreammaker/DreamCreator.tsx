import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDream } from '@/contexts/DreamContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DreamTheme } from '@/types';
import { ImageUploader } from './ImageUploader';
import { ArrowLeft, Save, X } from 'lucide-react';

const DreamCreator: React.FC = () => {
  const navigate = useNavigate();
  const { createDream } = useDream();
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState<DreamTheme>('Adventure');
  const [customPrompt, setCustomPrompt] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [duration, setDuration] = useState(20); // Default 20 minutes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    createDream({
      title,
      theme,
      customImages: images,
      visualStyle: customPrompt,
      duration
    });
    
    navigate('/dashboard');
  };

  const handleImageUpload = (imageUrl: string) => {
    setImages([...images, imageUrl]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>Create Your Dreamscape Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Dreamscape Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Perfect Dreamscape"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Dreamscape Theme</Label>
              <RadioGroup
                value={theme}
                onValueChange={(value) => setTheme(value as DreamTheme)}
                className="grid grid-cols-2 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Adventure" id="adventure" />
                  <Label htmlFor="adventure">Adventure</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Tranquility" id="tranquility" />
                  <Label htmlFor="tranquility">Tranquility</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Romance" id="romance" />
                  <Label htmlFor="romance">Romance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Fantasy" id="fantasy" />
                  <Label htmlFor="fantasy">Fantasy</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customPrompt">Custom Description</Label>
              <Textarea
                id="customPrompt"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Describe your dreamscape in detail..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Inspiration Images</Label>
              <ImageUploader onImageUpload={handleImageUpload} />
              
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={img} 
                        alt={`Inspiration ${index}`} 
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min={5}
                max={60}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>

            <Button type="submit" className="w-full">
              <Save className="mr-2 h-4 w-4" /> Create Dreamscape
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DreamCreator;
