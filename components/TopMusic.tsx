import useSWR from 'swr';
import { TopTracks } from '@core/types/Spotify';
import fetcher from '@lib/fetcher';
import MusicTrack from '@components/MusicTrack';
import MusicArtist from '@components/MusicArtist';
import { TopArtists } from '@core/types/Spotify';
import { MusicType } from 'pages/music';

interface TopMusicProps {
  type: MusicType;
}

const TopMusic = ({ type }: TopMusicProps) => {
  const { data: topTracks, isLoading: isTopTracksLoading } = useSWR(
    '/api/top-tracks',
    fetcher<TopTracks>
  );
  const { data: topArtists, isLoading: isTopArtistsLoading } = useSWR(
    '/api/top-artists',
    fetcher<TopArtists>
  );

  const trackItems = topTracks?.items || Array(10).fill(0);
  const artistItems = topArtists?.items || Array(10).fill(0);

  return (
    <>
      {type === 'tracks'
        ? trackItems?.map((track, i) => (
            <div className="flex flex-row items-center py-2" key={track.id}>
              <div className="flex flex-row items-center w-4 mr-4 text-xl text-bold">
                {i + 1}
              </div>
              <MusicTrack track={track} isLoading={isTopTracksLoading} />
            </div>
          ))
        : artistItems?.map((artist, i) => (
            <div className="flex flex-row items-center py-2" key={artist.id}>
              <div className="flex flex-row items-center w-4 mr-4 text-xl text-bold">
                {i + 1}
              </div>
              <MusicArtist artist={artist} isLoading={isTopArtistsLoading} />
            </div>
          ))}
    </>
  );
};

export default TopMusic;
