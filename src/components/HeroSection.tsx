import { Button } from "@/components/ui/button";
import { Heart, Compass } from "lucide-react";
import { useState } from "react";

export const HeroSection = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Space Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-black to-slate-950 -z-10" />

      {/* Earth Glow in Center */}
      <div className="absolute left-1/2 top-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-600/40 to-green-400/30 blur-3xl animate-pulse" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Tagline */}
        <div
          className="mb-12 inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-blue-400/50 shadow-lg hover:scale-105 transition-transform cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Heart className="w-5 h-5 text-blue-400" />
          <span className="text-white text-sm font-medium tracking-wide">
            Emotional Travel Intelligence • Feel-First Journey
          </span>
          <Compass className="w-4 h-4 text-teal-400 animate-pulse" />
        </div>

        {/* Heading */}
        <div className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tight mb-8 relative overflow-hidden">
          <style jsx>{`
            @keyframes slideInFromLeft {
              0% { transform: translateX(-100%); opacity: 0; }
              100% { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideInFromRight {
              0% { transform: translateX(100%); opacity: 0; }
              100% { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideInFromBottom {
              0% { transform: translateY(100%); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes textGlow {
              0%, 100% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
              50% { text-shadow: 0 0 40px rgba(59, 130, 246, 0.8), 0 0 60px rgba(20, 184, 166, 0.6); }
            }
            @keyframes letterFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            .word-journey {
              animation: slideInFromLeft 1.2s ease-out 0.5s both;
            }
            .word-beyond {
              animation: slideInFromRight 1.2s ease-out 1s both;
            }
            .word-emotions {
              animation: slideInFromBottom 1.5s ease-out 1.5s both, gradientShift 3s ease-in-out 2.5s infinite, textGlow 2s ease-in-out 3s infinite;
              background: linear-gradient(-45deg, #3b82f6, #06b6d4, #10b981, #8b5cf6, #3b82f6);
              background-size: 400% 400%;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              position: relative;
            }
            .word-emotions::before {
              content: '';
              position: absolute;
              top: -10px;
              left: -10px;
              right: -10px;
              bottom: -10px;
              background: linear-gradient(-45deg, rgba(59, 130, 246, 0.3), rgba(6, 182, 212, 0.3), rgba(16, 185, 129, 0.3), rgba(139, 92, 246, 0.3));
              background-size: 400% 400%;
              animation: gradientShift 3s ease-in-out infinite;
              border-radius: 20px;
              filter: blur(20px);
              z-index: -1;
              opacity: 0;
              animation: gradientShift 3s ease-in-out 3s infinite, fadeInGlow 1s ease-out 3s both;
            }
            @keyframes fadeInGlow {
              0% { opacity: 0; }
              100% { opacity: 1; }
            }
            .letter-float {
              display: inline-block;
              animation: letterFloat 2s ease-in-out infinite;
            }
            .letter-float:nth-child(1) { animation-delay: 0s; }
            .letter-float:nth-child(2) { animation-delay: 0.1s; }
            .letter-float:nth-child(3) { animation-delay: 0.2s; }
            .letter-float:nth-child(4) { animation-delay: 0.3s; }
            .letter-float:nth-child(5) { animation-delay: 0.4s; }
            .letter-float:nth-child(6) { animation-delay: 0.5s; }
            .letter-float:nth-child(7) { animation-delay: 0.6s; }
            .letter-float:nth-child(8) { animation-delay: 0.7s; }
          `}</style>
          
          <div className="word-journey">Journey</div>
          <br />
          <div className="word-beyond">Beyond</div>
          <br />
          <div className="word-emotions">
            <span className="letter-float">E</span>
            <span className="letter-float">m</span>
            <span className="letter-float">o</span>
            <span className="letter-float">t</span>
            <span className="letter-float">i</span>
            <span className="letter-float">o</span>
            <span className="letter-float">n</span>
            <span className="letter-float">s</span>
          </div>
        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed mb-12">
          <span className="text-blue-400 font-semibold">Discover your emotional compass</span> and let your feelings
          guide you to <span className="text-teal-400 font-semibold">extraordinary destinations </span>. <br />
          Travel that <span className="text-emerald-400 font-semibold">heals, inspires & transforms</span> your soul.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-6 rounded-full shadow-lg hover:scale-105 transition-transform">
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
 