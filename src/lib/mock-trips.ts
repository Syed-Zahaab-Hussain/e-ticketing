// Centralized mock data for bus trips
export interface BusTripSearchResult {
  id: string;
  operatorName: string;
  operatorLogo?: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  busType: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
}

export interface BusTripDetails {
  id: string;
  operatorName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  busType: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
  from: string;
  to: string;
  date: string;
  boardingPoints: string[];
}

// Mock data for search results
export const mockBusTripsSearchResults: BusTripSearchResult[] = [
  {
    id: 'trip-1',
    operatorName: 'Express Lines',
    departureTime: '06:00 AM',
    arrivalTime: '02:30 PM',
    duration: '8h 30m',
    price: 89,
    availableSeats: 12,
    totalSeats: 45,
    busType: 'AC Sleeper',
    amenities: ['wifi', 'charging', 'meals'],
    rating: 4.5,
    reviewCount: 234
  },
  {
    id: 'trip-2',
    operatorName: 'Comfort Travel',
    departureTime: '08:30 AM',
    arrivalTime: '05:15 PM',
    duration: '8h 45m',
    price: 75,
    availableSeats: 8,
    totalSeats: 40,
    busType: 'AC Semi-Sleeper',
    amenities: ['wifi', 'charging'],
    rating: 4.2,
    reviewCount: 156
  },
  {
    id: 'trip-3',
    operatorName: 'Premium Coach',
    departureTime: '10:00 AM',
    arrivalTime: '07:00 PM',
    duration: '9h 00m',
    price: 120,
    availableSeats: 15,
    totalSeats: 35,
    busType: 'Luxury AC',
    amenities: ['wifi', 'charging', 'meals', 'entertainment'],
    rating: 4.8,
    reviewCount: 89
  },
  {
    id: 'trip-4',
    operatorName: 'Budget Express',
    departureTime: '11:30 AM',
    arrivalTime: '08:45 PM',
    duration: '9h 15m',
    price: 55,
    availableSeats: 20,
    totalSeats: 50,
    busType: 'AC Seater',
    amenities: ['charging'],
    rating: 3.9,
    reviewCount: 312
  },
  {
    id: 'trip-5',
    operatorName: 'Night Rider',
    departureTime: '11:00 PM',
    arrivalTime: '07:30 AM',
    duration: '8h 30m',
    price: 95,
    availableSeats: 6,
    totalSeats: 42,
    busType: 'AC Sleeper',
    amenities: ['wifi', 'charging', 'blanket'],
    rating: 4.3,
    reviewCount: 178
  }
];

