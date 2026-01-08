import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ 
  src, 
  alt, 
  className = '', 
  containerClassName = '',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative  overflow-hidden bg-stone/20 w-full h-full ${containerClassName}`}>
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-stone/30 animate-pulse z-10" />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone/10 text-stone/40 p-4 text-center z-20">
           <ImageOff className="w-8 h-8 mb-2 opacity-50" />
           <span className="text-xs uppercase tracking-widest">Image Unavailable</span>
        </div>
      )}
      
      {!hasError && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-contain  transition-all duration-1000 ease-out will-change-transform ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } ${className}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};