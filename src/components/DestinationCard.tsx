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
    high: "rgba(50, 186, 124, 0.9)",
    medium: "rgba(241, 194, 50, 0.9)",
    low: "rgba(230, 81, 81, 0.9)",
  };

  const getSafetyIcon = () => {
    switch (safetyLevel) {
      case "high":
        return "🟢";
      case "medium":
        return "🟡";
      case "low":
        return "🔴";
      default:
        return "";
    }
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
        .destination-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 1.25rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          width: 100%;
          height: 100%;
          font-family: 'Inter', Arial, sans-serif;
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .destination-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.25rem;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.1) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        
        .destination-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          background: rgba(255, 255, 255, 0.15);
        }

        /* Image */
        .destination-img-wrap {
          position: relative;
          height: 200px;
          width: 100%;
          overflow: hidden;
          flex-shrink: 0;
        }
        
        .destination-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }
        
        .destination-card:hover .destination-img {
          transform: scale(1.05);
        }

        /* Glass overlay on image */
        .destination-img-wrap::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.6) 0%,
            transparent 100%
          );
          pointer-events: none;
        }

        /* Top-right match pill */
        .destination-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #fff;
          font-weight: 700;
          border-radius: 999px;
          padding: 8px 16px;
          font-size: 0.86rem;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        /* Body */
        .destination-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.05);
        }

        /* Title + Location block */
        .destination-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 0;
          color: #1a1a1a;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        
        .destination-location {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.92rem;
          font-weight: 500;
          color: #4a5568;
          margin-top: 8px;
          margin-bottom: 12px;
        }
        
        .destination-location svg {
          width: 16px;
          height: 16px;
          flex: 0 0 16px;
          vertical-align: middle;
          color: #718096;
        }

        /* Description */
        .destination-description {
          font-size: 0.96rem;
          line-height: 1.6;
          color: #2d3748;
          margin: 0 0 16px 0;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Content wrapper for consistent spacing */
        .destination-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        /* Bottom section */
        .destination-bottom {
          margin-top: auto;
          padding-top: 16px;
        }

        /* Meta row (time, price, safety) */
        .destination-info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.92rem;
          color: #4a5568;
          gap: 10px;
          margin-bottom: 20px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .meta-left {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          white-space: nowrap;
        }
        
        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
        }
        
        .meta-item svg {
          color: #718096;
        }
        
        .safety {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        
        .safety-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          display: inline-block;
          box-shadow: 0 0 8px currentColor;
        }

        /* Buttons */
        .destination-buttons {
          display: flex;
          gap: 12px;
        }
        
        .destination-btn {
          flex: 1;
          border-radius: 0.75rem;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.75rem;
          min-height: 44px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #1a1a1a;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        
        .destination-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 100%
          );
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .destination-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .destination-btn:hover:not(:disabled)::before {
          opacity: 1;
        }
        
        .destination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: rgba(255, 255, 255, 0.1);
        }
        
        /* Icon styling in buttons */
        .destination-btn svg {
          width: 16px;
          height: 16px;
          margin-right: 6px;
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
                  <Check style={{ width: 16, height