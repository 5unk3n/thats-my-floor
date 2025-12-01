import { create } from 'zustand';

import { PlaybackError,PlayerState } from '../types';

interface PlayerStore extends PlayerState {
  error: PlaybackError | null;
  isReady: boolean;

  // Actions
  setDeviceId: (deviceId: string) => void;
  setPlayerState: (state: Partial<PlayerState>) => void;
  setError: (error: PlaybackError | null) => void;
  setReady: (isReady: boolean) => void;
  reset: () => void;
}

const initialState: PlayerState = {
  deviceId: '',
  paused: true,
  currentTrack: null,
  position: 0,
  duration: 0,
  volume: 0.5,
  active: false,
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  ...initialState,
  error: null,
  isReady: false,

  setDeviceId: (deviceId) => set({ deviceId }),
  setPlayerState: (state) => set((prev) => ({ ...prev, ...state })),
  setError: (error) => set({ error }),
  setReady: (isReady) => set({ isReady }),
  reset: () => set({ ...initialState, error: null, isReady: false }),
}));
