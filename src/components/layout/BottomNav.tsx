import { Home, Users, BookOpen, User, Heart, BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Feed", path: "/" },
  { icon: Users, label: "Communities", path: "/communities" },
  { icon: BarChart3, label: "Admin", path: "/admin" },
  { icon: Heart, label: "Mood", path: "/mood" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border/60 bg-white/70 dark:bg-black/30 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around px-3 py-2.5 pb-[calc(0.6rem+env(safe-area-inset-bottom))]">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-[var(--radius-sm)] transition-all min-w-0 active:scale-[0.98] ${
                isActive
                  ? "text-primary bg-[hsl(var(--primary-soft))] shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span className="text-[11px] leading-none font-medium truncate">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};