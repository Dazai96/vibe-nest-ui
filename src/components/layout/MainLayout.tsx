import { ReactNode, useState } from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import AIChatbot from "@/components/chat/AIChatbot";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

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

      {/* Floating AI Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsChatbotOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>

      {/* AI Chatbot Modal */}
      <AIChatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </div>
  );
}