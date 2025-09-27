import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  colorTheme: "teal" | "blue" | "purple" | "neutral" | "lavender" | "mint" | "peach" | "sky" | "pink";
  setTheme: (theme: "light" | "dark") => void;
  setColorTheme: (theme: "teal" | "blue" | "purple" | "neutral" | "lavender" | "mint" | "peach" | "sky" | "pink") => void;
  fontSize: "small" | "medium" | "large";
  setFontSize: (size: "small" | "medium" | "large") => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Load theme preferences from localStorage or use defaults
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vibenest-theme");
      return (saved as "light" | "dark") || "dark";
    }
    return "dark";
  });
  
  const [colorTheme, setColorTheme] = useState<"teal" | "blue" | "purple" | "neutral" | "lavender" | "mint" | "peach" | "sky" | "pink">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vibenest-color-theme");
      return (saved as any) || "mint";
    }
    return "mint";
  });
  
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vibenest-font-size");
      return (saved as "small" | "medium" | "large") || "medium";
    }
    return "medium";
  });
  
  const [highContrast, setHighContrast] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vibenest-high-contrast");
      return saved === "true" || false;
    }
    return false;
  });
  
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("vibenest-reduced-motion");
      return saved === "true" || false;
    }
    return false;
  });

  // Save preferences to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vibenest-theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vibenest-color-theme", colorTheme);
    }
  }, [colorTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vibenest-font-size", fontSize);
    }
  }, [fontSize]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vibenest-high-contrast", highContrast.toString());
    }
  }, [highContrast]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vibenest-reduced-motion", reducedMotion.toString());
    }
  }, [reducedMotion]);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove("dark", "theme-blue", "theme-purple", "theme-neutral", "theme-lavender", "theme-mint", "theme-peach", "theme-sky", "theme-pink");
    
    // Apply current theme
    if (theme === "dark") {
      root.classList.add("dark");
    }
    
    // Apply color theme (mint is default, so always apply it)
    root.classList.add(`theme-${colorTheme}`);

    // Apply font size
    root.style.fontSize = fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px";
    
    // Apply high contrast
    if (highContrast) {
      root.style.setProperty("--foreground", theme === "dark" ? "0 0% 100%" : "0 0% 0%");
      root.style.setProperty("--background", theme === "dark" ? "0 0% 0%" : "0 0% 100%");
    }

    // Apply reduced motion class
    root.classList.toggle("reduce-motion", reducedMotion);
  }, [theme, colorTheme, fontSize, highContrast, reducedMotion]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorTheme,
        setTheme,
        setColorTheme,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        reducedMotion,
        setReducedMotion,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};