import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  useEffect(() => {
    const handler = () => setIsChatbotOpen(true);
    window.addEventListener('open-chatbot', handler as EventListener);
    return () => window.removeEventListener('open-chatbot', handler as EventListener);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Desktop Layout with Sidebars */}
      <div className="hidden lg:flex min-h-[calc(100vh-4rem)]">
        <motion.div className="flex-shrink-0" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
          <LeftSidebar />
        </motion.div>
        <motion.main className="flex-1 overflow-x-hidden" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          {children}
        </motion.main>
        <motion.div className="flex-shrink-0" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
          <RightSidebar />
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <motion.main className="min-h-[calc(100vh-8rem)] px-3 pb-20" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {children}
        </motion.main>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.05 }}>
          <BottomNav />
        </motion.div>
      </div>

      {/* Floating AI Chatbot Button (hidden on mobile) */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
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