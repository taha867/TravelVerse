import {
    Box,
    Container,
    Flex,
    VStack,
    Heading,
    Text,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    Icon,
    useToast,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { Mail, Phone, MapPin, Clock } from 'lucide-react';
  
  const ContactInfo = ({ icon, title, content }) => (
    <Flex align="center" gap={4}>
      <Box color="teal.500">
        <Icon as={icon} boxSize={6} />
      </Box>
      <Box>
        <Text fontWeight="bold">{title}</Text>
        <Text color="gray.600">{content}</Text>
      </Box>
    </Flex>
  );
  
  export default function ContactPage() {
    const toast = useToast();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        status: "success",
        duration: 5000,
      });
    };
  
    // Use Chakra's color mode hook for dynamic color changes
    const bgColor = useColorModeValue('white', 'gray.800'); // Background color for light/dark mode
    const boxShadow = useColorModeValue('lg', 'dark-lg'); // Box shadow for light/dark mode
  
    return (
      <Box>
        {/* Hero Section */}
        <Box
          h="300px"
          position="relative"
          mb={16}
        >
          <Box
            position="absolute"
            w="full"
            h="full"
            bgImage="url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')"
            bgSize="cover"
            bgPosition="center"
            filter="brightness(0.7)"
          />
          <Container
            maxW="7xl"
            h="full"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            color="white"
          >
            <Heading size="2xl" mb={4} textAlign="center">
              Get in Touch
            </Heading>
            <Text fontSize="xl" textAlign="center" maxW="xl">
              Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.
            </Text>
          </Container>
        </Box>
  
        {/* Contact Form & Info */}
        <Container maxW="7xl" pb={20}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16}>
            {/* Contact Information */}
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading size="lg" mb={6}>
                  Contact Information
                </Heading>
                <VStack spacing={6} align="stretch">
                  <ContactInfo
                    icon={Mail}
                    title="Email Us"
                    content="muhammadtaha1780@gmail.com"
                  />
                  <ContactInfo
                    icon={Phone}
                    title="Call Us"
                    content="+92 03224217019"
                  />
                  <ContactInfo
                    icon={MapPin}
                    title="Visit Us"
                    content="123 Travel Street, Adventure City, AC 12345852-B Milaad St, Block B Faisal Town, Lahore, Punjab 54770"
                  />
                  <ContactInfo
                    icon={Clock}
                    title="Business Hours"
                    content="Mon - Fri: 9:00 AM - 6:00 PM"
                  />
                </VStack>
              </Box>
  
              {/* Map or Image */}
              <Box
                h="300px"
                bg="gray.100"
                borderRadius="xl"
                overflow="hidden"
              >
                <Box
                  as="iframe"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2573.8661489391948!2d74.30301148701541!3d31.481569110070293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1736255127047!5m2!1sen!2s"
                   width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </Box>
            </VStack>
  
            {/* Contact Form */}
            <Box
              as="form"
              onSubmit={handleSubmit}
              bg={bgColor}
              p={8}
              borderRadius="xl"
              shadow={boxShadow}
            >
              <VStack spacing={6}>
                <Heading size="lg" w="full">
                  Send us a Message
                </Heading>
                
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                  <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input 
                      placeholder="John"
                      _focus={{ borderColor: 'teal.500' }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input 
                      placeholder="Doe"
                      _focus={{ borderColor: 'teal.500' }}
                    />
                  </FormControl>
                </SimpleGrid>
  
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input 
                    type="email"
                    placeholder="john@example.com"
                    _focus={{ borderColor: 'teal.500' }}
                  />
                </FormControl>
  
                <FormControl isRequired>
                  <FormLabel>Subject</FormLabel>
                  <Input 
                    placeholder="How can we help?"
                    _focus={{ borderColor: 'teal.500' }}
                  />
                </FormControl>
  
                <FormControl isRequired>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    placeholder="Your message..."
                    rows={6}
                    _focus={{ borderColor: 'teal.500' }}
                  />
                </FormControl>
  
                <Button
                  type="submit"
                  colorScheme="teal"
                  size="lg"
                  w="full"
                  _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                  transition="all 0.2s"
                >
                  Send Message
                </Button>
              </VStack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    );
  }
  