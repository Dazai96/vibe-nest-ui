import { useEffect, useState } from "react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { useNavigate } from "react-router-dom";
import { Search, Home, Users, Heart, User, Settings, Star, Plus } from "lucide-react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !open)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const go = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder="Search or jump to..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => go("/")}>
              <Home className="mr-2 h-4 w-4" />
              Feed
            </CommandItem>
            <CommandItem onSelect={() => go("/communities")}>
              <Users className="mr-2 h-4 w-4" />
              Communities
            </CommandItem>
            <CommandItem onSelect={() => go("/mood")}>
              <Heart className="mr-2 h-4 w-4" />
              Mood
            </CommandItem>
            <CommandItem onSelect={() => go("/profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </CommandItem>
            <CommandItem onSelect={() => go("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => go("/subscription")}>
              <Star className="mr-2 h-4 w-4" />
              View Plans
            </CommandItem>
            <CommandItem onSelect={() => go("/profile/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </CommandItem>
            <CommandItem onSelect={() => go("/")}>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}


