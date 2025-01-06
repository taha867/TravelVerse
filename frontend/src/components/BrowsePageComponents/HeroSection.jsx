import { Box, Heading, Text, Container } from '@chakra-ui/react';

export default function HeroSection() {
  return (
    <Box
      h="500px"
      position="relative"
      mb={8}
      borderRadius="xl"
      overflow="hidden"
    >
      {/* Hero Image */}
      <Box
        bgImage="url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80')"
        bgSize="cover"
        bgPosition="center"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        filter="brightness(0.7)"
      />

      {/* Content Overlay */}
      <Container 
        maxW="7xl" 
        h="full" 
        position="relative" 
        display="flex" 
        flexDirection="column" 
        justifyContent="center"
        color="white"
      >
        <Heading
          as="h1"
          size="2xl"
          mb={4}
          fontWeight="bold"
          textShadow="2px 2px 4px rgba(0,0,0,0.3)"
        >
          Discover Your Next Adventure
        </Heading>
        <Text
          fontSize="xl"
          maxW="2xl"
          textShadow="1px 1px 2px rgba(0,0,0,0.3)"
        >
          Explore handpicked tours and create unforgettable memories across the globe. 
          From cultural experiences to thrilling adventures, find your perfect journey.
        </Text>
      </Container>
    </Box>
  );
}