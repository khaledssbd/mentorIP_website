'use client';

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import { TocItem } from "../tools/toc-utils";

interface TableOfContentsProps {
  toc: TocItem[];
}

const TableOfContents = ({ toc }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  if (toc.length === 0) return null;

  return (
    <nav className="rounded-2xl border bg-card/70 backdrop-blur-xl p-5 shadow-sm shadow-black/5">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/60">
        <div className="flex items-center justify-center size-7 rounded-lg bg-primary/10 text-primary">
          <List className="w-3.5 h-3.5" />
        </div>
        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground">
          Post Outline
        </h3>
      </div>
      {/* <ScrollArea className=""> */}
      <ul className="divide-y divide-border/40 max-h-[43vh] overflow-y-auto">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`group relative flex items-start gap-2 py-2 text-xs leading-snug transition-all ${
                item.level === "h3" ? "pl-6" : "pl-3"
              } ${
                activeId === item.id
                  ? "text-primary font-semibold border-l-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground border-l-2 border-transparent hover:bg-muted/40"
              }`}
            >
              <span
                className={`mt-1 inline-block size-1.5 rounded-full transition-colors ${
                  activeId === item.id ? "bg-primary" : "bg-muted-foreground/40 group-hover:bg-muted-foreground/70"
                }`}
              />
              <span className="flex-1">{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
      {/* </ScrollArea> */}
    </nav>
  );
};

export default TableOfContents;