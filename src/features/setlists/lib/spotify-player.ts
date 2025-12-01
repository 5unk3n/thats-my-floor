import { usePlayerStore } from '../store/use-player-store';

const SPOTIFY_PLAYER_SCRIPT = 'https://sdk.scdn.co/spotify-player.js';
let player: Spotify.Player | null = null;

export const initializeSpotifyPlayer = (token: string) => {
  return new Promise<void>((resolve, reject) => {
    if (window.Spotify) {
      setupPlayer(token, resolve, reject);
      return;
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      setupPlayer(token, resolve, reject);
    };

    if (!document.querySelector(`script[src="${SPOTIFY_PLAYER_SCRIPT}"]`)) {
      const script = document.createElement('script');
      script.src = SPOTIFY_PLAYER_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }
  });
};

const setupPlayer = (token: string, resolve: () => void, reject: (error: Error) => void) => {
  player = new window.Spotify.Player({
    name: 'Setlist Player',
    getOAuthToken: (cb) => {
      cb(token);
    },
    volume: 0.5,
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => {
    usePlayerStore.getState().setError({ message, type: 'initialization_error' });
    reject(new Error(message));
  });

  player.addListener('authentication_error', ({ message }) => {
    usePlayerStore.getState().setError({ message, type: 'authentication_error' });
    reject(new Error(message));
  });

  player.addListener('account_error', ({ message }) => {
    usePlayerStore.getState().setError({ message, type: 'account_error' });
    reject(new Error(message));
  });

  player.addListener('playback_error', ({ message }) => {
    usePlayerStore.getState().setError({ message, type: 'playback_error' });
  });

  // Playback status updates
  player.addListener('player_state_changed', (state) => {
    if (!state) return;

    usePlayerStore.getState().setPlayerState({
      paused: state.paused,
      currentTrack: state.track_window.current_track,
      position: state.position,
      duration: state.duration,
      active: true,
    });
  });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    usePlayerStore.getState().setDeviceId(device_id);
    usePlayerStore.getState().setReady(true);
    resolve();
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
    usePlayerStore.getState().setReady(false);
  });

  player.connect();
};

export const playerControls = {
  togglePlay: () => player?.togglePlay(),
  nextTrack: () => player?.nextTrack(),
  previousTrack: () => player?.previousTrack(),
  seek: (position: number) => player?.seek(position),
  setVolume: (volume: number) => player?.setVolume(volume),
};

export const playTrack = async (token: string, deviceId: string, uri: string) => {
  await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: 'PUT',
    body: JSON.stringify({ uris: [uri] }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
