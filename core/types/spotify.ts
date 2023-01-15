export interface SpotifyToken {
  access_token: string;
}

export interface Track {
  artist: string;
  url: string;
  name: string;
  id: string;
  albumCover: string;
  externalLink: string;
}

export interface TopTracks {
  tracks: Track[];
}
