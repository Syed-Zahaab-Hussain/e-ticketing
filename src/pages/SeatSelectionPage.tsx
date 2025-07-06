import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Wifi, 
  Coffee, 
  Zap,
  AlertCircle,
  User
} from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import { getTripById, type BusTripDetails } from '@/lib/mock-trips';

interface Seat {
  id: string;
  number: string;
  row: number;
  position: 'left' | 'right' | 'aisle';
  type: 'regular';
  status: 'available' | 'booked' | 'selected';
  price: number;
}

// Generate mock seat layout
const generateSeatLayout = (totalSeats: number, price: number, bookedSeats: string[] = []): Seat[] => {
  const seats: Seat[] = [];
  const seatsPerRow = 4; // 2 on left, 2 on right
  const rows = Math.ceil(totalSeats / seatsPerRow);
  
  for (let row = 1; row <= rows; row++) {
    for (let pos = 1; pos <= seatsPerRow; pos++) {
      const seatNumber = `${row}${String.fromCharCode(64 + pos)}`; // 1A, 1B, 1C, 1D
      const seatId = `seat-${row}-${pos}`;
      
      if (seats.length >= totalSeats) break;
      
      seats.push({
        id: seatId,
        number: seatNumber,
        row,
        position: pos <= 2 ? 'left' : 'right',
        type: 'regular',
        status: bookedSeats.includes(seatNumber) ? 'booked' : 'available',
        price
      });
    }
  }
  
  return seats;
};

