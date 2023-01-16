import useSWR from 'swr';
import fetcher from '@lib/fetcher';
import MusicTrack from './MusicTrack';
import { CurrentlyPlaying } from '@core/types/Track';

const CurrentlyPlaying = () => {
  const { data, isLoading } = useSWR(
    '/api/currently-playing',
    fetcher<CurrentlyPlaying>
  );

  return <MusicTrack track={data?.item} isLoading={isLoading} />;
};

export default CurrentlyPlaying;
