import { Container, Box } from '@chakra-ui/react';
import HeroSection from '../components/BrowsePageComponents/HeroSection';
import SearchBar from '../components/BrowsePageComponents/SearchBar';
import Sidebar from '../components/BrowsePageComponents/sidebar';
import TourGrid from '../components/BrowsePageComponents/TourGrid';
import { SearchProvider } from '../components/BrowsePageComponents/SearchContext';

function BrowsePage() {
  return (
      <SearchProvider>
        <Box>
          <HeroSection />
          <Container maxW="7xl" py={8}>
            <SearchBar />
            <Box
              mt={8}
              display="grid"
              gridTemplateColumns={{ base: '1fr', lg: '250px 1fr' }}
              gap={8}
            >
              <Box>
                <Sidebar />
              </Box>
              <Box>
                <TourGrid />
              </Box>
            </Box>
          </Container>
        </Box>
      </SearchProvider>
  );
}

export default BrowsePage;