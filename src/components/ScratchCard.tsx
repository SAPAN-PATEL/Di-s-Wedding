/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from 'react';

interface ScratchCardProps {
  label: string; // "MONTH", "DAY", "YEAR"
  value: string; // "May", "30", "2026"
  subText: string; // "Scratch to Reveal"
  onScratched?: () => void;
}

export default function ScratchCard({ label, value, subText, onScratched }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratchedFully, setIsScratchedFully] = useState(false);
  const isDrawing = useRef(false);

  // Initialize Canvas & Paint Glitter Cover
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Sizing canvas to match its container precisely
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Draw elegant gold-pastel metallic cover
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#ebd7b9');
      gradient.addColorStop(0.5, '#dcb88e');
      gradient.addColorStop(1, '#c5a880');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add elegant texture dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = Math.random() * 1.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw "SCRATCH ME" prompt
      ctx.font = 'bold 12px "Inter", sans-serif';
      ctx.fillStyle = '#6e4c25';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText('SCRATCH', canvas.width / 2, canvas.height / 2);
      ctx.font = 'italic 9px "Inter", sans-serif';
      ctx.fillText('░░░░░░░', canvas.width / 2, canvas.height / 2 + 16);
    };

    resizeCanvas();
    // Re-render on component state if needed
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Eraser brush implementation
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratchedFully) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 36;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch progress periodically
    checkScratchPercentage();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
  };

  // Compute scratched pixels ratio
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparent = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) {
        transparent++;
      }
    }

    const total = pixels.length / 4;
    const ratio = transparent / total;

    // If scratched more than 40%, clear fully to reveal perfectly
    if (ratio > 0.40) {
      setIsScratchedFully(true);
      if (onScratched) {
        onScratched();
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center bg-white border border-[#eae0d5] shadow-sm rounded-2xl w-24 h-28 overflow-hidden select-none"
      id={`scratch-${label.toLowerCase()}`}
    >
      {/* Label (e.g. MONTH) */}
      <div className="w-full bg-[#faf5ef] text-center border-b border-[#eae0d5] py-1">
        <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#8c745c]">
          {label}
        </span>
      </div>

      {/* Hidden Content Revealed */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 text-center select-text">
        <span className="font-serif text-2xl font-bold text-[#4a3625]">
          {value}
        </span>
        <span className="font-sans text-[8px] text-[#a08e7a] tracking-wider mt-1 uppercase">
          {subText}
        </span>
      </div>

      {/* Canvas Layer representing scratch cover */}
      {!isScratchedFully && (
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="absolute inset-x-0 bottom-0 top-[23px] w-full h-[calc(100%-23px)] cursor-pointer touch-none scratch-canvas"
          id={`canvas-${label.toLowerCase()}`}
        />
      )}
    </div>
  );
}
