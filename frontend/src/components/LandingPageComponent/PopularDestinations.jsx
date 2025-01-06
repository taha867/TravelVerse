import { Box, Container, Heading, SimpleGrid, Image, Text, Badge } from '@chakra-ui/react';

const destinations = [
  {
    title: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80',
    price: 'From $1,299',
    tag: 'Most Popular',
  },
  {
    title: 'Machu Picchu, Peru',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80',
    price: 'From $1,499',
    tag: 'Adventure',
  },
  {
    title: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80',
    price: 'From $899',
    tag: 'Best Value',
  },
];

export default function PopularDestinations() {
  return (
    <Box py={20} bg="gray.50">
      <Container maxW="7xl">
        <Heading
          textAlign="center"
          mb={12}
          fontSize={{ base: '3xl', md: '4xl' }}
        >
          Popular Destinations
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {destinations.map((destination, index) => (
            <Box
              key={index}
              borderRadius="xl"
              overflow="hidden"
              bg="white"
              shadow="lg"
              _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
              transition="all 0.2s"
              cursor="pointer"
            >
              <Box position="relative">
                <Image
                  src={destination.image}
                  alt={destination.title}
                  h="300px"
                  w="100%"
                  objectFit="cover"
                />
                <Badge
                  position="absolute"
                  top={4}
                  right={4}
                  colorScheme="teal"
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  {destination.tag}
                </Badge>
              </Box>
              <Box p={6}>
                <Heading size="md" mb={2}>
                  {destination.title}
                </Heading>
                <Text color="teal.500" fontWeight="bold">
                  {destination.price}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}