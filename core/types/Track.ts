import { z } from 'zod';

export const AlbumSchema = z.object({
  id: z.string(),
  name: z.string(),
  images: z.array(z.object({ url: z.string().url() })),
});

export const ArtistScehma = z.object({
  name: z.string(),
  id: z.string(),
});

export const TrackSchema = z.object({
  artists: z.array(ArtistScehma),
  external_urls: z.object({ spotify: z.string().url() }),
  name: z.string(),
  id: z.string(),
  album: AlbumSchema,
});

export const TopTracksSchema = z.object({
  items: z.array(TrackSchema),
});

export const CurrentlyPlayingSchema = z.object({
  item: TrackSchema,
});

export type Track = z.infer<typeof TrackSchema>;
export type TopTracks = z.infer<typeof TopTracksSchema>;
export type CurrentlyPlaying = z.infer<typeof CurrentlyPlayingSchema>;
