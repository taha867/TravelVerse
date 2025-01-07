import { Box, Container, Heading, Text, Button, Stack, useColorModeValue } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  // Define light and dark mode values
  const bgColor = useColorModeValue("whiteAlpha.800", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const headingTextColor = useColorModeValue("teal.500", "teal.300");
  const buttonBgColor = useColorModeValue("teal.500", "teal.300");
  const buttonHoverBgColor = useColorModeValue("teal.400", "teal.200");

  return (
    <Box
      h="90vh"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Video Background */}
      <video
        src="https://videos.pexels.com/video-files/5598970/5598970-uhd_3840_2160_24fps.mp4"
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      {/* Content Overlay */}
      <Container maxW="7xl" position="relative" zIndex={1}>
        <Stack maxW="2xl" spacing={6} color={textColor}>
          <Heading
            as="h1"
            size="3xl"
            fontWeight="bold"
            lineHeight="shorter"
            textShadow="2xl"
            color={headingTextColor} // Heading color changes with color mode
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
              bg={buttonBgColor} // Button background changes with color mode
              _hover={{ transform: 'translateY(-2px)', bg: buttonHoverBgColor }}
              transition="all 0.2s"
              rightIcon={<ArrowRight />}
            >
              Start Your Adventure
            </Button>
            <Button
              size="lg"
              variant="outline"
              color={textColor}
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
