"use client"

import { motion, AnimatePresence } from "framer-motion"
import { WifiOff, Wifi } from "lucide-react"
import { useOffline } from "@/hooks/use-offline"

export function OfflineBanner() {
  const { isOffline, wasOffline } = useOffline()

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground px-4 py-2"
        >
          <div className="container mx-auto flex items-center justify-center space-x-2">
            <WifiOff className="h-4 w-4" />
            <span className="text-sm font-medium">You're offline. Showing cached content.</span>
          </div>
        </motion.div>
      )}
      {!isOffline && wasOffline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-green-600 text-white px-4 py-2"
        >
          <div className="container mx-auto flex items-center justify-center space-x-2">
            <Wifi className="h-4 w-4" />
            <span className="text-sm font-medium">Back online!</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
