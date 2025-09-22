import { ReactNode } from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Desktop Layout with Sidebars */}
      <div className="hidden lg:flex">
        <LeftSidebar />
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <RightSidebar />
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <main className="min-h-[calc(100vh-8rem)]">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}