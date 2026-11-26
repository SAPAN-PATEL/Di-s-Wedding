/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ExternalLink, Calendar, Clock, Sparkles, Volume2, VolumeX, Compass, Map as MapIcon, X, Navigation, Copy, Check } from 'lucide-react';
import { ceremoniesData, muhurthamTimeline } from '../data.ts';
import { CeremonyItem } from '../types.ts';

// 1. Interactive Keyframe Styles for Ambient Particles & Petals
function CeremonyParticleStyles() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes float-petal {
        0% { transform: translateY(-20px) translateX(0) rotate(0deg); opacity: 0; }
        15% { opacity: 0.9; }
        85% { opacity: 0.9; }
        100% { transform: translateY(520px) translateX(40px) rotate(360deg); opacity: 0; }
      }
      .anim-petal { animation: float-petal 7s linear infinite; }

      @keyframes float-petal-alt {
        0% { transform: translateY(-20px) translateX(0) rotate(0deg); opacity: 0; }
        15% { opacity: 0.85; }
        85% { opacity: 0.85; }
        100% { transform: translateY(520px) translateX(-35px) rotate(-320deg); opacity: 0; }
      }
      .anim-petal-alt { animation: float-petal-alt 8.5s linear infinite; }

      @keyframes sparkle-twinkle {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.3); }
      }
      .anim-twinkle { animation: sparkle-twinkle 3s ease-in-out infinite; }

      @keyframes chandelier-glow {
        0%, 100% { filter: drop-shadow(0 0 10px rgba(255, 215, 120, 0.45)); opacity: 0.9; }
        50% { filter: drop-shadow(0 0 22px rgba(255, 230, 160, 0.85)); opacity: 1; }
      }
      .anim-chandelier { animation: chandelier-glow 4s ease-in-out infinite; }

      @keyframes audio-wave-1 { 0%, 100% { height: 3px; } 50% { height: 14px; } }
      @keyframes audio-wave-2 { 0%, 100% { height: 12px; } 50% { height: 4px; } }
      @keyframes audio-wave-3 { 0%, 100% { height: 5px; } 50% { height: 16px; } }
      .audio-bar-1 { animation: audio-wave-1 0.8s ease-in-out infinite; }
      .audio-bar-2 { animation: audio-wave-2 0.7s ease-in-out infinite 0.15s; }
      .audio-bar-3 { animation: audio-wave-3 0.9s ease-in-out infinite 0.3s; }
    ` }} />
  );
}

// 2. Falling Petals & Ambient Sparkles Overlay Component
function FloatingParticlesOverlay({ count = 12, type = 'petals' }: { count?: number; type?: 'petals' | 'sparkles' | 'both' }) {
  const items = Array.from({ length: count });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {items.map((_, i) => {
        const left = `${(i * 100) / count + (i % 3) * 2}%`;
        const delay = `-${(i * 0.7).toFixed(1)}s`;
        const duration = `${(5.5 + (i % 4) * 1.2).toFixed(1)}s`;
        const size = 12 + (i % 3) * 4;

        if (type === 'sparkles' || (type === 'both' && i % 2 === 0)) {
          return (
            <div
              key={i}
              className="absolute anim-twinkle"
              style={{
                left: `${(i * 100) / count + (i % 4) * 3}%`,
                top: `${(i * 22) % 90}%`,
                animationDelay: `${-(i * 0.5)}s`,
                animationDuration: `${2.5 + (i % 3)}s`,
              }}
            >
              <div
                className="rounded-full bg-[#fde047] shadow-[0_0_10px_#fde047]"
                style={{ width: `${size / 3}px`, height: `${size / 3}px` }}
              />
            </div>
          );
        }

        // Petals
        const isAlt = i % 2 === 0;
        return (
          <div
            key={i}
            className={`absolute ${isAlt ? 'anim-petal' : 'anim-petal-alt'}`}
            style={{
              left,
              top: '-20px',
              animationDelay: delay,
              animationDuration: duration,
            }}
          >
            {/* Elegant stylized curved rose/marigold petal */}
            <svg width={size} height={size * 1.3} viewBox="0 0 24 32" fill="none">
              <path
                d="M12 0 C 18 8, 24 16, 18 26 C 14 32, 8 31, 4 25 C -1 18, 5 8, 12 0 Z"
                fill={i % 3 === 0 ? '#e11d48' : i % 3 === 1 ? '#f43f5e' : '#fb7185'}
                opacity={0.75}
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

// 3. Audio Toggle Speaker Button on Poster Card (Commented out as requested)
function PosterAudioToggle({ isPlaying: _isPlaying, onToggle: _onToggle }: { isPlaying: boolean; onToggle: (e: React.MouseEvent) => void }) {
  // Commented out as requested
  return null;
  /*
  return (
    <button
      onClick={_onToggle}
      className="absolute bottom-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/45 hover:bg-black/60 backdrop-blur-md text-white border border-white/25 hover:border-white/50 hover:scale-105 active:scale-95 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.35)] cursor-pointer group"
      title={_isPlaying ? 'Pause wedding soundtrack' : 'Play wedding soundtrack'}
      aria-label="Toggle ambient wedding soundtrack"
    >
      {_isPlaying ? (
        <div className="flex gap-0.5 items-end justify-center w-4 h-4 pb-[2px]">
          <div className="w-[2.5px] bg-[#fde047] rounded-full audio-bar-1" />
          <div className="w-[2.5px] bg-white rounded-full audio-bar-2" />
          <div className="w-[2.5px] bg-[#fde047] rounded-full audio-bar-3" />
        </div>
      ) : (
        <VolumeX className="w-4 h-4 text-white/80 group-hover:text-white" />
      )}
    </button>
  );
  */
}

// 4. Custom Posters per Event Specification

// 4A. Carnival Poster (Day 1 - Vibrant Floral Garden)
function CarnivalPoster({ item, isPlaying, onAudioToggle }: { item: CeremonyItem; isPlaying: boolean; onAudioToggle: (e: React.MouseEvent) => void }) {
  return (
    <div className="relative aspect-[1240/1748] w-full rounded-3xl overflow-hidden shadow-[0_12px_40px_rgba(138,98,63,0.14)] border border-[#f3ded9] flex flex-col justify-between p-6 select-none bg-gradient-to-b from-[#fdf7f4] via-[#fcf1ec] to-[#f9e4dc]">
      {/* Dynamic Animated Petals Overlay */}
      <FloatingParticlesOverlay count={14} type="both" />

      {/* Decorative Ornate Gold Filigree Corner Accents */}
      <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#d58b7e]/50 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#d58b7e]/50 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#d58b7e]/50 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#d58b7e]/50 rounded-br-xl pointer-events-none" />

      {/* Background Floral & Garden Vector Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <svg viewBox="0 0 400 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* Garden Arch & Bunting */}
          <path d="M 0 50 Q 100 90 200 50 Q 300 90 400 50" fill="none" stroke="#d58b7e" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M 0 90 Q 100 130 200 90 Q 300 130 400 90" fill="none" stroke="#e0a39a" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* Marigold Toran / Bunting triangles */}
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M ${i * 45 + 10} 70 L ${i * 45 + 24} 95 L ${i * 45 + 38} 70 Z`}
              fill={i % 3 === 0 ? '#e19f96' : i % 3 === 1 ? '#eab561' : '#b2c7b5'}
            />
          ))}
          {/* Soft Floral Garden silhouette at bottom */}
         
        </svg>
      </div>

      {/* Top Header Card Stamp */}
      <div className="relative z-10 text-center pt-2">
        <span className="font-sans text-[10px] tracking-[0.28em] uppercase font-bold text-[#b56557]">
          {item.subTitle || 'WELCOME CELEBRATION'}
        </span>
        <div className="w-8 h-[1px] bg-[#d58b7e]/40 mx-auto mt-1" />
      </div>

      {/* Centerpiece Content Overlay */}
      <div className="relative z-10 text-center my-auto px-2">
        <span className="font-serif italic text-sm text-[#8c6759] block mb-1">
          Join us for a joyful day of
        </span>
        <h3 className="font-script text-5xl md:text-6xl text-[#6b251a] drop-shadow-sm tracking-wide font-normal">
          {item.title}
        </h3>
        
        {/* Formatted Date: Wednesday | 27 | May 2026 */}
        <div className="mt-4 inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#e8c7be]/80 text-[#6b251a] shadow-xs">
          <span className="font-serif text-xs font-semibold tracking-wider">
            {item.formattedDate || 'Wednesday | 27 | May 2026'}
          </span>
        </div>

        {/* Time & Theme */}
        <div className="mt-3.5 space-y-1">
          <p className="font-sans text-xs font-medium text-[#7a483e]">
            {item.timeLabel}
          </p>
          {/* <p className="font-sans text-[11px] uppercase tracking-wider text-[#9d5b50] font-semibold">
            {item.theme}
          </p> */}
        </div>
      </div>

      {/* Bottom Motif */}
      <div className="relative z-10 text-center pb-2">
        <span className="font-serif italic text-[11px] text-[#9c6a5d]">
          Filled with music, vibrant colors & joyous laughter
        </span>
      </div>

      {/* Audio Button (Commented out) */}
      {/* <PosterAudioToggle isPlaying={isPlaying} onToggle={onAudioToggle} /> */}
    </div>
  );
}

