"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Heart, Sparkles, X, Film, Maximize2, Gift } from "lucide-react";
import confetti from "canvas-confetti";

export default function RomanticVideoSlide() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesize a romantic harp/chime sweep when opening
  const playRomanticChime = () => {
    try {
      if (!audioCtxRef.current && typeof window !== "undefined") {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.6);
      });
    } catch (e) {}
  };

  const handleOpen = () => {
    // Pause any other videos currently playing on the page (e.g. CinematicReel) so audio tracks don't collide or echo!
    if (typeof document !== "undefined") {
      document.querySelectorAll("video").forEach((vid) => {
        try {
          vid.pause();
        } catch (e) {}
      });
    }

    playRomanticChime();
    confetti({
      particleCount: 180,
      spread: 140,
      origin: { y: 0.6 },
      colors: ["#f472b6", "#fbbf24", "#e11d48", "#ffffff", "#ff80bf"],
    });
    setIsOpen(true);

    // Attempt automatic full screen once opened after brief render delay
    setTimeout(() => {
      if (videoRef.current && videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen().catch(() => {
          // Ignore if browser blocks auto-fullscreen without direct video click
        });
      }
    }, 250);
  };

  const handleClose = () => {
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (e) {}
    }
    if (typeof document !== "undefined" && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setIsOpen(false);
  };

  return (
    <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto relative z-10 select-none text-center">
      {/* Romantic Slide Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="glass-card p-8 sm:p-14 rounded-[44px] border-2 border-rose-400/80 shadow-[0_25px_90px_rgba(244,114,182,0.25)] relative overflow-hidden bg-gradient-to-br from-white/95 via-rose-50/90 to-pink-100/90 group"
      >
        {/* Glowing Top & Bottom Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 opacity-60" />

        {/* Floating Decorative Hearts inside card */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-rose-300/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Notification Badge */}
        <div className="inline-flex items-center gap-2.5 glass-panel px-6 py-2 rounded-full border border-rose-300 shadow-sm mb-6 animate-bounce">
          <Gift className="w-4 h-4 text-rose-600 fill-current" />
          <span className="font-mono text-xs tracking-[0.25em] text-rose-600 uppercase font-extrabold">
            NEW DISPATCH ARRIVED · SPECIAL PREMIERE 💌🎬
          </span>
        </div>

        {/* Title & Attractive Line */}
        <div className="space-y-4 max-w-3xl mx-auto mb-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-outfit text-[#2d0a14] leading-tight">
            New Video Arrived — <span className="text-gradient-aura">Queen Anshi</span> 🌸👑✨
          </h2>
          <p className="text-lg sm:text-xl text-[#64283c] font-serif italic max-w-2xl mx-auto leading-relaxed font-light">
            &ldquo;An exclusive romantic surprise has just unlocked! Tap the royal seal below to unseal the magic and watch Queen Anshi in full cinematic glory!&rdquo; 💕🌹✨
          </p>
        </div>

        {/* Romantic Slide Interactive Trigger Box */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpen}
          className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-500/10 via-pink-500/15 to-amber-500/10 border-2 border-rose-300/80 shadow-lg hover:shadow-2xl hover:border-rose-500 transition-all cursor-pointer group/slide relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 opacity-0 group-hover/slide:opacity-10 transition-opacity duration-500" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Pulsing Play Icon */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 via-pink-600 to-amber-400 text-white flex items-center justify-center shadow-[0_0_40px_rgba(244,114,182,0.8)] border-4 border-white group-hover/slide:scale-110 transition-transform">
              <Play className="w-9 h-9 fill-current ml-1" />
            </div>

            <div className="text-center sm:text-left space-y-1">
              <div className="font-outfit font-black text-xl sm:text-2xl text-[#2d0a14] group-hover/slide:text-rose-600 transition-colors">
                TAP TO OPEN IN FULL SCREEN 🎬✨
              </div>
              <div className="font-mono text-xs font-bold text-[#64283c]/80 tracking-widest uppercase flex items-center justify-center sm:justify-start gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                <span>UNSEAL ROMANTIC SURPRISE 💌💖</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Micro Footer */}
        <div className="mt-8 font-mono text-[11px] text-[#64283c]/60 font-bold tracking-wider">
          EXCLUSIVE HIGH-DEFINITION CUT · PROJECT AURA ARCHIVES 💎🔒
        </div>
      </motion.div>

      {/* Full Screen Romantic Video Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden select-none"
          >
            {/* Top Bar inside Modal */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl flex items-center justify-between mb-4 z-20 text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase bg-white/10 px-6 py-3 rounded-full backdrop-blur-md border border-white/20"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>PLAYING IN FULL SCREEN · QUEEN ANSHI 👑🎬</span>
              </div>
              <button
                onClick={handleClose}
                className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-4 py-1.5 rounded-full transition font-bold"
              >
                <X className="w-4 h-4" />
                <span>CLOSE ✖</span>
              </button>
            </div>

            {/* Full Screen Video Wrapper with object-contain & blurred background */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[78vh] sm:h-[82vh] rounded-3xl overflow-hidden border-4 border-white/30 shadow-[0_0_100px_rgba(244,114,182,0.4)] bg-black flex items-center justify-center group"
            >
              {/* Ambient Blurred Background Video for zero black bars */}
              <video
                src="/anshi-video-2.mp4"
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-50 scale-110 pointer-events-none"
                loop
                playsInline
                autoPlay
                muted={true}
              />

              {/* Main Foreground Video with object-contain to ensure ZERO cropping! */}
              <video
                ref={videoRef}
                src="/anshi-video-2.mp4"
                className="w-full h-full object-contain relative z-10 cursor-pointer"
                loop
                playsInline
                autoPlay
                controls
              />
            </motion.div>

            {/* Bottom Reminder */}
            <div className="mt-4 text-white/70 font-mono text-xs tracking-widest uppercase">
              TIP: CLICK THE VIDEO CONTROLS OR FULLSCREEN ICON TO EXPAND EVEN FURTHER 📺💖
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
