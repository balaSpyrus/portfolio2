"use client"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useTheme } from "next-themes"
import { type ReactNode, useMemo } from "react"
import CssBaseline from "@mui/material/CssBaseline"

interface MaterialUIProviderProps {
  children: ReactNode
}

export function MaterialUIProvider({ children }: MaterialUIProviderProps) {
  const { resolvedTheme } = useTheme()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme === "dark" ? "dark" : "light",
          primary: {
            main: resolvedTheme === "dark" ? "#70B5F9" : "#0A66C2",
            dark: resolvedTheme === "dark" ? "#60A5E8" : "#004D9A",
            light: resolvedTheme === "dark" ? "#80C5FF" : "#F0F8FF",
          },
          background: {
            default: resolvedTheme === "dark" ? "#0F0F0F" : "#FFFFFF",
            paper: resolvedTheme === "dark" ? "#191919" : "#FFFFFF",
          },
          text: {
            primary: resolvedTheme === "dark" ? "#FFFFFF" : "#212121",
            secondary: resolvedTheme === "dark" ? "#B3B3B3" : "#666666",
          },
          grey: {
            50: resolvedTheme === "dark" ? "#0F0F0F" : "#FCFCFC",
            100: resolvedTheme === "dark" ? "#191919" : "#F8F8F8",
            200: resolvedTheme === "dark" ? "#262626" : "#E5E7EB",
            300: resolvedTheme === "dark" ? "#404040" : "#D1D5DB",
            400: resolvedTheme === "dark" ? "#666666" : "#9CA3AF",
            500: resolvedTheme === "dark" ? "#999999" : "#6B7280",
            600: resolvedTheme === "dark" ? "#B5B5B5" : "#4B5563",
            700: resolvedTheme === "dark" ? "#CCCCCC" : "#374151",
            800: resolvedTheme === "dark" ? "#E5E5E5" : "#1F2937",
            900: resolvedTheme === "dark" ? "#FFFFFF" : "#111827",
          },
        },
        typography: {
          fontFamily: "Inter, system-ui, sans-serif",
          h1: {
            fontWeight: 700,
            fontSize: "2.5rem",
          },
          h2: {
            fontWeight: 600,
            fontSize: "2rem",
          },
          h3: {
            fontWeight: 600,
            fontSize: "1.5rem",
          },
          body1: {
            fontSize: "1rem",
            lineHeight: 1.6,
          },
          body2: {
            fontSize: "0.875rem",
            lineHeight: 1.5,
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: "24px",
                fontWeight: 600,
                transition: "all 0.2s ease",
              },
              contained: {
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: "8px",
                boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.12)",
                "&:hover": {
                  boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.16)",
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
        },
      }),
    [resolvedTheme],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
