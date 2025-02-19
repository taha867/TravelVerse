import { Box, useColorModeValue } from '@chakra-ui/react';
import Hero from '../components/LandingPageComponent/Hero';
import Features from '../components/LandingPageComponent/Features';
import PopularDestinations from '../components/LandingPageComponent/PopularDestinations';
import Testimonials from '../components/LandingPageComponent/Testimonials';
import Newsletter from '../components/LandingPageComponent/Newsletter';
import Navbar from '../components/Navbar';

export default function LandingPage() {
  return (
    <Box position="relative">
      <Navbar />
      
      <Box as="main">
        <Hero />
        <Box
          transform="translateY(-100px)"
          bg={useColorModeValue("gray.50", "gray.900")}
          borderTopRadius="3xl"
          position="relative"
          zIndex={1}
        >
          <Features />
          <PopularDestinations />
          <Testimonials />
          <Newsletter />
        </Box>
      </Box>
    </Box>
  );
}