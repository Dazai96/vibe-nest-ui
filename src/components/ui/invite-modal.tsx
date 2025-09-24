import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Share2, Copy, Mail, MessageCircle, Users, Loader2 } from "lucide-react";

interface InviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteModal({ open, onOpenChange }: InviteModalProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Hey! I've been using Vibenest, a supportive mental health community for students. I think you'd really benefit from connecting with others who understand what you're going through. Join me!");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const inviteLink = "https://vibenest-aurora.vercel.app/";

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Share this link with your friends",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please manually copy the link",
        variant: "destructive"
      });
    }
  };

  const sendInvite = async () => {
    if (!email.trim()) return;
    
    setIsSending(true);
    
    // Simulate sending invite
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Invite sent!",
      description: `Invitation sent to ${email}`,
    });
    
    setEmail("");
    setIsSending(false);
    onOpenChange(false);
  };

  const shareViaText = () => {
    const shareText = `${message}\n\n${inviteLink}`;
    if (navigator.share) {
      navigator.share({
        title: "Join Vibenest",
        text: shareText,
      });
    } else {
      copyToClipboard(shareText);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] glass-panel">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Invite Friends to Vibenest
          </DialogTitle>
          <DialogDescription>
            Help your friends discover a supportive mental health community.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Help your friends discover a supportive community where they can share, connect, and find mental health resources.
            </p>
          </div>
          
          <div>
            <Label htmlFor="email">Send via Email</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="friend@email.com"
                className="flex-1"
              />
              <Button 
                onClick={sendInvite}
                disabled={!email.trim() || isSending}
                className="min-w-20"
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="message">Personal Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label>Share Link</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={inviteLink}
                readOnly
                className="flex-1 bg-muted"
              />
              <Button 
                variant="outline"
                onClick={() => copyToClipboard(inviteLink)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={shareViaText}
              className="flex-1"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Share via Text
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => copyToClipboard(`${message}\n\n${inviteLink}`)}
              className="flex-1"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy All
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}