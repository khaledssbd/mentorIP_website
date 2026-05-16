
import {
   MapPin,
   Phone,
   Mail,
   Linkedin,
   ExternalLink,
   Globe2,
   Zap,
   Sparkles,
   MessageCircle,
   LucideIcon,
   Facebook,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getOfficeCards, getHotlineAndSocials } from "@/services/contact";
import { ContactForm } from "@/components/contact/contact-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | MentorIP - Global IP Law Firm",
  description: "Get in touch with MentorIP for expert guidance on trademarks, patents, and all your IP needs. Our global liaison offices are ready to assist you.",
  keywords: ["Contact MentorIP", "IP Law Firm Contact", "Trademark Attorney Bangladesh", "Patent Lawyer"],
};


// TypeScript interfaces
interface OfficeCard {
   badge: string;
   icon: string;
   officeName: string;
   keyPerson: string;
   address: string;
   phone: string;
   email: string;
}

interface Hotline {
   label: string;
   value: string;
}

interface SocialLink {
   label: string;
   icon: string;
   url: string;
}

// Icon mapping for office cards
const iconMap: Record<string, LucideIcon> = {
   MapPin,
   Globe2,
   Zap,
   Phone,
   Mail,
};

// Social icon mapping
const socialIconMap: Record<string, LucideIcon> = {
   facebook: Facebook,
   linkedin: Linkedin,
   mail: Mail,
};

const colorMap = ["primary", "primary", "primary", "primary"];

