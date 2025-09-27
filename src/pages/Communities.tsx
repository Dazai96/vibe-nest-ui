import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Search, Plus, Crown, MessageCircle } from "lucide-react";
import { useState } from "react";

const communities = [
  {
    id: "1",
    name: "Exam Support",
    description: "A safe space to share study tips and cope with academic pressure",
    members: 1247,
    isJoined: true,
    category: "Academic",
    posts: 89,
    moderators: ["Dr. Smith", "Sarah M"],
  },
  {
    id: "2",
    name: "Anxiety Warriors",
    description: "Supporting each other through anxiety and panic - you're not alone",
    members: 892,
    isJoined: false,
    category: "Mental Health",
    posts: 156,
    moderators: ["Alex Chen"],
  },
  {
    id: "3",
    name: "Sleep Better",
    description: "Tips, tricks, and support for getting quality rest and healthy sleep habits",
    members: 634,
    isJoined: true,
    category: "Wellness",
    posts: 67,
    moderators: ["Dr. Martinez"],
  },
  {
    id: "4",
    name: "LGBTQ+ Students",
    description: "A welcoming community for LGBTQ+ students to connect and support each other",
    members: 445,
    isJoined: false,
    category: "Identity",
    posts: 78,
    moderators: ["Jordan K", "Sam P"],
  },
  {
    id: "5",
    name: "Mindfulness Daily",
    description: "Daily practices, meditation tips, and mindful living for students",
    members: 789,
    isJoined: true,
    category: "Mindfulness",
    posts: 134,
    moderators: ["Maya Singh"],
  },
];

const categories = ["All", "Academic", "Mental Health", "Wellness", "Identity", "Mindfulness"];

export default function Communities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <div className="page-container max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Communities</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Join supportive communities and connect with peers who understand
            </p>
          </div>
          <Button className="bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground touch-target min-h-[44px] w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4 sm:mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted border-0 focus-visible:ring-2 focus-visible:ring-ring touch-target min-h-[44px]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`touch-target min-h-[44px] ${
                selectedCategory === category ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Communities Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          {filteredCommunities.map((community) => (
            <Card key={community.id} className="p-4 sm:p-6 hover:shadow-[var(--shadow-card)] transition-shadow">
              <div className="space-y-3 sm:space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{community.name}</h3>
                      <Badge variant="outline" className="text-xs mt-1">
                        {community.category}
                      </Badge>
                    </div>
                  </div>
                  {community.isJoined && (
                    <Badge className="bg-[hsl(var(--accent-soft))] text-accent border-accent flex-shrink-0">
                      Joined
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {community.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{community.members.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{community.posts}</span>
                  </div>
                </div>

                {/* Moderators */}
                <div className="flex items-center gap-2">
                  <Crown className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-muted-foreground truncate">
                    Moderated by {community.moderators.join(", ")}
                  </span>
                </div>

                {/* Action Button */}
                <Button
                  className={`w-full touch-target min-h-[44px] ${
                    community.isJoined
                      ? "bg-muted text-muted-foreground hover:bg-[hsl(var(--muted-dark))]"
                      : "bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground"
                  }`}
                >
                  {community.isJoined ? "View Community" : "Join Community"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredCommunities.length === 0 && (
          <Card className="p-6 sm:p-8 text-center">
            <p className="text-sm sm:text-base text-muted-foreground mb-4">No communities found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="touch-target min-h-[44px]"
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}