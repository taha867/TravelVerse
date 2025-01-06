import { Box, Container, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { Map, Shield, Clock, Award } from 'lucide-react';

const features = [
  {
    title: 'Curated Experiences',
    text: 'Hand-picked destinations and expertly crafted itineraries for unforgettable journeys.',
    icon: Map,
  },
  {
    title: 'Secure Booking',
    text: 'Safe and secure payment process with best price guarantee.',
    icon: Shield,
  },
  {
    title: '24/7 Support',
    text: 'Round-the-clock assistance for peace of mind throughout your journey.',
    icon: Clock,
  },
  {
    title: 'Best in Class',
    text: 'Award-winning service with thousands of satisfied travelers.',
    icon: Award,
  },
];

export default function Features() {
  return (
    <Box py={20} bg="white">
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          {features.map((feature, index) => (
            <Stack
              key={index}
              align="center"
              textAlign="center"
              spacing={4}
              p={6}
              borderRadius="lg"
              _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
              transition="all 0.2s"
            >
              <Flex
                w={16}
                h={16}
                align="center"
                justify="center"
                color="teal.500"
                rounded="full"
                bg="teal.50"
                mb={1}
              >
                <Icon as={feature.icon} w={8} h={8} />
              </Flex>
              <Text fontWeight="bold" fontSize="lg">
                {feature.title}
              </Text>
              <Text color="gray.600">
                {feature.text}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}