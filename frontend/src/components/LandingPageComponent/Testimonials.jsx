import { Box, Container, Heading, Text, Avatar, SimpleGrid, Stack, Icon, useColorModeValue } from '@chakra-ui/react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    text: 'The best travel experience of my life! The attention to detail and personalized service was outstanding.',
    location: 'New York, USA',
  },
  {
    name: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    text: 'Incredible destinations, amazing guides, and seamless organization. Highly recommended!',
    location: 'Toronto, Canada',
  },
  {
    name: 'Emma Watson',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    text: 'A perfect blend of adventure and comfort. Every trip with them has been exceptional.',
    location: 'London, UK',
  },
];

export default function Testimonials() {
  // Define color values for light and dark modes using useColorModeValue
  const bgColor = useColorModeValue('white', 'gray.700');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const shadow = useColorModeValue('lg', 'dark-lg');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const iconColor = useColorModeValue('yellow.400', 'yellow.500');
  const avatarBg = useColorModeValue('gray.100', 'gray.600');
  const locationColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Box py={20} bg={bgColor}>
      <Container maxW="7xl">
        <Heading textAlign="center" mb={12} fontSize={{ base: '3xl', md: '4xl' }}>
          What Our Travelers Say
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {testimonials.map((testimonial, index) => (
            <Stack
              key={index}
              spacing={4}
              p={8}
              bg={cardBgColor}
              borderRadius="xl"
              shadow={shadow}
              _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
              transition="all 0.2s"
            >
              <Box color={iconColor} display="flex">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} as={Star} fill="currentColor" w={4} h={4} />
                ))}
              </Box>
              <Text color={textColor} fontSize="md">
                &quot;{testimonial.text}&quot;
              </Text>
              <Stack direction="row" spacing={4} align="center">
                <Avatar src={testimonial.image} name={testimonial.name} bg={avatarBg} />
                <Box>
                  <Text fontWeight="bold">{testimonial.name}</Text>
                  <Text fontSize="sm" color={locationColor}>
                    {testimonial.location}
                  </Text>
                </Box>
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
