import { TopTracks, TopTracksSchema } from '@core/types/Spotify';
import { TimeRange, getTopTracks } from 'lib/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TopTracks>
) {
  const topTracks = await getTopTracks(req.query.time_range as TimeRange);

  return res.status(200).json(TopTracksSchema.parse(topTracks));
}
