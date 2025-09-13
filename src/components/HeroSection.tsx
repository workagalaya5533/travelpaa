// Import Framer Motion
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Compass, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);

    // Track mouse movement for subtle parallax (optional enhancement)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Earth Glow (background) */}
      <motion.div
        className="absolute rounded-full bg-blue-500/40 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 0.6,
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "40rem",
          height: "40rem",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Heading */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-white text-center mb-6"
        initial={{ opacity: 0, y: 50 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Discover the Future
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="text-lg md:text-xl text-gray-300 text-center max-w-2xl mb-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
      >
        Step into an immersive journey where design meets innovation.
      </motion.p>

      {/* Buttons Row */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      >
        {/* Button 1 */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button className="flex items-center gap-2 px-6 py-3 text-lg font-medium rounded-2xl shadow-lg bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 transition">
            <Heart className="w-5 h-5" /> Get Started
          </Button>
        </motion.div>

        {/* Button 2 */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button className="flex items-center gap-2 px-6 py-3 text-lg font-medium rounded-2xl shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 transition">
            <Compass className="w-5 h-5" /> Explore
          </Button>
        </motion.div>

        {/* Button 3 */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button className="flex items-center gap-2 px-6 py-3 text-lg font-medium rounded-2xl shadow-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition">
            <Sparkles className="w-5 h-5" /> Learn More
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};
