import { z } from 'zod';

export const SpotifyTokenSchema = z.object({
  access_token: z.string(),
});

export type SpotifyToken = z.infer<typeof SpotifyTokenSchema>;