export default function SeatSelectionPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<BusTripDetails | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedBoardingPoint, setSelectedBoardingPoint] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Get search context from URL parameters
  const from = searchParams.get('from') || 'Departure City';
  const to = searchParams.get('to') || 'Arrival City';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Fetch trip details and seat layout
    const fetchTripData = async () => {
      setIsLoading(true);
      try {
        if (!tripId) {
          throw new Error('Trip ID not provided');
        }

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const tripDetails = getTripById(tripId);
        if (!tripDetails) {
          throw new Error('Trip not found');
        }

        // Use dynamic from/to/date from search params, but other details from trip data
        const tripWithSearchContext = {
          ...tripDetails,
          from,
          to,
          date
        };

        const bookedSeats = ['1A', '1B', '2C', '3A', '4D', '5B', '6A', '7C']; // Mock booked seats
        const seatLayout = generateSeatLayout(tripDetails.totalSeats, tripDetails.price, bookedSeats);
        
        setTrip(tripWithSearchContext);
        setSeats(seatLayout);
      } catch (error) {
        console.error('Error fetching trip data:', error);
        navigate('/search-results');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripData();
  }, [tripId, from, to, date, navigate]);

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === 'booked') return;

    setSeats(prevSeats => 
      prevSeats.map(s => {
        if (s.id === seatId) {
          const newStatus = s.status === 'selected' ? 'available' : 'selected';
          return { ...s, status: newStatus };
        }
        return s;
      })
    );

    setSelectedSeats(prev => {
      const seatNumber = seat.number;
      if (prev.includes(seatNumber)) {
        return prev.filter(s => s !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  const getSeatClassName = (seat: Seat) => {
    const baseClasses = "w-10 h-10 rounded-lg border-2 flex items-center justify-center text-xs font-medium cursor-pointer transition-all duration-200 hover:scale-105";
    
    switch (seat.status) {
      case 'available':
        return `${baseClasses} border-border bg-background hover:border-primary hover:bg-primary/10 text-foreground`;
      case 'selected':
        return `${baseClasses} border-primary bg-primary text-primary-foreground shadow-lg`;
      case 'booked':
        return `${baseClasses} border-muted bg-muted text-muted-foreground cursor-not-allowed opacity-60`;
      default:
        return baseClasses;
    }
  };

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

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seatNumber) => {
      const seat = seats.find(s => s.number === seatNumber);
      return total + (seat?.price || 0);
    }, 0);
  };

  const handleProceedToBooking = () => {
    if (selectedSeats.length === 0 || !selectedBoardingPoint || !tripId) return;
    
    // Navigate to passenger details page with all necessary data
    const searchParamsForBooking = new URLSearchParams({
      tripId,
      seats: selectedSeats.join(','),
      totalPrice: calculateTotalPrice().toString(),
      boardingPoint: selectedBoardingPoint,
      from,
      to,
      date
    });
    
    navigate(`/book/passenger-details?${searchParamsForBooking.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading seat layout...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Trip not found. Please go back and select a valid trip.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const rows = Math.ceil(trip.totalSeats / 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to={`/search-results?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`}
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Search Results
          </Link>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Select Your Seats
          </h1>
          <p className="text-muted-foreground">
            Choose your preferred seats and boarding point for your journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Trip Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trip Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {trip.operatorName.charAt(0)}
                    </span>
                  </div>
                  <span>{trip.operatorName}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-lg font-bold">{trip.departureTime}</div>
                    <div className="text-sm text-muted-foreground">{trip.from}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">{trip.duration}</div>
                    <div className="w-16 h-px bg-border my-1"></div>
                    <div className="text-xs text-muted-foreground">Direct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{trip.arrivalTime}</div>
                    <div className="text-sm text-muted-foreground">{trip.to}</div>
                  </div>
                </div>

                <Separator />

                {/* Boarding Point Selection */}
                <div className="space-y-2">
                  <Label htmlFor="boarding-point" className="text-sm font-medium">
                    Select Boarding Point
                  </Label>
                  <Select value={selectedBoardingPoint} onValueChange={setSelectedBoardingPoint}>
                    <SelectTrigger id="boarding-point">
                      <SelectValue placeholder="Choose your boarding location" />
                    </SelectTrigger>
                    <SelectContent>
                      {trip.boardingPoints.map((point, index) => (
                        <SelectItem key={index} value={point}>
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{point.split(' - ')[0]}</span>
                            <span className="text-xs text-muted-foreground">
                              {point.split(' - ')[1]}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Bus Type</span>
                    <span className="text-sm font-medium">{trip.busType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-medium">
                      {new Date(trip.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{trip.rating}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="text-sm font-medium mb-2">Amenities</div>
                  <div className="flex flex-wrap gap-2">
                    {trip.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-1 bg-secondary/50 px-2 py-1 rounded text-xs">
                        {getAmenityIcon(amenity)}
                        <span className="capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seat Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seat Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded border-2 border-border bg-background"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded border-2 border-primary bg-primary"></div>
                  <span className="text-sm">Selected</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded border-2 border-muted bg-muted opacity-60"></div>
                  <span className="text-sm">Booked</span>
                </div>
              </CardContent>
            </Card>

            {/* Selection Summary */}
            {selectedSeats.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Selection Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Selected Seats</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(seatNumber => (
                        <Badge key={seatNumber} variant="secondary">
                          {seatNumber}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedBoardingPoint && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Boarding Point</div>
                      <div className="text-sm font-medium">
                        {selectedBoardingPoint.split(' - ')[0]}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {selectedBoardingPoint.split(' - ')[1]}
                      </div>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Seats ({selectedSeats.length})</span>
                      <span>${calculateTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${calculateTotalPrice()}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleProceedToBooking}
                    disabled={selectedSeats.length === 0 || !selectedBoardingPoint}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Enter Passenger Details
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Seat Layout */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Bus Layout</span>
                  <Badge variant="outline">
                    {selectedSeats.length} of {trip.availableSeats} available seats selected
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Driver Section */}
                <div className="mb-8">
                  <div className="bg-secondary/30 rounded-lg p-4 text-center">
                    <div className="text-sm text-muted-foreground mb-2">Driver</div>
                    <div className="w-12 h-8 bg-primary/20 rounded mx-auto"></div>
                  </div>
                </div>

                {/* Seat Grid */}
                <div className="space-y-4">
                  {Array.from({ length: rows }, (_, rowIndex) => {
                    const rowNumber = rowIndex + 1;
                    const rowSeats = seats.filter(seat => seat.row === rowNumber);
                    
                    return (
                      <div key={rowNumber} className="flex items-center justify-center space-x-4">
                        {/* Row Number */}
                        <div className="w-8 text-center text-sm text-muted-foreground font-medium">
                          {rowNumber}
                        </div>
                        
                        {/* Left Side Seats */}
                        <div className="flex space-x-2">
                          {rowSeats.slice(0, 2).map(seat => (
                            <div
                              key={seat.id}
                              className={getSeatClassName(seat)}
                              onClick={() => handleSeatClick(seat.id)}
                              title={`Seat ${seat.number} - $${seat.price}`}
                            >
                              {seat.number.slice(-1)}
                            </div>
                          ))}
                        </div>

                        {/* Aisle */}
                        <div className="w-8 text-center">
                          <div className="h-px bg-border"></div>
                        </div>

                        {/* Right Side Seats */}
                        <div className="flex space-x-2">
                          {rowSeats.slice(2, 4).map(seat => (
                            <div
                              key={seat.id}
                              className={getSeatClassName(seat)}
                              onClick={() => handleSeatClick(seat.id)}
                              title={`Seat ${seat.number} - $${seat.price}`}
                            >
                              {seat.number.slice(-1)}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}