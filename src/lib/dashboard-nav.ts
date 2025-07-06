import { 
  LayoutDashboard, 
  Users, 
  Route, 
  Bus, 
  BarChart3, 
  Settings, 
  Calendar,
  FileText,
  MapPin,
  UserCheck,
  Ticket,
  CreditCard,
  User,
  History,
  Bell
} from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: any;
  description?: string;
}

export const adminNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and analytics'
  },
  {
    label: 'User Management',
    path: '/admin/users',
    icon: Users,
    description: 'Manage operators and passengers'
  },
  {
    label: 'Route Management',
    path: '/admin/routes',
    icon: Route,
    description: 'Manage bus routes and schedules'
  },
  {
    label: 'Bus Fleet',
    path: '/admin/buses',
    icon: Bus,
    description: 'Manage bus fleet information'
  },
  {
    label: 'Analytics',
    path: '/admin/analytics',
    icon: BarChart3,
    description: 'Revenue and performance reports'
  },
  {
    label: 'Settings',
    path: '/admin/settings',
    icon: Settings,
    description: 'System configuration'
  }
];

export const operatorNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/operator/dashboard',
    icon: LayoutDashboard,
    description: 'Overview of your operations'
  },
  {
    label: 'My Buses',
    path: '/operator/buses',
    icon: Bus,
    description: 'Manage your bus fleet'
  },
  {
    label: 'Schedules',
    path: '/operator/schedules',
    icon: Calendar,
    description: 'Manage departure schedules'
  },
  {
    label: 'Routes',
    path: '/operator/routes',
    icon: MapPin,
    description: 'Assigned routes and stops'
  },
  {
    label: 'Manifests',
    path: '/operator/manifests',
    icon: FileText,
    description: 'Passenger lists and check-ins'
  },
  {
    label: 'Validation',
    path: '/operator/validation',
    icon: UserCheck,
    description: 'QR code validation tracking'
  }
];

export const passengerNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/passenger/dashboard',
    icon: LayoutDashboard,
    description: 'Your travel overview'
  },
  {
    label: 'My Bookings',
    path: '/passenger/bookings',
    icon: Ticket,
    description: 'View and manage your tickets'
  },
  {
    label: 'Booking History',
    path: '/passenger/history',
    icon: History,
    description: 'Past travel history'
  },
  {
    label: 'Payment History',
    path: '/passenger/payments',
    icon: CreditCard,
    description: 'Payment records and receipts'
  },
  {
    label: 'Profile',
    path: '/passenger/profile',
    icon: User,
    description: 'Manage your account'
  },
  {
    label: 'Notifications',
    path: '/passenger/notifications',
    icon: Bell,
    description: 'Travel alerts and updates'
  }
];

export const getNavItemsByRole = (role: string): NavItem[] => {
  switch (role) {
    case 'ADMIN':
      return adminNavItems;
    case 'BUS_OPERATOR':
      return operatorNavItems;
    case 'PASSENGER':
      return passengerNavItems;
    default:
      return [];
  }
};