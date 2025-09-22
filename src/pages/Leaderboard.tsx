import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavLink } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Trophy, 
  Medal, 
  Award, 
  Heart, 
  MessageCircle, 
  Flame, 
  TrendingUp,
  Crown,
  Star,
  Users,
  Sparkles,
  PartyPopper,
  Target,
  Rainbow,
  Cat,
  Sun
} from "lucide-react";

interface LeaderboardUser {
  id: string;
  display_name: string;
  avatar_url?: string;
  posts_count: number;
  helpful_votes: number;
  mood_streak: number;
  total_comments: number;
  achievements_count: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  // Mock data since we need to implement the actual tracking
  const mockLeaderboard: LeaderboardUser[] = [
    {
      id: "1",
      display_name: "Emma Watson",
      avatar_url: "/avatars/person2.jpg",
      posts_count: 45,
      helpful_votes: 128,
      mood_streak: 21,
      total_comments: 89,
      achievements_count: 12
    },
    {
      id: "2", 
      display_name: "David Lee",
      avatar_url: "/avatars/person5.jpg",
      posts_count: 38,
      helpful_votes: 115,
      mood_streak: 18,
      total_comments: 76,
      achievements_count: 10
    },
    {
      id: "3",
      display_name: "Maya Patel", 
      avatar_url: "/avatars/person9.jpg",
      posts_count: 42,
      helpful_votes: 98,
      mood_streak: 25,
      total_comments: 92,
      achievements_count: 11
    },
    {
      id: "4",
      display_name: "Chris Taylor",
      avatar_url: "/avatars/person7.jpg", 
      posts_count: 35,
      helpful_votes: 87,
      mood_streak: 15,
      total_comments: 68,
      achievements_count: 8
    },
    {
      id: "5",
      display_name: "Sarah Chen",
      avatar_url: "/avatars/person4.jpg",
      posts_count: 29,
      helpful_votes: 92,
      mood_streak: 19,
      total_comments: 54,
      achievements_count: 9
    },
    {
      id: "6",
      display_name: "Alex Rivera",
      avatar_url: "/avatars/person3.jpg",
      posts_count: 31,
      helpful_votes: 76,
      mood_streak: 12,
      total_comments: 47,
      achievements_count: 7
    },
    {
      id: "7",
      display_name: "Jordan Kim",
      avatar_url: "/avatars/person6.jpg",
      posts_count: 26,
      helpful_votes: 65,
      mood_streak: 16,
      total_comments: 41,
      achievements_count: 6
    },
    {
      id: "8",
      display_name: "Sam Parker",
      avatar_url: "/avatars/person8.jpg",
      posts_count: 22,
      helpful_votes: 58,
      mood_streak: 11,
      total_comments: 38,
      achievements_count: 5
    }
  ];

  useEffect(() => {
    // For now, use mock data. In production, fetch from Supabase
    setLeaderboard(mockLeaderboard);
    setLoading(false);
  }, []);

