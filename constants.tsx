
import { Memory, Friend } from './types';

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://picsum.photos/seed/college1/800/600',
    description: 'First Day at Campus - The beginning of an era!',
    date: 'Aug 2021'
  },
  {
    id: '2',
    type: 'image',
    url: 'https://picsum.photos/seed/fest/800/600',
    description: 'Cultural Fest Night - Unlimited Vibes.',
    date: 'Dec 2022'
  },
  {
    id: '3',
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Canteen Masti - The daily dose of chaos.',
    date: 'Jan 2023'
  }
];

export const FRIENDS_LIST: Friend[] = [
  { id: '1', name: 'Aryan Verma', role: 'The Brainiac', avatar: 'https://i.pravatar.cc/150?u=aryan' },
  { id: '2', name: 'Sneha Kapur', role: 'Vibe Manager', avatar: 'https://i.pravatar.cc/150?u=sneha' },
  { id: '3', name: 'Rohan Mehra', role: 'Canteen Don', avatar: 'https://i.pravatar.cc/150?u=rohan' },
  { id: '4', name: 'Ishita Singh', role: 'Photographer', avatar: 'https://i.pravatar.cc/150?u=ishita' },
  { id: '5', name: 'Kabir Das', role: 'Assignment King', avatar: 'https://i.pravatar.cc/150?u=kabir' }
];

export const APP_PASSWORD = 'Pagalpanti_Pvt_Ltd';
export const COLLEGE_BG = 'https://picsum.photos/seed/college_bg/1920/1080?blur=2';
