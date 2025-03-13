import { Container, Box } from '@chakra-ui/react';
import HeroSection from '../components/BrowsePageComponents/HeroSection';
import SearchBar from '../components/BrowsePageComponents/SearchBar';
import TourGrid from '../components/BrowsePageComponents/TourGrid';
import Sidebar from '../components/BrowsePageComponents/sidebar';
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
            gridTemplateColumns={{ base: '1fr', md: '300px 1fr' }}
            gap={8}
          >
            <Sidebar />
            <TourGrid/>
          </Box>
        </Container>
      </Box>
    </SearchProvider>
  );
}

export default BrowsePage;
