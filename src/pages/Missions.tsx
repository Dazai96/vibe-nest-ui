import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Target, 
  Trophy, 
  Clock, 
  Heart, 
  MessageCircle, 
  Users, 
  Calendar,
  Flame,
  Star,
  CheckCircle,
  Gift,
  Zap
} from "lucide-react";

interface Mission {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  duration_days: number;
  requirements: {
    type: string;
    target: number;
    current?: number;
  }[];
  icon: React.ReactNode;
  completed: boolean;
  progress: number;
  deadline?: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export default function Missions() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");

  // Mock data for missions
  const mockMissions: Mission[] = [
    {
      id: "1",
      title: "Mood Tracker Beginner",
      description: "Log your mood for 7 consecutive days",
      category: "wellness",
      difficulty: "easy",
      points: 25,
      duration_days: 7,
      requirements: [
        { type: "mood_entries", target: 7, current: 3 }
      ],
      icon: <Heart className="h-5 w-5" />,
      completed: false,
      progress: 43
    },
    {
      id: "2", 
      title: "Community Helper",
      description: "Get 10 helpful votes on your posts and comments",
      category: "community",
      difficulty: "medium",
      points: 50,
      duration_days: 14,
      requirements: [
        { type: "helpful_votes", target: 10, current: 6 }
      ],
      icon: <Users className="h-5 w-5" />,
      completed: false,
      progress: 60
    },
    {
      id: "3",
      title: "Social Butterfly",
      description: "Join 3 different support communities",
      category: "social",
      difficulty: "easy",
      points: 30,
      duration_days: 30,
      requirements: [
        { type: "communities_joined", target: 3, current: 1 }
      ],
      icon: <MessageCircle className="h-5 w-5" />,
      completed: false,
      progress: 33
    },
    {
      id: "4",
      title: "Wellness Warrior",
      description: "Complete 5 wellness challenges",
      category: "wellness",
      difficulty: "hard",
      points: 100,
      duration_days: 21,
      requirements: [
        { type: "challenges_completed", target: 5, current: 2 }
      ],
      icon: <Trophy className="h-5 w-5" />,
      completed: false,
      progress: 40
    },
    {
      id: "5",
      title: "Streak Master",
      description: "Maintain a 14-day mood tracking streak",
      category: "consistency",
      difficulty: "hard",
      points: 75,
      duration_days: 14,
      requirements: [
        { type: "mood_streak", target: 14, current: 8 }
      ],
      icon: <Flame className="h-5 w-5" />,
      completed: false,
      progress: 57
    },
    {
      id: "6",
      title: "Profile Master",
      description: "Complete your profile with all details",
      category: "setup",
      difficulty: "easy",
      points: 20,
      duration_days: 3,
      requirements: [
        { type: "profile_completion", target: 100, current: 85 }
      ],
      icon: <Star className="h-5 w-5" />,
      completed: false,
      progress: 85
    }
  ];

  const mockAchievements: Achievement[] = [
    {
      id: "1",
      name: "First Steps",
      description: "Created your first post",
      icon: "🌱",
      category: "milestone",
      points: 10,
      unlocked: true,
      unlockedAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Helpful Soul",
      description: "Received 50 helpful votes",
      icon: "❤️",
      category: "community",
      points: 50,
      unlocked: true,
      unlockedAt: "2024-01-20"
    },
    {
      id: "3",
      name: "Week Warrior",
      description: "Logged mood for 7 consecutive days",
      icon: "⚡",
      category: "consistency",
      points: 25,
      unlocked: false
    },
    {
      id: "4",
      name: "Community Leader",
      description: "Helped 100 community members",
      icon: "👑",
      category: "leadership",
      points: 200,
      unlocked: false
    },
    {
      id: "5",
      name: "Mindfulness Master",
      description: "Completed 30 wellness challenges",
      icon: "🧘",
      category: "wellness",
      points: 300,
      unlocked: false
    },
    {
      id: "6",
      name: "Friend Magnet",
      description: "Connected with 25 peers",
      icon: "🤝",
      category: "social",
      points: 75,
      unlocked: false
    }
  ];

