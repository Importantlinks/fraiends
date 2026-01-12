
export type MediaType = 'image' | 'video';

export interface Memory {
  id: string;
  type: MediaType;
  url: string;
  description: string;
  date: string;
}

export interface Friend {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export enum AppState {
  PRELOADER = 'PRELOADER',
  LOCK_SCREEN = 'LOCK_SCREEN',
  DASHBOARD = 'DASHBOARD'
}
