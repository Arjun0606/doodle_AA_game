'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AnimalProps {
  type: 'cat' | 'bunny' | 'frog' | 'bear';
  fullness: number;
  hasBurped: boolean;
  hasPooped: boolean;
  onFeed: () => void;
  isDraggingFood: boolean;
}

const animalColors = {
  cat: '#FFB6D9',
  bunny: '#D5AAFF',
  frog: '#B4F1A8',
  bear: '#FFE17B',
};

const animalEmojis = {
  cat: '🐱',
  bunny: '🐰',
  frog: '🐸',
  bear: '🐻',
};

export default function Animal({
  type,
  fullness,
  hasBurped,
  hasPooped,
  onFeed,
  isDraggingFood,
}: AnimalProps) {
  const [showBurp, setShowBurp] = useState(false);
  const [showPoop, setShowPoop] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isEating, setIsEating] = useState(false);

  useEffect(() => {
    if (hasBurped && !showBurp) {
      setShowBurp(true);
      setShowThankYou(true);
      setTimeout(() => setShowBurp(false), 2000);
      setTimeout(() => setShowThankYou(false), 3000);
    }
  }, [hasBurped, showBurp]);

  useEffect(() => {
    if (hasPooped) {
      setShowPoop(true);
      setTimeout(() => setShowPoop(false), 1500);
    }
  }, [hasPooped]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (fullness < 100) {
      setIsEating(true);
      onFeed();
      setTimeout(() => setIsEating(false), 500);
    }
  };

  const handleClick = () => {
    if (isDraggingFood && fullness < 100) {
      setIsEating(true);
      onFeed();
      setTimeout(() => setIsEating(false), 500);
    }
  };

  const scale = 1 + (fullness / 100) * 0.8; // Grows up to 1.8x size

  return (
    <motion.div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      className="relative flex flex-col items-center"
      whileHover={fullness < 100 && isDraggingFood ? { scale: 1.05 } : {}}
    >
      {/* Animal Body - SVG Doodle Style */}
      <motion.div
        animate={{
          scale: isEating ? [1, 1.1, scale] : scale,
          rotate: isEating ? [0, -5, 5, 0] : 0,
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="doodle-outline"
        >
          {/* Body */}
          <ellipse
            cx="60"
            cy="70"
            rx={35 + fullness * 0.15}
            ry={40 + fullness * 0.2}
            fill={animalColors[type]}
            stroke="#000"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Head */}
          <circle
            cx="60"
            cy="35"
            r={25 + fullness * 0.1}
            fill={animalColors[type]}
            stroke="#000"
            strokeWidth="3"
          />
          
          {/* Eyes */}
          <circle cx="52" cy="32" r="4" fill="#000" />
          <circle cx="68" cy="32" r="4" fill="#000" />
          
          {/* Mouth */}
          <path
            d={fullness >= 100 ? "M 50 42 Q 60 50 70 42" : "M 50 42 Q 60 48 70 42"}
            stroke="#000"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Ears/Features based on type */}
          {type === 'cat' && (
            <>
              <path d="M 40 25 L 35 10 L 45 20" fill={animalColors[type]} stroke="#000" strokeWidth="2" />
              <path d="M 80 25 L 85 10 L 75 20" fill={animalColors[type]} stroke="#000" strokeWidth="2" />
            </>
          )}
          {type === 'bunny' && (
            <>
              <ellipse cx="45" cy="10" rx="8" ry="20" fill={animalColors[type]} stroke="#000" strokeWidth="2" />
              <ellipse cx="75" cy="10" rx="8" ry="20" fill={animalColors[type]} stroke="#000" strokeWidth="2" />
            </>
          )}
          {type === 'bear' && (
            <>
              <circle cx="40" cy="20" r="10" fill={animalColors[type]} stroke="#000" strokeWidth="2" />
              <circle cx="80" cy="20" r="10" fill={animalColors[type]} stroke="#000" strokeWidth="2" />
            </>
          )}
          
          {/* Legs */}
          <rect x="40" y="95" width="12" height="20" rx="6" fill={animalColors[type]} stroke="#000" strokeWidth="2" />
          <rect x="68" y="95" width="12" height="20" rx="6" fill={animalColors[type]} stroke="#000" strokeWidth="2" />
        </svg>

        {/* Emoji overlay for extra cuteness */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl opacity-30 pointer-events-none">
          {animalEmojis[type]}
        </div>
      </motion.div>

      {/* Fullness Bar */}
      <div className="w-full max-w-[100px] h-2 bg-gray-300 rounded-full mt-2 border-2 border-black overflow-hidden">
        <motion.div
          className="h-full bg-green-400"
          initial={{ width: 0 }}
          animate={{ width: `${fullness}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Burp Animation */}
      <AnimatePresence>
        {showBurp && (
          <motion.div
            initial={{ scale: 0, y: 0 }}
            animate={{ scale: 1.5, y: -40 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-0 text-3xl"
          >
            💨
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thank You Message */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ scale: 0, y: 0, opacity: 0 }}
            animate={{ scale: 1, y: -50, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-0 bg-white px-3 py-1 rounded-full border-2 border-black text-xs font-bold whitespace-nowrap"
          >
            Thank you Aayushi! 💕
          </motion.div>
        )}
      </AnimatePresence>

      {/* Poop Animation */}
      <AnimatePresence>
        {showPoop && (
          <motion.div
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 20 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute bottom-0 text-3xl"
          >
            💩
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

