"use client";

import { ReactNode, createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export default function ThemeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;
  const savedTheme = isLocalStorageAvailable
    ? localStorage.getItem("theme")
    : null;
  const [theme, setTheme] = useState(savedTheme || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);
  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}
