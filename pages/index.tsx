import Header from '@components/Header';
import Container from '@components/elements/Container';
import Experience from '@components/Experience';
import About from '@components/About';
import Education from '@components/Education';

export default function Home() {
  return (
    <Container>
      <Header />
      <About />
      <Education />
      <Experience />
    </Container>
  );
}
