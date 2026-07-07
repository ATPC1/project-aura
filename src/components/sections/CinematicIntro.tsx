"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, ShieldCheck, Cpu } from "lucide-react";

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const messages = [
    { text: "Initializing Aura OS...", icon: Cpu, sub: "KERNEL v.2006.05.15" },
    { text: "Searching among billions of people...", icon: Terminal, sub: "SCANNING 8,000,000,000 PROFILES" },
    { text: "Match Found: Anshi", icon: ShieldCheck, sub: "DOB · 15 MAY 2006 · 100% UNIQUE" },
    { text: "Loading The Main Character Experience...", icon: Sparkles, sub: "PREPARING ONE-OF-ONE EDITION" },
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 28);

    const stepTimers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 1700),
      setTimeout(() => setStep(3), 2400),
      setTimeout(() => {
        onComplete();
      }, 3300),
    ];

    return () => {
      clearInterval(progressInterval);
      stepTimers.forEach(clearTimeout);
    };
  }, [onComplete]);

  const CurrentIcon = messages[step]?.icon || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#fff5f7] flex flex-col items-center justify-center p-6 select-none"
    >
      {/* Ambient Glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-rose-400/30 via-pink-300/20 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full glass-panel rounded-3xl p-8 border border-rose-300 shadow-xl text-center flex flex-col items-center bg-white/95">
        {/* Animated Icon Ring */}
        <div className="relative mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full border border-rose-300 border-t-rose-500 flex items-center justify-center"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <CurrentIcon className="w-8 h-8 text-rose-500 animate-pulse" />
          </div>
        </div>

        {/* Text Sequence */}
        <div className="h-20 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-1"
            >
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#2d0a14] font-outfit">
                {messages[step]?.text}
              </h2>
              <p className="font-mono text-[11px] tracking-[0.2em] text-rose-600 font-bold">
                {messages[step]?.sub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="w-full mt-6 space-y-2">
          <div className="h-1.5 w-full bg-rose-100 border border-rose-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <div className="flex justify-between font-mono text-[10px] text-[#64283c]/70 font-bold">
            <span>AURA OS v.1.0</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 font-mono text-[10px] tracking-widest text-[#64283c]/60 font-bold flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
        SECURE LINK · LIMITED EDITION 001
      </div>
    </motion.div>
  );
}
