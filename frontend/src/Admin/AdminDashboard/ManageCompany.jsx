import { useState, useEffect, useRef } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Link,
  Flex,
  Text,
  Spinner,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

const ManageCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [companyIdToDelete, setCompanyIdToDelete] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const getToken = () => {
    const adminData = JSON.parse(localStorage.getItem("Admin-data"));
    return adminData?.token;
  };

  const fetchCompanies = async () => {
    setLoading(true);
    const token = getToken();

    try {
      const res = await axios.get("/api/admin/Allcompanies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies(res.data.companies);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch companies.");
    } finally {
      setLoading(false);
    }
  };

  const searchCompanies = async () => {
    if (!searchQuery) {
      fetchCompanies();
      return;
    }

    setLoading(true);
    const token = getToken();

    try {
      const res = await axios.get(`/api/admin/Searchcompanies/search?query=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to search companies.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteCompany = (id) => {
    setCompanyIdToDelete(id);
    onOpen();
  };

  const deleteCompany = async () => {
    const token = getToken();

    try {
      await axios.delete(`/api/admin/deletecompany/${companyIdToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies(companies.filter((company) => company._id !== companyIdToDelete));
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete the company.");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  return (
    <Box p={6}>
      <Flex mb={4} justify="space-between">
        <Input
          placeholder="Search by company name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          width="300px"
        />
        <Button ml={2} onClick={searchCompanies} colorScheme="blue">
          Search
        </Button>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Company Name</Th>
            <Th>Email</Th>
            <Th>Instagram Link</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {companies.map((company) => (
            <Tr key={company._id}>
              <Td>{company.Companyname}</Td>
              <Td>{company.email}</Td>
              <Td>
                <Link href={company.instagramUrl} color="blue.500" isExternal>
                  View Profile
                </Link>
              </Td>
              <Td>{company.status}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => confirmDeleteCompany(company._id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Company
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this company? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteCompany} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ManageCompanies;