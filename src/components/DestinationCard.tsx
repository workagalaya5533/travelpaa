import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Heart, Plus, Check } from "lucide-react";
import { usePlans } from "@/contexts/PlanContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const isSelected = selectedPlans.some(
    (plan) => plan.name === name && plan.region === country
  );

  // Glow effect
  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;

      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", x.toFixed(2));
        cardRef.current.style.setProperty(
          "--xp",
          (x / window.innerWidth).toFixed(2),
        );
        cardRef.current.style.setProperty("--y", y.toFixed(2));
        cardRef.current.style.setProperty(
          "--yp",
          (y / window.innerHeight).toFixed(2),
        );
      }
    };

    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

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
    high: "#32ba7c",
    medium: "#f1c232",
    low: "#e65151",
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.currentTarget;
    if (target.src !== "/placeholder.svg") target.src = "/placeholder.svg";
  };

  const glowStyles = {
    "--base": 220,
    "--spread": 200,
    "--radius": "14",
    "--border": "3",
    "--backdrop": "hsl(0 0% 60% / 0.12)",
    "--backup-border": "var(--backdrop)",
    "--size": "200",
    "--outer": "1",
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
    )`,
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize:
      "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative" as const,
    touchAction: "none" as const,
  };

  return (
    <>
      <style>{`
        [data-glow]::before,
        [data-glow]::after {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: calc(var(--border-size) * -1);
          border: var(--border-size) solid transparent;
          border-radius: calc(var(--radius) * 1px);
          background-attachment: fixed;
          background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
          background-repeat: no-repeat;
          background-position: 50% 50%;
          mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
          mask-clip: padding-box, border-box;
          mask-composite: intersect;
        }
        
        [data-glow]::before {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
          );
          filter: brightness(2);
        }
        
        [data-glow]::after {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
          );
        }
        
        [data-glow] [data-glow] {
          position: absolute;
          inset: 0;
          will-change: filter;
          opacity: var(--outer, 1);
          border-radius: calc(var(--radius) * 1px);
          border-width: calc(var(--border-size) * 20);
          filter: blur(calc(var(--border-size) * 10));
          background: none;
          pointer-events: none;
          border: none;
        }
        
        [data-glow] > [data-glow]::before {
          inset: -10px;
          border-width: 10px;
        }

        .destination-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          width: 100%;
          height: 100%;
          font-family: 'Inter', Arial, sans-serif;
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .destination-card:hover {
          transform: translateY(-6px);
        }

        /* Image */
        .destination-img-wrap {
          position: relative;
          height: 200px;
          width: 100%;
          overflow: hidden;
          background: #f2f4f7;
          flex-shrink: 0;
        }
        .destination-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Top-right match pill */
        .destination-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #1f1f1f;
          color: #fff;
          font-weight: 700;
          border-radius: 999px;
          padding: 6px 12px;
          font-size: 0.86rem;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 6px 14px rgba(0,0,0,0.2);
        }

        /* Body */
        .destination-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: space-between;
        }

        /* Title + Location block */
        .destination-title {
          font-size: 1.35rem;
          font-weight: 1500;
          margin: 0;
          color: #101828;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .destination-location {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.92rem;
          font-weight: 500;
          color: #6b7280; /* muted gray */
          margin-top: 6px;   /* tight under title */
          margin-bottom: 10px; /* space above description */
        }
        .destination-location svg {
          width: 16px;
          height: 16px;
          flex: 0 0 16px;
          vertical-align: middle;
        }

        /* Description */
        .destination-description {
          font-size: 0.96rem;
          line-height: 1.55;
          color: #303030;
          margin: 0 0 12px 0;
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
          padding-top: 12px;
        }

        /* Meta row (time, price, safety) */
        .destination-info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.92rem;
          color: #475d69;
          gap: 10px;
          margin-bottom: 16px;
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
        }
        .safety {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
        }
        .safety-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          display: inline-block;
        }

        /* Buttons */
        .destination-buttons {
          display: flex;
          gap: 12px;
        }
        .destination-btn {
          flex: 1;
          border-radius: 0.8rem;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.7rem;
          transition: transform 0.15s ease;
          min-height: 44px;
        }
        .destination-btn:hover:not(:disabled) {
          transform: translateY(-1px);
        }
        .destination-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      <div
        ref={cardRef}
        data-glow
        style={glowStyles}
        className="rounded-2xl relative shadow-[0_1rem_2rem_-1rem_black] backdrop-blur-[5px] h-full"
      >
        <div ref={innerRef} data-glow></div>
        
        <div className="destination-card h-full">
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

              {/* state name under the title with pin */}
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
        </div>
      </div>
    </>
  );
};