import { Box, VStack, Button } from "@chakra-ui/react";

const Sidebar = ({ setActiveSection, activeSection }) => {
  return (
    <Box
      width="250px"
      position="fixed"
      top="0"
      mt="80px"
      left="0"
      height="100vh"
      backgroundColor="gray.800"
      color="white"
      p={4}
    >
      <VStack spacing={4} align="stretch">
        <Button
          variant={activeSection === "profile" ? "solid" : "ghost"}
          colorScheme="teal"
          onClick={() => setActiveSection("profile")}
        >
          Profile
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
