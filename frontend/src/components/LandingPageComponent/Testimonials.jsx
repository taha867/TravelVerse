import { Box, Container, Heading, Text, Avatar, SimpleGrid, Stack, Icon } from '@chakra-ui/react';
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
  return (
    <Box py={20} bg="white">
      <Container maxW="7xl">
        <Heading
          textAlign="center"
          mb={12}
          fontSize={{ base: '3xl', md: '4xl' }}
        >
          What Our Travelers Say
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {testimonials.map((testimonial, index) => (
            <Stack
              key={index}
              spacing={4}
              p={8}
              bg="white"
              borderRadius="xl"
              shadow="lg"
              _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
              transition="all 0.2s"
            >
              <Box color="yellow.400" display="flex">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} as={Star} fill="currentColor" w={4} h={4} />
                ))}
              </Box>
              <Text color="gray.600" fontSize="md">
                &quot;{testimonial.text}&quot;
              </Text>
              <Stack direction="row" spacing={4} align="center">
                <Avatar src={testimonial.image} name={testimonial.name} />
                <Box>
                  <Text fontWeight="bold">{testimonial.name}</Text>
                  <Text fontSize="sm" color="gray.500">
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
