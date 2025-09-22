import { useState } from "react";
import { Bell, Search, Plus, Menu, Heart, Settings, Stethoscope, BarChart3, User, LogOut, Home, Users, UserPlus, Share2, Star, Lightbulb, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationModal } from "@/components/ui/notification-modal";
import { PostModal } from "@/components/ui/post-modal";
import { InviteModal } from "@/components/ui/invite-modal";

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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu - Desktop Only */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
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

          <NavLink to="/" className="flex items-center gap-2 hover-scale transition-smooth">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary">
              <Heart className="h-6 w-6 text-primary-foreground fill-current" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Vibenest</h1>
          </NavLink>
        </div>

        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search posts, questions, resources..."
              className="pl-10 bg-muted border-0 focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
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
                    src={user?.user_metadata?.avatar_url || user?.user_metadata?.picture || "/avatars/person1.jpg"} 
                    alt={user?.user_metadata?.full_name || user?.email || 'User'} 
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