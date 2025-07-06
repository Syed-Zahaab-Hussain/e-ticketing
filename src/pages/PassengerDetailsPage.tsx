import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CreditCard,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Navbar from '@/components/landing/Navbar';

const passengerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type PassengerFormData = z.infer<typeof passengerSchema>;

interface BookingSummary {
  tripId: string;
  seats: string[];
  totalPrice: number;
  boardingPoint: string;
  operatorName: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
}

// Mock trip data - in real app, this would come from API
const mockTripData = {
  'trip-1': {
    operatorName: 'Express Lines',
    from: 'New York',
    to: 'Los Angeles',
    date: '2024-01-15',
    departureTime: '06:00 AM',
    arrivalTime: '02:30 PM',
    duration: '8h 30m'
  }
};

export default function PassengerDetailsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookingSummary, setBookingSummary] = useState<BookingSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PassengerFormData>({
    resolver: zodResolver(passengerSchema),
    mode: 'onChange'
  });

  useEffect(() => {
    // Extract booking details from URL parameters
    const tripId = searchParams.get('tripId');
    const seats = searchParams.get('seats')?.split(',') || [];
    const totalPrice = parseFloat(searchParams.get('totalPrice') || '0');
    const boardingPoint = searchParams.get('boardingPoint') || '';

    if (!tripId || seats.length === 0 || !totalPrice || !boardingPoint) {
      // Redirect back if missing required parameters
      navigate('/search-results');
      return;
    }

    // Simulate API call to get trip details
    const fetchTripDetails = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
        
        const tripData = mockTripData[tripId as keyof typeof mockTripData];
        if (!tripData) {
          throw new Error('Trip not found');
        }

        setBookingSummary({
          tripId,
          seats,
          totalPrice,
          boardingPoint,
          ...tripData
        });
      } catch (error) {
        console.error('Error fetching trip details:', error);
        navigate('/search-results');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripDetails();
  }, [searchParams, navigate]);

  const onSubmit = async (data: PassengerFormData) => {
    if (!bookingSummary) return;

    setIsSubmitting(true);
    try {
      // Simulate API call to create booking
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would:
      // 1. Create booking in database
      // 2. Process payment with Stripe
      // 3. Generate QR code
      // 4. Send confirmation email/SMS
      
      console.log('Booking data:', {
        passenger: data,
        booking: bookingSummary
      });

      // Navigate to payment page (will be implemented later)
      // For now, show success message
      alert('Booking details saved! Payment integration will be added with real database.');
      navigate('/passenger/dashboard');
      
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingSummary) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Booking details not found. Please start your booking process again.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to={`/book/${bookingSummary.tripId}/seats`}
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Seat Selection
          </Link>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Passenger Details
          </h1>
          <p className="text-muted-foreground">
            Enter your details to complete the booking
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Passenger Details Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>Passenger Information</span>
                </CardTitle>
                <CardDescription>
                  Please provide accurate details as they will appear on your ticket
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        {...register('firstName')}
                        className={errors.firstName ? 'border-destructive' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        {...register('lastName')}
                        className={errors.lastName ? 'border-destructive' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                          {...register('email')}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Your ticket and booking confirmation will be sent to this email
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          className={`pl-10 ${errors.phone ? 'border-destructive' : ''}`}
                          {...register('phone')}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone.message}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        We'll send booking updates and important notifications to this number
                      </p>
                    </div>
                  </div>

                  {/* Important Information */}
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> Please ensure all details are correct as they will be used for ticket verification during boarding.
                    </AlertDescription>
                  </Alert>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Proceed to Payment
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Trip Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Operator</span>
                    <span className="text-sm font-medium">{bookingSummary.operatorName}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Route</span>
                    <span className="text-sm font-medium">{bookingSummary.from} → {bookingSummary.to}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-medium">
                      {new Date(bookingSummary.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time</span>
                    <span className="text-sm font-medium">{bookingSummary.departureTime} - {bookingSummary.arrivalTime}</span>
                  </div>
                </div>

                <Separator />

                {/* Seat Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Selected Seats</span>
                    <div className="flex flex-wrap gap-1">
                      {bookingSummary.seats.map(seat => (
                        <Badge key={seat} variant="secondary" className="text-xs">
                          {seat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Boarding Point */}
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Boarding Point</div>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium">
                        {bookingSummary.boardingPoint.split(' - ')[0]}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {bookingSummary.boardingPoint.split(' - ')[1]}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Seats ({bookingSummary.seats.length})</span>
                    <span>${bookingSummary.totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Booking Fee</span>
                    <span>$0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span>${bookingSummary.totalPrice}</span>
                  </div>
                </div>

                {/* Payment Info */}
                <Alert>
                  <CreditCard className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Secure payment powered by Stripe. Your payment information is encrypted and protected.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}