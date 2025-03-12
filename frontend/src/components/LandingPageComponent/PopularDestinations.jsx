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
    title: 'Hunza Valley',
    image: '/hunza-valley.jpg',
    price: 'From PKR 45,000',
    tag: 'Most Popular',
    description: 'Experience the majestic beauty of the Karakoram Range',
  },
  {
    title: 'Shalimar Gardens',
    image: '/shalimar-gardens.jpg',
    price: 'From PKR 25,000',
    tag: 'Cultural',
    description: 'Explore the historic Mughal architecture and gardens',
  },
  {
    title: 'Deosai Plains',
    image: '/deosai-plains.jpg',
    price: 'From PKR 35,000',
    tag: 'Adventure',
    description: 'Discover the world\'s second-highest plateau',
  },
];

export default function PopularDestinations() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const shadow = useColorModeValue('lg', 'dark-lg');
  const textColor = useColorModeValue('gray.900', 'white');
  const priceColor = useColorModeValue('blue.500', 'blue.300');
  const badgeColor = useColorModeValue('blue', 'blue.300');

  return (
    <Box py={24} bg={bgColor}>
      <Container maxW="7xl">
        <Box textAlign="center" mb={16}>
          <Heading
            fontSize={{ base: "3xl", md: "4xl" }}
            mb={4}
            color={useColorModeValue("gray.900", "white")}
          >
            Popular Destinations
          </Heading>
          <Text
            fontSize="xl"
            color={useColorModeValue("gray.600", "gray.400")}
            maxW="2xl"
            mx="auto"
          >
            Explore Pakistan's most beloved locations, from historic sites to
            natural wonders
          </Text>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {destinations.map((destination, index) => (
            <Box
              key={index}
              borderRadius="2xl"
              overflow="hidden"
              bg={cardBgColor}
              boxShadow="xl"
              _hover={{
                transform: "translateY(-8px)",
                boxShadow: "2xl",
              }}
              transition="all 0.3s"
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
                  colorScheme="blue"
                  fontSize="sm"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {destination.tag}
                </Badge>
              </Box>
              <Box p={6}>
                <Heading size="lg" mb={2}>
                  {destination.title}
                </Heading>
                <Text color="gray.600" mb={4}>
                  {destination.description}
                </Text>
                <Text color={priceColor} fontSize="xl" fontWeight="bold">
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
