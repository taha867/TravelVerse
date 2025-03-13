import { useEffect, useState } from "react";
import { Heading, Box, Grid, Image, Text, useToast } from "@chakra-ui/react";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      const travelCompanyData = localStorage.getItem("travel-company-data");
      if (!travelCompanyData) {
        toast({
          title: "User not authenticated.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const parsedData = JSON.parse(travelCompanyData);
      let companyId;

      // Check if the data structure has changed (user object exists)
      if (parsedData.user) {
        companyId = parsedData.user?._id;  // If profile is edited, the ID is inside user object
      } else {
        companyId = parsedData?._id;  // If not edited, ID is at the root level
      }

      if (!companyId) {
        toast({
          title: "Company ID is missing.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      try {
        const response = await fetch(`/api/posts/company/${companyId}/posts`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch posts.");
        }

        setPosts(data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast({
          title: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchPosts();
  }, [toast]);

  return (
    <Box>
      <Heading size="md" mb={4}>
        Recent Posts
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <Box key={index} position="relative" paddingBottom="100%">
              <Image
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                objectFit="cover"
                src={post.image || "/placeholder-post.jpg"}  // Fallback image
                alt={`Post ${index + 1}`}
              />
              <Text
                position="absolute"
                bottom={0}
                left={0}
                bg="rgba(0,0,0,0.6)"
                color="white"
                p={2}
                w="100%"
                textAlign="center"
              >
                {post.title || "No title provided"}  {/* Display title */}
              </Text>
              <Text
                position="absolute"
                bottom={0}
                right={0}
                bg="rgba(0,0,0,0.6)"
                color="white"
                p={2}
                w="100%"
                textAlign="right"
              >
                {post.location || "Location not specified"}   {/* Display location */}
              </Text>
            </Box>
          ))
        ) : (
          <Text>No posts available</Text>
        )}
      </Grid>
    </Box>
  );
};

export default PostsPage;
