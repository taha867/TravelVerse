import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import theme from "../components/theme";

const AdminApprovalPage = () => {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Fetch pending travel companies
    const fetchPendingCompanies = async () => {
      try {
        const res = await fetch("/api/travelcompany?status=pending");
        const data = await res.json();

        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }

        setCompanies(data);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch travel companies.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPendingCompanies();
  }, [toast]);

  const handleApproval = async (companyId) => {
    try {
      const res = await fetch(`/api/travelcompany/approve/${companyId}`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      toast({
        title: "Success",
        description: "Travel company approved successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Update the UI to remove the approved company
      setCompanies((prev) => prev.filter((company) => company._id !== companyId));
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to approve travel company.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" height="calc(100vh - 64px)" mt="64px">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Box
        minHeight="calc(100vh - 64px)"
        py={10}
        px={6}
        mt="64px"
        // Uncomment below line to use a background color
        // backgroundColor={useColorModeValue("gray.100", "gray.900")}
      >
        <Heading as="h1" size="xl" mb={8} textAlign="center">
          Admin Approval Requests
        </Heading>
        {companies.length > 0 ? (
          <Table variant="simple" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Company Name</Th>
                <Th>Email</Th>
                <Th>Instagram URL</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {companies.map((company) => (
                <Tr key={company._id}>
                  <Td>{company.Companyname}</Td>
                  <Td>{company.email}</Td>
                  <Td>
                    <a
                      href={company.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Instagram
                    </a>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="green"
                      size="sm"
                      onClick={() => handleApproval(company._id)}
                    >
                      Approve
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Flex justify="center" align="center" height="50vh">
            <Heading as="h2" size="md">
              No pending requests.
            </Heading>
          </Flex>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default AdminApprovalPage;
