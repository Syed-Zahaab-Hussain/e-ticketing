import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, MapPin, Users, Wifi, Coffee, Zap, Star, Filter } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import { getSearchResults, type BusTripSearchResult } from '@/lib/mock-trips';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [filteredTrips, setFilteredTrips] = useState<BusTripSearchResult[]>([]);
  const [sortBy, setSortBy] = useState('price');
  const [filterBy, setFilterBy] = useState('all');
  const navigate = useNavigate();

  const from = searchParams.get('from') || 'Departure City';
  const to = searchParams.get('to') || 'Arrival City';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

  useEffect(() => {
    const trips = getSearchResults({
      sortBy: sortBy as 'price' | 'duration' | 'departure' | 'rating',
      filterBy: filterBy as 'all' | 'ac' | 'sleeper' | 'wifi'
    });
    setFilteredTrips(trips);
  }, [sortBy, filterBy]);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'charging':
        return <Zap className="h-4 w-4" />;
      case 'meals':
        return <Coffee className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSelectSeats = (tripId: string) => {
    // Pass the search parameters along to maintain context
    const seatSelectionUrl = `/book/${tripId}/seats?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`;
    navigate(seatSelectionUrl);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Search
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Available Buses
              </h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">{from}</span>
                  <span>→</span>
                  <span className="font-medium">{to}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(date)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Badge variant="secondary" className="px-3 py-1">
                {filteredTrips.length} buses found
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filters & Sort</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sort Options */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Sort by
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Price (Low to High)</SelectItem>
                      <SelectItem value="duration">Duration (Shortest)</SelectItem>
                      <SelectItem value="departure">Departure Time</SelectItem>
                      <SelectItem value="rating">Rating (Highest)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter Options */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Filter by
                  </label>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Buses</SelectItem>
                      <SelectItem value="ac">AC Buses</SelectItem>
                      <SelectItem value="sleeper">Sleeper Buses</SelectItem>
                      <SelectItem value="wifi">WiFi Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Price Range
                  </label>
                  <div className="text-sm text-muted-foreground">
                    $55 - $120
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bus Results */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredTrips.map((trip) => (
                <Card key={trip.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-6 items-center">
                      {/* Operator & Time Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="text-primary font-bold text-sm">
                              {trip.operatorName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{trip.operatorName}</h3>
                            <p className="text-sm text-muted-foreground">{trip.busType}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">{trip.departureTime}</div>
                            <div className="text-xs text-muted-foreground">{from}</div>
                          </div>
                          <div className="flex-1 text-center">
                            <div className="text-sm text-muted-foreground">{trip.duration}</div>
                            <div className="w-full h-px bg-border my-1"></div>
                            <div className="text-xs text-muted-foreground">Direct</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">{trip.arrivalTime}</div>
                            <div className="text-xs text-muted-foreground">{to}</div>
                          </div>
                        </div>
                      </div>

                      {/* Amenities & Rating */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{trip.rating}</span>
                          <span className="text-xs text-muted-foreground">({trip.reviewCount})</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {trip.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center space-x-1 bg-secondary/50 px-2 py-1 rounded text-xs">
                              {getAmenityIcon(amenity)}
                              <span className="capitalize">{amenity}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {trip.availableSeats} seats available
                          </span>
                        </div>
                      </div>

                      {/* Price & Book Button */}
                      <div className="text-center space-y-3">
                        <div>
                          <div className="text-2xl font-bold text-foreground">${trip.price}</div>
                          <div className="text-xs text-muted-foreground">per person</div>
                        </div>
                        
                        <Button 
                          className="w-full" 
                          size="lg"
                          onClick={() => handleSelectSeats(trip.id)}
                        >
                          Select Seats
                        </Button>
                        
                        <div className="text-xs text-muted-foreground">
                          {trip.availableSeats < 10 && (
                            <span className="text-orange-600 font-medium">
                              Only {trip.availableSeats} seats left!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredTrips.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-muted-foreground mb-4">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No buses found</h3>
                    <p>Try adjusting your filters or search criteria.</p>
                  </div>
                  <Button variant="outline" onClick={() => setFilterBy('all')}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}