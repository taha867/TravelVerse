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
          variant={activeSection === "stats" ? "solid" : "ghost"}
          colorScheme="teal"
          onClick={() => setActiveSection("stats")}
        >
          Website Stats
        </Button>
        <Button
          variant={activeSection === "approval" ? "solid" : "ghost"}
          colorScheme="teal"
          onClick={() => setActiveSection("approval")}
        >
          Admin Approval
        </Button>
        
        <Button
          variant={activeSection === "manageuser" ? "solid" : "ghost"}
          colorScheme="teal"
          onClick={() => setActiveSection("manageuser")}
        >
          Manage Users
        </Button>
        <Button
          variant={activeSection === "managecompanies" ? "solid" : "ghost"}
          colorScheme="teal"
          onClick={() => setActiveSection("managecompanies")}
        >
          Manage Companies
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
