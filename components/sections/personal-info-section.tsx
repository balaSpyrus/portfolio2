"use client";

import { motion } from "framer-motion";
import { Card, CardHeader } from "@/components/ui/card";
import { MapPin, Phone, Mail, Linkedin, Globe, User } from "lucide-react";
import { useState } from "react";

interface PersonalInfoSectionProps {
  personalInfo: {
    name: string;
    title: string;
    photo?: string;
    location: { city: string; country: string };
    contact: {
      phone: string;
      email: string;
      linkedin: string;
      website: string;
    };
  };
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
};

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
);

const ProfilePhoto = ({
  src,
  alt,
  onError,
}: {
  src: string;
  alt: string;
  onError: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative"
    >
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        onError={onError}
        className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
      />
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 opacity-20 blur-sm"></div>
    </motion.div>
  );
};

export function PersonalInfoSection({
  personalInfo,
}: PersonalInfoSectionProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const hasValidPhoto =
    personalInfo.photo &&
    personalInfo.photo.trim() !== "" &&
    !personalInfo.photo.includes("placeholder") &&
    !imageError;

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className="linkedin-card bg-white dark:bg-gray-900">
        <CardHeader>
          <div className="flex flex-col space-y-6">
            {/* Header with Name, Title, and Photo */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Name and Title - Left side */}
              <div className="flex-1 text-center sm:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white"
                >
                  {personalInfo.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium"
                >
                  {personalInfo.title}
                </motion.p>
              </div>

              {/* Profile Photo - Right side */}
              <div className="flex-shrink-0 flex justify-center sm:justify-end">
                {hasValidPhoto ? (
                  <>
                    {imageLoading && <ProfilePhotoSkeleton />}
                    <div style={{ display: imageLoading ? "none" : "block" }}>
                      <ProfilePhoto
                        src={personalInfo.photo!}
                        alt={`${personalInfo.name} - Profile Photo`}
                        onError={handleImageError}
                      />
                      <img
                        src={personalInfo.photo || "/placeholder.svg"}
                        alt=""
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        style={{ display: "none" }}
                      />
                    </div>
                  </>
                ) : (
                  <ProfilePhotoSkeleton />
                )}
              </div>
            </div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm"
            >
              <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="truncate text-gray-700 dark:text-gray-300 font-medium">
                  {personalInfo.location.city}, {personalInfo.location.country}
                </span>
              </div>
              <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <Phone className="mr-2 h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="truncate text-gray-700 dark:text-gray-300 font-medium">
                  {personalInfo.contact.phone}
                </span>
              </div>
              <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <Mail className="mr-2 h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="truncate text-gray-700 dark:text-gray-300 font-medium">
                  {personalInfo.contact.email}
                </span>
              </div>
              <div className="flex items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <Linkedin className="mr-2 h-4 w-4 flex-shrink-0 linkedin-blue" />
                <a
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover linkedin-blue font-medium truncate transition-colors"
                >
                  LinkedIn Profile
                </a>
              </div>
              <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 sm:col-span-2 lg:col-span-1">
                <Globe className="mr-2 h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <a
                  href={personalInfo.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-hover linkedin-blue font-medium truncate transition-colors"
                >
                  Portfolio Website
                </a>
              </div>
            </motion.div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
