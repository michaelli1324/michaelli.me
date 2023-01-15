import Container from '@components/elements/Container';
import Section from '@components/elements/Section';
import fetcher from 'lib/fetcher';
import useSWR from 'swr';

import TopMusic from '../components/TopTracks';
import { TopTracks } from '@core/types/Track';

export default function Music() {
  const { data, isLoading } = useSWR('/api/top-tracks', fetcher<TopTracks>);

  return (
    <Container>
      <Section heading="Music">
        <p>
          I get asked a lot what kind of music I listen to and &nbsp;
          <b>I have no idea</b>. The type of music I listen to switches up a lot
          and I am not really sure how to describe it to you. So instead I
          included some data from Spotify below about what I am listening to now
          and the Top Tracks I listened to recently.
        </p>
      </Section>
      <Section heading="Top Tracks in the Last Month">
        <TopMusic tracks={data?.tracks} isLoading={isLoading} />
      </Section>
    </Container>
  );
}
