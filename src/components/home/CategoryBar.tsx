import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
  { name: "All Posts", href: "#" },
  { name: "Assignment", href: "#" },
  { name: "Bangladesh", href: "#" },
  { name: "Case Study", href: "#" },
  { name: "Design", href: "#" },
  { name: "DPDT (IP Office)", href: "#" },
  { name: "FAQ", href: "#" },
  { name: "Gallery", href: "#" },
];

export function CategoryBar() {
  return (
    <div className="w-full border-b bg-background/50 backdrop-blur-sm sticky top-16 z-40">
      <div className="container mx-auto px-4 py-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-center space-x-2 min-w-max">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={cat.href}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
                index === 0
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
