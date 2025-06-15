"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Languages } from "lucide-react"

interface Language {
  name: string
  proficiency: string
}

interface LanguagesSectionProps {
  languages: Language[]
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

export function LanguagesSection({ languages }: LanguagesSectionProps) {
  return (
    <motion.div variants={itemVariants} id="languages">
      <motion.div variants={cardVariants} whileHover="hover">
        <Card className="linkedin-card bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <div className="mr-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <Languages className="h-5 w-5 linkedin-blue" />
              </div>
              Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {languages.map((language, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800"
                >
                  <span className="font-medium text-gray-900 dark:text-white">{language.name}</span>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
                  >
                    {language.proficiency}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
