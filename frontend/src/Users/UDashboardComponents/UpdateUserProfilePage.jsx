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
  import UserAtom from "../../Uatoms/userAtom";
  import usePreviewImg from "../../hooks/usePreviewImg";
  import useShowToast from "../../hooks/useShowToast";
  
  export default function UpdateUserProfilePage() {
    const [user, setUser] = useRecoilState(UserAtom);
    const [inputs, setInputs] = useState({
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
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
        const res = await fetch(`/api/users/update/${user._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
        });
        const data = await res.json(); // updated user object
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        showToast("Success", "Profile updated successfully", "success");
        setUser(data.user); // Set only the updated user object
        localStorage.setItem("user-threads", JSON.stringify({ user: data.user }));
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
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="John Doe"
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
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
  