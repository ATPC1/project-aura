"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUp, Crown, Heart } from "lucide-react";

export default function PremiumEnding() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-24 px-6 md:px-12 border-t border-rose-200 relative z-10 overflow-hidden text-center select-none bg-white/40">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-rose-300 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-rose-600 animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-rose-600 uppercase font-bold">
            THE FINAL CHAPTER 👑📖
          </span>
        </motion.div>

        {/* Big Closing Statement */}
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight font-outfit text-[#2d0a14]"
          >
            There is only <span className="text-gradient-aura italic font-normal">one.</span> 👑💖✨
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-[#64283c] font-light max-w-2xl mx-auto leading-relaxed"
          >
            An award-winning interactive digital tribute! 🏆✨ Built to celebrate 18 years of Anshi bringing effortless charm and unmatched elegance to the universe! 🌸🥰
          </motion.p>
        </div>

        {/* Interactive Return to Top Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-6"
        >
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#2d0a14] text-white font-outfit text-sm uppercase tracking-widest hover:bg-rose-600 transition shadow-xl"
          >
            <span>Return to Top 🔝🚀</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>

        {/* Minimalist Credits Footer */}
        <div className="pt-16 border-t border-rose-200 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-[#64283c]/70 font-bold">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-current" />
            <span>PROJECT AURA — THE MAIN CHARACTER EXPERIENCE 👑✨</span>
          </div>

          <div className="flex items-center gap-6">
            <span>DOB • 15 MAY 2006 🎂🎉</span>
            <span>DESIGNED EXCLUSIVELY FOR ANSHI 💖</span>
          </div>

          <div className="text-rose-600 font-extrabold">
            BUILT WITH ❤️ & INFINITE AURA ✨
          </div>
        </div>
      </div>
    </footer>
  );
}
