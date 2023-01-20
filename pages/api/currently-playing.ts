import type { NextApiRequest, NextApiResponse } from 'next';
import { getCurrentlyPlaying } from '@lib/spotify';
import { CurrentlyPlaying, CurrentlyPlayingSchema } from '@core/types/Spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CurrentlyPlaying>
) {
  const currentlyPlaying = await getCurrentlyPlaying();

  if (!currentlyPlaying) {
    return res.status(204).end();
  }

  return res.status(200).json(CurrentlyPlayingSchema.parse(currentlyPlaying));
}
