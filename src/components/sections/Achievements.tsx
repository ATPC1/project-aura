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
      title: "Professional Hoodie Thief",
      subtitle: "STEAL RATE: 99.8%",
      desc: "Successfully requisitioned every comfortable oversize hoodie in a 10-mile radius without remorse.",
      rarity: "LEGENDARY",
      points: 500,
      icon: Flame,
      unlockedByDefault: true,
    },
    {
      id: "brighter",
      title: "Makes Every Room Brighter",
      subtitle: "AURA OUTPUT: 10,000 LUMENS",
      desc: "Instantaneous illumination upon entry. Electricity companies hate this one simple trick.",
      rarity: "MYTHIC",
      points: 750,
      icon: Sparkles,
      unlockedByDefault: true,
    },
    {
      id: "booster",
      title: "Certified Mood Booster",
      subtitle: "SEROTONIN SPIKE: +400%",
      desc: "Scientifically verified ability to turn chaotic stress into peaceful happiness within seconds.",
      rarity: "EPIC",
      points: 600,
      icon: Heart,
      unlockedByDefault: true,
    },
    {
      id: "pretty",
      title: "Too Pretty To Process",
      subtitle: "GPU OVERLOAD WARNING",
      desc: "Caused visual rendering units and human brains to temporarily stall due to extreme aesthetic detail.",
      rarity: "GOD TIER",
      points: 999,
      icon: ShieldAlert,
      unlockedByDefault: true,
    },
    {
      id: "favorite",
      title: "Favorite Human in the Universe",
      subtitle: "100% COMPLETION BADGE",
      desc: "The ultimate one-of-a-kind trophy. Tap to permanently claim your rightful title.",
      rarity: "ONE OF ONE ★",
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
          <div className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-amber-500/30">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-[11px] tracking-[0.3em] text-amber-300 uppercase">
              SECTION 03 · GAMER PROFILE
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-outfit text-white">
            Unlocked <span className="text-gradient-gold">Achievements</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg font-light max-w-xl">
            Anshi&apos;s lifelong trophy case. Tap any locked mythic achievement badge to claim your reward and trigger visual celebrations.
          </p>
        </div>

        {/* Gamerscore Widget */}
        <div className="glass-panel p-6 rounded-3xl border border-amber-500/40 flex items-center gap-6 shadow-2xl">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-black font-black">
            <Star className="w-8 h-8 fill-current animate-spin-slow" />
          </div>
          <div>
            <div className="font-mono text-xs text-white/50 tracking-widest uppercase">
              TOTAL AURA SCORE
            </div>
            <div className="text-4xl font-black font-mono text-gradient-gold">
              {totalPoints.toLocaleString()} <span className="text-sm font-normal text-white/40">PTS</span>
            </div>
            <div className="font-mono text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {Object.values(unlocked).filter(Boolean).length} / {achievementsList.length} UNLOCKED
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
                  ? "glass-card border-amber-500/40 shadow-2xl shadow-amber-500/10 cursor-default"
                  : "glass-panel border-white/10 opacity-70 hover:opacity-100 hover:border-pink-500/50 cursor-pointer group"
              }`}
            >
              {/* Top Rarity Tag */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`font-mono text-[10px] tracking-widest px-3 py-1 rounded-full font-bold ${
                    isUnlocked
                      ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {ach.rarity}
                </span>
                <span className="font-mono text-xs font-bold text-pink-400">
                  +{ach.points} PTS
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`p-4 rounded-2xl transition-transform duration-500 ${
                    isUnlocked
                      ? "bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 scale-105"
                      : "bg-white/5 text-white/40 group-hover:scale-110 group-hover:text-pink-400"
                  }`}
                >
                  {isUnlocked ? <Icon className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-outfit text-white leading-tight">
                    {ach.title}
                  </h3>
                  <div className="font-mono text-[10px] tracking-widest text-pink-300 mt-0.5">
                    {ach.subtitle}
                  </div>
                </div>
              </div>

              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                {ach.desc}
              </p>

              {/* Status Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                {isUnlocked ? (
                  <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    ACHIEVEMENT UNLOCKED
                  </span>
                ) : (
                  <span className="text-amber-300 animate-pulse flex items-center gap-1.5 font-semibold">
                    <Sparkles className="w-4 h-4" />
                    TAP TO UNLOCK NOW
                  </span>
                )}
                <span className="text-white/30">#00{index + 1}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
