import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Auto-complete after 8 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
      setTimeout(onComplete, 1000); // Wait for fade out
    }, 8000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setShowIntro(false);
    setTimeout(onComplete, 500);
  };

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #e94560 85%, #f39c12 100%)'
          }}
        >
          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-10 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm hover:bg-white/30 transition-colors"
          >
            Skip Intro
          </button>

          {/* Sun */}
          <motion.div
            initial={{ scale: 0, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
            style={{
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, #f39c12 0%, #e67e22 50%, #d35400 100%)',
              borderRadius: '50%',
              boxShadow: '0 0 100px #f39c12, 0 0 200px #e67e22, 0 0 300px #d35400'
            }}
          />

          {/* Mountain Silhouettes */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute bottom-0 left-0 w-full h-64"
            style={{
              background: 'linear-gradient(to top, #2c3e50 0%, transparent 100%)',
              clipPath: 'polygon(0 100%, 0 60%, 15% 45%, 25% 55%, 35% 40%, 50% 50%, 65% 35%, 80% 45%, 90% 40%, 100% 50%, 100% 100%)'
            }}
          />

          {/* Trees */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotate: [0, 2, -1, 1, 0] // Gentle swaying
              }}
              transition={{ 
                duration: 2, 
                delay: 1.5 + i * 0.2,
                rotate: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="absolute bottom-16"
              style={{
                left: `${10 + i * 12}%`,
                width: '8px',
                height: `${60 + Math.random() * 40}px`,
                background: 'linear-gradient(to top, #2c3e50, #34495e)',
                borderRadius: '4px 4px 0 0'
              }}
            >
              {/* Tree crown */}
              <div
                className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                style={{
                  width: '24px',
                  height: '24px',
                  background: 'radial-gradient(circle, #27ae60, #229954)',
                  borderRadius: '50%'
                }}
              />
            </motion.div>
          ))}

          {/* Falling Leaves */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0,
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: 0
              }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: window.innerHeight + 50,
                x: Math.random() * window.innerWidth * 0.3 + Math.random() * window.innerWidth,
                rotate: 360
              }}
              transition={{ 
                duration: 6 + Math.random() * 4,
                delay: 2 + Math.random() * 3,
                ease: "linear"
              }}
              className="absolute"
              style={{
                width: '8px',
                height: '8px',
                background: '#e67e22',
                borderRadius: '50% 0',
                transform: 'rotate(45deg)'
              }}
            />
          ))}

          {/* Flying Birds */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: -50,
                y: 100 + i * 30,
                opacity: 0
              }}
              animate={{ 
                x: window.innerWidth + 50,
                y: 80 + i * 25 + Math.sin(i) * 20,
                opacity: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: 8,
                delay: 3 + i * 0.5,
                ease: "easeInOut"
              }}
              className="absolute"
            >
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                <path
                  d="M2 6C4 2, 8 2, 10 6C12 2, 16 2, 18 6"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </motion.div>
          ))}

          {/* Gentle Light Rays */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 0.3, scaleY: 1 }}
              transition={{ duration: 3, delay: 2 + i * 0.3 }}
              className="absolute bottom-20 left-1/2 origin-bottom"
              style={{
                width: '2px',
                height: '200px',
                background: 'linear-gradient(to top, #f39c12, transparent)',
                transform: `translateX(-50%) rotate(${-20 + i * 10}deg)`,
                filter: 'blur(1px)'
              }}
            />
          ))}

          {/* Soft Glow Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 4, delay: 1 }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center bottom, #f39c12 0%, transparent 60%)',
              filter: 'blur(100px)'
            }}
          />

          {/* Cinematic Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)'
            }}
          />

          {/* Subtle Text Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 4 }}
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center"
          >
            <h1 className="text-white text-2xl md:text-4xl font-light tracking-wide mb-2">
              Journey Beyond Emotions
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              Discover destinations that heal your soul
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};