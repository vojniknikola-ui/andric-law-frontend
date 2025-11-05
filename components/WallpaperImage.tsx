import React, { useState } from 'react';

interface WallpaperImageProps {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const WallpaperImage: React.FC<WallpaperImageProps> = ({ 
  name, 
  alt, 
  className = '',
  priority = false 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const basePath = '/images/wallpapers/optimized';
  
  const srcSet = `
    ${basePath}/small/${name}-small.webp 640w,
    ${basePath}/medium/${name}-medium.webp 1024w,
    ${basePath}/large/${name}-large.webp 1920w,
    ${basePath}/xlarge/${name}-xlarge.webp 2560w
  `;
  
  const sizes = '100vw';
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900 to-brand-700 animate-pulse" />
      )}
      <img
        src={`${basePath}/large/${name}-large.webp`}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
