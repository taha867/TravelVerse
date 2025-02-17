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
  useColorModeValue,
  Icon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FaPlane } from "react-icons/fa";
import theme from "../components/theme";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import useShowToast from "../hooks/useShowToast";
import AdminAtom from "../AAtom/AuserAtom";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const setadmin = useSetRecoilState(AdminAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const showToast = useShowToast();
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const data = await res.json();


      // ✅ Ensure token exists before saving
      if (!data.token) {
        showToast("Error", "Login failed: No token received!", "error");
        return;
      }

      // ✅ Store admin data and token inside the same object
      const adminData = {
        ...data.admin, // Admin info (username, role, etc.)
        token: data.token, // Store token inside Admin-data
      };

      localStorage.setItem("Admin-data", JSON.stringify(adminData));
        setadmin(adminData);
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
          backgroundColor={useColorModeValue("white", "gray.dark")}
          borderRadius="xl"
          boxShadow="xl"
          p={8}
          maxWidth="400px"
          width="90%"
        >
          <Icon as={FaPlane} w={10} h={10} color="brand.500" mb={4} />
          <Heading mb={6} color="#004280">
            Welcome Back Admin!
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
              bg={useColorModeValue("gray.600", "gray.700")}
              color={"white"}
              _hover={{
                bg: useColorModeValue("gray.700", "gray.800"),
              }}
              onClick={handleLogin}
              isLoading={loading}
            >
              Sign in
            </Button>
          </Stack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default AdminLogin;
