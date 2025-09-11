import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Compass, MapPin, Calendar } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Light Rays */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 bg-gradient-to-t from-transparent via-white/10 to-transparent"
            style={{
              height: '100vh',
              left: `${20 + i * 15}%`,
              transformOrigin: 'bottom'
            }}
            animate={{
              rotate: [0, 5, -5, 0],
              scaleY: [1, 1.2, 0.8, 1]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Central Glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-radial from-blue-400/20 via-purple-400/10 to-transparent rounded-full"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Corner Decorative Elements */}
      {[
        { position: 'top-8 left-8', delay: 0 },
        { position: 'top-8 right-8', delay: 0.5 },
        { position: 'bottom-8 left-8', delay: 1 },
        { position: 'bottom-8 right-8', delay: 1.5 }
      ].map((corner, i) => (
        <motion.div
          key={i}
          className={`absolute ${corner.position} w-16 h-16 border-2 border-white/20 rounded-full`}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            rotate: 360
          }}
          transition={{
            delay: corner.delay,
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Floating Emotions Text */}
        <motion.div
          className="mb-8"
          animate={{
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-white/60 text-lg font-light tracking-widest">EMOTIONS</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Journey
          </motion.span>{' '}
          <motion.span
            className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Beyond
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Discover destinations that resonate with your soul. Let your emotions guide your next adventure.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.button
            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg flex items-center gap-3"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Compass className="w-6 h-6" />
            </motion.div>
            Start Your Journey
          </motion.button>

          <motion.button
            className="group px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg backdrop-blur-sm flex items-center gap-3"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              backgroundColor: "rgba(255,255,255,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="w-6 h-6" />
            </motion.div>
            Explore Emotions
          </motion.button>
        </motion.div>

        {/* Feature Icons */}
        <motion.div
          className="flex justify-center gap-12 text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {[
            { icon: MapPin, label: "Destinations" },
            { icon: Calendar, label: "Planning" },
            { icon: Heart, label: "Emotions" }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-2 cursor-pointer"
              whileHover={{ 
                scale: 1.1,
                color: "#ffffff"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <item.icon className="w-8 h-8" />
              </motion.div>
              <span className="text-sm font-medium">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};