// Detailed trip data with boarding points and route information
export const mockTripDetails: Record<string, BusTripDetails> = {
  'trip-1': {
    id: 'trip-1',
    operatorName: 'Express Lines',
    departureTime: '06:00 AM',
    arrivalTime: '02:30 PM',
    duration: '8h 30m',
    price: 89,
    availableSeats: 12,
    totalSeats: 45,
    busType: 'AC Sleeper',
    amenities: ['wifi', 'charging', 'meals'],
    rating: 4.5,
    reviewCount: 234,
    from: 'New York',
    to: 'Los Angeles',
    date: '2024-01-15',
    boardingPoints: [
      'Port Authority Bus Terminal - 625 8th Ave',
      'Penn Station - 4 Pennsylvania Plaza',
      'Grand Central Terminal - 89 E 42nd St',
      'Brooklyn Bridge Terminal - 130 Livingston St'
    ]
  },
  'trip-2': {
    id: 'trip-2',
    operatorName: 'Comfort Travel',
    departureTime: '08:30 AM',
    arrivalTime: '05:15 PM',
    duration: '8h 45m',
    price: 75,
    availableSeats: 8,
    totalSeats: 40,
    busType: 'AC Semi-Sleeper',
    amenities: ['wifi', 'charging'],
    rating: 4.2,
    reviewCount: 156,
    from: 'New York',
    to: 'Los Angeles',
    date: '2024-01-15',
    boardingPoints: [
      'Port Authority Bus Terminal - 625 8th Ave',
      'Times Square Terminal - 1500 Broadway',
      'Union Square Station - 14th St & Broadway',
      'Lower East Side Terminal - 165 Ludlow St'
    ]
  },
  'trip-3': {
    id: 'trip-3',
    operatorName: 'Premium Coach',
    departureTime: '10:00 AM',
    arrivalTime: '07:00 PM',
    duration: '9h 00m',
    price: 120,
    availableSeats: 15,
    totalSeats: 35,
    busType: 'Luxury AC',
    amenities: ['wifi', 'charging', 'meals', 'entertainment'],
    rating: 4.8,
    reviewCount: 89,
    from: 'New York',
    to: 'Los Angeles',
    date: '2024-01-15',
    boardingPoints: [
      'Luxury Terminal Manhattan - 350 W 42nd St',
      'Premium Lounge Midtown - 200 Park Ave',
      'Executive Center Downtown - 100 Church St'
    ]
  },
  'trip-4': {
    id: 'trip-4',
    operatorName: 'Budget Express',
    departureTime: '11:30 AM',
    arrivalTime: '08:45 PM',
    duration: '9h 15m',
    price: 55,
    availableSeats: 20,
    totalSeats: 50,
    busType: 'AC Seater',
    amenities: ['charging'],
    rating: 3.9,
    reviewCount: 312,
    from: 'New York',
    to: 'Los Angeles',
    date: '2024-01-15',
    boardingPoints: [
      'Budget Terminal Queens - 45-18 Court Sq',
      'Economy Stop Brooklyn - 625 Atlantic Ave',
      'Value Station Bronx - 149th St & 3rd Ave',
      'Express Point Staten Island - 1 Bay St'
    ]
  },
  'trip-5': {
    id: 'trip-5',
    operatorName: 'Night Rider',
    departureTime: '11:00 PM',
    arrivalTime: '07:30 AM',
    duration: '8h 30m',
    price: 95,
    availableSeats: 6,
    totalSeats: 42,
    busType: 'AC Sleeper',
    amenities: ['wifi', 'charging', 'blanket'],
    rating: 4.3,
    reviewCount: 178,
    from: 'New York',
    to: 'Los Angeles',
    date: '2024-01-15',
    boardingPoints: [
      'Night Terminal Manhattan - 460 W 42nd St',
      'Late Night Hub Brooklyn - 4 MetroTech Center',
      'Overnight Station Queens - 47-01 111th St'
    ]
  }
};

// Helper function to get trip details by ID
export const getTripById = (tripId: string): BusTripDetails | null => {
  return mockTripDetails[tripId] || null;
};

// Helper function to get search results with optional filtering
export const getSearchResults = (filters?: {
  sortBy?: 'price' | 'duration' | 'departure' | 'rating';
  filterBy?: 'all' | 'ac' | 'sleeper' | 'wifi';
}): BusTripSearchResult[] => {
  let trips = [...mockBusTripsSearchResults];

  // Apply filters
  if (filters?.filterBy && filters.filterBy !== 'all') {
    switch (filters.filterBy) {
      case 'ac':
        trips = trips.filter(trip => trip.busType.includes('AC'));
        break;
      case 'sleeper':
        trips = trips.filter(trip => trip.busType.includes('Sleeper'));
        break;
      case 'wifi':
        trips = trips.filter(trip => trip.amenities.includes('wifi'));
        break;
    }
  }

  // Apply sorting
  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case 'price':
        trips.sort((a, b) => a.price - b.price);
        break;
      case 'duration':
        trips.sort((a, b) => {
          const aDuration = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split('h')[1]);
          const bDuration = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split('h')[1]);
          return aDuration - bDuration;
        });
        break;
      case 'departure':
        trips.sort((a, b) => {
          const aTime = new Date(`2000-01-01 ${a.departureTime}`).getTime();
          const bTime = new Date(`2000-01-01 ${b.departureTime}`).getTime();
          return aTime - bTime;
        });
        break;
      case 'rating':
        trips.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  return trips;
};