import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Link,
  Icon,
  InputGroup,
  InputRightElement,
  HStack,
} from "@chakra-ui/react";
import { FaPlane } from "react-icons/fa";
import theme from "../components/theme";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../Uatoms/authAtom";
import useShowToast from "../hooks/useShowToast";



export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [loading, setLoading] = useState(false);
 

  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const showToast = useShowToast();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Signup successful!", "success");
      setAuthScreen("login"); // Switch to login form
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ChakraProvider theme={theme}>
      <Box
        minHeight="100vh"
        width="full"
        backgroundImage="url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')"
        backgroundSize="cover"
        backgroundPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          backdropFilter="blur(10px)"
          backgroundColor={useColorModeValue("white", "gray.dark")}
          borderRadius="xl"
          boxShadow="xl"
          p={8}
          maxWidth="400px"
          width="90%"
        >
          <Icon as={FaPlane} w={10} h={10} color="brand.500" mb={4} />
          <Heading mb={6} color="#004280">
            Create an Account
          </Heading>
          <Stack spacing={4} width="100%">
            <HStack>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  value={inputs.name}
                  onChange={(e) =>
                    setInputs((inputs) => ({ ...inputs, name: e.target.value }))
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={inputs.username}
                  onChange={(e) =>
                    setInputs((inputs) => ({ ...inputs, username: e.target.value }))
                  }
                />
              </FormControl>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={inputs.email}
                onChange={(e) =>
                  setInputs((inputs) => ({ ...inputs, email: e.target.value }))
                }
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs((inputs) => ({ ...inputs, password: e.target.value }))
                  }
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              loadingText="Signing up"
              size="lg"
              bg={useColorModeValue("gray.600", "gray.700")}
              color={"white"}
              _hover={{
                bg: useColorModeValue("gray.700", "gray.800"),
              }}
              onClick={handleSignup}
              isLoading={loading}
            >
              Sign up
            </Button>
          </Stack>
          <Text mt={6}>
            Already have an account?{" "}
            <Link color={"blue.400"} onClick={() => setAuthScreen("login")}>
              Log in
            </Link>
          </Text>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

