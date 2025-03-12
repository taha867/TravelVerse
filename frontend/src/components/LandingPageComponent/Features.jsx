import { 
  Box, 
  Container, 
  SimpleGrid, 
  Icon, 
  Text, 
  Stack, 
  Flex, 
  useColorModeValue,
  Heading
} from "@chakra-ui/react";
import { Map, Shield, Clock, Award } from "lucide-react";

const features = [
  {
    title: "Expert Local Guides",
    text: "Discover hidden gems with our experienced local guides who know every corner of Pakistan.",
    icon: Map,
  },
  {
    title: "Secure Booking",
    text: "Worry-free reservations with encrypted payments and instant confirmation.",
    icon: Shield,
  },
  {
    title: "24/7 Support",
    text: "Our dedicated team is always ready to assist you throughout your journey.",
    icon: Clock,
  },
  {
    title: "Authentic Experiences",
    text: "Immerse yourself in local culture with carefully curated authentic experiences.",
    icon: Award,
  },
];

export default function Features() {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardTextColor = useColorModeValue("gray.600", "gray.300");
  const iconBg = useColorModeValue("blue.50", "blue.900");

  return (
    <Box py={24} bg={bg}>
      <Container maxW="7xl">
        <Box textAlign="center" mb={16}>
          <Heading
            fontSize={{ base: "3xl", md: "4xl" }}
            mb={4}
            color={useColorModeValue("gray.900", "white")}
          >
            Why Choose TravelVerse
          </Heading>
          <Text
            fontSize="xl"
            color={useColorModeValue("gray.600", "gray.400")}
            maxW="2xl"
            mx="auto"
          >
            We make your Pakistani travel dreams come true with exceptional service
            and unforgettable experiences
          </Text>
        </Box>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={{ base: 8, lg: 12 }}
        >
          {features.map((feature, index) => (
            <Stack
              key={index}
              align="center"
              textAlign="center"
              spacing={4}
              p={8}
              borderRadius="xl"
              bg={cardBg}
              boxShadow="lg"
              _hover={{
                transform: "translateY(-8px)",
                boxShadow: "2xl",
              }}
              transition="all 0.3s"
            >
              <Flex
                w={16}
                h={16}
                align="center"
                justify="center"
                color="teal.500"
                rounded="full"
                bg={iconBg}
                mb={2}
              >
                <Icon as={feature.icon} w={8} h={8} />
              </Flex>
              <Text
                fontWeight="bold"
                fontSize="xl"
                color={useColorModeValue("gray.900", "white")}
              >
                {feature.title}
              </Text>
              <Text color={cardTextColor} fontSize="md">
                {feature.text}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
