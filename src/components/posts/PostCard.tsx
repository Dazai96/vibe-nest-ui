import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { motion } from "framer-motion";

interface PostCardProps {
  id: string;
  author: string;
  isAnonymous?: boolean;
  timeAgo: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  isLiked?: boolean;
  isSaved?: boolean;
  isVerified?: boolean;
}

export const PostCard = ({
  author,
  isAnonymous = false,
  timeAgo,
  title,
  content,
  tags,
  likes,
  comments,
  isLiked = false,
  isSaved = false,
  isVerified = false,
}: PostCardProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    toast(liked ? "Like removed" : "Post liked", { description: title });
  };

  const handleSave = () => {
    setSaved(!saved);
    toast(!saved ? "Saved to bookmarks" : "Removed from bookmarks", { description: title });
  };

  const handleShare = async () => {
    const shareData = {
      title: `Vibenest • ${title}`,
      text: content,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
        toast("Link copied to clipboard");
      }
    } catch (e) {
      toast("Couldn't share. Link copied instead.");
      try {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      } catch {}
    }
  };

  return (
    <motion.article 
      whileHover={{ y: -2 }} 
      transition={{ type: "spring", stiffness: 300, damping: 22, duration: 0.15 }} 
      className="bg-card border border-border rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden p-3 sm:p-4 space-y-3 hover:shadow-[var(--shadow-card)] transition-shadow will-change-transform"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            {isAnonymous ? (
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              </div>
            ) : (
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-sm sm:text-base font-medium text-primary-foreground">
                  {author.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
              <span className="font-medium text-sm sm:text-base truncate">
                {isAnonymous ? "Anonymous" : author}
              </span>
              {isVerified && (
                <Badge variant="secondary" className="text-xs bg-[hsl(var(--accent-soft))] text-accent flex-shrink-0">
                  Counsellor
                </Badge>
              )}
              <span className="text-muted-foreground text-xs sm:text-sm flex-shrink-0">•</span>
              <span className="text-muted-foreground text-xs sm:text-sm flex-shrink-0">{timeAgo}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 touch-target flex-shrink-0">
          <MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="font-semibold text-foreground leading-snug text-sm sm:text-base md:text-lg">{title}</h3>
        <p className="text-foreground text-sm sm:text-base leading-relaxed">{content}</p>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs bg-muted text-muted-foreground border-border hover:bg-[hsl(var(--primary-soft))] hover:text-primary hover:border-primary cursor-pointer transition-colors touch-target min-h-[32px] px-2 py-1"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`gap-1 sm:gap-2 touch-target min-h-[44px] px-2 sm:px-3 ${
              liked 
                ? "text-destructive hover:text-destructive" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${liked ? "fill-current" : ""}`} />
            <span className="text-sm sm:text-base">{likeCount}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1 sm:gap-2 text-muted-foreground hover:text-foreground touch-target min-h-[44px] px-2 sm:px-3"
          >
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">{comments}</span>
          </Button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleShare} 
            className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground hover:text-foreground touch-target"
          >
            <Share className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className={`h-8 w-8 sm:h-10 sm:w-10 touch-target ${
              saved 
                ? "text-primary hover:text-primary" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bookmark className={`h-4 w-4 sm:h-5 sm:w-5 ${saved ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
    </motion.article>
  );
};