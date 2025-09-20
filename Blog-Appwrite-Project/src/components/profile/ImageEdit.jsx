import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/common/Button';
import { Loader2 } from 'lucide-react';

const ImageEdit = ({
  isOwner,
  onSave,
  children,
  className = '',
  overlayClassName = '',
}) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      toast.error('File is too large. Max 2MB.');
      return;
    }

    setIsLoading(true);
    try {
      await onSave(file);
      toast.success('Image updated!');
    } catch (error) {
      toast.error(error.message || 'Failed to upload image.');
    } finally {
      setIsLoading(false);
      // Reset file input to allow re-uploading the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    if (isOwner && !isLoading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`relative group ${isOwner ? 'cursor-pointer' : ''} ${className}`}
      onClick={handleClick}
    >
      {children}
      {isOwner && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
            disabled={isLoading}
          />
          <div
            className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center ${overlayClassName}`}
          >
            {isLoading ? (
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            ) : (
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                <span>Change</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageEdit;