"use client";

import { useState } from "react";
import { Send, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendContactEmail } from "@/services/contact";
import { ErrorToast, SuccessToast } from "@/lib/utils";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        SuccessToast("Message Sent! We'll get back to you soon.");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        ErrorToast(result.message || "Failed to send message. Please try again.");
      }
    } catch {
      ErrorToast("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="lg:sticky lg:top-24 border border-border bg-card rounded-[3rem] p-6 shadow-2xl relative overflow-hidden group/form">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-blue-600 opacity-50 transition-opacity group-hover/form:opacity-100" />
      
      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div className="space-y-1">
          <h4 className="text-xl font-black text-foreground italic underline decoration-primary/20 underline-offset-4">Quick Inquiry</h4>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Typical response: Under 2 hours</p>
        </div>
        
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Full Name *</label>
            <Input 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name" 
              className="rounded-2xl h-10 bg-muted border-border focus-visible:ring-primary text-sm" 
              required
            />
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Email Address *</label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@company.com" 
              className="rounded-2xl h-10 bg-muted border-border focus-visible:ring-primary text-sm" 
              required
            />
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Phone Number</label>
            <Input 
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+880 1234 567 890" 
              className="rounded-2xl h-10 bg-muted border-border focus-visible:ring-primary text-sm" 
            />
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="subject" className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Subject *</label>
            <Input 
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="IP Consultation Request" 
              className="rounded-2xl h-10 bg-muted border-border focus-visible:ring-primary text-sm" 
              required
            />
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="message" className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground pl-1">Message *</label>
            <Textarea 
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we assist you with your IP matters?" 
              className="rounded-2xl bg-muted border-border min-h-[120px] focus-visible:ring-primary p-3 text-sm" 
              required
            />
          </div>
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl h-11 bg-primary font-black text-[10px] uppercase tracking-[0.3em] shadow-xl group/btn-send relative overflow-hidden disabled:opacity-50"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isSubmitting ? "Sending..." : "Send Message"} 
              <Send className="w-3.5 h-3.5 group-hover/btn-send:translate-x-1 group-hover/btn-send:-translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-primary via-blue-600 to-primary bg-size-[200%_100%] animate-linear-x opacity-0 group-hover/btn-send:opacity-100 transition-opacity" />
          </Button>
        </div>

        <div className="flex items-center gap-3 pt-2 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Support: 24/7 Available</span>
          </div>
        </div>
      </form>
    </Card>
  );
}
