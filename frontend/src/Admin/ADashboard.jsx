import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const navigate = useNavigate();

  const navbarHeight = "64px"; // Adjust if your Navbar height is different
  const [stats, setStats] = useState(null); // State for stats
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchStats = async () => {
      try {
          const response = await axios.get("/api/admin/stats", {
              withCredentials: true, // This tells axios to include cookies in the request
          });
          setStats(response.data);
          setLoading(false);
      } catch (err) {
          setError(err.message || "Failed to fetch stats");
          setLoading(false);
      }
  };
  

    fetchStats();
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
        <Text color="red.500" fontSize="lg">
          {error}
        </Text>
      </Flex>
    );
  }

  return (
    <Box
      bg={bgColor}
      color={textColor}
      minHeight="100vh"
      p={4}
      pt={`calc(${navbarHeight} + 16px)`}
    >
      <Flex direction="column" align="center" justify="center">
        <Heading as="h1" size="xl" mb={6}>
          Admin Dashboard
        </Heading>
        <Text mb={4}>
          Welcome to the admin dashboard. Here you can manage users, travel companies, and view the latest stats.
        </Text>

        {/* Dashboard Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={8}>
          <Stat>
            <StatLabel>Total Users</StatLabel>
            <StatNumber>{stats.totalUsers}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              {stats.userGrowth}% since last month
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Total Travel Companies</StatLabel>
            <StatNumber>{stats.totalCompanies}</StatNumber>
            <StatHelpText>
              <StatArrow type={stats.companyGrowth > 0 ? "increase" : "decrease"} />
              {stats.companyGrowth}% since last month
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Total Approvals</StatLabel>
            <StatNumber>{stats.totalApprovals}</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              {stats.approvalGrowth}% since last month
            </StatHelpText>
          </Stat>
        </SimpleGrid>

        {/* Action Buttons */}
        <VStack spacing={4} mb={8}>
          <Button onClick={() => navigate("/admin-approval")} colorScheme="blue" size="lg" width="200px">
            Manage Approvals
          </Button>
          <Button onClick={() => navigate("/admin/users")} colorScheme="green" size="lg" width="200px">
            Manage Users
          </Button>
          <Button onClick={() => navigate("/admin/companies")} colorScheme="teal" size="lg" width="200px">
            Manage Companies
          </Button>
        </VStack>

        {/* Quick Stats Overview */}
        <Box width="full" borderWidth={1} borderRadius="lg" boxShadow="lg" p={4}>
          <Heading as="h2" size="lg" mb={4}>
            Quick Stats Overview
          </Heading>
          <Flex justify="space-between">
            <Box>
              <Text fontWeight="bold">New Users Today</Text>
              <Text fontSize="lg">{stats.newUsersToday}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">New Companies Today</Text>
              <Text fontSize="lg">{stats.newCompaniesToday}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Pending Approvals</Text>
              <Text fontSize="lg">{stats.pendingApprovals}</Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default AdminDashboard;
