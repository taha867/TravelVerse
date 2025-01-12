import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";

const PostTour = ({ onTourPosted }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    duration: "",
    price: "",
    category: "Adventure",
    type: "Group",
    image: "",
  });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/tours/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("travel-company-data")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to post tour.");
      }

      const data = await response.json();
      toast({
        title: "Tour posted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onTourPosted(data.tour); // Callback to refresh tours list
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter tour title"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Location</FormLabel>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter tour location"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Duration (days)</FormLabel>
          <Input
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Enter duration"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Price (PKR)</FormLabel>
          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Category</FormLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Adventure">Adventure</option>
            <option value="Cultural">Cultural</option>
            <option value="Nature">Nature</option>
            <option value="Urban">Urban</option>
            <option value="Relaxation">Relaxation</option>
          </Select>
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Type</FormLabel>
          <Select name="type" value={formData.type} onChange={handleChange}>
            <option value="Group">Group</option>
            <option value="Private">Private</option>
            <option value="Self-guided">Self-guided</option>
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Image URL</FormLabel>
          <Input
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Post Tour
        </Button>
      </form>
    </Box>
  );
};

export default PostTour;
