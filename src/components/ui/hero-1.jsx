import React from 'react';

const GlowHero = ({ 
  label, 
  glowText, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {label && (
        <div className="text-xl md:text-2xl font-semibold mb-4 text-center text-[#86868b] tracking-tight">
          {label} 
        </div>
      )}
      <div className="text-4xl md:text-6xl lg:text-[5rem] font-bold text-center tracking-tight leading-[1.05]">
        <span 
          style={{ 
            background: 'linear-gradient(90deg, #00cfff, #a600ff, #ff006e, #ff8800)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 8s ease-in-out infinite'
          }}
        >
          {glowText}
        </span>
      </div>
      
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default GlowHero;
