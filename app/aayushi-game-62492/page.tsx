'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Room {
  id: number;
  bg: string;
  name: string;
  pets: { type: 'cat' | 'dog'; sprite: string; x: number; y: number }[];
  items: { type: string; image: string; x: number; y: number; task?: string }[];
}

const ROOMS: Room[] = [
  {
    id: 1,
    bg: '/rooms/room1.png',
    name: 'Pink Cozy Room',
    pets: [
      { type: 'cat', sprite: '/sprites/cats/cat-pink.png', x: 45, y: 35 }
    ],
    items: [
      { type: 'bowl', image: '/items/bowl.png', x: 25, y: 20, task: 'feed' },
      { type: 'bed', image: '/items/bed-pink.png', x: 60, y: 15, task: 'sleep' },
      { type: 'ball', image: '/items/ball-blue.gif', x: 75, y: 25, task: 'play' }
    ]
  },
  {
    id: 2,
    bg: '/rooms/room2.png',
    name: 'Blue Play Room',
    pets: [
      { type: 'dog', sprite: '/sprites/dogs/dog-idle.png', x: 50, y: 30 },
      { type: 'cat', sprite: '/sprites/cats/cat-blue.png', x: 30, y: 35 }
    ],
    items: [
      { type: 'toy', image: '/items/mouse-toy.gif', x: 70, y: 25, task: 'play' },
      { type: 'bowl', image: '/items/bowls.png', x: 20, y: 15, task: 'feed' }
    ]
  },
  {
    id: 3,
    bg: '/rooms/room3.png',
    name: 'Purple Cat Tower',
    pets: [
      { type: 'cat', sprite: '/sprites/cats/cat-yellow.png', x: 55, y: 40 },
      { type: 'cat', sprite: '/sprites/cats/cat-pink.png', x: 35, y: 20 }
    ],
    items: [
      { type: 'bed', image: '/items/bed-blue.png', x: 25, y: 18, task: 'cuddle' },
      { type: 'ball', image: '/items/ball-blue.gif', x: 65, y: 22, task: 'play' }
    ]
  }
];

