import {
  Box,
  SimpleGrid,
  HStack,
  Button,
  Select,
  Text,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
import { Grid, List } from "lucide-react";
import TourCard from "./TourCard";
import { useSearch } from "./SearchContext";
import { useTours } from "../../hooks/useTours";
import { useBreakpointValue } from "@chakra-ui/react";

export default function TourGrid() {
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const { filters, updateFilters } = useSearch();
  const { tours, loading, error } = useTours(filters);

  // Define color mode values outside of any callback
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("black", "white");
  const buttonBg = useColorModeValue("white", "gray.700");
  const buttonHoverBg = useColorModeValue("gray.100", "gray.600");
  const skeletonStartColor = useColorModeValue("gray.200", "gray.700");
  const skeletonEndColor = useColorModeValue("gray.100", "gray.600");

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box bg={bgColor} color={textColor} p={4} borderRadius="md">
      <HStack justify="space-between" mb={6}>
        <HStack spacing={2}>
          <Button
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg }}
            variant="solid"
            p={2}
          >
            <Grid size={20} />
          </Button>
          <Button
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg }}
            variant="ghost"
            p={2}
          >
            <List size={20} />
          </Button>
        </HStack>

        <Select
          maxW="200px"
          bg={buttonBg}
          color={textColor}
          _hover={{ bg: buttonHoverBg }}
          onChange={(e) => updateFilters({ sort: e.target.value })}
        >
          <option value="">Sort by: Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="duration">Duration</option>
        </Select>
      </HStack>

      {loading ? (
        <SimpleGrid columns={columns} spacing={6}>
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              height="400px"
              borderRadius="lg"
              startColor={skeletonStartColor}
              endColor={skeletonEndColor}
            />
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={columns} spacing={6}>
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
