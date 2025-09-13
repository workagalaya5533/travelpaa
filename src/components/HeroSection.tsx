import { Button } from "@/components/ui/button";
import { Heart, Compass } from "lucide-react";
import { useState } from "react";

export const HeroSection = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Space Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-black to-slate-950 -z-10" />

      {/* Earth Glow in Center - Optimized */}
      <div className="absolute left-1/2 top-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-600/40 to-green-400/30 blur-3xl animate-pulse will-change-transform" />

      {/* Optimized Floating Particles - Reduced count */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float will-change-transform"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${20 + (i * 8)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto animate-fadeInUp">
        {/* Tagline */}
        <div 
          className="mb-12 inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-blue-400/50 shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer will-change-transform animate-slideDown"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <Heart className={`w-5 h-5 text-blue-400 transition-transform duration-200 will-change-transform ${isHovering ? 'scale-110' : ''}`} />
          <span className="text-white text-sm font-medium tracking-wide">
            Emotional Travel Intelligence • Feel-First Journey
          </span>
          <Compass className={`w-4 h-4 text-teal-400 animate-spin-slow transition-transform duration-200 will-change-transform ${isHovering ? 'rotate-12 scale-110' : ''}`} />
        </div>

        {/* Heading - Staggered animation */}
        <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tight mb-8 will-change-transform">
          <span className="inline-block animate-slideInUp-1">Journey</span>
          <br />
          <span className="inline-block animate-slideInUp-2">Beyond</span>
          <br />
          <span className="bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 bg-clip-text text-transparent inline-block animate-slideInUp-3 animate-gradient">
            Emotions
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed mb-12 animate-slideInUp-4">
          <span className="text-blue-400 font-semibold">Discover your emotional compass</span> and let your feelings guide you to{" "}
          <span className="text-teal-400 font-semibold">extraordinary destinations</span>.
          <br />
          Travel that{" "}
          <span className="text-emerald-400 font-semibold">heals, inspires & transforms</span> your soul.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-slideInUp-5">
          <Button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 will-change-transform">
            Start Your Journey
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-blue-400/60 bg-white/10 text-white px-10 py-6 rounded-full hover:scale-105 transition-transform duration-200 will-change-transform"
          >
            Discover Emotions
          </Button>
        </div>
      </div>

      <style jsx>{`
        /* Optimized float animation - simpler path */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-15px) translateX(5px);
          }
        }

        /* Fast slide-in animations */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Apply animations */
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }

        .animate-slideInUp-1 {
          animation: slideInUp 0.5s ease-out 0.1s both;
        }

        .animate-slideInUp-2 {
          animation: slideInUp 0.5s ease-out 0.2s both;
        }

        .animate-slideInUp-3 {
          animation: slideInUp 0.5s ease-out 0.3s both;
        }

        .animate-slideInUp-4 {
          animation: slideInUp 0.6s ease-out 0.4s both;
        }

        .animate-slideInUp-5 {
          animation: slideInUp 0.6s ease-out 0.5s both;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        /* Performance optimizations */
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </section>
  );
};