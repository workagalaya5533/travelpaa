import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Heart, Plus, Check } from "lucide-react";
import { usePlans } from "@/contexts/PlanContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface DestinationCardProps {
  name: string;
  country: string;
  image: string;
  emotionalMatch: string;
  matchPercentage: number;
  description: string;
  culturalHighlights: string[];
  safetyLevel: "high" | "medium" | "low";
  bestTime: string;
  priceRange: "$" | "$$" | "$$$";
  idealGroupSize?: string;
  groupDescription?: string;
  hideGetGoingPlans?: boolean;
}

export const DestinationCard = ({
  name,
  country,
  image,
  emotionalMatch,
  matchPercentage,
  description,
  culturalHighlights,
  safetyLevel,
  bestTime,
  priceRange,
  idealGroupSize,
  groupDescription,
  hideGetGoingPlans = false,
}: DestinationCardProps) => {
  const { addPlan, selectedPlans, updatePlanStatus } = usePlans();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isSelected = selectedPlans.some(
    (plan) => plan.name === name && plan.region === country
  );

  const handleAddToPlan = () => {
    if (isSelected) {
      toast({
        title: "Already added",
        description: `${name} is already in your travel plans.`,
      });
      return;
    }
    addPlan({
      name,
      country,
      image,
      emotionalMatch,
      matchPercentage,
      description,
      culturalHighlights,
      safetyLevel,
      bestTime,
      priceRange,
      region: country as "Tamil Nadu" | "Kerala" | "Bangalore",
    });
    toast({
      title: "Added to plans!",
      description: `${name} has been added to your travel dashboard.`,
    });
  };

  const handleGetGoingPlans = () => {
    const existing = selectedPlans.find( 
      (plan) => plan.name === name && plan.region === country
    );
    if (!existing) {
      addPlan({
        name,
        country,
        image,
        emotionalMatch,
        matchPercentage,
        description,
        culturalHighlights,
        safetyLevel,
        bestTime,
        priceRange,
        region: country as "Tamil Nadu" | "Kerala" | "Bangalore",
      });
      toast({
        title: "Added to plans",
        description: `${name} added. Opening ongoing plans...`,
      });
      setTimeout(() => {
        const plan = selectedPlans.find(
          (p) => p.name === name && p.region === country
        );
        if (plan) {
          updatePlanStatus(plan.id, "ongoing");
        }
        navigate("/dashboard?tab=ongoing");
      }, 100);
      return;
    }
    updatePlanStatus(existing.id, "ongoing");
    navigate("/dashboard?tab=ongoing");
  };

  const safetyColor = {
    high: "#00d4aa",
    medium: "#ffa726",
    low: "#ff5252",
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.currentTarget;
    if (target.src !== "/placeholder.svg") target.src = "/placeholder.svg";
  };

  return (
    <Card className="destination-card h-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .destination-card {
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.12) 0%,
            rgba(255, 255, 255, 0.08) 25%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.06) 75%,
            rgba(255, 255, 255, 0.1) 100%
          );
          backdrop-filter: blur(40px) saturate(200%) contrast(120%);
          -webkit-backdrop-filter: blur(40px) saturate(200%) contrast(120%);
          border-radius: 28px;
          border: 1px solid;
          border-image: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.1) 25%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.05) 75%,
            rgba(255, 255, 255, 0.25) 100%
          ) 1;
          box-shadow: 
            0 32px 64px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset,
            0 1px 0 rgba(255, 255, 255, 0.1) inset,
            0 0 100px rgba(255, 255, 255, 0.03);
          width: 100%;
          height: 100%;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .destination-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: conic-gradient(
            from 0deg at 50% 50%,
            rgba(168, 239, 255, 0.1) 0deg,
            rgba(255, 168, 230, 0.1) 72deg,
            rgba(255, 214, 168, 0.1) 144deg,
            rgba(168, 255, 194, 0.1) 216deg,
            rgba(205, 168, 255, 0.1) 288deg,
            rgba(168, 239, 255, 0.1) 360deg
          );
          border-radius: 28px;
          opacity: 0;
          transition: opacity 0.8s ease;
          z-index: -1;
          animation: float 6s ease-in-out infinite;
        }
        
        .destination-card::after {
          content: '';
          position: absolute;
          top: 1px;
          left: 1px;
          right: 1px;
          height: 2px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 20%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 0.6) 80%,
            transparent 100%
          );
          border-radius: 28px 28px 0 0;
          opacity: 0.7;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-2px) rotate(1deg); }
          66% { transform: translateY(1px) rotate(-1deg); }
        }
        
        .destination-card:hover {
          transform: translateY(-16px) rotateX(8deg) rotateY(2deg) scale(1.03);
          box-shadow: 
            0 48px 96px -16px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset,
            0 2px 0 rgba(255, 255, 255, 0.15) inset,
            0 0 120px rgba(255, 255, 255, 0.06),
            0 0 200px rgba(168, 239, 255, 0.15);
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.18) 0%,
            rgba(255, 255, 255, 0.12) 25%,
            rgba(255, 255, 255, 0.22) 50%,
            rgba(255, 255, 255, 0.1) 75%,
            rgba(255, 255, 255, 0.16) 100%
          );
        }
        
        .destination-card:hover::before {
          opacity: 0.4;
          animation: float 3s ease-in-out infinite;
        }

        /* Magnetic Image Container */
        .destination-img-wrap {
          position: relative;
          height: 240px;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(135deg, 
            rgba(168, 239, 255, 0.1) 0%,
            rgba(255, 168, 230, 0.05) 50%,
            rgba(168, 255, 194, 0.1) 100%
          );
          flex-shrink: 0;
          border-radius: 26px 26px 0 0;
          mask: linear-gradient(to bottom, #000 0%, #000 85%, transparent 100%);
          -webkit-mask: linear-gradient(to bottom, #000 0%, #000 85%, transparent 100%);
        }
        
        .destination-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          filter: saturate(110%) contrast(105%) brightness(102%);
        }
        
        .destination-card:hover .destination-img {
          transform: scale(1.15) rotate(2deg);
          filter: saturate(130%) contrast(115%) brightness(105%);
        }

        /* Floating Match Badge */
        .destination-badge {
          position: absolute;
          top: 24px;
          right: 24px;
          background: linear-gradient(135deg,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.6) 100%
          );
          backdrop-filter: blur(30px) saturate(200%);
          -webkit-backdrop-filter: blur(30px) saturate(200%);
          color: #ffffff;
          font-weight: 700;
          border-radius: 24px;
          padding: 12px 20px;
          font-size: 14px;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 
            0 16px 32px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset,
            0 1px 0 rgba(255, 255, 255, 0.2) inset;
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation: breathe 4s ease-in-out infinite;
        }
        
        @keyframes breathe {
          0%, 100% { 
            transform: scale(1) translateZ(0);
            box-shadow: 
              0 16px 32px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(255, 255, 255, 0.1) inset,
              0 1px 0 rgba(255, 255, 255, 0.2) inset;
          }
          50% { 
            transform: scale(1.05) translateZ(10px);
            box-shadow: 
              0 24px 48px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(255, 255, 255, 0.15) inset,
              0 2px 0 rgba(255, 255, 255, 0.25) inset,
              0 0 50px rgba(255, 255, 255, 0.1);
          }
        }
        
        .destination-card:hover .destination-badge {
          transform: scale(1.1) translateZ(20px);
          background: linear-gradient(135deg,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.7) 100%
          );
          box-shadow: 
            0 24px 48px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.2) inset,
            0 2px 0 rgba(255, 255, 255, 0.3) inset,
            0 0 60px rgba(255, 255, 255, 0.15);
        }

        /* Luxurious Body */
        .destination-body {
          padding: 32px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
          background: linear-gradient(180deg, 
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.02) 50%,
            rgba(255, 255, 255, 0.08) 100%
          );
          backdrop-filter: blur(20px);
          position: relative;
        }

        /* Elegant Typography */
        .destination-title {
          font-size: 28px;
          font-weight: 800;
          margin: 0;
          color: #1a1a1a;
          letter-spacing: -0.04em;
          line-height: 1.1;
          background: linear-gradient(135deg, 
            #1a1a1a 0%,
            #2d2d2d 50%,
            #1a1a1a 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .destination-card:hover .destination-title {
          transform: translateY(-2px);
          background: linear-gradient(135deg, 
            #0f0f0f 0%,
            #404040 50%,
            #0f0f0f 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
        }
        
        .destination-location {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 500;
          color: #6b7280;
          margin-top: 8px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        
        .destination-location svg {
          width: 18px;
          height: 18px;
          flex: 0 0 18px;
          vertical-align: middle;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        
        .destination-card:hover .destination-location {
          color: #4b5563;
          transform: translateX(4px);
        }
        
        .destination-card:hover .destination-location svg {
          opacity: 1;
          color: #8b5cf6;
        }

        /* Rich Description */
        .destination-description {
          font-size: 16px;
          line-height: 1.7;
          color: #374151;
          margin: 0 0 24px 0;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s ease;
        }
        
        .destination-card:hover .destination-description {
          color: #1f2937;
        }

        .destination-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .destination-bottom {
          margin-top: auto;
          padding-top: 20px;
        }

        /* Premium Info Panel */
        .destination-info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 15px;
          color: #6b7280;
          gap: 16px;
          margin-bottom: 24px;
          padding: 20px 24px;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.1) 25%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.05) 75%,
            rgba(255, 255, 255, 0.25) 100%
          );
          backdrop-filter: blur(25px) saturate(180%);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 rgba(0, 0, 0, 0.05);
          transition: all 0.4s ease;
        }
        
        .destination-card:hover .destination-info-row {
          transform: translateY(-4px);
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.15) 25%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.1) 75%,
            rgba(255, 255, 255, 0.35) 100%
          );
          box-shadow: 
            0 16px 48px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
        
        .meta-left {
          display: inline-flex;
          align-items: center;
          gap: 24px;
          white-space: nowrap;
        }
        
        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .meta-item:hover {
          color: #8b5cf6;
          transform: scale(1.05);
        }
        
        .safety {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          padding: 10px 16px;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.2) 100%
          );
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }
        
        .safety:hover {
          transform: scale(1.1);
        }
        
        .safety-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 16px currentColor;
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }

        /* Designer Buttons */
        .destination-buttons {
          display: flex;
          gap: 16px;
        }
        
        .destination-btn {
          flex: 1;
          border-radius: 18px;
          font-size: 16px;
          font-weight: 700;
          padding: 16px 24px;
          min-height: 56px;
          background: linear-gradient(135deg, 
            rgba(139, 92, 246, 1) 0%,
            rgba(99, 102, 241, 1) 100%
          );
          border: none;
          color: #ffffff;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 12px 24px rgba(139, 92, 246, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .destination-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          transition: left 0.6s ease;
        }
        
        .destination-btn:nth-child(1) {
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 1) 0%,
            rgba(37, 99, 235, 1) 100%
          );
          box-shadow: 
            0 12px 24px rgba(59, 130, 246, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        .destination-btn:nth-child(2) {
          background: linear-gradient(135deg, 
            rgba(16, 185, 129, 1) 0%,
            rgba(5, 150, 105, 1) 100%
          );
          box-shadow: 
            0 12px 24px rgba(16, 185, 129, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        .destination-btn:nth-child(3) {
          background: linear-gradient(135deg, 
            rgba(107, 114, 128, 0.9) 0%,
            rgba(75, 85, 99, 0.8) 100%
          );
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #1f2937;
          box-shadow: 
            0 12px 24px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
        
        .destination-btn:hover:not(:disabled) {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 
            0 20px 40px rgba(139, 92, 246, 0.6),
            inset 0 2px 0 rgba(255, 255, 255, 0.3);
        }
        
        .destination-btn:nth-child(1):hover {
          box-shadow: 
            0 20px 40px rgba(59, 130, 246, 0.6),
            inset 0 2px 0 rgba(255, 255, 255, 0.3);
        }
        
        .destination-btn:nth-child(2):hover {
          box-shadow: 
            0 20px 40px rgba(16, 185, 129, 0.6),
            inset 0 2px 0 rgba(255, 255, 255, 0.3);
        }
        
        .destination-btn:nth-child(3):hover {
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.25),
            inset 0 2px 0 rgba(255, 255, 255, 0.5);
        }
        
        .destination-btn:hover:not(:disabled)::before {
          left: 100%;
        }
        
        .destination-btn:disabled {
          background: linear-gradient(135deg, 
            rgba(16, 185, 129, 1) 0%,
            rgba(5, 150, 105, 1) 100%
          );
          cursor: default;
          box-shadow: 
            0 12px 24px rgba(16, 185, 129, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        .destination-btn:disabled:hover {
          transform: none;
          box-shadow: 
            0 12px 24px rgba(16, 185, 129, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        /* Premium Animations */
        @media (prefers-reduced-motion: no-preference) {
          .destination-card {
            animation: luxuryEntry 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          }
          
          .destination-card:nth-child(odd) {
            animation-delay: 0.1s;
          }
          
          .destination-card:nth-child(even) {
            animation-delay: 0.2s;
          }
        }
        
        @keyframes luxuryEntry {
          0% {
            opacity: 0;
            transform: translateY(60px) rotateX(-15deg) scale(0.9);
            filter: blur(10px);
          }
          60% {
            opacity: 0.8;
            transform: translateY(-8px) rotateX(2deg) scale(1.02);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0) scale(1);
            filter: blur(0);
          }
        }
        
        /* Dark mode excellence */
        @media (prefers-color-scheme: dark) {
          .destination-card {
            background: linear-gradient(145deg, 
              rgba(17, 24, 39, 0.4) 0%,
              rgba(17, 24, 39, 0.2) 25%,
              rgba(17, 24, 39, 0.5) 50%,
              rgba(17, 24, 39, 0.1) 75%,
              rgba(17, 24, 39, 0.3) 100%
            );
            border-image: linear-gradient(135deg, 
              rgba(255, 255, 255, 0.15) 0%,
              rgba(255, 255, 255, 0.05) 25%,
              rgba(255, 255, 255, 0.1) 50%,
              rgba(255, 255, 255, 0.02) 75%,
              rgba(255, 255, 255, 0.12) 100%
            ) 1;
          }
          
          .destination-title {
            background: linear-gradient(135deg, 
              #f9fafb 0%,
              #e5e7eb 50%,
              #f9fafb 100%
            );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .destination-location {
            color: #9ca3af;
          }
          
          .destination-description {
            color: #d1d5db;
          }
          
          .destination-info-row {
            background: linear-gradient(135deg, 
              rgba(31, 41, 55, 0.6) 0%,
              rgba(31, 41, 55, 0.2) 25%,
              rgba(31, 41, 55, 0.5) 50%,
              rgba(31, 41, 55, 0.1) 75%,
              rgba(31, 41, 55, 0.4) 100%
            );
            color: #9ca3af;
          }
          
          .destination-btn:nth-child(3) {
            background: linear-gradient(135deg, 
              rgba(55, 65, 81, 0.8) 0%,
              rgba(31, 41, 55, 0.9) 100%
            );
            color: #f9fafb;
          }
        }
      `}</style>

      <div className="destination-img-wrap">
        <img
          src={image || "/placeholder.svg"}
          alt={`${name}, ${country}`}
          className="destination-img"
          onError={handleImageError}
        />
        <div className="destination-badge">
          <Heart style={{ height: 16, width: 16 }} />
          {matchPercentage}% Match
        </div>
      </div>

      <div className="destination-body">
        <div className="destination-content">
          <h2 className="destination-title">{name}</h2>

          <div className="destination-location">
            <MapPin />
            <span>{country}</span>
          </div>

          <div className="destination-description">{description