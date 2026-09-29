import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0A2E6E] via-[#123E8A] to-[#0F172A] text-white p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Building2 className="w-10 h-10 text-amber-400 mb-3 opacity-90" />
        <p className="text-sm font-semibold tracking-tight text-white max-w-xs">
          {fallbackTitle || alt}
        </p>
        <p className="text-xs text-blue-200 mt-1">
          Shree Tana Technical Consultancy · Architectural Visualization
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
