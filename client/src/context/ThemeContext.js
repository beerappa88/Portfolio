import { useState, createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

const STORAGE_KEY = "portfolio-theme";

/**
 * Respect a previous choice first, then the OS preference, then fall back to
 * light. localStorage access is guarded because it throws in some privacy
 * modes, and an unhandled throw here would blank the whole page.
 */
const getInitialTheme = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage unavailable — fall through to the OS preference */
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  // Themed on <html> rather than a wrapper div, so the background covers the
  // full viewport and CSS custom properties cascade to every component.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* not persisting is acceptable; the current session still works */
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
