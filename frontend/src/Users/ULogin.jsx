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
} from "@chakra-ui/react";
import { FaPlane } from "react-icons/fa";
import theme from "../components/theme";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../Uatoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../Uatoms/userAtom";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue("xl", "dark-lg");
  const btnBg = useColorModeValue("gray.600", "gray.700");
  const btnHover = useColorModeValue("gray.700", "gray.800");
  const headingColor = useColorModeValue("#004280", "blue.300");

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const showToast = useShowToast();
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/login", {
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
      localStorage.setItem("user-threads", JSON.stringify(data));
      setUser(data);
      navigate("/");
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
          backgroundColor={bg}
          borderRadius="xl"
          boxShadow={boxShadow}
          p={8}
          maxWidth="400px"
          width="90%"
        >
          <Icon as={FaPlane} w={10} h={10} color="brand.500" mb={4} />
          <Heading mb={6} color={headingColor}>
            Welcome Back!
          </Heading>
          <Stack spacing={4} width="100%">
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={inputs.username}
                onChange={(e) =>
                  setInputs((inputs) => ({
                    ...inputs,
                    username: e.target.value,
                  }))
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
                    setInputs((inputs) => ({
                      ...inputs,
                      password: e.target.value,
                    }))
                  }
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              loadingText="Logging in"
              size="lg"
              bg={btnBg}
              color={"white"}
              _hover={{
                bg: btnHover,
              }}
              onClick={handleLogin}
              isLoading={loading}
            >
              Sign in
            </Button>
          </Stack>
          <Text mt={6}>
            Don&apos;t have an account?{" "}
            <Link color={"blue.400"} onClick={() => setAuthScreen("signup")}>
              Sign up
            </Link>
          </Text>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
