import { Users, Star, Lightbulb, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock data
const friendSuggestions = [
  { id: 1, name: "Sarah Chen", avatar: "/placeholder.svg", mutualFriends: 5 },
  { id: 2, name: "Alex Rivera", avatar: "/placeholder.svg", mutualFriends: 3 },
  { id: 3, name: "Jordan Kim", avatar: "/placeholder.svg", mutualFriends: 7 },
];

const leaderboard = [
  { id: 1, name: "Emma Watson", points: 2450, avatar: "/placeholder.svg" },
  { id: 2, name: "David Lee", points: 2200, avatar: "/placeholder.svg" },
  { id: 3, name: "Maya Patel", points: 1950, avatar: "/placeholder.svg" },
  { id: 4, name: "Chris Taylor", points: 1800, avatar: "/placeholder.svg" },
];

const wellnessTips = [
  "Take 5 deep breaths when feeling overwhelmed",
  "Practice gratitude by writing down 3 things you're thankful for",
  "Step outside for a few minutes to get fresh air",
  "Stay hydrated - aim for 8 glasses of water today",
  "Take regular breaks from screens to rest your eyes",
  "Connect with a friend or loved one today",
  "Do some light stretching to release tension",
];

export function RightSidebar() {
  // Get random tip for today
  const todaysTip = wellnessTips[Math.floor(Math.random() * wellnessTips.length)];

  return (
    <aside className="w-80 bg-sidebar border-l border-sidebar-border p-4 space-y-6">
      {/* Friend Suggestions */}
      <Card className="card-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-sidebar-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            Friend Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {friendSuggestions.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={friend.avatar} alt={friend.name} />
                  <AvatarFallback>{friend.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-sidebar-foreground">{friend.name}</p>
                  <p className="text-xs text-muted-foreground">{friend.mutualFriends} mutual friends</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Add
              </Button>
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full justify-between text-xs">
            See all suggestions
            <ChevronRight className="h-3 w-3" />
          </Button>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="card-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-sidebar-foreground flex items-center gap-2">
            <Star className="h-4 w-4" />
            Top Helpers This Week
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {leaderboard.map((user, index) => (
            <div key={user.id} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                {index + 1}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.points} points</p>
              </div>
              {index < 3 && (
                <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                </Badge>
              )}
            </div>
          ))}
          <Button variant="ghost" size="sm" className="w-full justify-between text-xs">
            View full leaderboard
            <ChevronRight className="h-3 w-3" />
          </Button>
        </CardContent>
      </Card>

      {/* Wellness Tips */}
      <Card className="card-soft">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-sidebar-foreground flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Daily Wellness Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
            <p className="text-sm text-sidebar-foreground leading-relaxed">
              {todaysTip}
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3 text-xs">
            More Tips
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}