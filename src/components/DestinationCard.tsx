import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Heart, Plus, Check } from "lucide-react";
import { usePlans } from "@/contexts/PlanContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      const newPlan = addPlan({
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

      // Wait for state to update before navigating
      setTimeout(() => {
        updatePlanStatus(newPlan.id, "ongoing");
        navigate("/dashboard?tab=ongoing");
      }, 200);
      return;
    }

    updatePlanStatus(existing.id, "ongoing");
    navigate("/dashboard?tab=ongoing");
  };

  const safetyColor = {
    high: "#32ba7c",
    medium: "#f1c232",
    low: "#e65151",
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.src !== "/placeholder.svg") target.src = "/placeholder.svg";
  };

  return (
    <Card className={`destination-card h-full ${isMounted ? "fade-in" : ""}`}>
      <style>{`
        .destination-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.18);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .destination-card:hover {
          transform: translateY(-12px) scale(1.01);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
          background: rgba(255, 255, 255, 0.15);
        }
        .fade-in {
          animation: fadeInUp 0.6s ease both;
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
        .destination-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .destination-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .destination-card:hover .destination-img {
          transform: scale(1.05);
        }
        .destination-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(90deg, #ff7eb3, #ff758c);
          color: #fff;
          font-weight: 600;
          border-radius: 999px;
          padding: 6px 12px;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .destination-title {
          font-size: 1.35rem;
          font-weight: 700;
          margin: 0;
          color: rgba(255, 255, 255, 0.95);
        }
        .destination-location {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 6px 0 10px;
        }
        .destination-description {
          font-size: 0.95rem;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .destination-info-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 16px;
        }
        .safety {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          text-transform: capitalize;
        }
        .safety-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .destination-buttons {
          display: flex;
          gap: 12px;
        }
        .destination-btn {
          flex: 1;
          border-radius: 1rem;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.7rem;
          transition: all 0.3s;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .destination-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.2);
        }
        .destination-btn:after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.4s ease, height 0.4s ease;
        }
        .destination-btn:hover:after {
          width: 200%;
          height: 200%;
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

      <div className="destination-body p-5 flex flex-col flex-grow justify-between">
        <div>
          <h2 className="destination-title">{name}</h2>
          <div className="destination-location">
            <MapPin /> <span>{country}</span>
          </div>
          <div className="destination-description">{description}</div>
        </div>

        <div>
          <div className="destination-info-row">
            <span>
              <Clock style={{ width: 16, height: 16 }} /> {bestTime}
            </span>
            <span>💰 {priceRange}</span>
            <div
              className="safety"
              style={{ color: safetyColor[safetyLevel] }}
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
                navigate(`/destination/${encodeURIComponent(country)}/${encodeURIComponent(name)}`)
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
