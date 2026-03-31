"use client";

import { AnimatePresence, motion } from "framer-motion";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import { useThemeStore } from "../../store/themeStore";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isDark } = useThemeStore();

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="pt-16"
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}

