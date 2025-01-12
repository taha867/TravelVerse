import {
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  Stack,
  Box,
  useToast,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Search, Users, Calendar } from 'lucide-react';
import { useSearch } from './SearchContext';
//import { useDebounce } from '../../hooks/useDebounce';

export default function SearchBar() {
  const toast = useToast();
  const { filters, updateFilters } = useSearch();
  //const debouncedLocation = useDebounce(filters.location);

  // Dynamic styles for light and dark modes
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const inputFocusBorderColor = useColorModeValue('teal.500', 'cyan.300');

  const handleSearch = () => {
    if (!filters.location) {
      toast({
        title: 'Please enter a destination',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
  };

  return (
    <Box
      bg={bgColor}
      color={textColor}
      p={8}
      borderRadius="xl"
      shadow="xl"
      transform="translateY(-50%)"
      mx={4}
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Find Your Perfect Tour
      </Text>
      <Stack direction={['column', null, 'row']} spacing={4}>
        <InputGroup>
          <InputLeftElement color="teal.500">
            <Search size={20} />
          </InputLeftElement>
          <Input
            placeholder="Where to?"
            value={filters.location}
            onChange={(e) => updateFilters({ location: e.target.value })}
            _focus={{ borderColor: inputFocusBorderColor }}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement color="teal.500">
            <Calendar size={20} />
          </InputLeftElement>
          <Input
            type="date"
            onChange={(e) =>
              updateFilters({
                dateRange: {
                  ...filters.dateRange,
                  start: e.target.value ? new Date(e.target.value) : null,
                },
              })
            }
            _focus={{ borderColor: inputFocusBorderColor }}
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement color="teal.500">
            <Users size={20} />
          </InputLeftElement>
          <Select
            pl={10}
            value={filters.participants}
            onChange={(e) =>
              updateFilters({ participants: parseInt(e.target.value) })
            }
            _focus={{ borderColor: inputFocusBorderColor }}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Person' : 'People'}
              </option>
            ))}
          </Select>
        </InputGroup>

        <Button
          colorScheme="teal"
          px={8}
          onClick={handleSearch}
          size="lg"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
          transition="all 0.2s"
        >
          Search Tours
        </Button>
      </Stack>
    </Box>
  );
}
