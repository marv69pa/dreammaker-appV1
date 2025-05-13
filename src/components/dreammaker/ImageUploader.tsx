import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  // In a real app, this would upload to a storage service
  // For this demo, we'll simulate uploading and return a placeholder
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file',
        variant: 'destructive'
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB',
        variant: 'destructive'
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      // Create a local URL for the file
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
      setIsUploading(false);
      
      toast({
        title: 'Image uploaded',
        description: 'Your inspiration image has been added'
      });
      
      // Reset the input
      e.target.value = '';
    }, 1500);
  };
  
  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
        disabled={isUploading}
      />
      <label htmlFor="image-upload" className="w-full">
        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
          disabled={isUploading}
          asChild
        >
          <span>
            {isUploading ? (
              <>
                <span className="animate-spin mr-2">⏳</span> Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Upload Image
              </>
            )}
          </span>
        </Button>
      </label>
    </div>
  );
};
