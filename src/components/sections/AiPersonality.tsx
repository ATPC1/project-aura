"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, AlertTriangle, Zap, Lock, Crown, Activity, MessageSquare } from "lucide-react";

interface StatCard {
  id: string;
  title: string;
  category: string;
  value: string;
  status: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  analysis: string;
  detail: string;
}

export default function AiPersonality() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const stats: StatCard[] = [
    {
      id: "beauty",
      title: "Beauty Level",
      category: "AESTHETICS",
      value: "9,999+",
      status: "System Overflow ⚠️",
      icon: AlertTriangle,
      color: "from-pink-500 to-rose-500",
      analysis: "Warning: Aesthetic density exceeds standard sensory processing limits.",
      detail: "When she enters a room, lighting adjusts naturally to complement her aura. Photographers weep.",
    },
    {
      id: "smile",
      title: "Smile Quality",
      category: "CHARM INDEX",
      value: "100%",
      status: "Dangerous / Lethal ✨",
      icon: Zap,
      color: "from-amber-400 to-orange-500",
      analysis: "High risk of causing spontaneous infatuation and rapid heartbeat.",
      detail: "Verified by 10/10 cardiologists: her smile is scientifically proven to cure bad days instantly.",
    },
    {
      id: "food",
      title: "Food Sharing",
      category: "GENEROSITY",
      value: "0.01%",
      status: "Rare Artifact 🔒",
      icon: Lock,
      color: "from-purple-500 to-indigo-500",
      analysis: "Access denied. What is on her plate belongs exclusively to her.",
      detail: "Will happily share your fries, but her dessert is classified under maximum national security.",
    },
    {
      id: "fashion",
      title: "Fashion Sense",
      category: "STYLE QUOTIENT",
      value: "Tier S+",
      status: "Elite / Runway 👗",
      icon: Crown,
      color: "from-fuchsia-500 to-pink-500",
      analysis: "Effortlessly transforms casual hoodies or traditional sarees into haute couture.",
      detail: "Whether wearing traditional royal sarees or stealing oversize hoodies, she sets the standard.",
    },
    {
      id: "mood",
      title: "Mood Detector",
      category: "ATMOSPHERE",
      value: "Dynamic",
      status: "Unpredictable 🌀",
      icon: Activity,
      color: "from-blue-400 to-cyan-500",
      analysis: "Ranges from sweet angel to chaotic energy within 4.2 seconds.",
      detail: "Requires regular snacks, compliments, and attention to maintain optimal peaceful operations.",
    },
    {
      id: "reply",
      title: "Reply Speed",
      category: "COMMUNICATION",
      value: "Variable",
      status: "Depends on Vibe ⏱️",
      icon: MessageSquare,
      color: "from-emerald-400 to-teal-500",
      analysis: "Can reply in 0.5 seconds or 3 business days depending on current energy levels.",
      detail: "If she leaves you on read, she is simply giving you time to appreciate her previous message.",
    },
  ];

  return (
    <section id="ai-analysis" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-purple-500/30">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-purple-300 uppercase">
            SECTION 02 · BIOMETRIC SCAN
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-outfit text-white">
          AI Personality <span className="text-gradient-aura">Analysis</span>
        </h2>
        <p className="text-white/60 text-base md:text-lg font-light">
          We fed 18 years of Anshi&apos;s behavioral data into a supercomputer. Click any biometric stat card below to decrypt her classified personality reports.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isSelected = activeCard === stat.id;

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveCard(isSelected ? null : stat.id)}
              className={`glass-card p-6 rounded-3xl cursor-pointer glass-card-hover relative overflow-hidden transition-all duration-300 ${
                isSelected ? "ring-2 ring-pink-500/80 bg-white/[0.08]" : ""
              }`}
            >
              {/* Top Accent Gradient Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-75`} />

              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
                    {stat.category}
                  </span>
                  <h3 className="text-2xl font-bold font-outfit text-white mt-1">
                    {stat.title}
                  </h3>
                </div>
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-10 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Stat Metric */}
              <div className="mb-4">
                <div className="text-3xl font-black font-mono tracking-tight text-white">
                  {stat.value}
                </div>
                <div className="inline-block mt-1 font-mono text-xs px-2.5 py-1 rounded-md bg-white/10 text-pink-300 font-semibold">
                  {stat.status}
                </div>
              </div>

              {/* Brief Analysis */}
              <p className="text-sm text-white/70 font-light leading-relaxed mb-4">
                {stat.analysis}
              </p>

              {/* Expandable Secret Detail */}
              <motion.div
                initial={false}
                animate={{
                  height: isSelected ? "auto" : 0,
                  opacity: isSelected ? 1 : 0,
                }}
                className="overflow-hidden border-t border-white/10 pt-3 text-xs text-amber-300/90 font-mono leading-relaxed"
              >
                <div className="font-bold uppercase tracking-wider mb-1 text-pink-400">
                  ⚡ DECRYPTED NOTE:
                </div>
                {stat.detail}
              </motion.div>

              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span>CLICK TO {isSelected ? "COLLAPSE" : "DECRYPT"}</span>
                <span className="text-pink-400">#00{index + 1}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
