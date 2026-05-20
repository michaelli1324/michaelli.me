import Container from '@components/elements/Container';
import About from '@components/About';
import Header from '@components/Header';
import { MiliColorsProvider } from '@components/MiliText';

export default function Home() {
  return (
    <Container>
      <MiliColorsProvider>
        <Header />
        <About />
      </MiliColorsProvider>
    </Container>
  );
}
