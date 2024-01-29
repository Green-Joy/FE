import { Image, Text, Box,Flex, Stack, Input, Heading,Button, Textarea } from '@chakra-ui/react';
import { useState } from "react";
import axios from 'axios';

export default function FeedUpload() {
  // 사진 업로드
  const [selectedFile, setSelectedFile] = useState(null);
  // 서버 연동
  const [formData, setFormData] = useState({
    userId: "i8P3tUWBrr8wbYTSxsL9Y",
    title: "",
    content: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateFeed = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/posts', formData);
      console.log('Feed created successfully:', response.data);
      // You can add additional logic here, such as redirecting the user or updating state.
    } catch (error) {
      console.error('Error creating feed:', error);
      // Handle the error (display a message to the user, etc.)
    }
  };

  return (
    <>
    <Heading size="lg" margin={8}>
      CREATE FEED
    </Heading>
    <Flex>
      {/* Left side for Image Upload */}
      <Box boxSize="sm" mr={4}>
        {selectedFile && (
          <Image src={URL.createObjectURL(selectedFile)} mt={4} />
        )}
        <Stack spacing={3}>
          <Text fontSize="xl" as="b" w="500px">
            Image Upload
          </Text>
          <Input
            size="lg"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </Stack>
      </Box>
  
      {/* Right side for Title, Contents, Location, and Create button */}
      <Box>
        <Stack spacing={3}>
          <Text fontSize="xl" as="b">
            Title
          </Text>
          <Textarea
              placeholder="Title"
              size="lg"
              w="500px"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          <Text fontSize="xl" as="b">
            Contents
          </Text>
          <Textarea
              placeholder="Contents"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            />
          <Text fontSize="xl" as="b">
            Location
          </Text>
          <Textarea placeholder="Location" size="lg"/>
          <Button colorScheme="green" variant="solid" onClick={handleCreateFeed}>
            Create
          </Button>
        </Stack>
      </Box>
    </Flex>
  </>
  
  );
}
