"use client";

import { useCallback, useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const updateThemeState = () => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    // 检查浏览器是否支持 View Transitions API
    if (!document.startViewTransition) {
      updateThemeState();
      return;
    }

    await document.startViewTransition(() => {
      flushSync(updateThemeState);
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }, [resolvedTheme, setTheme, duration]);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "hover:opacity-80 transition-opacity cursor-pointer",
        className
      )}
      {...props}
    >
      {isDark ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
