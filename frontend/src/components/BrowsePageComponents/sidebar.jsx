import {
  Box,
  VStack,
  Heading,
  Checkbox,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  HStack,
  Stack,
  Button
} from '@chakra-ui/react';
import { Star } from 'lucide-react';
import { useSearch } from '../BrowsePageComponents/SearchContext';

const categories = ['Adventure', 'Cultural', 'Nature', 'Urban', 'Relaxation'];
const tourTypes = ['Group', 'Private', 'Self-guided'];

export default function Sidebar() {
  const { filters, updateFilters, resetFilters } = useSearch();

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="lg">
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="sm" mb={3}>Price Range</Heading>
          <RangeSlider
            value={filters.priceRange}
            onChange={(value) => updateFilters({ priceRange: value })}
            min={0}
            max={10000}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <HStack justify="space-between" mt={2}>
            <Text fontSize="sm">${filters.priceRange[0]}</Text>
            <Text fontSize="sm">${filters.priceRange[1]}</Text>
          </HStack>
        </Box>

        <Box>
          <Heading size="sm" mb={3}>Duration (Days)</Heading>
          <RangeSlider
            value={filters.duration}
            onChange={(value) => updateFilters({ duration: value })}
            min={1}
            max={30}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <HStack justify="space-between" mt={2}>
            <Text fontSize="sm">{filters.duration[0]} days</Text>
            <Text fontSize="sm">{filters.duration[1]} days</Text>
          </HStack>
        </Box>

        <Box>
          <Heading size="sm" mb={3}>Categories</Heading>
          <Stack spacing={2}>
            {categories.map(category => (
              <Checkbox
                key={category}
                isChecked={filters.categories.includes(category)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...filters.categories, category]
                    : filters.categories.filter(c => c !== category);
                  updateFilters({ categories: newCategories });
                }}
              >
                {category}
              </Checkbox>
            ))}
          </Stack>
        </Box>

        <Box>
          <Heading size="sm" mb={3}>Rating</Heading>
          <HStack spacing={1}>
            {[1, 2, 3, 4, 5].map(rating => (
              <Star
                key={rating}
                size={20}
                fill={rating <= filters.rating ? 'currentColor' : 'none'}
                onClick={() => updateFilters({ rating })}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </HStack>
        </Box>

        <Box>
          <Heading size="sm" mb={3}>Tour Type</Heading>
          <Stack spacing={2}>
            {tourTypes.map(type => (
              <Checkbox
                key={type}
                isChecked={filters.type.includes(type)}
                onChange={(e) => {
                  const newTypes = e.target.checked
                    ? [...filters.type, type]
                    : filters.type.filter(t => t !== type);
                  updateFilters({ type: newTypes });
                }}
              >
                {type}
              </Checkbox>
            ))}
          </Stack>
        </Box>

        <Button
          colorScheme="gray"
          variant="outline"
          onClick={resetFilters}
        >
          Reset Filters
        </Button>
      </VStack>
    </Box>
  );
}
