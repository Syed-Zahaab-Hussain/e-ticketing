import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth-storage';
import type { User } from '@/lib/auth-storage';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bus, Calendar, Users, MapPin, Clock, CheckCircle } from 'lucide-react';

export default function BusOperatorDashboard() {
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

  const operatorStats = [
    {
      title: 'My Buses',
      value: '12',
      status: '10 Active',
      icon: Bus,
      color: 'text-blue-600'
    },
    {
      title: 'Today\'s Trips',
      value: '24',
      status: '18 Completed',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      title: 'Passengers',
      value: '342',
      status: 'Today',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Routes',
      value: '8',
      status: 'Assigned',
      icon: MapPin,
      color: 'text-orange-600'
    }
  ];

  const todaysSchedule = [
    {
      time: '06:00 AM',
      route: 'New York → Philadelphia',
      bus: 'Bus #101',
      status: 'completed',
      passengers: 45
    },
    {
      time: '08:30 AM',
      route: 'Philadelphia → New York',
      bus: 'Bus #102',
      status: 'in-progress',
      passengers: 38
    },
    {
      time: '11:00 AM',
      route: 'New York → Boston',
      bus: 'Bus #103',
      status: 'scheduled',
      passengers: 42
    },
    {
      time: '02:30 PM',
      route: 'Boston → New York',
      bus: 'Bus #104',
      status: 'scheduled',
      passengers: 35
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>;
      case 'scheduled':
        return <Badge variant="outline">Scheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Good morning, {user.firstName}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your bus operations and track today's performance.
            </p>
          </div>
          <Badge variant="secondary" className="px-3 py-1">
            <Clock className="h-3 w-3 mr-1" />
            {new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {operatorStats.map((stat, index) => {
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
                    {stat.status}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Today's Schedule</span>
            </CardTitle>
            <CardDescription>
              Your bus departures and arrivals for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaysSchedule.map((trip, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-medium">{trip.time}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{trip.route}</div>
                      <div className="text-sm text-muted-foreground">{trip.bus}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium">{trip.passengers} passengers</div>
                      <div className="text-xs text-muted-foreground">Booked</div>
                    </div>
                    {getStatusBadge(trip.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bus className="h-5 w-5 text-primary" />
                <span>Manage Buses</span>
              </CardTitle>
              <CardDescription>
                View and update your bus fleet information
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Update Schedules</span>
              </CardTitle>
              <CardDescription>
                Modify departure times and frequencies
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>Passenger Manifests</span>
              </CardTitle>
              <CardDescription>
                View passenger lists and check-ins
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}