// 4B. Sangeet Poster (Day 2 - Midnight Blue & Velvet Red / Glitz & Glam)
function SangeetPoster({ item, isPlaying, onAudioToggle }: { item: CeremonyItem; isPlaying: boolean; onAudioToggle: (e: React.MouseEvent) => void }) {
  return (
    <div className="relative aspect-[1240/1748] w-full rounded-3xl overflow-hidden shadow-[0_12px_45px_rgba(15,23,42,0.35)] border border-[#3b3558] flex flex-col justify-between p-6 select-none bg-gradient-to-b from-[#0a0f1d] via-[#1a142e] to-[#361324] text-white">
      {/* Floating Sparkles & Golden Stars */}
      <FloatingParticlesOverlay count={18} type="sparkles" />

      {/* Ornate Gold Filigree Corners */}
      <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#eab561]/60 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#eab561]/60 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#eab561]/60 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#eab561]/60 rounded-br-xl pointer-events-none" />

      {/* Radial Stage Spotlight Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-radial from-[#d4af37]/20 via-[#8b5cf6]/10 to-transparent blur-2xl pointer-events-none" />

      {/* Top Header Card Stamp */}
      <div className="relative z-10 text-center pt-2">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold text-[#f2d08a]">
          {item.subTitle || 'MYSTIC & MAGIC'}
        </span>
        <div className="w-8 h-[1px] bg-[#f2d08a]/40 mx-auto mt-1" />
      </div>

      {/* Centerpiece Content Overlay */}
      <div className="relative z-10 text-center my-auto px-2">
        <span className="font-serif italic text-sm text-[#f6d89b]/90 block mb-1">
          An evening of melody & dance
        </span>
        <h3 className="font-script text-5xl md:text-6xl text-[#fbeecb] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] tracking-wide font-normal">
          {item.title}
        </h3>
        
        {/* Formatted Date: Thursday | 28 | May 2026 */}
        <div className="mt-4 inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#eab561]/40 text-[#fdedc9] shadow-xs">
          <span className="font-serif text-xs font-semibold tracking-wider">
            {item.formattedDate || 'Thursday | 28 | May 2026'}
          </span>
        </div>

        {/* Time & Theme */}
        <div className="mt-3.5 space-y-1">
          <p className="font-sans text-xs font-medium text-[#f2d5a3]">
            {item.timeLabel}
          </p>
          {/* <p className="font-sans text-[11px] uppercase tracking-wider text-[#e6b865] font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#fde047]" />
            {item.theme}
            <Sparkles className="w-3 h-3 text-[#fde047]" />
          </p> */}
        </div>
      </div>

      {/* Bottom Motif */}
      <div className="relative z-10 text-center pb-2">
        <span className="font-serif italic text-[11px] text-[#eed4af]/70">
          Get ready to dance to unforgettable Bollywood & Punjabi rhythms
        </span>
      </div>

      {/* Audio Button (Commented out) */}
      {/* <PosterAudioToggle isPlaying={isPlaying} onToggle={onAudioToggle} /> */}
    </div>
  );
}

// 4C. Reception Poster (Day 3 - Luxury Emerald Green & Gold Chandelier)
function ReceptionPoster({ item, isPlaying, onAudioToggle }: { item: CeremonyItem; isPlaying: boolean; onAudioToggle: (e: React.MouseEvent) => void }) {
  return (
    <div className="relative aspect-[1240/1748] w-full rounded-3xl overflow-hidden shadow-[0_12px_45px_rgba(10,31,20,0.35)] border border-[#234b35] flex flex-col justify-between p-6 select-none bg-gradient-to-b from-[#091a10] via-[#122e1e] to-[#0a180f] text-white">
      {/* Floating Warm Golden Dust */}
      <FloatingParticlesOverlay count={15} type="sparkles" />

      {/* Ornate Gold Filigree Corners */}
      <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#dfd3c3]/60 rounded-tl-xl pointer-events-none" />
      <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#dfd3c3]/60 rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#dfd3c3]/60 rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#dfd3c3]/60 rounded-br-xl pointer-events-none" />

      {/* Stylized Chandelier Vector at Top Center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 pointer-events-none anim-chandelier">
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <line x1="100" y1="0" x2="100" y2="28" stroke="#dfd3c3" strokeWidth="2" />
          <path d="M 60 40 Q 100 20 140 40" fill="none" stroke="#dfd3c3" strokeWidth="2.5" />
          <path d="M 40 60 Q 100 35 160 60" fill="none" stroke="#c5a880" strokeWidth="2" />
          {/* Crystals */}
          <circle cx="100" cy="55" r="3.5" fill="#fff" opacity="0.9" />
          <circle cx="75" cy="65" r="3" fill="#ffecb3" opacity="0.9" />
          <circle cx="125" cy="65" r="3" fill="#ffecb3" opacity="0.9" />
          <circle cx="50" cy="72" r="2.5" fill="#fff" opacity="0.8" />
          <circle cx="150" cy="72" r="2.5" fill="#fff" opacity="0.8" />
          <circle cx="100" cy="85" r="4" fill="#fde047" opacity="0.95" />
          {/* Ambient Glow */}
          <ellipse cx="100" cy="50" rx="60" ry="25" fill="#fde047" opacity="0.12" />
        </svg>
      </div>

      {/* Top Header Card Stamp */}
      <div className="relative z-10 text-center pt-8">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold text-[#dfd3c3]">
          {item.subTitle || 'GALA RECEPTION'}
        </span>
        <div className="w-8 h-[1px] bg-[#dfd3c3]/40 mx-auto mt-1" />
      </div>

      {/* Centerpiece Content Overlay */}
      <div className="relative z-10 text-center my-auto px-2">
        <span className="font-serif italic text-sm text-[#dfd3c3]/90 block mb-1">
          Celebrating the newly wedded couple
        </span>
        <h3 className="font-script text-5xl md:text-6xl text-[#f4edd9] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] tracking-wide font-normal">
          {item.title}
        </h3>
        
        {/* Formatted Date: Friday | 29 | May 2026 */}
        <div className="mt-4 inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#dfd3c3]/40 text-[#f4edd9] shadow-xs">
          <span className="font-serif text-xs font-semibold tracking-wider">
            {item.formattedDate || 'Friday | 29 | May 2026'}
          </span>
        </div>

        {/* Time & Theme */}
        <div className="mt-3.5 space-y-1">
          <p className="font-sans text-xs font-medium text-[#e8dfd3]">
            {item.timeLabel}
          </p>
          {/* <p className="font-sans text-[11px] uppercase tracking-wider text-[#d4c3ab] font-semibold">
            {item.theme}
          </p> */}
        </div>
      </div>

      {/* Bottom Motif */}
      <div className="relative z-10 text-center pb-2">
        <span className="font-serif italic text-[11px] text-[#dfd3c3]/70">
          Toast, dining & celebrating our first evening as husband & wife
        </span>
      </div>

      {/* Audio Button (Commented out) */}
      {/* <PosterAudioToggle isPlaying={isPlaying} onToggle={onAudioToggle} /> */}
    </div>
  );
}

// 4D. Muhurtham Poster (Day 4 - Royal Wedding Mandap with User's Uploaded Card Image!)
function MuhurthamPoster({ item, isPlaying, onAudioToggle }: { item: CeremonyItem; isPlaying: boolean; onAudioToggle: (e: React.MouseEvent) => void }) {
  return (
    <div className="relative aspect-[1240/1748] w-full rounded-3xl overflow-hidden shadow-[0_12px_45px_rgba(100,20,30,0.25)] border border-[#ebd6be] flex flex-col justify-between p-6 select-none bg-[#fbf7f0]">
      {/* Background Royal Artwork directly from user's uploaded invitation asset */}
      <img
        src="src/assets/images/The Muhurtham.png"
        alt="Dhruv & Krishna Sacred Muhurtham Royal Mandap"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none transition-transform duration-1000 group-hover:scale-105"
      />

      {/* Subtle Warm Vignette & Typography Contrast Enhancer Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2b080b]/65 via-[#2b080b]/20 to-[#2b080b]/75 pointer-events-none" />

      {/* Animated Floating Rose Petals across the royal mandap */}
      <FloatingParticlesOverlay count={16} type="both" />

      {/* Ornate Gold Filigree Corners */}
      <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#f3d99e] rounded-tl-xl pointer-events-none" />
      <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#f3d99e] rounded-tr-xl pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#f3d99e] rounded-bl-xl pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#f3d99e] rounded-br-xl pointer-events-none" />

      {/* Top Header Card Stamp */}
      <div className="relative z-10 text-center pt-2">
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-bold text-[#fae1a6] drop-shadow-md">
          {item.subTitle || 'ANAND KARAJ & WEDDING'}
        </span>
        <div className="w-8 h-[1px] bg-[#fae1a6]/60 mx-auto mt-1" />
      </div>

      {/* Centerpiece Content Overlay */}
      <div className="relative z-10 text-center h-[181.5px] mt-[34.968999999999994px] mb-[238.969px] pl-[8px] pr-2">
        <span className="font-serif italic text-sm text-[#fdf0d5] block mb-1 drop-shadow-md">
          The Sacred Union 
        </span> <br/>
        <h3 className="font-script text-5xl md:text-6xl text-[#fff5e0] drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] tracking-wide font-normal">
          {item.title}
        </h3>
        
        {/* Formatted Date: Saturday | 30 | May 2026 */}
        <div className="mt-4 inline-flex items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-[#f3d99e]/60 text-[#fae6bb] shadow-sm">
          <span className="font-serif text-xs font-semibold tracking-wider">
            {item.formattedDate || 'Tuesday | 02 | Fab 2027'}
          </span>
        </div>

        {/* Time & Theme */}
        <div className="mt-3.5 space-y-1">
          <p className="font-sans text-xs font-medium text-white drop-shadow-md">
            {item.timeLabel}
          </p>
          {/* <p className="font-sans text-[11px] uppercase tracking-wider text-[#fae1a6] font-semibold drop-shadow-md">
            {item.theme}
          </p> */}
        </div>
      </div>

      {/* Bottom Motif */}
      <div className="relative z-10 text-center pb-2">
        <span className="font-serif italic text-[11px] text-[#fbeecb] drop-shadow-md">
          Four sacred rounds around Guru Granth Sahib Ji
        </span>
      </div>

      {/* Audio Button (Commented out) */}
      {/* <PosterAudioToggle isPlaying={isPlaying} onToggle={onAudioToggle} /> */}
    </div>
  );
}

// 5. Stylized Vector Map Graphic Fallback
function MockVectorMap({ venueName, venueAddress }: { venueName: string; venueAddress: string }) {
  return (
    <div className="relative overflow-hidden h-40 border border-[#eae0d2] rounded-2xl bg-[#faf6f0] mt-3 shadow-inner">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#e5dec9_1px,transparent_1px),linear-gradient(to_bottom,#e5dec9_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      {/* Scenic Green Areas */}
      <div className="absolute top-3 left-4 w-28 h-16 rounded-full blur-xl opacity-35 bg-[#bfc6ae]" />
      <div className="absolute bottom-2 right-4 w-36 h-16 rounded-full blur-xl opacity-30 bg-[#ebd3bd]" />

      {/* Streets */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path d="M 0 65 L 400 65" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <path d="M 0 65 L 400 65" stroke="#eae0d2" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 160 0 L 160 160" stroke="white" strokeWidth="6" strokeLinecap="round" />
        <path d="M 160 0 L 160 160" stroke="#eae0d2" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>

      {/* Destination Pin */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <span className="absolute w-8 h-8 rounded-full bg-[#8d1e26] opacity-30 animate-ping" />
          <span className="w-4 h-4 rounded-full bg-[#8d1e26] border-2 border-white shadow-md flex items-center justify-center" />
        </div>
        <div className="mt-1 bg-white/95 backdrop-blur-sm border border-[#eae0d2] text-[#8d1e26] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
          📍 {venueName}
        </div>
      </div>

      {/* Badge */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-full px-2 py-0.5 text-[8px] font-sans font-bold text-gray-500 shadow-xs">
        <span className="text-[#34a853]">G</span>
        <span className="text-[#ea4335]">o</span>
        <span className="text-[#fbbc05]">o</span>
        <span className="text-[#4285f4]">g</span>
        <span className="text-[#34a853]">l</span>
        <span className="text-[#ea4335]">e</span>
        <span>Map Preview</span>
      </div>
    </div>
  );
}

// 6. Full-Screen Interactive Location Pin Modal
function VenueLocationModal({ item, onClose }: { item: CeremonyItem; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [onClose]);

  const handleCopy = () => {
    const fullText = `${item.venueName}, ${item.venueAddress}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="relative w-full max-w-lg bg-[#faf7f2] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-[#dfd3c3] overflow-hidden flex flex-col max-h-[92vh] z-10"
        role="dialog"
        aria-modal="true"
        id={`location-modal-day-${item.day}`}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-[#eae0d2] flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8d1e26] font-bold">
              DAY {item.day} • {item.title}
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#4a3625] leading-tight">
              {item.venueName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
            title="Close modal"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body with Interactive Map & Details */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5">
          {/* Info Strip */}
          <div className="bg-white rounded-2xl border border-[#eae0d2] p-3.5 flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-2.5">
              <div className="p-2 rounded-full bg-[#f6ecd9] text-[#8d1e26] shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-sans text-xs font-semibold text-gray-800 block">
                  {item.venueAddress}
                </span>
                <span className="font-sans text-[11px] text-gray-500 mt-0.5 block">
                  {item.dateLabel} • {item.timeLabel}
                </span>
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#eae0d2] bg-[#fbf9f5] hover:bg-white text-[11px] font-sans font-medium text-gray-700 transition-colors cursor-pointer"
              title="Copy Address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gray-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Full-Screen Interactive Location Pin Map */}
          <div className="relative rounded-2xl overflow-hidden border border-[#eae0d2] shadow-inner bg-gray-100 h-72 sm:h-80">
            <iframe
              title={`${item.venueName} Full Map View`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(item.venueAddress || item.venueName)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Location Marker Badge */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm border border-[#eae0d2] rounded-xl px-3 py-1.5 shadow-md flex items-center gap-2 pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8d1e26] animate-pulse" />
              <span className="font-sans text-[11px] font-bold text-[#8d1e26]">
                {item.venueName}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-white border-t border-[#eae0d2] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100 font-sans text-xs font-semibold tracking-wider transition-colors cursor-pointer"
          >
            CLOSE
          </button>

          <a
            href={item.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2.5 px-4 rounded-full bg-[#2e4d31] hover:bg-[#233c25] active:scale-98 text-[#dfd3c3] hover:text-white font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-center"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>DIRECTIONS IN GOOGLE MAPS</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// 7. Interactive Live Google Map Card with View on Map CTA
function VenueMapCard({ item, onOpenMap }: { item: CeremonyItem; onOpenMap: (item: CeremonyItem) => void }) {
  const [mapMode, setMapMode] = useState<'embed' | 'vector'>('embed');

  return (
    <div className="mt-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-[#eae0d2] p-5 shadow-[0_4px_20px_rgba(138,98,63,0.06)]">
      {/* Event Title Repeating in Calligraphy/Serif */}
      <div className="flex items-center justify-between pb-3 border-b border-[#eae0d5]/50">
        <div>
          <h4 className="font-serif text-xl font-bold text-[#4a3625]">
            {item.title}
          </h4>
          <span className="font-sans text-[11px] text-[#c5a880] font-medium tracking-wide">
            {item.dateLabel} • {item.timeLabel}
          </span>
        </div>
        <span className="font-mono text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded font-bold">
          DAY {item.day}
        </span>
      </div>

      {/* Venue Name & Full Address */}
      <div className="mt-3.5 flex items-start gap-2.5">
        <div className="mt-0.5 p-1.5 rounded-full bg-[#f6ecd9]/60 text-[#8d1e26]">
          <MapPin className="w-4 h-4 text-[#8d1e26]" />
        </div>
        <div className="flex-1">
          <span className="font-serif text-sm font-semibold text-gray-900 block leading-snug">
            {item.venueName}
          </span>
          <span className="font-sans text-xs text-gray-500 block mt-0.5 leading-relaxed">
            {item.venueAddress}
          </span>
        </div>
      </div>

      {/* Primary Action Button: Pill-shaped "VIEW ON MAP" - opens full-screen interactive modal */}
      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => onOpenMap(item)}
          className="w-full h-11 rounded-full bg-[#2e4d31] hover:bg-[#233c25] active:scale-98 text-[#dfd3c3] hover:text-white font-sans text-xs font-bold tracking-widest uppercase transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer group"
          id={`view-map-btn-day-${item.day}`}
          title="Open interactive location pin map modal"
        >
          <MapPin className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          <span>VIEW ON MAP</span>
        </button>

        {/* Map View Toggle button (Live Google Map vs Vector Graphic) */}
        <div className="flex items-center justify-between px-1 mt-1 text-[10px] text-gray-400 font-sans">
          <span className="uppercase tracking-wider">Venue Location Preview</span>
          <button
            onClick={() => setMapMode(m => m === 'embed' ? 'vector' : 'embed')}
            className="text-[#8d1e26] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            {mapMode === 'embed' ? (
              <>
                <Compass className="w-3 h-3" />
                <span>Switch to Graphic View</span>
              </>
            ) : (
              <>
                <MapIcon className="w-3 h-3" />
                <span>Switch to Interactive Map</span>
              </>
            )}
          </button>
        </div>

        {/* Live Map Preview with Custom Rounded Borders */}
        {mapMode === 'embed' ? (
          <div className="relative overflow-hidden h-44 rounded-2xl border border-[#eae0d2] mt-1 shadow-inner bg-gray-50">
            <iframe
              title={`${item.venueName} Google Map`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(item.venueAddress || item.venueName)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full border-0 rounded-2xl"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : (
          <MockVectorMap venueName={item.venueName} venueAddress={item.venueAddress} />
        )}
      </div>
    </div>
  );
}

// 7. Interactive Timeline / Day Schedule Component
function DayScheduleSection({ activeDay, setActiveDay }: { activeDay: number; setActiveDay: (d: number) => void }) {
  const currentItem = ceremoniesData.find(c => c.day === activeDay) || ceremoniesData[3];
  const scheduleEvents = currentItem.schedule || muhurthamTimeline;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-14 bg-gradient-to-b from-[#fbf8f2] to-[#f7f2e7] border border-[#ecdcc8] rounded-3xl p-6 shadow-sm"
      id="day-schedule-container"
    >
      {/* Day Selector Tabs for All Multi-day ceremonies */}
      <div className="flex items-center justify-start gap-1.5 px-1.5 pt-1.5 pb-2 bg-white/70 backdrop-blur-sm border border-[#eae0d2] rounded-full w-full max-w-full mx-auto mb-6 overflow-x-auto day-selector-scroll">
        {ceremoniesData.map((c) => (
          <button
            key={c.day}
            onClick={() => setActiveDay(c.day)}
            className={`shrink-0 px-3 py-1.5 rounded-full font-sans text-[11px] font-semibold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeDay === c.day
                ? 'bg-[#511316] text-[#dfd3c3] shadow-xs'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/50'
            }`}
          >
            Day {c.day} • {c.title}
          </button>
        ))}
      </div>

      {/* Header: [Event Name] DAY SCHEDULE */}
      <div className="text-center mb-6">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#c5a880] font-bold block">
          {currentItem.title.toUpperCase()} DAY SCHEDULE
        </span>
        <h4 className="font-serif text-2xl font-bold text-[#511316] mt-1">
          {currentItem.dateLabel}
        </h4>
        
        {/* Attire theme callout */}
        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-white/80 border border-[#eae0d2] rounded-full text-[11px] text-[#8c745c]">
          <span className="w-2 h-2 rounded-full bg-[#5b7a5e]" />
          <span>Attire: <strong className="text-[#3b593e]">{currentItem.attireTheme || currentItem.theme}</strong></span>
        </div>
      </div>

      {/* Vertical Timeline Schedule Axis with Circular Pin Markers */}
      <div className="relative border-l-2 border-[#c5a880]/35 ml-4 sm:ml-6 pl-6 space-y-5">
        {scheduleEvents.map((step, idx) => (
          <motion.div
            key={`${currentItem.day}-${idx}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="relative"
            id={`schedule-step-${currentItem.day}-${idx}`}
          >
            {/* Circular Pin Marker on Axis */}
            <div className="absolute -left-[33px] top-2 w-4 h-4 rounded-full border-2 border-[#c5a880] bg-white flex items-center justify-center shadow-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-[#8d1e26]" />
            </div>

            {/* Right Card: Glassmorphic soft-tinted card with calligraphy/serif */}
            <div className="bg-white/85 hover:bg-white backdrop-blur-sm border border-[#eae0d2]/70 rounded-2xl p-3.5 shadow-[0_2px_10px_rgba(138,98,63,0.04)] transition-all hover:-translate-y-0.5">
              <span className="font-mono text-[10px] font-bold text-[#c5a880] tracking-wider block mb-0.5">
                {step.time}
              </span>
              <span className="font-serif text-sm font-semibold text-[#4a3625] block leading-snug">
                {step.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// 8. Main Refactored Sacred Ceremonies Component
export default function TimelineCards() {
  const [isGlobalPlaying, setIsGlobalPlaying] = useState(false);
  const [activeScheduleDay, setActiveScheduleDay] = useState(4); // Default to Day 4 (Muhurtham)
  const [selectedMapVenue, setSelectedMapVenue] = useState<CeremonyItem | null>(null);

  // Listen to ambient audio state from AudioPlayer
  useEffect(() => {
    const handleState = (e: any) => {
      setIsGlobalPlaying(e.detail?.isPlaying || false);
    };
    window.addEventListener('wedding-audio-state-changed', handleState);
    window.dispatchEvent(new CustomEvent('request-wedding-audio-state'));

    return () => {
      window.removeEventListener('wedding-audio-state-changed', handleState);
    };
  }, []);

  const handleSpeakerToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('toggle-wedding-audio'));
  };

  return (
    <section className="w-full max-w-[480px] mx-auto px-4 sm:px-5 py-12" id="ceremonies-section">
      <CeremonyParticleStyles />

      {/* ============ SECTION HEADER ============ */}
      <div className="text-center mb-10">
        <span className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#c5a880] font-semibold block">
          THE CELEBRATIONS UNFOLD
        </span>
        <h2 className="font-script text-5xl md:text-6xl text-[#511316] mt-1 font-normal tracking-wide">
          Sacred Ceremonies
        </h2>
        <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a880]/60 to-transparent mx-auto mt-3" />
      </div>

      {/* ============ MULTI-DAY EVENT CARDS FEED ============ */}
      <div className="flex flex-col gap-14" id="ceremony-cards-container">
        {ceremoniesData.map((item) => (
          <div key={item.day} className="flex flex-col" id={`ceremony-group-day-${item.day}`}>
            {/* Linked Visual Card Group */}
            <div className="flex flex-col" id={`ceremony-card-day-${item.day}`}>
              {/* Card A: Artistic Illustration Poster Card (Top Card, 4:5 Portrait) */}
              <div id={`poster-card-day-${item.day}`}>
                {item.illustration === 'carnival' && (
                  <CarnivalPoster item={item} isPlaying={isGlobalPlaying} onAudioToggle={handleSpeakerToggle} />
                )}
                {item.illustration === 'sangeet' && (
                  <SangeetPoster item={item} isPlaying={isGlobalPlaying} onAudioToggle={handleSpeakerToggle} />
                )}
                {item.illustration === 'reception' && (
                  <ReceptionPoster item={item} isPlaying={isGlobalPlaying} onAudioToggle={handleSpeakerToggle} />
                )}
                {item.illustration === 'muhurtham' && (
                  <MuhurthamPoster item={item} isPlaying={isGlobalPlaying} onAudioToggle={handleSpeakerToggle} />
                )}
              </div>

              {/* Card B: Venue & Map Action Card (Directly Attached Below) */}
              <div id={`venue-card-day-${item.day}`}>
                <VenueMapCard
                  item={item}
                  onOpenMap={(selectedItem) => setSelectedMapVenue(selectedItem)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ============ TIMELINE / DAY SCHEDULE COMPONENT (BOTTOM SECTION) ============ */}
      <DayScheduleSection activeDay={activeScheduleDay} setActiveDay={setActiveScheduleDay} />

      {/* ============ SACRED LAVAN / CEREMONIAL BLESSING ============ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-14 text-center px-4"
        id="sacred-lavan-container"
      >
        <span className="font-serif italic text-lg text-[#c5a880] block mb-2">
          The Sacred Lavan & Vows
        </span>
        <blockquote className="font-sans text-xs text-gray-500 leading-relaxed italic max-w-sm mx-auto p-4 bg-white/60 border border-[#eae0d2]/40 rounded-2xl shadow-xs">
          "During the sacred Anand Karaj, the bride and groom circle four times — each round sealing devotion, reverence, spiritual love, and eternal union."
        </blockquote>
      </motion.div>

      {/* ============ FULL-SCREEN VENUE LOCATION PIN MODAL ============ */}
      {selectedMapVenue && (
        <VenueLocationModal
          item={selectedMapVenue}
          onClose={() => setSelectedMapVenue(null)}
        />
      )}
    </section>
  );
}
