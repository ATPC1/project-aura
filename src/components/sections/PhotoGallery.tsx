"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Maximize2, Camera, Heart, RotateCcw, RotateCw, X, Crown, Star, Pause, Play } from "lucide-react";
import Image from "next/image";

interface PhotoItem {
  id: string;
  src: string;
  title: string;
  tag: string;
  num: string;
  date: string;
  admiration: string;
  quote: string;
}

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);

  const photos: PhotoItem[] = [
    {
      id: "photo-1",
      src: "/photos/photo-1.jpg",
      title: "Every Frame, A Painting",
      tag: "CLASSIC",
      num: "№01",
      date: "THE YELLOW TOP ERA",
      admiration: "She doesn't just catch the light; she commands it. Notice the effortless poise and natural confidence that turns a simple moment into an iconic masterpiece.",
      quote: "Elegance is not about being noticed, it is about being remembered.",
    },
    {
      id: "photo-2",
      src: "/photos/photo-2.png",
      title: "Royalty. Confirmed.",
      tag: "ROYALTY",
      num: "№02",
      date: "FESTIVE SEASONS",
      admiration: "When she walks down a hallway in a traditional saree, the entire atmosphere shifts to match her majesty. A rare combination of grace and undeniable royalty.",
      quote: "True royalty is carried in the soul and reflected in every step.",
    },
    {
      id: "photo-3",
      src: "/photos/photo-3.jpg",
      title: "Blooming Louder Than Flowers",
      tag: "SERENE",
      num: "№03",
      date: "SUNNY AFTERNOONS",
      admiration: "Resting by the water in vibrant red. Even the surrounding bougainvillea blossoms seem to be leaning in to admire her warmth and serene beauty.",
      quote: "Some people bring sunshine to the world simply by existing.",
    },
    {
      id: "photo-4",
      src: "/photos/photo-4.jpg",
      title: "Bougainvillea Dreams",
      tag: "NATURAL",
      num: "№04",
      date: "SPRING VIBES",
      admiration: "Standing tall amidst nature's brightest colors. A candid snapshot that proves her natural aura is the main character in every landscape.",
      quote: "Wherever she stands, that spot becomes the center of the universe.",
    },
    {
      id: "photo-5",
      src: "/photos/photo-5.jpg",
      title: "Lost In Thought, Found By Everyone",
      tag: "CHARMING",
      num: "№05",
      date: "BLUE SWEATER DAYS",
      admiration: "Resting her chin with a gentle, knowing smile. A quiet moment of pure charm that captivates effortlessly without ever trying.",
      quote: "The most powerful charm is the kind that feels entirely effortless.",
    },
    {
      id: "photo-6",
      src: "/photos/photo-6.png",
      title: "Golden Hour Is Just Her Time Zone",
      tag: "ICONIC",
      num: "№06",
      date: "TIMELESS ELEGANCE",
      admiration: "Whether looking directly at the camera or away, the spotlight naturally follows her. Her presence is mathematically and aesthetically undefeated.",
      quote: "Golden hour was invented simply to give the sun a chance to compete with her.",
    },
  ];

  // Continuous cylindrical auto-spin
  useEffect(() => {
    if (!isAutoSpinning || isDragging || selectedPhoto) return;
    const interval = setInterval(() => {
      setRotation((prev) => prev - 0.35);
    }, 20);
    return () => clearInterval(interval);
  }, [isAutoSpinning, isDragging, selectedPhoto]);

  // Drag to spin handlers
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    dragStartRotation.current = rotation;
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX.current;
    setRotation(dragStartRotation.current + deltaX * 0.4);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handlePrev = () => {
    setIsAutoSpinning(false);
    setRotation((prev) => prev + 60);
  };

  const handleNext = () => {
    setIsAutoSpinning(false);
    setRotation((prev) => prev - 60);
  };

  const total = photos.length;
  const radius = 350; // Horizontal cylindrical radius

  return (
    <section id="gallery" className="py-24 px-4 md:px-12 max-w-7xl mx-auto relative z-10 overflow-hidden select-none">
      {/* Section Title & Subtitle matching the reference image */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 glass-panel px-4 py-1.5 rounded-full border border-pink-500/30">
          <Crown className="w-4 h-4 text-amber-400" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-pink-300 uppercase font-bold">
            SECTION 04 · 3D CYLINDRICAL BOUQUET
          </span>
        </div>
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight font-outfit text-white">
          Anshi
        </h2>
        <p className="text-pink-300/90 text-lg md:text-xl font-medium italic max-w-xl mx-auto leading-relaxed">
          A 3D bouquet of every one-of-one moment. <span className="underline decoration-pink-500 underline-offset-4">Drag it.</span>
          <br />
          <span className="text-white/80">Spin it. Fall in.</span>
        </p>
      </div>

      {/* 3D Cylindrical Carousel Stage */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className="relative h-[480px] sm:h-[540px] md:h-[600px] w-full flex items-center justify-center perspective-[1400px] cursor-grab active:cursor-grabbing my-4"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {photos.map((photo, index) => {
            // Cylindrical Angle in Degrees and Radians
            const angleDeg = (index / total) * 360 + rotation;
            const angleRad = (angleDeg * Math.PI) / 180;

            // 3D Cylinder Coordinates
            const x = Math.sin(angleRad) * radius;
            const z = Math.cos(angleRad) * radius; // Front > 0, Back < 0

            // Cylindrical Tilt around Y-axis (Math.sin ensures smooth inward curve without mirroring!)
            const rotateY = Math.sin(angleRad) * -38; // Tilts up to ±38 degrees inward

            // Depth calculation for scale, opacity, and zIndex
            const normalizedDepth = (z + radius) / (2 * radius); // 0 (back) to 1 (front)
            const scale = 0.68 + normalizedDepth * 0.42; // 0.68 to 1.10
            const opacity = 0.4 + normalizedDepth * 0.6; // 0.40 to 1.00
            const zIndex = Math.round(z + 1000);

            return (
              <motion.div
                key={photo.id}
                onClick={() => !isDragging && setSelectedPhoto(photo)}
                style={{
                  transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                className="absolute w-[260px] sm:w-[290px] md:w-[330px] aspect-[3/4.2] rounded-[32px] glass-card p-3 cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform duration-200 ease-out border border-white/20 hover:border-pink-500/80"
              >
                {/* Inner Image Card */}
                <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#121216]">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="330px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

                  {/* Top Badges matching image (Green/Blue rounded pill tags) */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest px-3.5 py-1.5 rounded-full bg-emerald-500/80 backdrop-blur-md text-white font-bold shadow-lg">
                      {photo.tag}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest px-3 py-1.5 rounded-full bg-cyan-500/80 backdrop-blur-md text-white font-bold shadow-lg">
                      {photo.num}
                    </span>
                  </div>

                  {/* Bottom Serif Title matching image */}
                  <div className="absolute bottom-6 left-5 right-5 text-left">
                    <h3 className="text-xl md:text-2xl font-serif font-bold italic text-white tracking-wide drop-shadow-md">
                      {photo.title}
                    </h3>
                  </div>
                </div>

                {/* Ambient Pink Glow Behind Card */}
                <div className="absolute -inset-3 bg-gradient-to-r from-pink-500/30 via-purple-500/20 to-amber-400/20 rounded-[36px] blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Control Buttons matching reference image */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <button
          onClick={() => setIsAutoSpinning(!isAutoSpinning)}
          className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs tracking-widest transition flex items-center gap-2.5 shadow-lg backdrop-blur-md"
        >
          {isAutoSpinning ? <Pause className="w-3.5 h-3.5 text-pink-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          <span>{isAutoSpinning ? "PAUSE" : "PLAY"}</span>
        </button>

        <button
          onClick={handlePrev}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition shadow-lg backdrop-blur-md"
        >
          <RotateCcw className="w-4 h-4 text-pink-300" />
        </button>

        <button
          onClick={handleNext}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition shadow-lg backdrop-blur-md"
        >
          <RotateCw className="w-4 h-4 text-pink-300" />
        </button>

        <div className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-pink-500/40 border border-pink-500/50 text-white font-mono text-xs tracking-[0.25em] font-bold shadow-xl backdrop-blur-md">
          DRAG TO SPIN
        </div>
      </div>

      {/* Sub-navigation link */}
      <div className="text-center font-mono text-[11px] text-white/50 tracking-[0.3em] uppercase mt-6">
        SCROLL — PLAY THE PETAL GAME
      </div>

      {/* Fullscreen Admiration Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 select-none overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full max-h-[90vh] glass-panel rounded-3xl overflow-hidden border border-pink-500/40 shadow-[0_0_100px_rgba(244,114,182,0.25)] grid grid-cols-1 md:grid-cols-12 bg-charcoal my-auto"
            >
              {/* Modal Image Column */}
              <div className="md:col-span-7 relative min-h-[420px] md:min-h-[620px] bg-black flex items-center justify-center">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Modal Admiration Details Column */}
              <div className="md:col-span-5 p-8 md:p-10 flex flex-col justify-between space-y-6 text-left">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs tracking-widest text-white font-bold px-3.5 py-1.5 rounded-full bg-emerald-500/80 flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5 text-amber-300" />
                      {selectedPhoto.tag}
                    </span>
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="font-mono text-xs text-amber-300 tracking-widest mb-2 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {selectedPhoto.date} • {selectedPhoto.num}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold italic text-white leading-tight">
                    {selectedPhoto.title}
                  </h3>

                  <div className="my-6 h-px w-full bg-white/10" />

                  {/* Deep Admiration Text */}
                  <div className="space-y-4">
                    <div className="font-mono text-[10px] tracking-widest text-pink-300 uppercase font-bold">
                      ✨ AURA ANALYSIS & ADMIRATION:
                    </div>
                    <p className="text-white/90 font-light leading-relaxed text-base md:text-lg">
                      {selectedPhoto.admiration}
                    </p>
                    <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-amber-200/90 italic font-outfit text-sm">
                      &ldquo;{selectedPhoto.quote}&rdquo;
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-pink-400 font-mono text-xs">
                    <Heart className="w-4 h-4 fill-current" />
                    <span>ROYALTY VERIFIED 1 OF 1</span>
                  </div>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-6 py-2.5 rounded-full text-xs font-outfit uppercase hover:scale-105 transition shadow-lg shadow-pink-500/20"
                  >
                    CLOSE ARCHIVE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
