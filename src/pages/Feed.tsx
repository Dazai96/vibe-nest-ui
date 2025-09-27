import { useState, useEffect } from "react";
import { PostCard } from "@/components/posts/PostCard";
import { MoodTracker } from "@/components/mood/MoodTracker";
import { Button } from "@/components/ui/button";
import { PostCardSkeleton, LoadingSpinner } from "@/components/ui/skeleton-loaders";
import { SillyFactLoader } from "@/components/ui/silly-fact-loader";
import { Plus, TrendingUp, Clock, Users } from "lucide-react";
import { dataRandomizer } from "@/lib/dataRandomizer";

// Generate randomized posts
const generateRandomPosts = () => {
  const authors = [
    "Sarah M", "Dr. Martinez", "Mike Chen", "Emma R", "Dr. Thompson", "Alex K",
    "Jordan T", "Dr. Williams", "Casey L", "Riley S", "Avery M", "Quinn P"
  ];
  
  const timeAgoOptions = ["2h ago", "4h ago", "6h ago", "8h ago", "12h ago", "1d ago", "2d ago", "3d ago"];
  const tagOptions = [
    ["ExamStress", "StudentLife", "Anxiety"],
    ["MentalHealth", "BreathingExercises", "Wellness"],
    ["SocialAnxiety", "GroupWork", "Confidence"],
    ["SmallWins", "Motivation", "Gratitude"],
    ["Meditation", "Apps", "Anxiety", "Recommendations"],
    ["SAD", "SeasonalDepression", "MentalHealth", "Winter"],
    ["StudyGroup", "Finals", "Collaboration", "Academic"],
    ["Depression", "Help", "Support", "Struggling"],
    ["Therapy", "Counseling", "ProfessionalHelp"],
    ["SelfCare", "Wellness", "MentalHealth"],
    ["CampusLife", "StudentSupport", "Resources"],
    ["Recovery", "Healing", "Progress"]
  ];

  return Array.from({ length: 8 }, (_, i) => {
    const isAnonymous = dataRandomizer.randomBoolean();
    const isVerified = !isAnonymous && dataRandomizer.randomBoolean();
    const { firstName, lastName } = dataRandomizer.getRandomUserNames();
    const displayAuthor = isAnonymous ? "Anonymous" : `${firstName} ${lastName.charAt(0)}`;
    
    return {
      id: (i + 1).toString(),
      author: displayAuthor,
      timeAgo: dataRandomizer.randomChoice(timeAgoOptions),
      title: dataRandomizer.getRandomPostContent(),
      content: dataRandomizer.getRandomPostContent() + " " + dataRandomizer.getRandomPostContent(),
      tags: dataRandomizer.randomChoice(tagOptions),
      likes: dataRandomizer.randomBetween(5, 100),
      comments: dataRandomizer.randomBetween(2, 40),
      isLiked: dataRandomizer.randomBoolean(),
      isSaved: dataRandomizer.randomBoolean(),
      isAnonymous,
      isVerified: isVerified,
    };
  });
};

const samplePosts = generateRandomPosts();

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
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <div className="page-container-narrow">
        {/* Mood Tracker */}
        <div className="mb-4 sm:mb-6">
          <MoodTracker />
        </div>

        {/* Feed Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex border border-border/30 rounded-[var(--radius-sm)] bg-card/50 backdrop-blur-sm p-1 shadow-sm w-full sm:w-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 sm:flex-none rounded-[var(--radius-sm)] transition-all duration-200 touch-target min-h-[44px] ${
                    activeTab === tab.id 
                      ? "bg-background text-foreground shadow-sm border border-border/50" 
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                </Button>
              );
            })}
          </div>

          <Button
            size="sm"
            className="w-full sm:w-auto bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground rounded-[var(--radius-sm)] touch-target min-h-[44px]"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="text-sm sm:text-base">Post</span>
          </Button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-3 sm:space-y-4">
          {isLoading ? (
            <div className="space-y-4 sm:space-y-6">
              {/* Loading skeletons */}
              {Array.from({ length: 3 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
              {/* Silly fact during loading */}
              <div className="flex justify-center py-6 sm:py-8">
                <SillyFactLoader />
              </div>
            </div>
          ) : (
            samplePosts.map((post, idx) => (
              <div key={post.id} className="glass-card rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 dark:border-white/5 will-change-transform">
                <PostCard {...post} />
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        <div className="mt-6 sm:mt-8 text-center">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto glass-button touch-target min-h-[44px]"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <>
                <LoadingSpinner size="sm" />
                <span className="ml-2 text-sm sm:text-base">Loading more posts...</span>
              </>
            ) : (
              <span className="text-sm sm:text-base">Load More Posts</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}