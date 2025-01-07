import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../AdminDashboard/Sidebar";
import AdminApproval from "./AdminApprovalPage";
import WebsiteStats from "../AdminDashboard/WebsiteStats";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("approval"); // Default section

  return (
    <Flex>
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
    
      {/* Main Content */}
      <Box ml="250px" mt="80px" width="100%" p={4}>
        {activeSection === "approval" && <AdminApproval />}
        {activeSection === "stats" && <WebsiteStats />}
      </Box>
    </Flex>
  );
};

export default AdminDashboard;
