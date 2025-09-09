import { Button } from "@/components/ui/button";
import { Heart, Compass } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Space Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-black to-slate-950 -z-10" />

      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 -z-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Animated Light Rays */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute w-px h-32 bg-gradient-to-t from-transparent via-blue-400/20 to-transparent"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              transform: `rotate(${15 + i * 10}deg)`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleY: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
      {/* Earth Glow in Center */}
      <motion.div 
        className="absolute left-1/2 top-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-600/40 to-green-400/30 blur-3xl"
        variants={glowVariants}
        animate="animate"
      />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tagline */}
        <motion.div
          className="mb-12 inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-blue-400/50 shadow-lg hover:scale-105 transition-transform cursor-pointer"
          variants={itemVariants}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            animate={{ rotate: isHovering ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heart className="w-5 h-5 text-blue-400" />
          </motion.div>
          <span className="text-white text-sm font-medium tracking-wide">
            Emotional Travel Intelligence • Feel-First Journey
          </span>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Compass className="w-4 h-4 text-teal-400" />
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tight mb-8"
          variants={itemVariants}
        >
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Journey
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Beyond
          </motion.span>
          <br />
          <motion.span 
            className="bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            variants={floatingVariants}
            animate="animate"
          >
            Emotions
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed mb-12"
          variants={itemVariants}
        >
          <span className="text-blue-400 font-semibold">Discover your emotional compass</span> and let your feelings
          guide you to <span className="text-teal-400 font-semibold">extraordinary destinations </span>. <br />
          Travel that <span className="text-emerald-400 font-semibold">heals, inspires & transforms</span> your soul.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-6 rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25">
              Start Your Journey
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline"
              className="border-2 border-blue-400/60 bg-white/10 text-white px-10 py-6 rounded-full transition-all duration-300 hover:bg-white/20 hover:border-blue-400/80"
            >
              Discover Emotions
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated Border Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-400/30 rounded-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 border-2 border-teal-400/30 rounded-full"
        animate={{
          rotate: [360, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-10 w-12 h-12 border-2 border-green-400/30 rounded-full"
        animate={{
          y: [-20, 20, -20],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 right-10 w-14 h-14 border-2 border-purple-400/30 rounded-full"
        animate={{
          y: [20, -20, 20],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </section>
  );
};
            Start Your Journey
          </Button>
          <Button
            variant="outline"
            className="border-2 border-blue-400/60 bg-white/10 text-white px-10 py-6 rounded-full hover:scale-105 transition-transform"
          >
            Discover Emotions
          </Button>
        </div>
      </div>
    </section>
  );
};    
 