import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import AdminApproval from "./AdminApprovalPage";
import WebsiteStats from "./WebsiteStats";
import ManageUser from "./ManageUser";
import ManageCompany from "./ManageCompany";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("approval"); // Default section

  return (
    <Flex>
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />
    
      {/* Main Content */}
      <Box ml="250px" mt="80px" width="100%" p={4}>
      {activeSection === "stats" && <WebsiteStats />}
        {activeSection === "approval" && <AdminApproval />}
        {activeSection === "manageuser" && <ManageUser/>}
        {activeSection === "managecompanies" && <ManageCompany />}
      </Box>
    </Flex>
  );
};

export default AdminDashboard;
