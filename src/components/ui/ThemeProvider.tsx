"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Script to inject in head for instant theme application (prevents FOUC)
export const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('sindhu-theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // Initialize with a function to read from DOM if available
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.classList.contains("dark") ? "dark" : "light";
        }
        return "dark";
    });

    // After hydration, re-apply the stored/system theme: React owns <html className>,
    // so the class set by the pre-hydration script must be restored here.
    useEffect(() => {
        let stored: string | null = null;
        try {
            stored = localStorage.getItem("sindhu-theme");
        } catch {
            // storage blocked
        }
        const resolved: Theme = stored === "light" || stored === "dark" ? stored : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        document.documentElement.classList.toggle("dark", resolved === "dark");
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync with the stored theme after hydration
        setThemeState(resolved);
    }, []);

    // Update document class and localStorage when theme changes via user action
    const updateTheme = (newTheme: Theme) => {
        const root = document.documentElement;
        if (newTheme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        try {
            localStorage.setItem("sindhu-theme", newTheme);
        } catch {
            // storage blocked: theme still applies for this visit
        }
        setThemeState(newTheme);
    };

    const toggleTheme = () => {
        updateTheme(theme === "dark" ? "light" : "dark");
    };

    const setTheme = (newTheme: Theme) => {
        updateTheme(newTheme);
    };

    // No more visibility:hidden - the theme script handles FOUC prevention
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    // Return default values if used outside provider (e.g., during static generation)
    if (context === undefined) {
        return {
            theme: "dark" as Theme,
            toggleTheme: () => { },
            setTheme: () => { },
        };
    }

    return context;
}
