"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CinematicIntro from "@/components/sections/CinematicIntro";
import HeroSection from "@/components/sections/HeroSection";
import AiPersonality from "@/components/sections/AiPersonality";
import Achievements from "@/components/sections/Achievements";
import PhotoGallery from "@/components/sections/PhotoGallery";
import MemoryTimeline from "@/components/sections/MemoryTimeline";
import AuraDefenderGame from "@/components/sections/AuraDefenderGame";
import SecretSection from "@/components/sections/SecretSection";
import PremiumEnding from "@/components/sections/PremiumEnding";

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-rose-400 selection:text-white bg-[#fff5f7] text-[#2d0a14]">
      <AnimatePresence mode="wait">
        {isBooting && <CinematicIntro onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isBooting ? 0 : 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-12 md:space-y-24 pb-24"
      >
        <HeroSection />
        <AiPersonality />
        <Achievements />
        <PhotoGallery />
        <MemoryTimeline />
        <AuraDefenderGame />
        <SecretSection />
        <PremiumEnding />
      </motion.div>
    </main>
  );
}
