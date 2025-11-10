'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type TaskType = 'serve' | 'clean' | 'pet' | 'restock';

interface Task {
  id: TaskType;
  title: string;
  icon: string;
  completed: boolean;
}

const sweetMessages = [
  {
    title: "Hey Aayushi! 💕",
    message: "Just wanted to remind you that you're absolutely adorable and you make everything better! literally my favourite person 💫"
  },
  {
    title: "Psst, Aayushi! ✨",
    message: "Fun fact: you're the silliest, most precious goofball in the entire world. I care for you very deeply 💛"
  },
  {
    title: "Hi there cutie! 🌟",
    message: "Remember: you're loved, you're amazing, and I'm always here for you no matter what 💖"
  },
  {
    title: "Hey you! 💭",
    message: "You make every day brighter just by being you. Never forget how special you are to me 🌸"
  },
  {
    title: "Special Delivery! 💌",
    message: "Your cafe might run at a loss, but you make MY heart run at full capacity! You're priceless 💝"
  }
];

export default function AayushisCafe() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'serve', title: 'Serve Customer', icon: '☕', completed: false },
    { id: 'clean', title: 'Clean Tables', icon: '🧹', completed: false },
    { id: 'pet', title: 'Pet the Cats', icon: '🐾', completed: false },
    { id: 'restock', title: 'Restock Treats', icon: '🍰', completed: false },
  ]);

  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(sweetMessages[0]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activePets, setActivePets] = useState<number[]>([]);

  const completeTask = (taskId: TaskType) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, completed: true } : t
      ));

      // Show sweet message
      const randomMessage = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
      setCurrentMessage(randomMessage);
      setShowMessage(true);

      // Confetti!
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);

      // Activate pets
      if (taskId === 'pet') {
        setActivePets([0, 1, 2]);
        setTimeout(() => setActivePets([]), 2000);
      }
    }
  };

  const resetTasks = () => {
    setTasks(prev => prev.map(t => ({ ...t, completed: false })));
    setShowMessage(false);
    setActivePets([]);
  };

  const allTasksCompleted = tasks.every(t => t.completed);

  return (
    <>
      {/* Welcome Screen */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-4"
            onClick={() => setShowWelcome(false)}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', damping: 10 }}
              className="text-center"
            >
              {/* Sign Board */}
              <div className="relative">
                <svg width="340" height="240" viewBox="0 0 340 240" className="mx-auto drop-shadow-2xl">
                  {/* Wood sign board */}
                  <rect x="20" y="40" width="300" height="160" rx="10" fill="#8B4513" stroke="#000" strokeWidth="4"/>
                  <rect x="30" y="50" width="280" height="140" rx="8" fill="#D2691E" stroke="#000" strokeWidth="3"/>
                  
                  {/* Pole */}
                  <rect x="155" y="180" width="30" height="60" fill="#654321" stroke="#000" strokeWidth="3"/>
                  
                  {/* Decorative elements */}
                  <circle cx="50" cy="70" r="5" fill="#FFD700"/>
                  <circle cx="290" cy="70" r="5" fill="#FFD700"/>
                  <circle cx="50" cy="170" r="5" fill="#FFD700"/>
                  <circle cx="290" cy="170" r="5" fill="#FFD700"/>
                </svg>
                
                {/* Text on sign */}
                <div className="absolute top-16 left-0 right-0 text-center px-12">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl font-bold text-white drop-shadow-lg mb-2"
                    style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.3)' }}
                  >
                    Welcome to
                  </motion.h1>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-4xl font-bold text-yellow-200 drop-shadow-lg"
                    style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.4)' }}
                  >
                    Aayushi's Cafe
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-xl font-bold text-red-300 mt-2"
                    style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}
                  >
                    (that runs at a loss!)
                  </motion.p>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-8 text-white text-lg font-bold drop-shadow-lg animate-pulse"
              >
                Tap to enter! ☕✨
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Cafe */}
      <div className="min-h-screen w-full bg-gradient-to-b from-amber-100 via-orange-50 to-pink-100 overflow-hidden relative">
        {/* Confetti */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{ x: '50vw', y: '50vh', scale: 0 }}
                animate={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 1.5, delay: i * 0.04 }}
              >
                {['💖', '✨', '🌟', '💫', '💕', '☕', '🍰'][Math.floor(Math.random() * 7)]}
              </motion.div>
            ))}
          </div>
        )}

        {/* Header with Shop Sign */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center pt-6 pb-4"
        >
          {/* Hanging Shop Sign */}
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <div className="relative inline-block">
              <svg width="280" height="100" viewBox="0 0 280 100" className="drop-shadow-lg">
                {/* Chain */}
                <line x1="140" y1="5" x2="140" y2="25" stroke="#666" strokeWidth="3"/>
                <circle cx="140" cy="5" r="4" fill="#888"/>
                
                {/* Sign board */}
                <rect x="40" y="25" width="200" height="65" rx="8" fill="#FF6B9D" stroke="#000" strokeWidth="3"/>
                <rect x="45" y="30" width="190" height="55" rx="6" fill="#FFB6D9" stroke="#000" strokeWidth="2"/>
              </svg>
              
              <div className="absolute top-9 left-0 right-0 text-center">
                <h1 className="text-2xl font-bold text-purple-900" style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.5)' }}>
                  Aayushi's Shop
                </h1>
                <p className="text-xs text-purple-700 mt-1">☕ Cafe & Pet Corner 🐱</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Cafe Interior */}
        <div className="relative max-w-md mx-auto px-4">
          <motion.div 
            className="relative w-full aspect-[3/4] bg-white rounded-3xl border-4 border-amber-600 overflow-hidden shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Background */}
            <div className="absolute inset-0">
              <Image
                src="/cafe/backgrounds/cafe.png"
                alt="cafe"
                fill
                className="object-cover opacity-70 pixelated"
              />
            </div>

            {/* Pets */}
            <div className="absolute inset-0 flex items-end justify-around pb-24 px-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: activePets.includes(i) ? [-10, 0, -10] : 0,
                    rotate: activePets.includes(i) ? [-5, 5, -5, 0] : 0,
                  }}
                  transition={{ duration: 0.5, repeat: activePets.includes(i) ? 2 : 0 }}
                  className="relative"
                >
                  <Image
                    src={`/cafe/cats/${i === 0 ? 'cat1' : i === 1 ? 'cat2' : 'bunny'}.png`}
                    alt="pet"
                    width={70}
                    height={70}
                    className="pixelated drop-shadow-lg"
                  />
                  {activePets.includes(i) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8 }}
                      className="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl"
                    >
                      💕
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Task completion indicators */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              {tasks.find(t => t.id === 'serve')?.completed && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-3xl">
                  ☕
                </motion.div>
              )}
              {tasks.find(t => t.id === 'clean')?.completed && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-3xl">
                  ✨
                </motion.div>
              )}
              {tasks.find(t => t.id === 'restock')?.completed && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-3xl">
                  🍰
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Task Buttons */}
        <div className="max-w-md mx-auto px-4 mt-6 grid grid-cols-2 gap-3">
          {tasks.map((task) => (
            <motion.button
              key={task.id}
              onClick={() => completeTask(task.id)}
              disabled={task.completed}
              className={`
                relative py-4 px-4 rounded-2xl border-4 font-bold text-lg
                transition-all duration-200
                ${task.completed 
                  ? 'bg-green-200 border-green-500 text-green-800 opacity-70' 
                  : 'bg-gradient-to-br from-orange-200 to-pink-200 border-orange-500 text-orange-900 hover:from-orange-300 hover:to-pink-300 active:scale-95 shadow-lg'
                }
              `}
              whileHover={{ scale: task.completed ? 1 : 1.05 }}
              whileTap={{ scale: task.completed ? 1 : 0.95 }}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-3xl">{task.icon}</span>
                <span className="text-sm">{task.title}</span>
                {task.completed && (
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="text-2xl absolute -top-2 -right-2"
                  >
                    ✅
                  </motion.span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Reset Button */}
        {allTasksCompleted && (
          <motion.button
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            onClick={resetTasks}
            className="max-w-md mx-auto mt-6 px-6 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold rounded-full border-4 border-white shadow-2xl block w-11/12 ml-auto mr-auto text-lg"
          >
            Open Again! 🔄 ☕
          </motion.button>
        )}

        {/* Sweet Message Popup */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowMessage(false)}
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-md"
              />

              {/* Note */}
              <motion.div
                initial={{ scale: 0, rotate: -15, y: 100 }}
                animate={{ scale: 1, rotate: 0, y: 0 }}
                exit={{ scale: 0, rotate: 15, y: -100 }}
                transition={{ type: 'spring', damping: 12 }}
                className="relative bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-3xl border-4 border-purple-500 p-8 max-w-sm shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowMessage(false)}
                  className="absolute top-3 right-3 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full text-white font-bold text-2xl flex items-center justify-center shadow-lg border-2 border-white"
                >
                  ×
                </button>

                {/* Decorations */}
                <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-6 -left-6 text-5xl">
                  💌
                </motion.div>
                <motion.div animate={{ rotate: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -bottom-6 -right-6 text-5xl">
                  ✨
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold text-purple-800 text-center">
                    {currentMessage.title}
                  </h2>
                  <p className="text-lg text-purple-700 leading-relaxed text-center">
                    {currentMessage.message}
                  </p>
                  <div className="text-center text-sm text-purple-600 pt-4 border-t-2 border-dashed border-purple-300">
                    <p className="font-bold">— @capedpotato</p>
                    <p>📱 9403783265</p>
                  </div>
                </motion.div>

                {/* Tap to close hint */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 1, duration: 2, repeat: Infinity }}
                  className="text-xs text-purple-500 text-center mt-4"
                >
                  Tap anywhere to close 💕
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="text-center text-sm text-amber-700 mt-8 pb-6 font-medium">
          Made with 💖 for Aayushi (and her cafe that runs at a loss 😄)
        </div>
      </div>
    </>
  );
}
