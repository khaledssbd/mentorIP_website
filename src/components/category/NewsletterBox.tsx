/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { subscribeNewsletter } from "@/services/subscription";
import { toast } from "sonner";

export function NewsletterBox() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await subscribeNewsletter(email);
      if (response?.success) {
        toast.success("Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(response?.message || "Subscription failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border bg-card/60 backdrop-blur p-5 shadow-sm">
      <h3 className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-muted-foreground">
        Subscribe to Newsletter
      </h3>
      <p className="mt-2 text-[12px] text-muted-foreground">
        Get the latest IP insights in your inbox.
      </p>
      <form onSubmit={handleSubscribe} className="mt-4 flex items-center gap-2">
        <Input
          type="email"
          placeholder="Type your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-10"
        />
        <Button 
          type="submit" 
          disabled={loading}
          className="h-10 px-4 font-bold bg-pink-500 hover:bg-pink-600 text-primary-foreground"
        >
          <Send className={loading ? "animate-pulse" : ""} />
        </Button>
      </form>
    </div>
  );
}
