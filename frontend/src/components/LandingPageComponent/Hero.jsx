import { Box, Container, Heading, Text, Button, Stack, useColorModeValue, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, AspectRatio, Spinner, Center } from '@chakra-ui/react';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useState } from 'react';

export default function Hero() {
  const navigate = useNavigate(); // Initialize the navigate function
  const { isOpen, onOpen, onClose } = useDisclosure(); // Add this for modal control
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  // Define light and dark mode values
  const textColor = useColorModeValue("white", "white");
  const accentColor = useColorModeValue("blue.400", "blue.300");
  const buttonBgColor = useColorModeValue("blue.500", "blue.400");
  const buttonHoverBgColor = useColorModeValue("blue.600", "blue.500");

  // Function to navigate to the browse page
  const handleBrowseClick = () => {
    navigate("/browse"); // Navigate to the browse page
  };

  // Function to handle video load
  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };

  return (
    <Box
      minH="100vh"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      pt="72px" // Add padding top to account for navbar height
    >
      {/* Hero Image with Overlay */}
      <Box position="absolute" top={0} left={0} w="100%" h="100%" zIndex={0}>
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bgGradient="linear(to-b, rgba(0,0,0,0.2), rgba(0,0,0,0.6))"
          zIndex={1}
        />
        <Image
          src="neom-eOWabmCNEdg-unsplash.jpg" // Add this image to your public folder
          alt="Beautiful Pakistan Landscape"
          objectFit="cover"
          w="100%"
          h="100%"
          transform="scale(1.1)"
          transition="transform 3s ease-in-out"
          animation="zoom 20s infinite alternate"
          sx={{
            "@keyframes zoom": {
              "0%": { transform: "scale(1.1)" },
              "100%": { transform: "scale(1.15)" },
            },
          }}
        />
      </Box>

      {/* Content */}
      <Container maxW="8xl" position="relative" zIndex={2}>
        <Stack maxW="3xl" spacing={8}>
          <Box>
            <Text
              color={'whitesmoke'}
              fontWeight="500"
              mb={3}
              fontSize="lg"
              letterSpacing="wider"
            >
              EXPLORE WITH CONFIDENCE
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "5xl", lg: "7xl" }}
              fontWeight="800"
              lineHeight="1.1"
              color={textColor}
              letterSpacing="tight"
            >
              Experience the{" "}
              <Text
                as="span"
                position="relative"
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  
                  opacity: 0.3,
                  zIndex: -1,
                }}
              >
                Wonders
              </Text>
              {" "}of Pakistan
            </Heading>
          </Box>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="whiteAlpha.900"
            lineHeight="tall"
            maxW="2xl"
          >
            Discover breathtaking landscapes, rich cultural heritage, and unforgettable 
            adventures across the diverse regions of Pakistan.
          </Text>

          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={5}
            align="center"
            pt={4}
          >
            <Button
              size="lg"
              px={8}
              py={7}
              bg={buttonBgColor}
              color="white"
              fontSize="md"
              fontWeight="500"
              _hover={{
                bg: buttonHoverBgColor,
                transform: "translateY(-2px)",
                boxShadow: "xl",
              }}
              transition="all 0.3s"
              onClick={handleBrowseClick}
              rightIcon={<ArrowRight size={16} />}
            >
              Start Exploring
            </Button>
            <Button
              size="lg"
              px={8}
              py={7}
              variant="ghost"
              color="white"
              fontSize="md"
              fontWeight="500"
              _hover={{
                bg: "whiteAlpha.200",
                transform: "translateY(-2px)",
              }}
              transition="all 0.3s"
              leftIcon={<Play size={16} />}
              onClick={onOpen}
            >
              Watch Video
            </Button>
          </Stack>

          {/* Stats Section */}
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={{ base: 4, lg: 10 }}
            pt={12}
            mt={4}
            borderTop="1px solid"
            borderColor="whiteAlpha.200"
          >
            {[
              { label: "Destinations", value: "50+" },
              { label: "Happy Travelers", value: "1000+" },
              { label: "Local Guides", value: "25+" },
            ].map((stat) => (
              <Stack key={stat.label} spacing={1}>
                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="700"
                  color={accentColor}
                >
                  {stat.value}
                </Text>
                <Text color="whiteAlpha.800" fontSize="sm" fontWeight="500">
                  {stat.label}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Stack>

        {/* Update the Video Modal section */}
        <Modal 
          isOpen={isOpen} 
          onClose={() => {
            setIsVideoLoading(true);
            onClose();
          }} 
          size="4xl"
          isCentered
        >
          <ModalOverlay bg="blackAlpha.800"/>
          <ModalContent bg="transparent" boxShadow="none" mx={4}>
            <ModalCloseButton 
              color="white" 
              zIndex="modal"
              bg="blackAlpha.700"
              borderRadius="full"
              _hover={{ bg: "blackAlpha.800" }}
            />
            <ModalBody p={0} position="relative">
              {isVideoLoading && (
                <Center
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  bg="blackAlpha.700"
                  zIndex={1}
                  borderRadius="8px"
                >
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </Center>
              )}
              <AspectRatio ratio={16 / 9}>
                <video
                  autoPlay
                  controls
                  onLoadedData={handleVideoLoad}
                  style={{
                    borderRadius: '8px',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black'
                  }}
                >
                  <source src="/pakistan-tourism.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </AspectRatio>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
}
