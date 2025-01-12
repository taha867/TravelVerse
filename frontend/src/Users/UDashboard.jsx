import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./UDashboardComponents/Sidebar";
import Profile from "./UDashboardComponents/ProfilePage";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile"); // Default section

  return (
    <Flex>
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />

      {/* Main Content */}
      <Box ml="250px" mt="80px" width="100%" p={4}>
        {activeSection === "profile" && <Profile />}
      </Box>
    </Flex>
  );
};

export default UserDashboard;
