/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, ExternalLink, Calendar, Clock, Sparkles, VolumeX } from 'lucide-react';
import { ceremoniesData, muhurthamTimeline } from '../data.ts';

// 1. Fully-Contained Animation Keyframe Injector
function SVGEffectsStyles() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes float-confetti {
        0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(240px) rotate(360deg); opacity: 0; }
      }
      .confetti { animation: float-confetti 6s linear infinite; }
      
      @keyframes sway-slow {
        0%, 100% { transform: rotate(-3deg); }
        50% { transform: rotate(3deg); }
      }
      .sway-element { transform-origin: top center; animation: sway-slow 4s ease-in-out infinite; }

      @keyframes couple-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      .couple-bounce { animation: couple-float 3s ease-in-out infinite; }

      @keyframes star-twinkle {
        0%, 100% { opacity: 0.1; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.3); }
      }
      .twinkle-star { animation: star-twinkle 3.5s ease-in-out infinite; transform-origin: center; }

      @keyframes spot-sweep {
        0%, 100% { transform: rotate(-8deg); opacity: 0.08; }
        50% { transform: rotate(8deg); opacity: 0.16; }
      }
      .spotlight-sweep { transform-origin: top center; animation: spot-sweep 6s ease-in-out infinite; }

      @keyframes bird-fly-rt {
        0% { transform: translate(-60px, 130px) scale(0.45); opacity: 0; }
        15% { opacity: 0.85; }
        85% { opacity: 0.85; }
        100% { transform: translate(460px, -50px) scale(0.75); opacity: 0; }
      }
      .bird-path-rt { animation: bird-fly-rt 12s linear infinite; }

      @keyframes bird-fly-lt {
        0% { transform: translate(460px, 120px) scale(0.4) scaleX(-1); opacity: 0; }
        15% { opacity: 0.85; }
        85% { opacity: 0.85; }
        100% { transform: translate(-60px, -40px) scale(0.7) scaleX(-1); opacity: 0; }
      }
      .bird-path-lt { animation: bird-fly-lt 14s linear infinite; }

      @keyframes wing-flap {
        0%, 100% { transform: scaleY(0.9); }
        50% { transform: scaleY(0.15); }
      }
      .wing-flaps { transform-origin: center; animation: wing-flap 0.35s ease-in-out infinite; }

      @keyframes flame-glow {
        0%, 100% { transform: scale(1) skewX(0deg); opacity: 0.9; }
        25% { transform: scaleY(1.06) skewX(1deg); }
        50% { transform: scale(0.94, 1.12) skewX(-1.5deg); opacity: 1; }
        75% { transform: scale(1.03, 0.97) skewX(2deg); }
      }
      .sacred-flame { transform-origin: bottom center; animation: flame-glow 0.6s ease-in-out infinite; }

      @keyframes map-pulse-marker {
        0% { transform: scale(0.85); opacity: 0.65; }
        100% { transform: scale(2.4); opacity: 0; }
      }
      .marker-glow { animation: map-pulse-marker 1.8s ease-out infinite; }

      @keyframes wave-pulse-anim {
        0%, 100% { height: 2px; }
        50% { height: 14px; }
      }
      .wave-bar-1 { animation: wave-pulse-anim 0.8s ease infinite alternate; }
      .wave-bar-2 { animation: wave-pulse-anim 1.1s ease infinite alternate 0.23s; }
      .wave-bar-3 { animation: wave-pulse-anim 0.7s ease infinite alternate 0.45s; }
    ` }} />
  );
}

// 2. Custom Illustrated SVGs with Injected Animations
interface SVGProps {
  isPlaying: boolean;
}

function CarnivalSVG({ isPlaying }: SVGProps) {
  return (
    <div className="relative overflow-hidden w-full h-48 rounded-t-3xl bg-[#faf3f0] border-b border-[#f3e5e1]">
      <svg viewBox="0 0 400 240" className="w-full h-full">
        {/* Soft morning sky and subtle gold sunrays */}
        <circle cx="200" cy="240" r="150" fill="#fcf9f6" opacity="0.8" />
        <path d="M 0 240 Q 100 210 200 240 T 400 240 L 400 240 L 0 240 Z" fill="#ebd9d5" opacity="0.5" />

        {/* Dynamic Confetti falling */}
        {Array.from({ length: 14 }).map((_, i) => {
          const x = 20 + i * 27;
          const r = 3 + (i % 2.5);
          const colors = ['#df9991', '#e0c196', '#b8ccd1', '#b0c3ae', '#d8a9c2'];
          const color = colors[i % colors.length];
          const delay = -0.42 * i;
          const duration = 4.5 + (i % 3);
          return (
            <circle
              key={i}
              cx={x}
              cy="-15"
              r={r}
              fill={color}
              className="confetti"
              style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
            />
          );
        })}

        {/* Cute traditional marigold gateways bunting arches */}
        <path d="M 0 10 Q 50 35 100 10 Q 150 35 200 10 Q 250 35 300 10 Q 350 35 400 10" fill="none" stroke="#d58b7e" strokeWidth="1.2" strokeDasharray="3 3" />
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={i}
            d={`M ${i * 50 + 12} ${20} L ${i * 50 + 25} 36 L ${i * 50 + 38} ${20} Z`}
            fill={i % 3 === 0 ? '#e19f96' : i % 3 === 1 ? '#cda56b' : '#bcc8bd'}
            className="sway-element"
            style={{ animationDelay: `${-0.3 * i}s` }}
          />
        ))}

        {/* Grand Marigold Floral Arched Entrance Gate */}
        <path d="M 50 240 A 150 150 0 0 1 350 240" fill="none" stroke="#eab561" strokeWidth="6" strokeLinecap="round" strokeDasharray="14 15" className="sway-element" />
        <path d="M 70 240 A 130 130 0 0 1 330 240" fill="none" stroke="#db8463" strokeWidth="4" strokeLinecap="round" strokeDasharray="10 11" />

        {/* Pillars for traditional look */}
        <rect x="58" y="110" width="14" height="130" rx="2" fill="#dfa599" />
        <rect x="328" y="110" width="14" height="130" rx="2" fill="#dfa599" />
        <path d="M 45 110 C 130 85 270 85 355 110 L 335 125 C 250 105 150 105 65 125 Z" fill="#cc8273" />

        {/* Hanging Floral tassels & floral mango-leaf strings */}
        {Array.from({ length: 5 }).map((_, i) => (
          <g key={i} className="sway-element" style={{ animationDelay: `${-0.25 * i}s` }}>
            <line x1={95 + i * 52} y1="110" x2={95 + i * 52} y2={145 + (i % 2) * 15} stroke="#db8463" strokeWidth="2" strokeDasharray="1 5" />
            <circle cx={95 + i * 52} cy={148 + (i % 2) * 15} r="3.5" fill="#eab561" />
          </g>
        ))}

        {/* Lovely silhouette of Couple (Dhruv & Krishna in ethnic wear walking in) */}
        <g transform="translate(145, 120) scale(0.9)" className="couple-bounce">
          {/* Groom in Indian Sherwani kurtas holding hand */}
          <circle cx="48" cy="40" r="7.5" fill="#bc7769" />
          <path d="M 38 48 C 42 46, 54 46, 58 48 L 58 105 L 38 105 Z" fill="#bc7769" />
          
          {/* Bride in traditional Lehenga with long dupatta trailing */}
          <circle cx="68" cy="45" r="6.5" fill="#db8463" />
          <path d="M 68 52 C 60 55, 76 55, 68 70 L 52 105 C 68 120, 80 120, 88 105 L 72 70 Z" fill="#db8463" />
          <path d="M 82 105 Q 105 115, 115 128" stroke="#db8463" strokeWidth="1.5" fill="none" opacity="0.6" strokeLinecap="round" />
        </g>
      </svg>

      {/* Decorative Traditional Plaque */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/95 px-5 py-1.5 rounded-full border border-[#db8463]/30 shadow-md">
        <span className="font-serif text-xs font-bold tracking-[0.2em] text-[#8d1e26] uppercase">Carnival</span>
      </div>
    </div>
  );
}

function SangeetSVG({ isPlaying }: SVGProps) {
  return (
    <div className="relative overflow-hidden w-full h-48 rounded-t-3xl bg-[#091526]">
      <svg viewBox="0 0 400 240" className="w-full h-full">
        {/* Sky cosmic backdrop with twilight glow */}
        <rect width="400" height="240" fill="url(#twilightGradient)" />
        <defs>
          <linearGradient id="twilightGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b1e36" />
            <stop offset="60%" stopColor="#183659" />
            <stop offset="100%" stopColor="#254d7c" />
          </linearGradient>
        </defs>

        {/* Dynamic Twinkling Stars in dark background */}
        {Array.from({ length: 16 }).map((_, i) => {
          const x = 30 + ((i * 29) % 340);
          const y = 35 + ((i * 13) % 95);
          const size = 1.5 + (i % 2);
          const delay = -0.35 * i;
          return (
            <polygon
              key={i}
              points={`${x},${y-size} ${x+size/2},${y-size/2} ${x+size},${y} ${x+size/2},${y+size/2} ${x},${y+size} ${x-size/2},${y+size/2} ${x-size},${y} ${x-size/2},${y-size/2}`}
              fill="#fff"
              className="twinkle-star"
              style={{ animationDelay: `${delay}s` }}
            />
          );
        })}

        {/* Soft scanning spotlight beams for ballroom look */}
        <polygon points="120,0 280,0 340,240 60,240" fill="url(#spotGlow)" className="spotlight-sweep" />
        <defs>
          <linearGradient id="spotGlow" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Royal scarlet drapes tied with gold cords */}
        <path d="M 0 0 C 65 15, 125 45, 85 185 C 65 225, 0 240, 0 240 Z" fill="#7d1a22" opacity="0.9" />
        <path d="M 400 0 C 335 15, 275 45, 315 185 C 335 225, 400 240, 400 240 Z" fill="#7d1a22" opacity="0.9" />
        
        {/* Curtains Golden ties */}
        <path d="M 44 135 C 50 138, 55 145, 52 150" fill="none" stroke="#eab561" strokeWidth="2.5" />
        <path d="M 356 135 C 350 138, 345 145, 348 150" fill="none" stroke="#eab561" strokeWidth="2.5" />

        {/* Glowing dangling chandelier from top center */}
        <line x1="200" y1="0" x2="200" y2="35" stroke="#9bb1c8" strokeWidth="1.5" />
        <path d="M 175 35 Q 200 55 225 35" fill="none" stroke="#eab561" strokeWidth="2" />
        <circle cx="200" cy="45" r="4" fill="#ffecb3" />
        <circle cx="184" cy="38" r="2.5" fill="#ffecb3" />
        <circle cx="216" cy="38" r="2.5" fill="#ffecb3" />

        {/* Dancing couple silhouettes spinning gracefully */}
        <g transform="translate(145, 100) scale(0.95)" className="couple-bounce">
          {/* Man spinning tux silhouette */}
          <circle cx="44" cy="22" r="6.5" fill="#cee1f5" opacity="0.9" />
          <path d="M 34 29 Q 44 26, 54 29 L 52 82 L 32 82 Z" fill="#183659" />

          {/* Woman elegant spinning dress in white/cream lehenga flare */}
          <circle cx="68" cy="26" r="6.0" fill="#fdf0dd" />
          <path d="M 68 32 Q 62 48, 68 58 L 52 95 C 68 115, 92 115, 102 95 L 82 58 Z" fill="#fdf0dd" opacity="0.95" />
          {/* Traditional design embroidery lace details */}
          <path d="M 46 95 Q 73 110, 100 95" fill="none" stroke="#eab561" strokeWidth="2" />
        </g>
      </svg>

      {/* Decorative Plaque */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#ffecb3]/95 px-5 py-1.5 rounded-full border border-[#eab561]/30 shadow-md">
        <span className="font-serif text-xs font-bold tracking-[0.2em] text-[#511316] uppercase">Sangeet</span>
      </div>
    </div>
  );
}

function ReceptionSVG({ isPlaying }: SVGProps) {
  return (
    <div className="relative overflow-hidden w-full h-48 rounded-t-3xl bg-[#e3eae4]">
      <svg viewBox="0 0 400 240" className="w-full h-full">
        {/* Soft Sunset Jade Gradient */}
        <rect width="400" height="240" fill="url(#sageBackdrop)" />
        <defs>
          <linearGradient id="sageBackdrop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f3f7f2" />
            <stop offset="100%" stopColor="#d1e0d2" />
          </linearGradient>
        </defs>

        {/* Palace balconies and arch silhouettes */}
        <path d="M 0 240 L 0 110 Q 50 90 100 110 L 100 240 Z" fill="#b1c4b2" opacity="0.5" />
        <path d="M 120 240 L 120 90 Q 200 65 280 90 L 280 240 Z" fill="#9db39e" opacity="0.6" />
        <path d="M 300 240 L 300 110 Q 350 90 400 110 L 400 240 Z" fill="#b1c4b2" opacity="0.5" />

        {/* Flying White Doves birds across the horizon */}
        <g className="bird-path-rt">
          <g className="wing-flaps">
            <path d="M -15 -5 C -5 -15, 5 -15, 8 -7 C 5 -3, -5 3, -15 -5 Z" fill="white" />
            <path d="M -15 -5 C -25 -15, -35 -15, -38 -7 C -35 -3, -25 3, -15 -5 Z" fill="white" />
          </g>
          <circle cx="-15" cy="-7" r="2" fill="white" />
        </g>
        <g className="bird-path-lt">
          <g className="wing-flaps" style={{ animationDelay: '-0.15s' }}>
            <path d="M -15 -5 C -5 -15, 5 -15, 8 -7 C 5 -3, -5 3, -15 -5 Z" fill="white" />
            <path d="M -15 -5 C -25 -15, -35 -15, -38 -7 C -35 -3, -25 3, -15 -5 Z" fill="white" />
          </g>
          <circle cx="-15" cy="-7" r="1.8" fill="white" />
        </g>

        {/* Elegant couple silhouettes standing hand-in-hand in palace portal */}
        <g transform="translate(150, 105) scale(0.9)" className="couple-bounce">
          {/* Groom sherwani coat representation */}
          <circle cx="48" cy="28" r="6.5" fill="#4d614d" />
          <path d="M 38 34 C 42 34, 54 34, 58 34 L 58 105 L 38 105 Z" fill="#3c4c3d" />

          {/* Bride looking at him in a gown */}
          <circle cx="68" cy="30" r="5.5" fill="#7a937a" />
          <path d="M 68 36 C 60 48, 76 48, 68 62 L 52 105 L 84 105 Z" fill="#7a937a" />
        </g>

        {/* Rising lanterns floating beautifully */}
        <g className="sway-element" style={{ animationDuration: '5s' }}>
          <circle cx="60" cy="130" r="4" fill="#ffebb3" />
          <rect x="58" y="132" width="4" height="6" fill="#e0ab44" rx="0.5" opacity="0.9" />
        </g>
        <g className="sway-element" style={{ animationDuration: '6.5s', animationDelay: '-1s' }}>
          <circle cx="330" cy="110" r="5.5" fill="#ffebb3" />
          <rect x="327" y="113" width="6" height="8" fill="#e0ab44" rx="0.5" opacity="0.9" />
        </g>
      </svg>

      {/* Decorative Plaque */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#e8efe9]/95 px-5 py-1.5 rounded-full border border-[#7a937a]/30 shadow-md">
        <span className="font-serif text-xs font-bold tracking-[0.2em] text-[#2c3d2e] uppercase">Reception</span>
      </div>
    </div>
  );
}

function MuhurthamSVG({ isPlaying }: SVGProps) {
  return (
    <div className="relative overflow-hidden w-full h-48 rounded-t-3xl bg-[#fbf7f0] border-b border-[#eedfc9]">
      <svg viewBox="0 0 400 240" className="w-full h-full">
        {/* Golden saffron sunrise gradient background */}
        <rect width="400" height="240" fill="url(#mandapGradient)" />
        <defs>
          <linearGradient id="mandapGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffbf7" />
            <stop offset="100%" stopColor="#f3e6d5" />
          </linearGradient>
        </defs>

        {/* Hanging marigold tassels that sway */}
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={i} transform={`translate(${40 + i * 64}, 0)`} className="sway-element" style={{ animationDelay: `${-0.2 * i}s` }}>
            <line x1="0" y1="0" x2="0" y2="120" stroke="#ef8a23" strokeWidth="3" strokeDasharray="5 6" strokeLinecap="round" />
            <line x1="0" y1="3" x2="0" y2="120" stroke="#f6bd25" strokeWidth="1.5" strokeDasharray="3 9" />
            <path d="M -4 120 L 4 120 L 0 132 Z" fill="#425543" />
            <circle cx="0" cy="120" r="4.5" fill="#8d171e" />
          </g>
        ))}

        {/* Sacred yajna havan fire altarpiece base */}
        <path d="M 135 220 L 265 220 L 280 232 L 120 232 Z" fill="#b29b7c" />
        <path d="M 150 208 L 250 208 L 260 220 L 140 220 Z" fill="#a08561" />
        <rect x="170" y="198" width="60" height="10" fill="#8d1e26" rx="1.5" />

        {/* Animated Sacred Fire flames dancing */}
        <g className="sacred-flame">
          <path d="M 175 198 C 175 180, 190 150, 200 142 C 210 150, 225 180, 225 198 Z" fill="#ea7023" />
          <path d="M 185 198 C 185 185, 195 165, 200 155 C 205 165, 215 185, 215 198 Z" fill="#fbb021" />
        </g>

        {/* Floating flower petals swirling inside */}
        {Array.from({ length: 10 }).map((_, i) => {
          const x = 70 + (i * 26) % 260;
          const y = 140 + (i * 12) % 40;
          return (
            <path
              key={i}
              d="M 0 0 C 4 -5, 8 -3, 6 2 C 4 6, -1 4, 0 0"
              fill={i % 2 === 0 ? '#da565c' : '#fbc233'}
              transform={`translate(${x}, ${y}) rotate(${(i * 35) % 180})`}
              className="sway-element"
              style={{ animationDuration: '4.5s', animationDelay: `${-0.3 * i}s` }}
            />
          );
        })}

        {/* Traditional motifs */}
        <circle cx="200" cy="70" r="15" fill="rgba(197, 168, 128, 0.2)" />
        <path d="M 194 70 Q 200 60, 206 70 Q 200 80, 194 70 Z" fill="#c5a880" />
      </svg>

      {/* Decorative Plaque */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#faf6f0]/95 px-5 py-1.5 rounded-full border border-[#c5a880]/30 shadow-md">
        <span className="font-serif text-xs font-bold tracking-[0.2em] text-[#8d1e26] uppercase">Wedding</span>
      </div>
    </div>
  );
}

// 3. Mini Mock Google Map Preview Component
interface MiniMockMapProps {
  venue: string;
  address: string;
}

function MiniMockMap({ venue, address }: MiniMockMapProps) {
  let parkColor = "bg-[#f1f8ee]";
  let landmarkName = "The Ranch Community Park";
  let landmarkMarker = { x: "120", y: "60" };
  let streets = [
    { name: "Chappie Rd", d: "M 0 50 L 400 50" },
    { name: "Pawelczyk Dr", d: "M 100 0 L 100 160" },
    { name: "American River Pkwy", d: "M 0 110 L 400 130", isRiver: true }
  ];

  if (venue.includes("9 Star")) {
    parkColor = "bg-[#faf9f6]";
    landmarkName = "9 Star Bakery";
    landmarkMarker = { x: "240", y: "80" };
    streets = [
      { name: "Cabernet Hill", d: "M 0 80 L 400 80" },
      { name: "Pawelczyk Dr", d: "M 140 0 L 140 160" },
      { name: "Kilbury Way", d: "M 290 0 L 290 160" }
    ];
  } else if (venue.includes("Mirage")) {
    parkColor = "bg-[#f4f6f9]";
    landmarkName = "Mirage Banquet Hall";
    landmarkMarker = { x: "180", y: "70" };
    streets = [
      { name: "El Camino Ave", d: "M 0 70 L 400 70" },
      { name: "Beverly Way", d: "M 180 0 L 180 160" },
      { name: "Village Vista Dr", d: "M 0 130 C 150 130, 250 110, 400 100" }
    ];
  } else if (venue.includes("Gurdwara") || venue.includes("Sacramento")) {
    parkColor = "bg-[#eff5f7]";
    landmarkName = "Gurdwara Sahib";
    landmarkMarker = { x: "210", y: "60" };
    streets = [
      { name: "Evergreen Ave", d: "M 0 60 L 400 60" },
      { name: "Sacramento River", d: "M 310 0 C 330 50, 290 110, 320 160", isRiver: true },
      { name: "Enterprise Blvd", d: "M 140 0 L 140 160" }
    ];
  }

  return (
    <div className="relative overflow-hidden h-40 border border-[#eae0d2]/70 rounded-2xl bg-[#faf6f0] mt-4 shadow-inner" id={`mock-map-${venue.toLowerCase().replace(/\s+/g, '-')}`}>
      {/* Map Backdrop Grid lines */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#e5dec9_1px,transparent_1px),linear-gradient(to_bottom,#e5dec9_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      {/* Park or scenic green layout fields */}
      <div className={`absolute top-4 left-6 w-32 h-20 rounded-full blur-xl opacity-30 ${venue.includes("9 Star") ? 'bg-[#ebd3bd]' : 'bg-[#bfc6ae]'}`} />
      <div className={`absolute bottom-2 right-4 w-40 h-16 rounded-full blur-xl opacity-25 ${venue.includes("Gurdwara") ? 'bg-sky-200' : 'bg-[#cbded1]'}`} />
      
      {/* Rivers & Waterbodies */}
      {streets.map((st, sIdx) => st.isRiver && (
        <svg key={`river-${sIdx}`} className="absolute inset-0 w-full h-full pointer-events-none">
          <path d={st.d} fill="none" stroke="#add8e6" strokeWidth="14" strokeLinecap="round" opacity="0.6" />
          <path d={st.d} fill="none" stroke="#add8e6" strokeWidth="8" strokeLinecap="round" opacity="0.9" />
          <text textAnchor="middle" dy="-8" fill="#5c8a9c" fontSize="8" className="font-sans font-bold tracking-widest uppercase">
            <textPath href={`#river-path-${sIdx}`} startOffset="45%">{st.name}</textPath>
          </text>
          <path id={`river-path-${sIdx}`} d={st.d} fill="none" />
        </svg>
      ))}

      {/* Roads & Streets line networks */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {streets.map((st, sIdx) => !st.isRiver && (
          <g key={`road-${sIdx}`}>
            <path d={st.d} fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
            <path d={st.d} fill="none" stroke="#eae0d2" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" opacity="0.8" />
            {sIdx === 0 && (
              <text fill="#8c7864" fontSize="7" fontWeight="bold" className="font-sans uppercase tracking-[0.15em] opacity-80">
                <textPath href={`#road-path-${sIdx}`} startOffset="15%" dy="-5">{st.name}</textPath>
              </text>
            )}
            {sIdx === 1 && (
              <text fill="#8c7864" fontSize="7" fontWeight="bold" className="font-sans uppercase tracking-[0.15em] opacity-80" transform="rotate(90, 110, 80)">
                <tspan x="110" y="-5">{st.name}</tspan>
              </text>
            )}
            <path id={`road-path-${sIdx}`} d={st.d} fill="none" />
          </g>
        ))}
      </svg>

      {/* Pulsing destination indicator point */}
      <div 
        className="absolute w-8 h-8 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 select-none"
        style={{ left: `${landmarkMarker.x}px`, top: `${landmarkMarker.y}px` }}
      >
        <span className="absolute w-6 h-6 rounded-full bg-[#8d1e26] opacity-35 marker-glow" />
        <span className="absolute w-3 h-3 rounded-full bg-[#8d1e26] border border-white shadow-md" />
        
        {/* Floating location label box */}
        <div className="absolute bottom-4 bg-white/95 backdrop-blur-sm border border-[#eae0d2] text-[#8d1e26] text-[9px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap z-10">
          📍 {landmarkName}
        </div>
      </div>

      {/* Floating maps indicator branding badge */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-full px-2.5 py-1 text-[8px] font-sans font-bold tracking-wider text-gray-500 shadow-sm">
        <span className="text-[#34a853]">G</span>
        <span className="text-[#ea4335]">o</span>
        <span className="text-[#fbbc05]">o</span>
        <span className="text-[#4285f4]">g</span>
        <span className="text-[#34a853]">l</span>
        <span className="text-[#ea4335]">e</span>
        <span className="text-gray-400">Map Preview</span>
      </div>
    </div>
  );
}

