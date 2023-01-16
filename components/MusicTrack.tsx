import Image from 'next/image';
import { Track } from '@core/types/Track';

interface MusicTrackProps {
  track?: Track;
  isLoading: boolean;
}

const MusicTrack = ({ track, isLoading }: MusicTrackProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-row items-center animate-pulse">
        <div className="w-12 h-12 mr-4 bg-gray-200 rounded-lg" />
        <div className="flex flex-col">
          <div className="w-48 h-3 mb-2 bg-gray-200 rounded" />
          <div className="w-48 h-3 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!track) {
    return <div>No Music Playing</div>;
  }
  return (
    <div className="flex flex-row items-center">
      {track.album && (
        <Image
          className="mr-4 rounded-lg"
          src={track.album.images[0].url}
          alt={track.name}
          height={48}
          width={48}
        />
      )}
      <div className="flex flex-col text-bold">
        <a
          target="_blank"
          rel="noreferrer"
          className={'text-blue-600 hover:underline'}
          href={track.external_urls.spotify}
        >
          {track.name}
        </a>
        <div className="text-gray-500">
          {track.artists.map((artist) => artist.name).join(', ')}
        </div>
      </div>
    </div>
  );
};

export default MusicTrack;
