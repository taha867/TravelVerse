import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  Box,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import CompanyAtom from "../../CAtom/CuserAtom";
import usePreviewImg from "../../hooks/usePreviewImg";
import useShowToast from "../../hooks/useShowToast";

export default function UpdateProfilePage() {
  const [user, setUser] = useRecoilState(CompanyAtom);
  const [inputs, setInputs] = useState({
    company: user?.company || "",
    email: user?.email || "",
    instagramUrl: user?.instagramUrl || "",
    password: "",
  });

  const fileRef = useRef(null);
  const [updating, setUpdating] = useState(false);

  const showToast = useShowToast();

  const { handleImageChange, imgUrl } = usePreviewImg();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updating) return;    
    if (!user || !user._id) {
      showToast("Error", "User data is not available.", "error");
      return;
    }
    setUpdating(true);
    try {
      const res = await fetch(`/api/travelcompany/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      
      // Update user data and token in localStorage
      localStorage.setItem("travel-company-data", JSON.stringify({ 
        user: data.user,
        token: data.token 
      }));

      // Update Recoil state with user data
      setUser({ ...data.user, token: data.token });
      
      showToast("Success", "Profile updated successfully", "success");

    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };
  
  return (
    <Box mt="80px">
      <form onSubmit={handleSubmit}>
        <Flex align={"center"} justify={"center"} my={6}>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.dark")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              User Profile Edit
            </Heading>
            <FormControl id="userName">
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar
                    size="xl"
                    boxShadow={"md"}
                    src={imgUrl || user.profilePic}
                  />
                </Center>
                <Center w="full">
                  <Button w="full" onClick={() => fileRef.current.click()}>
                    Change Avatar
                  </Button>
                  <Input
                    type="file"
                    hidden
                    ref={fileRef}
                    onChange={handleImageChange}
                  />
                </Center>
              </Stack>
            </FormControl>
            <FormControl>
              <FormLabel>User name</FormLabel>
              <Input
                placeholder="johndoe"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, company: e.target.value })
                }
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="your-email@example.com"
                value={inputs.email}
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Instagram URL</FormLabel>
              <Input
                placeholder="Enter your Instagram profile URL"
                value={inputs.instagramUrl}
                onChange={(e) =>
                  setInputs({ ...inputs, instagramUrl: e.target.value })
                }
                _placeholder={{ color: "gray.500" }}
                type="url" // Use 'url' for better HTML5 validation
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                _placeholder={{ color: "gray.500" }}
                type="password"
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancel
              </Button>
              <Button
                bg={"green.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "green.500",
                }}
                type="submit"
                isLoading={updating}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
}
