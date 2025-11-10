'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type TaskType = 'feed' | 'play' | 'clean' | 'cuddle' | 'walk' | 'sleep';

interface Task {
  id: TaskType;
  title: string;
  icon: string;
  completed: boolean;
  reward: string;
}

export default function AayushisWorld() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'feed', title: 'Feed the Pets', icon: '🍖', completed: false, reward: 'bowl' },
    { id: 'play', title: 'Play with Ball', icon: '🎾', completed: false, reward: 'ball' },
    { id: 'clean', title: 'Clean Room', icon: '✨', completed: false, reward: 'sparkle' },
    { id: 'cuddle', title: 'Pet the Cat', icon: '💕', completed: false, reward: 'hearts' },
    { id: 'walk', title: 'Walk the Dog', icon: '🐕', completed: false, reward: 'dog-walk' },
    { id: 'sleep', title: 'Bedtime', icon: '🛏️', completed: false, reward: 'bed' },
  ]);

  const [showMessage, setShowMessage] = useState(false);
  const [catPos, setCatPos] = useState({ x: 30, bottom: 15 });
  const [dogPos, setDogPos] = useState({ x: 60, bottom: 15 });
  const [activePets, setActivePets] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [confetti, setConfetti] = useState(false);

  const completeTask = (taskId: TaskType) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      // Mark complete
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, completed: true } : t
      ));

      // Activate pets
      setActivePets(['cat', 'dog']);
      
      // Show reward item
      setVisibleItems(prev => [...prev, task.reward]);
      
      // Confetti!
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2000);

      // Show message after animation
      setTimeout(() => {
        setShowMessage(true);
        setActivePets([]);
      }, 1500);

      setMenuOpen(false);
    }
  };

  const closeMessage = () => {
    setShowMessage(false);
    // Pets move to random positions
    setCatPos({ x: Math.random() * 50 + 10, bottom: Math.random() * 20 + 10 });
    setDogPos({ x: Math.random() * 50 + 40, bottom: Math.random() * 20 + 10 });
  };

  const resetGame = () => {
    setTasks(prev => prev.map(t => ({ ...t, completed: false })));
    setVisibleItems([]);
    setCatPos({ x: 30, bottom: 15 });
    setDogPos({ x: 60, bottom: 15 });
  };

  const allCompleted = tasks.every(t => t.completed);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
      
      {/* Game World Container */}
      <div className="relative w-full h-full">
        
        {/* Background Room */}
        <div className="absolute inset-0">
          <Image
            src="/rooms/room1.png"
            alt="room"
            fill
            className="object-cover pixelated"
            priority
          />
        </div>

        {/* Floor/Ground indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-900/30 border-t-4 border-amber-800/50" />

        {/* Confetti */}
        {confetti && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  x: typeof window !== 'undefined' ? window.innerWidth / 2 : 200, 
                  y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
                  scale: 0 
                }}
                animate={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  scale: [0, 1, 0],
                  rotate: Math.random() * 720
                }}
                transition={{ duration: 1.5, delay: i * 0.02 }}
              >
                <span className="text-3xl">
                  {['💖', '✨', '🌟', '💫', '💕', '🎉'][Math.floor(Math.random() * 6)]}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Interactive Items */}
        <AnimatePresence>
          {visibleItems.includes('bowl') && (
            <motion.div
              initial={{ scale: 0, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              className="absolute left-[20%] bottom-[25%] z-10"
            >
              <Image src="/items/bowl.png" alt="bowl" width={60} height={40} className="pixelated drop-shadow-2xl" />
            </motion.div>
          )}

          {visibleItems.includes('ball') && (
            <motion.div
              initial={{ scale: 0, x: -100 }}
              animate={{ 
                scale: 1, 
                x: 0,
                rotate: [0, 360]
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: 'linear' }
              }}
              className="absolute right-[25%] bottom-[30%] z-10"
            >
              <Image src="/items/ball-blue.gif" alt="ball" width={50} height={50} className="pixelated drop-shadow-2xl" />
            </motion.div>
          )}

          {visibleItems.includes('bed') && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute left-[15%] bottom-[15%] z-5"
            >
              <Image src="/items/bed-pink.png" alt="bed" width={100} height={60} className="pixelated drop-shadow-2xl" />
            </motion.div>
          )}

          {visibleItems.includes('sparkle') && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [0, -30]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="absolute z-20"
                  style={{
                    left: `${20 + i * 15}%`,
                    bottom: `${40 + i * 5}%`
                  }}
                >
                  <span className="text-4xl">✨</span>
                </motion.div>
              ))}
            </>
          )}

          {visibleItems.includes('hearts') && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1, 1],
                    y: [-20, -60],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                  className="absolute z-20"
                  style={{
                    left: `${catPos.x + 5}%`,
                    bottom: `${catPos.bottom + 15}%`
                  }}
                >
                  <span className="text-3xl">💕</span>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Animated Cat */}
        <motion.div
          className="absolute z-20"
          animate={{
            left: `${catPos.x}%`,
            bottom: `${catPos.bottom}%`,
          }}
          transition={{ duration: activePets.includes('cat') ? 1 : 0.5 }}
        >
          <motion.div
            animate={{
              y: activePets.includes('cat') ? [0, -10, 0] : 0,
              rotate: activePets.includes('cat') ? [-5, 5, -5, 0] : 0,
            }}
            transition={{ 
              duration: 0.6, 
              repeat: activePets.includes('cat') ? 3 : 0 
            }}
          >
            <Image
              src="/sprites/cats/cat-pink.png"
              alt="cat"
              width={80}
              height={80}
              className="pixelated drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Animated Dog */}
        <motion.div
          className="absolute z-20"
          animate={{
            left: `${dogPos.x}%`,
            bottom: `${dogPos.bottom}%`,
          }}
          transition={{ duration: activePets.includes('dog') ? 1.5 : 0.5 }}
        >
          <motion.div
            animate={{
              y: activePets.includes('dog') ? [0, -8, 0] : 0,
              scaleX: activePets.includes('dog') && visibleItems.includes('dog-walk') ? [-1, -1] : 1,
            }}
            transition={{ 
              duration: 0.5, 
              repeat: activePets.includes('dog') ? 4 : 0 
            }}
          >
            <Image
              src="/sprites/dogs/dog-idle.png"
              alt="dog"
              width={90}
              height={90}
              className="pixelated drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Menu Button */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-6 left-6 z-40 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl border-4 border-white shadow-2xl cartoon-font text-xl"
          style={{ textShadow: '2px 2px 0 #000' }}
        >
          {menuOpen ? '✕ Close' : '☰ Tasks'}
        </motion.button>

        {/* Progress Counter */}
        <div className="fixed top-6 right-6 z-40 bg-gradient-to-r from-yellow-400 to-orange-400 px-8 py-4 rounded-2xl border-4 border-white shadow-2xl cartoon-font text-xl text-white"
          style={{ textShadow: '2px 2px 0 #000' }}
        >
          {tasks.filter(t => t.completed).length}/{tasks.length} ⭐
        </div>

        {/* Side Menu */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              />
              
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 20 }}
                className="fixed left-0 top-0 bottom-0 w-96 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 border-r-8 border-white shadow-2xl z-50 overflow-y-auto"
              >
                <div className="p-8 space-y-4">
                  <h2 className="text-3xl cartoon-font text-white text-center mb-8" style={{ textShadow: '3px 3px 0 #000' }}>
                    Tasks 🎮
                  </h2>

                  {tasks.map((task, i) => (
                    <motion.button
                      key={task.id}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.08 }}
                      onClick={() => completeTask(task.id)}
                      disabled={task.completed}
                      whileHover={{ scale: task.completed ? 1 : 1.02 }}
                      whileTap={{ scale: task.completed ? 1 : 0.98 }}
                      className={`
                        w-full p-6 rounded-2xl border-4 shadow-lg
                        cartoon-font text-xl transition-all
                        ${task.completed 
                          ? 'bg-green-400 border-green-600 text-green-900 opacity-70' 
                          : 'bg-yellow-300 hover:bg-yellow-200 border-yellow-500 text-purple-900 active:bg-yellow-400'
                        }
                      `}
                      style={{ textShadow: task.completed ? 'none' : '1px 1px 0 rgba(0,0,0,0.1)' }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-4">
                          <span className="text-4xl">{task.icon}</span>
                          <span>{task.title}</span>
                        </span>
                        {task.completed && (
                          <motion.span 
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="text-3xl"
                          >
                            ✅
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  ))}

                  {allCompleted && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={resetGame}
                      className="w-full mt-8 p-6 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 rounded-2xl border-4 border-white text-white cartoon-font text-xl shadow-2xl"
                      style={{ textShadow: '2px 2px 0 #000' }}
                    >
                      🔄 Play Again!
                    </motion.button>
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
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              onClick={closeMessage}
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
                className="relative bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 rounded-3xl border-8 border-purple-700 p-10 max-w-2xl w-full shadow-2xl"
                style={{
                  boxShadow: '0 30px 90px rgba(0,0,0,0.6), inset 0 3px 0 rgba(255,255,255,0.8)'
                }}
              >
                <button
                  onClick={closeMessage}
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
                <motion.div 
                  animate={{ rotate: [0, -10, 0] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-10 -right-10 text-7xl drop-shadow-2xl"
                >
                  ✨
                </motion.div>

                <div className="space-y-8 text-center">
                  <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl cartoon-font text-purple-900"
                    style={{ textShadow: '2px 2px 0 rgba(255,255,255,0.5)' }}
                  >
                    Hey Aayushi! 🕊️
                  </motion.h2>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-6"
                  >
                    <p className="text-2xl leading-relaxed text-purple-800 cartoon-font">
                      Fun fact: you're the <span className="text-pink-600 font-bold">silliest, most adorable girl</span> in the world.
                    </p>
                    
                    <p className="text-2xl leading-relaxed text-purple-800 cartoon-font">
                      I care for you <span className="text-red-600 font-bold italic">very deeply.</span>
                    </p>
                    
                    <p className="text-2xl leading-relaxed text-purple-800 cartoon-font">
                      And I'm <span className="text-yellow-600 font-bold">always here for you</span> 💛
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pt-8 border-t-4 border-dashed border-purple-400"
                  >
                    <p className="text-xl cartoon-font text-purple-700">
                      — instagram: <span className="font-bold">capedpotato</span>
                    </p>
                    <p className="text-xl cartoon-font text-purple-700">
                      ph. <span className="font-bold">9403783265</span>
                    </p>
                    <p className="text-lg text-purple-600 mt-4 cartoon-font italic">
                      if you wanna reach out 💕
                    </p>
                  </motion.div>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 1, duration: 2, repeat: Infinity }}
                  className="text-center text-base cartoon-font text-purple-500 mt-8"
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
