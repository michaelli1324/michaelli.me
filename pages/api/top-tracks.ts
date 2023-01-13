import { getTopTracks } from 'lib/spotify';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TopTracks, Track } from 'customTypes/spotify-types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TopTracks>
) {
  const topTracksResponse = await getTopTracks();
  const topTracks = await topTracksResponse.json();

  const tracks = topTracks.items.map(
    (track: any) =>
      ({
        artist: track.artists.map((artist: any) => artist.name).join(', '),
        url: track.external_urls.spotify,
        name: track.name,
        id: track.id,
        albumCover: track.album.images?.[0]?.url,
        externalLink: track.external_urls.spotify,
      } as Track)
  ) as Track[];

  return res.status(200).json({ tracks });
}
