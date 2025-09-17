ardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Top Tourist Spots</h3>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {destination.topSpots.map((spot, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-md border border-border/50 bg-background/50">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {i + 1}
                        </span>
                        <span className="text-sm text-foreground/90">{spot}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {destination.touristPlaces && destination.touristPlaces.length > 0 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Camera className="w-5 h-5 mr-2" />
                    Must-Visit Tourist Places
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                    {destination.touristPlaces.map((place, i) => (
                      <div key={i} className="p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-background/70 transition-colors">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{getCategoryIcon(place.category)}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">{place.name}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{place.description}</p>
                            <Badge variant="outline" className="mt-2 text-xs capitalize">
                              {place.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {destination.activities && destination.activities.length > 0 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Things to Do
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.activities.map((activity, i) => (
                      <Badge key={i} variant="secondary" className="text-sm">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {destination.localCuisine && destination.localCuisine.length > 0 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Utensils className="w-5 h-5 mr-2" />
                    Local Cuisine & Specialties
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {destination.localCuisine.map((food, i) => (
                      <div key={i} className="p-3 rounded-md bg-muted/50 text-center">
                        <span className="text-sm font-medium">{food}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {destination.nearbyAttractions && destination.nearbyAttractions.length > 0 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Navigation className="w-5 h-5 mr-2" />
                    Nearby Attractions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.nearbyAttractions.map((attraction, i) => (
                      <Badge key={i} variant="outline" className="text-sm">
                        📍 {attraction}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {destination.travelTips && destination.travelTips.length > 0 && (
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Travel Tips
                  </h3>
                  <ul className="space-y-2">
                    {destination.travelTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">💡</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {/* Travel Progress Sidebar - Only show if plan exists and is ongoing */}
            {currentPlan && currentPlan.status === 'ongoing' && (
              <Card className="bg-gradient-ocean text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Journey Progress
                  </h3>
                  
                  <Progress value={getStepProgress()} className="mb-4 bg-white/20" />
                  
                  <div className="space-y-3">
                    <div className="text-sm">
                      <div className="font-semibold mb-2">Current Phase:</div>
                      <div className="bg-white/10 p-3 rounded-lg">
                        <div className="font-medium">Explore & Experience</div>
                        <div className="text-xs opacity-90 mt-1">Visit attractions, try local cuisine, and immerse in culture</div>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <div className="font-semibold mb-2">Next Steps:</div>
                      <ul className="space-y-1 text-xs opacity-90">
                        <li>• Visit the cultural highlights listed below</li>
                        <li>• Try recommended local cuisines</li>
                        <li>• Take photos at must-visit places</li>
                        <li>• Follow the travel tips for best experience</li>
                      </ul>
                    </div>
                    
                    <Button 
                      onClick={handleCompleteJourney}
                      className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
                    >
                      Mark Journey Complete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-2" />Best time</span>
                  <span>{destination.bestTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center"><BedDouble className="w-4 h-4 mr-2" />Room rent</span>
                  <span>{rentText}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center"><Users className="w-4 h-4 mr-2" />Ideal group</span>
                  <span>{destination.idealGroupSize || 'Any'}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center"><Shield className="w-4 h-4 mr-2" />Safety</span>
                  <span className="capitalize">{destination.safetyLevel}</span>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              {!currentPlan ? (
                <>
                  <Button className="flex-1" onClick={handleAdd}>Add to Plans</Button>
                  <Button variant="secondary" onClick={() => navigate('/dashboard?tab=ongoing')}>Get Going Plans</Button>
                </>
              ) : (
                <>
                  {currentPlan.status === 'selected' && (
                    <Button className="flex-1" onClick={handleStartJourney}>Start Journey</Button>
                  )}
                  {currentPlan.status === 'ongoing' && (
                    <Button className="flex-1" onClick={handleCompleteJourney}>Complete Journey</Button>
                  )}
                  <Button variant="outline" onClick={() => navigate('/dashboard')}>
                    View Dashboard
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;
 