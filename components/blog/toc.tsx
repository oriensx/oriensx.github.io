"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const updateHeadings = () => {
      const elements = Array.from(document.querySelectorAll("h2, h3"))
        .map((elem) => ({
          id: elem.id,
          text: elem.textContent || "",
          level: Number(elem.tagName.substring(1)),
        }))
        .filter((item) => item.id);
      setHeadings(elements);
    };

    updateHeadings();

    // Re-scan if content changes (useful for dynamic content or late-loading MDX)
    const observer = new MutationObserver(updateHeadings);
    const mainElement = document.querySelector("main");
    if (mainElement) {
      observer.observe(mainElement, { childList: true, subtree: true });
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    const headingElements = document.querySelectorAll("h2, h3");
    headingElements.forEach((element) => {
      if (element.id) intersectionObserver.observe(element);
    });

    return () => {
      observer.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="flex flex-col gap-2.5 py-4 border-l border-neutral-200 dark:border-neutral-800 ml-0.5">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={cn(
            "text-[11px] transition-all hover:text-foreground line-clamp-2 pl-4 relative -ml-px border-l border-transparent",
            heading.level === 3 ? "ml-3 text-neutral-400" : "font-medium",
            activeId === heading.id
              ? "text-foreground border-neutral-400 dark:border-neutral-500"
              : "text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700"
          )}
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById(heading.id);
            if (element) {
              const yOffset = -100; // Adjust for sticky header if any
              const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
              // Update URL hash without jumping
              window.history.pushState(null, "", `#${heading.id}`);
            }
          }}
        >
          {heading.text}
        </a>
      ))}
    </div>
  );
}
