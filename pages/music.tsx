import CurrentlyPlaying from '@components/CurrentlyPlaying';
import Container from '@components/elements/Container';
import Section from '@components/elements/Section';
import TopMusic from '@components/TopMusic';
import { useState } from 'react';
import { Button } from '@vechaiui/react';

export type MusicType = 'artists' | 'tracks';

export default function Music() {
  const [type, setType] = useState<MusicType>('tracks');
  return (
    <Container>
      <Section heading="Music">
        <p>
          I get asked a lot what kind of music I listen to and &nbsp;
          <b>I have no idea</b>. The type of music I listen to switches up a lot
          and I am not really sure how to describe it to you. So instead I
          included some data from Spotify for you to see for yourself.
        </p>
      </Section>
      <Section heading="Currently Playing">
        <CurrentlyPlaying />
      </Section>
      <Section heading={`Top of My Listens`}>
        <div className="flex mb-4 space-x-2">
          <Button
            color={type === 'tracks' ? 'primary' : undefined}
            onClick={() => setType('tracks')}
            active={type === 'tracks'}
          >
            Tracks
          </Button>
          <Button
            color={type === 'artists' ? 'primary' : undefined}
            onClick={() => setType('artists')}
            active={type === 'artists'}
          >
            Artists
          </Button>
        </div>
        <TopMusic type={type} />
      </Section>
    </Container>
  );
}
