import Container from '@components/elements/Container';
import Section from '@components/elements/Section';
import fetcher from 'lib/fetcher';
import useSWR from 'swr';
import Image from 'next/image';
import { TopTracks } from '@customTypes/spotify-types';

export default function Music() {
  const response = useSWR('/api/top-tracks', fetcher);
  const data = response.data as TopTracks;

  return (
    <Container>
      <Section heading="Music">
        <p>
          I get asked a lot what kind of music I listen to, and to be
          honest:&nbsp;
          <b>I have no idea</b>. It&apos;s not that I don&apos;t listen to
          music; it&apos;s that I&apos;m not really sure how to describe it to
          you. So instead I&apos;ve included below some details from my Spotify
          about the Top Tracks that I&apos;ve listened to recently and what
          I&apos;m listening to now. Hope that helps!
        </p>
      </Section>
      <Section heading="Top Tracks in the Last Month">
        {data?.tracks?.map((track, i) => (
          <div className="flex flex-row items-center py-2" key={track.id}>
            <div className="flex flex-row items-center w-4 mr-4 text-xl text-bold">
              {i + 1}
            </div>
            <div className="flex flex-row items-center">
              {track.albumCover && (
                <Image
                  className="mr-4 rounded-lg"
                  src={track.albumCover}
                  alt={track.name}
                  height={50}
                  width={50}
                />
              )}
              <div className="text-bold">
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                    href={track.externalLink}
                  >
                    {track.name}
                  </a>
                </div>
                <div className="text-gray-500">{track.artist}</div>
              </div>
            </div>
          </div>
        ))}
      </Section>
    </Container>
  );
}
