/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PolaroidItem {
  id: string;
  tag: string; // "HOW IT STARTED", "FIRST REAL DATE", etc.
  title: string;
  desc: string;
  image: string; // URL
  caption: string; // cursive text
  year?: string;
  date?: string;
}

export interface CeremonyItem {
  day: number;
  dateKey: string; // "05/27/2026"
  dayOfWeek: string; // "Wednesday"
  title: string; // "Carnival", "Sangeet"
  dateLabel: string; // "Sunday, 17 May 2026"
  timeLabel: string; // "4:44 AM Onwards"
  theme: string; // "Theme: Colorful Pop"
  attireTheme?: string; // "Sage Green & Pastels", etc.
  subTitle?: string; // "Mystic & Magic", etc.
  formattedDate?: string; // "Wednesday | 27 | May 2026"
  illustration: string; // custom SVGs or images
  bgColor: string; // e.g., "bg-pastel-pink"
  borderColor: string;
  mapEmbed?: string; // Venue address
  mapUrl: string; // Link to OpenMaps or google maps
  venueName: string;
  venueAddress: string;
  schedule?: TimelineEvent[];
}

export interface TimelineEvent {
  time: string;
  title: string;
}

export interface RsvpData {
  name: string;
  phone: string;
  guestsCount: number;
  eventsJoined: string[]; // List of title keys
  blessings: string;
}

export interface WishItem {
  id: string;
  name: string;
  relationship?: string;
  message: string;
  emoji: string;
  timestamp: string;
  likes: number;
  isNew?: boolean;
}

