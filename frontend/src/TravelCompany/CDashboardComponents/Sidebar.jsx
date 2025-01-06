import { Box, VStack, Icon, Text, Link, useBreakpointValue } from "@chakra-ui/react";
import { FaHome, FaUpload, FaEnvelope } from "react-icons/fa";

export default function Sidebar() {
  const isSidebarVisible = useBreakpointValue({ base: false, md: true }); // Hide on smaller screens

  if (!isSidebarVisible) return null;

  return (
    <Box
      position="fixed"
      left={0}
      width="240px"
      height="calc(100vh - 80px)"
      borderRight="1px"
      borderColor="gray.200"
      p={4}
      bg="white"
      zIndex={1}
    >
      <VStack spacing={4} align="stretch">
        <Link
          href="#"
          display="flex"
          alignItems="center"
          p={2}
          borderRadius="md"
          _hover={{ bg: "gray.100" }}
        >
          <Icon as={FaHome} mr={3} />
          <Text>Home</Text>
        </Link>
        <Link
          href="#"
          display="flex"
          alignItems="center"
          p={2}
          borderRadius="md"
          _hover={{ bg: "gray.100" }}
        >
          <Icon as={FaUpload} mr={3} />
          <Text>Upload Post</Text>
        </Link>
        <Link
          href="#"
          display="flex"
          alignItems="center"
          p={2}
          borderRadius="md"
          _hover={{ bg: "gray.100" }}
        >
          <Icon as={FaEnvelope} mr={3} />
          <Text>Messages</Text>
        </Link>
      </VStack>
    </Box>
  );
}
