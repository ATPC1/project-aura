"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  emoji?: string;
  color: string;
}

export default function PageSurfer() {
  const [surferPos, setSurferPos] = useState({ x: 200, y: 200, angle: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailPoints = useRef<TrailPoint[]>([]);
  const lastScrollY = useRef(0);
  const lastSpawnY = useRef(0);

  useEffect(() => {
    // Check mobile phone screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Set canvas dimensions to document total height for permanent page marks!
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
          window.innerHeight * 4
        );
      }
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Scroll Handler - Calculate surfing motion & leave marks!
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;

      // Calculate horizontal weaving surfing motion!
      const padding = window.innerWidth < 640 ? 40 : 80;
      const amplitude = Math.max(50, (window.innerWidth - padding * 2) / 2);
      const centerX = window.innerWidth / 2;

      // Sine wave weaving back and forth
      const waveFreq = 0.005;
      const x = centerX + Math.sin(scrollY * waveFreq) * amplitude - 30;

      // Tilt angle based on surfing direction
      const dx = Math.cos(scrollY * waveFreq);
      const angle = dx * 28; // tilt left or right like riding a wave!

      // Surfer vertical viewport position
      const viewportY = window.innerHeight * 0.28;
      const pageY = scrollY + viewportY;

      setSurferPos({ x, y: viewportY, angle });

      // Leave glowing trail mark on the page!
      if (Math.abs(scrollY - lastScrollY.current) > 3) {
        trailPoints.current.push({
          x: x + 30,
          y: pageY + 20,
          color: Math.sin(scrollY * 0.01) > 0 ? "#f472b6" : "#fbbf24",
        });

        if (trailPoints.current.length > 120) {
          trailPoints.current.shift();
        }

        // Spawn cute emoji stamps periodically along the trail
        if (Math.abs(scrollY - lastSpawnY.current) > 120) {
          const emojis = ["✨", "🌸", "💖", "⭐", "💫", "💕"];
          const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
          trailPoints.current[trailPoints.current.length - 1].emoji = randomEmoji;
          lastSpawnY.current = scrollY;
        }

        lastScrollY.current = scrollY;
        drawTrail();
      }
    };

    const drawTrail = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (trailPoints.current.length < 2) return;

      // Draw Glowing Neon Wave Ribbon
      ctx.save();
      ctx.lineWidth = window.innerWidth < 640 ? 4 : 6;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < trailPoints.current.length; i++) {
        const pt1 = trailPoints.current[i - 1];
        const pt2 = trailPoints.current[i];

        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.strokeStyle = pt2.color;
        ctx.shadowColor = pt2.color;
        ctx.shadowBlur = 15;
        ctx.stroke();
      }
      ctx.restore();

      // Draw left-behind Emoji Stamps on the page!
      ctx.textAlign = "center";
      ctx.font = window.innerWidth < 640 ? "18px Arial" : "24px Arial";
      trailPoints.current.forEach((pt) => {
        if (pt.emoji) {
          ctx.save();
          ctx.shadowColor = "#f472b6";
          ctx.shadowBlur = 10;
          ctx.fillText(pt.emoji, pt.x, pt.y);
          ctx.restore();
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <>
      {/* Absolute Full-Page Canvas for Permanent Trail Marks left behind! */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full pointer-events-none z-20"
        style={{ height: "100%" }}
      />

      {/* Fixed Viewport Cartoon Surfer Character! */}
      <motion.div
        animate={{
          x: surferPos.x,
          y: surferPos.y,
          rotate: surferPos.angle,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 180,
          mass: 0.5,
        }}
        className="fixed top-0 left-0 z-40 pointer-events-none select-none flex flex-col items-center"
      >
        {/* Glowing Surfer Speech Bubble / Label */}
        <div className="mb-1 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-pink-500/50 shadow-[0_0_15px_rgba(244,114,182,0.4)] text-[10px] sm:text-xs font-mono font-bold text-pink-300 whitespace-nowrap animate-pulse">
          {isMobile ? "SURFING 📱✨" : "SURFING YOUR AURA 🌊✨"}
        </div>

        {/* Cute Cartoon Surfer Badge */}
        <div className="relative group">
          {/* Glowing Aura Ring */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 rounded-full blur-md opacity-75 animate-spin-slow" />
          
          {/* Surfer Cartoon Character Box */}
          <div className="relative bg-[#121218]/90 border-2 border-pink-400 rounded-full p-2 sm:p-3 shadow-2xl flex items-center justify-center text-2xl sm:text-4xl">
            <span role="img" aria-label="Surfer Cartoon">
              🏄🏻‍♀️✨
            </span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
