import {
  Box,
  Flex,
  Avatar,
  VStack,
  HStack,
  Text,
  Button,
  Heading,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import CuserAtom from "../../CAtom/CuserAtom"; // Adjust the path based on your folder structure
import PostsPage from "./PostPage"; // Import PostsPage

const ProfilePage = () => {
  const navigate = useNavigate();
  const profileData = useRecoilValue(CuserAtom);

  if (!profileData) {
    return <Text color="red.500">No profile data available. Please log in.</Text>;
  }

  const { company, Companyname, email, instagramUrl, profilePic, status } =
    profileData;

    const bgColor = useColorModeValue("gray.50", "gray.800");
    const textColor = useColorModeValue("gray.900", "white");
    const buttonColorScheme = useColorModeValue("teal", "teal.300");

  return (
    <Box>
      {/* Profile Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        gap={8}
        p={6}
        background={bgColor}
        borderRadius="md"
        boxShadow="lg"
        mb={6}
      >
        <Avatar size="2xl" src={profilePic || "/placeholder-profile.jpg"} name={company} />
        <VStack align="start" spacing={4}>
          <HStack>
            <Heading size="lg" color={textColor}>{Companyname}</Heading>
            <Badge colorScheme={status === "active" ? "green" : status === "approved" ? "yellow" : "red"}>
              {status}
            </Badge>
          </HStack>
          <Text color={textColor}>
            <strong>Email:</strong> {email}
          </Text >
          <Text color={textColor}>
            <strong>Instagram:</strong>{" "}
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" style={{ color: "teal" }}>
              {instagramUrl}
            </a>
          </Text>
          <Button size="sm" colorScheme={buttonColorScheme} onClick={() => navigate("/update-profile")}>
            Edit Profile
          </Button>
        </VStack>
      </Flex>

      {/* Posts Section */}
      <PostsPage posts={profileData.posts || []} />
    </Box>
  );
};

export default ProfilePage;