export default function TimelineCards() {
  const [isGlobalPlaying, setIsGlobalPlaying] = useState(false);

  // Sync state and listen to external triggers
  useEffect(() => {
    const handleState = (e: any) => {
      setIsGlobalPlaying(e.detail?.isPlaying || false);
    };
    window.addEventListener('wedding-audio-state-changed', handleState);
    
    // Request initial state on mount
    window.dispatchEvent(new CustomEvent('request-wedding-audio-state'));

    return () => {
      window.removeEventListener('wedding-audio-state-changed', handleState);
    };
  }, []);

  const mapIcon = <MapPin className="w-4 h-4 text-[#c5a880]" />;
  const extIcon = <ExternalLink className="w-3.5 h-3.5" />;
  const calendarIcon = <Calendar className="w-4 h-4 text-[#c5a880]" />;
  const clockIcon = <Clock className="w-4 h-4 text-[#c5a880]" />;
  const sparkleIcon = <Sparkles className="w-4 h-4 text-[#c5a880] animate-spin" style={{ animationDuration: '6s' }} />;

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 16,
      },
    },
  };

  const handleSpeakerToggle = (e: any) => {
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent('toggle-wedding-audio'));
  };

  return (
    <section className="w-full max-w-[480px] mx-auto px-5 py-12" id="ceremonies-section">
      <SVGEffectsStyles />
      
      <div className="text-center mb-10">
        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold">
          The Celebrations Unfold
        </span>
        <h2 className="font-script text-5xl text-[#511316] mt-1.5 font-bold">
          Sacred Ceremonies
        </h2>
        <div className="w-12 h-[1px] bg-[#c5a880]/30 mx-auto mt-4" />
      </div>

      <div className="flex flex-col gap-12" id="ceremony-cards-container">
        {ceremoniesData.map((item) => (
          <div key={item.day} className="flex flex-col gap-3">
            {/* Beautiful Day Header above each ceremony template */}
            <div className="flex items-center justify-between px-3 mt-1" id={`ceremony-card-header-${item.day}`}>
              <span className="font-sans text-[10px] tracking-[0.2em] font-extrabold uppercase text-[#8d1e26] bg-[#511316]/5 px-2.5 py-1 rounded">
                DAY {item.day} — {item.dayOfWeek}
              </span>
              <span className="font-mono text-xs text-gray-400 tracking-wider">
                {item.dateKey}
              </span>
            </div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`relative rounded-3xl bg-white border border-[#eae0d2]/70 shadow-[0_10px_35px_rgba(138,98,63,0.06)] overflow-hidden`}
              id={`ceremony-card-day-${item.day}`}
            >
              {/* Top luxury interactive illustrative vector segment */}
              <div className="relative">
                {item.illustration === 'carnival' && <CarnivalSVG isPlaying={isGlobalPlaying} />}
                {item.illustration === 'sangeet' && <SangeetSVG isPlaying={isGlobalPlaying} />}
                {item.illustration === 'reception' && <ReceptionSVG isPlaying={isGlobalPlaying} />}
                {item.illustration === 'muhurtham' && <MuhurthamSVG isPlaying={isGlobalPlaying} />}

                {/* Translucent overlay Speaker button that integrates with global MP3 wedding music */}
                <button
                  onClick={handleSpeakerToggle}
                  className="absolute bottom-3.5 right-3.5 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-black/45 backdrop-blur-md text-white border border-white/20 hover:scale-105 active:scale-95 transition-all shadow-[0_3px_10px_rgba(0,0,0,0.3)] cursor-pointer"
                  title="Toggle romantic music track"
                >
                  {isGlobalPlaying ? (
                    <div className="flex gap-0.5 items-end justify-center w-4 h-4 pb-[2px]">
                      <div className="w-[2px] bg-[#ffecb3] wave-bar-1" />
                      <div className="w-[2px] bg-[#fff] wave-bar-2" />
                      <div className="w-[2px] bg-[#ffecb3] wave-bar-3" />
                    </div>
                  ) : (
                    <VolumeX className="w-4 h-4 text-gray-200" />
                  )}
                </button>
              </div>

              {/* Content area */}
              <div className="p-6">
                {/* Event Name */}
                <h3 className="font-serif text-2xl font-bold text-[#4a3625]">
                  {item.title}
                </h3>
                
                {item.subTitle && (
                  <p className="font-sans text-xs tracking-wider text-[#c5a880] font-medium mt-0.5">
                    {item.subTitle}
                  </p>
                )}

                {/* Details List */}
                <div className="mt-4 space-y-2.5 border-t border-[#eae0d5]/40 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{calendarIcon}</div>
                    <div className="flex-1 text-xs text-gray-600 font-sans leading-relaxed">
                      <strong>Date: </strong>{item.dateLabel}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{clockIcon}</div>
                    <div className="flex-1 text-xs text-gray-600 font-sans leading-relaxed">
                      <strong>Time: </strong>{item.timeLabel}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{sparkleIcon}</div>
                    <div className="flex-1 text-xs text-gray-600 font-sans leading-relaxed">
                      {item.theme}
                    </div>
                  </div>

                  {/* Venue Details */}
                  <div className="flex items-start gap-3 pb-2">
                    <div className="mt-0.5">{mapIcon}</div>
                    <div className="flex-1 text-xs text-gray-600 font-sans leading-relaxed">
                      <strong>Venue: </strong>
                      <span className="block text-gray-800 font-semibold">{item.venueName}</span>
                      <span className="text-gray-400 text-[11px] block mt-0.5">{item.venueAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Maps Trigger CTA button */}
                <div className="mt-5">
                  <a
                    href={item.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full h-11 flex items-center justify-center gap-2 rounded-xl border border-[#c5a880]/40 bg-gradient-to-r from-[#faf5ef] to-white font-sans text-xs font-semibold text-[#8d1e26] shadow-sm hover:border-[#c5a880] hover:from-[#f6ecd9] hover:to-[#faf5ef] hover:-translate-y-0.5 cursor-pointer transition-all active:scale-98"
                    id={`view-map-btn-day-${item.day}`}
                  >
                    VIEW ON MAP
                    {extIcon}
                  </a>

                  {/* High Quality Styled Mock Google Maps Preview block inside card */}
                  <MiniMockMap venue={item.venueName} address={item.venueAddress} />
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* 2. MUHURTHAM DETAILED DAY SCHEDULE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-14 bg-[#fbf7f0] border border-[#eedfc9] rounded-3xl p-6 shadow-sm"
        id="muhurtham-schedule-container"
      >
        <div className="text-center mb-6">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a880] font-bold">
            Muhurtham Day Schedule
          </span>
          <h4 className="font-serif text-xl font-bold text-[#511316] mt-1">
            Saturday, May 30, 2026
          </h4>
          <p className="font-sans text-[11px] text-[#8c745c] mt-1">
            Color theme: <strong className="text-[#5b7a5e]">Sage Green</strong> — All beautiful colors welcome
          </p>
        </div>

        {/* Schedule Timeline Line */}
        <div className="relative border-l border-[#c5a880]/30 ml-4 pl-6 space-y-6">
          {muhurthamTimeline.map((step, idx) => (
            <div key={idx} className="relative" id={`schedule-step-${idx}`}>
              {/* Timeline bubble dot */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-[#c5a880] bg-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8d1e26]" />
              </div>
              
              {/* Step info card */}
              <div className="bg-white/80 border border-[#eae0d2]/50 hover:bg-white rounded-xl p-3 shadow-[0_2px_8px_rgba(138,98,63,0.03)] transition-all">
                <span className="font-mono text-[10px] text-[#c5a880] font-bold block mb-0.5">
                  {step.time}
                </span>
                <span className="font-sans text-xs font-semibold text-[#4a3625] block">
                  {step.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3. TRANSITION THE SACRED LAVAN SCREEN */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-14 text-center px-4"
        id="sacred-lavan-container"
      >
        <span className="font-serif italic text-lg text-[#c5a880] block mb-2">
          The Sacred Lavan
        </span>
        <blockquote className="font-sans text-xs text-gray-500 leading-relaxed italic max-w-sm mx-auto p-4 bg-white/40 border border-[#eae0d2]/35 rounded-2xl shadow-sm">
          "During Anand Karaj, the couple walks four sacred circles around the Guru Granth Sahib Ji — each round deepening their union with each other and with the Divine."
        </blockquote>
      </motion.div>
    </section>
  );
}
