"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-border py-8">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Side: Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="MENTOR IP"
              width={160}
              height={40}
              className="h-8 w-auto dark:invert opacity-80 hover:opacity-100 transition-opacity"
            />
          </Link>
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
            &copy; {currentYear} MENTOR IP LAW FIRM.
          </p>
        </div>

        {/* Middle Side: Important Links (Premium UX) */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 px-4 border-x border-border flex-1">
           {[
             { name: "DPDT", url: "https://dpdt.gov.bd/" },
             { name: "WIPO", url: "https://www.wipo.int/" },
             { name: "USPTO", url: "https://www.uspto.gov/" },
             { name: "IP India", url: "https://ipindia.gov.bd/" }
           ].map((link) => (
             <Link key={link.name} href={link.url} target="_blank" className="text-[10px] font-black text-muted-foreground hover:text-primary uppercase tracking-[0.2em] transition-colors">
               {link.name}
             </Link>
           ))}
           <Link href="/about#resources" className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1.5 rounded-full uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all">
             View All Resources
           </Link>
        </div>

        {/* Right Side: Credit */}
        <div className="flex flex-col items-center md:items-end gap-2">
           <div className="flex items-center gap-2 group/credit cursor-pointer">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em]">Created by</p>
              <span className="text-[10px] font-black text-foreground uppercase tracking-[0.2em] group-hover:text-primary transition-colors relative">
                SmartEdge Technologies
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </span>
            </div>
        </div>
      </div>
    </footer>
  );
}
