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
  Flex,
  Spinner,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const getToken = () => {
    const adminData = JSON.parse(localStorage.getItem("Admin-data"));
    return adminData?.token;
  };

  const fetchUsers = async () => {
    setLoading(true);
    const token = getToken();

    try {
      const res = await axios.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      fetchUsers();
      return;
    }

    setLoading(true);
    const token = getToken();

    try {
      const res = await axios.get(`/api/admin/users/search?query=${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to search users.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteUser = (id) => {
    setUserIdToDelete(id);
    onOpen();
  };

  const deleteUser = async () => {
    const token = getToken();
    try {
      await axios.delete(`/api/admin/users/${userIdToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== userIdToDelete));
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete the user.");
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
          placeholder="Search by name..."
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
                  onClick={() => confirmDeleteUser(user._id)}
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
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteUser} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ManageUsers;