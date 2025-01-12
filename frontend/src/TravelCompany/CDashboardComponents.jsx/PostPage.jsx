import { Heading, Box, Grid, Image, Text } from "@chakra-ui/react";

const PostsPage = ({ posts }) => {
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
                src={post.imageUrl || "/placeholder-post.jpg"}
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
                {post.caption || "No caption provided"}
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
