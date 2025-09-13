import { Button } from "@/components/ui/button";
import { Heart, Compass } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Variant for stroke reveal effect
  const strokeVariant = {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    visible: {
      opacity: 1,
      clipPath: "inset(0 0% 0 0)",
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  const containerVariant = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.4 } }, // reveal each word one by one
  };

  const renderWord = (word: string, gradient = false) => (
    <motion.span
      className={`block overflow-hidden ${
        gradient
          ? "bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 bg-clip-text text-transparent"
          : ""
      }`}
      variants={strokeVariant}
    >
      {word}
    </motion.span>
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Space Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-black to-slate-950 -z-10" />

      {/* Earth Glow in Center */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-600/40 to-green-400/30 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Tagline */}
        <motion.div
          className="mb-12 inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-blue-400/50 shadow-lg cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <Heart className="w-5 h-5 text-blue-400" />
          <span className="text-white text-sm font-medium tracking-wide">
            Emotional Travel Intelligence • Feel-First Journey
          </span>
          <Compass className="w-4 h-4 text-teal-400 animate-pulse" />
        </motion.div>

        {/* Heading with stroke reveal animation */}
        <motion.h1
          className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tight mb-8"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          {renderWord("Journey")}
          {renderWord("Beyond")}
          {renderWord("Emotions", true)}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <span className="text-blue-400 font-semibold">Discover your emotional compass</span> and let your feelings
          guide you to <span className="text-teal-400 font-semibold">extraordinary destinations </span>. <br />
          Travel that <span className="text-emerald-400 font-semibold">heals, inspires & transforms</span> your soul.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-6 rounded-full shadow-lg">
              Start Your Journey
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="border-2 border-blue-400/60 bg-white/10 text-white px-10 py-6 rounded-full"
            >
              Discover Emotions
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
