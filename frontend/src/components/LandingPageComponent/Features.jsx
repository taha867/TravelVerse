import { 
  Box, 
  Container, 
  SimpleGrid, 
  Icon, 
  Text, 
  Stack, 
  Flex, 
  useColorModeValue 
} from "@chakra-ui/react";
import { Map, Shield, Clock, Award } from "lucide-react";

const features = [
  {
    title: "Curated Experiences",
    text: "Hand-picked destinations and expertly crafted itineraries for unforgettable journeys.",
    icon: Map,
  },
  {
    title: "Secure Booking",
    text: "Safe and secure payment process with best price guarantee.",
    icon: Shield,
  },
  {
    title: "24/7 Support",
    text: "Round-the-clock assistance for peace of mind throughout your journey.",
    icon: Clock,
  },
  {
    title: "Best in Class",
    text: "Award-winning service with thousands of satisfied travelers.",
    icon: Award,
  },
];

export default function Features() {
  // Move the hooks to the top of the component
  const bg = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.100", "gray.700");
  const cardTextColor = useColorModeValue("gray.600", "gray.300");
  const cardHoverShadow = useColorModeValue("lg", "dark-lg");
  const iconBg = useColorModeValue("teal.50", "teal.900");

  return (
    <Box py={20} bg={bg}>
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
              bg={cardBg}
              color={cardTextColor}
              _hover={{ transform: "translateY(-4px)", shadow: cardHoverShadow }}
              transition="all 0.2s"
            >
              <Flex
                w={16}
                h={16}
                align="center"
                justify="center"
                color="teal.500"
                rounded="full"
                bg={iconBg}
                mb={1}
              >
                <Icon as={feature.icon} w={8} h={8} />
              </Flex>
              <Text fontWeight="bold" fontSize="lg">
                {feature.title}
              </Text>
              <Text>
                {feature.text}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
