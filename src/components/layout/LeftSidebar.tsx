import { Home, Users, BarChart3, BookOpen, UserPlus, TrendingUp, Crown } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { dataRandomizer } from "@/lib/dataRandomizer";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Users, label: "Communities", path: "/communities" },
  { icon: BarChart3, label: "Admin Dashboard", path: "/admin" },
  { icon: BookOpen, label: "Resources", path: "/resources" },
  { icon: UserPlus, label: "Friends", path: "/friends" },
  { icon: Crown, label: "Subscription", path: "/subscription" },
];

// Randomized mood data for the line graph
const moodData = dataRandomizer.getRandomMoodData();

export function LeftSidebar() {
  return (
    <aside className="w-64 lg:w-72 xl:w-80 bg-sidebar/95 backdrop-blur-md p-3 lg:p-4 xl:p-6 space-y-4 lg:space-y-6 overflow-y-auto">
      {/* Navigation */}
      <Card className="glass-card rounded-2xl">
        <CardHeader className="card-header-spacing">
          <CardTitle className="text-sm font-medium text-sidebar-foreground">Navigation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 px-4 pb-4">
          {navItems.map(({ icon: Icon, label, path }) => (
            <NavLink key={path} to={path}>
              {({ isActive }) => (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start gap-3 h-auto py-2.5 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-smooth",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{label}</span>
                </Button>
              )}
            </NavLink>
          ))}
        </CardContent>
      </Card>

      {/* Mood Tracking Graph */}
      <Card className="glass-card rounded-2xl">
        <CardHeader className="card-header-spacing">
          <CardTitle className="text-sm font-medium text-sidebar-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">Mood This Week</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-3">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Great</span>
              <span>10</span>
            </div>
            
            {/* Line graph */}
            <div className="h-28 sm:h-32 relative">
              <svg width="100%" height="100%" viewBox="0 0 280 120" className="overflow-visible">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Line path */}
                <path
                  d={moodData.map((point, index) => {
                    const x = 20 + (index * 40);
                    const y = 100 - ((point.mood / 10) * 80);
                    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Data points */}
                {moodData.map((point, index) => {
                  const x = 20 + (index * 40);
                  const y = 100 - ((point.mood / 10) * 80);
                  return (
                    <circle
                      key={point.day}
                      cx={x}
                      cy={y}
                      r="3"
                      fill="hsl(var(--primary))"
                      stroke="hsl(var(--background))"
                      strokeWidth="2"
                      className="hover:r-4 transition-all cursor-pointer"
                    />
                  );
                })}
                
                {/* Day labels */}
                {moodData.map((point, index) => {
                  const x = 20 + (index * 40);
                  return (
                    <text
                      key={point.day}
                      x={x}
                      y="115"
                      textAnchor="middle"
                      className="text-xs fill-current text-muted-foreground"
                    >
                      {point.day}
                    </text>
                  );
                })}
              </svg>
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Poor</span>
              <span>1</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-4 text-xs hover-scale"
            asChild
          >
            <NavLink to="/mood">Track Mood</NavLink>
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}