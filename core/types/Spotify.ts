import { z } from 'zod';

export const AlbumSchema = z.object({
  id: z.string(),
  name: z.string(),
  images: z.array(z.object({ url: z.string().url() })),
});

export const ArtistSchema = z.object({
  id: z.string(),
  name: z.string(),
  href: z.string().url().optional(),
  genres: z.array(z.string()).optional(),
  images: z.array(z.object({ url: z.string().url() })).optional(),
  popularity: z.number().optional(),
  followers: z
    .object({ total: z.number(), href: z.string().url().nullable() })
    .optional(),
  uri: z.string().url().optional(),
  external_urls: z.object({ spotify: z.string().url() }).optional(),
});

export const TrackSchema = z.object({
  artists: z.array(ArtistSchema),
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

export const TopArtistsSchema = z.object({
  items: z.array(ArtistSchema),
});

export type Track = z.infer<typeof TrackSchema>;
export type TopTracks = z.infer<typeof TopTracksSchema>;
export type CurrentlyPlaying = z.infer<typeof CurrentlyPlayingSchema>;
export type Artist = z.infer<typeof ArtistSchema>;
export type TopArtists = z.infer<typeof TopArtistsSchema>;
