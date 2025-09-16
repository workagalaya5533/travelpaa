import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Users, Car, Plane, Train, Bus, MapPin, Clock, DollarSign, Heart } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TravelPlanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (planDetails: TravelPlanDetails) => void;
  destination: {
    name: string;
    country: string;
    image: string;
    bestTime: string;
    priceRange: string;
  };
}

export interface TravelPlanDetails {
  numberOfPeople: number;
  travelDates: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  transportMode: string;
  budget: string;
  accommodation: string;
  specialRequests: string;
  interests: string[];
  emergencyContact: {
    name: string;
    phone: string;
  };
}

const transportOptions = [
  { value: "flight", label: "Flight", icon: Plane, description: "Fastest option" },
  { value: "train", label: "Train", icon: Train, description: "Scenic and comfortable" },
  { value: "bus", label: "Bus", icon: Bus, description: "Budget-friendly" },
  { value: "car", label: "Private Car", icon: Car, description: "Flexible timing" },
];

const budgetOptions = [
  { value: "budget", label: "Budget (₹5,000-15,000)", description: "Essential experiences" },
  { value: "mid-range", label: "Mid-range (₹15,000-35,000)", description: "Comfortable travel" },
  { value: "luxury", label: "Luxury (₹35,000+)", description: "Premium experiences" },
];

const accommodationOptions = [
  { value: "hotel", label: "Hotel", description: "Full service" },
  { value: "resort", label: "Resort", description: "All-inclusive" },
  { value: "homestay", label: "Homestay", description: "Local experience" },
  { value: "hostel", label: "Hostel", description: "Budget option" },
  { value: "airbnb", label: "Airbnb", description: "Home-like stay" },
];

const interestOptions = [
  "Adventure Sports", "Cultural Sites", "Local Cuisine", "Photography", 
  "Nature & Wildlife", "Shopping", "Nightlife", "Wellness & Spa",
  "Historical Places", "Religious Sites", "Art & Museums", "Beach Activities"
];

