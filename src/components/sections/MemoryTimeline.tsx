"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Sparkles, Star, Crown, Heart, Zap, Compass } from "lucide-react";

interface TimelineEvent {
  year: string;
  date: string;
  title: string;
  category: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight: string;
}

export default function MemoryTimeline() {
  const events: TimelineEvent[] = [
    {
      year: "2006",
      date: "MAY 15, 2006 👶🎉",
      title: "The Universe Upgraded 🌌✨",
      category: "ORIGIN STORY 👑",
      desc: "Anshi arrives on Earth! 🌍✨ Global aesthetic standards and charm metrics immediately shift upward by 500%! 📈 The Main Character era officially begins! 👑🚀",
      icon: Crown,
      highlight: "HISTORIC MILESTONE 🏆",
    },
    {
      year: "ERA I",
      date: "THE SAREE CORONATION 🥻✨",
      title: "Royalty Confirmed 👑🔥",
      category: "ROYAL ELEGANCE 👸",
      desc: "Stepping out in traditional royal sarees! 🌟 Turning simple hallways and festive entrances into red carpet runway moments! 📸👠",
      icon: Star,
      highlight: "100% REGAL AURA ✨",
    },
    {
      year: "ERA II",
      date: "GOLDEN HOUR MAGIC 🌅✨",
      title: "Sunlight Defeated ☀️😎",
      category: "AESTHETIC SUPREMACY 👑",
      desc: "The sun realizing its evening golden hour rays cannot compete with her natural glow! 🌅✨ Photographers and cameras celebrate! 🎉📸",
      icon: Zap,
      highlight: "UNSTOPPABLE GLOW 🌟",
    },
    {
      year: "ERA III",
      date: "BOUGAINVILLEA DIARIES 🌸💭",
      title: "Blooming Louder Than Flowers 🌺💖",
      category: "NATURAL CHARM 🌷",
      desc: "Bringing vibrant color, warmth, and laughter into every room, garden, and conversation she touches! 🌷🥰",
      icon: Heart,
      highlight: "PURE SEROTONIN 🦋",
    },
    {
      year: "NOW",
      date: "PRESENT DAY & BEYOND 🚀✨",
      title: "Undefeated Main Character 👑🏆",
      category: "ONGOING LEGACY 💫",
      desc: "Continuing her undefeated reign as the rarest, kindest, and most unforgettable vibe in existence! 💫 The story only gets better! 💖📖",
      icon: Compass,
      highlight: "INFINITE POTENTIAL 🌟",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-rose-300 shadow-sm">
          <Clock className="w-4 h-4 text-rose-600" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-rose-600 uppercase font-bold">
            SECTION 05 · CHRONOLOGICAL ARCHIVE ⏳📚
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-outfit text-[#2d0a14]">
          The Memory <span className="text-gradient-aura">Timeline</span> 🕰️✨
        </h2>
        <p className="text-[#64283c] text-base md:text-lg font-light">
          From the legendary arrival on May 15, 2006 to present day royalty! 👑 Trace the key chapters that built the Anshi experience! 📖💖
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Center Vertical Glowing Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-400 via-pink-500 to-amber-400 -translate-x-1/2 opacity-60 shadow-[0_0_15px_rgba(244,114,182,0.6)]" />

        <div className="space-y-16">
          {events.map((event, index) => {
            const Icon = event.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                } gap-8`}
              >
                {/* Center Node Icon */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-rose-500 flex items-center justify-center z-20 shadow-md group">
                  <Icon className="w-5 h-5 text-rose-500 group-hover:scale-125 transition-transform duration-300" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-[calc(50%-40px)] pl-16 md:pl-0">
                  <div
                    className={`glass-card p-8 rounded-3xl relative overflow-hidden glass-card-hover border border-rose-200 bg-white/90 shadow-lg ${
                      isEven ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    {/* Top Rarity Badge */}
                    <div
                      className={`flex items-center gap-3 mb-4 ${
                        isEven ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      <span className="font-mono text-xs tracking-widest text-rose-600 font-bold">
                        {event.date}
                      </span>
                      <span className="font-mono text-[10px] tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold border border-rose-300">
                        {event.highlight}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold font-outfit text-[#2d0a14] mb-3">
                      {event.title}
                    </h3>

                    <p className="text-[#64283c] font-light leading-relaxed text-sm md:text-base">
                      {event.desc}
                    </p>

                    <div
                      className={`mt-6 pt-4 border-t border-rose-200 flex items-center gap-2 font-mono text-[11px] text-[#64283c]/70 font-bold ${
                        isEven ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>CHAPTER #{index + 1} · {event.category} ✨</span>
                    </div>
                  </div>
                </div>

                {/* Empty Spacer for alternating layout */}
                <div className="hidden md:block w-[calc(50%-40px)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
