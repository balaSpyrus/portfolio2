"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FolderOpen, ExternalLink } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url: string
  type: string
  status: string
}

interface ProjectsSectionProps {
  projects: Project[]
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

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <motion.div variants={itemVariants} id="projects">
      <motion.div variants={cardVariants} whileHover="hover">
        <Card className="linkedin-card bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <div className="mr-3 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <FolderOpen className="h-5 w-5 projects-accent" />
              </div>
              Notable Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 space-y-2 md:space-y-0">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold flex items-center flex-wrap text-gray-900 dark:text-white">
                      <span className="mr-2">{project.name}</span>
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="linkedin-blue hover:opacity-80"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </motion.a>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{project.description}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="self-start bg-green-50 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 border-0 font-medium"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
                {index < projects.length - 1 && <Separator className="mt-6 bg-gray-200 dark:bg-gray-700" />}
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
