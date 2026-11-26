/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';

import Envelope from './components/Envelope.tsx';
import ScratchCard from './components/ScratchCard.tsx';
import PolaroidGallery from './components/PolaroidGallery.tsx';
import TimelineCards from './components/TimelineCards.tsx';
import PhotoAlbum from './components/PhotoAlbum.tsx';
import RsvpForm from './components/RsvpForm.tsx';
import AudioPlayer from './components/AudioPlayer.tsx';
import FlowerSprinkler from './components/FlowerSprinkler.tsx';

// Simple decorative floating flower petals type
interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [playRequested, setPlayRequested] = useState(false);
  const [userName, setUserName] = useState('');
  const [petals, setPetals] = useState<Petal[]>([]);

  // Track progress of the scratch cards
  const [scratched, setScratched] = useState({
    MONTH: false,
    DAY: false,
    YEAR: false,
  });

  const allScratched = scratched.MONTH && scratched.DAY && scratched.YEAR;

  // Ticking countdown clock mathematical calculations
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate dynamic countdown (targeting future celebration date February 2, 2027)
  useEffect(() => {
    const targetDate = new Date('2027-02-02T00:00:00-08:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate beautiful floating romantic gold petals once app is opened
  useEffect(() => {
    if (!isOpened) return;
    const items: Petal[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // random lateral percentage
      delay: Math.random() * 8, // random staggering
      duration: 6 + Math.random() * 6, // slow fall duration
      size: 6 + Math.random() * 12, // random petal diameters
    }));
    setPetals(items);
  }, [isOpened]);

  const handleRsvpSuccess = (name: string) => {
    setUserName(name);
  };

  return (
    <div className="relative min-h-screen bg-[#faf7f4] flex justify-center items-start overflow-x-clip font-sans selection:bg-[#dfd3c3]/70 selection:text-[#511316]">
      {/* Background soft textures */}
      <div className="absolute inset-0 bg-[#f7f2ed] opacity-35 bg-[radial-gradient(#eedfc9_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Real-time Wedding MP3 Music Player (Floating Controller) */}
      <AudioPlayer playRequested={playRequested} isOpened={isOpened} />


      {/* 1. Envelope opening screen */}
      <AnimatePresence>
        {!isOpened && (
          <Envelope onOpened={() => setIsOpened(true)} onPlayAudio={() => setPlayRequested(true)} />
        )}
      </AnimatePresence>

      {/* Floating flower petals simulation */}
      {isOpened && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-30" id="petal-container">
          {petals.map((pt) => (
            <div
              key={pt.id}
              className="absolute bg-gradient-to-br from-[#f2ccd3]/50 to-[#ebd195]/40 rounded-full blur-[0.5px]"
              style={{
                left: `${pt.left}%`,
                top: '-20px',
                width: `${pt.size}px`,
                height: `${pt.size * 0.7}px`,
                animation: `fall ${pt.duration}s linear infinite`,
                animationDelay: `${pt.delay}s`,
                transform: 'rotate(45deg)',
              }}
            />
          ))}
          {/* Custom micro-animation for floating flower petals */}
          <style>{`
            @keyframes fall {
              0% {
                top: -20px;
                transform: translateX(0) rotate(0deg) scale(1);
                opacity: 0;
              }
              10% {
                opacity: 0.8;
              }
              90% {
                opacity: 0.8;
              }
              100% {
                top: 100%;
                transform: translateX(60px) rotate(360deg) scale(0.6);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}

      {/* 2. Main Page Layout Wrapper */}
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full max-w-[480px] bg-white min-h-screen shadow-[0_0_60px_rgba(138,98,63,0.18)] border-x border-[#eedfc9]/40 pb-20 flex flex-col justify-start z-10"
          id="main-invitation-container"
        >
          {/* Audio Player float sits in the active document layer, managed globally */}

          {/* ============ HERO SECTION ============ */}
          <header className="relative w-full text-center px-6 pt-16 pb-12 bg-gradient-to-b from-[#fbfbf8] to-white" id="hero-header">
            {/* Elegant Hindu "Om" Symbol & Lord Ganesha at the top */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center gap-3">
                
                <img
                  src="/assets/aistudio/Golden_Om_Mandala_Emblem-removebg-preview_4bafa58b.png"
                  alt="Om Mandala"
                  className="w-10 h-10 object-contain drop-shadow-sm select-none"
                  id="om-symbol"
                />
                <div className="w-[1px] h-6 bg-[#c5a880]/30" />
                <img
                  src="/assets/aistudio/Golden_Ganesha_on_Black_8136df1c.png"
                  alt="Lord Ganesha"
                  className="w-10 h-10 object-contain drop-shadow-sm select-none"
                  id="ganesha-hero-img"
                />
              </div>
              <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a880]/50 to-transparent mx-auto mt-2.5" />
            </div>

            {/* Wedding Quote header */}
            <div className="max-w-[320px] mx-auto mb-8 px-4 py-3 border-y border-[#eae0d2]/40">
              <p className="font-serif italic text-xs text-gray-400 capitalize tracking-wider leading-relaxed">
                "They alone are called husband and wife, who have one soul in two bodies."
              </p>
              <span className="block font-sans text-[9px] uppercase tracking-widest text-[#c5a880] font-semibold mt-1.5">
                — Guru Amar Das Ji
              </span>
            </div>

            {/* Bride & Groom names */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-serif text-3xl font-normal text-[#511316] tracking-wider mb-2"
              id="couple-names-header"
            >
              Dhruv & Krishna
            </motion.h1>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold mb-8">
              A Sacred Union
            </p>

            {/* Main Picture of the couple with premium floral frames */}
            <div className="relative w-72 h-80 mx-auto rounded-t-full rounded-b-3xl border-[6px] border-[#faf5ef] shadow-lg overflow-hidden bg-[#faf8f5]">
              {/* Gold floral wreath border around image */}
              <div className="absolute inset-0 border border-[#c5a880]/30 rounded-t-full rounded-b-3xl m-2 pointer-events-none" />
              
              <img
                src="src/assets/images/Photo-1.JPG"
                alt="Dhruv & Krishna"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[8%] brightness-[102%] hover:scale-105 transition-transform duration-700"
                id="hero-couple-photo"
              />
              {/* Highlight shimmer */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#511316]/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Wedding description intro */}
            <div className="max-w-xs mx-auto mt-10">
              <p className="font-serif italic no-underline text-sm text-[#4a3625] leading-relaxed">
                We are tying the knot! Join us as we celebrate our love and new journey together.
              </p>
              
            </div>

            {/* Scroll Indicator */}
            <div className="mt-12 flex flex-col justify-center items-center gap-1.5">
              <span className="font-sans text-[9px] uppercase tracking-widest font-semibold text-gray-300">
                SCROLL TO REVEAL
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="text-[#c5a880]"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>
          </header>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#eae0d2]/70 to-transparent" />

          {/* ============ SAVE THE DATE SECTION ============ */}
          <section className="relative w-full text-center px-6 py-12 bg-white overflow-hidden" id="save-the-date-section">
            {allScratched && <FlowerSprinkler />}
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold relative z-10">
              The Wedding Announcement <br />
            </span>

            <h2 className="font-script text-5xl text-[#511316] mt-1 mb-2 relative z-10">
             <br /> Save the Date
            </h2>
            <p className="font-serif italic text-xs text-gray-400 mb-8 max-w-[280px] mx-auto leading-relaxed relative z-10">
              Scratch cards below with your touch or cursor to reveal our celestial wedding date
            </p>

            {/* The 3 Scratchable Cards side by side */}
            <div className="flex justify-center gap-3.5 relative z-10" id="scratch-cards-grid">
              <ScratchCard label="MONTH" value="Feb" subText="♥ scratch" onScratched={() => setScratched(p => ({ ...p, MONTH: true }))} />
              <ScratchCard label="DAY" value="02" subText="♥ scratch" onScratched={() => setScratched(p => ({ ...p, DAY: true }))} />
              <ScratchCard label="YEAR" value="2027" subText="♥ scratch" onScratched={() => setScratched(p => ({ ...p, YEAR: true }))} />
            </div>
          </section>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#eae0d2]/70 to-transparent" />

          {/* ============ EVENT COUNTDOWN TIMER PANEL ============ */}
          <AnimatePresence>
            {allScratched && (
              <motion.section
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full bg-[#fbfbf8] px-6 py-12 text-center overflow-hidden border-b border-[#eae0d2]/40"
                id="countdown-section"
              >
                <FlowerSprinkler />
                <div className="max-w-xs mx-auto mb-6 p-4 rounded-2xl bg-[#eef5ed]/50 border border-[#cfe2cf]/40 relative z-10">
                  <span className="font-serif italic text-sm text-[#5b7a5e] block">
                    A lifetime of togetherness begins
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-gray-400 mt-1 block">
                    with one sacred step
                  </span>
                </div>

                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#c5a880] font-bold block mb-4 relative z-10">
                  Celebration Countdown
                </span>

                {/* Timer Block boxes */}
                <div className="flex justify-center gap-2.5 max-w-[340px] mx-auto relative z-10" id="countdown-timer-grid">
                  <div className="flex-1 bg-white border border-[#eae0d2]/50 p-2.5 rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300" id="timer-days">
                    <span className="font-serif text-2xl font-bold text-[#8d1e26] block">
                      {timeLeft.days.toString().padStart(2, '0')}
                    </span>
                    <span className="font-sans text-[9px] text-gray-400 uppercase tracking-widest font-bold">Days</span>
                  </div>
                  <div className="flex-1 bg-white border border-[#eae0d2]/50 p-2.5 rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300" id="timer-hours">
                    <span className="font-serif text-2xl font-bold text-[#8d1e26] block">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </span>
                    <span className="font-sans text-[9px] text-gray-400 uppercase tracking-widest font-bold">Hours</span>
                  </div>
                  <div className="flex-1 bg-white border border-[#eae0d2]/50 p-2.5 rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300" id="timer-mins">
                    <span className="font-serif text-2xl font-bold text-[#8d1e26] block">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </span>
                    <span className="font-sans text-[9px] text-gray-400 uppercase tracking-widest font-bold">Mins</span>
                  </div>
                  <div className="flex-1 bg-white border border-[#eae0d2]/50 p-2.5 rounded-2xl shadow-sm hover:scale-105 transition-transform duration-300" id="timer-secs">
                    <span className="font-serif text-2xl font-bold text-[#8d1e26] block">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </span>
                    <span className="font-sans text-[9px] text-gray-400 uppercase tracking-widest font-bold">Secs</span>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {!allScratched && (
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#eae0d2]/70 to-transparent" />
          )}

          {/* ============ OUR STORY SECTION ============ */}
          <PolaroidGallery />

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#eae0d2]/70 to-transparent" />

          {/* ============ CEREMONIES DETAIL TIME SECTION ============ */}
          <TimelineCards />

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#eae0d2]/70 to-transparent" />

          {/* ============ PHOTO ALBUM SLIDER SECTION ============ */}
          <PhotoAlbum />

          {/* ============ RSVP SECTION (Commented out) ============ */}
          {/* <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#eae0d2]/70 to-transparent" /> */}
          {/* <RsvpForm onSuccess={handleRsvpSuccess} /> */}

          {/* ============ BLESSINGS & FOOTER CARD SCREEN ============ */}
          <footer className="px-5 mt-6 pb-8 text-center" id="invitation-footer">
            <div className="bg-[#2e4d31] text-white p-8 rounded-[40px] shadow-lg relative overflow-hidden" id="footer-green-block">
              {/* Background elegant abstract pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#dfd3c3_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

              {/* Om and Lord Ganesha Auspicious Symbols */}
              <div className="flex items-center justify-center gap-4 mb-4" id="footer-auspicious-symbols">
                <img
                  src="/assets/aistudio/Golden_Om_Mandala_Emblem-removebg-preview_4bafa58b.png"
                  alt="Om Mandala"
                  className="w-10 h-10 object-contain drop-shadow-sm select-none brightness-110"
                  id="footer-om-symbol"
                />
                <div className="w-[1px] h-6 bg-[#dfd3c3]/20" />
                <div className="flex flex-col items-center" id="footer-ganesha-symbol" title="Lord Ganesha">
                  <img
                    src="/assets/aistudio/Golden_Ganesha_on_Black_8136df1c.png"
                    alt="Lord Ganesha"
                    className="w-10 h-10 object-contain drop-shadow-sm select-none"
                  />
                </div>
              </div>

              {/* DIVINE BLESSINGS */}
              <p className="font-serif italic text-xs text-[#dfd3c3]/90 leading-relaxed max-w-[280px] mx-auto mb-6">
                "Sealed with sacred vows, blessed by two loving families, and guided by divine grace — we begin our forever with grateful and joyful hearts."
              </p>

              <p className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-[#dfd3c3]/70 mb-8">
                We cannot wait to celebrate this beautiful chapter.
              </p>

              {/* signatures */}
              <h3 className="font-script text-4xl text-[#dfd3c3] tracking-wider mb-2">
                Dhruv & Krishna
              </h3>
              
              <div className="w-12 h-[1px] bg-[#dfd3c3]/20 mx-auto my-3" />

              
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
}
