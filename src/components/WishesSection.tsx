/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Send, MessageCircleHeart, CheckCircle2, User, Flame } from 'lucide-react';
import { WishItem } from '../types.ts';
import { initialWishes } from '../data.ts';

const EMOJI_OPTIONS = ['🌸', '❤️', '✨', '🥂', '🙏', '💍'];

const RELATIONSHIP_OPTIONS = [
  'Well Wisher',
  "Bride's Family",
  "Groom's Family",
  'Friend of Bride',
  'Friend of Groom',
  'Colleague',
];

const QUICK_BLESSING_CHIPS = [
  'Wishing you a lifetime of love & laughter! ✨',
  'Sada Suhagan Raho! May God bless you both 🌸',
  'May Lord Ganesha guide your sacred journey 🕉️',
  'Cheers to forever & endless adventures! 🥂',
  'So thrilled to celebrate your special union! ❤️',
];

export default function WishesSection() {
  const [wishes, setWishes] = useState<WishItem[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_wishes_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return initialWishes;
  });

  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState("Well Wisher");
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🌸');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [filter, setFilter] = useState<'all' | 'popular'>('all');
  const [likedWishIds, setLikedWishIds] = useState<Record<string, boolean>>({});

  // Persist to local storage to preserve current guestbook additions
  useEffect(() => {
    try {
      localStorage.setItem('wedding_wishes_state', JSON.stringify(wishes));
    } catch {
      // Ignore
    }
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newWish: WishItem = {
        id: `wish-${Date.now()}`,
        name: name.trim(),
        relationship,
        message: message.trim(),
        emoji: selectedEmoji,
        timestamp: 'Just now',
        likes: 1,
        isNew: true,
      };

      setWishes((prev) => [newWish, ...prev]);
      setName('');
      setMessage('');
      setIsSubmitting(false);
      setShowSuccessBanner(true);

      setTimeout(() => {
        setShowSuccessBanner(false);
      }, 5000);
    }, 600);
  };

  const handleLike = (id: string) => {
    const isCurrentlyLiked = likedWishIds[id];
    setLikedWishIds((prev) => ({ ...prev, [id]: !isCurrentlyLiked }));

    setWishes((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          return {
            ...w,
            likes: isCurrentlyLiked ? Math.max(0, w.likes - 1) : w.likes + 1,
          };
        }
        return w;
      })
    );
  };

  const displayedWishes = [...wishes].sort((a, b) => {
    if (filter === 'popular') {
      return b.likes - a.likes;
    }
    return 0; // Default order (most recent first)
  });

  return (
    <section className="w-full max-w-[480px] mx-auto px-4 sm:px-5 py-12" id="wishes-section">
      {/* Section Header */}
      <div className="text-center mb-8">
        <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#c5a880] font-semibold block">
          WORDS OF LOVE & BLESSINGS
        </span>
        <h2 className="font-script text-5xl md:text-6xl text-[#511316] mt-1 font-normal tracking-wide">
          Guest Wishes
        </h2>
        <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a880]/60 to-transparent mx-auto mt-3" />
        <p className="font-sans text-xs text-gray-500 max-w-[320px] mx-auto mt-3 leading-relaxed">
          Share your heartfelt blessings, memories, or joyful advice for Dhruv & Krishna to cherish forever.
        </p>
      </div>

      {/* Main Wishes Card Container */}
      <div className="bg-white rounded-3xl border border-[#eae0d2] shadow-[0_8px_30px_rgba(138,98,63,0.06)] overflow-hidden">
        {/* Form Container */}
        <div className="p-6 bg-gradient-to-b from-[#faf6f0]/70 to-white border-b border-[#eae0d2]/70">
          <div className="flex items-center gap-2 mb-4 text-[#8d1e26]">
            <MessageCircleHeart className="w-5 h-5 text-[#8d1e26]" />
            <span className="font-serif text-base font-bold text-[#4a3625]">
              Write a Blessing
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Guest Name & Relationship Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="wish-name-input" className="block text-[11px] font-sans font-semibold text-gray-600 mb-1">
                  Your Name *
                </label>
                <div className="relative">
                  <input
                    id="wish-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Priya & Rahul"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#eae0d2] bg-white focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] text-gray-800 placeholder-gray-400 transition-all"
                  />
                  <User className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3" />
                </div>
              </div>

              <div>
                <label htmlFor="wish-rel-input" className="block text-[11px] font-sans font-semibold text-gray-600 mb-1">
                  Relationship
                </label>
                <select
                  id="wish-rel-input"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#eae0d2] bg-white focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] text-gray-800 transition-all cursor-pointer"
                >
                  {RELATIONSHIP_OPTIONS.map((rel) => (
                    <option key={rel} value={rel}>
                      {rel}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Inspiration Chips */}
            <div>
              <span className="block text-[10px] font-sans uppercase tracking-wider text-gray-400 font-semibold mb-1.5">
                Quick Inspiration (Tap to add)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_BLESSING_CHIPS.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMessage(chip)}
                    className="text-[10px] font-sans px-2.5 py-1 rounded-full bg-white border border-[#eae0d2] hover:border-[#c5a880] text-gray-600 hover:text-[#8d1e26] transition-all cursor-pointer shadow-xs active:scale-95 text-left"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="wish-message-input" className="text-[11px] font-sans font-semibold text-gray-600">
                  Your Message or Blessing *
                </label>
                <span className="text-[10px] text-gray-400">
                  {message.length}/250
                </span>
              </div>
              <textarea
                id="wish-message-input"
                required
                maxLength={250}
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your prayers, well wishes, or advice here..."
                className="w-full text-xs p-3.5 rounded-xl border border-[#eae0d2] bg-white focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] text-gray-800 placeholder-gray-400 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Emoji Reaction Selector */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="block text-[10px] font-sans uppercase tracking-wider text-gray-400 font-semibold mb-1">
                  Choose Blessing Motif
                </span>
                <div className="flex gap-1.5">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all cursor-pointer ${
                        selectedEmoji === emoji
                          ? 'bg-[#511316] scale-110 shadow-xs'
                          : 'bg-white border border-[#eae0d2] hover:bg-gray-50'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !message.trim()}
                className="mt-3 px-5 py-2.5 rounded-full bg-[#511316] hover:bg-[#6b1e22] disabled:opacity-50 disabled:cursor-not-allowed text-[#dfd3c3] hover:text-white font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <span>Post Wish</span>
                    <Send className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Success Banner */}
          <AnimatePresence>
            {showSuccessBanner && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 rounded-xl bg-[#eef5ed] border border-[#cfe2cf] flex items-center gap-2.5 text-[#2e4d31] text-xs font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-[#34a853] shrink-0" />
                <span>Your blessing has been posted to the couple's guestbook below!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wishes List Feed Header */}
        <div className="p-4 px-6 bg-white border-b border-[#eae0d2]/50 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-sm font-bold text-[#4a3625]">
              Guestbook
            </span>
            <span className="font-sans text-[10px] font-bold text-[#8d1e26] bg-[#8d1e26]/10 px-2 py-0.5 rounded-full">
              {wishes.length} Wishes
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-full font-sans text-[10px] font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#511316] text-[#dfd3c3]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => setFilter('popular')}
              className={`px-2.5 py-1 rounded-full font-sans text-[10px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                filter === 'popular'
                  ? 'bg-[#511316] text-[#dfd3c3]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Flame className="w-2.5 h-2.5" />
              <span>Most Loved</span>
            </button>
          </div>
        </div>

        {/* Wishes Cards Feed */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[520px] overflow-y-auto" id="wishes-feed">
          {displayedWishes.map((item) => {
            const isLiked = likedWishIds[item.id];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`relative p-4 rounded-2xl border transition-all ${
                  item.isNew
                    ? 'bg-[#fcfaf7] border-[#c5a880]/60 shadow-[0_4px_16px_rgba(197,168,128,0.18)]'
                    : 'bg-[#faf6f0]/40 border-[#eae0d2]/70 hover:bg-[#faf6f0]'
                }`}
              >
                {/* Top Row: Name, Relationship & Motif */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    {/* Motif Avatar */}
                    <div className="w-8 h-8 rounded-full bg-white border border-[#eae0d2] shadow-xs flex items-center justify-center text-sm shrink-0">
                      {item.emoji}
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#4a3625]">
                        {item.name}
                      </h4>
                      {item.relationship && (
                        <span className="font-sans text-[10px] text-[#c5a880] font-semibold block">
                          {item.relationship}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Timestamp & New Badge */}
                  <div className="text-right shrink-0">
                    {item.isNew ? (
                      <span className="font-sans text-[9px] uppercase tracking-wider font-extrabold text-[#8d1e26] bg-[#8d1e26]/10 px-2 py-0.5 rounded-full">
                        Just Now
                      </span>
                    ) : (
                      <span className="font-sans text-[10px] text-gray-400">
                        {item.timestamp}
                      </span>
                    )}
                  </div>
                </div>

                {/* Blessing Message in refined serif */}
                <p className="mt-3 font-serif italic text-xs sm:text-[13px] text-gray-700 leading-relaxed">
                  "{item.message}"
                </p>

                {/* Card Footer: Interaction button */}
                <div className="mt-3 pt-2.5 border-t border-[#eae0d2]/40 flex items-center justify-between text-[11px]">
                  <span className="font-sans text-[10px] text-gray-400 italic">
                    Sent with love for the couple
                  </span>
                  
                  <button
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all cursor-pointer text-[11px] ${
                      isLiked
                        ? 'bg-rose-50 border-rose-200 text-rose-600 font-bold'
                        : 'bg-white border-[#eae0d2] text-gray-500 hover:text-rose-600 hover:border-rose-200'
                    }`}
                    title="Send love to this blessing"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{item.likes}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
