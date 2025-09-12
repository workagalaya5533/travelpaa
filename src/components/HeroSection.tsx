import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, Compass, MapPin, Calendar } from 'lucide-react';

export const HeroSection = () => {
  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      const container = document.querySelector('.hero-container');
      if (!container) return;

      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
      }
    };

    createParticles();

    // Cleanup function
    return () => {
      const particles = document.querySelectorAll('.floating-particle');
      particles.forEach(particle => particle.remove());
    };
  }, []);

  return (
    <div className="hero-container relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Central Glow */}
        <div className="central-glow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-blue-400/30 via-purple-400/20 to-transparent rounded-full"></div>
        
        {/* Corner Decorations */}
        <div className="corner-decoration absolute top-10 left-10 w-16 h-16 border-2 border-white/20 rounded-full"></div>
        <div className="corner-decoration absolute top-10 right-10 w-16 h-16 border-2 border-white/20 rounded-full"></div>
        <div className="corner-decoration absolute bottom-10 left-10 w-16 h-16 border-2 border-white/20 rounded-full"></div>
        <div className="corner-decoration absolute bottom-10 right-10 w-16 h-16 border-2 border-white/20 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="hero-content relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Badge variant="secondary" className="mb-6 px-4 py-2 bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all duration-300">
            <Heart className="w-4 h-4 mr-2 heart-pulse" />
            Journey Beyond Emotions
          </Badge>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="fade-in-up gradient-text bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent" style={{ animationDelay: '0.4s' }}>
            Discover
          </span>
          <br />
          <span className="fade-in-up gradient-text bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent" style={{ animationDelay: '0.6s' }}>
            Your Perfect
          </span>
          <br />
          <span className="fade-in-up gradient-text bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text text-transparent" style={{ animationDelay: '0.8s' }}>
            Journey
          </span>
        </h1>

        {/* Description */}
        <p className="fade-in-up text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '1s' }}>
          Embark on extraordinary adventures tailored to your emotions. From serene beaches to thrilling mountains, find destinations that speak to your soul.
        </p>

        {/* CTA Buttons */}
        <div className="fade-in-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-12" style={{ animationDelay: '1.2s' }}>
          <Button size="lg" className="animated-button bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            <Compass className="w-5 h-5 mr-2 compass-spin" />
            Start Your Journey
          </Button>
          <Button variant="outline" size="lg" className="animated-button border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300">
            <MapPin className="w-5 h-5 mr-2 bounce-icon" />
            Explore Destinations
          </Button>
        </div>

        {/* Feature Icons */}
        <div className="fade-in-up flex justify-center space-x-8" style={{ animationDelay: '1.4s' }}>
          <div className="text-center">
            <div className="bounce-icon w-12 h-12 mx-auto mb-2 bg-white/10 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <p className="text-white/70 text-sm">Plan</p>
          </div>
          <div className="text-center">
            <div className="bounce-icon w-12 h-12 mx-auto mb-2 bg-white/10 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <p className="text-white/70 text-sm">Explore</p>
          </div>
          <div className="text-center">
            <div className="bounce-icon w-12 h-12 mx-auto mb-2 bg-white/10 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <p className="text-white/70 text-sm">Experience</p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
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

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes glow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes floatParticle {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(100px); opacity: 0; }
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .bounce-icon {
          animation: bounce 2s ease-in-out infinite;
        }

        .heart-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .compass-spin {
          animation: spin 4s linear infinite;
        }

        .central-glow {
          animation: glow 4s ease-in-out infinite;
        }

        .corner-decoration {
          animation: rotate 10s linear infinite;
        }

        .animated-button {
          transition: all 0.3s ease;
        }

        .animated-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .floating-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: floatParticle linear infinite;
          pointer-events: none;
        }

        .gradient-text {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};