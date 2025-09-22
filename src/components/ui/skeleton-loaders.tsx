import { Skeleton } from "@/components/ui/skeleton";

export const PostCardSkeleton = () => (
  <div className="bg-card border border-border rounded-[var(--radius)] p-4 space-y-3 animate-pulse">
    {/* Header */}
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-8 w-8" />
    </div>

    {/* Content */}
    <div className="space-y-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </div>

    {/* Tags */}
    <div className="flex gap-2">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-6 w-14 rounded-full" />
    </div>

    {/* Actions */}
    <div className="flex items-center justify-between pt-2">
      <div className="flex gap-4">
        <Skeleton className="h-8 w-12" />
        <Skeleton className="h-8 w-12" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  </div>
);

export const MoodTrackerSkeleton = () => (
  <div className="bg-card border border-border rounded-[var(--radius)] p-4 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <Skeleton className="h-6 w-6" />
      <Skeleton className="h-6 w-32" />
    </div>
    <div className="flex justify-center gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-12 rounded-full" />
      ))}
    </div>
  </div>
);

export const SidebarCardSkeleton = () => (
  <div className="card-soft space-y-4 animate-pulse">
    <div className="card-header-spacing">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
    <div className="space-y-3 px-4 pb-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-6 w-12" />
        </div>
      ))}
    </div>
  </div>
);

export const ProfileHeaderSkeleton = () => (
  <div className="bg-card border border-border rounded-[var(--radius)] p-6 animate-pulse">
    <div className="flex items-start gap-4">
      <Skeleton className="h-20 w-20 rounded-full" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  </div>
);

export const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-muted border-t-primary`}></div>
    </div>
  );
};

export const LoadingOverlay = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
    {children}
  </div>
);