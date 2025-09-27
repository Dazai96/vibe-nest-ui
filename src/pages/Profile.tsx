import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Settings, User, BookOpen, Heart, Award, Edit3, Edit, Camera, Instagram, Twitter, Linkedin, MessageSquare, Globe, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const userStats = [
  { label: "Posts", value: "12", icon: Edit3 },
  { label: "Saved", value: "28", icon: BookOpen },
  { label: "Helped", value: "45", icon: Heart },
  { label: "Streak", value: "7 days", icon: Award },
];

const achievements = [
  { name: "First Post", description: "Shared your first post with the community", unlocked: true },
  { name: "Mood Tracker", description: "Logged your mood for 7 consecutive days", unlocked: true },
  { name: "Helpful Member", description: "Received 50+ helpful votes", unlocked: false },
  { name: "Community Builder", description: "Joined 5+ communities", unlocked: false },
];

const recentActivity = [
  { action: "Posted", content: "Tips for managing exam stress", time: "2h ago" },
  { action: "Commented on", content: "Breathing exercises for anxiety", time: "1d ago" },
  { action: "Saved", content: "Building healthy study habits", time: "2d ago" },
  { action: "Helped", content: "Someone with sleep issues", time: "3d ago" },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.user_metadata?.full_name || user?.user_metadata?.name || "User",
    bio: "Share a bit about yourself...",
    avatar: user?.user_metadata?.avatar_url || user?.user_metadata?.picture || "/avatars/person1.jpg",
    socialLinks: {
      instagram: "",
      twitter: "",
      linkedin: "",
      discord: ""
    }
  });

  const handleSaveProfile = () => {
    setIsEditOpen(false);
    // Here you would save to your backend
  };

  const openSocialLink = (platform: string, username: string) => {
    if (!username) return;
    
    const urls = {
      instagram: `https://instagram.com/${username}`,
      twitter: `https://twitter.com/${username}`,
      linkedin: `https://linkedin.com/in/${username}`,
      discord: `https://discord.com/users/${username}`
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank');
  };
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <div className="page-container-narrow">
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Avatar className="h-14 w-14 sm:h-16 sm:w-16">
                <AvatarImage src={profile.avatar} alt="Profile" />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-bold text-foreground truncate">{profile.name}</h1>
                <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">{profile.bio}</p>
                <Badge variant="secondary" className="mt-1 text-xs">Active Supporter</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="hover-scale touch-target h-10 w-10">
                    <Edit className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={profile.avatar} alt="Profile" />
                        <AvatarFallback>{profile.name[0]}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="touch-target min-h-[44px]">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    </div>
                    
                    <div>
                      <Label htmlFor="name">Display Name</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="touch-target min-h-[44px]"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        rows={3}
                        className="touch-target min-h-[44px]"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Social Links</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm flex items-center gap-2">
                            <Instagram className="h-3 w-3" />
                            Instagram
                          </Label>
                          <Input
                            value={profile.socialLinks.instagram}
                            onChange={(e) => setProfile({
                              ...profile, 
                              socialLinks: {...profile.socialLinks, instagram: e.target.value}
                            })}
                            placeholder="username"
                            className="touch-target min-h-[44px]"
                          />
                        </div>
                        <div>
                          <Label className="text-sm flex items-center gap-2">
                            <Twitter className="h-3 w-3" />
                            Twitter/X
                          </Label>
                          <Input
                            value={profile.socialLinks.twitter}
                            onChange={(e) => setProfile({
                              ...profile, 
                              socialLinks: {...profile.socialLinks, twitter: e.target.value}
                            })}
                            placeholder="username"
                            className="touch-target min-h-[44px]"
                          />
                        </div>
                        <div>
                          <Label className="text-sm flex items-center gap-2">
                            <Linkedin className="h-3 w-3" />
                            LinkedIn
                          </Label>
                          <Input
                            value={profile.socialLinks.linkedin}
                            onChange={(e) => setProfile({
                              ...profile, 
                              socialLinks: {...profile.socialLinks, linkedin: e.target.value}
                            })}
                            placeholder="username"
                            className="touch-target min-h-[44px]"
                          />
                        </div>
                        <div>
                          <Label className="text-sm flex items-center gap-2">
                            <MessageSquare className="h-3 w-3" />
                            Discord
                          </Label>
                          <Input
                            value={profile.socialLinks.discord}
                            onChange={(e) => setProfile({
                              ...profile, 
                              socialLinks: {...profile.socialLinks, discord: e.target.value}
                            })}
                            placeholder="username#0000"
                            className="touch-target min-h-[44px]"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={handleSaveProfile} className="w-full touch-target min-h-[44px]">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="icon" onClick={() => navigate('/settings')} className="hover-scale touch-target h-10 w-10">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.socialLinks.instagram && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => openSocialLink('instagram', profile.socialLinks.instagram)}
                className="hover-scale touch-target min-h-[44px]"
              >
                <Instagram className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Instagram</span>
              </Button>
            )}
            {profile.socialLinks.twitter && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => openSocialLink('twitter', profile.socialLinks.twitter)}
                className="hover-scale touch-target min-h-[44px]"
              >
                <Twitter className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Twitter</span>
              </Button>
            )}
            {profile.socialLinks.linkedin && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => openSocialLink('linkedin', profile.socialLinks.linkedin)}
                className="hover-scale touch-target min-h-[44px]"
              >
                <Linkedin className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">LinkedIn</span>
              </Button>
            )}
            {profile.socialLinks.discord && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => openSocialLink('discord', profile.socialLinks.discord)}
                className="hover-scale touch-target min-h-[44px]"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Discord</span>
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {userStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-muted mx-auto mb-2 flex items-center justify-center">
                  <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                </div>
                <div className="font-semibold text-foreground text-base sm:text-lg">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6 animate-fade-in">
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-3 sm:p-4 rounded-[var(--radius)] border-2 transition-all hover-scale ${
                  achievement.unlocked
                    ? "border-primary bg-[hsl(var(--primary-soft))]"
                    : "border-border bg-muted/50"
                }`}
              >
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg mb-2 flex items-center justify-center ${
                  achievement.unlocked 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                </div>
                <h3 className={`font-medium text-sm ${
                  achievement.unlocked ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {achievement.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6 animate-fade-in">
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3 sm:space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-b-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.action}</span>{" "}
                    <span className="text-muted-foreground">"{activity.content}"</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 hover-scale touch-target min-h-[44px]">
            View All Activity
          </Button>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-3 sm:p-4 flex-col gap-2 hover-scale touch-target min-h-[60px]" 
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm">Settings</span>
          </Button>
          <Button variant="outline" className="h-auto p-3 sm:p-4 flex-col gap-2 hover-scale touch-target min-h-[60px]">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm">My Posts</span>
          </Button>
        </div>
      </div>
    </div>
  );
}