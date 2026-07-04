"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  title: string;
  url?: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this post: ${title}`,
          url: shareUrl,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          toast.error("Could not share. Try copying the link.");
        }
      }
    } else {
      // Fallback: Copy link
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Native share not supported. Link copied to clipboard!");
      } catch {
        toast.error("Failed to copy link.");
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="px-3 text-[11px] font-bold gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-full"
    >
      <Share2 className="w-3.5 h-3.5" /> Share
    </Button>
  );
}
