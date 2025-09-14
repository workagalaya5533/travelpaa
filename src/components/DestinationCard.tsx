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
    high: "#00ff88",
    medium: "#ffaa00",
    low: "#ff3366",
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
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;900&display=swap');
        
        .destination-card {
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.1) 100%
          );
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          border-radius: 2rem;
          border: 2px solid;
          border-image: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.3) 100%
          ) 1;
          box-shadow: 
            0 0 60px rgba(0, 255, 136, 0.1),
            0 16px 32px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          width: 100%;
          height: 100%;
          font-family: 'Orbitron', monospace;
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
        }
        
        .destination-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: conic-gradient(from 0deg at 50% 50%, 
            rgba(0, 255, 136, 0.1) 0deg,
            rgba(255, 0, 255, 0.1) 120deg,
            rgba(0, 136, 255, 0.1) 240deg,
            rgba(0, 255, 136, 0.1) 360deg
          );
          border-radius: 2rem;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: -1;
          animation: rotateGradient 10s linear infinite;
        }
        
        .destination-card:hover::before {
          opacity: 0.3;
        }
        
        @keyframes rotateGradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .destination-card:hover {
          transform: translateY(-12px) rotateX(5deg);
          box-shadow: 
            0 0 80px rgba(0, 255, 136, 0.2),
            0 24px 48px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          background: linear-gradient(145deg, 
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0.15) 100%
          );
        }

        /* Futuristic Image Container */
        .destination-img-wrap {
          position: relative;
          height: 220px;
          width: 100%;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 136, 255, 0.1));
          flex-shrink: 0;
          border-radius: 1.5rem 1.5rem 0 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .destination-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          filter: contrast(1.1) saturate(1.2);
        }
        
        .destination-card:hover .destination-img {
          transform: scale(1.08) rotate(1deg);
          filter: contrast(1.3) saturate(1.4) hue-rotate(5deg);
        }

        /* Neon Match Badge */
        .destination-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, 
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.5) 100%
          );
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          color: #00ff88;
          font-weight: 700;
          border-radius: 2rem;
          padding: 10px 18px;
          font-size: 0.9rem;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 
            0 0 20px rgba(0, 255, 136, 0.4),
            0 4px 20px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(0, 255, 136, 0.3);
          transition: all 0.4s ease;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 136, 0.4), 0 4px 20px rgba(0, 0, 0, 0.3); }
          50% { box-shadow: 0 0 30px rgba(0, 255, 136, 0.6), 0 4px 25px rgba(0, 0, 0, 0.4); }
        }
        
        .destination-badge:hover {
          background: linear-gradient(135deg, 
            rgba(0, 255, 136, 0.2) 0%,
            rgba(0, 255, 136, 0.1) 100%
          );
          transform: scale(1.1);
          box-shadow: 0 0 40px rgba(0, 255, 136, 0.6);
        }

        /* Cyberpunk Body */
        .destination-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
          background: linear-gradient(180deg, 
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.03) 100%
          );
          backdrop-filter: blur(15px);
          position: relative;
        }
        
        .destination-body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 20px;
          right: 20px;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%,
            rgba(0, 255, 136, 0.5) 50%,
            transparent 100%
          );
        }

        /* Glowing Title */
        .destination-title {
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
          letter-spacing: -0.02em;
          line-height: 1.2;
          text-shadow: 
            0 0 10px rgba(255, 255, 255, 0.3),
            0 2px 4px rgba(0, 0, 0, 0.5);
          background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: all 0.3s ease;
        }
        
        .destination-card:hover .destination-title {
          text-shadow: 
            0 0 15px rgba(255, 255, 255, 0.5),
            0 0 30px rgba(0, 255, 136, 0.3);
        }
        
        .destination-location {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
          font-weight: 500;
          color: #a0a9c0;
          margin-top: 10px;
          margin-bottom: 16px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .destination-location svg {
          width: 18px;
          height: 18px;
          flex: 0 0 18px;
          vertical-align: middle;
          opacity: 0.8;
          filter: drop-shadow(0 0 4px rgba(0, 255, 136, 0.3));
        }

        /* Holographic Description */
        .destination-description {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          line-height: 1.65;
          color: #d1d5db;
          margin: 0 0 20px 0;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
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

        /* Neon Info Panel */
        .destination-info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.95rem;
          color: #9ca3af;
          gap: 16px;
          margin-bottom: 24px;
          padding: 16px 20px;
          background: linear-gradient(135deg, 
            rgba(0, 255, 136, 0.1) 0%,
            rgba(0, 136, 255, 0.05) 50%,
            rgba(255, 0, 255, 0.1) 100%
          );
          backdrop-filter: blur(12px);
          border-radius: 1.2rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 4px 12px rgba(0, 0, 0, 0.15);
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
          font-weight: 500;
        }
        
        .meta-item svg {
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
        }
        
        .safety {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          padding: 8px 16px;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 0.85rem;
        }
        
        .safety-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 12px currentColor;
          animation: breathe 2s infinite;
        }
        
        @keyframes breathe {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        /* Cyberpunk Buttons */
        .destination-buttons {
          display: flex;
          gap: 14px;
        }
        
        .destination-btn {
          flex: 1;
          border-radius: 1.2rem;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 14px 20px;
          min-height: 52px;
          background: linear-gradient(135deg, 
            rgba(0, 255, 136, 0.2) 0%,
            rgba(0, 136, 255, 0.15) 50%,
            rgba(255, 0, 255, 0.2) 100%
          );
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: 'Orbitron', monospace;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
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
            rgba(255, 255, 255, 0.4) 50%,
            transparent 100%
          );
          transition: left 0.6s ease;
        }
        
        .destination-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(0, 255, 136, 0.1) 0%,
            rgba(255, 0, 255, 0.1) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 1.2rem;
        }
        
        .destination-btn:hover:not(:disabled) {
          transform: translateY(-3px) scale(1.02);
          background: linear-gradient(135deg, 
            rgba(0, 255, 136, 0.3) 0%,
            rgba(0, 136, 255, 0.25) 50%,
            rgba(255, 0, 255, 0.3) 100%
          );
          border-color: rgba(0, 255, 136, 0.6);
          box-shadow: 
            0 0 30px rgba(0, 255, 136, 0.4),
            0 12px 24px rgba(0, 0, 0, 0.2);
          text-shadow: 0 0 12px rgba(0, 255, 136, 0.6);
        }
        
        .destination-btn:hover:not(:disabled)::before {
          left: 100%;
        }
        
        .destination-btn:hover:not(:disabled)::after {
          opacity: 1;
        }
        
        .destination-btn:disabled {
          background: linear-gradient(135deg, 
            rgba(0, 255, 136, 0.4) 0%,
            rgba(0, 255, 136, 0.2) 100%
          );
          border-color: rgba(0, 255, 136, 0.5);
          color: #ffffff;
          cursor: not-allowed;
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
        }
        
        .destination-btn:active:not(:disabled) {
          transform: translateY(-1px) scale(1.01);
        }

        /* Holographic animations */
        @media (prefers-reduced-motion: no-preference) {
          .destination-card {
            animation: holographicEntry 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
          }
          
          .destination-card:nth-child(2) {
            animation-delay: 0.1s;
          }
          
          .destination-card:nth-child(3) {
            animation-delay: 0.2s;
          }
        }
        
        @keyframes holographicEntry {
          0% {
            opacity: 0;
            transform: translateY(50px) rotateX(-10deg);
            filter: blur(5px);
          }
          50% {
            opacity: 0.8;
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0);
            filter: blur(0);
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

          <div className="destination-description">{description}</div>
        </div>

        <div className="destination-bottom">
          <div className="destination-info-row">
            <div className="meta-left">
              <span className="meta-item">
                <Clock style={{ width: 16, height: 16 }} />
                {bestTime}
              </span>
              <span className="meta-item">💰 {priceRange}</span>
            </div>

            <div
              className="safety"
              style={{ color: safetyColor[safetyLevel] }}
              aria-label={`${safetyLevel} safety`}
            >
              <span
                className="safety-dot"
                style={{ backgroundColor: safetyColor[safetyLevel] }}
              />
              {safetyLevel} Safety
            </div>
          </div>

          <div className="destination-buttons">
            <Button
              className="destination-btn"
              onClick={() =>
                navigate(
                  `/destination/${encodeURIComponent(
                    country
                  )}/${encodeURIComponent(name)}`
                )
              }
            >
              View Details
            </Button>

            {!hideGetGoingPlans && (
              <Button className="destination-btn" onClick={handleGetGoingPlans}>
                Get Going
              </Button>
            )}

            <Button
              className="destination-btn"
              onClick={handleAddToPlan}
              disabled={isSelected}
            >
              {isSelected ? (
                <>
                  <Check style={{ width: 16, height: 16, marginRight: 6 }} />
                  Added
                </>
              ) : (
                <>
                  <Plus style={{ width: 16, height: 16, marginRight: 6 }} />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};