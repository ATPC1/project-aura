"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, CheckCircle2, Lock, Sparkles, Star, ShieldAlert, Heart, Flame } from "lucide-react";
import confetti from "canvas-confetti";

interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  rarity: string;
  points: number;
  icon: React.ComponentType<{ className?: string }>;
  unlockedByDefault: boolean;
}

export default function Achievements() {
  const [unlocked, setUnlocked] = useState<Record<string, boolean>>({
    hoodie: true,
    brighter: true,
    booster: true,
    pretty: true,
    favorite: false, // The final clickable unlockable!
  });

  const achievementsList: Achievement[] = [
    {
      id: "hoodie",
      title: "Professional Hoodie Thief 🧥🔥",
      subtitle: "STEAL RATE: 99.8% 😎👌",
      desc: "Successfully requisitioned every comfortable oversize hoodie in a 10-mile radius without remorse! 🧥💨",
      rarity: "LEGENDARY 👑",
      points: 500,
      icon: Flame,
      unlockedByDefault: true,
    },
    {
      id: "brighter",
      title: "Makes Every Room Brighter ☀️✨",
      subtitle: "AURA OUTPUT: 10,000 LUMENS 💡🌟",
      desc: "Instantaneous illumination upon entry! 🌞 Electricity companies hate this one simple trick! ⚡😂",
      rarity: "MYTHIC ✨",
      points: 750,
      icon: Sparkles,
      unlockedByDefault: true,
    },
    {
      id: "booster",
      title: "Certified Mood Booster 🦋💖",
      subtitle: "SEROTONIN SPIKE: +400% 📈🥰",
      desc: "Scientifically verified ability to turn chaotic stress into peaceful happiness within seconds! 🕊️❤️",
      rarity: "EPIC 🌟",
      points: 600,
      icon: Heart,
      unlockedByDefault: true,
    },
    {
      id: "pretty",
      title: "Too Pretty To Process 🥺💘",
      subtitle: "GPU OVERLOAD WARNING ⚠️🔥",
      desc: "Caused visual rendering units and human brains to temporarily stall due to extreme aesthetic detail! 🤯💖",
      rarity: "GOD TIER 👑",
      points: 999,
      icon: ShieldAlert,
      unlockedByDefault: true,
    },
    {
      id: "favorite",
      title: "Favorite Human in the Universe 🌌👑",
      subtitle: "100% COMPLETION BADGE 🏆💎",
      desc: "The ultimate one-of-a-kind trophy! 🏆 Tap to permanently claim your rightful title! 💕✨",
      rarity: "ONE OF ONE ★💎",
      points: 5000,
      icon: Trophy,
      unlockedByDefault: false,
    },
  ];

  const handleUnlock = (id: string, e: React.MouseEvent) => {
    if (!unlocked[id]) {
      setUnlocked((prev) => ({ ...prev, [id]: true }));

      // Trigger Celebration Confetti
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { x, y },
        colors: ["#f472b6", "#fbbf24", "#c084fc", "#ffffff"],
      });
    }
  };

  const totalPoints = Object.keys(unlocked).filter((k) => unlocked[k]).reduce((acc, key) => {
    const ach = achievementsList.find((a) => a.id === key);
    return acc + (ach ? ach.points : 0);
  }, 0);

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-amber-400 shadow-sm">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="font-mono text-[11px] tracking-[0.3em] text-amber-700 uppercase font-bold">
              SECTION 03 · GAMER PROFILE 🎮🏆
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-outfit text-[#2d0a14]">
            Unlocked <span className="text-gradient-gold">Achievements</span> 🏆✨
          </h2>
          <p className="text-[#64283c] text-base md:text-lg font-light max-w-xl">
            Anshi&apos;s lifelong trophy case! 🏅💖 Tap any locked mythic achievement badge to claim your reward and trigger visual celebrations! 🎉🥳
          </p>
        </div>

        {/* Gamerscore Widget */}
        <div className="glass-panel p-6 rounded-3xl border border-amber-400/60 flex items-center gap-6 shadow-xl bg-white/90">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white font-black shadow-md">
            <Star className="w-8 h-8 fill-current animate-spin-slow" />
          </div>
          <div>
            <div className="font-mono text-xs text-[#64283c]/70 tracking-widest uppercase font-bold">
              TOTAL AURA SCORE 🌟💎
            </div>
            <div className="text-4xl font-black font-mono text-gradient-gold">
              {totalPoints.toLocaleString()} <span className="text-sm font-normal text-[#64283c]">PTS 🔥</span>
            </div>
            <div className="font-mono text-[10px] text-emerald-600 mt-1 flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3 h-3" />
              {Object.values(unlocked).filter(Boolean).length} / {achievementsList.length} UNLOCKED 🔓🎉
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievementsList.map((ach, index) => {
          const isUnlocked = unlocked[ach.id];
          const Icon = ach.icon;

          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={(e) => handleUnlock(ach.id, e)}
              className={`p-6 rounded-3xl transition-all duration-500 relative overflow-hidden select-none ${
                isUnlocked
                  ? "glass-card border-amber-400/60 shadow-xl shadow-amber-500/15 cursor-default bg-white/95"
                  : "glass-panel border-rose-300 opacity-80 hover:opacity-100 hover:border-rose-500 cursor-pointer group bg-white/60"
              }`}
            >
              {/* Top Rarity Tag */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`font-mono text-[10px] tracking-widest px-3 py-1 rounded-full font-bold ${
                    isUnlocked
                      ? "bg-amber-100 text-amber-800 border border-amber-300"
                      : "bg-rose-100 text-rose-700 border border-rose-200"
                  }`}
                >
                  {ach.rarity}
                </span>
                <span className="font-mono text-xs font-extrabold text-rose-600">
                  +{ach.points} PTS ✨
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`p-4 rounded-2xl transition-transform duration-500 ${
                    isUnlocked
                      ? "bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/30 scale-105"
                      : "bg-rose-100 text-rose-500 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white"
                  }`}
                >
                  {isUnlocked ? <Icon className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-outfit text-[#2d0a14] leading-tight">
                    {ach.title}
                  </h3>
                  <div className="font-mono text-[10px] tracking-widest text-rose-600 font-bold mt-0.5">
                    {ach.subtitle}
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#64283c] font-light leading-relaxed mb-6">
                {ach.desc}
              </p>

              {/* Status Footer */}
              <div className="pt-4 border-t border-rose-200 flex items-center justify-between font-mono text-xs">
                {isUnlocked ? (
                  <span className="text-emerald-600 flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    ACHIEVEMENT UNLOCKED 🎉💖
                  </span>
                ) : (
                  <span className="text-amber-600 animate-pulse flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-4 h-4" />
                    TAP TO UNLOCK NOW ✨🔓
                  </span>
                )}
                <span className="text-[#64283c]/60 font-bold">#00{index + 1}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
