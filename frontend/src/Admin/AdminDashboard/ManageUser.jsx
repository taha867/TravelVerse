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
  Flex,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/users");
      setUsers(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async () => {
    if (!searchQuery) {
      fetchUsers(); // Fetch all if no search query
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`/api/admin/users/search?query=${searchQuery}`);
      setUsers(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to search users.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/admin/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        alert(err.response?.data?.error || "Failed to delete the user.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
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
          placeholder="Search by name or username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          width="300px"
        />
        <Button onClick={searchUsers} colorScheme="blue" ml={2}>
          Search
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user._id}>
              <Td>{user.name}</Td>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => deleteUser(user._id)}
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

export default ManageUsers;
