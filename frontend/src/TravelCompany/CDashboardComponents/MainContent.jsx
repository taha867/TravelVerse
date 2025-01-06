import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Grid,
  Image,
  VStack,
  HStack,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function MainContent() {
  const navigate = useNavigate();
  return (
    <Box
      ml={{ base: 0, md: "240px" }} // Adjust margin-left for smaller screens
      flex={1}
      p={4}
    >
      {/* Profile Section */}
      <Flex
        mb={8}
        gap={8}
        direction={{ base: "column", md: "row" }} // Stack on smaller screens
        align={{ base: "center", md: "flex-start" }}
      >
        <Avatar size="2xl" name="Company Name" src="/company-logo.jpg" />
        <VStack align="start" spacing={4} textAlign={{ base: "center", md: "left" }}>
          <HStack spacing={4}>
            <Heading size="lg">Company Name</Heading>
            <Button
              size="sm"
              colorScheme="gray"
              onClick={() => navigate("/update-profile")}
            >
              Edit Profile
            </Button>
          </HStack>
          <HStack spacing={8}>
            <Text>
              <strong>13</strong> posts
            </Text>
            <Text>
              <strong>117</strong> followers
            </Text>
            <Text>
              <strong>379</strong> following
            </Text>
          </HStack>
          <Text fontWeight="bold">Company Description</Text>
          <Text>This is where the company bio and description would go...</Text>
        </VStack>
      </Flex>

      {/* Posts Grid */}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)", // Single column on small screens
          sm: "repeat(2, 1fr)", // Two columns on small screens
          md: "repeat(3, 1fr)", // Three columns on medium and larger screens
        }}
        gap={4}
      >
        {[1, 2, 3, 4, 5, 6].map((post) => (
          <Box key={post} position="relative" paddingBottom="100%">
            <Image
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              objectFit="cover"
              src={`/placeholder.svg?height=300&width=300`}
              alt={`Post ${post}`}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
