import {
  ChakraProvider,
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaPlane } from "react-icons/fa";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import AdminAtom from "../AAtom/AuserAtom";
import theme from "../components/theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const setAdmin = useSetRecoilState(AdminAtom);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await axios.post("/api/admin/login", inputs);
      const data = res.data;
console.log(data);
      if (!data.token) {
        toast({
          title: "Login failed",
          description: "No token received from server.",
          status: "error",
        });
        return;
      }

      const adminData = {
        ...data.admin,
        token: data.token,
      };
console.log(adminData);
      localStorage.setItem("Admin-data", JSON.stringify(adminData));
      setAdmin(adminData);

      toast({
        title: "Login successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.error || "Server error.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bgImage="url('https://source.unsplash.com/random?travel')"
        bgSize="cover"
      >
        <Box
          bg="whiteAlpha.900"
          p={8}
          borderRadius="md"
          boxShadow="xl"
          width="100%"
          maxWidth="400px"
        >
          <Flex direction="column" align="center" mb={4}>
            <FaPlane size={40} color="brand.500" />
            <Heading mt={4} mb={6} color="#004280">
              Admin Login
            </Heading>
          </Flex>

          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
              <InputRightElement>
                <Button
                  size="sm"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            mt={6}
            colorScheme="blue"
            width="full"
            isLoading={loading}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default AdminLogin;
