import { TopTracks, TopTracksSchema } from '@core/types/Track';
import { getTopTracks } from 'lib/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TopTracks>
) {
  const topTracks = await getTopTracks();

  const tracks = TopTracksSchema.parse({
    tracks: topTracks.items.map((track) => ({
      artist: track.artists.map((artist) => artist.name).join(', '),
      url: track.external_urls.spotify,
      name: track.name,
      id: track.id,
      albumCover: track.album.images?.[0]?.url,
    })),
  });

  return res.status(200).json(tracks);
}
