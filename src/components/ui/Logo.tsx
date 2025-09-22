import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', animated = true }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const LogoIcon = () => (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeClasses[size]} ${className}`}
      fill="currentColor"
    >
      {/* Head silhouette */}
      <path
        d="M20 30 Q20 15 35 15 Q50 10 65 15 Q80 15 80 30 Q80 45 75 60 Q75 75 70 85 Q65 90 50 90 Q35 90 30 85 Q25 75 25 60 Q20 45 20 30 Z"
        fill="currentColor"
        opacity="0.9"
      />
      
      {/* Brain/neural network pattern */}
      <g opacity="0.7">
        {/* Concentric rings in head */}
        <ellipse cx="50" cy="40" rx="15" ry="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="50" cy="40" rx="10" ry="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="50" cy="40" rx="5" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
        
        {/* Neural network lines */}
        <path
          d="M30 35 Q40 25 50 30 Q60 25 70 35"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M25 50 Q35 40 45 45 Q55 40 65 50 Q70 55 75 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M30 60 Q40 55 50 60 Q60 55 70 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Connection dots */}
        <circle cx="50" cy="40" r="2" fill="currentColor"/>
        <circle cx="40" cy="35" r="1.5" fill="currentColor"/>
        <circle cx="60" cy="35" r="1.5" fill="currentColor"/>
        <circle cx="45" cy="45" r="1.5" fill="currentColor"/>
        <circle cx="55" cy="45" r="1.5" fill="currentColor"/>
        <circle cx="50" cy="60" r="1.5" fill="currentColor"/>
      </g>
    </svg>
  );

  if (animated) {
    return (
      <motion.div
        variants={logoVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="inline-block"
      >
        <LogoIcon />
      </motion.div>
    );
  }

  return <LogoIcon />;
};

export default Logo;
