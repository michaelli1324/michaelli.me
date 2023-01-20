import { TopArtists, TopArtistsSchema } from '@core/types/Spotify';
import { getTopArtists } from 'lib/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TopArtists>
) {
  const topArtists = await getTopArtists();

  return res.status(200).json(TopArtistsSchema.parse(topArtists));
}
