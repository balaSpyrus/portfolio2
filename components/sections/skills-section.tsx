"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2 } from "lucide-react"

interface Skill {
  name: string
  proficiency: string
  rating: number
  years: number
}

interface SkillCategory {
  name: string
  skills: Skill[]
}

interface SkillsSectionProps {
  technicalSkills: {
    categories: SkillCategory[]
  }
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

export function SkillsSection({ technicalSkills }: SkillsSectionProps) {
  const renderSkillRating = (rating: number, index: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((dot) => (
          <motion.div
            key={dot}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1 + dot * 0.05,
              ease: "easeOut",
            }}
            className={`w-2 h-2 rounded-full ${dot <= rating ? "linkedin-blue-bg" : "bg-gray-300 dark:bg-gray-600"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.div variants={itemVariants} id="skills">
      <motion.div variants={cardVariants} whileHover="hover">
        <Card className="linkedin-card bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <div className="mr-3 p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <Code2 className="h-5 w-5 skills-accent" />
              </div>
              Technical Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {technicalSkills.categories.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="space-y-3"
                >
                  <h3 className="text-lg font-semibold linkedin-blue border-b-2 border-gray-200 dark:border-gray-700 pb-2 mb-4">
                    {category.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700"
                      >
                        <span className="font-medium text-sm flex-1 mr-3 text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          {renderSkillRating(skill.rating, skillIndex)}
                          <span className="text-xs font-medium min-w-[24px] text-center text-gray-500 dark:text-gray-400">
                            {skill.years}y
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
