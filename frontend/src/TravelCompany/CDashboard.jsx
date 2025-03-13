import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./CDashboardComponents.jsx/Sidebar";
import Profile from "./CDashboardComponents.jsx/ProfilePage";
import Posts from "./CDashboardComponents.jsx/PostPage";
import PostTour from "./CDashboardComponents.jsx/PostTour";

const CDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile"); // Default section
  const [tours, setTours] = useState([]); // State for managing tours

  const handleTourPosted = (newTour) => {
    setTours((prevTours) => [...prevTours, newTour]);
  };
  return (
    <Flex>
      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} />

      {/* Main Content */}
      <Box ml="250px" mt="80px" width="100%" p={4}>
        {activeSection === "profile" && <Profile />}
        {activeSection === "posts" && <Posts />}
        {activeSection === "postTour" && <PostTour onTourPosted={handleTourPosted} />}
      </Box>
    </Flex>
  );
};

export default CDashboard;
