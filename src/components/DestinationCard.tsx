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
    high: "#34c759",
    medium: "#ff9500",
    low: "#ff3b30",
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
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 22px;
          border: 0.5px solid rgba(255, 255, 255, 0.6);
          box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.1),
            0 1px 2px rgba(0, 0, 0, 0.05),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.8);
          width: 100%;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative;
        }
        
        .destination-card:hover {
          transform: translateY(-8px);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.15),
            0 4px 16px rgba(0, 0, 0, 0.08),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.85);
          border-color: rgba(255, 255, 255, 0.8);
        }

        /* iOS-style Image Container */
        .destination-img-wrap {
          position: relative;
          height: 200px;
          width: 100%;
          overflow: hidden;
          background: rgba(242, 242, 247, 0.8);
          flex-shrink: 0;
          border-radius: 20px 20px 0 0;
        }
        
        .destination-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }
        
        .destination-card:hover .destination-img {
          transform: scale(1.03);
        }

        /* iOS Match Badge */
        .destination-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          color: #ffffff;
          font-weight: 600;
          border-radius: 18px;
          padding: 8px 14px;
          font-size: 13px;
          line-height: 1.2;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.2),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.1);
          border: 0.5px solid rgba(255, 255, 255, 0.15);
          transition: all 0.2s ease;
        }
        
        .destination-badge:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: scale(1.02);
        }

        /* iOS Body Styling */
        .destination-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          position: relative;
        }

        /* Clean Typography */
        .destination-title {
          font-size: 22px;
          font-weight: 600;
          margin: 0;
          color: #1d1d1f;
          letter-spacing: -0.022em;
          line-height: 1.18;
        }
        
        .destination-location {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          font-weight: 400;
          color: #86868b;
          margin-top: 4px;
          margin-bottom: 12px;
        }
        
        .destination-location svg {
          width: 14px;
          height: 14px;
          flex: 0 0 14px;
          vertical-align: middle;
          opacity: 0.8;
        }

        /* iOS Description */
        .destination-description {
          font-size: 15px;
          line-height: 1.47;
          color: #515154;
          margin: 0 0 16px 0;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .destination-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .destination-bottom {
          margin-top: auto;
          padding-top: 16px;
        }

        /* iOS Info Panel */
        .destination-info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          color: #86868b;
          gap: 12px;
          margin-bottom: 16px;
          padding: 12px 16px;
          background: rgba(242, 242, 247, 0.6);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: 14px;
          border: 0.5px solid rgba(255, 255, 255, 0.5);
          box-shadow: inset 0 0.5px 0 rgba(255, 255, 255, 0.8);
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
          font-weight: 400;
        }
        
        .safety {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 10px;
          border: 0.5px solid rgba(255, 255, 255, 0.6);
          font-size: 12px;
        }
        
        .safety-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }

        /* iOS Buttons */
        .destination-buttons {
          display: flex;
          gap: 8px;
        }
        
        .destination-btn {
          flex: 1;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 500;
          padding: 12px 16px;
          min-height: 44px;
          background: rgba(0, 122, 255, 1);
          border: none;
          color: #ffffff;
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 2px 8px rgba(0, 122, 255, 0.3),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.2);
        }
        
        .destination-btn:nth-child(1) {
          background: rgba(0, 122, 255, 1);
          box-shadow: 
            0 2px 8px rgba(0, 122, 255, 0.3),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.2);
        }
        
        .destination-btn:nth-child(2) {
          background: rgba(52, 199, 89, 1);
          box-shadow: 
            0 2px 8px rgba(52, 199, 89, 0.3),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.2);
        }
        
        .destination-btn:nth-child(3) {
          background: rgba(142, 142, 147, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 0.5px solid rgba(255, 255, 255, 0.4);
          color: #1d1d1f;
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.1),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.6);
        }
        
        .destination-btn:hover:not(:disabled) {
          transform: scale(0.98);
          opacity: 0.8;
        }
        
        .destination-btn:active:not(:disabled) {
          transform: scale(0.96);
        }
        
        .destination-btn:disabled {
          background: rgba(52, 199, 89, 1);
          opacity: 1;
          cursor: default;
          box-shadow: 
            0 2px 8px rgba(52, 199, 89, 0.3),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.2);
        }
        
        .destination-btn:disabled:hover {
          transform: none;
          opacity: 1;
        }

        /* iOS Animations */
        @media (prefers-reduced-motion: no-preference) {
          .destination-card {
            animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .destination-card {
            background: rgba(28, 28, 30, 0.8);
            border-color: rgba(255, 255, 255, 0.1);
            box-shadow: 
              0 10px 40px rgba(0, 0, 0, 0.3),
              0 1px 2px rgba(0, 0, 0, 0.2),
              inset 0 0.5px 0 rgba(255, 255, 255, 0.1);
          }
          
          .destination-card:hover {
            background: rgba(28, 28, 30, 0.85);
            border-color: rgba(255, 255, 255, 0.15);
          }
          
          .destination-title {
            color: #f2f2f7;
          }
          
          .destination-location {
            color: #98989d;
          }
          
          .destination-description {
            color: #adadb3;
          }
          
          .destination-info-row {
            background: rgba(44, 44, 46, 0.6);
            color: #98989d;
            border-color: rgba(255, 255, 255, 0.1);
            box-shadow: inset 0 0.5px 0 rgba(255, 255, 255, 0.1);
          }
          
          .safety {
            background: rgba(44, 44, 46, 0.8);
            border-color: rgba(255, 255, 255, 0.15);
          }
          
          .destination-btn:nth-child(3) {
            background: rgba(58, 58, 60, 0.8);
            color: #f2f2f7;
            border-color: rgba(255, 255, 255, 0.2);
          }
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .destination-card,
          .destination-img,
          .destination-badge,
          .destination-btn {
            transition: none;
          }
          
          .destination-card:hover {
            transform: none;
          }
          
          .destination-card:hover .destination-img {
            transform: none;
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
          <Heart style={{ height: 14, width: 14 }} />
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
                <Clock style={{ width: 14, height: 14 }} />
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