'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type TaskType = 'pet' | 'feed' | 'play' | 'sleep';

interface Task {
  id: TaskType;
  title: string;
  icon: string;
  completed: boolean;
  message: string;
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
  }
];

export default function CatWorld() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'pet', title: 'Pet the Cat', icon: '🐾', completed: false, message: '' },
    { id: 'feed', title: 'Feed the Cat', icon: '🍖', completed: false, message: '' },
    { id: 'play', title: 'Play with Cat', icon: '🎾', completed: false, message: '' },
    { id: 'sleep', title: 'Tuck in Bed', icon: '🛏️', completed: false, message: '' },
  ]);

  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(sweetMessages[0]);
  const [catMood, setCatMood] = useState<'idle' | 'happy' | 'playing' | 'sleeping'>('idle');
  const [showConfetti, setShowConfetti] = useState(false);

  const completeTask = (taskId: TaskType) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      // Mark task as complete
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, completed: true } : t
      ));

      // Show sweet message
      const randomMessage = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
      setCurrentMessage(randomMessage);
      setShowMessage(true);

      // Cat reaction
      if (taskId === 'pet') setCatMood('happy');
      if (taskId === 'play') setCatMood('playing');
      if (taskId === 'sleep') setCatMood('sleeping');
      if (taskId === 'feed') setCatMood('happy');

      // Confetti effect
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const resetTasks = () => {
    setTasks(prev => prev.map(t => ({ ...t, completed: false })));
    setCatMood('idle');
    setShowMessage(false);
  };

  const allTasksCompleted = tasks.every(t => t.completed);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 overflow-hidden relative">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ x: '50vw', y: '50vh', scale: 0 }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [0, 1, 0],
                rotate: Math.random() * 360
              }}
              transition={{ duration: 1.5, delay: i * 0.05 }}
            >
              {['💖', '✨', '🌟', '💫', '💕'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center pt-6 pb-4"
      >
        <h1 className="text-3xl font-bold text-purple-800 mb-2">
          Aayushi's Cat Corner 🐱
        </h1>
        <p className="text-sm text-purple-600">
          Complete tasks to get sweet surprises! 💕
        </p>
      </motion.div>

      {/* Room Background */}
      <div className="relative max-w-md mx-auto px-4">
        <motion.div 
          className="relative w-full aspect-square bg-white rounded-3xl border-4 border-purple-400 overflow-hidden shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Room */}
          <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-purple-50">
            <Image
              src="/rooms/room1.png"
              alt="room"
              fill
              className="object-cover opacity-60"
            />
          </div>

          {/* Cat */}
          <motion.div
            className="absolute bottom-32 left-1/2 -translate-x-1/2"
            animate={{
              y: catMood === 'playing' ? [-5, 5, -5] : 0,
              rotate: catMood === 'happy' ? [-5, 5, -5, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              repeat: catMood === 'playing' ? Infinity : 0,
            }}
          >
            <Image
              src={catMood === 'sleeping' ? "/cats/sleeping.png" : "/cats/idle.png"}
              alt="cat"
              width={150}
              height={150}
              className="pixelated"
            />
          </motion.div>

          {/* Items */}
          {tasks.find(t => t.id === 'feed')?.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute bottom-28 right-12"
            >
              <Image src="/items/bowl.png" alt="bowl" width={40} height={40} className="pixelated" />
            </motion.div>
          )}

          {tasks.find(t => t.id === 'play')?.completed && (
            <motion.div
              initial={{ scale: 0, x: 50 }}
              animate={{ scale: 1, x: 0 }}
              className="absolute bottom-32 left-12"
            >
              <Image src="/items/ball.gif" alt="toy" width={35} height={35} className="pixelated" />
            </motion.div>
          )}

          {tasks.find(t => t.id === 'sleep')?.completed && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2"
            >
              <Image src="/items/bed.png" alt="bed" width={120} height={80} className="pixelated" />
            </motion.div>
          )}
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
              transition-all duration-200 active:scale-95
              ${task.completed 
                ? 'bg-green-200 border-green-400 text-green-800 opacity-60' 
                : 'bg-white border-purple-400 text-purple-800 hover:bg-purple-50 active:bg-purple-100 shadow-lg'
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
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
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
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={resetTasks}
          className="max-w-md mx-auto mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full border-4 border-white shadow-lg block w-11/12 ml-auto mr-auto"
        >
          Play Again! 🔄
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
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />

            {/* Note */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: 'spring', damping: 15 }}
              className="relative bg-gradient-to-br from-yellow-100 to-pink-100 rounded-3xl border-4 border-purple-400 p-8 max-w-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowMessage(false)}
                className="absolute top-3 right-3 w-8 h-8 bg-purple-400 hover:bg-purple-500 rounded-full text-white font-bold text-xl flex items-center justify-center"
              >
                ×
              </button>

              {/* Decorations */}
              <div className="absolute -top-4 -left-4 text-4xl">💌</div>
              <div className="absolute -bottom-4 -right-4 text-4xl">✨</div>

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
                <div className="text-center text-sm text-purple-600 pt-2 border-t-2 border-dashed border-purple-300">
                  <p>— @capedpotato</p>
                  <p>📱 9403783265</p>
                </div>
              </motion.div>

              {/* Tap to close hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xs text-purple-500 text-center mt-4"
              >
                Tap anywhere to close 💕
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="text-center text-sm text-purple-600 mt-8 pb-6">
        Made with 💖 for Aayushi
      </div>
    </div>
  );
}
