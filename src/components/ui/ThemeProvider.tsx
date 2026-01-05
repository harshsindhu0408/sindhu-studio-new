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

    // Sync state with actual DOM on mount (for SSR hydration)
    useEffect(() => {
        const isDark = document.documentElement.classList.contains("dark");
        setThemeState(isDark ? "dark" : "light");
    }, []);

    // Update document class and localStorage when theme changes via user action
    const updateTheme = (newTheme: Theme) => {
        const root = document.documentElement;
        if (newTheme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("sindhu-theme", newTheme);
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
