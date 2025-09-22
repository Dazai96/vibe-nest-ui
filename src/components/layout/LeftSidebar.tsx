import { Home, Users, MessageCircle, BookOpen, UserPlus, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Users, label: "Communities", path: "/communities" },
  { icon: MessageCircle, label: "Messages", path: "/messages" },
  { icon: BookOpen, label: "Resources", path: "/resources" },
  { icon: UserPlus, label: "Friends", path: "/friends" },
];

// Mock mood data for the graph
const moodData = [
  { day: "Mon", mood: 7 },
  { day: "Tue", mood: 6 },
  { day: "Wed", mood: 8 },
  { day: "Thu", mood: 7 },
  { day: "Fri", mood: 9 },
  { day: "Sat", mood: 8 },
  { day: "Sun", mood: 7 },
];

export function LeftSidebar() {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border p-4 space-y-6">
      {/* Navigation */}
      <Card className="card-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-sidebar-foreground">Navigation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {navItems.map(({ icon: Icon, label, path }) => (
            <NavLink key={path} to={path}>
              {({ isActive }) => (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              )}
            </NavLink>
          ))}
        </CardContent>
      </Card>

      {/* Mood Tracking Graph */}
      <Card className="card-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-sidebar-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Mood This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Great</span>
              <span>10</span>
            </div>
            
            {/* Simple bar chart */}
            <div className="h-32 flex items-end justify-between gap-1">
              {moodData.map((data, index) => (
                <div key={data.day} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                    style={{ height: `${(data.mood / 10) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{data.day}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Poor</span>
              <span>1</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-3 text-xs"
            asChild
          >
            <NavLink to="/mood">Track Mood</NavLink>
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}