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
  Zap,
  Coffee,
  Smile,
  Sun,
  TreePine,
  Cat,
  Rainbow,
  Sparkles,
  PartyPopper
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
  funFact?: string;
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

  // Silly but good mental health missions
  const mockMissions: Mission[] = [
    {
      id: "1",
      title: "The Happy Dance Master",
      description: "Do a silly 30-second dance every morning for 7 days (yes, even if no one's watching!)",
      category: "movement",
      difficulty: "easy",
      points: 35,
      duration_days: 7,
      requirements: [
        { type: "daily_dances", target: 7, current: 3 }
      ],
      icon: <Rainbow className="h-5 w-5 animate-bounce" />,
      completed: false,
      progress: 43,
      funFact: "Dancing releases endorphins - your brain's natural happiness chemicals! 💃"
    },
    {
      id: "2", 
      title: "Compliment Ninja",
      description: "Give genuine compliments to 10 different people (including yourself in the mirror!)",
      category: "kindness",
      difficulty: "medium",
      points: 50,
      duration_days: 14,
      requirements: [
        { type: "compliments_given", target: 10, current: 6 }
      ],
      icon: <Sparkles className="h-5 w-5 animate-pulse" />,
      completed: false,
      progress: 60,
      funFact: "Giving compliments activates the same brain regions as receiving money! 🧠💰"
    },
    {
      id: "3",
      title: "Professional Cat Watcher",
      description: "Watch funny cat videos for 5 minutes daily (it's science!)",
      category: "humor",
      difficulty: "easy",
      points: 25,
      duration_days: 7,
      requirements: [
        { type: "cat_videos_watched", target: 7, current: 2 }
      ],
      icon: <Cat className="h-5 w-5 animate-float" />,
      completed: false,
      progress: 29,
      funFact: "Watching cute animals reduces cortisol levels by up to 68%! 🐱"
    },
    {
      id: "4",
      title: "Sunshine Appreciation Society Member",
      description: "Step outside and feel sunlight on your face for 10 minutes daily",
      category: "nature",
      difficulty: "easy",
      points: 40,
      duration_days: 10,
      requirements: [
        { type: "sunshine_sessions", target: 10, current: 4 }
      ],
      icon: <Sun className="h-5 w-5 animate-spin" />,
      completed: false,
      progress: 40,
      funFact: "Just 10 minutes of sunlight can boost serotonin production! ☀️"
    },
    {
      id: "5",
      title: "Giggle Investigator",
      description: "Find something that makes you laugh out loud every day for 2 weeks",
      category: "humor",
      difficulty: "medium",
      points: 60,
      duration_days: 14,
      requirements: [
        { type: "daily_laughs", target: 14, current: 8 }
      ],
      icon: <Smile className="h-5 w-5 animate-bounce" />,
      completed: false,
      progress: 57,
      funFact: "Laughing for 15 minutes burns the same calories as a 10-minute walk! 😂"
    },
    {
      id: "6",
      title: "Plant Whisperer",
      description: "Talk to a plant (or tree) daily and tell it about your day",
      category: "mindfulness",
      difficulty: "easy",
      points: 30,
      duration_days: 7,
      requirements: [
        { type: "plant_conversations", target: 7, current: 5 }
      ],
      icon: <TreePine className="h-5 w-5 animate-pulse" />,
      completed: false,
      progress: 71,
      funFact: "Talking to plants reduces stress and being around them improves air quality! 🌱"
    },
    {
      id: "7",
      title: "Gratitude Scavenger Hunter",
      description: "Find 3 tiny things to be grateful for each day (like finding matching socks!)",
      category: "gratitude",
      difficulty: "easy",
      points: 45,
      duration_days: 10,
      requirements: [
        { type: "gratitude_items", target: 30, current: 18 }
      ],
      icon: <Heart className="h-5 w-5 animate-pulse" />,
      completed: false,
      progress: 60,
      funFact: "Practicing gratitude rewires your brain for positivity in just 3 weeks! 💝"
    },
    {
      id: "8",
      title: "Silly Sock Coordinator",
      description: "Wear mismatched or funny socks for 5 days (life's too short for boring socks!)",
      category: "fun",
      difficulty: "easy",
      points: 20,
      duration_days: 5,
      requirements: [
        { type: "silly_sock_days", target: 5, current: 2 }
      ],
      icon: <PartyPopper className="h-5 w-5 animate-bounce" />,
      completed: false,
      progress: 40,
      funFact: "Wearing something fun activates your brain's reward system! 🧦✨"
    }
  ];

  const mockAchievements: Achievement[] = [
    {
      id: "1",
      name: "Happiness Rookie",
      description: "Completed your first silly mission",
      icon: "🌟",
      category: "milestone",
      points: 10,
      unlocked: true,
      unlockedAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Joy Spreader",
      description: "Made 50 people smile",
      icon: "😊",
      category: "kindness",
      points: 75,
      unlocked: true,
      unlockedAt: "2024-01-20"
    },
    {
      id: "3",
      name: "Giggle Master",
      description: "Laughed out loud 100 times",
      icon: "🎭",
      category: "humor",
      points: 100,
      unlocked: false
    },
    {
      id: "4",
      name: "Sunshine Warrior",
      description: "Spent 200 minutes in sunlight",
      icon: "☀️",
      category: "nature",
      points: 150,
      unlocked: false
    },
    {
      id: "5",
      name: "Plant Communication Expert",
      description: "Had 50 conversations with plants",
      icon: "🌱",
      category: "mindfulness",
      points: 200,
      unlocked: false
    },
    {
      id: "6",
      name: "Professional Cat Video Critic",
      description: "Watched 100 cat videos for mental health",
      icon: "😸",
      category: "humor",
      points: 125,
      unlocked: false
    },
    {
      id: "7",
      name: "Sock Fashion Rebel",
      description: "Wore silly socks for 30 days",
      icon: "🧦",
      category: "fun",
      points: 80,
      unlocked: false
    },
    {
      id: "8",
      name: "Gratitude Detective",
      description: "Found 1000 things to be grateful for",
      icon: "🔍",
      category: "gratitude",
      points: 300,
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
      case 'movement': return <Rainbow className="h-4 w-4" />;
      case 'kindness': return <Sparkles className="h-4 w-4" />;
      case 'humor': return <Smile className="h-4 w-4" />;
      case 'nature': return <Sun className="h-4 w-4" />;
      case 'mindfulness': return <TreePine className="h-4 w-4" />;
      case 'gratitude': return <Heart className="h-4 w-4" />;
      case 'fun': return <PartyPopper className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const startMission = async (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    toast({
      title: "🎉 Mission Started!",
      description: `Time to become a ${mission?.title}! Your silliness level is about to increase dramatically.`,
    });
  };

  const claimReward = async (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;

    toast({
      title: "🏆 Mission Complete!",
      description: `You earned ${mission.points} points! You're officially amazing at being silly AND healthy! 🎊`,
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
    <Card className="card-soft hover:shadow-md transition-all hover-scale animate-fade-in glass-panel">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg animate-pulse">
              {mission.icon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground animate-fade-in">{mission.title}</h3>
              <p className="text-sm text-muted-foreground">{mission.description}</p>
              {mission.funFact && (
                <p className="text-xs text-primary/80 mt-2 italic animate-pulse">
                  💡 {mission.funFact}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1 animate-shimmer">
              {getCategoryIcon(mission.category)}
              {mission.category}
            </Badge>
            <div 
              className={`w-3 h-3 rounded-full ${getDifficultyColor(mission.difficulty)} animate-pulse`}
              title={`${mission.difficulty} difficulty`} 
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium animate-bounce">{mission.progress}%</span>
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
              <Gift className="h-4 w-4 animate-bounce" />
              {mission.points} points
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {mission.duration_days} days
            </div>
          </div>
          
          {mission.progress === 100 ? (
            <Button onClick={() => claimReward(mission.id)} className="bg-green-500 hover:bg-green-600 animate-bounce">
              <Gift className="h-4 w-4 mr-2" />
              Claim Reward! 🎉
            </Button>
          ) : mission.progress > 0 ? (
            <Badge variant="secondary" className="animate-pulse">In Progress</Badge>
          ) : (
            <Button variant="outline" onClick={() => startMission(mission.id)} className="hover-scale">
              <Zap className="h-4 w-4 mr-2" />
              Let's Get Silly!
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
    <Card className={`card-soft transition-all hover-scale animate-fade-in ${
      achievement.unlocked 
        ? 'border-yellow-200 bg-yellow-50/50 animate-pulse-gentle' 
        : 'opacity-60 hover:opacity-80'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl animate-bounce">{achievement.icon}</div>
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
                <span className="text-xs text-green-600 animate-pulse">
                  Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          {achievement.unlocked && (
            <CheckCircle className="h-5 w-5 text-green-500 animate-bounce" />
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
              <div key={i} className="h-32 bg-muted rounded shimmer"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Target className="h-6 w-6 text-primary animate-bounce" />
        <h1 className="text-2xl font-bold text-foreground text-gradient">Silly Wellness Missions</h1>
        <PartyPopper className="h-6 w-6 text-yellow-500 animate-bounce" />
      </div>

      <Card className="card-soft bg-gradient-to-r from-primary/5 to-accent/5 animate-fade-in">
        <CardContent className="p-4 text-center">
          <h2 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 animate-pulse" />
            Welcome to the Silliness Science Lab!
            <Sparkles className="h-5 w-5 animate-pulse" />
          </h2>
          <p className="text-muted-foreground">
            Who says mental health has to be serious? Complete these ridiculous (but scientifically backed) missions 
            to boost your mood, reduce stress, and have fun doing it! 🧪✨
          </p>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-soft animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary animate-bounce">{activeMissions.length}</div>
            <div className="text-sm text-muted-foreground">Active Missions</div>
          </CardContent>
        </Card>
        <Card className="card-soft animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500 animate-pulse">{completedMissions.length}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card className="card-soft animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500 animate-bounce">{unlockedAchievements.length}</div>
            <div className="text-sm text-muted-foreground">Achievements</div>
          </CardContent>
        </Card>
        <Card className="card-soft animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500 animate-pulse">
              {missions.reduce((sum, m) => sum + (m.completed ? m.points : 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Silliness Points</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active" className="animate-fade-in">🎯 Active Missions</TabsTrigger>
          <TabsTrigger value="available" className="animate-fade-in">✨ Available Missions</TabsTrigger>
          <TabsTrigger value="achievements" className="animate-fade-in">🏆 Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-6">
          {activeMissions.length > 0 ? (
            activeMissions.map((mission, index) => (
              <div key={mission.id} style={{ animationDelay: `${index * 100}ms` }}>
                <MissionCard mission={mission} />
              </div>
            ))
          ) : (
            <Card className="card-soft">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-bounce" />
                <h3 className="font-semibold text-foreground mb-2">No Active Missions</h3>
                <p className="text-muted-foreground">Time to start being silly for your mental health! Pick a mission below! 🎪</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {availableMissions.map((mission, index) => (
              <div key={mission.id} style={{ animationDelay: `${index * 100}ms` }}>
                <MissionCard mission={mission} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <div className="space-y-6">
            {unlockedAchievements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500 animate-bounce" />
                  Your Silly Accomplishments
                </h3>
                <div className="grid gap-3">
                  {unlockedAchievements.map((achievement, index) => (
                    <div key={achievement.id} style={{ animationDelay: `${index * 100}ms` }}>
                      <AchievementCard achievement={achievement} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-muted-foreground animate-pulse" />
                Future Silly Goals
              </h3>
              <div className="grid gap-3">
                {lockedAchievements.map((achievement, index) => (
                  <div key={achievement.id} style={{ animationDelay: `${index * 100}ms` }}>
                    <AchievementCard achievement={achievement} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}