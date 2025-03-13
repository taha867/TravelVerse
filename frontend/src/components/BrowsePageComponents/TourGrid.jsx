import { useState, useEffect } from "react";
import { Box, Flex, Spinner, Text} from "@chakra-ui/react";
//import { getTours } from "../../utils/tours";
import { useSearch } from "./SearchContext"; 
import TourCard from "./TourCard";
import axios from "axios";

const TourGrid = () => {

  const { filters } = useSearch();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTourIndex, setCurrentTourIndex] = useState(null);
  
  // Navigation handler for tour cards
  const handleTourNavigation = (newIndex) => {
    setCurrentTourIndex(newIndex);
  };

  const getToken = () => {
    const adminData = JSON.parse(localStorage.getItem("Admin-data"));
    return adminData?.token;
  };

  const fetchTours = async () => {
    setLoading(true);
    const token = getToken();

    try {
        // ✅ Only send maxPrice if explicitly set by the user
        const queryParams = new URLSearchParams({
            location: filters.location || "",
            minPrice: filters.priceRange[0],
            ...(filters.priceRange[1] !== 10000 && { maxPrice: filters.priceRange[1] }), // ✅ Stops default maxPrice
            minDuration: filters.duration[0],
            maxDuration: filters.duration[1],
            rating: filters.rating,
            categories: filters.categories.join(","),
            type: filters.type.join(","),
        });

        console.log("🔍 Fetching with params:", queryParams.toString()); // ✅ Debugging log

        const res = await axios.get(`/api/posts?${queryParams.toString()}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ API Response:", res.data.posts.length, "posts received"); // ✅ Debugging log
        setTours(res.data.posts);
        setError("");

    } catch (err) {
        console.error("❌ Error fetching posts:", err);
        setError(err.response?.data?.error || "Failed to fetch tours.");
    } finally {
        setLoading(false);
    }
};


useEffect(() => {
    fetchTours();
}, [filters]);


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
    <Box 
    display="grid" 
    gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} // ✅ 1 card per row on small screens, 2 per row on larger screens
    gap={6} // ✅ Adds spacing between cards
    justifyContent="center"
>
    {tours.length > 0 ? (
        tours.map((tour, index) => (
            <TourCard 
                key={tour._id} 
                tour={tour} 
                allTours={tours}
                currentIndex={index}
                onNavigate={handleTourNavigation}
            />
        ))
    ) : (
        <Text>No tours available.</Text>
    )}
</Box>

  );
};

export default TourGrid;
