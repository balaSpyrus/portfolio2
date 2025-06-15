"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  easeInOut,
} from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { OfflineBanner } from "@/components/offline-banner";
import { KeyboardShortcutsHelp } from "@/components/keyboard-shortcuts-help";
import {
  PageTransition,
  SectionTransition,
  StaggerContainer,
} from "@/components/page-transition";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useServiceWorker } from "@/hooks/use-service-worker";
import { useOffline } from "@/hooks/use-offline";

// Material-UI imports
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Box,
  Container,
  Grid,
} from "@mui/material";

import {
  Download,
  User,
  Briefcase,
  Trophy,
  FolderOpen,
  Code2,
  Award,
  BadgeIcon as Certificate,
  GraduationCap,
  Languages,
  Menu,
  X,
  RefreshCw,
} from "lucide-react";
import { PortfolioSkeleton } from "@/components/skeleton-loader";

// Import all section components
import { PersonalInfoSection } from "@/components/sections/personal-info-section";
import { SummarySection } from "@/components/sections/summary-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { AccomplishmentsSection } from "@/components/sections/accomplishments-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { AwardsSection } from "@/components/sections/awards-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { EducationSection } from "@/components/sections/education-section";
import { LanguagesSection } from "@/components/sections/languages-section";

import resumeData from "../data/resume.json";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const navigationVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
};

const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    x: "-100%",
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: easeInOut,
    },
  },
};

