import { Flex } from "@chakra-ui/react";
import Sidebar from "./CDashboardComponents/Sidebar";
import MainContent from "./CDashboardComponents/MainContent";

export default function CDashboard() {
  return (
    <Flex
      direction={{ base: "column", md: "row" }} // Stack on smaller screens
      pt="80px"
    >
      <Sidebar />
      <MainContent />
    </Flex>
  );
}
