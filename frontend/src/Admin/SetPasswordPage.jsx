import { useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import theme from "../components/theme";

const SetPasswordPage = () => {
  const { companyId } = useParams(); // Get companyId from URL parameters
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch(`/api/travelcompany/set-password/${companyId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
  
      const data = await response.json();
      if (response.status !== 200) {
        toast({
          title: "Error",
          description: data.error || "Failed to set password.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
  
      toast({
        title: "Success",
        description: "Password set successfully. You can now log in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <ChakraProvider theme={theme}>
      <Flex
        minHeight="100vh"
        align="center"
        justify="center"
        backgroundColor="gray.100"
      >
        <Box
          width="400px"
          padding="6"
          borderRadius="md"
          boxShadow="lg"
          backgroundColor="white"
        >
          <Heading as="h1" size="lg" mb={6} textAlign="center">
            Set Your Password
          </Heading>
          <FormControl id="password" mb={4}>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="confirmPassword" mb={6}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Button
            colorScheme="teal"
            width="full"
            onClick={handlePasswordReset}
            isLoading={loading}
          >
            Set Password
          </Button>
          {loading && (
            <Flex justify="center" align="center" mt={4}>
              <Spinner size="md" />
            </Flex>
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default SetPasswordPage;
