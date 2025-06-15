"use client"

import { useEffect, useCallback } from "react"

interface UseKeyboardNavigationProps {
  navigationItems: Array<{ id: string; label: string }>
  activeSection: string
  scrollToSection: (sectionId: string) => void
}

export function useKeyboardNavigation({ navigationItems, activeSection, scrollToSection }: UseKeyboardNavigationProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Only handle navigation when not in input fields
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return
      }

      const currentIndex = navigationItems.findIndex((item) => item.id === activeSection)

      switch (event.key) {
        case "ArrowDown":
        case "j": // Vim-style navigation
          event.preventDefault()
          if (currentIndex < navigationItems.length - 1) {
            scrollToSection(navigationItems[currentIndex + 1].id)
          }
          break

        case "ArrowUp":
        case "k": // Vim-style navigation
          event.preventDefault()
          if (currentIndex > 0) {
            scrollToSection(navigationItems[currentIndex - 1].id)
          }
          break

        case "Home":
          event.preventDefault()
          scrollToSection(navigationItems[0].id)
          break

        case "End":
          event.preventDefault()
          scrollToSection(navigationItems[navigationItems.length - 1].id)
          break

        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          event.preventDefault()
          const index = Number.parseInt(event.key) - 1
          if (index < navigationItems.length) {
            scrollToSection(navigationItems[index].id)
          }
          break

        case "?":
          event.preventDefault()
          // Show keyboard shortcuts help
          alert(`Keyboard Shortcuts:
↑/k: Previous section
↓/j: Next section
1-9: Jump to section
Home: First section
End: Last section
?: Show this help`)
          break
      }
    },
    [navigationItems, activeSection, scrollToSection],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])
}
