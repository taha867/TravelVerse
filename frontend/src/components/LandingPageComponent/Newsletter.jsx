import { Box, Container, Heading, Text, Input, Button, VStack, useToast } from '@chakra-ui/react';
import { Send } from 'lucide-react';

export default function Newsletter() {
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Subscribed!',
      description: "Thank you for subscribing to our newsletter.",
      status: 'success',
      duration: 5000,
    });
  };

  return (
    <Box
      py={20}
      bg="teal.500"
      color="white"
      position="relative"
      overflow="hidden"
    >
      <Container maxW="3xl" textAlign="center">
        <VStack spacing={6}>
          <Heading fontSize={{ base: '3xl', md: '4xl' }}>
            Get Inspired for Your Next Journey
          </Heading>
          <Text fontSize="lg" opacity={0.9}>
            Subscribe to our newsletter and receive exclusive offers, travel tips, 
            and destination insights.
          </Text>
          <Box
            as="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection={{ base: 'column', sm: 'row' }}
            gap={4}
            w="full"
            maxW="md"
          >
            <Input
              placeholder="Enter your email"
              size="lg"
              bg="white"
              color="gray.900"
              _placeholder={{ color: 'gray.500' }}
              _hover={{ borderColor: 'white' }}
              _focus={{ borderColor: 'white' }}
              flex={1}
            />
            <Button
              type="submit"
              size="lg"
              bg="white"
              color="teal.500"
              rightIcon={<Send size={18} />}
              _hover={{ bg: 'gray.100' }}
            >
              Subscribe
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}