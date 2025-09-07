import React from 'react';
import { motion } from 'framer-motion';

const WalkingAnimation = () => {
  return (
    <div className="relative w-32 h-32 mx-auto">
      <motion.svg
        width="128"
        height="128"
        viewBox="0 0 128 128"
        className="text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Body */}
        <motion.ellipse
          cx="64"
          cy="45"
          rx="8"
          ry="20"
          fill="currentColor"
          animate={{
            scaleY: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Head */}
        <motion.circle
          cx="64"
          cy="25"
          r="8"
          fill="currentColor"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Left Arm */}
        <motion.line
          x1="56"
          y1="35"
          x2="48"
          y2="50"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            rotate: [0, 20, -20, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "56px 35px" }}
        />
        
        {/* Right Arm */}
        <motion.line
          x1="72"
          y1="35"
          x2="80"
          y2="50"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            rotate: [0, -20, 20, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "72px 35px" }}
        />
        
        {/* Left Leg */}
        <motion.line
          x1="60"
          y1="65"
          x2="55"
          y2="85"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "60px 65px" }}
        />
        
        {/* Right Leg */}
        <motion.line
          x1="68"
          y1="65"
          x2="73"
          y2="85"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{
            rotate: [0, -15, 15, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "68px 65px" }}
        />
        
        {/* Left Foot */}
        <motion.ellipse
          cx="53"
          cy="88"
          rx="4"
          ry="2"
          fill="currentColor"
          animate={{
            scaleX: [1, 1.2, 1],
            y: [0, 2, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Right Foot */}
        <motion.ellipse
          cx="75"
          cy="88"
          rx="4"
          ry="2"
          fill="currentColor"
          animate={{
            scaleX: [1, 1.2, 1],
            y: [0, 2, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.75
          }}
        />
      </motion.svg>
      {/* Walking path indicator */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="flex space-x-2">
          {[...Array(5)]?.map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-accent rounded-full"
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default WalkingAnimation;