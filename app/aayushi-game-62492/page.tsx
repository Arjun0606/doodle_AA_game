'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Animal from '@/components/Animal';
import FoodItem from '@/components/FoodItem';
import Bird from '@/components/Bird';
import MessageNote from '@/components/MessageNote';

type AnimalType = 'cat' | 'bunny' | 'frog' | 'bear';

interface AnimalState {
  id: AnimalType;
  fullness: number;
  hasBurped: boolean;
  hasPooped: boolean;
}

const FULLNESS_PER_FOOD = 25;

export default function GamePage() {
  const [animals, setAnimals] = useState<AnimalState[]>([
    { id: 'cat', fullness: 0, hasBurped: false, hasPooped: false },
    { id: 'bunny', fullness: 0, hasBurped: false, hasPooped: false },
    { id: 'frog', fullness: 0, hasBurped: false, hasPooped: false },
    { id: 'bear', fullness: 0, hasBurped: false, hasPooped: false },
  ]);

  const [showBird, setShowBird] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [draggedFood, setDraggedFood] = useState<string | null>(null);

  const allFed = animals.every(a => a.fullness >= 100);

  useEffect(() => {
    if (allFed && !showBird) {
      setTimeout(() => setShowBird(true), 500);
      setTimeout(() => setShowMessage(true), 2500);
      setTimeout(() => setShowReset(true), 4000);
    }
  }, [allFed, showBird]);

  // Random reminder system removed per user request

  const feedAnimal = (animalId: AnimalType) => {
    setAnimals(prev =>
      prev.map(animal =>
        animal.id === animalId && animal.fullness < 100
          ? {
              ...animal,
              fullness: Math.min(100, animal.fullness + FULLNESS_PER_FOOD),
              hasBurped: Math.min(100, animal.fullness + FULLNESS_PER_FOOD) >= 100,
            }
          : animal
      )
    );
  };

  const handleReset = () => {
    setAnimals(prev =>
      prev.map(animal => ({
        ...animal,
        fullness: 0,
        hasBurped: false,
        hasPooped: true,
      }))
    );
    
    setTimeout(() => {
      setAnimals(prev =>
        prev.map(animal => ({
          ...animal,
          hasPooped: false,
        }))
      );
    }, 1500);

    setShowBird(false);
    setShowMessage(false);
    setShowReset(false);
  };

  const handleDragStart = (foodType: string) => {
    setDraggedFood(foodType);
  };

  const handleDragEnd = () => {
    setDraggedFood(null);
  };

  return (
    <div className="min-h-screen w-full bg-doodle-cream overflow-hidden relative">
      {/* Doodle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl opacity-20">☁️</div>
        <div className="absolute top-20 right-20 text-4xl opacity-20">☁️</div>
        <div className="absolute bottom-20 left-20 text-4xl opacity-20">🌿</div>
        <div className="absolute bottom-20 right-20 text-4xl opacity-20">🌿</div>
      </div>

      {/* Title */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center pt-8 pb-4"
      >
        <h1 className="text-3xl font-bold text-gray-800 doodle-outline">
          Feed the Doodle Animals! 🐾
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Drag food to feed the cute creatures
        </p>
      </motion.div>

      {/* Animals Grid */}
      <div className="grid grid-cols-2 gap-6 max-w-md mx-auto px-6 py-8">
        {animals.map((animal) => (
          <Animal
            key={animal.id}
            type={animal.id}
            fullness={animal.fullness}
            hasBurped={animal.hasBurped}
            hasPooped={animal.hasPooped}
            onFeed={() => feedAnimal(animal.id)}
            isDraggingFood={draggedFood !== null}
          />
        ))}
      </div>

      {/* Food Items */}
      {!allFed && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
          <FoodItem
            type="cookie"
            emoji="🍪"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
          <FoodItem
            type="strawberry"
            emoji="🍓"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
          <FoodItem
            type="cupcake"
            emoji="🧁"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        </div>
      )}

      {/* Bird Animation */}
      <AnimatePresence>
        {showBird && <Bird />}
      </AnimatePresence>

      {/* Message Note */}
      <AnimatePresence>
        {showMessage && <MessageNote />}
      </AnimatePresence>

      {/* Reset Button */}
      <AnimatePresence>
        {showReset && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={handleReset}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-doodle-pink text-gray-800 font-bold py-3 px-6 rounded-full border-4 border-black shadow-lg hover:scale-110 transition-transform"
          >
            Reset & Play Again! 🔄
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

