"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Smile, Fingerprint, Compass, RefreshCw, CheckCircle2, Zap, Flame } from "lucide-react";

export default function InteractiveWidgets() {
  const [activeTab, setActiveTab] = useState<"compliment" | "mood" | "scanner" | "fortune">("compliment");

  // Tab 1: Compliment / Roast Generator
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [isRoast, setIsRoast] = useState(false);
  const compliments = [
    "You don't just enter a room; you upgrade its entire aesthetic architecture.",
    "If elegance were a currency, you would be a central bank.",
    "Your smile has a higher conversion rate than Apple's landing page.",
    "Even your candid unposed photos look like directed cinematic masterpieces.",
    "You are the human equivalent of a 100% battery charge on a sunny Friday afternoon.",
  ];
  const roasts = [
    "Your reply speed is currently being studied by historians as a geological timeline.",
    "You steal hoodies with the professional precision of an international art thief.",
    "You can go from sweet angel to 'Do Not Disturb' faster than a Wi-Fi disconnection.",
    "You will happily share opinions, but your dessert is guarded by laser security.",
    "You spend 45 minutes deciding what to watch, only to fall asleep 5 minutes in.",
  ];

  // Tab 2: Mood Meter
  const [moodValue, setMoodValue] = useState(80);
  const getMoodLabel = (val: number) => {
    if (val < 25) return { label: "Do Not Disturb 🛑", desc: "Requires emergency chocolates and silence." };
    if (val < 50) return { label: "Low Battery 🔋", desc: "Approaching cozy hoodie and nap time." };
    if (val < 85) return { label: "Angel Vibe ✨", desc: "Optimal Serotonin & Sweetest Charm." };
    return { label: "Chaotic Goddess 🔥", desc: "Unstoppable energy. Proceed with extreme admiration." };
  };

  // Tab 3: Compatibility Scanner
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const triggerScan = () => {
    setScanning(true);
    setScanDone(false);
    setTimeout(() => {
      setScanning(false);
      setScanDone(true);
    }, 2000);
  };

  // Tab 4: Fortune Generator
  const [fortuneIndex, setFortuneIndex] = useState(0);
  const fortunes = [
    "Your aesthetic will cause at least 3 people to forget what they were saying today.",
    "An unexpected supply of gourmet snacks and coffee is in your near future.",
    "Someone is currently looking at your photo and thinking how lucky they are to know you.",
    "You will win every argument today simply by smiling and tilting your head.",
    "A golden hour photo opportunity will present itself soon. Be ready.",
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-cyan-500/30">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-cyan-300 uppercase">
            SECTION 06 · INTERACTIVE HUB
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-outfit text-white">
          Aura <span className="text-gradient-aura">Widgets</span>
        </h2>
        <p className="text-white/60 text-base md:text-lg font-light">
          A suite of interactive mini-apps engineered specifically for Anshi. Generate AI compliments, calibrate your mood, or scan compatibility.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {[
          { id: "compliment", label: "AI Generator", icon: Sparkles },
          { id: "mood", label: "Mood Meter", icon: Smile },
          { id: "scanner", label: "Compatibility", icon: Fingerprint },
          { id: "fortune", label: "Daily Fortune", icon: Compass },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-outfit text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-black shadow-lg shadow-pink-500/20 scale-105"
                  : "glass-panel text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Widget Content Display */}
      <div className="glass-card p-8 md:p-14 rounded-3xl border border-white/15 shadow-2xl min-h-[380px] flex flex-col justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {/* TAB 1: COMPLIMENT / ROAST GENERATOR */}
          {activeTab === "compliment" && (
            <motion.div
              key="compliment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-2xl mx-auto space-y-8"
            >
              <div className="inline-flex items-center gap-2 font-mono text-xs text-pink-400 bg-pink-500/10 px-4 py-1.5 rounded-full border border-pink-500/20 uppercase">
                <Sparkles className="w-4 h-4" />
                <span>{isRoast ? "PLAYFUL ROAST MODE 🔥" : "SWEET COMPLIMENT MODE ✨"}</span>
              </div>

              <div className="min-h-[100px] flex items-center justify-center">
                <p className="text-2xl md:text-3xl font-bold font-outfit text-white leading-relaxed italic">
                  &ldquo;{isRoast ? roasts[complimentIndex % roasts.length] : compliments[complimentIndex % compliments.length]}&rdquo;
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setComplimentIndex((prev) => prev + 1)}
                  className="bg-white text-black font-bold px-8 py-3.5 rounded-full hover:bg-white/90 transition flex items-center gap-2 font-outfit text-sm shadow-xl"
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate Another
                </button>
                <button
                  onClick={() => setIsRoast(!isRoast)}
                  className="glass-panel text-white font-medium px-8 py-3.5 rounded-full hover:bg-white/10 transition font-outfit text-sm border border-white/20"
                >
                  Switch to {isRoast ? "Compliments ✨" : "Playful Roasts 🔥"}
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: MOOD METER */}
          {activeTab === "mood" && (
            <motion.div
              key="mood"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-2xl mx-auto space-y-8"
            >
              <div className="space-y-2">
                <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
                  CALIBRATE CURRENT ENERGY
                </div>
                <h3 className="text-3xl md:text-4xl font-black font-outfit text-white">
                  {getMoodLabel(moodValue).label}
                </h3>
                <p className="text-white/70 font-light text-base">
                  {getMoodLabel(moodValue).desc}
                </p>
              </div>

              {/* Slider */}
              <div className="space-y-4 pt-6">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={moodValue}
                  onChange={(e) => setMoodValue(Number(e.target.value))}
                  className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <div className="flex justify-between font-mono text-xs text-white/40">
                  <span>0% (NAP TIME)</span>
                  <span>50% (COZY)</span>
                  <span>100% (UNSTOPPABLE)</span>
                </div>
              </div>

              <div className="pt-4">
                <span className="glass-panel px-6 py-2 rounded-full font-mono text-xs text-amber-300 border border-amber-400/30 inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  MOOD LOGGED IN AURA OS
                </span>
              </div>
            </motion.div>
          )}

          {/* TAB 3: COMPATIBILITY SCANNER */}
          {activeTab === "scanner" && (
            <motion.div
              key="scanner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-xl mx-auto space-y-8"
            >
              <div className="font-mono text-xs text-purple-400 tracking-widest uppercase">
                BIOMETRIC RESONANCE TEST
              </div>

              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                <motion.div
                  animate={{ rotate: scanning ? 360 : 0 }}
                  transition={{ duration: 2, repeat: scanning ? Infinity : 0, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-pink-500/50"
                />
                <button
                  onClick={triggerScan}
                  disabled={scanning}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition disabled:opacity-50"
                >
                  <Fingerprint className={`w-12 h-12 ${scanning ? "animate-pulse" : ""}`} />
                </button>
              </div>

              {scanning && (
                <div className="font-mono text-sm text-pink-300 animate-pulse">
                  SCANNING AURA RESONANCE... 99.9%...
                </div>
              )}

              {scanDone && !scanning && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="glass-panel p-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/5 space-y-2"
                >
                  <div className="text-emerald-400 font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    MATCH CONFIRMED · 100% UNSTOPPABLE DUO
                  </div>
                  <p className="text-white/80 text-sm font-light">
                    Biometric analysis confirms infinite vibe alignment. No other combination comes close.
                  </p>
                </motion.div>
              )}

              {!scanning && !scanDone && (
                <p className="text-white/60 font-light text-sm">
                  Tap the biometric scanner above to initiate a real-time compatibility calculation.
                </p>
              )}
            </motion.div>
          )}

          {/* TAB 4: DAILY FORTUNE */}
          {activeTab === "fortune" && (
            <motion.div
              key="fortune"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-2xl mx-auto space-y-8"
            >
              <div className="inline-flex items-center gap-2 font-mono text-xs text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 uppercase">
                <Compass className="w-4 h-4" />
                <span>ANSHI&apos;S DAILY PREDICTION 🥠</span>
              </div>

              <div className="min-h-[100px] flex items-center justify-center">
                <p className="text-2xl md:text-3xl font-bold font-outfit text-white leading-relaxed">
                  &ldquo;{fortunes[fortuneIndex % fortunes.length]}&rdquo;
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setFortuneIndex((prev) => prev + 1)}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold px-8 py-3.5 rounded-full hover:scale-105 transition flex items-center gap-2 font-outfit text-sm mx-auto shadow-xl"
                >
                  <RefreshCw className="w-4 h-4" />
                  Crack Another Cookie
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
