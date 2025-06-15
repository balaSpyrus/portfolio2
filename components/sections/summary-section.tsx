"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

interface SummarySectionProps {
  summary: string
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

export function SummarySection({ summary }: SummarySectionProps) {
  return (
    <motion.div variants={itemVariants} id="summary">
      <motion.div variants={cardVariants} whileHover="hover">
        <Card className="linkedin-card bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <div className="mr-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <User className="h-5 w-5 linkedin-blue" />
              </div>
              Professional Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 leading-relaxed text-base"
            >
              {summary}
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
