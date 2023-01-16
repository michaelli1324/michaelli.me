import useSWR from 'swr';
import { TopTracks } from '@core/types/Track';
import fetcher from '@lib/fetcher';
import Track from '@components/MusicTrack';

const TopMusic = () => {
  const { data, isLoading } = useSWR('/api/top-tracks', fetcher<TopTracks>);

  const items = data?.items || Array(10).fill(0);

  return (
    <>
      {items?.map((track, i) => (
        <div className="flex flex-row items-center py-2" key={track.id}>
          <div className="flex flex-row items-center w-4 mr-4 text-xl text-bold">
            {i + 1}
          </div>
          <Track track={track} isLoading={isLoading} />
        </div>
      ))}
    </>
  );
};

export default TopMusic;
