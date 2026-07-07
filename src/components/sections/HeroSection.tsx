"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowDown, Heart, Star, Crown } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById("personality");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-12 overflow-hidden select-none"
    >
      {/* Dramatic Heavenly Spotlight from top ceiling focusing on Anshi */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] md:w-[600px] h-[650px] bg-gradient-to-b from-pink-500/35 via-purple-500/15 to-transparent rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] md:w-[300px] h-[700px] bg-gradient-to-b from-amber-200/30 via-pink-400/10 to-transparent blur-[60px] pointer-events-none -z-10" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Left Typography Column */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-pink-500/30 shadow-lg"
          >
            <Crown className="w-4 h-4 text-amber-400 animate-bounce" />
            <span className="font-mono text-xs tracking-[0.3em] text-pink-300 uppercase font-bold">
              THE MAIN CHARACTER · DOB 15.05.2006
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight font-outfit text-white leading-[0.9]"
          >
            Anshi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-white/80 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            A cinematic celebration of effortless beauty, contagious laughter, and undeniable royalty. Because standard web pages could never do justice to your aura.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={scrollToNext}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 text-black font-bold px-8 py-4 rounded-full font-outfit text-sm uppercase tracking-wider hover:scale-105 transition shadow-[0_0_40px_rgba(244,114,182,0.4)] flex items-center gap-2"
            >
              <span>Explore Her Universe</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>

            <div className="glass-panel px-6 py-4 rounded-full text-xs font-mono tracking-widest text-pink-300 border border-white/10 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-300 fill-current" />
              <span>1 OF 1 LIMITED EDITION</span>
            </div>
          </motion.div>
        </div>

        {/* Right Photo Column: Blended into background with spotlight & petals in front! */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[550px] sm:min-h-[680px] md:min-h-[780px] w-full">
          {/* Subtle Ambient Radial Glow behind Anshi */}
          <div className="absolute w-[400px] md:w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-pink-500/25 via-purple-600/20 to-amber-400/20 blur-[100px] -z-10" />

          {/* Blended Photo Container (MUCH BIGGER! Spans up to 680px wide and 930px tall!) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 15}deg) rotateX(${-mousePosition.y * 15}deg)`,
            }}
            className="relative w-full max-w-[420px] sm:max-w-[540px] md:max-w-[620px] lg:max-w-[680px] aspect-[3/4.1] rounded-[56px] overflow-hidden transition-transform duration-300 ease-out z-10 shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
          >
            {/* The Attached Blue Sweater Photo (photo-main-anshi.png) */}
            <Image
              src="/photos/photo-main-anshi.png"
              alt="Anshi - The Main Character"
              fill
              priority
              sizes="(max-width: 768px) 420px, 680px"
              className="object-cover object-top scale-105 hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Seamless Blending Overlays: Fades edges and bottom directly into dark charcoal BG! */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-[#0a0a0e]/30 to-transparent opacity-90 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0e]/60 via-transparent to-[#0a0a0e]/60 opacity-80 pointer-events-none" />
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(10,10,14,0.9)] pointer-events-none rounded-[48px]" />

            {/* Spotlight Glare Effect on her face */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-pink-300/20 opacity-60 pointer-events-none" />

            {/* Floating Royal Caption blended at bottom of photo */}
            <div className="absolute bottom-6 left-0 right-0 text-center z-20 pointer-events-none">
              <span className="font-serif italic text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                Effortless Royalty
              </span>
              <div className="flex items-center justify-center gap-1.5 text-pink-300 font-mono text-[10px] tracking-widest uppercase mt-1">
                <Heart className="w-3 h-3 fill-current text-pink-400" />
                <span>SHONA • THE ONE & ONLY</span>
                <Heart className="w-3 h-3 fill-current text-pink-400" />
              </div>
            </div>
          </motion.div>

          {/* FOREGROUND PETALS OVERLAY: Petals falling directly IN FRONT OF and OVER her photo! */}
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  y: -50,
                  x: (Math.random() - 0.5) * 400,
                  rotate: Math.random() * 360,
                  opacity: 0.8,
                }}
                animate={{
                  y: [0, 600],
                  x: [(Math.random() - 0.5) * 300, (Math.random() - 0.5) * 400],
                  rotate: [0, 360],
                  opacity: [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration: 6 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
                className="absolute top-0 left-1/2 w-4 h-6 bg-gradient-to-br from-pink-400/80 to-rose-300/60 rounded-full blur-[0.5px] shadow-[0_0_12px_rgba(244,114,182,0.8)]"
                style={{
                  borderRadius: "70% 0% 70% 0%",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
