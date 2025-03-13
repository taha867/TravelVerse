import { Box, Flex, Avatar, VStack, HStack, Text, Button, Heading} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import UserAtom from "../../Uatoms/userAtom"; 
const ProfilePage = () => {
  const navigate = useNavigate();
  const profileData = useRecoilValue(UserAtom);

  if (!profileData) {
    return <Text color="red.500">No profile data available. Please log in.</Text>;
  }

  const { name, username, email, profilePic } = profileData;

  return (
    <Box>
      {/* Profile Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        gap={8}
        p={6}
        background="gray.50"
        borderRadius="md"
        boxShadow="lg"
        mb={6}
      >
        <Avatar size="2xl" src={profilePic || "/placeholder-profile.jpg"} name={name} />
        <VStack align="start" spacing={4}>
          <HStack>
            <Heading size="lg">{name}</Heading>
          </HStack>
          <Text>
            <strong>Email:</strong> {email}
          </Text>
          <Text>
            <strong>Username:</strong> {username}
          </Text>
          <Button size="sm" colorScheme="teal" onClick={() => navigate("/updateUSERprofile")}>
            Edit Profile
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ProfilePage;
