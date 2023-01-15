import { TopTracks } from '@core/types/spotify';
import { getTopTracks } from 'lib/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TopTracks>
) {
  const topTracks = await getTopTracks();

  const tracks = topTracks.items.map((track) => ({
    artist: track.artists.map((artist) => artist.name).join(', '),
    url: track.external_urls.spotify,
    name: track.name,
    id: track.id,
    albumCover: track.album.images?.[0]?.url,
    externalLink: track.external_urls.spotify,
  }));

  return res.status(200).json({ tracks });
}
