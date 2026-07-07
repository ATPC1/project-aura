"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Sparkles, Key, Heart, ShieldAlert, X } from "lucide-react";
import confetti from "canvas-confetti";

export default function SecretSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);

  const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiProgress] || e.key.toLowerCase() === konamiCode[konamiProgress]) {
        const next = konamiProgress + 1;
        setKonamiProgress(next);
        if (next === konamiCode.length) {
          triggerUnlock();
          setKonamiProgress(0);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiProgress]);

  const triggerUnlock = () => {
    setIsOpen(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#f472b6", "#fbbf24", "#c084fc", "#ffffff"],
    });
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10 text-center">
      {/* Secret Card Trigger */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={triggerUnlock}
        className="glass-card p-10 md:p-14 rounded-3xl border border-pink-500/30 shadow-2xl cursor-pointer relative overflow-hidden group select-none"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-400/10 opacity-0 group-hover:opacity-100 transition duration-500" />

        <div className="inline-flex p-4 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 mb-6 group-hover:scale-110 transition duration-300 shadow-lg shadow-pink-500/20">
          <Lock className="w-8 h-8" />
        </div>

        <div className="font-mono text-xs tracking-[0.3em] text-pink-300 uppercase mb-2">
          CLASSIFIED FILE · SECURITY LEVEL 10
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-outfit text-white mb-4">
          The <span className="text-gradient-aura">Konami Vault</span>
        </h2>
        <p className="text-white/60 font-light max-w-lg mx-auto text-sm md:text-base mb-8">
          A protected memory vault encrypted exclusively for Anshi. Click the security lock above or enter the classic Konami code <span className="font-mono text-amber-300">↑ ↑ ↓ ↓ ← → ← → B A</span> on your keyboard to bypass authentication.
        </p>

        <div className="inline-flex items-center gap-2 glass-panel px-6 py-3 rounded-full text-xs font-mono tracking-widest text-white/80 group-hover:bg-white/10 transition border border-white/20">
          <Key className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>TAP TO BYPASS SECURITY PROTOCOL</span>
        </div>
      </motion.div>

      {/* Fullscreen Secret Letter Takeover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 select-none overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-2xl w-full glass-card rounded-3xl p-8 md:p-12 border border-pink-500/50 shadow-[0_0_100px_rgba(244,114,182,0.3)] relative text-left bg-charcoal my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg">
                  <Unlock className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-widest text-emerald-400 uppercase">
                    AUTHENTICATION SUCCESSFUL
                  </div>
                  <h3 className="text-2xl font-bold font-outfit text-white">
                    Personal Dispatch #001
                  </h3>
                </div>
              </div>

              {/* Letter Content */}
              <div className="space-y-6 text-white/80 font-light leading-relaxed text-base md:text-lg border-y border-white/10 py-8 my-6">
                <p className="font-outfit text-xl font-medium text-white italic">
                  &ldquo;To the One and Only Anshi,&rdquo;
                </p>
                <p>
                  We built this digital experience because standard gifts or typical web pages could never do justice to your energy. You bring effortless grace, contagious laughter, and undeniable royalty into every room you enter.
                </p>
                <p>
                  Whether wearing sarees with regal majesty or stealing hoodies without a trace, your aesthetic sets a standard that nobody else can replicate.
                </p>
                <p>
                  Never change, never settle, and always keep shining as the undisputed, undefeated main character of the universe.
                </p>
                <p className="font-mono text-sm text-pink-300 pt-2 font-semibold">
                  — Built with unconditional love & infinite respect.
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs">
                  <Heart className="w-4 h-4 fill-current" />
                  <span>PERMANENTLY ARCHIVED IN AURA OS</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-6 py-2.5 rounded-full text-xs font-outfit tracking-wider uppercase hover:scale-105 transition shadow-lg shadow-pink-500/20"
                >
                  LOCK VAULT
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
