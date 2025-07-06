import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { NavItem } from '@/lib/dashboard-nav';

interface SidebarProps {
  navItems: NavItem[];
  className?: string;
}

export default function Sidebar({ navItems, className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "relative flex flex-col bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Collapse Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 z-10 h-6 w-6 rounded-full border bg-background shadow-md hover:bg-accent"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          <TooltipProvider>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              const navButton = (
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-200",
                    isCollapsed ? "px-2" : "px-3",
                    isActive && "bg-primary/10 text-primary hover:bg-primary/15"
                  )}
                  asChild
                >
                  <Link to={item.path}>
                    <Icon className={cn(
                      "h-4 w-4 flex-shrink-0",
                      !isCollapsed && "mr-3"
                    )} />
                    {!isCollapsed && (
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">{item.label}</span>
                        {item.description && (
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                </Button>
              );

              if (isCollapsed) {
                return (
                  <Tooltip key={item.path} delayDuration={0}>
                    <TooltipTrigger asChild>
                      {navButton}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="ml-2">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return navButton;
            })}
          </TooltipProvider>
        </nav>
      </ScrollArea>
    </div>
  );
}