import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  User, 
  Shield, 
  Bell, 
  Eye, 
  Palette, 
  Globe, 
  Accessibility,
  Settings as SettingsIcon,
  ChevronRight,
  Moon,
  Sun,
  Type,
  Volume,
  RotateCcw,
  Save,
  Sparkles,
  Menu,
  TrendingUp,
  Clock,
  Filter
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import GmailSync from "@/components/settings/GmailSync";

const settingSections = [
  { id: "account", title: "Account", icon: User },
  { id: "privacy", title: "Privacy", icon: Eye },
  { id: "appearance", title: "Appearance", icon: Palette },
  { id: "language", title: "Language", icon: Globe },
  { id: "accessibility", title: "Accessibility", icon: Accessibility },
  { id: "integrations", title: "Integrations", icon: Globe },
  { id: "controls", title: "App Controls", icon: SettingsIcon },
  { id: "feed", title: "Feed Preferences", icon: SettingsIcon },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("account");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme, colorTheme, setColorTheme, fontSize, setFontSize, highContrast, setHighContrast } = useTheme();
  const [settings, setSettings] = useState({
    anonymousPosting: false,
    journalPrivacy: true,
    notifications: true,
    emailNotifications: false,
    reminderFrequency: "daily",
    voiceInteraction: false,
    language: "en",
    // Reddit-style feed preferences
    postSorting: "hot",
    feedDensity: "card",
    hideNSFW: true,
    hideLowVotePosts: false,
    communityBannerColor: "teal",
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderAccountSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Display Name</label>
            <Input placeholder="Alex Johnson" defaultValue="Alex Johnson" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
            <Input placeholder="alex@example.com" defaultValue="alex@example.com" type="email" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Bio</label>
            <Input placeholder="Computer Science Student" defaultValue="Computer Science Student" />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Security</h3>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-between">
            <span>Change Password</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <span>Two-Factor Authentication</span>
            <Badge variant="outline">Disabled</Badge>
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Get notified about replies and mentions</p>
            </div>
            <Switch 
              checked={settings.notifications}
              onCheckedChange={(checked) => updateSetting('notifications', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Weekly digest and important updates</p>
            </div>
            <Switch 
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Posting Privacy</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Anonymous Posting by Default</p>
              <p className="text-sm text-muted-foreground">Post anonymously unless you choose otherwise</p>
            </div>
            <Switch 
              checked={settings.anonymousPosting}
              onCheckedChange={(checked) => updateSetting('anonymousPosting', checked)}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Journal Privacy</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Private Journal Entries</p>
              <p className="text-sm text-muted-foreground">Keep your mood logs and journal entries private</p>
            </div>
            <Switch 
              checked={settings.journalPrivacy}
              onCheckedChange={(checked) => updateSetting('journalPrivacy', checked)}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Data Sharing</h3>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-between">
            <span>Download My Data</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between text-destructive">
            <span>Delete Account</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Theme Mode</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={theme === "light" ? "secondary" : "outline"}
            onClick={() => setTheme("light")}
            className="h-auto p-4 flex-col gap-2 transition-smooth hover-scale"
          >
            <Sun className="h-5 w-5" />
            <span>Light</span>
          </Button>
          <Button
            variant={theme === "dark" ? "secondary" : "outline"}
            onClick={() => setTheme("dark")}
            className="h-auto p-4 flex-col gap-2 transition-smooth hover-scale"
          >
            <Moon className="h-5 w-5" />
            <span>Dark</span>
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Color Theme</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: "teal", name: "Teal", color: "bg-[hsl(186,85%,45%)]" },
            { id: "blue", name: "Blue", color: "bg-[hsl(220,85%,55%)]" },
            { id: "purple", name: "Purple", color: "bg-[hsl(270,75%,60%)]" },
            { id: "lavender", name: "Lavender", color: "bg-[hsl(260,45%,75%)]" },
            { id: "mint", name: "Mint", color: "bg-[hsl(150,40%,70%)]" },
            { id: "peach", name: "Peach", color: "bg-[hsl(20,60%,75%)]" },
            { id: "sky", name: "Sky Blue", color: "bg-[hsl(200,50%,75%)]" },
            { id: "pink", name: "Soft Pink", color: "bg-[hsl(330,50%,75%)]" },
            { id: "neutral", name: "Neutral", color: "bg-[hsl(215,25%,45%)]" },
          ].map((themeOption) => (
            <Button
              key={themeOption.id}
              variant={colorTheme === themeOption.id ? "secondary" : "outline"}
              onClick={() => setColorTheme(themeOption.id as any)}
              className="h-auto p-4 flex-col gap-2 transition-smooth hover-scale"
            >
              <div className={`w-6 h-6 rounded-full ${themeOption.color}`}></div>
              <span>{themeOption.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLanguageSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Language Preference</h3>
        <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="pt">Português</SelectItem>
            <SelectItem value="zh">中文</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Regional Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Time Zone</label>
            <Select defaultValue="est">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="est">Eastern Time (EST)</SelectItem>
                <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="cet">Central European Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccessibilitySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Text Size</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "small", name: "Small", icon: Type },
            { id: "medium", name: "Medium", icon: Type },
            { id: "large", name: "Large", icon: Type },
          ].map((size) => (
            <Button
              key={size.id}
              variant={fontSize === size.id ? "secondary" : "outline"}
              onClick={() => setFontSize(size.id as any)}
              className="h-auto p-4 flex-col gap-2 transition-smooth hover-scale"
            >
              <size.icon className={`${size.id === "small" ? "h-4 w-4" : size.id === "large" ? "h-7 w-7" : "h-5 w-5"}`} />
              <span>{size.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Visual Accessibility</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">High Contrast Mode</p>
              <p className="text-sm text-muted-foreground">Increase contrast for better readability</p>
            </div>
            <Switch 
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Interaction</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Voice Interaction</p>
              <p className="text-sm text-muted-foreground">Enable voice commands and audio feedback</p>
            </div>
            <Switch 
              checked={settings.voiceInteraction}
              onCheckedChange={(checked) => updateSetting('voiceInteraction', checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderControlsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Notification Controls</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Mute All Notifications</p>
              <p className="text-sm text-muted-foreground">Temporarily disable all notifications</p>
            </div>
            <Switch />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Reminder Frequency</label>
            <Select value={settings.reminderFrequency} onValueChange={(value) => updateSetting('reminderFrequency', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Data Management</h3>
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              <span>Reset Mood Data</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Volume className="h-4 w-4" />
              <span>Clear Cache</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Data Integrations</h3>
        <p className="text-muted-foreground mb-6">
          Connect your external accounts to personalize your experience and sync data automatically.
        </p>
        <GmailSync />
      </div>
    </div>
  );

  const renderFeedSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Post Sorting</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "hot", name: "Hot", icon: TrendingUp, description: "Popular posts" },
            { id: "new", name: "New", icon: Clock, description: "Latest posts" },
            { id: "top", name: "Top", icon: TrendingUp, description: "Most upvoted" },
          ].map((option) => (
            <Button
              key={option.id}
              variant={settings.postSorting === option.id ? "secondary" : "outline"}
              onClick={() => updateSetting('postSorting', option.id)}
              className="h-auto p-4 flex-col gap-2 transition-smooth hover-scale"
            >
              <option.icon className="h-5 w-5" />
              <div className="text-center">
                <div className="font-medium">{option.name}</div>
                <div className="text-xs text-muted-foreground">{option.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Feed Display</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={settings.feedDensity === "compact" ? "secondary" : "outline"}
            onClick={() => updateSetting('feedDensity', 'compact')}
            className="h-auto p-4 flex-col gap-2 transition-smooth hover-scale"
          >
            <div className="space-y-1">
              <div className="h-2 w-12 bg-current rounded opacity-60"></div>
              <div className="h-1 w-8 bg-current rounded opacity-40"></div>
            </div>
            <span>Compact View</span>
          </Button>
          <Button
            variant={settings.feedDensity === "card" ? "secondary" : "outline"}
            onClick={() => updateSetting('feedDensity', 'card')}
            className="h-auto p-4 flex-col gap-2 transition-smooth hover-scale"
          >
            <div className="space-y-2">
              <div className="h-3 w-12 bg-current rounded opacity-60"></div>
              <div className="h-1 w-10 bg-current rounded opacity-40"></div>
              <div className="h-1 w-8 bg-current rounded opacity-30"></div>
            </div>
            <span>Card View</span>
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Content Filters</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Hide sensitive content</p>
              <p className="text-sm text-muted-foreground">Filter out potentially sensitive posts</p>
            </div>
            <Switch 
              checked={settings.hideNSFW}
              onCheckedChange={(checked) => updateSetting('hideNSFW', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Hide low engagement posts</p>
              <p className="text-sm text-muted-foreground">Filter posts with few upvotes or comments</p>
            </div>
            <Switch 
              checked={settings.hideLowVotePosts}
              onCheckedChange={(checked) => updateSetting('hideLowVotePosts', checked)}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Community Appearance</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "teal", name: "Teal", color: "bg-[hsl(186,85%,45%)]" },
            { id: "blue", name: "Blue", color: "bg-[hsl(220,85%,55%)]" },
            { id: "purple", name: "Purple", color: "bg-[hsl(270,75%,60%)]" },
            { id: "green", name: "Green", color: "bg-[hsl(142,65%,50%)]" },
            { id: "orange", name: "Orange", color: "bg-[hsl(20,85%,55%)]" },
            { id: "pink", name: "Pink", color: "bg-[hsl(330,50%,65%)]" },
          ].map((color) => (
            <Button
              key={color.id}
              variant={settings.communityBannerColor === color.id ? "secondary" : "outline"}
              onClick={() => updateSetting('communityBannerColor', color.id)}
              className="h-auto p-4 flex-col gap-2 transition-smooth hover-scale"
            >
              <div className={`w-8 h-8 rounded-full ${color.color}`}></div>
              <span>{color.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case "account": return renderAccountSection();
      case "privacy": return renderPrivacySection();
      case "appearance": return renderAppearanceSection();
      case "language": return renderLanguageSection();
      case "accessibility": return renderAccessibilitySection();
      case "integrations": return renderIntegrationsSection();
      case "controls": return renderControlsSection();
      case "feed": return renderFeedSection();
      default: return renderAccountSection();
    }
  };

  const renderSidebarContent = () => (
    <div className="space-y-1 p-2">
      {settingSections.map((section) => (
        <Button
          key={section.id}
          variant={activeSection === section.id ? "secondary" : "ghost"}
          onClick={() => {
            setActiveSection(section.id);
            setSidebarOpen(false);
          }}
          className="w-full justify-start gap-3 h-auto py-3 px-4 transition-smooth hover-scale"
        >
          <section.icon className="h-5 w-5 flex-shrink-0" />
          <span className="font-medium">{section.title}</span>
        </Button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="page-container-wide">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Customize your Vibenest experience and manage your preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Mobile Settings Navigation */}
          <div className="lg:hidden">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full mb-4">
                  <Menu className="h-4 w-4 mr-2" />
                  Settings Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="py-4">
                  <h2 className="text-lg font-semibold mb-4">Settings</h2>
                  {renderSidebarContent()}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Settings Navigation */}
          <Card className="hidden lg:block lg:col-span-1 p-0 h-fit">
            <div className="p-4 border-b">
              <h2 className="font-semibold text-foreground">Settings</h2>
            </div>
            {renderSidebarContent()}
          </Card>

          {/* Settings Content */}
          <Card className="lg:col-span-3 p-6">
            <div className="animate-fade-in">
              {renderSectionContent()}
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex justify-end">
              <Button className="bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground transition-smooth hover-scale">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground animate-fade-in">
            Developed by Stark from team clarity X, and vibenest v1 "aurora"
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-xs text-muted-foreground">Made with ❤️ for mental wellness</span>
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}