"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { TerminalThemeProvider as CustomTerminalThemeProvider } from "@/context/TerminalThemeContext";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <CustomTerminalThemeProvider>
        {children}
      </CustomTerminalThemeProvider>
    </NextThemesProvider>
  );
}
