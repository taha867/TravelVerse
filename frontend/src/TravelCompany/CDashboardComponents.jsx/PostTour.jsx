import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  Textarea,
} from "@chakra-ui/react";

const PostTour = ({ onTourPosted }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    text: "",
    duration: "",
    price: "",
    category: "Adventure",
    tourType: "Group",
    image: "",
    tripDate: "", // ✅ New field for start date
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    const createdBy = parsedData._id; // Extract user ID

    if (!formData.text || formData.text.trim() === "") {
      toast({
        title: "Text is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!formData.tripDate) {
      toast({
        title: "Start date is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const payload = { 
      ...formData, 
      createdBy, // Match backend field name
    };

    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${createdBy}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to post tour.");
      }

      toast({
        title: "Tour posted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onTourPosted(data.newEntry);
    } catch (error) {
      console.error("Error:", error);
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
          <FormLabel>Text</FormLabel>
          <Textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Enter description or additional information"
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Start Date</FormLabel> {/* ✅ New field for start date */}
          <Input
            name="tripDate"
            type="date"
            value={formData.tripDate}
            onChange={handleChange}
            placeholder="Select trip start date"
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
            min={1}
            max={30}
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
            min={0}
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
          <FormLabel>Tour Type</FormLabel>
          <Select
            name="tourType"
            value={formData.tourType}
            onChange={handleChange}
          >
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
