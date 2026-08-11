/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const albumPhotos = [
  {
    id: 1,
    url: 'src/assets/images/Photo-1.JPG',
    title: 'The Pre-Wedding Shoot',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?q=80&w=600&auto=format&fit=crop',
    title: 'Elegance & Tradition',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop',
    title: 'Laughter & Joy',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
    title: 'The Promises We Keep',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=600&auto=format&fit=crop',
    title: 'In To The Sunset',
  },
];

export default function PhotoAlbum() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % albumPhotos.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + albumPhotos.length) % albumPhotos.length);
  };

  return (
    <section className="w-full max-w-[480px] mx-auto px-5 py-12 text-center" id="photo-album-section">
      <div className="mb-8">
        <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-[#c5a880]" />
          Memory Gallery
        </span>
        <h2 className="font-script text-5xl text-[#511316] mt-1">
          Photo Album
        </h2>
        <p className="font-sans text-[11px] text-gray-400 mt-2">
          Swipe or click arrows to browse our sweet moments
        </p>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative h-[300px] w-full flex items-center justify-center overflow-hidden" id="carousel-viewport">
        <div className="absolute inset-x-0 flex items-center justify-center gap-1 transition-all">
          {albumPhotos.map((photo, index) => {
            // Calculate relative offset representing circular arrangement
            const offset = (index - activeIndex + albumPhotos.length) % albumPhotos.length;
            
            // Render only cards that are active or adjacent
            const isVisible = offset === 0 || offset === 1 || offset === albumPhotos.length - 1;
            if (!isVisible) return null;

            // Determine classes & scales for overlaps
            let positionClasses = 'scale-100 z-20 opacity-100';
            let rotation = 0;
            let blurClass = 'blur-0';

            if (offset === 1) {
              // Right Card
              positionClasses = 'translate-x-[110px] scale-80 z-10 opacity-40';
              rotation = 6;
              blurClass = 'blur-[2px]';
            } else if (offset === albumPhotos.length - 1) {
              // Left Card
              positionClasses = '-translate-x-[110px] scale-80 z-10 opacity-40';
              rotation = -6;
              blurClass = 'blur-[2px]';
            }

            return (
              <motion.div
                key={photo.id}
                style={{ rotate: rotation }}
                animate={{
                  scale: offset === 0 ? 1 : 0.85,
                  x: offset === 0 ? 0 : offset === 1 ? 120 : -120,
                  opacity: offset === 0 ? 1 : 0.45,
                  zIndex: offset === 0 ? 30 : 10,
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 18 }}
                onClick={() => setActiveIndex(index)}
                className={`absolute w-[180px] aspect-[3/4] bg-white p-3 rounded-2xl border border-[#eae0d2] shadow-lg cursor-pointer flex flex-col justify-between ${blurClass}`}
                id={`carousel-slide-${photo.id}`}
              >
                {/* Photo container */}
                <div className="relative flex-1 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none"
                  />
                  {/* Sheen reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/10" />
                </div>

                {/* Subtitle */}
                <div className="mt-2 text-center">
                  <span className="font-sans text-[9px] uppercase font-bold tracking-wider text-[#8c745c] truncate block">
                    {photo.title}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          onClick={handlePrev}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#eae0d2] shadow-sm text-gray-500 hover:text-[#8d1e26] hover:bg-[#faf5ef] active:scale-90 transition-all cursor-pointer"
          id="carousel-prev-btn"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="font-mono text-xs text-[#c5a880] w-12 font-semibold">
          {activeIndex + 1} / {albumPhotos.length}
        </span>

        <button
          onClick={handleNext}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-[#eae0d2] shadow-sm text-gray-500 hover:text-[#8d1e26] hover:bg-[#faf5ef] active:scale-90 transition-all cursor-pointer"
          id="carousel-next-btn"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
