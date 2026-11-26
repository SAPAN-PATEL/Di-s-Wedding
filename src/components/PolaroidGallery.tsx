/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Heart, Camera, Calendar, ArrowDown } from 'lucide-react';
import { polaroidsData } from '../data.ts';

export default function PolaroidGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const trackRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Update active card and progress based on scroll position within track
  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const r = trackRef.current.getBoundingClientRect();
    const total = r.height - window.innerHeight;

    if (total <= 0) return;

    // p goes from 0 to 1 across the pinned range
    const p = Math.min(0.999, Math.max(0, -r.top / total));
    setProgress(p);

    const N = polaroidsData.length;
    const i = Math.floor(p * N);

    setActiveIndex((prev) => (prev !== i ? i : prev));

    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${p})`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  // Smoothly scroll to the target card's position inside the pinned track
  const scrollToCard = (index: number) => {
    if (!trackRef.current) return;
    const clampedIndex = Math.max(0, Math.min(polaroidsData.length - 1, index));
    const r = trackRef.current.getBoundingClientRect();
    const trackTop = window.scrollY + r.top;
    const total = trackRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = trackTop + ((clampedIndex + 0.5) / polaroidsData.length) * total;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const handleNext = () => scrollToCard(activeIndex + 1);
  const handlePrev = () => scrollToCard(activeIndex - 1);

  const currentItem = polaroidsData[activeIndex];

  // Alternating card tilt angles for organic stacked polaroid pile feel
  const stackRotations = [-2.8, 3.4, -3.6, 2.6];

  // CSS calculation: 100svh + (4 cards - 1) * 80svh = 340svh
  const trackStyle = {
    height: 'calc(100vh + 240vh)', // Fallback for browsers without svh
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ['--cards' as any]: polaroidsData.length,
    minHeight: `calc(100svh + ${(polaroidsData.length - 1) * 80}svh)`,
  };

  return (
    <section
      ref={trackRef}
      className="story-track relative w-full block bg-[#fbfaf8] border-b border-[#eae0d2]/60"
      id="our-story-section"
      style={trackStyle}
    >
      {/* Sticky container that remains pinned in viewport while scrolling */}
      <div
        className="story-sticky sticky top-0 w-full h-screen max-h-screen overflow-hidden flex flex-col justify-between items-center px-4 py-3 sm:py-5 z-20"
        style={{
          height: '100svh',
        }}
      >
        {/* Subtle romantic watermark pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#511316_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* 1. Header Section */}
        <header className="relative text-center w-full pt-1 pb-1 z-10 shrink-0" id="our-story-header">
          <div className="inline-flex items-center justify-center gap-1.5 text-[#c5a880] mb-0.5">
            
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-[#c5a880]">
              A Glimpse of Our Journey
            </span>
            
          </div>

          <h2 className="font-script text-3xl sm:text-4xl text-[#511316] tracking-wide leading-tight">
            Our Story
          </h2>

          <p className="font-serif italic text-[11px] text-gray-500 mt-0.5 max-w-[280px] mx-auto leading-relaxed line-clamp-1">
            "Every love story is beautiful, but ours is our favorite."
          </p>
        </header>

        {/* 2. DYNAMIC LABEL CHIP: Changes gracefully as scroll flips the stack */}
        <div
          className="relative my-1 z-30 flex flex-col items-center justify-center w-full shrink-0"
          id="story-label-chip-wrapper"
        >
          {/* DYNAMIC LABEL CHIP (Commented out as requested) */}
          {/*
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#440f12] via-[#541418] to-[#440f12] text-[#dfd3c3] shadow-[0_6px_18px_rgba(81,19,22,0.22)] border border-[#c5a880]/70 backdrop-blur-md"
              id="story-active-label-chip"
            >
              <span className="flex items-center gap-1 font-sans text-[9px] uppercase font-extrabold tracking-widest text-[#f5d59f] bg-[#6e1c20] px-2 py-0.5 rounded-full border border-[#c5a880]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#eab561] animate-ping inline-block" />
                {`CH 0${activeIndex + 1}`}
              </span>

              <span className="font-serif text-[11px] font-semibold tracking-wider text-white uppercase">
                {currentItem.tag}
              </span>

              {currentItem.date && (
                <span className="inline-flex items-center gap-1 text-[9px] font-sans font-medium text-[#dfd3c3]/80 bg-black/20 px-1.5 py-0.5 rounded-full">
                  <Calendar className="w-2.5 h-2.5 text-[#eab561]" />
                  {currentItem.date}
                </span>
              )}

              <Heart className="w-2.5 h-2.5 text-[#eab561] fill-[#eab561]" />
            </motion.div>
          </AnimatePresence>
          */}

          {/* Quick chapter selection pills */}
          <div className="flex items-center justify-center gap-1.5 mt-1.5">
            {polaroidsData.map((item, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToCard(idx)}
                  className={`px-2 py-0.5 rounded-full text-[9px] font-sans font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#c5a880] text-white shadow-xs scale-105 ring-1 ring-[#c5a880]/60'
                      : 'bg-white/85 text-gray-400 hover:text-gray-700 border border-[#eae0d2]/80 hover:bg-white'
                  }`}
                  aria-label={`Jump to ${item.tag}`}
                >
                  {`0${idx + 1}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. PHYSICAL POLAROID STACK CONTAINER */}
        <div
          className="relative w-full max-w-[275px] sm:max-w-[305px] aspect-[4/5] my-auto flex items-center justify-center"
          id="polaroid-stack-viewport"
        >
          {polaroidsData.map((item, idx) => {
            const isTop = idx === activeIndex;
            const isPassed = idx < activeIndex;
            const isWaiting = idx > activeIndex;
            const depth = idx - activeIndex;
            const baseRotation = stackRotations[idx % stackRotations.length];

            // Motion animation configuration for realistic physical stacked polaroids
            let animateState = {
              x: 0,
              y: 0,
              scale: 1,
              rotate: baseRotation,
              opacity: 1,
              zIndex: 20,
            };

            if (prefersReducedMotion) {
              // Respect prefers-reduced-motion: cross-fade instead of flip
              animateState = {
                x: 0,
                y: 0,
                scale: 1,
                rotate: 0,
                opacity: isTop ? 1 : 0,
                zIndex: isTop ? 30 : 20,
              };
            } else if (isPassed) {
              // Card scrolled past: swoops out to the left with an organic tilt
              animateState = {
                x: -330,
                y: -35,
                scale: 0.9,
                rotate: baseRotation - 15,
                opacity: 0,
                zIndex: 35,
              };
            } else if (isTop) {
              // Active top card
              animateState = {
                x: 0,
                y: 0,
                scale: 1,
                rotate: 0,
                opacity: 1,
                zIndex: 30,
              };
            } else if (isWaiting) {
              // Waiting underneath in stack: scaled down and offset downward with alternating tilt
              animateState = {
                x: depth * 2.5,
                y: depth * 8,
                scale: Math.max(0.86, 1 - depth * 0.04),
                rotate: baseRotation,
                opacity: Math.max(0.45, 1 - depth * 0.2),
                zIndex: 20 - depth,
              };
            }

            return (
              <motion.div
                key={item.id}
                initial={false}
                animate={animateState}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={isTop ? handleNext : () => scrollToCard(idx)}
                className="absolute inset-0 w-full bg-[#fdfcfa] p-3 pb-3.5 rounded-2xl border border-[#e5dcd2] shadow-[0_14px_32px_rgba(81,19,22,0.13),0_2px_8px_rgba(0,0,0,0.06)] cursor-pointer select-none flex flex-col justify-between transition-shadow hover:shadow-[0_18px_40px_rgba(81,19,22,0.18)]"
                id={`polaroid-stacked-card-${item.id}`}
              >
                {/* Vintage Washi Tape Strip */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-18 h-4.5 bg-[#dfd3c3]/60 border-x border-[#c5a880]/40 -rotate-1 shadow-xs rounded-xs pointer-events-none z-30"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(197, 168, 128, 0.22) 3px, rgba(197, 168, 128, 0.22) 6px)',
                  }}
                />

                {/* Archival corner label chip on the card itself */}
                <div className="absolute top-2 left-2 z-20 px-1.5 py-0.5 rounded-md bg-[#511316]/85 backdrop-blur-xs text-[#f5d59f] text-[8px] font-sans font-bold uppercase tracking-wider border border-[#c5a880]/40 shadow-xs pointer-events-none">
                  {`CH 0${idx + 1} • ${item.year || '2022'}`}
                </div>

                {/* Polaroid Square Photo Frame */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#faf8f5] border border-[#f0eae1] shadow-inner mt-0.5">
                  <img
                    src={item.image}
                    alt={item.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[8%] contrast-[104%]"
                    id={`polaroid-image-${item.id}`}
                  />

                  {/* Traditional Polaroid Photo Sheen Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/5 pointer-events-none" />

                  
                </div>

                {/* Polaroid Bottom White Chin (Caption & Narrative) */}
                <div className="mt-2 flex flex-col items-center justify-center text-center">
                  {/* Handwritten Romantic Caption */}
                  <h3 className="font-brush text-2xl sm:text-3xl text-[#8d1e26] tracking-wide leading-none mb-0.5">
                    {item.caption}
                  </h3>

                  {/* Story Narrative Blurb */}
                  <p className="text-[10px] sm:text-[11px] font-sans text-gray-500 italic leading-snug px-1.5 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 4. Bottom Controls & Scroll Hint */}
        <footer
          className="relative w-full pb-1 flex flex-col items-center justify-center gap-1 z-20 shrink-0"
          id="polaroid-footer-controls"
        >
          <div className="flex items-center justify-between w-full max-w-[300px] px-2">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                activeIndex === 0
                  ? 'border-gray-200 text-gray-300 opacity-40 cursor-not-allowed'
                  : 'border-[#c5a880]/50 text-[#511316] hover:bg-white bg-white/80 shadow-xs active:scale-95'
              }`}
              title="Previous Photo"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scroll / Tap Instruction Hint */}
            <div className="text-center">
              <span className="font-sans text-[8px] uppercase tracking-[0.2em] font-bold text-[#c5a880] inline-flex items-center gap-1 justify-center">
                <span>✦ Scroll to flip stack</span>
                <ArrowDown className="w-2.5 h-2.5 animate-bounce text-[#c5a880]" />
              </span>
               <span className="font-mono text-[9px] text-gray-400 font-semibold block">
                {`${activeIndex + 1} of ${polaroidsData.length} memories`}
               </span>
            </div>

            <button
              onClick={handleNext}
              disabled={activeIndex === polaroidsData.length - 1}
              className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                activeIndex === polaroidsData.length - 1
                  ? 'border-gray-200 text-gray-300 opacity-40 cursor-not-allowed'
                  : 'border-[#c5a880]/50 text-[#511316] hover:bg-white bg-white/80 shadow-xs active:scale-95'
              }`}
              title="Next Photo"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Smooth Progress Line Indicator */}
          <div className="w-28 h-1 bg-[#eae0d2] rounded-full overflow-hidden mt-0.5">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#c5a880] to-[#8d1e26] rounded-full origin-left transition-transform duration-75"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </footer>
      </div>
    </section>
  );
}
