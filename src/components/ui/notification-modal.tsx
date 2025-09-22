import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Check, X, Heart, MessageCircle, UserPlus } from "lucide-react";

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'friend_request' | 'mention';
  title: string;
  message: string;
  timestamp: string;
  avatar?: string;
  isRead: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "like",
    title: "Sarah liked your post",
    message: "Tips for managing exam stress",
    timestamp: "2 minutes ago",
    avatar: "/avatars/person4.jpg",
    isRead: false,
  },
  {
    id: "2", 
    type: "comment",
    title: "Alex commented on your post",
    message: "This really helped me today, thank you!",
    timestamp: "1 hour ago",
    avatar: "/avatars/person3.jpg",
    isRead: false,
  },
  {
    id: "3",
    type: "friend_request",
    title: "Jordan sent you a friend request",
    message: "You have mutual friends in common",
    timestamp: "3 hours ago", 
    avatar: "/avatars/person6.jpg",
    isRead: true,
  },
];

interface NotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationModal({ open, onOpenChange }: NotificationModalProps) {
  const [notifications, setNotifications] = useState(sampleNotifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="h-4 w-4 text-red-500" />;
      case 'comment': return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'friend_request': return <UserPlus className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-primary hover:text-primary-foreground hover:bg-primary"
            >
              Mark all read
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-colors hover:bg-muted/50 ${
                !notification.isRead ? 'bg-primary/5 border-primary/20' : 'border-border'
              }`}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={notification.avatar} />
                  <AvatarFallback>
                    {getNotificationIcon(notification.type)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm text-foreground">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {notification.timestamp}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {notifications.length === 0 && (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}