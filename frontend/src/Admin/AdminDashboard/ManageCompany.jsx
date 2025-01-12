import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import axios from "axios";

const ManageCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/Allcompanies");
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
      fetchCompanies(); // Fetch all if no search query
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`/api/admin/Searchcompanies/search?query=${searchQuery}`);
      setCompanies(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to search companies.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      try {
        await axios.delete(`/api/admin/deletecompany/${id}`);
        setCompanies(companies.filter((company) => company._id !== id));
      } catch (err) {
        alert(err.response?.data?.error || "Failed to delete the company.");
      }
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
        <Button onClick={searchCompanies} colorScheme="blue" ml={2}>
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
                  onClick={() => deleteCompany(company._id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ManageCompanies;
