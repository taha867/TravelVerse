import { Box } from '@chakra-ui/react';
import Hero from '../components/LandingPageComponent/Hero';
import Features from '../components/LandingPageComponent/Features';
import PopularDestinations from '../components/LandingPageComponent/PopularDestinations';
import Testimonials from '../components/LandingPageComponent/Testimonials';
import Newsletter from '../components/LandingPageComponent/Newsletter';

export default function LandingPage() {
  return (
    <Box>
      <Hero />
      <Features />
      <PopularDestinations />
      <Testimonials />
      <Newsletter />
    </Box>
  );
}