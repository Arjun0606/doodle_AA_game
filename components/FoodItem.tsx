'use client';

import { motion } from 'framer-motion';

interface FoodItemProps {
  type: string;
  emoji: string;
  onDragStart: (type: string) => void;
  onDragEnd: () => void;
}

export default function FoodItem({ type, emoji, onDragStart, onDragEnd }: FoodItemProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart(type);
  };

  const handleDragEnd = () => {
    onDragEnd();
  };

  return (
    <motion.div
      className="cursor-grab active:cursor-grabbing"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="w-16 h-16 bg-white rounded-2xl border-4 border-black flex items-center justify-center text-4xl shadow-lg doodle-outline hover:shadow-xl transition-shadow"
      >
        {emoji}
      </div>
    </motion.div>
  );
}

