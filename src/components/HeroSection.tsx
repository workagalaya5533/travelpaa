import React, { useEffect, useRef } from 'react';
import { Heart, Compass, MapPin, Calendar } from 'lucide-react';

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate elements on mount
    const hero = heroRef.current;
    if (!hero) return;

    const elements = hero.querySelectorAll('.animate-on-load');
    elements.forEach((el, index) => {
      const element = el as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });

    // Create floating particles
    const createParticles = () => {
      const container = particlesRef.current;
      if (!container) return;

      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
          position: absolute;
          width: ${2 + Math.random() * 4}px;
          height: ${2 + Math.random() * 4}px;
          background: rgba(255, 255, 255, ${0.3 + Math.random() * 0.4});
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: float ${8 + Math.random() * 8}s infinite linear;
          box-shadow: 0 0 ${4 + Math.random() * 8}px rgba(255, 255, 255, 0.3);
        `;
        container.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-30px) translateX(15px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .hero-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        
        .rotate-continuous {
          animation: rotate-slow 20s linear infinite;
        }
        
        .bounce-icon {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
      `}</style>
      
      <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground theme="minimal" />
        
        {/* Floating Particles Container */}
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
        
        {/* Central Glow Effect */}
        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-400/10 to-transparent hero-glow" />
        
        {/* Corner Decorative Elements */}
        <div className="absolute top-8 left-8 w-16 h-16 border-2 border-white/20 rounded-full rotate-continuous" />
        <div className="absolute top-8 right-8 w-16 h-16 border-2 border-white/20 rounded-full rotate-continuous" style={{ animationDelay: '5s' }} />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-2 border-white/20 rounded-full rotate-continuous" style={{ animationDelay: '10s' }} />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-2 border-white/20 rounded-full rotate-continuous" style={{ animationDelay: '15s' }} />
        
        {/* Main Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="mb-8 animate-on-load">
            <span className="text-white/60 text-lg font-light tracking-widest bounce-icon">EMOTIONS</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-on-load">
            <span className="inline-block">Journey</span>{' '}
            <span className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Beyond
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-on-load">
            Discover destinations that resonate with your soul. Let your emotions guide your next adventure.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-on-load">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg flex items-center gap-3 hover-lift">
              <div className="rotate-continuous">
                <Compass className="w-6 h-6" />
              </div>
              Start Your Journey
            </button>
            
            <button className="group px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg backdrop-blur-sm flex items-center gap-3 hover-lift">
              <Heart className="w-6 h-6 group-hover:animate-pulse" />
              Explore Emotions
            </button>
          </div>
          
          {/* Feature Icons */}
          <div className="flex justify-center gap-12 text-white/60 animate-on-load">
            {[
              { icon: MapPin, label: "Destinations" },
              { icon: Calendar, label: "Planning" },
              { icon: Heart, label: "Emotions" }
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 cursor-pointer hover-lift"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <div className="bounce-icon">
                  <item.icon className="w-8 h-8" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );