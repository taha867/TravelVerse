import { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  Button,
  IconButton,
  useToast,
  Grid,
  GridItem,
  Avatar,
  Input,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  useColorModeValue,
  Stack,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { Heart, MessageCircle } from "react-feather";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  Star,
  Eye,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LogIn,
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const TourCard = ({ tour, isSelected = false, allTours = [], currentIndex = 0 }) => {
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const badgeBg = useColorModeValue('teal.50', 'teal.900');
  const badgeColor = useColorModeValue('teal.700', 'teal.200');
  const likesListBg = useColorModeValue('gray.50', 'gray.700');

  // Hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // State
  const [displayedTourIndex, setDisplayedTourIndex] = useState(currentIndex);
  const [displayedTour, setDisplayedTour] = useState(tour);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAllLikes, setShowAllLikes] = useState(false);

  // Effects
  useEffect(() => {
    // Update displayed tour when index changes
    if (allTours && allTours.length > 0) {
      setDisplayedTour(allTours[displayedTourIndex]);
    }
  }, [displayedTourIndex, allTours]);

  useEffect(() => {
    // Fetch comments when tour changes
    if (displayedTour?._id) {
      fetchComments(displayedTour._id);
      checkUserLike(displayedTour._id);
    }
  }, [displayedTour]);

  // Early return if no tour data
  if (!tour) {
    return null;
  }

  // Get token from localStorage with more flexible checking
  const getToken = () => {
    try {
      // Try all possible localStorage keys
      const possibleKeys = [
        "user-threads",
        "travel-company-data",
        "user-data",
        "userData",
        "authToken",
        "token"
      ];
      
      // Check direct token storage
      for (const key of possibleKeys) {
        const item = localStorage.getItem(key);
        if (!item) continue;
        
        // Case 1: Direct token string
        if (item.startsWith('Bearer ') || item.startsWith('bearer ') || 
            item.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)) {
          console.log(`Found direct token in ${key}`);
          return item;
        }
        
        // Case 2: JSON object with token
        try {
          const parsed = JSON.parse(item);
          
          // Check common token property names
          const tokenProps = ['token', 'accessToken', 'access_token', 'authToken', 'auth_token', 'jwt'];
          for (const prop of tokenProps) {
            if (parsed[prop]) {
              console.log(`Found token in ${key}.${prop}`);
              return parsed[prop];
            }
          }
          
          // Check nested user object
          if (parsed.user && typeof parsed.user === 'object') {
            for (const prop of tokenProps) {
              if (parsed.user[prop]) {
                console.log(`Found token in ${key}.user.${prop}`);
                return parsed.user[prop];
              }
            }
          }
        } catch (e) {
          // Not JSON, continue to next key
        }
      }
      
      console.log("No token found in localStorage");
      return null;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  // Get current user ID from localStorage with more flexible checking
  const getUserId = () => {
    try {
      // Try all possible localStorage keys
      const possibleKeys = [
        "user-threads",
        "travel-company-data",
        "user-data",
        "userData"
      ];
      
      for (const key of possibleKeys) {
        const item = localStorage.getItem(key);
        if (!item) continue;
        
        try {
          const parsed = JSON.parse(item);
          
          // Direct ID
          if (parsed._id) {
            console.log(`Found user ID in ${key}._id`);
            return parsed._id;
          }
          
          // ID in user object
          if (parsed.user && typeof parsed.user === 'object') {
            if (parsed.user._id) {
              console.log(`Found user ID in ${key}.user._id`);
              return parsed.user._id;
            }
            if (parsed.user.id) {
              console.log(`Found user ID in ${key}.user.id`);
              return parsed.user.id;
            }
          }
          
          // ID in data object
          if (parsed.data && typeof parsed.data === 'object') {
            if (parsed.data._id) {
              console.log(`Found user ID in ${key}.data._id`);
              return parsed.data._id;
            }
            if (parsed.data.id) {
              console.log(`Found user ID in ${key}.data.id`);
              return parsed.data.id;
            }
            if (parsed.data.user && parsed.data.user._id) {
              console.log(`Found user ID in ${key}.data.user._id`);
              return parsed.data.user._id;
            }
          }
        } catch (e) {
          // Not JSON, continue to next key
        }
      }
      
      console.log("No user ID found in localStorage");
      return null;
    } catch (error) {
      console.error("Error getting user ID:", error);
      return null;
    }
  };

  // Fetch comments for a post
  const fetchComments = async (postId) => {
    try {
      setLoading(true);
      // Get the post details which should include replies/comments
      // Don't require authentication to view comments
      const response = await axios.get(`/api/posts/${postId}`);
      
      console.log("Fetched post data:", response.data);
      
      // Check different possible structures for comments/replies
      if (response.data.post || response.data.entry) {
        const postData = response.data.post || response.data.entry;
        
        if (postData.replies && Array.isArray(postData.replies)) {
          // Format replies according to our model
          const formattedReplies = postData.replies.map(reply => {
            // If reply is already in the correct format, return it as is
            if (reply.userId && reply.text) {
              return reply;
            }
            
            // If reply has a nested user object, extract the data
            if (reply.user) {
              return {
                _id: reply._id,
                userId: reply.user._id,
                text: reply.text,
                userProfilePic: reply.user.profilePic || reply.user.avatar,
                username: reply.user.username,
                isAuthor: reply.isAuthor || false,
                createdAt: reply.createdAt
              };
            }
            
            // Default format
            return reply;
          });
          
          setComments(formattedReplies);
          console.log("Found and formatted replies:", formattedReplies.length);
        } else if (postData.comments && Array.isArray(postData.comments)) {
          setComments(postData.comments);
          console.log("Found comments:", postData.comments.length);
        } else if (Array.isArray(response.data.replies)) {
          setComments(response.data.replies);
          console.log("Found replies at root:", response.data.replies.length);
        } else if (Array.isArray(response.data.comments)) {
          setComments(response.data.comments);
          console.log("Found comments at root:", response.data.comments.length);
        } else {
          console.log("No comments or replies found in response");
          setComments([]);
        }
        
        // Also update like count here to ensure it's always in sync
        if (postData.likes) {
          setLikeCount(postData.likes.length);
          
          // Fetch detailed information about users who liked the post
          if (postData.likes.length > 0) {
            fetchLikedUsers(postData.likes);
          } else {
            setLikedUsers([]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast({
        title: "Error fetching comments",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get company details by ID
  const getCompanyDetailsById = async (companyId) => {
    try {
      console.log("Fetching company details for ID:", companyId);
      
      // Fetch company details directly using the company ID
      const companiesResponse = await axios.get(`/api/travelcompany/${companyId}`);
      
      console.log("Company API response:", companiesResponse.data);
      
      if (companiesResponse.data && companiesResponse.data.company) {
        // If the API returns the company directly
        const company = companiesResponse.data.company;
        return {
          _id: company._id,
          username: company.companyName,
          profilePic: company.logo || "https://via.placeholder.com/50?text=TC",
          isCompany: true
        };
      } else if (companiesResponse.data) {
        // If the API returns the company object directly
        const company = companiesResponse.data;
        return {
          _id: company._id,
          username: company.companyName,
          profilePic: company.logo || "https://via.placeholder.com/50?text=TC",
          isCompany: true
        };
      }
      
      // If we couldn't find the company, return a fallback
      return {
        _id: companyId,
        username: "Travel Company",
        profilePic: "https://via.placeholder.com/50?text=TC",
        isCompany: true
      };
    } catch (error) {
      console.error("Error fetching company details:", error);
      
      // Return a fallback object if we couldn't fetch the company details
      return {
        _id: companyId,
        username: "Travel Company",
        profilePic: "https://via.placeholder.com/50?text=TC",
        isCompany: true
      };
    }
  };

  // Fetch detailed information about users who liked the post
  const fetchLikedUsers = async (likes) => {
    try {
      console.log("Fetching liked users for:", likes);
      
      // If likes is already an array of user objects with details, use it directly
      if (likes.length > 0 && likes[0].userId && (likes[0].username || likes[0].userProfilePic)) {
        console.log("Likes already contain user details:", likes);
        setLikedUsers(likes);
        return;
      }
      
      // Otherwise, fetch details for each user ID
      const likePromises = likes.map(async (like) => {
        // Extract the user ID from the like object or use the like directly if it's a string
        const userId = typeof like === 'string' ? like : like.userId;
        const isCompany = typeof like === 'object' && like.isCompany;
        
        if (!userId) {
          console.log("Invalid like object:", like);
          return null;
        }
        
        try {
          if (isCompany) {
            // Fetch travel company details
            return await getCompanyDetailsById(userId);
          } else {
            // Fetch user details
            const userResponse = await axios.get(`/api/users/${userId}`);
            
            if (userResponse.data && userResponse.data.user) {
              const userData = userResponse.data.user;
              return {
                _id: userData._id,
                username: userData.username,
                profilePic: userData.profilePic || userData.avatar || "https://via.placeholder.com/50?text=U",
                isCompany: false
              };
            } else if (userResponse.data) {
              // If the API returns the user object directly
              const userData = userResponse.data;
              return {
                _id: userData._id,
                username: userData.username,
                profilePic: userData.profilePic || userData.avatar || "https://via.placeholder.com/50?text=U",
                isCompany: false
              };
            }
          }
        } catch (error) {
          console.error(`Error fetching details for ${isCompany ? 'company' : 'user'} ${userId}:`, error);
          // Return a placeholder for failed fetches
          return {
            _id: userId,
            username: isCompany ? "Travel Company" : "User",
            profilePic: isCompany ? "https://via.placeholder.com/50?text=TC" : "https://via.placeholder.com/50?text=U",
            isCompany: isCompany
          };
        }
      });
      
      const likedUsersDetails = await Promise.all(likePromises);
      const validUsers = likedUsersDetails.filter(user => user !== null);
      
      console.log("Fetched liked users details:", validUsers);
      setLikedUsers(validUsers);
    } catch (error) {
      console.error("Error fetching liked users:", error);
    }
  };

  // Check if user has liked the post
  const checkUserLike = async (postId) => {
    try {
      const token = getToken();
      const userId = getUserId();
      
      // Get the post details to check like status - don't require auth for viewing
      const response = await axios.get(`/api/posts/${postId}`);
      
      console.log("Like check response:", response.data);
      
      if (response.data.post || response.data.entry) {
        const postData = response.data.post || response.data.entry;
        
        // Set like count regardless of auth status
        if (postData.likes) {
          setLikeCount(postData.likes.length);
          
          // If the likes array contains detailed user information, use it directly
          if (postData.likes.length > 0 && 
              postData.likes[0].userId) {
            
            // The likes array already contains the user details
            setLikedUsers(postData.likes);
            console.log("Using detailed likes from response:", postData.likes);
          } 
          // Otherwise, fetch user details for each like ID
          else if (postData.likes.length > 0) {
            // For backward compatibility - fetch user details for each like ID
            const likeIds = postData.likes.map(like => 
              typeof like === 'string' ? like : like.userId
            ).filter(id => id); // Filter out any undefined/null IDs
            
            fetchLikedUsers(likeIds);
          } else {
            setLikedUsers([]);
          }
          
          // Only check if the current user liked the post if they're logged in
          if (token && userId) {
            // Check if user has liked the post in the new structure
            const userLiked = postData.likes.some(like => 
              (like.userId && like.userId.toString() === userId) || 
              (typeof like === 'string' && like === userId)
            );
            
            // Also check the likeIds array for backward compatibility
            const userLikedInLikeIds = postData.likeIds && 
                                      postData.likeIds.includes(userId);
            
            const isLiked = userLiked || userLikedInLikeIds;
            
            console.log("User liked status:", isLiked);
            setIsLiked(isLiked);
            
            // Store like status in localStorage to persist across refreshes
            localStorage.setItem(`post_${postId}_liked`, isLiked ? 'true' : 'false');
          } else {
            // Not logged in, so can't have liked the post
            setIsLiked(false);
          }
        }
      }
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  // Load initial data when modal opens
  useEffect(() => {
    if (isOpen && displayedTour?._id) {
      // Always fetch fresh data when modal opens
      fetchComments(displayedTour._id);
      checkUserLike(displayedTour._id);
      
      // Set up polling for real-time updates while modal is open
      const intervalId = setInterval(() => {
        if (isOpen && displayedTour?._id) {
          console.log("Polling for updates...");
          fetchComments(displayedTour._id);
          checkUserLike(displayedTour._id);
        }
      }, 30000); // Poll every 30 seconds
      
      return () => {
        clearInterval(intervalId); // Clean up interval on unmount or when modal closes
      };
    }
  }, [isOpen, displayedTour]);
  
  // Reset displayed tour when modal closes
  useEffect(() => {
    if (!isOpen) {
      setDisplayedTourIndex(currentIndex);
      setDisplayedTour(tour);
      setCommentText("");
      // Clear comments when modal closes to ensure fresh data on next open
      setComments([]);
      setLikeCount(0);
      setLikedUsers([]);
      setShowAllLikes(false);
    }
  }, [isOpen, tour, currentIndex]);
  
  // Check localStorage for like status when component mounts
  useEffect(() => {
    if (displayedTour?._id) {
      const postId = displayedTour._id;
      const storedLikeStatus = localStorage.getItem(`post_${postId}_liked`);
      
      if (storedLikeStatus === 'true') {
        setIsLiked(true);
      } else if (storedLikeStatus === 'false') {
        setIsLiked(false);
      }
    }
  }, [displayedTour]);
  
  // For the card itself, we use the original tour prop
  const cardImageUrl = tour?.image || "https://via.placeholder.com/500";
  const cardTitle = tour?.title || "No Title Available";
  const cardLocation = tour?.location || "Unknown Location";
  const cardDuration = tour?.duration !== undefined ? `${tour.duration} days` : "N/A";
  const cardPrice = tour?.price !== undefined ? `Rs ${tour.price}` : "Price Not Available";
  const cardRating = tour?.rating !== undefined ? tour.rating.toFixed(1) : "N/A";
  const cardTripDate = tour?.tripDate ? new Date(tour.tripDate) : null;
  const cardEndDate = cardTripDate && tour?.duration ? new Date(cardTripDate.getTime() + tour.duration * 24 * 60 * 60 * 1000) : null;

  // For the modal, we use the displayed tour (which changes during navigation)
  const modalImageUrl = displayedTour?.image || "https://via.placeholder.com/500";
  const modalTitle = displayedTour?.title || "No Title Available";
  const modalLocation = displayedTour?.location || "Unknown Location";
  const modalDuration = displayedTour?.duration !== undefined ? `${displayedTour.duration} days` : "N/A";
  const modalPrice = displayedTour?.price !== undefined ? `Rs ${displayedTour.price}` : "Price Not Available";
  const modalRating = displayedTour?.rating !== undefined ? displayedTour.rating.toFixed(1) : "N/A";
  const modalTripDate = displayedTour?.tripDate ? new Date(displayedTour.tripDate) : null;
  const modalEndDate = modalTripDate && displayedTour?.duration ? new Date(modalTripDate.getTime() + displayedTour.duration * 24 * 60 * 60 * 1000) : null;

  // Navigation handlers
  const handlePrevious = () => {
    if (displayedTourIndex > 0) {
      const newIndex = displayedTourIndex - 1;
      setDisplayedTourIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (displayedTourIndex < allTours.length - 1) {
      const newIndex = displayedTourIndex + 1;
      setDisplayedTourIndex(newIndex);
    }
  };

  // Toggle like status
  const handleLikeToggle = async () => {
    const token = getToken();
    const userId = getUserId();
    
    if (!token || !userId) {
      toast({
        title: "Please log in to like posts",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    try {
      // Optimistic update
      const newLikedStatus = !isLiked;
      setIsLiked(newLikedStatus);
      
      if (newLikedStatus) {
        // Optimistically increment like count
        setLikeCount(prevCount => prevCount + 1);
      } else {
        // Optimistically decrement like count
        setLikeCount(prevCount => Math.max(0, prevCount - 1));
      }
      
      // Make API call to toggle like status
      const response = await axios.post(
        `/api/posts/like/${displayedTour._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("Like toggle response:", response.data);
      
      // Update localStorage to persist like status
      localStorage.setItem(`post_${displayedTour._id}_liked`, newLikedStatus ? 'true' : 'false');
      
      // Refresh like count and liked users from server
      if (response.data.post) {
        const updatedPost = response.data.post;
        
        if (updatedPost.likes) {
          setLikeCount(updatedPost.likes.length);
          fetchLikedUsers(updatedPost.likes);
        }
      }
      
      // Show success message
      toast({
        title: newLikedStatus ? "Post liked" : "Post unliked",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error toggling like status:", error);
      
      // Revert optimistic update on error
      setIsLiked(!isLiked);
      
      // Revert like count
      checkUserLike(displayedTour._id);
      
      // Show error message
      if (error.response && error.response.status === 401) {
        toast({
          title: "Session expired",
          description: "Please log in again",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error updating like status",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  // Submit a comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!commentText.trim()) {
      toast({
        title: "Comment cannot be empty",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    const token = getToken();
    const userId = getUserId();
    
    if (!token || !userId) {
      toast({
        title: "Please log in to comment",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Clear input field for better UX
      setCommentText("");
      
      // Make API call to submit comment
      const response = await axios.post(
        `/api/posts/reply/${displayedTour._id}`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("Comment submission response:", response.data);
      
      // Handle different response formats
      if (response.data.reply) {
        // If the API returns the new reply directly
        const newComment = response.data.reply;
        setComments(prevComments => [...prevComments, newComment]);
        
        toast({
          title: "Comment added",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (response.data.post && (response.data.post.replies || response.data.post.comments)) {
        // If the API returns the updated post with all replies/comments
        const updatedComments = response.data.post.replies || response.data.post.comments;
        setComments(updatedComments);
        
        toast({
          title: "Comment added",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // If we're not sure about the response structure, refresh all comments
        fetchComments(displayedTour._id);
        
        toast({
          title: "Comment added",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      
      // Set the comment text back if submission failed
      setCommentText(commentText);
      
      // Handle different error scenarios
      if (error.response) {
        if (error.response.status === 401) {
          toast({
            title: "Session expired",
            description: "Please log in again to comment",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else if (error.response.data && error.response.data.message) {
          toast({
            title: "Error",
            description: error.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error submitting comment",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Network error",
          description: "Please check your connection",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000); // difference in seconds
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
    
    return new Date(date).toLocaleDateString();
  };

  // Toggle showing all likes
  const toggleShowAllLikes = () => {
    setShowAllLikes(!showAllLikes);
  };

  return (
    <>
      <Box
        width="100%"
        maxW={{ base: "100%", md: "500px" }}
        minH="550px"
        bg={cardBg}
        color={textColor}
        borderRadius="xl"
        overflow="hidden"
        shadow="lg"
        transition="all 0.2s"
        _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
        border={isSelected ? "2px solid" : "none"}
        borderColor={isSelected ? "teal.500" : "transparent"}
      >
        {/* Image Section */}
        <Box position="relative" h="250px">
          <Image src={cardImageUrl} alt={cardTitle} objectFit="cover" w="100%" h="100%" />
          <Badge
            position="absolute"
            top={4}
            right={4}
            px={3}
            py={2}
            borderRadius="full"
            bg={badgeBg}
            color={badgeColor}
            fontWeight="bold"
            fontSize="md"
            boxShadow="md"
          >
            {cardPrice}
          </Badge>
        </Box>

        {/* Tour Details */}
        <Box p={6} bg={cardBg}>
          <Flex direction="column" gap={4}>
            {/* Title and Price */}
            <Flex justify="space-between" align="center">
              <Heading as="h3" size="lg" fontWeight="bold" color={textColor}>
                {cardTitle}
              </Heading>
              <Badge
                px={3}
                py={2}
                borderRadius="lg"
                bg={badgeBg}
                color={badgeColor}
                fontSize="lg"
                fontWeight="bold"
              >
                {cardPrice}
              </Badge>
            </Flex>

            {/* Location and Duration */}
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <Box>
                <HStack spacing={2} color={textColor}>
                  <MapPin size={20} />
                  <Text fontSize="md" fontWeight="medium">Location</Text>
                </HStack>
                <Text mt={1} fontSize="lg" color={textColor}>
                  {cardLocation}
                </Text>
              </Box>
              <Box>
                <HStack spacing={2} color={textColor}>
                  <Clock size={20} />
                  <Text fontSize="md" fontWeight="medium">Duration</Text>
                </HStack>
                <Text mt={1} fontSize="lg" color={textColor}>
                  {cardDuration}
                </Text>
              </Box>
            </Grid>

            {/* Dates */}
            {(cardTripDate || cardEndDate) && (
              <Box 
                mt={2} 
                p={3} 
                bg={likesListBg}
                borderRadius="lg"
              >
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  {cardTripDate && (
                    <Box>
                      <HStack spacing={2} color={textColor}>
                        <Calendar size={20} />
                        <Text fontSize="sm" fontWeight="medium">Start Date</Text>
                      </HStack>
                      <Text mt={1} fontSize="md" color={textColor}>
                        {cardTripDate.toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </Text>
                    </Box>
                  )}
                  {cardEndDate && (
                    <Box>
                      <HStack spacing={2} color={textColor}>
                        <Calendar size={20} />
                        <Text fontSize="sm" fontWeight="medium">End Date</Text>
                      </HStack>
                      <Text mt={1} fontSize="md" color={textColor}>
                        {cardEndDate.toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </Text>
                    </Box>
                  )}
                </Grid>
              </Box>
            )}

            {/* Rating */}
            <Flex 
              align="center" 
              mt={2}
              p={3}
              bg={likesListBg}
              borderRadius="lg"
            >
              <HStack spacing={2}>
                <Star size={24} fill="currentColor" color={badgeColor} />
                <Text fontSize="xl" fontWeight="bold" color={badgeColor}>
                  {cardRating}
                </Text>
                <Text fontSize="md" color={textColor}>
                  rating
                </Text>
              </HStack>
            </Flex>

            {/* Action Buttons */}
            <Stack direction="row" spacing={4} mt={4}>
              <Button
                variant="outline"
                colorScheme="teal"
                flex={1}
                leftIcon={<Eye size={18} />}
                onClick={onOpen}
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "md"
                }}
                transition="all 0.2s"
              >
                Quick View
              </Button>
              <Button
                colorScheme="teal"
                flex={1}
                leftIcon={<BookOpen size={18} />}
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "md"
                }}
                transition="all 0.2s"
              >
                Book Now
              </Button>
            </Stack>
          </Flex>
        </Box>
      </Box>

      {/* ✅ Modal for Quick View with Navigation Arrows and Comments */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent position="relative" maxH="90vh" mx={12}>
          {/* Navigation Arrows - Positioned outside modal */}
          <Flex 
            position="absolute" 
            top="50%" 
            width="calc(100% + 8rem)" 
            left="-4rem"
            justify="space-between" 
            zIndex={2} 
            transform="translateY(-50%)"
          >
            <IconButton
              icon={<ChevronLeft size={32} />}
              aria-label="Previous tour"
              variant="solid"
              colorScheme="teal"
              rounded="full"
              size="lg"
              onClick={handlePrevious}
              isDisabled={!allTours || displayedTourIndex === 0}
              _hover={{ transform: "scale(1.1)" }}
              transition="all 0.2s"
            />
            <IconButton
              icon={<ChevronRight size={32} />}
              aria-label="Next tour"
              variant="solid"
              colorScheme="teal"
              rounded="full"
              size="lg"
              onClick={handleNext}
              isDisabled={!allTours || displayedTourIndex === allTours.length - 1}
              _hover={{ transform: "scale(1.1)" }}
              transition="all 0.2s"
            />
          </Flex>

          <ModalCloseButton zIndex={3} />
          <ModalBody p={0}>
            <Grid 
              templateColumns={{ base: "1fr", md: "1fr 1fr" }} 
              h="90vh" 
              maxH="90vh"
              overflow="hidden"
            >
              {/* Left side - Tour Image and Details */}
              <GridItem 
                position="relative" 
                overflow="auto"
                h="full"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: useColorModeValue('gray.100', 'gray.700'),
                    borderRadius: '4px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: useColorModeValue('gray.300', 'gray.600'),
                    borderRadius: '4px',
                  },
                }}
              >
                {/* Tour Image */}
                <Box h={{ base: "300px", md: "400px" }}>
                  <Image src={modalImageUrl} alt={modalTitle} objectFit="cover" w="100%" h="100%" />
                </Box>

                {/* Tour Details */}
                <Box p={6} bg={cardBg}>
                  <Flex direction="column" gap={6}>
                    {/* Title and Description */}
                    <Box>
                      <Heading as="h2" size="xl" mb={3} color={useColorModeValue('gray.800', 'white')}>
                        {modalTitle}
                      </Heading>
                      <Text 
                        fontSize="lg" 
                        color={useColorModeValue('gray.600', 'gray.300')}
                        lineHeight="tall"
                      >
                        {displayedTour?.text || "No description available."}
                      </Text>
                    </Box>

                    {/* Price and Rating */}
                    <Flex 
                      gap={4} 
                      p={4} 
                      bg={useColorModeValue('gray.50', 'gray.700')}
                      borderRadius="xl"
                      justify="space-between"
                      align="center"
                    >
                      <Box>
                        <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>Price</Text>
                        <Text fontSize="2xl" fontWeight="bold" color={useColorModeValue('teal.600', 'teal.200')}>
                          {modalPrice}
                        </Text>
                      </Box>
                      <Box textAlign="right">
                        <HStack spacing={2} justify="flex-end">
                          <Star size={24} fill="currentColor" color={useColorModeValue('yellow.500', 'yellow.200')} />
                          <Text fontSize="2xl" fontWeight="bold" color={useColorModeValue('yellow.600', 'yellow.200')}>
                            {modalRating}
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>Rating</Text>
                      </Box>
                    </Flex>

                    {/* Tour Details Grid */}
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                      {/* Location */}
                      <Box 
                        p={4} 
                        bg={useColorModeValue('gray.50', 'gray.700')}
                        borderRadius="lg"
                      >
                        <HStack spacing={3} color={useColorModeValue('gray.700', 'gray.300')}>
                          <MapPin size={24} />
                          <Box>
                            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>Location</Text>
                            <Text fontSize="lg" fontWeight="semibold">{modalLocation}</Text>
                          </Box>
                        </HStack>
                      </Box>

                      {/* Duration */}
                      <Box 
                        p={4} 
                        bg={useColorModeValue('gray.50', 'gray.700')}
                        borderRadius="lg"
                      >
                        <HStack spacing={3} color={useColorModeValue('gray.700', 'gray.300')}>
                          <Clock size={24} />
                          <Box>
                            <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>Duration</Text>
                            <Text fontSize="lg" fontWeight="semibold">{modalDuration}</Text>
                          </Box>
                        </HStack>
                      </Box>

                      {/* Start Date */}
                      {modalTripDate && (
                        <Box 
                          p={4} 
                          bg={useColorModeValue('gray.50', 'gray.700')}
                          borderRadius="lg"
                        >
                          <HStack spacing={3} color={useColorModeValue('gray.700', 'gray.300')}>
                            <Calendar size={24} />
                            <Box>
                              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>Start Date</Text>
                              <Text fontSize="lg" fontWeight="semibold">
                                {modalTripDate.toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </Text>
                            </Box>
                          </HStack>
                        </Box>
                      )}

                      {/* End Date */}
                      {modalEndDate && (
                        <Box 
                          p={4} 
                          bg={useColorModeValue('gray.50', 'gray.700')}
                          borderRadius="lg"
                        >
                          <HStack spacing={3} color={useColorModeValue('gray.700', 'gray.300')}>
                            <Calendar size={24} />
                            <Box>
                              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>End Date</Text>
                              <Text fontSize="lg" fontWeight="semibold">
                                {modalEndDate.toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </Text>
                            </Box>
                          </HStack>
                        </Box>
                      )}
                    </Grid>
                  </Flex>
                </Box>
              </GridItem>

              {/* Right side - Comments Section */}
              <GridItem 
                borderLeft="1px solid" 
                borderColor={useColorModeValue('gray.200', 'gray.700')} 
                display="flex" 
                flexDirection="column"
                h="full"
                overflow="hidden"
              >
                {/* Header */}
                <Box 
                  p={4} 
                  borderBottom="1px solid" 
                  borderColor={useColorModeValue('gray.200', 'gray.700')}
                  bg={cardBg}
                >
                  <Text fontSize="xl" fontWeight="bold">Comments</Text>
                </Box>

                {/* Comments List */}
                <VStack 
                  flex="1" 
                  overflowY="auto" 
                  spacing={4} 
                  align="stretch" 
                  p={4}
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: useColorModeValue('gray.100', 'gray.700'),
                      borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: useColorModeValue('gray.300', 'gray.600'),
                      borderRadius: '4px',
                    },
                  }}
                >
                  {loading ? (
                    <Flex justify="center" py={8}>
                      <Spinner size="md" color="teal.500" />
                    </Flex>
                  ) : comments.length > 0 ? (
                    comments.map((comment) => (
                      <HStack key={comment._id || `comment-${Math.random()}`} align="start" spacing={3}>
                        <Avatar 
                          size="sm" 
                          src={comment.userProfilePic || comment.user?.avatar} 
                          name={comment.username || comment.user?.username || "User"} 
                        />
                        <Box width="100%">
                          <Flex justifyContent="space-between" alignItems="center">
                            <HStack>
                              <Text fontWeight="bold">{comment.username || comment.user?.username || "User"}</Text>
                              {comment.isAuthor && (
                                <Badge colorScheme="teal" fontSize="xs">Author</Badge>
                              )}
                              {comment.isCompany && (
                                <Badge colorScheme="purple" fontSize="xs">Company</Badge>
                              )}
                              <Text fontSize="xs" color="gray.500">{formatDate(comment.createdAt)}</Text>
                            </HStack>
                        
                          </Flex>
                          <Text mt={1}>{comment.text}</Text>
                        </Box>
                      </HStack>
                    ))
                  ) : (
                    <Text textAlign="center" color="gray.500">No comments yet. Be the first to comment!</Text>
                  )}
                </VStack>

                {/* Like and Comment Section */}
                <Box 
                  p={4} 
                  borderTop="1px solid" 
                  borderColor={useColorModeValue('gray.200', 'gray.700')}
                  bg={cardBg}
                >
                  <HStack mb={3} justify="space-between">
                    <HStack>
                      <Tooltip label={!getToken() ? "Login to like this post" : isLiked ? "Unlike" : "Like"}>
                        <IconButton
                          icon={<Heart size={20} fill={isLiked ? "currentColor" : "none"} />}
                          aria-label="Like"
                          variant="ghost"
                          colorScheme={isLiked ? "red" : "gray"}
                          onClick={handleLikeToggle}
                        />
                      </Tooltip>
                      <Tooltip label={!getToken() ? "Login to comment on this post" : "Add a comment"}>
                        <IconButton
                          icon={<MessageCircle size={20} />}
                          aria-label="Comment"
                          variant="ghost"
                          onClick={() => {
                            if (!getToken()) {
                              toast({
                                title: "Authentication required",
                                description: "Please log in to comment. You need to be logged in as a user or travel company.",
                                status: "warning",
                                duration: 5000,
                                isClosable: true,
                              });
                              return;
                            }
                            document.getElementById("comment-input").focus();
                          }}
                        />
                      </Tooltip>
                    </HStack>
                    
                    {/* Login prompt for unauthenticated users */}
                    {!getToken() && (
                      <Link as={RouterLink} to="/login" style={{ textDecoration: 'none' }}>
                        <Button 
                          size="sm" 
                          colorScheme="teal" 
                          leftIcon={<LogIn size={16} />}
                          variant="outline"
                        >
                          Login to interact
                        </Button>
                      </Link>
                    )}
                  </HStack>
                  
                  {/* Likes Display - Instagram Style */}
                  <Box mb={3}>
                    {likedUsers.length > 0 ? (
                      <Box>
                        <HStack mb={1}>
                          <HStack spacing={-2} mr={2}>
                            {likedUsers.slice(0, 3).map((user, index) => (
                              <Avatar 
                                key={user.userId || user._id}
                                size="xs"
                                name={user.username}
                                src={user.userProfilePic || user.profilePic}
                                border="2px solid white"
                                ml={index > 0 ? "-10px" : 0}
                                zIndex={3 - index}
                              />
                            ))}
                          </HStack>
                          <Text fontSize="sm">
                            Liked by <Text as="span" fontWeight="bold">{likedUsers[0].username}</Text>
                            {likedUsers.length > 1 && (
                              <> and <Text as="span" fontWeight="bold" cursor="pointer" onClick={toggleShowAllLikes}>
                                {likedUsers.length - 1} {likedUsers.length === 2 ? 'other' : 'others'}
                              </Text>
                              </>
                            )}
                          </Text>
                        </HStack>
                        
                        {/* Expandable list of all likes */}
                        {showAllLikes && (
                          <Box 
                            mt={2} 
                            maxH="150px" 
                            overflowY="auto" 
                            p={2} 
                            borderRadius="md" 
                            bg={likesListBg}
                          >
                            <Text fontSize="sm" fontWeight="bold" mb={2}>Liked by:</Text>
                            <VStack align="stretch" spacing={2}>
                              {likedUsers.map(user => (
                                <HStack key={user.userId || user._id} spacing={2}>
                                  <Avatar size="xs" name={user.username} src={user.userProfilePic || user.profilePic} />
                                  <Text fontSize="sm">{user.username}</Text>
                                  {user.isCompany && (
                                    <Badge colorScheme="purple" fontSize="xs">Company</Badge>
                                  )}
                                </HStack>
                              ))}
                            </VStack>
                          </Box>
                        )}
                      </Box>
                    ) : (
                      <Text fontWeight="bold" mb={3}>{likeCount} likes</Text>
                    )}
                  </Box>
                  
                  {/* Comment Input */}
                  <Box mt={4}>
                    <form onSubmit={handleCommentSubmit}>
                      <Flex>
                        <Input
                          placeholder={getToken() ? "Add a comment..." : "Log in to comment"}
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          isDisabled={!getToken()}
                        />
                        <Button
                          ml={2}
                          colorScheme="blue"
                          type="submit"
                          isDisabled={!getToken() || !commentText.trim()}
                          isLoading={loading}
                        >
                          Post
                        </Button>
                      </Flex>
                    </form>
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TourCard;
