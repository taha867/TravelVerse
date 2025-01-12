import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';

const destinations = [
  {
    title: 'Hunza',
    image: '/Hunza.jpg', // Path relative to the public folder
    price: 'From 20,000 Rs',
    tag: 'Most Popular',
  },
  {
    title: 'Kalam',
    image: '/Kalam.jpg', // Path relative to the public folder
    price: 'From 15,000 Rs',
    tag: 'Adventure',
  },
  {
    title: 'Swat',
    image: '/Sawat.jpg', // Path relative to the public folder
    price: 'From 30,000 Rs',
    tag: 'Best Value',
  },
];

export default function PopularDestinations() {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const shadow = useColorModeValue('lg', 'dark-lg');
  const textColor = useColorModeValue('gray.900', 'white');
  const badgeColor = useColorModeValue('teal', 'teal.300');

  return (
    <Box py={20} bg={bgColor}>
      <Container maxW="7xl">
        <Heading textAlign="center" mb={12} fontSize={{ base: '3xl', md: '4xl' }}>
          Popular Destinations
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {destinations.map((destination, index) => (
            <Box
              key={index}
              borderRadius="xl"
              overflow="hidden"
              bg={cardBgColor}
              shadow={shadow}
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
                  colorScheme={badgeColor}
                  borderRadius="full"
                  px={3}
                  py={1}
                >
                  {destination.tag}
                </Badge>
              </Box>
              <Box p={6}>
                <Heading size="md" mb={2} color={textColor}>
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
