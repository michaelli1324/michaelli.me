import { TopTracks, TopTracksSchema } from '@core/types/Track';
import { getTopTracks } from 'lib/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TopTracks>
) {
  const topTracks = await getTopTracks();

  return res.status(200).json(TopTracksSchema.parse(topTracks));
}
