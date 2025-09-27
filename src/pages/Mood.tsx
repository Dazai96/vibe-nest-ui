import { MoodTracker } from "@/components/mood/MoodTracker";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, TrendingUp, BookOpen } from "lucide-react";

const moodHistory = [
  { date: "Today", mood: "Happy", color: "bg-[hsl(var(--mood-happy))]" },
  { date: "Yesterday", mood: "Calm", color: "bg-[hsl(var(--mood-calm))]" },
  { date: "2 days ago", mood: "Anxious", color: "bg-[hsl(var(--mood-anxious))]" },
  { date: "3 days ago", mood: "Happy", color: "bg-[hsl(var(--mood-happy))]" },
  { date: "4 days ago", mood: "Okay", color: "bg-muted" },
];

const insights = [
  {
    title: "Your mood patterns",
    description: "You tend to feel more positive in the mornings. Consider scheduling important tasks early in the day.",
    icon: TrendingUp,
  },
  {
    title: "Helpful resources",
    description: "Based on your recent mood logs, you might find breathing exercises helpful for managing anxiety.",
    icon: BookOpen,
  },
];

export default function Mood() {
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <div className="page-container-narrow">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Mood Tracking</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Track your daily emotions to better understand your mental wellbeing
          </p>
        </div>

        {/* Today's Mood Tracker */}
        <div className="mb-4 sm:mb-6">
          <MoodTracker />
        </div>

        {/* Mood History */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <h2 className="text-base sm:text-lg font-semibold text-foreground">Recent Mood History</h2>
          </div>
          
          <div className="space-y-2 sm:space-y-3">
            {moodHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${entry.color}`}></div>
                  <span className="text-xs sm:text-sm font-medium text-foreground">{entry.date}</span>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">{entry.mood}</span>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-3 sm:mt-4 touch-target min-h-[44px]">
            View Full History
          </Button>
        </Card>

        {/* Insights */}
        <div className="space-y-3 sm:space-y-4">
          {insights.map((insight, index) => (
            <Card key={index} className="p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[hsl(var(--primary-soft))] flex items-center justify-center">
                    <insight.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">{insight.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-4 sm:p-6 mt-4 sm:mt-6">
          <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Button variant="outline" className="h-auto p-3 sm:p-4 flex-col gap-2 touch-target min-h-[60px]">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xs sm:text-sm">Journal Entry</span>
            </Button>
            <Button variant="outline" className="h-auto p-3 sm:p-4 flex-col gap-2 touch-target min-h-[60px]">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-xs sm:text-sm">View Insights</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}