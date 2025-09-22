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
      <div className="hidden lg:flex min-h-[calc(100vh-4rem)]">
        <div className="flex-shrink-0">
          <LeftSidebar />
        </div>
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
        <div className="flex-shrink-0">
          <RightSidebar />
        </div>
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