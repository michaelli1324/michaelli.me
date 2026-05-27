import Container from '@components/elements/Container';
import About from '@components/About';
import Header from '@components/Header';
import { MiliColorsProvider } from '@components/MiliText';
import { GetServerSideProps } from 'next';

interface HomeProps {
  dayOfYear: number;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return { props: { dayOfYear } };
};

export default function Home({ dayOfYear }: HomeProps) {
  return (
    <Container>
      <MiliColorsProvider>
        <Header dayOfYear={dayOfYear} />
        <About />
      </MiliColorsProvider>
    </Container>
  );
}
