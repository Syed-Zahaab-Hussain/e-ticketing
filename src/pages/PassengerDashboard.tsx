import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth-storage';
import type { User } from '@/lib/auth-storage';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ticket, Calendar, CreditCard, MapPin, Clock, Plus, ArrowRight } from 'lucide-react';

export default function PassengerDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success && response.user) {
          setUser(response.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  const travelStats = [
    {
      title: 'Active Bookings',
      value: '2',
      description: 'Upcoming trips',
      icon: Ticket,
      color: 'text-blue-600'
    },
    {
      title: 'Total Trips',
      value: '15',
      description: 'All time',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      title: 'Amount Spent',
      value: '$1,245',
      description: 'This year',
      icon: CreditCard,
      color: 'text-purple-600'
    },
    {
      title: 'Favorite Route',
      value: 'NY → LA',
      description: '5 times',
      icon: MapPin,
      color: 'text-orange-600'
    }
  ];

  const upcomingTrips = [
    {
      id: 'TKT001',
      route: 'New York → Los Angeles',
      date: '2024-01-15',
      time: '08:30 AM',
      bus: 'Express Coach #205',
      seat: '12A',
      status: 'confirmed'
    },
    {
      id: 'TKT002',
      route: 'Los Angeles → San Francisco',
      date: '2024-01-20',
      time: '02:15 PM',
      bus: 'Comfort Plus #118',
      seat: '8B',
      status: 'confirmed'
    }
  ];

  const recentTrips = [
    {
      id: 'TKT003',
      route: 'Boston → New York',
      date: '2024-01-05',
      time: '10:00 AM',
      status: 'completed',
      rating: 5
    },
    {
      id: 'TKT004',
      route: 'Philadelphia → Boston',
      date: '2023-12-28',
      time: '03:45 PM',
      status: 'completed',
      rating: 4
    }
  ];

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Ready for your next adventure? Book your tickets and manage your trips.
            </p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Book New Trip</span>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {travelStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Upcoming Trips */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Upcoming Trips</span>
              </CardTitle>
              <CardDescription>
                Your confirmed bookings and travel plans
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-medium">{new Date(trip.date).toLocaleDateString()}</div>
                      <div className="text-xs text-muted-foreground">{trip.time}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{trip.route}</div>
                      <div className="text-sm text-muted-foreground">{trip.bus} • Seat {trip.seat}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {trip.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Trips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Recent Trips</span>
              </CardTitle>
              <CardDescription>
                Your travel history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTrips.map((trip) => (
                  <div key={trip.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{trip.route}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(trip.date).toLocaleDateString()} • {trip.time}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs">
                        {'★'.repeat(trip.rating)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {trip.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Frequently used features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Ticket className="h-4 w-4 mr-2" />
                Download Tickets
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment History
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Track My Bus
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}