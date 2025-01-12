import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  Divider,
} from "@chakra-ui/react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const WebsiteStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/admin/stats");
        setStats(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch stats.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="calc(100vh - 80px)">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" height="calc(100vh - 80px)">
        <Text color="red.500">{error}</Text>
      </Flex>
    );
  }

  // Chart data for visualization
  const chartData = {
    labels: ["Total Users", "Total Companies", "Pending Approvals"],
    datasets: [
      {
        data: [stats.totalUsers, stats.totalCompanies, stats.pendingApprovals],
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
        hoverBackgroundColor: ["#66BB6A", "#FFB74D", "#EF5350"],
      },
    ],
  };

  return (
    <Box ml={{ base: "0", md: "250px" }} p={4} pt={8}>
      <Heading mb={6}>Website Stats</Heading>

      {/* Stats Section */}
      <Stack direction={["column", "row"]} spacing={8} mb={8}>
        <Stat bg="gray.100" p={4} borderRadius="md" boxShadow="md">
          <StatLabel>Total Users</StatLabel>
          <StatNumber>{stats.totalUsers}</StatNumber>
          <StatHelpText>Growth: {stats.userGrowth}%</StatHelpText>
        </Stat>
        <Stat bg="gray.100" p={4} borderRadius="md" boxShadow="md">
          <StatLabel>Total Companies</StatLabel>
          <StatNumber>{stats.totalCompanies}</StatNumber>
          <StatHelpText>Growth: {stats.companyGrowth}%</StatHelpText>
        </Stat>
        <Stat bg="gray.100" p={4} borderRadius="md" boxShadow="md">
          <StatLabel>Pending Approvals</StatLabel>
          <StatNumber>{stats.pendingApprovals}</StatNumber>
          <StatHelpText>New Today: {stats.newCompaniesToday}</StatHelpText>
        </Stat>
      </Stack>

      {/* Progress Indicators */}
      <Box mb={8}>
        <Heading size="md" mb={4}>
          Approval Progress
        </Heading>
        <Text mb={2}>Approved Companies: {stats.totalApprovals}</Text>
        <Progress
          value={(stats.totalApprovals / stats.totalCompanies) * 100}
          colorScheme="green"
          borderRadius="md"
        />
      </Box>

      {/* Chart Section */}
      <Box bg="gray.50" p={6} borderRadius="md" boxShadow="lg">
        <Heading size="md" mb={4}>
          Data Visualization
        </Heading>
        <Doughnut data={chartData} />
      </Box>

      <Divider my={8} />

      {/* Daily Stats */}
      <Box>
        <Heading size="md" mb={4}>
          Today&apos;s Stats
        </Heading>
        <Text>New Users: {stats.newUsersToday}</Text>
        <Text>New Companies: {stats.newCompaniesToday}</Text>
      </Box>
    </Box>
  );
};

export default WebsiteStats;
