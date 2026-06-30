/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';

interface SprinklingItem {
  id: number;
  left: number; // 0 to 100%
  top: number; // negative start
  size: number; // in pixels
  delay: number; // in seconds
  duration: number; // in seconds
  type: 'rose-red' | 'rose-pink' | 'marigold' | 'jasmine' | 'whole-flower';
  spinSpeed: number; // rotation duration
  drift: number; // horizontal offset amplitude
}

export default function FlowerSprinkler() {
  const [items, setItems] = useState<SprinklingItem[]>([]);

  useEffect(() => {
    // Generate a beautiful, rich assortment of 36 sprinkling flowers/petals
    const generated: SprinklingItem[] = Array.from({ length: 36 }).map((_, i) => {
      const types: SprinklingItem['type'][] = ['rose-red', 'rose-pink', 'marigold', 'jasmine', 'whole-flower'];
      const type = types[i % types.length];
      
      return {
        id: i,
        left: Math.random() * 95, // avoid sticking too tight to right boundary
        top: -(20 + Math.random() * 60), // staggered starting vertical heights
        size: type === 'whole-flower' ? 14 + Math.random() * 8 : 10 + Math.random() * 8,
        delay: Math.random() * 4, // initial staggered delay
        duration: 4 + Math.random() * 3.5, // nice elegant graceful drop speeds
        type,
        spinSpeed: 2 + Math.random() * 4, // spin speed in seconds
        drift: -50 + Math.random() * 100, // drift pixel range
      };
    });

    setItems(generated);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-20" id="flower-sprinkler-overlay">
      {items.map((item) => {
        // Render different elegant SVG paths based on the flower/petal type
        let svgContent = null;
        if (item.type === 'rose-red') {
          svgContent = (
            <path
              d="M 6 0 C 13 -2, 17 4, 13 12 C 9 18, 1 15, 0 10 C -1 6, 1 2, 6 0"
              fill="url(#roseRedGrad)"
            />
          );
        } else if (item.type === 'rose-pink') {
          svgContent = (
            <path
              d="M 5 0 C 11 -2, 14 3, 11 10 C 8 15, 1 13, 0 9 C -1 5, 1 2, 5 0"
              fill="url(#rosePinkGrad)"
            />
          );
        } else if (item.type === 'marigold') {
          svgContent = (
            <path
              d="M 4 0 C 9 -1, 10 4, 8 8 C 5 11, -1 9, 0 6 C 0 3, 1 1, 4 0"
              fill="url(#marigoldGrad)"
            />
          );
        } else if (item.type === 'jasmine') {
          // A cute high-quality white-yellow small jasmine blossom
          svgContent = (
            <g>
              <circle cx="5" cy="5" r="2" fill="#efcb68" />
              <path d="M 5 1 L 5 5 Z M 5 5 L 8 5 Z M 5 5 L 5 8 Z M 5 5 L 2 5 Z" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 5 5 L 7 7 Z M 5 5 L 3 3 Z M 5 5 L 7 3 Z M 5 5 L 3 7 Z" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          );
        } else {
          // A whole miniature beautiful marigold cartoonish complete flower star
          svgContent = (
            <g transform="scale(0.8)">
              {/* Petals */}
              <circle cx="8" cy="8" r="4" fill="#ef8d23" />
              <circle cx="8" cy="3" r="3" fill="#fbc233" />
              <circle cx="13" cy="8" r="3" fill="#fbc233" />
              <circle cx="8" cy="13" r="3" fill="#fbc233" />
              <circle cx="3" cy="8" r="3" fill="#fbc233" />
              <circle cx="4.5" cy="4.5" r="3" fill="#f6bd25" />
              <circle cx="11.5" cy="4.5" r="3" fill="#f6bd25" />
              <circle cx="11.5" cy="11.5" r="3" fill="#f6bd25" />
              <circle cx="4.5" cy="11.5" r="3" fill="#f6bd25" />
              {/* Center disc */}
              <circle cx="8" cy="8" r="2.5" fill="#e07216" />
            </g>
          );
        }

        return (
          <div
            key={item.id}
            className="absolute sprinkler-petal pointer-events-none"
            style={{
              left: `${item.left}%`,
              top: `${item.top}px`,
              width: `${item.size}px`,
              height: `${item.size}px`,
              animationName: 'sprinkle-down',
              animationDuration: `${item.duration}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDelay: `${item.delay}s`,
              transformStyle: 'preserve-3d',
            }}
          >
            <svg
              viewBox="0 0 16 16"
              className="w-full h-full"
              style={{
                animationName: 'sprinkle-spin',
                animationDuration: `${item.spinSpeed}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
              }}
            >
              <defs>
                <linearGradient id="roseRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
                <linearGradient id="rosePinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#be185d" />
                </linearGradient>
                <linearGradient id="marigoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbc233" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
              </defs>
              {svgContent}
            </svg>
          </div>
        );
      })}

      {/* Embedded High-performance CSS keyframe scripts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes sprinkle-down {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          8% {
            opacity: 0.95;
          }
          90% {
            opacity: 0.95;
          }
          100% {
            transform: translateY(420px) translateX(45px) scale(0.65);
            opacity: 0;
          }
        }
        @keyframes sprinkle-spin {
          0% {
            transform: rotate(0deg) rotateY(0deg);
          }
          100% {
            transform: rotate(360deg) rotateY(360deg);
          }
        }
      `}} />
    </div>
  );
}
