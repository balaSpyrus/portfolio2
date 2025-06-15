"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy } from "lucide-react"

interface Accomplishment {
  title: string
  description: string
}

interface AccomplishmentsSectionProps {
  accomplishments: Accomplishment[]
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

export function AccomplishmentsSection({ accomplishments }: AccomplishmentsSectionProps) {
  return (
    <motion.div variants={itemVariants} id="accomplishments">
      <motion.div variants={cardVariants} whileHover="hover">
        <Card className="linkedin-card bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <div className="mr-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <Trophy className="h-5 w-5 linkedin-blue" />
              </div>
              Key Accomplishments
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accomplishments.map((accomplishment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <h3 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">{accomplishment.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{accomplishment.description}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