export const TravelPlanningModal = ({ isOpen, onClose, onConfirm, destination }: TravelPlanningModalProps) => {
  const [step, setStep] = useState(1);
  const [planDetails, setPlanDetails] = useState<TravelPlanDetails>({
    numberOfPeople: 1,
    travelDates: { startDate: undefined, endDate: undefined },
    transportMode: "",
    budget: "",
    accommodation: "",
    specialRequests: "",
    interests: [],
    emergencyContact: { name: "", phone: "" },
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirm = () => {
    onConfirm(planDetails);
    onClose();
  };

  const toggleInterest = (interest: string) => {
    setPlanDetails(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return planDetails.numberOfPeople > 0 && planDetails.travelDates.startDate && planDetails.travelDates.endDate;
      case 2:
        return planDetails.transportMode && planDetails.budget;
      case 3:
        return planDetails.accommodation && planDetails.interests.length > 0;
      case 4:
        return planDetails.emergencyContact.name && planDetails.emergencyContact.phone;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <MapPin className="w-6 h-6 text-primary" />
            Plan Your Journey to {destination.name}
          </DialogTitle>
        </DialogHeader>

        {/* Destination Preview */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{destination.name}</h3>
                <p className="text-muted-foreground">{destination.country}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {destination.bestTime}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {destination.priceRange}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                stepNum <= step ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {stepNum}
              </div>
              {stepNum < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  stepNum < step ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Users className="w-5 h-5" />
                Travel Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="people">Number of People</Label>
                  <Input
                    id="people"
                    type="number"
                    min="1"
                    max="20"
                    value={planDetails.numberOfPeople}
                    onChange={(e) => setPlanDetails(prev => ({ ...prev, numberOfPeople: parseInt(e.target.value) || 1 }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !planDetails.travelDates.startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {planDetails.travelDates.startDate ? format(planDetails.travelDates.startDate, "PPP") : "Pick start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={planDetails.travelDates.startDate}
                        onSelect={(date) => setPlanDetails(prev => ({ 
                          ...prev, 
                          travelDates: { ...prev.travelDates, startDate: date }
                        }))}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !planDetails.travelDates.endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {planDetails.travelDates.endDate ? format(planDetails.travelDates.endDate, "PPP") : "Pick end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={planDetails.travelDates.endDate}
                        onSelect={(date) => setPlanDetails(prev => ({ 
                          ...prev, 
                          travelDates: { ...prev.travelDates, endDate: date }
                        }))}
                        disabled={(date) => date < (planDetails.travelDates.startDate || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Car className="w-5 h-5" />
                Transport & Budget
              </h3>
              
              <div>
                <Label className="text-base font-medium mb-3 block">Preferred Transport</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {transportOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <Card 
                        key={option.value}
                        className={`cursor-pointer transition-all ${
                          planDetails.transportMode === option.value 
                            ? 'border-primary bg-primary/5' 
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => setPlanDetails(prev => ({ ...prev, transportMode: option.value }))}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-primary" />
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-muted-foreground">{option.description}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Budget Range</Label>
                <div className="space-y-2">
                  {budgetOptions.map((option) => (
                    <Card 
                      key={option.value}
                      className={`cursor-pointer transition-all ${
                        planDetails.budget === option.value 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => setPlanDetails(prev => ({ ...prev, budget: option.value }))}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-muted-foreground">{option.description}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Preferences
              </h3>
              
              <div>
                <Label className="text-base font-medium mb-3 block">Accommodation Type</Label>
                <Select value={planDetails.accommodation} onValueChange={(value) => setPlanDetails(prev => ({ ...prev, accommodation: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select accommodation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {accommodationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Interests (Select at least 1)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {interestOptions.map((interest) => (
                    <Badge
                      key={interest}
                      variant={planDetails.interests.includes(interest) ? "default" : "outline"}
                      className="cursor-pointer p-2 text-center justify-center hover:bg-primary/10"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                <Textarea
                  id="special-requests"
                  placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
                  value={planDetails.specialRequests}
                  onChange={(e) => setPlanDetails(prev => ({ ...prev, specialRequests: e.target.value }))}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Emergency Contact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergency-name">Contact Name</Label>
                  <Input
                    id="emergency-name"
                    placeholder="Full name"
                    value={planDetails.emergencyContact.name}
                    onChange={(e) => setPlanDetails(prev => ({ 
                      ...prev, 
                      emergencyContact: { ...prev.emergencyContact, name: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="emergency-phone">Phone Number</Label>
                  <Input
                    id="emergency-phone"
                    placeholder="+91 XXXXX XXXXX"
                    value={planDetails.emergencyContact.phone}
                    onChange={(e) => setPlanDetails(prev => ({ 
                      ...prev, 
                      emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
                    }))}
                  />
                </div>
              </div>

              {/* Summary */}
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Journey Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Destination:</strong> {destination.name}, {destination.country}</div>
                    <div><strong>Travelers:</strong> {planDetails.numberOfPeople} people</div>
                    <div><strong>Dates:</strong> {planDetails.travelDates.startDate && planDetails.travelDates.endDate 
                      ? `${format(planDetails.travelDates.startDate, "MMM dd")} - ${format(planDetails.travelDates.endDate, "MMM dd, yyyy")}`
                      : "Not selected"}</div>
                    <div><strong>Transport:</strong> {transportOptions.find(t => t.value === planDetails.transportMode)?.label}</div>
                    <div><strong>Budget:</strong> {budgetOptions.find(b => b.value === planDetails.budget)?.label}</div>
                    <div><strong>Accommodation:</strong> {accommodationOptions.find(a => a.value === planDetails.accommodation)?.label}</div>
                    <div><strong>Interests:</strong> {planDetails.interests.join(", ")}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={step === 1 ? onClose : handlePrevious}
          >
            {step === 1 ? "Cancel" : "Previous"}
          </Button>
          
          <Button 
            onClick={step === 4 ? handleConfirm : handleNext}
            disabled={!isStepValid()}
            className="bg-gradient-ocean text-white"
          >
            {step === 4 ? "Start Journey" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};