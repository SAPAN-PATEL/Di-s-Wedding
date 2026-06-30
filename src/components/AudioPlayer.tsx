/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
  playRequested?: boolean;
  isOpened?: boolean;
}

export default function AudioPlayer({ playRequested = false, isOpened = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and play audio
  // (startAudio and state triggers reside below)

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('wedding-audio-state-changed', { detail: { isPlaying: false } }));
    }
  };

  const startAudio = async () => {
    try {
      if (!audioRef.current) {
        // High quality local audio file uploaded by user of "Ye Ishq Hai"
        audioRef.current = new Audio('/audio.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.45; // Smooth pleasant background audio levels (completely unmuted)

        // Handle errors and provide a resilient mirror URL as backup
        audioRef.current.addEventListener('error', (e) => {
          console.warn('Local audio stream experienced load error. Attempting backup...', e);
          if (audioRef.current) {
            audioRef.current.src = 'https://www.pagalnew.com/download128/ye-ishq-hai-jab-we-met.mp3';
            audioRef.current.play().catch(err => {
              console.warn('Backup mirror play failed. Browser policy might require direct interaction.', err);
            });
          }
        });
      }

      await audioRef.current.play();
      setIsPlaying(true);
      window.dispatchEvent(new CustomEvent('wedding-audio-state-changed', { detail: { isPlaying: true } }));
    } catch (error) {
      console.warn('Browser interrupted background play request:', error);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      startAudio();
    }
  };

  // Sync state and listen to external triggers
  useEffect(() => {
    const handleToggle = () => {
      toggleSound();
    };
    const handleRequestState = () => {
      window.dispatchEvent(new CustomEvent('wedding-audio-state-changed', { detail: { isPlaying } }));
    };
    window.addEventListener('toggle-wedding-audio', handleToggle);
    window.addEventListener('request-wedding-audio-state', handleRequestState);
    
    // Broadcast initial / updated state
    window.dispatchEvent(new CustomEvent('wedding-audio-state-changed', { detail: { isPlaying } }));

    return () => {
      window.removeEventListener('toggle-wedding-audio', handleToggle);
      window.removeEventListener('request-wedding-audio-state', handleRequestState);
    };
  }, [isPlaying]);

  // Autoplay as soon as user ticks playRequested on monogram tap
  useEffect(() => {
    if (playRequested) {
      startAudio();
    }
  }, [playRequested]);

  // Clean on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Show a gorgeous interactive musical tag briefly upon landing to showcase craftsmanship
  useEffect(() => {
    if (isOpened && isPlaying) {
      setShowTooltip(true);
      const timer = setTimeout(() => setShowTooltip(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [isOpened, isPlaying]);

  // If the card has not been opened yet, we keep the controls invisible so they don't block the envelope
  if (!isOpened) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 animate-fade-in" id="audio-control-container">
      {/* Interactive Hoverable/Pulsing Song Description Tooltip */}
      {(showTooltip || isPlaying) && (
        <div 
          className={`flex items-center gap-2.5 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full border border-[#c5a880]/30 shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-500 transform ${
            showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
          }`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Music className="w-3.5 h-3.5 text-[#80141a] animate-bounce" />
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-semibold text-[#80141a] leading-tight">Ye Ishq Hai</span>
            <span className="text-[8px] text-gray-500 leading-none">Pritam • Shreya Ghoshal ('07)</span>
          </div>
        </div>
      )}

      <button
        onClick={toggleSound}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#80141a] shadow-[0_4px_15px_rgba(0,0,0,0.15)] border border-[#c5a880]/30 hover:bg-[#faf5ef] active:scale-95 transition-all cursor-pointer relative"
        aria-label="Toggle background wedding music"
        id="sound-toggle-btn"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 animate-pulse text-[#c5a880]" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400" />
        )}

        {/* Small active animation waves when play is functional */}
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3 pointer-events-none">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a880]/70 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c5a880]"></span>
          </span>
        )}
      </button>
    </div>
  );
}
