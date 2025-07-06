import { ReactNode } from 'react';
import { getNavItemsByRole } from '@/lib/dashboard-nav';
import type { User } from '@/lib/auth-storage';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  user: User;
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const navItems = getNavItemsByRole(user.role);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} navItems={navItems} />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block">
          <Sidebar navItems={navItems} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}