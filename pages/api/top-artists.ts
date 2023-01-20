import { TopArtists, TopArtistsSchema } from '@core/types/Spotify';
import { getTopArtists } from 'lib/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TimeRange } from '@lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TopArtists>
) {
  const topArtists = await getTopArtists(req.query.time_range as TimeRange);

  return res.status(200).json(TopArtistsSchema.parse(topArtists));
}
