"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { GraduationCap, Building2, Calendar, MapPin } from "lucide-react"

interface Education {
  id: string
  degree: string
  field: string
  institution: string
  location: string
  startDate: string
  endDate: string
  gpa: string
  achievements: string[]
}

interface EducationSectionProps {
  education: Education[]
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

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <motion.div variants={itemVariants} id="education">
      <motion.div variants={cardVariants} whileHover="hover">
        <Card className="linkedin-card bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <div className="mr-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <GraduationCap className="h-5 w-5 linkedin-blue" />
              </div>
              Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 space-y-2 md:space-y-0">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{edu.field}</p>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Building2 className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{edu.institution}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center mb-3 space-y-1 sm:space-y-0">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{edu.location}</span>
                  </div>
                  {edu.gpa && (
                    <>
                      <Separator
                        orientation="vertical"
                        className="mx-2 h-4 hidden sm:block bg-gray-300 dark:bg-gray-600"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">GPA: {edu.gpa}</span>
                    </>
                  )}
                </div>
                {edu.achievements.length > 0 && (
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, achievementIndex) => (
                      <motion.li
                        key={achievementIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: achievementIndex * 0.05 }}
                        className="text-sm text-gray-600 dark:text-gray-300 flex"
                      >
                        <span className="mr-2 flex-shrink-0 linkedin-blue font-bold">•</span>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
