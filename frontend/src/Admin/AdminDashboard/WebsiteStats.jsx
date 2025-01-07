import { useEffect, useState } from "react";
import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";

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

  return (
    <Box ml="250px" p={4} pt={8}>
      <Heading mb={4}>Website Stats</Heading>
      <Text>Total Users: {stats.totalUsers}</Text>
      <Text>Total Companies: {stats.totalCompanies}</Text>
      <Text>Pending Approvals: {stats.pendingApprovals}</Text>
    </Box>
  );
};

export default WebsiteStats;