  useEffect(() => {
    setMissions(mockMissions);
    setAchievements(mockAchievements);
    setLoading(false);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'wellness': return <Heart className="h-4 w-4" />;
      case 'community': return <Users className="h-4 w-4" />;
      case 'social': return <MessageCircle className="h-4 w-4" />;
      case 'consistency': return <Flame className="h-4 w-4" />;
      case 'setup': return <Star className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const startMission = async (missionId: string) => {
    // In a real app, this would update the database
    toast({
      title: "Mission Started!",
      description: "Your progress will be tracked automatically.",
    });
  };

  const claimReward = async (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;

    toast({
      title: "Reward Claimed! 🎉",
      description: `You earned ${mission.points} points!`,
    });

    // Mark mission as completed
    setMissions(prev => prev.map(m => 
      m.id === missionId ? { ...m, completed: true } : m
    ));
  };

  const activeMissions = missions.filter(m => !m.completed && m.progress > 0);
  const availableMissions = missions.filter(m => !m.completed && m.progress === 0);
  const completedMissions = missions.filter(m => m.completed);
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  const MissionCard = ({ mission }: { mission: Mission }) => (
    <Card className="card-soft hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {mission.icon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{mission.title}</h3>
              <p className="text-sm text-muted-foreground">{mission.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              {getCategoryIcon(mission.category)}
              {mission.category}
            </Badge>
            <div className={`w-3 h-3 rounded-full ${getDifficultyColor(mission.difficulty)}`} 
                 title={`${mission.difficulty} difficulty`} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{mission.progress}%</span>
          </div>
          <Progress value={mission.progress} className="h-2" />
          
          {mission.requirements.map((req, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground capitalize">
                {req.type.replace('_', ' ')}
              </span>
              <span className="font-medium">
                {req.current || 0} / {req.target}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Gift className="h-4 w-4" />
              {mission.points} points
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {mission.duration_days} days
            </div>
          </div>
          
          {mission.progress === 100 ? (
            <Button onClick={() => claimReward(mission.id)} className="bg-green-500 hover:bg-green-600">
              <Gift className="h-4 w-4 mr-2" />
              Claim Reward
            </Button>
          ) : mission.progress > 0 ? (
            <Badge variant="secondary">In Progress</Badge>
          ) : (
            <Button variant="outline" onClick={() => startMission(mission.id)}>
              <Zap className="h-4 w-4 mr-2" />
              Start Mission
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
    <Card className={`card-soft transition-all ${
      achievement.unlocked ? 'border-yellow-200 bg-yellow-50/50' : 'opacity-60'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{achievement.icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{achievement.name}</h3>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {achievement.category}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {achievement.points} points
              </span>
              {achievement.unlocked && achievement.unlockedAt && (
                <span className="text-xs text-green-600">
                  Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          {achievement.unlocked && (
            <CheckCircle className="h-5 w-5 text-green-500" />
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Target className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Missions & Achievements</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{activeMissions.length}</div>
            <div className="text-sm text-muted-foreground">Active Missions</div>
          </CardContent>
        </Card>
        <Card className="card-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{completedMissions.length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card className="card-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">{unlockedAchievements.length}</div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </CardContent>
        </Card>
        <Card className="card-soft">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">
              {missions.reduce((sum, m) => sum + (m.completed ? m.points : 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Points Earned</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Missions</TabsTrigger>
          <TabsTrigger value="available">Available Missions</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-6">
          {activeMissions.length > 0 ? (
            activeMissions.map(mission => (
              <MissionCard key={mission.id} mission={mission} />
            ))
          ) : (
            <Card className="card-soft">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No Active Missions</h3>
                <p className="text-muted-foreground">Start a new mission to begin your wellness journey!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {availableMissions.map(mission => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <div className="space-y-6">
            {unlockedAchievements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Unlocked Achievements
                </h3>
                <div className="grid gap-3">
                  {unlockedAchievements.map(achievement => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-muted-foreground" />
                Locked Achievements
              </h3>
              <div className="grid gap-3">
                {lockedAchievements.map(achievement => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}