  const getSortedUsers = (sortBy: keyof LeaderboardUser) => {
    return [...leaderboard].sort((a, b) => {
      const aValue = typeof a[sortBy] === 'number' ? a[sortBy] : 0;
      const bValue = typeof b[sortBy] === 'number' ? b[sortBy] : 0;
      return (bValue as number) - (aValue as number);
    });
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500 animate-bounce" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400 animate-pulse" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600 animate-float" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <Badge className="bg-yellow-500 text-white animate-pulse">
            🥇 Champion <PartyPopper className="h-3 w-3 ml-1 inline animate-bounce" />
          </Badge>
        );
      case 2:
        return <Badge className="bg-gray-400 text-white animate-shimmer">🥈 Expert</Badge>;
      case 3:
        return <Badge className="bg-amber-600 text-white animate-float">🥉 Supporter</Badge>;
      default:
        return null;
    }
  };

  const LeaderboardCard = ({ users, metric, icon }: {
    users: LeaderboardUser[];
    metric: keyof LeaderboardUser;
    icon: React.ReactNode;
  }) => (
    <div className="space-y-3">
      {users.slice(0, 10).map((user, index) => {
        const rank = index + 1;
        const value = user[metric];
        
        return (
          <Card key={user.id} className={`card-soft transition-all hover:shadow-md hover-scale animate-fade-in ${
            rank <= 3 ? 'ring-2 ring-primary/20 animate-pulse-gentle' : ''
          }`} style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10">
                  {getRankIcon(rank)}
                </div>
                
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar_url} alt={user.display_name} />
                  <AvatarFallback>
                    {user.display_name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{user.display_name}</h3>
                    {getRankBadge(rank)}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    {icon}
                    <span className="text-sm">{value} {metric.replace('_', ' ')}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground">
                    {rank === 1 ? 'Leading' : `${users[0][metric] as number - (value as number)} behind`}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Trophy className="h-6 w-6 text-primary animate-bounce" />
        <h1 className="text-2xl font-bold text-foreground">Community Leaderboard</h1>
        <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
      </div>

      <Card className="card-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Top Contributors This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{leaderboard.length}</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-500">
                {leaderboard.reduce((sum, user) => sum + user.posts_count, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-500">
                {leaderboard.reduce((sum, user) => sum + user.helpful_votes, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Helpful Votes</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-500">
                {Math.max(...leaderboard.map(user => user.mood_streak))}
              </div>
              <div className="text-sm text-muted-foreground">Best Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Posts
          </TabsTrigger>
          <TabsTrigger value="helpful" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Helpful
          </TabsTrigger>
          <TabsTrigger value="streak" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            Streaks
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="missions" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Missions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          <LeaderboardCard 
            users={getSortedUsers('posts_count')}
            metric="posts_count"
            icon={<MessageCircle className="h-4 w-4" />}
          />
        </TabsContent>

        <TabsContent value="helpful" className="mt-6">
          <LeaderboardCard 
            users={getSortedUsers('helpful_votes')}
            metric="helpful_votes"
            icon={<Heart className="h-4 w-4" />}
          />
        </TabsContent>

        <TabsContent value="streak" className="mt-6">
          <LeaderboardCard 
            users={getSortedUsers('mood_streak')}
            metric="mood_streak"
            icon={<Flame className="h-4 w-4" />}
          />
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <LeaderboardCard 
            users={getSortedUsers('achievements_count')}
            metric="achievements_count"
            icon={<Star className="h-4 w-4" />}
          />
        </TabsContent>

        <TabsContent value="missions" className="mt-6">
          <div className="grid gap-4">
            <Card className="card-soft animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary animate-bounce" />
                  Quick Mission Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                  <PartyPopper className="h-12 w-12 mx-auto text-primary mb-4 animate-bounce" />
                  <h3 className="text-lg font-semibold mb-2">Ready for Some Silly Wellness?</h3>
                  <p className="text-muted-foreground mb-4">
                    Complete fun missions to boost your leaderboard position AND your mental health!
                  </p>
                  <Button className="bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground animate-pulse" asChild>
                    <NavLink to="/missions">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Start Silly Missions
                    </NavLink>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg animate-fade-in" style={{ animationDelay: '100ms' }}>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Rainbow className="h-4 w-4 animate-bounce" />
                      Happy Dance Master
                    </h4>
                    <p className="text-sm text-muted-foreground">Dance for 30 seconds daily - science says it releases happiness chemicals!</p>
                    <Badge variant="outline" className="mt-2">+35 points</Badge>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg animate-fade-in" style={{ animationDelay: '200ms' }}>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Cat className="h-4 w-4 animate-float" />
                      Professional Cat Watcher
                    </h4>
                    <p className="text-sm text-muted-foreground">Watch cat videos for 5 minutes - reduces stress by 68%!</p>
                    <Badge variant="outline" className="mt-2">+25 points</Badge>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg animate-fade-in" style={{ animationDelay: '300ms' }}>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 animate-pulse" />
                      Compliment Ninja
                    </h4>
                    <p className="text-sm text-muted-foreground">Give 10 genuine compliments - activates the same brain regions as money!</p>
                    <Badge variant="outline" className="mt-2">+50 points</Badge>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg animate-fade-in" style={{ animationDelay: '400ms' }}>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Sun className="h-4 w-4 animate-spin" />
                      Sunshine Society Member
                    </h4>
                    <p className="text-sm text-muted-foreground">Get 10 minutes of sunlight daily - boosts serotonin naturally!</p>
                    <Badge variant="outline" className="mt-2">+40 points</Badge>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground italic">
                    💡 All missions are backed by real mental health science but designed to be ridiculously fun!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="card-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Ranking System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">How to Earn Points:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Create a helpful post: +5 points</li>
                <li>• Receive a helpful vote: +2 points</li>
                <li>• Comment on posts: +1 point</li>
                <li>• Maintain mood streak: +1 point/day</li>
                <li>• Complete challenges: +10-50 points</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Ranking Tiers:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>🥇 Champion: Top contributor</li>
                <li>🥈 Expert: Top 3 in category</li>
                <li>🥉 Supporter: Top 10 in category</li>
                <li>⭐ Helper: Active community member</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}