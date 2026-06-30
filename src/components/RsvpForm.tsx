/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Heart, MessageSquare, Phone, Users, Home } from 'lucide-react';

interface RsvpFormProps {
  onSuccess: (name: string) => void;
}

export default function RsvpForm({ onSuccess }: RsvpFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2 Guests',
    events: ['Carnival', 'Sangeet', 'Reception', 'The Muhurtham'],
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableEvents = [
    { id: 'Carnival', label: 'Carnival — May 27' },
    { id: 'Sangeet', label: 'Sangeet — May 28' },
    { id: 'Reception', label: 'Reception — May 29' },
    { id: 'The Muhurtham', label: 'The Muhurtham — May 30' },
  ];

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEventCheckbox = (id: string) => {
    setFormData((prev) => {
      const current = prev.events;
      const index = current.indexOf(id);
      if (index > -1) {
        return { ...prev, events: current.filter((e) => e !== id) };
      } else {
        return { ...prev, events: [...current, id] };
      }
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    // Simulate a brief premium loading/heart pulse delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSuccess(formData.name);
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      guests: '2 Guests',
      events: ['Carnival', 'Sangeet', 'Reception', 'The Muhurtham'],
      message: '',
    });
    setIsSubmitted(false);
  };

  return (
    <section className="w-full max-w-[480px] mx-auto px-5 py-12 bg-white" id="rsvp-section">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="rsvp-form-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full"
            id="rsvp-form-view"
          >
            {/* RSVP Ribbon Header */}
            <div className="text-center mb-8">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold">
                Join the Celebration
              </span>
              <h2 className="font-script text-6xl text-[#8d1e26] mt-1">
                rsvp
              </h2>
              <p className="font-sans text-xs text-gray-400 mt-2">
                Kindly respond by <strong className="text-gray-600 font-medium">May 15, 2026</strong>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Name Input */}
              <div id="input-group-name">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8c745c] mb-1.5 flex items-center gap-1.5">
                  Your Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleTextChange}
                    placeholder="Enter your name"
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition-all bg-white"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div id="input-group-phone">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8c745c] mb-1.5 flex items-center gap-1.5">
                  Phone / Whatsapp Number
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleTextChange}
                    placeholder="+1 (xxx) xxx-xxxx"
                    className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-200 text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition-all bg-white"
                  />
                </div>
              </div>

              {/* Guests Count Dropdown */}
              <div id="input-group-guests">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8c745c] mb-1.5 flex items-center gap-1.5">
                  Number of Guests
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                    <Users className="w-4 h-4" />
                  </span>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleTextChange}
                    className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition-all appearance-none cursor-pointer"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="5+ Guests">5+ Guests</option>
                  </select>
                  {/* Custom arrow decoration */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* Events Checklist */}
              <div id="input-group-events">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8c745c] mb-1.5">
                  Events You Will Join
                </label>
                <div className="space-y-2 bg-[#faf9f6]/75 border border-[#eae0d2]/40 rounded-2xl p-4">
                  {availableEvents.map((evt) => {
                    const isSelected = formData.events.includes(evt.id);
                    return (
                      <div
                        key={evt.id}
                        onClick={() => toggleEventCheckbox(evt.id)}
                        className="flex items-center gap-3 py-1 cursor-pointer select-none"
                      >
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isSelected ? 'bg-[#5b7a5e] border-[#5b7a5e]' : 'border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />}
                        </div>
                        <span className={`text-xs font-sans transition-colors ${isSelected ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                          {evt.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Blessings message */}
              <div id="input-group-blessings">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8c745c] mb-1.5 flex items-center gap-1.5">
                  Message & Blessings (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-300">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleTextChange}
                    placeholder="Send your heartfelt wishes to the couple..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition-all bg-white resize-none"
                  />
                </div>
              </div>

              {/* Confirm RSVP Action button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.97 }}
                className="w-full h-12 bg-[#5b7a5e] hover:bg-[#4b6a4e] text-white rounded-2xl font-sans text-xs tracking-widest uppercase font-bold shadow-[0_5px_15px_rgba(91,122,94,0.25)] hover:shadow-[0_8px_20px_rgba(91,122,94,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                id="submit-rsvp-btn"
              >
                {isSubmitting ? (
                  <Heart className="w-4 h-4 animate-ping" />
                ) : (
                  <>
                    CONFIRM RSVP
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Families Contact details below the form */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#c5a880] font-bold mb-4">
                Family Contact Details
              </span>
              <div className="w-full flex justify-between gap-4">
                <div className="flex-1 bg-[#faf8f5] border border-gray-100 p-3.5 rounded-2xl text-center shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <span className="font-serif text-sm font-bold text-[#4a3625]">Kakria Family</span>
                  <a href="tel:+19165245915" className="block text-xs font-mono text-gray-500 hover:text-[#8d1e26] mt-1">
                    +1 (916) 524-5915
                  </a>
                </div>
                <div className="flex-1 bg-[#faf8f5] border border-gray-100 p-3.5 rounded-2xl text-center shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <span className="font-serif text-sm font-bold text-[#4a3625]">Pahwa Family</span>
                  <a href="tel:+19167058447" className="block text-xs font-mono text-gray-500 hover:text-[#8d1e26] mt-1">
                    +1 (916) 705-8447
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* SUCCESS / PERSONALIZED GREETINGS VIEW */
          <motion.div
            key="rsvp-submit-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full text-center py-8"
            id="rsvp-success-view"
          >
            {/* Elegant Floral border decoration */}
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#eef5ed] border border-[#cfe2cf]">
              <Heart className="w-10 h-10 text-[#5b7a5e] fill-current" />
            </div>

            <span className="font-sans text-[10px] tracking-[0.25em] lg:tracking-[0.3em] uppercase text-[#c5a880] font-bold">
              Thank You So Much
            </span>
            
            {/* Personalized Callout */}
            <h2 className="font-script text-5xl text-[#5fb561] font-bold mt-3 mb-4 leading-normal px-2">
              Dearest {formData.name}!
            </h2>

            <p className="font-serif text-sm text-[#4a3625] max-w-xs mx-auto leading-relaxed mb-6">
              Your RSVP has been beautifully received. We are overjoyed and cannot wait to celebrate our sacred union alongside you!
            </p>

            <div className="w-16 h-[1px] bg-[#c5a880]/30 mx-auto mb-6" />

            <div className="space-y-1 mb-8">
              <span className="font-sans text-[10px] text-gray-400 uppercase tracking-widest block">Guests Registered</span>
              <span className="font-mono text-sm font-bold text-gray-700">{formData.guests}</span>
            </div>

            {/* Custom Reset button returning home */}
            <button
              onClick={resetForm}
              className="px-6 h-11 flex items-center justify-center gap-2 rounded-xl bg-[#5b7a5e] hover:bg-[#4b6a4e] text-white font-sans text-xs font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-98 transition-all mx-auto cursor-pointer"
              id="reset-form-btn"
            >
              <Home className="w-4 h-4" />
              RETURN TO INVITATION
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
