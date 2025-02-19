import { Box, Container, Heading, Text, Input, Button, VStack, useToast, useColorModeValue } from '@chakra-ui/react';
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

  // Define light and dark mode values using useColorModeValue
  const bgColor = useColorModeValue("blue.500", "blue.700");
  const textColor = useColorModeValue("white", "gray.100");
  const inputBgColor = useColorModeValue("white", "gray.800");
  const inputTextColor = useColorModeValue("gray.900", "white");
  const buttonBgColor = useColorModeValue("white", "gray.800");
  const buttonColor = useColorModeValue("blue.500", "blue.200");
  const buttonHoverBgColor = useColorModeValue("gray.100", "gray.600");

  return (
    <Box
      py={20}
      bg={bgColor}  // Dynamic background color based on color mode
      color={textColor}  // Dynamic text color based on color mode
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
              bg={inputBgColor}  // Input background color changes based on color mode
              color={inputTextColor}  // Input text color changes based on color mode
              _placeholder={{ color: 'gray.500' }}
              _hover={{ borderColor: 'white' }}
              _focus={{ borderColor: 'white' }}
              flex={1}
            />
            <Button
              type="submit"
              size="lg"
              bg={buttonBgColor}  // Button background color changes based on color mode
              color={buttonColor}  // Button text color changes based on color mode
              rightIcon={<Send size={18} />}
              _hover={{ bg: buttonHoverBgColor }}  // Button hover color changes based on color mode
            >
              Subscribe
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
