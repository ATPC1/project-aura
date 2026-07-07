"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Trophy, Sparkles, RefreshCw, Crown, Heart, ShieldCheck, ArrowUp, X, Play } from "lucide-react";
import confetti from "canvas-confetti";

interface Zombie {
  id: number;
  x: number;
  y: number;
  emoji: string;
  label: string;
  health: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
}

export default function AuraDefenderGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [zombiesLeft, setZombiesLeft] = useState(4);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 400, y: 240 });
  const isFiringRef = useRef(false);
  const isPlayingRef = useRef(false);

  const zombies = useRef<Zombie[]>([]);
  const particles = useRef<Particle[]>([]);

  const initGame = () => {
    setIsWon(false);
    setIsPlaying(true);
    isPlayingRef.current = true;
    setZombiesLeft(4);
    particles.current = [];

    // Place 4 Stationary Flower Zombies across the arena
    zombies.current = [
      { id: 1, x: 480, y: 130, emoji: "🧟‍♂️🌸", label: "FLOWER ZOMBIE 1", health: 100 },
      { id: 2, x: 680, y: 110, emoji: "👾🌺", label: "FLOWER ZOMBIE 2", health: 100 },
      { id: 3, x: 560, y: 290, emoji: "🥀🧟‍♀️", label: "FLOWER ZOMBIE 3", health: 100 },
      { id: 4, x: 720, y: 360, emoji: "👹🌼", label: "FLOWER ZOMBIE 4", health: 100 },
    ];
  };

  const closeGame = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setIsWon(false);
  };

  const triggerWin = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setIsWon(true);
    confetti({
      particleCount: 300,
      spread: 160,
      origin: { y: 0.5 },
      colors: ["#f472b6", "#fbbf24", "#c084fc", "#ffffff", "#e11d48"],
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 800;
    const y = ((e.clientY - rect.top) / rect.height) * 480;
    mousePos.current = { x, y };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || e.touches.length === 0) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 800;
    const y = ((touch.clientY - rect.top) / rect.height) * 480;
    mousePos.current = { x, y };
  };

  const handleMouseDown = () => {
    if (!isPlayingRef.current) return;
    isFiringRef.current = true;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isPlayingRef.current) return;
    isFiringRef.current = true;
    handleTouchMove(e);
  };

  const handleMouseUp = () => {
    isFiringRef.current = false;
  };

  const handleTouchEnd = () => {
    isFiringRef.current = false;
  };

  const scrollToTopAndLove = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.8 },
      colors: ["#f472b6", "#e11d48"],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 60 FPS Game Loop
  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear Arena
      ctx.clearRect(0, 0, 800, 480);

      if (isPlayingRef.current) {
        // Girl Avatar position (standing in bottom-left corner)
        const girlX = 90;
        const girlY = 380;
        const gunX = 120;
        const gunY = 365;

        // 1. Draw Continuous Laser Line if firing!
        if (isFiringRef.current) {
          const targetX = mousePos.current.x;
          const targetY = mousePos.current.y;

          const angle = Math.atan2(targetY - gunY, targetX - gunX);
          const maxDist = 1000;
          const endX = gunX + Math.cos(angle) * maxDist;
          const endY = gunY + Math.sin(angle) * maxDist;

          // Draw Glowing Laser Line
          ctx.save();
          ctx.strokeStyle = "#f472b6";
          ctx.lineWidth = 8;
          ctx.shadowColor = "#f472b6";
          ctx.shadowBlur = 25;
          ctx.beginPath();
          ctx.moveTo(gunX, gunY);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          // Inner white beam
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(gunX, gunY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          ctx.restore();

          // 2. Check line intersection with 4 Stationary Flower Zombies
          zombies.current.forEach((zombie, idx) => {
            const A = targetY - gunY;
            const B = gunX - targetX;
            const C = targetX * gunY - gunX * targetY;
            const dist = Math.abs(A * zombie.x + B * zombie.y + C) / Math.hypot(A, B);

            const dot = (zombie.x - gunX) * (targetX - gunX) + (zombie.y - gunY) * (targetY - gunY);

            if (dist < 40 && dot > 0) {
              zombie.health -= 5;

              for (let p = 0; p < 4; p++) {
                particles.current.push({
                  x: zombie.x + (Math.random() - 0.5) * 20,
                  y: zombie.y + (Math.random() - 0.5) * 20,
                  vx: (Math.random() - 0.5) * 8,
                  vy: (Math.random() - 0.5) * 8,
                  color: p % 2 === 0 ? "#f472b6" : "#fbbf24",
                  alpha: 1,
                });
              }

              if (zombie.health <= 0) {
                for (let p = 0; p < 30; p++) {
                  particles.current.push({
                    x: zombie.x,
                    y: zombie.y,
                    vx: (Math.random() - 0.5) * 12,
                    vy: (Math.random() - 0.5) * 12,
                    color: "#f472b6",
                    alpha: 1,
                  });
                }
                zombies.current.splice(idx, 1);
                setZombiesLeft(zombies.current.length);

                if (zombies.current.length === 0) {
                  triggerWin();
                }
              }
            }
          });
        }

        // 3. Draw 4 Stationary Flower Zombies (BRIGHT & HIGHLIGHTED!)
        ctx.textAlign = "center";
        zombies.current.forEach((zombie) => {
          ctx.save();
          // Bright Glowing Aura Ring around Zombie
          ctx.shadowColor = "#fbbf24";
          ctx.shadowBlur = 20;
          ctx.fillStyle = "rgba(251, 191, 36, 0.25)";
          ctx.beginPath();
          ctx.arc(zombie.x, zombie.y - 10, 44, 0, Math.PI * 2);
          ctx.fill();

          // Inner Red/Pink Target Pulse
          ctx.fillStyle = "rgba(244, 114, 182, 0.35)";
          ctx.beginPath();
          ctx.arc(zombie.x, zombie.y - 10, 32, 0, Math.PI * 2);
          ctx.fill();

          // Bright Emoji
          ctx.font = "48px Arial";
          ctx.fillText(zombie.emoji, zombie.x, zombie.y);
          ctx.restore();

          // Health Bar
          ctx.fillStyle = "rgba(255,255,255,0.3)";
          ctx.fillRect(zombie.x - 30, zombie.y + 18, 60, 8);
          ctx.fillStyle = "#10b981";
          ctx.fillRect(zombie.x - 30, zombie.y + 18, (zombie.health / 100) * 60, 8);

          // Highlighted Bright Label
          ctx.font = "bold 12px monospace";
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#000000";
          ctx.shadowBlur = 4;
          ctx.fillText(zombie.label, zombie.x, zombie.y + 38);
        });

        // 4. Update & Draw Particles
        particles.current.forEach((p, pIdx) => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.03;
          if (p.alpha <= 0) {
            particles.current.splice(pIdx, 1);
          } else {
            ctx.save();
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });

        // 5. Draw Girl Avatar standing in corner (SUPER BRIGHT & HIGHLIGHTED!)
        ctx.save();
        // Bright Glowing Royal Pedestal Circle
        ctx.shadowColor = "#f472b6";
        ctx.shadowBlur = 30;
        ctx.fillStyle = "rgba(244, 114, 182, 0.4)";
        ctx.beginPath();
        ctx.arc(girlX, girlY - 10, 52, 0, Math.PI * 2);
        ctx.fill();

        // Inner Golden Halo
        ctx.fillStyle = "rgba(251, 191, 36, 0.35)";
        ctx.beginPath();
        ctx.arc(girlX, girlY - 10, 38, 0, Math.PI * 2);
        ctx.fill();

        // Bright Girl Avatar Emoji & Gun
        ctx.font = "54px Arial";
        ctx.fillText("👧🏻✨", girlX, girlY);
        ctx.font = "32px Arial";
        ctx.fillText("🔫", gunX, gunY);
        ctx.restore();

        // Highlighted Avatar Title
        ctx.font = "bold 13px monospace";
        ctx.fillStyle = "#fef08a";
        ctx.shadowColor = "#f472b6";
        ctx.shadowBlur = 8;
        ctx.fillText("QUEEN SHONA 💕", girlX, girlY + 36);
      } else {
        // Idle Screen on Canvas
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        ctx.font = "18px monospace";
        ctx.textAlign = "center";
        ctx.fillText("PRESS [START FLOWER GAME] TO HELP SHONA ZAP ZOMBIES", 400, 240);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section id="game" className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative z-10 select-none">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-rose-300 shadow-sm">
          <Gamepad2 className="w-4 h-4 text-rose-600" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-rose-600 uppercase font-bold">
            SECTION 06 · THE FLOWER ZOMBIE GAME 🎮🌸
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-outfit text-[#2d0a14]">
          Shona&apos;s <span className="text-gradient-aura">Laser Defense</span> 🔫👾
        </h2>
        <p className="text-[#64283c] text-base md:text-lg font-light">
          Help our girl avatar standing in the corner! 👧🏻✨ Point your mouse at the 4 stationary flower zombies 🧟‍♂️🌸 and Click & Hold to fire a continuous laser line! 🔥 Destroy all 4 to unlock her special romantic message! 💌💕
        </p>
      </div>

      {/* Game Stage Container */}
      <div className="glass-card rounded-3xl p-6 border border-rose-300 shadow-xl relative overflow-hidden bg-white/95">
        {/* Top Game Bar */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-rose-200 font-mono text-xs">
          <div className="flex items-center gap-4">
            <span className="text-[#64283c]/80 font-bold">AVATAR: <strong className="text-rose-600">QUEEN SHONA 💕👑</strong></span>
            <span className="text-emerald-600 flex items-center gap-1 font-bold">
              <ShieldCheck className="w-4 h-4" />
              WEAPON: CONTINUOUS LOVE LASER 🔫💖
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-amber-600 font-extrabold">FLOWER ZOMBIES LEFT: {zombiesLeft} / 4 👾</span>
          </div>
        </div>

        {/* HTML5 Canvas Arena (Much taller & spacious on mobile so button never cuts off!) */}
        <div className="relative w-full aspect-[4/4.5] sm:aspect-[5/3] min-h-[420px] sm:min-h-[480px] max-h-[580px] rounded-3xl overflow-hidden bg-[#2d0a14] border border-rose-400 shadow-inner flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={800}
            height={480}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="w-full h-full cursor-crosshair touch-none"
          />

          {/* Overlay Start Button when not playing */}
          {!isPlaying && !isWon && (
            <div className="absolute inset-0 bg-[#fff5f7]/95 backdrop-blur-md flex flex-col items-center justify-center gap-4 sm:gap-6 p-4 sm:p-6 text-center overflow-y-auto z-20">
              <div className="p-3 sm:p-4 rounded-full bg-rose-100 border border-rose-300 text-rose-600 shrink-0 shadow-md">
                <Crown className="w-8 h-8 sm:w-12 sm:h-12 animate-bounce" />
              </div>
              <div className="space-y-1 sm:space-y-2 max-w-md">
                <h3 className="text-2xl sm:text-3xl font-black font-outfit text-[#2d0a14] tracking-tight">
                  Zap the 4 Flower Zombies! ⚡👾
                </h3>
                <p className="text-[#64283c] font-light text-xs sm:text-sm leading-relaxed">
                  Our girl avatar standing in the corner is ready! 👧🏻✨ Hold down your mouse or touch screen to fire a continuous laser line and eliminate the 4 static flower zombies! 💥🎯
                </p>
              </div>
              <button
                onClick={initGame}
                className="w-full sm:w-auto bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-extrabold px-8 py-4 sm:px-12 sm:py-5 rounded-full font-outfit text-base sm:text-lg uppercase tracking-wider hover:scale-105 active:scale-95 transition shadow-lg shadow-rose-500/30 shrink-0 mt-2 flex items-center justify-center gap-2 animate-pulse border border-white/50"
              >
                <span>Start Flower Game 🚀🌸</span>
              </button>
            </div>
          )}

          {/* Victory Celebration Popup with THREE OPTIONS! */}
          <AnimatePresence>
            {isWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 bg-[#fff5f7]/95 backdrop-blur-lg flex items-center justify-center p-6 text-center z-30 overflow-y-auto"
              >
                <div className="max-w-xl w-full glass-panel rounded-3xl p-6 md:p-8 border-2 border-rose-400 shadow-2xl space-y-6 bg-white/95 my-auto">
                  <div className="inline-flex p-3 rounded-full bg-rose-100 border border-rose-300 text-rose-600 shadow-sm">
                    <Trophy className="w-12 h-12 animate-bounce" />
                  </div>

                  <div>
                    <div className="font-mono text-xs tracking-[0.3em] text-emerald-600 font-bold mb-1 uppercase">
                      🎉 ALL 4 ZOMBIES ELIMINATED 💥✨
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black font-outfit text-[#2d0a14] tracking-tight">
                      YOU WIN! 🏆🥳
                    </h3>
                  </div>

                  <p className="text-[#64283c] font-light text-sm leading-relaxed border-y border-rose-200 py-3">
                    Queen Shona defended her peace! 👑✨ All 4 static flower zombies were eliminated by her Serotonin Laser! Choose an option below: 👇😊
                  </p>

                  {/* THREE DISTINCT POST-VICTORY OPTIONS! */}
                  <div className="space-y-3 pt-1">
                    {/* OPTION 1: BIG SPECIAL MESSAGE */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={scrollToTopAndLove}
                      className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-extrabold text-base sm:text-lg md:text-xl py-4 px-6 rounded-2xl shadow-lg shadow-rose-500/30 border border-rose-300 flex items-center justify-center gap-3 font-outfit tracking-wide animate-pulse"
                    >
                      <span>Lovee Uh Sooo much Shona💕❤️🥰</span>
                      <ArrowUp className="w-5 h-5 shrink-0" />
                    </motion.button>

                    {/* OPTION 2 & 3: PLAY AGAIN and CLOSE GAME */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        onClick={initGame}
                        className="bg-rose-100 hover:bg-rose-200 border border-rose-300 text-[#2d0a14] font-bold py-3 px-4 rounded-xl font-outfit text-sm flex items-center justify-center gap-2 transition shadow-md"
                      >
                        <RefreshCw className="w-4 h-4 text-emerald-600" />
                        <span>Play Again 🔄</span>
                      </button>

                      <button
                        onClick={closeGame}
                        className="bg-rose-100 hover:bg-rose-200 border border-rose-300 text-[#2d0a14] font-bold py-3 px-4 rounded-xl font-outfit text-sm flex items-center justify-center gap-2 transition shadow-md"
                      >
                        <X className="w-4 h-4 text-rose-600" />
                        <span>Close Game ❌</span>
                      </button>
                    </div>
                  </div>

                  <div className="font-mono text-[10px] text-[#64283c]/60 tracking-widest uppercase font-bold">
                    SELECTING SPECIAL MESSAGE RETURNS TO TOP HERO PAGE 🔝✨
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Instructions */}
        <div className="mt-4 flex flex-wrap items-center justify-between font-mono text-[11px] text-[#64283c]/70 pt-2 border-t border-rose-200 font-bold">
          <div className="flex items-center gap-4">
            <span>🖱️ POINT MOUSE & CLICK/HOLD TO FIRE CONTINUOUS LASER LINE 🔫🔥</span>
          </div>
          <span className="text-rose-600 font-extrabold">TARGET: ZAP ALL 4 FLOWER ZOMBIES FOR SHONA&apos;S LOVE MESSAGE 💌💕</span>
        </div>
      </div>
    </section>
  );
}
