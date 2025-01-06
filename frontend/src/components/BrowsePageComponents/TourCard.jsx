import {
    Box,
    Image,
    Text,
    Badge,
    Button,
    VStack,
    HStack,
    Stack,
    useDisclosure
  } from '@chakra-ui/react';
  import { MapPin, Clock, Star, Eye, BookOpen } from 'lucide-react';
  
  export default function TourCard({ tour }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <Box 
        bg="white" 
        borderRadius="xl" 
        overflow="hidden" 
        shadow="lg"
        transition="all 0.2s"
        _hover={{ transform: 'translateY(-4px)', shadow: 'xl' }}
      >
        <Box position="relative" h="250px">
          <Image
            src={tour.image}
            alt={tour.title}
            objectFit="cover"
            w="100%"
            h="100%"
          />
          <Badge
            position="absolute"
            top={4}
            right={4}
            px={3}
            py={2}
            borderRadius="full"
            bg="white"
            color="teal.500"
            fontWeight="bold"
            fontSize="md"
            boxShadow="md"
          >
            ${tour.price}
          </Badge>
        </Box>
        
        <Box p={6}>
          <Text fontSize="xl" fontWeight="bold" mb={3} color="gray.800">
            {tour.title}
          </Text>
          
          <VStack spacing={3} align="stretch" mb={6}>
            <HStack color="gray.600">
              <MapPin size={18} />
              <Text>{tour.location}</Text>
            </HStack>
            
            <HStack color="gray.600">
              <Clock size={18} />
              <Text>{tour.duration} days</Text>
            </HStack>
            
            <HStack color="yellow.500">
              <Star size={18} fill="currentColor" />
              <Text fontWeight="bold">{tour.rating.toFixed(1)}</Text>
            </HStack>
          </VStack>
          
          <Stack direction="row" spacing={3}>
            <Button
              variant="ghost"
              colorScheme="teal"
              flex={1}
              leftIcon={<Eye size={18} />}
              onClick={onOpen}
            >
              Quick View
            </Button>
            <Button
              colorScheme="teal"
              flex={1}
              leftIcon={<BookOpen size={18} />}
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              Book Now
            </Button>
          </Stack>
        </Box>
      </Box>
    );
  }