const navigationIcons = {
  summary: {
    icon: User,
    color: "linkedin-blue",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  experience: {
    icon: Briefcase,
    color: "linkedin-blue",
    bg: "bg-gray-100 dark:bg-gray-800",
  },
  accomplishments: {
    icon: Trophy,
    color: "linkedin-blue",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  projects: {
    icon: FolderOpen,
    color: "linkedin-blue",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  skills: {
    icon: Code2,
    color: "linkedin-blue",
    bg: "bg-gray-100 dark:bg-gray-800",
  },
  awards: {
    icon: Award,
    color: "linkedin-blue",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  certifications: {
    icon: Certificate,
    color: "linkedin-blue",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  education: {
    icon: GraduationCap,
    color: "linkedin-blue",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  languages: {
    icon: Languages,
    color: "linkedin-blue",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
};

export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("summary");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { isOffline } = useOffline();
  const { isInstalled, isUpdateAvailable, updateServiceWorker } =
    useServiceWorker();

  const navigationItems = [
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "accomplishments", label: "Accomplishments" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "awards", label: "Awards" },
    { id: "certifications", label: "Certifications" },
    { id: "education", label: "Education" },
    { id: "languages", label: "Languages" },
  ];

  // Use intersection observer to track active section
  const activeSection = useIntersectionObserver(
    navigationItems.map((item) => item.id)
  );

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setCurrentSection(sectionId);

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = isOffline ? 96 : 64;
      const elementPosition = element.offsetTop - headerOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  // Initialize keyboard navigation
  useKeyboardNavigation({
    navigationItems,
    activeSection,
    scrollToSection,
  });

  const [scrolled, setScrolled] = useState(false);
  const [showFullHeader, setShowFullHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-based header animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowFullHeader(false);
      } else {
        setShowFullHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate loading with progress
  useEffect(() => {
    const loadingSteps = [
      { step: "Loading personal information...", progress: 20 },
      { step: "Fetching work experience...", progress: 40 },
      { step: "Loading projects...", progress: 60 },
      { step: "Preparing skills data...", progress: 80 },
      { step: "Finalizing portfolio...", progress: 100 },
    ];

    let currentStep = 0;
    const stepDuration = isOffline ? 200 : 600;

    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingProgress(loadingSteps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 300);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isOffline]);

  const handlePrint = () => {
    window.print();
  };

  // Show loading skeleton
  if (isLoading) {
    return (
      <PageTransition>
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
          <OfflineBanner />
          <Box
            sx={{
              position: "fixed",
              top: isOffline ? "40px" : "0px",
              left: 0,
              right: 0,
              zIndex: 40,
            }}
          >
            <motion.div
              className="h-1 linkedin-gradient origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: loadingProgress / 100 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </Box>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="fixed top-4 right-4 z-30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700 shadow-lg"
            style={{ top: isOffline ? "60px" : "16px" }}
          >
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {isOffline ? "Loading cached" : "Loading"} {loadingProgress}%
              </span>
            </div>
          </motion.div>

          <PortfolioSkeleton />
        </Box>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
          <OfflineBanner />

          {/* Service Worker Update Banner */}
          <AnimatePresence>
            {isUpdateAvailable && (
              <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed left-0 right-0 z-50 linkedin-gradient text-white px-4 py-2"
                style={{ top: isOffline ? "40px" : "0px" }}
              >
                <Container maxWidth="xl">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      A new version is available!
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={updateServiceWorker}
                      startIcon={<RefreshCw size={16} />}
                      sx={{
                        bgcolor: "white",
                        color: "primary.main",
                        "&:hover": { bgcolor: "grey.100" },
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                </Container>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          <motion.div
            className="fixed left-0 right-0 h-1 linkedin-gradient z-40 origin-left"
            style={{
              scaleX,
              top: isUpdateAvailable
                ? isOffline
                  ? "80px"
                  : "40px"
                : isOffline
                ? "40px"
                : "0px",
            }}
          />

          {/* Header */}
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              height: showFullHeader ? "auto" : "56px",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`sticky z-30 w-full border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${
              scrolled
                ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-sm"
                : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
            } supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60`}
            style={{
              top: isUpdateAvailable
                ? isOffline
                  ? "80px"
                  : "40px"
                : isOffline
                ? "40px"
                : "0px",
            }}
          >
            <Container maxWidth="xl">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "64px",
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <motion.div
                    animate={{
                      scale: showFullHeader ? 1 : 0.9,
                      opacity: showFullHeader ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-3 min-w-0"
                  >
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        fontSize: showFullHeader ? "1.25rem" : "1.125rem",
                      }}
                      transition={{ duration: 0.3 }}
                      className="font-bold truncate linkedin-text-gradient"
                    >
                      {showFullHeader
                        ? resumeData.personalInfo.name
                        : resumeData.personalInfo.name.split(" ")[0]}
                    </motion.h1>
                  </motion.div>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ display: { xs: "block", lg: "none" } }}>
                    <IconButton
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      sx={{ color: "text.secondary" }}
                    >
                      <AnimatePresence mode="wait">
                        {isMobileMenuOpen ? (
                          <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <X size={20} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Menu size={20} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </IconButton>
                  </Box>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handlePrint}
                      startIcon={<Download size={16} />}
                      sx={{
                        borderRadius: "24px",
                        textTransform: "none",
                        fontWeight: 600,
                        borderColor: "primary.main",
                        color: "primary.main",
                        "&:hover": {
                          bgcolor: "primary.light",
                          borderColor: "primary.main",
                          color: "text.primary",
                        },
                      }}
                    >
                      <Box
                        component="span"
                        sx={{ display: { xs: "none", sm: "inline" } }}
                      >
                        Download PDF
                      </Box>
                      <Box
                        component="span"
                        sx={{ display: { xs: "inline", sm: "none" } }}
                      >
                        PDF
                      </Box>
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <ThemeToggle />
                  </motion.div>
                </Box>
              </Box>
            </Container>
          </motion.header>

          {/* Mobile Navigation Overlay */}
          <AnimatePresence>
            {isMobileMenuOpen && isMobile && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-20 lg:hidden"
                  style={{
                    top: isUpdateAvailable
                      ? isOffline
                        ? "136px"
                        : "96px"
                      : isOffline
                      ? "96px"
                      : "64px",
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <motion.div
                  variants={mobileMenuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="fixed left-0 bottom-0 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 z-20 lg:hidden overflow-y-auto"
                  style={{
                    top: isUpdateAvailable
                      ? isOffline
                        ? "136px"
                        : "96px"
                      : isOffline
                      ? "96px"
                      : "64px",
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, fontWeight: 600 }}
                      className="linkedin-text-gradient"
                    >
                      Navigation
                    </Typography>
                    <StaggerContainer>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        {navigationItems.map(({ id, label }, index) => {
                          const iconConfig =
                            navigationIcons[id as keyof typeof navigationIcons];
                          const Icon = iconConfig.icon;
                          return (
                            <SectionTransition key={id} delay={index * 0.05}>
                              <Button
                                variant={
                                  activeSection === id ? "contained" : "text"
                                }
                                fullWidth
                                onClick={() => scrollToSection(id)}
                                startIcon={
                                  <Box
                                    sx={{
                                      p: 0.5,
                                      borderRadius: 1,
                                      bgcolor:
                                        activeSection === id
                                          ? "rgba(255,255,255,0.2)"
                                          : "transparent",
                                    }}
                                  >
                                    <Icon size={16} />
                                  </Box>
                                }
                                sx={{
                                  justifyContent: "flex-start",
                                  textTransform: "none",
                                  fontWeight: 500,
                                  bgcolor:
                                    activeSection === id
                                      ? "primary.main"
                                      : "transparent",
                                  color:
                                    activeSection === id
                                      ? "white"
                                      : "text.primary",
                                  "&:hover": {
                                    bgcolor:
                                      activeSection === id
                                        ? "primary.dark"
                                        : "action.hover",
                                  },
                                }}
                              >
                                {label}
                              </Button>
                            </SectionTransition>
                          );
                        })}
                      </Box>
                    </StaggerContainer>
                  </Box>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
            <Grid container spacing={{ xs: 3, md: 4 }}>
              {/* Desktop Sidebar Navigation */}
              <Grid
                size={{
                  xs: 12,
                  lg: 3,
                }}
                sx={{ display: { xs: "none", lg: "flex" } }}
              >
                <motion.div
                  variants={navigationVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    width: "100%",
                  }}
                >
                  <Card
                    sx={{
                      position: "sticky",
                      top: isUpdateAvailable
                        ? isOffline
                          ? "176px"
                          : "136px"
                        : isOffline
                        ? "136px"
                        : "96px",
                    }}
                  >
                    <CardHeader>
                      <Typography
                        variant="h6"
                        className="linkedin-text-gradient"
                        sx={{ fontWeight: 600 }}
                      >
                        Navigation
                      </Typography>
                    </CardHeader>
                    <CardContent>
                      <StaggerContainer>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          {navigationItems.map(({ id, label }, index) => {
                            const iconConfig =
                              navigationIcons[
                                id as keyof typeof navigationIcons
                              ];
                            const Icon = iconConfig.icon;
                            return (
                              <SectionTransition key={id} delay={index * 0.05}>
                                <Button
                                  variant={
                                    activeSection === id ? "contained" : "text"
                                  }
                                  fullWidth
                                  onClick={() => scrollToSection(id)}
                                  startIcon={
                                    <Box
                                      sx={{
                                        p: 0.5,
                                        borderRadius: 1,
                                        bgcolor:
                                          activeSection === id
                                            ? "rgba(255,255,255,0.2)"
                                            : "transparent",
                                      }}
                                    >
                                      <Icon size={16} />
                                    </Box>
                                  }
                                  sx={{
                                    justifyContent: "flex-start",
                                    textTransform: "none",
                                    fontWeight: 500,
                                    bgcolor:
                                      activeSection === id
                                        ? "primary.main"
                                        : "transparent",
                                    color:
                                      activeSection === id
                                        ? "white"
                                        : "text.primary",
                                    "&:hover": {
                                      bgcolor:
                                        activeSection === id
                                          ? "primary.dark"
                                          : "action.hover",
                                      transform: "scale(1.02)",
                                    },
                                    transition: "all 0.2s ease",
                                  }}
                                >
                                  {label}
                                </Button>
                              </SectionTransition>
                            );
                          })}
                        </Box>
                      </StaggerContainer>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              {/* Main Content */}
              <Grid
                size={{
                  xs: 12,
                  lg: 9,
                }}
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <StaggerContainer>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: { xs: 3, md: 4 },
                      }}
                    >
                      <SectionTransition delay={0.1}>
                        <PersonalInfoSection
                          personalInfo={resumeData.personalInfo}
                        />
                      </SectionTransition>

                      <SectionTransition delay={0.2}>
                        <SummarySection
                          summary={resumeData.personalInfo.summary}
                        />
                      </SectionTransition>

                      <SectionTransition delay={0.3}>
                        <ExperienceSection
                          workExperience={resumeData.workExperience}
                        />
                      </SectionTransition>

                      <SectionTransition delay={0.4}>
                        <AccomplishmentsSection
                          accomplishments={resumeData.accomplishments}
                        />
                      </SectionTransition>

                      <SectionTransition delay={0.5}>
                        <ProjectsSection projects={resumeData.projects} />
                      </SectionTransition>

                      <SectionTransition delay={0.6}>
                        <SkillsSection
                          technicalSkills={resumeData.technicalSkills}
                        />
                      </SectionTransition>

                      <SectionTransition delay={0.7}>
                        <AwardsSection awards={resumeData.awards} />
                      </SectionTransition>

                      <SectionTransition delay={0.8}>
                        <CertificationsSection
                          certifications={resumeData.certifications}
                        />
                      </SectionTransition>

                      <SectionTransition delay={0.9}>
                        <EducationSection education={resumeData.education} />
                      </SectionTransition>

                      <SectionTransition delay={1.0}>
                        <LanguagesSection languages={resumeData.languages} />
                      </SectionTransition>
                    </Box>
                  </StaggerContainer>
                </motion.div>
              </Grid>
            </Grid>
          </Container>

          {/* Keyboard Shortcuts Help */}
          <KeyboardShortcutsHelp />

          {/* Print Styles */}
          <style jsx global>{`
            @media print {
              .sticky {
                position: static !important;
              }
              .lg\\:col-span-1 {
                display: none !important;
              }
              .lg\\:col-span-3 {
                grid-column: span 4 !important;
              }
              header {
                display: none !important;
              }
              .container {
                max-width: none !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              body {
                font-size: 12px !important;
              }
            }
          `}</style>
        </Box>
      </motion.div>
    </PageTransition>
  );
}
