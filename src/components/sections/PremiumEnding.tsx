"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUp, Crown, Heart } from "lucide-react";

export default function PremiumEnding() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto z-10 text-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-amber-400/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Closing Statement */}
      <div className="space-y-6 max-w-4xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-white/10"
        >
          <Crown className="w-4 h-4 text-amber-400" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-white/70 uppercase font-bold">
            THE FINAL CHAPTER
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight font-outfit text-white leading-tight"
        >
          There is only <span className="text-gradient-aura italic font-normal">one.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto"
        >
          An award-winning interactive digital tribute. Built to celebrate 18 years of Anshi bringing effortless charm and unmatched elegance to the universe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8"
        >
          <button
            onClick={scrollToTop}
            className="glass-panel px-8 py-4 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-white/10 transition border border-white/20 inline-flex items-center gap-2 text-white group shadow-xl"
          >
            <span>Return to Top</span>
            <ArrowUp className="w-4 h-4 text-pink-400 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Minimalist Awwwards-Style Credits */}
      <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-white/40">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
          <span>PROJECT AURA — THE MAIN CHARACTER EXPERIENCE</span>
        </div>

        <div className="flex items-center gap-6">
          <span>DOB • 15 MAY 2006</span>
          <span>•</span>
          <span className="text-white/70">DESIGNED EXCLUSIVELY FOR ANSHI</span>
        </div>

        <div className="flex items-center gap-1 text-pink-400">
          <span>BUILT WITH</span>
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>& INFINITE AURA</span>
        </div>
      </div>
    </footer>
  );
}
