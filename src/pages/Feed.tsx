import { useState, useEffect } from "react";
import { PostCard } from "@/components/posts/PostCard";
import { MoodTracker } from "@/components/mood/MoodTracker";
import { Button } from "@/components/ui/button";
import { PostCardSkeleton, LoadingSpinner } from "@/components/ui/skeleton-loaders";
import { Plus, TrendingUp, Clock, Users } from "lucide-react";

const samplePosts = [
  {
    id: "1",
    author: "Sarah M",
    timeAgo: "2h ago",
    title: "Anyone else feeling overwhelmed with final exams?",
    content: "I've been studying for weeks but still feel like I'm behind. The pressure is getting to me and I'm having trouble sleeping. Would love to hear how others are coping with exam stress.",
    tags: ["ExamStress", "StudentLife", "Anxiety"],
    likes: 24,
    comments: 8,
    isLiked: false,
    isSaved: true,
  },
  {
    id: "2",
    author: "Dr. Martinez",
    timeAgo: "4h ago",
    title: "5 Quick Breathing Exercises for Instant Calm",
    content: "Here are some evidence-based breathing techniques you can use anywhere: 1) Box breathing (4-4-4-4 count) 2) 4-7-8 technique 3) Simple belly breathing. Try these during stressful moments!",
    tags: ["MentalHealth", "BreathingExercises", "Wellness"],
    likes: 89,
    comments: 12,
    isLiked: true,
    isVerified: true,
  },
  {
    id: "3",
    author: "Anonymous",
    isAnonymous: true,
    timeAgo: "6h ago",
    title: "Struggling with social anxiety in group projects",
    content: "Every time we have group assignments, I get so anxious about speaking up or sharing my ideas. I end up doing most of the work alone just to avoid confrontation. Has anyone found ways to manage this?",
    tags: ["SocialAnxiety", "GroupWork", "Confidence"],
    likes: 15,
    comments: 23,
    isSaved: false,
  },
  {
    id: "4",
    author: "Mike Chen",
    timeAgo: "8h ago",
    title: "Celebrating small wins: Went to class despite feeling down",
    content: "Yesterday was tough but I made it to all my classes. Sometimes just showing up is enough. Reminded myself that progress isn't always linear and that's okay. 🌱",
    tags: ["SelfCare", "Progress", "Motivation"],
    likes: 67,
    comments: 18,
    isLiked: true,
  }
];

const tabs = [
  { id: "Trending", label: "Trending", icon: TrendingUp },
  { id: "Latest", label: "Latest", icon: Clock },
  { id: "Following", label: "Following", icon: Users },
];

export default function Feed() {
  const [activeTab, setActiveTab] = useState("Trending");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    // Simulate loading more posts
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoadingMore(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="page-container-narrow">
        {/* Mood Tracker */}
        <div className="mb-6">
          <MoodTracker />
        </div>

        {/* Feed Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex border border-border/30 rounded-[var(--radius-sm)] bg-card/50 backdrop-blur-sm p-1 shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-[var(--radius-sm)] transition-all duration-200 ${
                    activeTab === tab.id 
                      ? "bg-background text-foreground shadow-sm border border-border/50" 
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>

          <Button
            size="sm"
            className="md:hidden bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground rounded-[var(--radius-sm)]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Post
          </Button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))
          ) : (
            samplePosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))
          )}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            className="w-full md:w-auto glass-button"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <LoadingSpinner size="sm" />
                <span className="ml-2">Loading more posts...</span>
              </>
            ) : (
              "Load More Posts"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}