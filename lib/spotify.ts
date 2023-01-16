import fetcher from '@lib/fetcher';
import { SpotifyToken } from '@core/types/SpotifyToken';

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyRefreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

export const getAccessToken = async () => {
  const { access_token } = await fetcher<SpotifyToken>(
    'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${spotifyClientId}:${spotifyClientSecret}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: spotifyRefreshToken,
      }),
    }
  );

  return access_token;
};

export const getTopTracks = async () => {
  const accessToken = await getAccessToken();

  return await fetcher<SpotifyApi.UsersTopTracksResponse>(
    'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const getCurrentlyPlaying = async () => {
  const accessToken = await getAccessToken();

  return await fetcher<SpotifyApi.CurrentlyPlayingResponse>(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