export default function AayushisWorld() {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [interactedItems, setInteractedItems] = useState<Set<string>>(new Set());

  const room = ROOMS[currentRoom];

  const handleItemClick = (itemKey: string) => {
    if (!interactedItems.has(itemKey)) {
      setInteractedItems(new Set(interactedItems).add(itemKey));
      setTasksCompleted(prev => prev + 1);
      setCelebrationActive(true);
      
      setTimeout(() => {
        setCelebrationActive(false);
        setShowMessage(true);
      }, 1500);
    }
  };

  const nextRoom = () => {
    if (currentRoom < ROOMS.length - 1) {
      setCurrentRoom(currentRoom + 1);
    }
  };

  const prevRoom = () => {
    if (currentRoom > 0) {
      setCurrentRoom(currentRoom - 1);
    }
  };

  const resetGame = () => {
    setCurrentRoom(0);
    setTasksCompleted(0);
    setInteractedItems(new Set());
    setShowMessage(false);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-gradient-to-b from-sky-400 via-sky-300 to-green-300">
      
      {/* Room Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={room.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <Image
            src={room.bg}
            alt={room.name}
            fill
            className="object-cover pixelated"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Celebration Confetti */}
      {celebrationActive && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{ 
                x: typeof window !== 'undefined' ? window.innerWidth / 2 : 200, 
                y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
                scale: 0 
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                scale: [0, 1.5, 0],
                rotate: Math.random() * 720
              }}
              transition={{ duration: 2, delay: i * 0.03 }}
            >
              {['💖', '✨', '🌟', '💫', '💕', '🎉', '⭐', '🎊'][Math.floor(Math.random() * 8)]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Interactive Items in Room */}
      <AnimatePresence>
        {room.items.map((item, idx) => {
          const itemKey = `${room.id}-${idx}`;
          const interacted = interactedItems.has(itemKey);
          
          return (
            <motion.button
              key={itemKey}
              initial={{ scale: 0 }}
              animate={{ 
                scale: interacted ? 0.9 : 1,
                y: interacted ? 0 : [0, -5, 0],
                opacity: interacted ? 0.6 : 1
              }}
              transition={{
                y: { duration: 2, repeat: Infinity, repeatType: 'reverse' },
                scale: { duration: 0.3 }
              }}
              onClick={() => !interacted && handleItemClick(itemKey)}
              disabled={interacted}
              className={`absolute z-30 ${interacted ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95'} transition-transform`}
              style={{
                left: `${item.x}%`,
                bottom: `${item.y}%`,
              }}
            >
              <Image 
                src={item.image} 
                alt={item.type} 
                width={item.type === 'bed' ? 120 : item.type === 'bowl' || item.type === 'bowls' ? 80 : 70}
                height={item.type === 'bed' ? 80 : item.type === 'bowl' || item.type === 'bowls' ? 60 : 70}
                className="pixelated drop-shadow-2xl" 
              />
              {!interacted && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 px-4 py-2 rounded-full text-sm font-bold shadow-lg border-2 border-white"
                >
                  Tap!
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </AnimatePresence>

      {/* Pets in Room */}
      {room.pets.map((pet, idx) => (
        <motion.div
          key={`${room.id}-pet-${idx}`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
            y: celebrationActive ? [0, -15, 0] : [0, -3, 0]
          }}
          transition={{
            scale: { duration: 0.5 },
            rotate: { duration: 0.5 },
            y: { duration: celebrationActive ? 0.5 : 2, repeat: Infinity, repeatType: 'reverse' }
          }}
          className="absolute z-20"
          style={{
            left: `${pet.x}%`,
            bottom: `${pet.y}%`,
          }}
        >
          <Image
            src={pet.sprite}
            alt={pet.type}
            width={pet.type === 'dog' ? 100 : 85}
            height={pet.type === 'dog' ? 100 : 85}
            className="pixelated drop-shadow-2xl"
          />
        </motion.div>
      ))}

      {/* Navigation Arrows */}
      {currentRoom > 0 && (
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevRoom}
          className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40 bg-white/90 hover:bg-white p-6 rounded-full shadow-2xl border-4 border-purple-500"
        >
          <span className="text-5xl">←</span>
        </motion.button>
      )}

      {currentRoom < ROOMS.length - 1 && (
        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextRoom}
          className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 bg-white/90 hover:bg-white p-6 rounded-full shadow-2xl border-4 border-purple-500"
        >
          <span className="text-5xl">→</span>
        </motion.button>
      )}

      {/* Top UI Bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-purple-600 to-purple-500 px-6 py-4 flex items-center justify-between border-b-4 border-white shadow-xl">
        <div className="text-white cartoon-font text-xl md:text-2xl font-bold" style={{ textShadow: '2px 2px 0 #000' }}>
          {room.name}
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-yellow-300 px-6 py-3 rounded-full border-3 border-white shadow-lg cartoon-font text-lg md:text-xl font-bold text-purple-900">
            Room {currentRoom + 1}/{ROOMS.length}
          </div>
          <div className="bg-pink-400 px-6 py-3 rounded-full border-3 border-white shadow-lg cartoon-font text-lg md:text-xl font-bold text-white" style={{ textShadow: '1px 1px 0 #000' }}>
            {tasksCompleted} Tasks ✨
          </div>
        </div>
      </div>

      {/* Bottom Instructions */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 bg-white/95 px-8 py-4 rounded-full shadow-2xl border-4 border-purple-500">
        <p className="cartoon-font text-lg md:text-xl text-purple-900 font-bold">
          Tap items to interact! 🎮
        </p>
      </div>

      {/* Reset Button */}
      {tasksCompleted >= 3 && (
        <motion.button
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-8 py-4 rounded-full border-4 border-white shadow-2xl cartoon-font text-xl font-bold"
          style={{ textShadow: '2px 2px 0 #000' }}
        >
          🔄 Reset Game
        </motion.button>
      )}

      {/* Message Modal */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            onClick={() => setShowMessage(false)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-lg"
            />

            <motion.div
              initial={{ scale: 0, rotate: -15, y: 100 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0, rotate: 15, y: -100 }}
              transition={{ type: 'spring', damping: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-3xl border-8 border-purple-700 p-8 md:p-12 max-w-2xl w-full shadow-2xl"
            >
              <button
                onClick={() => setShowMessage(false)}
                className="absolute top-4 right-4 w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full text-white text-3xl flex items-center justify-center border-4 border-white shadow-lg transition-transform active:scale-90"
              >
                ×
              </button>

              <motion.div 
                animate={{ rotate: [0, 10, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-8 -left-8 text-6xl drop-shadow-2xl"
              >
                🕊️
              </motion.div>

              <div className="space-y-6 text-center">
                <h2 className="text-3xl md:text-4xl cartoon-font text-purple-900 font-bold">
                  Hey Aayushi! 🕊️
                </h2>

                <div className="space-y-4">
                  <p className="text-xl md:text-2xl leading-relaxed text-purple-800 cartoon-font">
                    Fun fact: you're the <span className="text-pink-600 font-bold">silliest, most adorable girl</span> in the world.
                  </p>
                  
                  <p className="text-xl md:text-2xl leading-relaxed text-purple-800 cartoon-font">
                    I care for you <span className="text-red-600 font-bold italic">very deeply.</span>
                  </p>
                  
                  <p className="text-xl md:text-2xl leading-relaxed text-purple-800 cartoon-font">
                    And I'm <span className="text-yellow-600 font-bold">always here for you</span> 💛
                  </p>
                </div>

                <div className="pt-6 border-t-4 border-dashed border-purple-300">
                  <p className="text-lg md:text-xl cartoon-font text-purple-700">
                    — instagram: <span className="font-bold">capedpotato</span>
                  </p>
                  <p className="text-lg md:text-xl cartoon-font text-purple-700">
                    ph. <span className="font-bold">9403783265</span>
                  </p>
                  <p className="text-base md:text-lg text-purple-600 mt-3 cartoon-font italic">
                    if you wanna reach out 💕
                  </p>
                </div>
              </div>

              <p className="text-center text-sm cartoon-font text-purple-500 mt-6">
                Tap X to close 💫
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
