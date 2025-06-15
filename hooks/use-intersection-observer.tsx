"use client"

import { useEffect, useState, useRef } from "react"

export function useIntersectionObserver(elementIds: string[], options: IntersectionObserverInit = {}) {
  const [activeId, setActiveId] = useState<string>("")
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const elements = elementIds.map((id) => document.getElementById(id)).filter(Boolean)

    if (elements.length === 0) return

    observer.current = new IntersectionObserver(
      (entries) => {
        // Find all visible entries
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (visibleEntries.length > 0) {
          // Sort by how much of the element is visible and position
          const sortedEntries = visibleEntries.sort((a, b) => {
            // Prioritize elements that are more visible
            const visibilityDiff = b.intersectionRatio - a.intersectionRatio

            // If visibility is similar, prioritize the one closer to the top
            if (Math.abs(visibilityDiff) < 0.1) {
              return a.boundingClientRect.top - b.boundingClientRect.top
            }

            return visibilityDiff
          })

          const mostVisible = sortedEntries[0]
          if (mostVisible.target.id !== activeId) {
            setActiveId(mostVisible.target.id)
          }
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px", // More precise margins
        threshold: [0, 0.25, 0.5, 0.75, 1],
        ...options,
      },
    )

    elements.forEach((element) => {
      if (element) observer.current?.observe(element)
    })

    // Set initial active section
    if (elements.length > 0 && !activeId) {
      setActiveId(elements[0].id)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [elementIds, activeId])

  return activeId
}
