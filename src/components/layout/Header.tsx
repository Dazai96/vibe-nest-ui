import { useState } from "react";
import { Bell, Search, Plus, ChevronDown, Settings, Stethoscope, BarChart3, User, LogOut, Home, Users, UserPlus, Share2, Star, Lightbulb, Trophy, Heart, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationModal } from "@/components/ui/notification-modal";
import { PostModal } from "@/components/ui/post-modal";
import { InviteModal } from "@/components/ui/invite-modal";
// Logo removed; using text brand instead

export const Header = () => {
  const { signOut, user } = useAuth();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const navItems = [
    { icon: Home, label: "Feed", path: "/" },
    { icon: Users, label: "Communities", path: "/communities" },
    { icon: BarChart3, label: "Admin Dashboard", path: "/admin" },
    { icon: Heart, label: "Mood", path: "/mood" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/70 dark:bg-black/30 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="w-full grid [grid-template-columns:auto_1fr_auto] items-center h-14 md:h-16 gap-3 px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 md:gap-4 min-w-0 col-start-1 justify-start">
          <NavLink to="/" className="flex items-center" data-emoji-trigger>
            <svg className="mr-2 hidden sm:block logo-breath" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle className="logo-breath-ring" cx="12" cy="12" r="5" />
              <circle className="logo-breath-ring" cx="12" cy="12" r="8" />
              <circle className="logo-breath-ring" cx="12" cy="12" r="11" />
            </svg>
            <span className="font-bold tracking-tight text-2xl md:text-3xl text-foreground transition-transform duration-150 will-change-transform hover:-translate-y-0.5 active:translate-y-0">VibeNest</span>
          </NavLink>

          {/* Home selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:inline-flex h-9 rounded-full px-3 gap-2 ml-2 md:ml-3">
                <Home className="h-4 w-4" />
                <span className="text-sm">Home</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {navItems.map(({ icon: Icon, label, path }) => (
                <DropdownMenuItem key={path} asChild>
                  <NavLink to={path} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {label}
                  </NavLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden md:flex col-start-2 justify-center">
          <div className="relative w-full max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search posts, questions, resources..."
              className="pl-10 pr-3 h-10 rounded-full bg-muted border-0 focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 md:gap-2 col-start-3 justify-end">
          {/* Mobile AI quick button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex md:hidden relative hover-scale"
            onClick={() => window.dispatchEvent(new Event('open-chatbot'))}
            aria-label="Open AI Assistant"
          >
            <Bot className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover-scale"
            onClick={() => setNotificationOpen(true)}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive border-2 border-background"></span>
          </Button>
          
          <Button
            size="sm"
            className="hidden sm:flex items-center gap-2 bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground rounded-[var(--radius-sm)] hover-scale"
            onClick={() => setPostOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Post
          </Button>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full hover-scale">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={(user as any)?.user_metadata?.avatar_url || (user as any)?.user_metadata?.picture || (user as any)?.user_metadata?.avatar || (user as any)?.user_metadata?.avatarUrl || "/avatars/person1.jpg"} 
                    alt={(user as any)?.user_metadata?.full_name || user?.email || 'User'} 
                  />
                  <AvatarFallback>
                    {(user?.user_metadata?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border border-border shadow-lg z-50">
              {/* Mobile-only Right Sidebar Access */}
              <div className="md:hidden">
                <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                  Community
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <NavLink to="/friends" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Friend Suggestions
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/leaderboard" className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Top Helpers
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/missions" className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    Wellness Missions
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/resources" className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Daily Tips
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>

              {/* Regular Menu Items */}
              <DropdownMenuItem asChild>
                <NavLink to="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="/therapists" className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  Find Therapists
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="/resources" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Resources
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <NavLink to="/admin" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Admin Dashboard
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <NavLink to="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setInviteOpen(true)}>
                <Share2 className="mr-2 h-4 w-4" />
                Invite Friends
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Modals */}
      <NotificationModal open={notificationOpen} onOpenChange={setNotificationOpen} />
      <PostModal open={postOpen} onOpenChange={setPostOpen} />
      <InviteModal open={inviteOpen} onOpenChange={setInviteOpen} />
    </header>
  );
};