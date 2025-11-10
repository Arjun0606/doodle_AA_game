'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type TaskType = 'feed' | 'play' | 'clean' | 'cuddle';

interface Task {
  id: TaskType;
  title: string;
  icon: string;
  completed: boolean;
}

export default function AayushisWorld() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'feed', title: 'Feed Cat', icon: '🍖', completed: false },
    { id: 'play', title: 'Play Time', icon: '🎾', completed: false },
    { id: 'clean', title: 'Clean Room', icon: '✨', completed: false },
    { id: 'cuddle', title: 'Cuddle Cat', icon: '💕', completed: false },
  ]);

  const [catPosition, setCatPosition] = useState({ x: 50, y: 70 });
  const [catWalking, setCatWalking] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [letterPosition, setLetterPosition] = useState({ x: 50, y: 60 });

  const completeTask = (taskId: TaskType) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, completed: true } : t
      ));

      // Cat walks to center and delivers letter
      setCatWalking(true);
      setCatPosition({ x: 45, y: 65 });
      
      setTimeout(() => {
        setCatWalking(false);
        setLetterPosition({ x: 50, y: 55 });
        setShowLetter(true);
      }, 1500);

      setMenuOpen(false);
    }
  };

  const openLetter = () => {
    setShowLetter(false);
    setShowMessage(true);
  };

  const closeMessage = () => {
    setShowMessage(false);
    // Cat walks back
    setCatWalking(true);
    setCatPosition({ x: Math.random() * 60 + 20, y: Math.random() * 20 + 60 });
    setTimeout(() => setCatWalking(false), 1000);
  };

  const allCompleted = tasks.every(t => t.completed);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-gradient-to-b from-sky-300 via-pink-200 to-yellow-100">
      
      {/* Game World - Full Screen */}
      <div className="relative w-full h-full">
        
        {/* Background Room */}
        <div className="absolute inset-0">
          <Image
            src="/cafe/backgrounds/cafe.png"
            alt="room"
            fill
            className="object-cover pixelated opacity-60"
          />
        </div>

        {/* Ground/Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-900/40 to-transparent" />

        {/* Animated Cat */}
        <motion.div
          className="absolute z-20"
          animate={{
            left: `${catPosition.x}%`,
            bottom: `${catPosition.y}%`,
          }}
          transition={{ duration: catWalking ? 1.5 : 0, ease: 'easeInOut' }}
        >
          <motion.div
            className={catWalking ? 'bounce-walk' : ''}
            animate={{
              scaleX: catWalking && catPosition.x > 45 ? -1 : 1,
            }}
          >
            <Image
              src="/cafe/cats/cat1.png"
              alt="cat"
              width={100}
              height={100}
              className="pixelated drop-shadow-2xl"
            />
          </motion.div>
          
          {/* Speech bubble when letter appears */}
          {showLetter && (
            <motion.div
              initial={{ scale: 0, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="absolute -top-16 -right-4 bg-white rounded-2xl px-4 py-2 border-4 border-black shadow-lg cartoon-font text-sm whitespace-nowrap"
            >
              Tap the letter! 💌
              <div className="absolute -bottom-2 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
            </motion.div>
          )}
        </motion.div>

        {/* Floating Letter */}
        <AnimatePresence>
          {showLetter && (
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                y: [0, -10, 0],
              }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{
                y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }}
              onClick={openLetter}
              className="absolute z-30"
              style={{
                left: `${letterPosition.x}%`,
                top: `${letterPosition.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="text-7xl drop-shadow-2xl filter brightness-110">
                💌
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Other Pets in Background */}
        <motion.div
          className="absolute bottom-24 left-[20%] opacity-80"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Image
            src="/cafe/cats/cat2.png"
            alt="cat2"
            width={80}
            height={80}
            className="pixelated"
          />
        </motion.div>

        <motion.div
          className="absolute bottom-28 right-[25%] opacity-80"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Image
            src="/cafe/cats/bunny.png"
            alt="bunny"
            width={70}
            height={70}
            className="pixelated"
          />
        </motion.div>

        {/* Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="fixed top-4 left-4 z-40 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl border-4 border-black shadow-lg cartoon-font text-lg active:scale-95 transition-transform"
        >
          {menuOpen ? '✕' : '☰'} Tasks
        </button>

        {/* Task Counter */}
        <div className="fixed top-4 right-4 z-40 bg-yellow-400 px-6 py-3 rounded-2xl border-4 border-black shadow-lg cartoon-font text-lg">
          {tasks.filter(t => t.completed).length}/{tasks.length} ✨
        </div>

        {/* Side Menu */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />
              
              {/* Menu Panel */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="fixed left-0 top-0 bottom-0 w-80 bg-gradient-to-b from-purple-400 via-pink-400 to-red-400 border-r-8 border-black shadow-2xl z-50 overflow-y-auto"
              >
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl cartoon-font text-white text-center mb-6 drop-shadow-lg" style={{ textShadow: '3px 3px 0 #000' }}>
                    Tasks for Aayushi
                  </h2>

                  {tasks.map((task, index) => (
                    <motion.button
                      key={task.id}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => completeTask(task.id)}
                      disabled={task.completed}
                      className={`
                        w-full p-5 rounded-2xl border-4 border-black shadow-lg
                        cartoon-font text-lg transition-all active:scale-95
                        ${task.completed 
                          ? 'bg-green-300 text-green-900 opacity-70' 
                          : 'bg-yellow-300 hover:bg-yellow-200 text-purple-900'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-3">
                          <span className="text-3xl">{task.icon}</span>
                          <span>{task.title}</span>
                        </span>
                        {task.completed && <span className="text-2xl">✅</span>}
                      </div>
                    </motion.button>
                  ))}

                  {allCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-8 p-6 bg-white rounded-2xl border-4 border-black text-center"
                    >
                      <p className="cartoon-font text-purple-900 text-xl">
                        All Done! 🎉
                      </p>
                      <p className="text-sm mt-2 text-purple-700">
                        Close menu and wait for your cat friend! 💕
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Message Modal */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={closeMessage}
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
              />

              {/* Letter Content */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 10 }}
                transition={{ type: 'spring', damping: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-3xl border-8 border-purple-600 p-8 max-w-lg w-full shadow-2xl"
                style={{
                  boxShadow: '0 25px 80px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.7)'
                }}
              >
                {/* Close Button */}
                <button
                  onClick={closeMessage}
                  className="absolute top-4 right-4 w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full text-white text-3xl flex items-center justify-center border-4 border-black shadow-lg transition-transform active:scale-90"
                >
                  ×
                </button>

                {/* Decorations */}
                <motion.div 
                  animate={{ rotate: [0, 10, 0] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-8 -left-8 text-6xl drop-shadow-2xl"
                >
                  🕊️
                </motion.div>
                <motion.div 
                  animate={{ rotate: [0, -10, 0] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-8 -right-8 text-6xl drop-shadow-2xl"
                >
                  ✨
                </motion.div>

                {/* Message Content */}
                <div className="space-y-6 text-center">
                  <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl cartoon-font text-purple-900 drop-shadow-lg"
                  >
                    Hey Aayushi! 🕊️
                  </motion.h2>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    <p className="text-xl leading-relaxed text-purple-800 cartoon-font">
                      Fun fact: you're the <span className="text-pink-600 font-bold">silliest, most adorable girl</span> in the world.
                    </p>
                    
                    <p className="text-xl leading-relaxed text-purple-800 cartoon-font">
                      I care for you <span className="text-red-600 font-bold italic">very deeply.</span>
                    </p>
                    
                    <p className="text-xl leading-relaxed text-purple-800 cartoon-font">
                      And I'm <span className="text-yellow-600 font-bold">always here for you</span> 💛
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pt-6 border-t-4 border-dashed border-purple-400"
                  >
                    <p className="text-lg cartoon-font text-purple-700">
                      — instagram: <span className="font-bold">capedpotato</span>
                    </p>
                    <p className="text-lg cartoon-font text-purple-700">
                      ph. <span className="font-bold">9403783265</span>
                    </p>
                    <p className="text-sm text-purple-600 mt-4 italic">
                      if you wanna reach out 💕
                    </p>
                  </motion.div>
                </div>

                {/* Tap hint */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 1, duration: 2, repeat: Infinity }}
                  className="text-center text-sm cartoon-font text-purple-500 mt-6"
                >
                  Tap anywhere to close 💫
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
