import { Box, Container, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <Box
      h="90vh"
      position="relative"
      display="flex"
      alignItems="center"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgImage="url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?auto=format&fit=crop&q=80')"
        bgSize="cover"
        bgPosition="center"
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: 'blackAlpha.600',
        }}
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <Stack maxW="2xl" spacing={6} color="white">
          <Heading
            as="h1"
            size="3xl"
            fontWeight="bold"
            lineHeight="shorter"
            textShadow="2xl"
          >
            Your Journey Begins with a Single Click
          </Heading>
          <Text fontSize="xl" textShadow="lg">
            Discover breathtaking destinations, create lasting memories, and explore 
            the world with our curated travel experiences.
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
            <Button
              size="lg"
              colorScheme="teal"
              rightIcon={<ArrowRight />}
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              Start Your Adventure
            </Button>
            <Button
              size="lg"
              variant="outline"
              color="white"
              _hover={{ bg: 'whiteAlpha.200', transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              View Destinations
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}