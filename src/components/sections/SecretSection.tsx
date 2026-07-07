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
    <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center relative z-10 select-none">
      <div className="glass-card p-12 rounded-3xl border border-rose-300 shadow-xl space-y-8 relative overflow-hidden bg-white/90">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />

        <div className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-rose-300 shadow-sm">
          <Key className="w-4 h-4 text-rose-600 animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-rose-600 uppercase font-bold">
            CLASSIFIED FILE · SECURITY LEVEL 10 🔒🔐
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black tracking-tight font-outfit text-[#2d0a14]">
          The <span className="text-gradient-aura">Konami Vault</span> 🗝️✨
        </h2>

        <p className="text-[#64283c] text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
          A protected memory vault encrypted exclusively for Anshi! 💌🔒 Click the security lock above or enter the classic Konami code <span className="font-mono text-amber-600 font-bold">↑ ↑ ↓ ↓ ← → ← → B A 🎮</span> on your keyboard to bypass authentication! 🚀
        </p>

        {/* Lock Icon Interactive Trigger */}
        <div className="pt-4 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerUnlock}
            className="group relative px-8 py-5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-mono text-xs tracking-widest uppercase font-extrabold shadow-lg shadow-rose-500/30 flex items-center gap-3"
          >
            <Lock className="w-4 h-4 group-hover:hidden" />
            <Unlock className="w-4 h-4 hidden group-hover:block" />
            <span>TAP TO BYPASS SECURITY PROTOCOL 🔓⚡</span>
          </motion.button>
        </div>
      </div>

      {/* Secret Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-[#fff5f7]/95 backdrop-blur-xl flex items-center justify-center p-6 select-none overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full glass-panel rounded-3xl p-8 md:p-12 border border-rose-400 shadow-2xl text-left space-y-6 relative overflow-hidden bg-white/95 my-auto"
            >
              <div className="flex items-center justify-between border-b border-rose-200 pb-4 font-mono text-xs text-rose-600 font-bold">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  AUTHENTICATION SUCCESSFUL ✅🔓
                </span>
                <span>Personal Dispatch #001 💌✨</span>
              </div>

              <div className="space-y-4 font-serif text-[#2d0a14] leading-relaxed">
                <h3 className="text-2xl font-bold italic">
                  To the One and Only Anshi, 👑💖
                </h3>
                <p className="font-light">
                  We built this digital experience because standard gifts or typical web pages could never do justice to your energy! ✨ You bring effortless grace, contagious laughter, and undeniable royalty into every room you enter! 🌸🥰
                </p>
                <p className="font-light">
                  Whether wearing sarees with regal majesty 🥻 or stealing hoodies without a trace 🧥😉, your aesthetic sets a standard that nobody else can replicate! 🔥👑
                </p>
                <p className="font-light">
                  Never change, never settle, and always keep shining as the undisputed, undefeated main character of the universe! 🌌✨💫
                </p>
                <div className="pt-4 font-outfit font-bold tracking-wide text-rose-600">
                  — Built with unconditional love & infinite respect. ❤️💌
                </div>
              </div>

              <div className="pt-6 border-t border-rose-200 flex justify-between items-center">
                <span className="font-mono text-[10px] text-[#64283c]/60 font-bold">
                  PERMANENTLY ARCHIVED IN AURA OS 💎🔒
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-rose-100 hover:bg-rose-200 text-[#2d0a14] px-6 py-2 rounded-full font-mono text-xs transition font-bold"
                >
                  LOCK VAULT 🔐
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
