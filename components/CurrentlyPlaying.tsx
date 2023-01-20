import useSWR from 'swr';
import fetcher from '@lib/fetcher';
import MusicTrack from './MusicTrack';
import { CurrentlyPlaying } from '@core/types/Spotify';

const CurrentlyPlaying = () => {
  const { data, isLoading } = useSWR(
    '/api/currently-playing',
    fetcher<CurrentlyPlaying>
  );

  return data?.item ? (
    <MusicTrack track={data.item} isLoading={isLoading} />
  ) : (
    <div>No Music Playing</div>
  );
};

export default CurrentlyPlaying;
