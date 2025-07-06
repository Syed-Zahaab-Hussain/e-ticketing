import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '@/lib/auth-storage';
import type { User } from '@/lib/auth-storage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success && response.user) {
          setUser(response.user);
        } else {
          setUser(null);
          setError(response.message);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setUser(null);
        setError('Authentication check failed');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const redirectPath = getRoleBasedRedirect(user.role);
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}

// Helper function to get role-based redirect path
function getRoleBasedRedirect(role: string): string {
  switch (role) {
    case 'ADMIN':
      return '/admin/dashboard';
    case 'BUS_OPERATOR':
      return '/operator/dashboard';
    case 'PASSENGER':
      return '/passenger/dashboard';
    default:
      return '/';
  }
}