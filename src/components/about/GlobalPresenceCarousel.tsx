"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { MapPin, Globe2, Zap, Users } from "lucide-react";

const offices = [
  { country: "Bangladesh", city: "Dhaka", type: "Headquarters", icon: MapPin },
  {
    country: "United Kingdom",
    city: "London",
    type: "Liaison Office",
    icon: Globe2,
  },
  { country: "UAE", city: "Dubai", type: "Liaison Office", icon: Zap },
  { country: "India", city: "Delhi", type: "Liaison Office", icon: Users },
  {
    country: "Pakistan",
    city: "Islamabad",
    type: "Liaison Office",
    icon: Globe2,
  },
  {
    country: "Afghanistan",
    city: "Kabul",
    type: "Liaison Office",
    icon: Globe2,
  },
  { country: "Nepal", city: "Kathmandu", type: "Liaison Office", icon: Globe2 },
  { country: "China", city: "Beijing", type: "Liaison Office", icon: Globe2 },
  {
    country: "Thailand",
    city: "Bangkok",
    type: "Liaison Office",
    icon: Globe2,
  },
  {
    country: "Malaysia",
    city: "Kuala Lumpur",
    type: "Liaison Office",
    icon: Globe2,
  },
  {
    country: "Singapore",
    city: "Singapore",
    type: "Liaison Office",
    icon: Globe2,
  },
  { country: "UK", city: "London", type: "Liaison Office", icon: Globe2 },
  { country: "EU", city: "Brussels", type: "Liaison Office", icon: Globe2 },
];

export function GlobalPresenceCarousel() {
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
    }, 3000);

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
          {offices.map((office, i) => (
            <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <Card
                className="group border bg-card rounded-[2.5rem] p-6 space-y-4 overflow-hidden transition-all duration-500 h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                  <office.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary-foreground" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-foreground uppercase">
                    {office.country}
                  </h4>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    {office.city}
                  </p>
                  <p className="text-[10px] text-primary font-black uppercase tracking-[0.2em] pt-2">
                    {office.type}
                  </p>
                </div>
              </Card>
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
