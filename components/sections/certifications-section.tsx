"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeIcon as Certificate } from "lucide-react"

interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  description: string
}

interface CertificationsSectionProps {
  certifications: Certification[]
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

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <motion.div variants={itemVariants} id="certifications">
      <motion.div variants={cardVariants} whileHover="hover">
        <Card className="linkedin-card bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <div className="mr-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <Certificate className="h-5 w-5 linkedin-blue" />
              </div>
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 space-y-1 md:space-y-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{cert.name}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{cert.date}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{cert.issuer}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{cert.description}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
