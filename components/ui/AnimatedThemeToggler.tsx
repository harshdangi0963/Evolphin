
import React, { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

export const AnimatedThemeToggler: React.FC<AnimatedThemeTogglerProps> = ({
  className = "",
  duration = 500,
  ...props
}) => {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateThemeState = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateThemeState();

    const observer = new MutationObserver(updateThemeState);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    // Fallback for browsers not supporting View Transition API
    if (!(document as any).startViewTransition) {
      const newTheme = !isDark;
      setIsDark(newTheme);
      document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return;
    }

    const transition = (document as any).startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", newTheme ? "dark" : "light");
      });
    });

    await transition.ready;

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
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
  }, [isDark, duration]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={`size-10 rounded-xl bg-slate-50/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-white/10 shadow-sm flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-all duration-300 group ${className}`}
      {...props}
    >
      <span className="material-symbols-outlined text-[20px] transition-transform duration-500 group-hover:rotate-12 group-active:scale-90">
        {isDark ? "light_mode" : "dark_mode"}
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
