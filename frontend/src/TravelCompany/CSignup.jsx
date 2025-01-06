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
  } from "@chakra-ui/react";
  import { FaBuilding } from "react-icons/fa";
  import theme from "../components/theme";
  import { useState } from "react";
  import useShowToast from "../hooks/useShowToast";
  import { useSetRecoilState } from "recoil";
  import authScreenAtom from "../CAtom/CauthAtom";
  
  export default function TravelCompanySignupForm() {
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
      company: "",
      Companyname: "",
      email: "",
      instagramUrl: "",
    });
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const showToast = useShowToast();
   
  
    const handleSignup = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/travelcompany/signup", {
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
        showToast("Success", "Signup request submitted! Await admin approval.", "success");
  
        // Clear inputs
        setInputs({
          company: "",
          Companyname: "",
          email: "",
          instagramUrl: "",
        });
  
        // Navigate to the home page
        
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
              Travel Company Signup
            </Heading>
            <Stack spacing={4} width="100%">
              <FormControl isRequired>
                <FormLabel>Company Name</FormLabel>
                <Input
                  type="text"
                  value={inputs.company}
                  onChange={(e) =>
                    setInputs((inputs) => ({ ...inputs, company: e.target.value }))
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={inputs.Companyname}
                  onChange={(e) =>
                    setInputs((inputs) => ({
                      ...inputs,
                      Companyname: e.target.value,
                    }))
                  }
                />
              </FormControl>
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
                <FormLabel>Instagram URL</FormLabel>
                <Input
                  type="url"
                  value={inputs.instagramUrl}
                  onChange={(e) =>
                    setInputs((inputs) => ({
                      ...inputs,
                      instagramUrl: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <Button
                size="lg"
                bg={"teal.400"}
                color={"white"}
                _hover={{
                  bg: "teal.500",
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
  