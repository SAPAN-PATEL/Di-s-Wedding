/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { polaroidsData } from '../data.ts';

export default function PolaroidGallery() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95, rotate: -3 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotate: 0,
      transition: { 
        type: 'spring',
        stiffness: 80,
        damping: 15,
      } 
    },
  };

  return (
    <section className="w-full max-w-[480px] mx-auto px-6 py-12 text-center bg-white" id="our-story-section">
      {/* Decorative subtitle */}
      <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold">
        A glimpse of our journey
      </span>
      
      {/* Elegantly styled title */}
      <h2 className="font-script text-5xl text-[#511316] mt-1 mb-6">
        Our Story
      </h2>

      {/* Narrative grid / stacked cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="flex flex-col gap-14 mt-10"
        id="polaroid-container"
      >
        {polaroidsData.map((item, index) => {
          // Alternative rotations for playful physical polaroid feel
          const rotationAngle = index % 2 === 0 ? 'rotate-2' : '-rotate-2';
          
          return (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
              style={{ rotate: index % 2 === 0 ? 1 : -1.5 }}
              className={`relative bg-white p-4 border border-[#e5dcd2] shadow-md rounded-2xl ${rotationAngle} transition-shadow duration-300 hover:shadow-[0_15px_30px_rgba(138,98,63,0.18)] max-w-[360px] mx-auto`}
              id={`polaroid-card-${item.id}`}
            >
              {/* Photo Area with standard refererPolicy safe images */}
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#faf8f5] border border-[#f0eae1]">
                <img
                  src={item.image}
                  alt={item.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[15%] contrast-[105%] hover:scale-105 hover:grayscale-0 transition-all duration-700"
                  id={`polaroid-image-${item.id}`}
                />
                
                {/* Traditional Polaroid Photo sheen highlight overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/5 pointer-events-none" />
              </div>

              {/* Tag marker e.g., HOW IT STARTED */}
              <div className="mt-4 flex justify-between items-center px-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#c5a880] font-sans">
                  {item.tag}
                </span>
                <span className="text-[10px] font-mono text-gray-400">
                  {`0${index + 1}`}
                </span>
              </div>

              {/* Short Story explanation above handwritten caption */}
              <p className="mt-2 text-xs font-sans text-left text-gray-500 leading-relaxed italic px-1">
                {item.desc}
              </p>

              {/* Hand-written Cursive Caption */}
              <div className="mt-5 border-t border-[#eae0d4]/40 pt-3 text-center">
                <h3 className="font-brush text-3xl text-[#8d1e26] tracking-wide">
                  {item.caption}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
