'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type CatState = 'sleeping' | 'eating' | 'playing' | 'cuddling' | 'bathing';
type TaskId = 'feed' | 'play' | 'pet' | 'bathe';

interface Task {
  id: TaskId;
  label: string;
  catState: CatState;
  icon: string;
}

const TASKS: Task[] = [
  { id: 'feed', label: 'Feed the Cat', catState: 'eating', icon: '🍖' },
  { id: 'play', label: 'Play with Toy', catState: 'playing', icon: '🎾' },
  { id: 'pet', label: 'Pet the Cat', catState: 'cuddling', icon: '💕' },
  { id: 'bathe', label: 'Bathe the Cat', catState: 'bathing', icon: '🛁' },
];

const CAT_SPRITES: Record<CatState, string> = {
  sleeping: '/cat-sprites/sleep.png',
  eating: '/cat-sprites/eating.png',
  playing: '/cat-sprites/excited.png',
  cuddling: '/cat-sprites/laydown.png',
  bathing: '/cat-sprites/sleepy.png',
};

export default function AayushisPetCafe() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [catState, setCatState] = useState<CatState>('sleeping');
  const [completedTasks, setCompletedTasks] = useState<Set<TaskId>>(new Set());
  const [showMessage, setShowMessage] = useState(false);
  const [celebration, setCelebration] = useState(false);

  const handleTaskClick = (task: Task) => {
    if (completedTasks.has(task.id)) return;

    // Mark task complete
    const newCompleted = new Set(completedTasks).add(task.id);
    setCompletedTasks(newCompleted);

    // Change cat state
    setCatState(task.catState);
    setCelebration(true);

    setTimeout(() => setCelebration(false), 2000);

    // If all tasks done, show message after animation
    if (newCompleted.size === TASKS.length) {
      setTimeout(() => {
        setShowMessage(true);
      }, 2500);
    }
  };

  const resetGame = () => {
    setCompletedTasks(new Set());
    setCatState('sleeping');
    setShowMessage(false);
  };

  const enterCafe = () => {
    setShowWelcome(false);
  };

  const allTasksComplete = completedTasks.size === TASKS.length;

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 10 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center border-8 border-purple-600"
        >
          <motion.h1
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl md:text-6xl font-bold text-purple-800 mb-6"
            style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
          >
            Welcome to
          </motion.h1>
          
          <motion.h2
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-4xl md:text-5xl font-bold text-pink-600 mb-4"
            style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
          >
            Aayushi's Pet Cafe
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl text-gray-600 mb-8 italic"
            style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
          >
            (that runs at a loss)
          </motion.p>

          <div className="flex justify-center gap-8 mb-8">
            <motion.span
              animate={{ rotate: [0, 20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-7xl"
            >
              🐱
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="text-7xl"
            >
              💖
            </motion.span>
            <motion.span
              animate={{ rotate: [0, -20, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="text-7xl"
            >
              ☕
            </motion.span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={enterCafe}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-3xl font-bold py-6 px-12 rounded-full shadow-2xl border-4 border-white"
            style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
          >
            Enter Cafe! 🐾
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Main Game
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      
      {/* Room Background */}
      <div className="absolute inset-0">
        <Image
          src="/cat-rooms/room.png"
          alt="cafe room"
          fill
          className="object-cover pixelated"
          priority
        />
      </div>

      {/* Celebration Confetti */}
      {celebration && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-5xl"
              initial={{ 
                x: typeof window !== 'undefined' ? window.innerWidth / 2 : 200, 
                y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
                scale: 0 
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                scale: [0, 2, 0],
                rotate: Math.random() * 720
              }}
              transition={{ duration: 2, delay: i * 0.02 }}
            >
              {['💖', '✨', '🌟', '💫', '💕', '🎉', '⭐', '🎊', '🐾'][Math.floor(Math.random() * 9)]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Animated Cat */}
      <motion.div
        key={catState}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          y: celebration ? [0, -30, 0] : [0, -5, 0]
        }}
        transition={{
          scale: { duration: 0.5 },
          opacity: { duration: 0.5 },
          y: { duration: celebration ? 0.6 : 3, repeat: Infinity, repeatType: 'reverse' }
        }}
        className="absolute bottom-[25%] left-1/2 transform -translate-x-1/2 z-30"
      >
        <Image
          src={CAT_SPRITES[catState]}
          alt="cat"
          width={200}
          height={200}
          className="pixelated drop-shadow-2xl"
        />
      </motion.div>

      {/* Task Buttons */}
      <div className="absolute top-6 left-6 right-6 z-40">
        <div className="bg-white/95 rounded-3xl shadow-2xl p-6 border-4 border-purple-600">
          <h2 
            className="text-3xl font-bold text-purple-800 mb-4 text-center"
            style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
          >
            Tasks for Kitty! 🐱
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {TASKS.map((task) => {
              const completed = completedTasks.has(task.id);
              return (
                <motion.button
                  key={task.id}
                  whileHover={{ scale: completed ? 1 : 1.05 }}
                  whileTap={{ scale: completed ? 1 : 0.95 }}
                  onClick={() => handleTaskClick(task)}
                  disabled={completed}
                  className={`
                    p-5 rounded-2xl font-bold text-xl border-4 shadow-lg transition-all
                    ${completed 
                      ? 'bg-green-400 border-green-600 text-green-900 opacity-70 cursor-default' 
                      : 'bg-gradient-to-br from-yellow-300 to-yellow-400 border-yellow-500 text-purple-900 hover:from-yellow-200 hover:to-yellow-300 cursor-pointer'
                    }
                  `}
                  style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-4xl">{task.icon}</span>
                    <span>{task.label}</span>
                  </div>
                  {completed && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="text-3xl mt-2"
                    >
                      ✅
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="mt-4 text-center">
            <span 
              className="text-2xl font-bold text-purple-700"
              style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
            >
              {completedTasks.size} / {TASKS.length} Complete ⭐
            </span>
          </div>
        </div>
      </div>

      {/* Reset Button (after all tasks complete) */}
      {allTasksComplete && (
        <motion.button
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetGame}
          className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white text-2xl font-bold py-5 px-10 rounded-full shadow-2xl border-4 border-white"
          style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}
        >
          🔄 Play Again!
        </motion.button>
      )}

      {/* Message Modal (ONLY after ALL tasks complete) */}
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
              transition={{ type: 'spring', damping: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-3xl border-8 border-purple-700 p-10 md:p-14 max-w-3xl w-full shadow-2xl"
            >
              <button
                onClick={() => setShowMessage(false)}
                className="absolute top-5 right-5 w-14 h-14 bg-purple-600 hover:bg-purple-700 rounded-full text-white text-4xl flex items-center justify-center border-4 border-white shadow-lg transition-transform active:scale-90"
              >
                ×
              </button>

              <motion.div 
                animate={{ rotate: [0, 10, 0] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-10 -left-10 text-7xl drop-shadow-2xl"
              >
                🕊️
              </motion.div>

              <div className="space-y-6 text-center" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                <h2 className="text-4xl md:text-5xl font-bold text-purple-900">
                  Hey Aayushi! 🕊️
                </h2>

                <div className="space-y-5">
                  <p className="text-2xl md:text-3xl leading-relaxed text-purple-800 font-bold">
                    Fun fact: you're the <span className="text-pink-600">silliest, most adorable girl</span> in the world.
                  </p>
                  
                  <p className="text-2xl md:text-3xl leading-relaxed text-purple-800 font-bold">
                    I care for you <span className="text-red-600 italic">very deeply.</span>
                  </p>
                  
                  <p className="text-2xl md:text-3xl leading-relaxed text-purple-800 font-bold">
                    And I'm <span className="text-yellow-600">always here for you</span> 💛
                  </p>
                </div>

                <div className="pt-6 border-t-4 border-dashed border-purple-300 space-y-3">
                  <p className="text-xl md:text-2xl text-purple-700 font-bold">
                    — instagram: <span className="text-purple-900">capedpotato</span>
                  </p>
                  <p className="text-xl md:text-2xl text-purple-700 font-bold">
                    ph. <span className="text-purple-900">9403783265</span>
                  </p>
                  <p className="text-lg md:text-xl text-purple-600 mt-4 italic">
                    if you wanna reach out 💕
                  </p>
                </div>
              </div>

              <p className="text-center text-base text-purple-500 mt-8" style={{ fontFamily: "'Comic Neue', 'Comic Sans MS', cursive" }}>
                Tap X to close 💫
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
