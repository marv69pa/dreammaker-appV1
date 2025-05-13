import { DreamTheme } from '@/types';

interface GenerateDreamResponse {
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  status: string;
}

export const generateDreamVideo = async (
  theme: DreamTheme,
  customPrompt?: string,
  images?: string[]
): Promise<GenerateDreamResponse> => {
  try {
    // Mock response for development/testing
    // In a real app, this would call the Supabase function
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    return {
      videoUrl: 'https://d64gsuwffb70l.cloudfront.net/sample-dreamscape-video.mp4',
      thumbnailUrl: 'https://d64gsuwffb70l.cloudfront.net/6821695433db7b1ea4137ef9_1747051831125_9ddf90ee.png',
      duration: 5,
      status: 'completed'
    };
  } catch (error) {
    console.error('Error generating dreamscape video:', error);
    throw error;
  }
};

export const downloadDreamVideo = (videoUrl: string, title: string) => {
  // Create a temporary anchor element
  const a = document.createElement('a');
  a.href = videoUrl;
  a.download = `${title.replace(/\s+/g, '-').toLowerCase()}-dreamscape.mp4`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
