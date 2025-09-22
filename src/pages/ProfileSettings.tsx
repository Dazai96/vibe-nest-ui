import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { 
  User, 
  Camera, 
  Link2, 
  Bell, 
  Shield, 
  Palette, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MessageSquare,
  Save,
  Globe,
  Mail,
  Phone
} from "lucide-react";

export default function ProfileSettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    display_name: "",
    bio: "",
    institution: "",
    department: "",
    year_of_study: "",
    avatar_url: "",
    privacy_level: "private",
    social_links: {
      instagram: "",
      twitter: "",
      linkedin: "",
      discord: ""
    },
    notification_preferences: {
      push: true,
      email: true,
      crisis_alerts: true,
      community_updates: true,
      mood_reminders: true
    }
  });

  const [theme, setTheme] = useState("light");
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState("");

  const availableThemes = [
    { value: "light", label: "Light", preview: "bg-white text-gray-900" },
    { value: "dark", label: "Dark", preview: "bg-gray-900 text-white" },
    { value: "pastel", label: "Pastel Gradient", preview: "bg-gradient-to-r from-pink-200 to-blue-200" },
    { value: "monochrome", label: "Monochrome", preview: "bg-gray-100 text-gray-800" },
    { value: "high-contrast", label: "High Contrast", preview: "bg-black text-yellow-400" }
  ];

  const predefinedInterests = [
    "Mental Health", "Study Tips", "Mindfulness", "Exercise", "Nutrition", 
    "Sleep", "Stress Management", "Social Anxiety", "Depression Support", 
    "ADHD", "Academic Pressure", "Time Management", "Self-Care", "Meditation"
  ];

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          display_name: data.display_name || "",
          bio: data.bio || "",
          institution: data.institution || "",
          department: data.department || "",
          year_of_study: data.year_of_study?.toString() || "",
          avatar_url: data.avatar_url || "",
          privacy_level: data.privacy_level || "private",
          social_links: {
            instagram: "",
            twitter: "",
            linkedin: "",
            discord: "",
            ...((typeof data.social_links === 'object' && data.social_links) || {})
          },
          notification_preferences: {
            push: true,
            email: true,
            crisis_alerts: true,
            community_updates: true,
            mood_reminders: true,
            ...((typeof data.notification_preferences === 'object' && data.notification_preferences) || {})
          }
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile settings",
        variant: "destructive"
      });
    }
  };

  const saveProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const profileData = {
        user_id: user.id,
        display_name: profile.display_name,
        bio: profile.bio,
        institution: profile.institution,
        department: profile.department,
        year_of_study: profile.year_of_study ? parseInt(profile.year_of_study) : null,
        avatar_url: profile.avatar_url,
        privacy_level: profile.privacy_level,
        social_links: profile.social_links,
        notification_preferences: profile.notification_preferences,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'user_id' });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile settings saved successfully",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3">
        <User className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
      </div>

      {/* Basic Profile Information */}
      <Card className="card-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar_url || "/avatars/person1.jpg"} alt="Profile" />
              <AvatarFallback>{profile.display_name?.[0] || user?.email?.[0]}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <Camera className="h-4 w-4 mr-2" />
              Change Photo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="display_name">Display Name</Label>
              <Input
                id="display_name"
                value={profile.display_name}
                onChange={(e) => setProfile({...profile, display_name: e.target.value})}
                placeholder="Your display name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user?.email || ""}
                disabled
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                value={profile.institution}
                onChange={(e) => setProfile({...profile, institution: e.target.value})}
                placeholder="Your university/college"
              />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={profile.department}
                onChange={(e) => setProfile({...profile, department: e.target.value})}
                placeholder="Your major/department"
              />
            </div>
            <div>
              <Label htmlFor="year_of_study">Year of Study</Label>
              <Select value={profile.year_of_study} onValueChange={(value) => setProfile({...profile, year_of_study: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Year</SelectItem>
                  <SelectItem value="2">2nd Year</SelectItem>
                  <SelectItem value="3">3rd Year</SelectItem>
                  <SelectItem value="4">4th Year</SelectItem>
                  <SelectItem value="5">Graduate</SelectItem>
                  <SelectItem value="6">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              placeholder="Tell others about yourself..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="card-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            Social Links
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="flex items-center gap-2">
                <Instagram className="h-4 w-4" />
                Instagram
              </Label>
              <div className="flex gap-2">
                <Input
                  value={profile.social_links.instagram}
                  onChange={(e) => setProfile({
                    ...profile, 
                    social_links: {...profile.social_links, instagram: e.target.value}
                  })}
                  placeholder="username"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openSocialLink('instagram', profile.social_links.instagram)}
                  disabled={!profile.social_links.instagram}
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter/X
              </Label>
              <div className="flex gap-2">
                <Input
                  value={profile.social_links.twitter}
                  onChange={(e) => setProfile({
                    ...profile, 
                    social_links: {...profile.social_links, twitter: e.target.value}
                  })}
                  placeholder="username"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openSocialLink('twitter', profile.social_links.twitter)}
                  disabled={!profile.social_links.twitter}
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Label>
              <div className="flex gap-2">
                <Input
                  value={profile.social_links.linkedin}
                  onChange={(e) => setProfile({
                    ...profile, 
                    social_links: {...profile.social_links, linkedin: e.target.value}
                  })}
                  placeholder="username"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openSocialLink('linkedin', profile.social_links.linkedin)}
                  disabled={!profile.social_links.linkedin}
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Discord
              </Label>
              <div className="flex gap-2">
                <Input
                  value={profile.social_links.discord}
                  onChange={(e) => setProfile({
                    ...profile, 
                    social_links: {...profile.social_links, discord: e.target.value}
                  })}
                  placeholder="username#0000"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openSocialLink('discord', profile.social_links.discord)}
                  disabled={!profile.social_links.discord}
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interests */}
      <Card className="card-soft">
        <CardHeader>
          <CardTitle>Interests & Topics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeInterest(interest)}>
                {interest} ×
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Add an interest..."
              onKeyPress={(e) => e.key === 'Enter' && addInterest()}
            />
            <Button onClick={addInterest} variant="outline">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {predefinedInterests.map((interest) => (
              <Badge
                key={interest}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => !interests.includes(interest) && setInterests([...interests, interest])}
              >
                + {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="card-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Visibility
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Profile Visibility</Label>
            <Select value={profile.privacy_level} onValueChange={(value) => setProfile({...profile, privacy_level: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Everyone can see</SelectItem>
                <SelectItem value="friends">Friends Only</SelectItem>
                <SelectItem value="private">Private - Only me</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="card-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries({
            push: "Push Notifications",
            email: "Email Notifications", 
            crisis_alerts: "Crisis Alert Notifications",
            community_updates: "Community Updates",
            mood_reminders: "Daily Mood Reminders"
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <Label>{label}</Label>
              <Switch
                checked={profile.notification_preferences[key as keyof typeof profile.notification_preferences]}
                onCheckedChange={(checked) => setProfile({
                  ...profile,
                  notification_preferences: {
                    ...profile.notification_preferences,
                    [key]: checked
                  }
                })}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card className="card-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Customization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableThemes.map((themeOption) => (
              <div
                key={themeOption.value}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  theme === themeOption.value 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setTheme(themeOption.value)}
              >
                <div className={`h-12 w-full rounded mb-2 ${themeOption.preview}`}></div>
                <p className="font-medium">{themeOption.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveProfile} disabled={loading} className="min-w-32">
          {loading ? (
            "Saving..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}