import { useState } from "react";
import { Bell, Search, Plus, ChevronDown, Settings, Stethoscope, BarChart3, User, LogOut, Home, Users, UserPlus, Share2, Star, Lightbulb, Trophy, Heart, Bot, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationModal } from "@/components/ui/notification-modal";
import { PostModal } from "@/components/ui/post-modal";
import { InviteModal } from "@/components/ui/invite-modal";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
      <div className="w-full flex items-center justify-between h-14 md:h-16 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        {/* Left Section - Logo & Mobile Menu */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          {/* Mobile Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden h-10 w-10 touch-target">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <NavLink to="/" className="flex items-center gap-2" data-emoji-trigger>
                    <svg className="logo-breath" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <circle className="logo-breath-ring" cx="12" cy="12" r="5" />
                      <circle className="logo-breath-ring" cx="12" cy="12" r="8" />
                      <circle className="logo-breath-ring" cx="12" cy="12" r="11" />
                    </svg>
                    <span className="font-bold text-xl text-foreground">VibeNest</span>
                  </NavLink>
                </div>
                
                {/* Mobile Navigation */}
                <div className="flex-1 p-4 space-y-2">
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-muted-foreground mb-3">Navigation</div>
                    {navItems.map(({ icon: Icon, label, path }) => (
                      <NavLink key={path} to={path}>
                        {({ isActive }) => (
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            size="sm"
                            className="w-full justify-start gap-3 h-12 text-base touch-target"
                          >
                            <Icon className="h-5 w-5" />
                            {label}
                          </Button>
                        )}
                      </NavLink>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="text-xs font-medium text-muted-foreground mb-3">Community</div>
                    <div className="space-y-1">
                      <NavLink to="/friends">
                        <Button variant="ghost" size="sm" className="w-full justify-start gap-3 h-12 text-base touch-target">
                          <UserPlus className="h-5 w-5" />
                          Friend Suggestions
                        </Button>
                      </NavLink>
                      <NavLink to="/leaderboard">
                        <Button variant="ghost" size="sm" className="w-full justify-start gap-3 h-12 text-base touch-target">
                          <Star className="h-5 w-5" />
                          Top Helpers
                        </Button>
                      </NavLink>
                      <NavLink to="/missions">
                        <Button variant="ghost" size="sm" className="w-full justify-start gap-3 h-12 text-base touch-target">
                          <Trophy className="h-5 w-5" />
                          Wellness Missions
                        </Button>
                      </NavLink>
                      <NavLink to="/resources">
                        <Button variant="ghost" size="sm" className="w-full justify-start gap-3 h-12 text-base touch-target">
                          <Lightbulb className="h-5 w-5" />
                          Daily Tips
                        </Button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo & Brand */}
          <NavLink to="/" className="flex items-center gap-2" data-emoji-trigger>
            <svg className="hidden sm:block logo-breath" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle className="logo-breath-ring" cx="12" cy="12" r="5" />
              <circle className="logo-breath-ring" cx="12" cy="12" r="8" />
              <circle className="logo-breath-ring" cx="12" cy="12" r="11" />
            </svg>
            <span className="font-bold tracking-tight text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground transition-transform duration-150 will-change-transform hover:-translate-y-0.5 active:translate-y-0">VibeNest</span>
          </NavLink>

          {/* Desktop Home selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden lg:inline-flex h-9 rounded-full px-3 gap-2 ml-2">
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

        {/* Center Section - Search Bar (Desktop only) */}
        <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search posts, questions, resources..."
              className="pl-10 pr-3 h-10 rounded-full bg-muted border-0 focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-10 w-10 touch-target"
            onClick={() => {/* TODO: Implement mobile search */}}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Mobile AI quick button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 touch-target"
            onClick={() => window.dispatchEvent(new Event('open-chatbot'))}
            aria-label="Open AI Assistant"
          >
            <Bot className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 touch-target relative"
            onClick={() => setNotificationOpen(true)}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive border-2 border-background"></span>
          </Button>
          
          <Button
            size="sm"
            className="hidden sm:flex items-center gap-2 bg-primary hover:bg-[hsl(var(--primary-hover))] text-primary-foreground rounded-[var(--radius-sm)] hover-scale touch-target min-h-[44px]"
            onClick={() => setPostOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden md:inline">Post</span>
          </Button>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover-scale touch-target">
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