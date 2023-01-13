export type Track = {
  artist: string;
  url: string;
  name: string;
  id: string;
  albumCover?: string;
  externalLink?: string;
};

export type TopTracks = {
  tracks: Track[];
};
