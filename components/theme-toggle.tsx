"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { IconButton } from "@mui/material"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <IconButton disabled sx={{ border: 1, borderColor: "divider" }}>
        <Sun size={20} />
      </IconButton>
    )
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light")
  }

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        border: 1,
        borderColor: "divider",
        color: "text.secondary",
        "&:hover": {
          bgcolor: "action.hover",
          borderColor: "text.secondary",
        },
        transition: "all 0.2s ease",
      }}
    >
      {resolvedTheme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </IconButton>
  )
}
