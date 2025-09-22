import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, Calendar, Target, Flame } from "lucide-react";

interface MoodEntry {
  id: string;
  mood_score: number;
  intensity: string;
  created_at: string;
  notes?: string;
}

export function MoodGraph() {
  const { user } = useAuth();
  const [moodData, setMoodData] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  useEffect(() => {
    if (user) {
      fetchMoodData();
    }
  }, [user, timeRange]);

  const fetchMoodData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const daysBack = timeRange === 'week' ? 7 : 30;
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - daysBack);

      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', fromDate.toISOString())
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMoodData(data || []);
    } catch (error) {
      console.error('Error fetching mood data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLastDays = (days: number) => {
    const dates = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
    return dates;
  };

  const getMoodForDate = (date: Date) => {
    const dateStr = date.toDateString();
    return moodData.find(entry => 
      new Date(entry.created_at).toDateString() === dateStr
    );
  };

  const calculateStats = () => {
    if (moodData.length === 0) return { average: 0, streak: 0, trend: 'stable' };

    const average = moodData.reduce((sum, entry) => sum + entry.mood_score, 0) / moodData.length;
    
    // Calculate streak (consecutive days with mood entries)
    const today = new Date();
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const hasEntry = moodData.some(entry => 
        new Date(entry.created_at).toDateString() === checkDate.toDateString()
      );
      if (hasEntry) {
        streak++;
      } else {
        break;
      }
    }

    // Calculate trend
    if (moodData.length < 2) return { average, streak, trend: 'stable' };
    
    const recent = moodData.slice(-3).reduce((sum, entry) => sum + entry.mood_score, 0) / 3;
    const older = moodData.slice(0, -3).reduce((sum, entry) => sum + entry.mood_score, 0) / Math.max(1, moodData.length - 3);
    
    const trend = recent > older + 0.5 ? 'improving' : recent < older - 0.5 ? 'declining' : 'stable';
    
    return { average, streak, trend };
  };

  const stats = calculateStats();
  const displayDays = getLastDays(timeRange === 'week' ? 7 : 30);

  const getMoodColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    if (score >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getMoodEmoji = (score: number) => {
    if (score >= 8) return '😊';
    if (score >= 6) return '😐';
    if (score >= 4) return '😕';
    return '😔';
  };

  if (loading) {
    return (
      <Card className="card-soft">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="card-soft">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Mood Tracking
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={timeRange === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('week')}
            >
              Week
            </Button>
            <Button
              variant={timeRange === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('month')}
            >
              Month
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.average.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Average</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500 flex items-center justify-center gap-1">
              <Flame className="h-5 w-5" />
              {stats.streak}
            </div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
          <div className="text-center">
            <Badge variant={stats.trend === 'improving' ? 'default' : stats.trend === 'declining' ? 'destructive' : 'secondary'}>
              {stats.trend}
            </Badge>
            <div className="text-xs text-muted-foreground mt-1">Trend</div>
          </div>
        </div>

        {/* Graph */}
        <div className="space-y-2">
          <div className="flex items-end justify-between h-32 gap-1">
            {displayDays.map((date, index) => {
              const mood = getMoodForDate(date);
              const height = mood ? (mood.mood_score / 10) * 100 : 0;
              
              return (
                <div key={index} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className={`w-full rounded-t transition-all hover:opacity-80 cursor-pointer ${
                      mood ? getMoodColor(mood.mood_score) : 'bg-muted'
                    }`}
                    style={{ height: `${Math.max(height, 4)}%` }}
                    title={mood ? `${mood.mood_score}/10 - ${mood.notes || 'No notes'}` : 'No entry'}
                  />
                  <span className="text-xs text-muted-foreground">
                    {timeRange === 'week' ? date.toLocaleDateString('en', { weekday: 'short' }) : date.getDate()}
                  </span>
                  {mood && (
                    <span className="text-xs">{getMoodEmoji(mood.mood_score)}</span>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Poor (1)</span>
            <span>Great (10)</span>
          </div>
        </div>

        {/* Recent Entry */}
        {moodData.length > 0 && (
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Latest Entry</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(moodData[moodData.length - 1].created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">
                  {moodData[moodData.length - 1].mood_score}/10
                </div>
                <Badge variant="outline" className="text-xs">
                  {moodData[moodData.length - 1].intensity}
                </Badge>
              </div>
            </div>
            {moodData[moodData.length - 1].notes && (
              <p className="text-sm text-muted-foreground mt-2">
                "{moodData[moodData.length - 1].notes}"
              </p>
            )}
          </div>
        )}

        <Button variant="outline" size="sm" className="w-full">
          <Calendar className="h-4 w-4 mr-2" />
          Log Today's Mood
        </Button>
      </CardContent>
    </Card>
  );
}