export default async function ContactPage() {
   // Fetch dynamic data
   const officeCardsResponse = await getOfficeCards();
   const contactResponse = await getHotlineAndSocials();

   const officeCardsData = officeCardsResponse?.data || null;
   const contactData = contactResponse?.data || null;

   // Build offices array from API
   const offices = officeCardsData?.cards ? officeCardsData.cards.map((card: OfficeCard, index: number) => ({
      country: card.badge,
      name: card.officeName,
      person: card.keyPerson.replace("Key Person: ", ""),
      address: card.address,
      phone: card.phone,
      email: card.email,
      icon: iconMap[card.icon] || MapPin,
      color: colorMap[index % colorMap.length],
   })) : [
      {
         country: "Bangladesh Office",
         name: "MentorIP Law Firm",
         person: "J.A. Chaudhury Reagan",
         address: "Jiban Bima Bhaban (1st Floor), 121 Motijheel Commercial Area, Dhaka-1000, Bangladesh",
         phone: "+8801613336333",
         email: "info@mentorip.com",
         icon: MapPin,
         color: "primary"
      },
   ];

   // Build hotlines and social links from API
   const hotlines = contactData?.hotlines || [
      { label: "WhatsApp", value: "+880 1613 336 333" }
   ];

   const socialLinks = contactData?.socialLinks || [
      { label: "LinkedIn", icon: "linkedin", url: "#" }
   ];
   return (
      <div className="pb-8 space-y-12">
         {/* Hero Section */}
         <section className="relative md:h-[500px] py-8 md:py-0 rounded-4xl md:rounded-[3rem] overflow-hidden border border-border group/hero shadow-2xl">
            <div className="absolute inset-0 bg-muted">
               <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent dark:from-primary/20 dark:via-background dark:to-background" />
               <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                  style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
               <div className="absolute inset-0 opacity-0 group-hover/hero:opacity-20 transition-opacity duration-1000"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 50% 120%, rgba(var(--color-primary-rgb) / 0.5), transparent 50%)",
                  }}
               />
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto space-y-8">
               <Badge className="bg-primary/10 dark:bg-primary/20 text-primary border-primary/20 backdrop-blur-md px-5 py-2 uppercase font-black text-xs rounded-full">
                  Get In Touch <Sparkles className="w-3 h-3 ml-2" />
               </Badge>
               <h1 className="text-xl md:text-6xl font-black text-foreground group-hover/hero:scale-[1.01] transition-transform duration-700">
                  WE&apos;RE HERE TO <span className="text-primary">HELP</span>.<br />
                  ANYTIME, <span className="text-primary">ANYWHERE</span>.
               </h1>
               <p className="text-lg text-muted-foreground font-medium max-w-2xl">
                  &quot;Reach out to MentorIP for expert guidance on trademarks, patents, and all your IP needs globally.&quot;
               </p>
            </div>
         </section>

         {/* Main Contact Grid */}
         <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Contact Info */} 
            <div className="lg:col-span-2 space-y-8">
               <div className="space-y-4">
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-primary">OUR LOCATIONS</h2>
                  <h3 className="text-3xl md:text-4xl font-black text-foreground">Global Liaison Offices</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {offices.map((office: { country: string; name: string; person: string; address: string; phone: string; email: string; icon: LucideIcon; color: string }, i: number) => (
                     <Card key={i} className="group border-border bg-card rounded-[2.5rem] p-8 space-y-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-${office.color}/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700`} />

                        <div className="space-y-4 relative z-10">
                           <div className="flex items-center justify-between">
                              <Badge variant="outline" className="border-primary/20 text-primary font-black text-[10px] uppercase px-3">{office.country}</Badge>
                              <office.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-lg font-black text-foreground">{office.name}</h4>
                              <p className="text-xs font-bold text-muted-foreground">Key Person: {office.person}</p>
                           </div>
                           <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                              {office.address}
                           </p>
                           <div className="space-y-2 pt-2">
                              <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                 <Phone className="w-4 h-4" />
                                 {office.phone}
                              </div>
                              <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                 <Mail className="w-4 h-4" />
                                 {office.email}
                              </div>
                           </div>
                        </div>
                     </Card>
                  ))}
               </div>

               {/* Quick Connect & Socials */}
               <div className="grid grid-cols-1 gap-8">
                  <Card className="rounded-[2.5rem] p-8 border-border bg-muted text-foreground relative overflow-hidden group shadow-sm dark:shadow-2xl">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                     <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                              <MessageCircle className="w-6 h-6 text-primary animate-pulse" />
                           </div>
                           <div>
                              <p className="text-lg font-black">Hotline & Socials</p>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Stay Connected 24/7</p>
                           </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {hotlines.map((hotline: Hotline, i: number) => (
                              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border hover:bg-muted/50 transition-colors group/item cursor-pointer">
                                 <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{hotline.label}</span>
                                 </div>
                                 <p className="text-sm font-black text-primary">{hotline.value}</p>
                              </div>
                           ))}
                           {socialLinks.map((social: SocialLink, i: number) => {
                              const SocialIcon = socialIconMap[social.icon.toLowerCase()] || ExternalLink;
                              return (
                                 <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border hover:bg-muted/50 transition-colors group/item cursor-pointer">
                                    <div className="flex items-center gap-3">
                                       <SocialIcon className="w-4 h-4 text-primary" />
                                       <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{social.label}</span>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                                 </a>
                              );
                           })}
                        </div>
                     </div>
                  </Card>
               </div>
            </div>

            {/* Right: Contact Form */}
            <div className="space-y-6">
               <ContactForm />
            </div>
         </section>

         {/* Trusted Banner */}
         <section className="bg-muted rounded-[3rem] p-12 text-center relative overflow-hidden shadow-sm dark:shadow-2xl border border-border group">
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-0.05 pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="relative z-10 space-y-6">
               <Badge variant="outline" className="border text-muted-foreground font-black uppercase tracking-widest text-xs px-4">Confidentiality Assured</Badge>
               <h3 className="text-3xl font-black text-foreground">Committed to Protecting Your Corporate Secrets</h3>
               <p className="text-muted-foreground max-w-xl mx-auto font-medium">All communications are end-to-end encrypted and handled with boutique-level legal precision.</p>
            </div>
         </section>
      </div>
   );
}
