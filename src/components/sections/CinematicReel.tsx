"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Sparkles, Film, Heart, Crown, Maximize2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function CinematicReel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#f472b6", "#fbbf24", "#e11d48", "#ffffff"],
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative z-10 select-none">
      <div className="glass-card p-8 md:p-14 rounded-[40px] border-2 border-rose-300 shadow-[0_20px_80px_rgba(225,29,72,0.15)] relative overflow-hidden bg-white/85 text-center space-y-10">
        
        {/* Top Decorative Banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400" />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 glass-panel px-5 py-2 rounded-full border border-rose-300 shadow-sm"
        >
          <Film className="w-4 h-4 text-rose-600 animate-pulse" />
          <span className="font-mono text-xs tracking-[0.3em] text-rose-600 uppercase font-bold">
            CINEMATIC AURA ARCHIVE · ROYAL REEL 👑🎬
          </span>
        </motion.div>

        {/* Heading & Attractive Line */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-outfit text-[#2d0a14]"
          >
            Witness The <span className="text-gradient-aura">Main Character</span> in Motion 🎥✨
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-[#64283c] font-serif italic max-w-2xl mx-auto leading-relaxed"
          >
            &ldquo;Because still photographs could never contain the radiant energy, effortless elegance, and pure majesty of Queen Anshi!&rdquo; 🌸💖💫
          </motion.p>
        </div>

        {/* Mobile Phone Screen Frame Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-[340px] sm:max-w-[380px] md:max-w-[420px] aspect-[9/16] mx-auto rounded-[48px] sm:rounded-[56px] overflow-hidden border-[10px] sm:border-[14px] border-[#2d0a14] shadow-[0_30px_90px_rgba(225,29,72,0.35)] group bg-black flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          {/* Top Smartphone Notch / Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#2d0a14] rounded-full z-30 flex items-center justify-center pointer-events-none shadow-md">
            <div className="w-3 h-3 rounded-full bg-black/80 mr-2" />
            <div className="w-10 h-1.5 rounded-full bg-black/60" />
          </div>

          {/* Ambient Blurred Background Video (Prevents black bars while ensuring 100% of video is visible) */}
          <video
            src="/anshi.mp4"
            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-60 scale-110 pointer-events-none"
            loop
            playsInline
          />

          {/* Main Foreground Video (object-contain guarantees her head is NEVER cut off!) */}
          <video
            ref={videoRef}
            src="/anshi.mp4"
            className="w-full h-full object-contain relative z-10"
            loop
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Overlay Glow when Paused */}
          {!isPlaying && (
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#2d0a14]/80 via-black/40 to-transparent flex flex-col items-center justify-center transition-opacity duration-300 p-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white flex items-center justify-center shadow-[0_0_50px_rgba(244,114,182,0.8)] border-4 border-white/80"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
              </motion.div>
              <span className="font-outfit font-extrabold text-white tracking-widest text-xs sm:text-sm uppercase mt-6 drop-shadow-md text-center">
                TAP TO PLAY ROYAL AURA REEL 🎬✨
              </span>
            </div>
          )}

          {/* Custom Hover Control Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-white z-30">
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="p-2.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase">
                {isPlaying ? "PLAYING 🌟" : "PAUSED ⏸️"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={handleFullscreen}
                className="p-2.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Big Interactive Call to Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="px-10 py-5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 text-white font-outfit font-extrabold text-sm md:text-base tracking-widest uppercase shadow-xl shadow-rose-500/30 flex items-center gap-3 border-2 border-white/40"
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>PAUSE AURA REEL ⏸️✨</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>WATCH QUEEN ANSHI IN MOTION ▶️👑</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Bottom Tag */}
        <div className="pt-4 flex items-center justify-center gap-2 font-mono text-xs text-[#64283c]/70 font-bold">
          <Heart className="w-4 h-4 text-rose-500 fill-current animate-bounce" />
          <span>EXCLUSIVE ARCHIVE · STREAMING AT 10,000 AURA/SEC ⚡💖</span>
        </div>

      </div>
    </section>
  );
}
