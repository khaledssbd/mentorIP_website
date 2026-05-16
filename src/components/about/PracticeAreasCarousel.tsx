"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ShieldCheck, Zap, FileBadge, BookOpen, Gavel, Building2, Globe2 } from "lucide-react";

const practices = [
  { name: "TRADEMARKS", icon: ShieldCheck },
  { name: "PATENTS", icon: Zap },
  { name: "INDUSTRIAL DESIGNS", icon: FileBadge },
  { name: "COPYRIGHTS", icon: BookOpen },
  { name: "IP LITIGATION", icon: Gavel },
  { name: "BRAND PROTECTION", icon: ShieldCheck },
  { name: "LICENSING", icon: FileBadge },
  { name: "CORPORATE DOCUMENTATION", icon: Building2 },
  { name: "IP WATCH", icon: Globe2 },
];

export function PracticeAreasCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {practices.map((practice, i) => (
            <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div
                className="group/card relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 text-center flex flex-col items-center justify-center gap-6 min-h-[180px] shadow-sm hover:shadow-xl h-full"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/card:opacity-100 transition-opacity">
                  <span className="text-3xl font-black text-foreground">
                    {i + 1}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                  <practice.icon className="w-6 h-6" />
                </div>

                <p className="text-sm md:text-xl font-black text-foreground uppercase leading-tight max-w-[200px]">
                  {practice.name}
                </p>

                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity rounded-2xl" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              current === i ? "bg-primary w-6" : "bg-muted-foreground/30"
            }`}
            onClick={() => api?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
