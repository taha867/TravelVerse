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
    Text,
    InputGroup,
    InputRightElement,
  } from "@chakra-ui/react";
  import { FaBuilding } from "react-icons/fa";
  import theme from "../components/theme";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import { useState } from "react";
  import useShowToast from "../hooks/useShowToast";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../CAtom/CauthAtom"; 
import { useNavigate } from "react-router-dom"; 
import CompanyAtom from "../CAtom/CuserAtom"

  export default function TravelCompanyLoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
      email: "",
      password: "",
    });
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const setCompany = useSetRecoilState(CompanyAtom);
    const navigate = useNavigate();
    const showToast = useShowToast();
  
    const handleLogin = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/travelcompany/login", {
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
        localStorage.setItem("travel-company-data", JSON.stringify(data));
        setCompany(data); // Update authenticated user state
        navigate("/"); // Redirect to home page
        showToast("Success", "Login successful!", "success");
        // Redirect or handle success
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
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={useColorModeValue("gray.100", "gray.900")}
        >
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            backdropFilter="blur(10px)"
            backgroundColor={useColorModeValue("white", "gray.800")}
            borderRadius="xl"
            boxShadow="xl"
            p={8}
            maxWidth="400px"
            width="90%"
          >
            <Icon as={FaBuilding} w={10} h={10} color="teal.400" mb={4} />
            <Heading mb={6} color={useColorModeValue("teal.600", "teal.200")}>
              Travel Company Login
            </Heading>
            <Stack spacing={4} width="100%">
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
                size="lg"
                bg={"teal.400"}
                color={"white"}
                _hover={{
                  bg: "teal.500",
                }}
                onClick={handleLogin}
                isLoading={loading}
              >
                Log in
              </Button>
            </Stack>
            <Text mt={6}>
            Don&apos;t have an account?{" "}
            <Link color={"blue.400"} onClick={() => setAuthScreen("signup")}>
              Signup
            </Link>
          </Text>
          </Flex>
        </Box>
      </ChakraProvider>
    );
  }
  