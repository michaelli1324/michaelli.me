import Image from 'next/image';
import { Artist } from '@core/types/Spotify';

interface MusicArtistProps {
  artist?: Artist;
  isLoading: boolean;
}

const MusicArtist = ({ artist, isLoading }: MusicArtistProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-row items-center animate-pulse">
        <div className="w-12 h-12 mr-4 bg-gray-200 rounded-lg" />
        <div className="flex flex-col">
          <div className="w-48 h-3 mb-2 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!artist) {
    return null;
  }
  return (
    <div className="flex flex-row items-center">
      {artist.images?.[0]?.url && (
        <Image
          className="mr-4 rounded-lg"
          src={artist.images?.[0]?.url}
          alt={artist.name}
          height={48}
          width={48}
        />
      )}
      <div className="flex flex-col text-bold">
        <a
          target="_blank"
          rel="noreferrer"
          className={'text-blue-600 hover:underline'}
          href={artist.uri}
        >
          {artist.name}
        </a>
        <div className="text-gray-500">{artist?.genres?.join(', ')}</div>
      </div>
    </div>
  );
};

export default MusicArtist;
