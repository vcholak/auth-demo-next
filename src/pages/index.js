import Meta from '@/components/Meta/index';
import { LandingLayout } from '@/layouts/index';
import {
  Features,
  Footer,
  Hero,
} from '@/sections/index';

const Home = () => {
  return (
    <LandingLayout>
      <Meta
        title="Suncor Demo"
        description="NextJS 13 app"
      />
      <Hero />
      <Features />
      <Footer />
    </LandingLayout>
  );
};

export default Home;
