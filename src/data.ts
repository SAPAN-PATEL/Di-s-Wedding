/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PolaroidItem, CeremonyItem, TimelineEvent } from './types.ts';

export const polaroidsData: PolaroidItem[] = [
  {
    id: 'started',
    tag: 'HOW IT STARTED',
    title: 'A Glimpse of Our Journey',
    desc: 'Two strangers, one unexpected spark — and suddenly the world felt a little different.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop',
    caption: 'how it started...',
  },
  {
    id: 'first-date',
    tag: 'FIRST REAL DATE',
    title: 'A Glimpse of Our Journey',
    desc: "Coffee turned into dinner, dinner turned into hours — we didn't want the night to end.",
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop',
    caption: 'first real date...',
  },
  {
    id: 'official',
    tag: 'MAKING IT OFFICIAL',
    title: 'A Glimpse of Our Journey',
    desc: 'Somewhere between the inside jokes and late-night calls, we realized this was it.',
    image: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=600&auto=format&fit=crop',
    caption: 'made it official...',
  },
  {
    id: 'proposal',
    tag: 'THE PROPOSAL',
    title: 'A Glimpse of Our Journey',
    desc: "One question, one yes — and everything we'd imagined finally had a date on the calendar.",
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop',
    caption: 'she said yes...',
  },
];

export const ceremoniesData: CeremonyItem[] = [
  {
    day: 1,
    dateKey: '05/27/2026',
    dayOfWeek: 'Wednesday',
    title: 'Carnival',
    dateLabel: 'Wednesday, 27 May 2026',
    timeLabel: '4:44 AM Onwards',
    theme: 'Theme: Colorful Pop',
    subTitle: 'Welcome & Celebrations',
    illustration: 'carnival',
    bgColor: 'bg-[#faf3f0]', 
    borderColor: 'border-[#f2d3cd]',
    venueName: 'The Ranch Community Park',
    venueAddress: 'Rancho Cordova, CA 95670',
    mapUrl: 'https://maps.google.com/?q=The+Ranch+Community+Park,+Rancho+Cordova,+CA+95670',
  },
  {
    day: 2,
    dateKey: '05/28/2026',
    dayOfWeek: 'Thursday',
    title: 'Sangeet',
    dateLabel: 'Thursday, 28 May 2026',
    timeLabel: '5:45 PM Onwards',
    theme: 'Theme: Glitz & Glam',
    subTitle: 'Mystic & Magic',
    illustration: 'sangeet',
    bgColor: 'bg-[#eef3f7]',
    borderColor: 'border-[#c6d7e5]',
    venueName: '9 Star Bakery & Banquet Hall',
    venueAddress: 'Rancho Cordova, CA 95670',
    mapUrl: 'https://maps.google.com/?q=9+Star+Bakery,+Rancho+Cordova,+CA+95670',
  },
  {
    day: 3,
    dateKey: '05/29/2026',
    dayOfWeek: 'Friday',
    title: 'Reception',
    dateLabel: 'Friday, 29 May 2026',
    timeLabel: '5:00 PM Onwards',
    theme: 'Theme: Indo-Western',
    subTitle: 'Celebrations Continue',
    illustration: 'reception',
    bgColor: 'bg-[#f4f7f4]',
    borderColor: 'border-[#cfe2cf]',
    venueName: 'Mirage Banquet Hall',
    venueAddress: 'Village Vista, CA 95762',
    mapUrl: 'https://maps.google.com/?q=Mirage+Banquet+Hall,+Village+Vista,+CA',
  },
  {
    day: 4,
    dateKey: '05/30/2026',
    dayOfWeek: 'Saturday',
    title: 'The Muhurtham',
    dateLabel: 'Saturday, 30 May 2026',
    timeLabel: '4:15 AM Onwards', // Muhurtham is traditionally early or morning
    theme: 'Theme: South Indian Traditional',
    subTitle: 'Anand Karaj & Wedding',
    illustration: 'muhurtham',
    bgColor: 'bg-[#fbf7f0]',
    borderColor: 'border-[#ecdcc8]',
    venueName: 'West Sacramento Gurdwara',
    venueAddress: '1591 Evergreen Ave, West Sacramento, CA 95691',
    mapUrl: 'https://maps.google.com/?q=West+Sacramento+Gurdwara,+1591+Evergreen+Ave,+West+Sacramento,+CA+95691',
  },
];

export const muhurthamTimeline: TimelineEvent[] = [
  { time: '10:00 AM', title: 'Milni & Tea' },
  { time: '11:00 AM', title: 'Muhurtham / Anand Karaj' },
  { time: '12:00 PM', title: 'Lunch Feast' },
  { time: '5:00 PM', title: 'Vidai & Doli' },
];
