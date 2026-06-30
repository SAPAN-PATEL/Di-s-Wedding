/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface EnvelopeProps {
  onOpened: () => void;
  onPlayAudio?: () => void;
}

export default function Envelope({ onOpened, onPlayAudio }: EnvelopeProps) {
  const [isTapped, setIsTapped] = useState(false);
  const [isAppOpened, setIsAppOpened] = useState(false);

  const handleTap = () => {
    if (isTapped) return;
    setIsTapped(true);
    
    // Play romantic background song immediately when clicking the wax seal
    if (onPlayAudio) {
      onPlayAudio();
    }
    
    // Step-by-step classic envelope opening sequence:
    // 1. Wax seal lifts & opens
    // 2. Flap unfolds upwards (after 600ms)
    // 3. Main card slides upwards and blooms (after 1200ms)
    setTimeout(() => {
      setIsAppOpened(true);
      setTimeout(() => {
        onOpened();
      }, 700);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c080a] p-4 text-white overflow-hidden">
      {/* Decorative Traditional Indian Floral Background Ornaments */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      <AnimatePresence>
        {!isAppOpened && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, y: -50 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-[420px] aspect-[3/4] flex flex-col justify-between items-center p-8 rounded-3xl bg-[#80141a] border-4 border-[#c5a880]/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            id="envelope-container"
          >
            {/* Elegant Golden Floral Corner Ornaments */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#c5a880]/60 rounded-tl-xl pointer-events-none" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#c5a880]/60 rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#c5a880]/60 rounded-bl-xl pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#c5a880]/60 rounded-br-xl pointer-events-none" />

            {/* UPPER PANEL: Invitation Text */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full text-center mt-6"
            >
              <h2 className="font-script text-4xl text-[#dfd3c3] tracking-wider mb-2 animate-pulse">
                Tap to Reveal
              </h2>
              <div className="w-16 h-[1px] bg-[#c5a880]/40 mx-auto my-3" />
            </motion.div>

            {/* CENTER PANEL: Wax Seal Interactivity */}
            <div className="relative flex items-center justify-center my-6">
              {/* Outer Glowing Pulsing Ring */}
              <motion.div
                animate={isTapped ? { scale: 1.4, opacity: 0 } : { scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="absolute w-44 h-44 rounded-full border border-[#c5a880] pointer-events-none"
              />

              {/* Wax Seal Monogram Trigger - Enlarged to beautifully frame D&K with no truncation */}
              <motion.button
                onClick={handleTap}
                disabled={isTapped}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                animate={isTapped ? { 
                  scale: 0, 
                  rotate: 180,
                  y: -100, 
                  opacity: 0,
                  transition: { duration: 0.8, ease: 'backIn' } 
                } : { y: 0 }}
                className="relative z-10 w-36 h-36 flex items-center justify-center rounded-full bg-gradient-to-br from-[#dfc8a5] via-[#c5a880] to-[#99794e] font-serif font-bold text-3xl text-[#511316] shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.4)] cursor-pointer active:brightness-95 border border-[#dfc8a5]"
                style={{ transformStyle: 'preserve-3d' }}
                id="wax-seal"
              >
                {/* Traditional Wax Seal Texture Details */}
                <span className="absolute inset-3 border border-[#80141a]/20 rounded-full flex items-center justify-center">
                  <span className="font-script text-6xl tracking-normal mt-1.5 text-[#40080b]">D&K</span>
                </span>
                
                {/* Highlight line */}
                <div className="absolute top-2 left-6 w-24 h-10 bg-white/20 rounded-full blur-[1.5px] -rotate-12 pointer-events-none" />
              </motion.button>
            </div>

            {/* LOWER PANEL: Footer Blessings */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-full text-center mb-6"
            >
              <p className="font-sans text-xs tracking-[0.25em] uppercase text-[#dfd3c3]/85">
                To new beginnings...
              </p>
              <p className="font-sans text-[10px] text-[#dfd3c3]/50 mt-1 uppercase tracking-widest">
                Dhruv & Krishna Wedding
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
