"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User } from "lucide-react"

const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      duration: 1.5,
      ease: "linear",
    },
  },
}

const SkeletonBox = ({ className = "", animated = true }: { className?: string; animated?: boolean }) => (
  <div className={`bg-gray-200 dark:bg-gray-700 rounded overflow-hidden relative ${className}`}>
    {animated && (
      <motion.div
        variants={shimmerVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-gray-400/20 to-transparent"
      />
    )}
  </div>
)

const ProfilePhotoSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-gray-300 dark:border-gray-600 shadow-lg flex items-center justify-center"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-blue-100 dark:to-blue-800/20 rounded-full"></div>
    <User className="h-8 w-8 md:h-10 md:w-10 text-gray-400 dark:text-gray-500 relative z-10" />
  </motion.div>
)

export const PersonalInfoSkeleton = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    <Card className="linkedin-card bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex flex-col space-y-6">
          {/* Header with Name, Title, and Photo */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Name and Title - Left side */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <SkeletonBox className="h-8 w-3/4 mx-auto sm:mx-0" />
              <SkeletonBox className="h-6 w-1/2 mx-auto sm:mx-0" />
            </div>

            {/* Profile Photo - Right side */}
            <div className="flex-shrink-0 flex justify-center sm:justify-end">
              <ProfilePhotoSkeleton />
            </div>
          </div>

          {/* Contact Information Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <SkeletonBox className="h-4 w-4 rounded-full" />
                <SkeletonBox className="h-4 flex-1" />
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
    </Card>
  </motion.div>
)

export const SummarySkeleton = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
    <Card className="linkedin-card bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <SkeletonBox className="h-5 w-5 rounded" />
          <SkeletonBox className="h-6 w-48" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-3/4" />
        <SkeletonBox className="h-4 w-5/6" />
      </CardContent>
    </Card>
  </motion.div>
)

export const ExperienceSkeleton = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
    <Card className="linkedin-card bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <SkeletonBox className="h-5 w-5 rounded" />
          <SkeletonBox className="h-6 w-40" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {[...Array(3)].map((_, jobIndex) => (
          <div key={jobIndex}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 space-y-2 md:space-y-0">
              <div className="flex-1 space-y-2">
                <SkeletonBox className="h-5 w-2/3" />
                <div className="flex items-center space-x-2">
                  <SkeletonBox className="h-4 w-4 rounded" />
                  <SkeletonBox className="h-4 w-1/2" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <SkeletonBox className="h-4 w-4 rounded" />
                <SkeletonBox className="h-4 w-32" />
              </div>
            </div>
            <div className="flex items-center mb-3 space-x-2">
              <SkeletonBox className="h-4 w-4 rounded" />
              <SkeletonBox className="h-4 w-24" />
            </div>
            <div className="space-y-2">
              {[...Array(3)].map((_, achievementIndex) => (
                <div key={achievementIndex} className="flex space-x-2">
                  <SkeletonBox className="h-4 w-2 mt-1 rounded-full" />
                  <SkeletonBox className="h-4 flex-1" />
                </div>
              ))}
            </div>
            {jobIndex < 2 && <Separator className="mt-6 bg-gray-300 dark:bg-gray-600" />}
          </div>
        ))}
      </CardContent>
    </Card>
  </motion.div>
)

export const AccomplishmentsSkeleton = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
    <Card className="linkedin-card bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <SkeletonBox className="h-5 w-5 rounded" />
          <SkeletonBox className="h-6 w-44" />
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg space-y-2">
            <SkeletonBox className="h-4 w-3/4" />
            <SkeletonBox className="h-3 w-full" />
            <SkeletonBox className="h-3 w-5/6" />
          </div>
        ))}
      </CardContent>
    </Card>
  </motion.div>
)

export const ProjectsSkeleton = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
    <Card className="linkedin-card bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <SkeletonBox className="h-5 w-5 rounded" />
          <SkeletonBox className="h-6 w-36" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {[...Array(3)].map((_, projectIndex) => (
          <div key={projectIndex}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 space-y-2 md:space-y-0">
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <SkeletonBox className="h-5 w-1/3" />
                  <SkeletonBox className="h-4 w-4 rounded" />
                </div>
                <SkeletonBox className="h-4 w-full" />
                <SkeletonBox className="h-4 w-3/4" />
              </div>
              <SkeletonBox className="h-6 w-16 rounded-full" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, techIndex) => (
                <SkeletonBox key={techIndex} className="h-6 w-20 rounded-full" />
              ))}
            </div>
            {projectIndex < 2 && <Separator className="mt-6 bg-gray-300 dark:bg-gray-600" />}
          </div>
        ))}
      </CardContent>
    </Card>
  </motion.div>
)

export const SkillsSkeleton = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}>
    <Card className="linkedin-card bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <SkeletonBox className="h-5 w-5 rounded" />
          <SkeletonBox className="h-6 w-32" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {[...Array(4)].map((_, categoryIndex) => (
          <div key={categoryIndex}>
            <SkeletonBox className="h-5 w-48 mb-3" />
            <div className="grid grid-cols-1 gap-3">
              {[...Array(5)].map((_, skillIndex) => (
                <div
                  key={skillIndex}
                  className="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded"
                >
                  <SkeletonBox className="h-4 w-1/3" />
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, dotIndex) => (
                        <SkeletonBox key={dotIndex} className="h-2 w-2 rounded-full" />
                      ))}
                    </div>
                    <SkeletonBox className="h-3 w-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  </motion.div>
)

export const AwardsSkeleton = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
    <Card className="linkedin-card bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <SkeletonBox className="h-5 w-5 rounded" />
          <SkeletonBox className="h-6 w-44" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg space-y-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-1 md:space-y-0">
              <SkeletonBox className="h-5 w-1/2" />
              <SkeletonBox className="h-4 w-16" />
            </div>
            <SkeletonBox className="h-4 w-1/3" />
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-4 w-3/4" />
          </div>
        ))}
      </CardContent>
    </Card>
  </motion.div>
)

export const CertificationsSkeleton = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7 }}>
    <Card className="linkedin-card bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <SkeletonBox className="h-5 w-5 rounded" />
          <SkeletonBox className="h-6 w-32" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg space-y-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-1 md:space-y-0">
            <SkeletonBox className="h-5 w-2/3" />
            <SkeletonBox className="h-4 w-16" />
          </div>
          <SkeletonBox className="h-4 w-1/4" />
          <SkeletonBox className="h-4 w-full" />
          <SkeletonBox className="h-4 w-4/5" />
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

export const EducationSkeleton = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.8 }}>
    <Card className="linkedin-card bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <SkeletonBox className="h-5 w-5 rounded" />
          <SkeletonBox className="h-6 w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 space-y-2 md:space-y-0">
          <div className="flex-1 space-y-2">
            <SkeletonBox className="h-5 w-3/4" />
            <SkeletonBox className="h-4 w-1/2" />
            <div className="flex items-center space-x-2">
              <SkeletonBox className="h-4 w-4 rounded" />
              <SkeletonBox className="h-4 w-2/3" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <SkeletonBox className="h-4 w-4 rounded" />
            <SkeletonBox className="h-4 w-32" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center mb-3 space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <SkeletonBox className="h-4 w-4 rounded" />
            <SkeletonBox className="h-4 w-24" />
          </div>
          <Separator orientation="vertical" className="mx-2 h-4 hidden sm:block bg-gray-300 dark:bg-gray-600" />
          <SkeletonBox className="h-4 w-20" />
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-2">
              <SkeletonBox className="h-4 w-2 mt-1 rounded-full" />
              <SkeletonBox className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

export const LanguagesSkeleton = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.9 }}>
    <Card className="linkedin-card bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <SkeletonBox className="h-5 w-5 rounded" />
          <SkeletonBox className="h-6 w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded"
            >
              <SkeletonBox className="h-4 w-1/3" />
              <SkeletonBox className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

export const NavigationSkeleton = () => (
  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
    <Card className="sticky top-24 linkedin-card bg-white dark:bg-gray-800">
      <CardHeader>
        <SkeletonBox className="h-5 w-24" />
      </CardHeader>
      <CardContent className="space-y-2">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="flex items-center space-x-2 p-2">
            <SkeletonBox className="h-4 w-4 rounded" />
            <SkeletonBox className="h-4 flex-1" />
          </div>
        ))}
      </CardContent>
    </Card>
  </motion.div>
)

export const HeaderSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="sticky top-0 z-40 w-full border-b border-gray-300 dark:border-gray-600 bg-white/95 dark:bg-gray-800/95 backdrop-blur"
  >
    <div className="container flex h-16 items-center justify-between px-4">
      <SkeletonBox className="h-6 w-48" />
      <div className="flex items-center space-x-2">
        <SkeletonBox className="h-9 w-32 rounded" />
        <SkeletonBox className="h-9 w-9 rounded" />
      </div>
    </div>
  </motion.div>
)

// Combined loading component
export const PortfolioSkeleton = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <HeaderSkeleton />
    <div className="container mx-auto py-4 md:py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        <div className="lg:col-span-1 hidden lg:block">
          <NavigationSkeleton />
        </div>
        <div className="lg:col-span-3 space-y-6 md:space-y-8">
          <PersonalInfoSkeleton />
          <SummarySkeleton />
          <ExperienceSkeleton />
          <AccomplishmentsSkeleton />
          <ProjectsSkeleton />
          <SkillsSkeleton />
          <AwardsSkeleton />
          <CertificationsSkeleton />
          <EducationSkeleton />
          <LanguagesSkeleton />
        </div>
      </div>
    </div>
  </div>
)
