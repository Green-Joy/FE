import {
  Image,
  Text,
  Box,
  Flex,
  Stack,
  Input,
  Heading,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export default function FeedUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    userId: "p2JgEFQDZu03EjBTB_GYr",
    content: "",
    // images: [],
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateFeed = async () => {
    const data = new FormData();

    if (selectedFile) {
      data.append("images", selectedFile);
    }

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    for (var pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await axios.post("http://greenjoy.dev/api/posts", data);
      console.log("Feed created successfully:", response.data);
    } catch (error) {
      console.error("Error creating feed:", error);
    }
  };

  return (
    <>
      <Heading size="lg" margin={8}>
        CREATE FEED
      </Heading>
      <Flex>
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
            <Textarea placeholder="Location" size="lg" />
            <Button
              colorScheme="green"
              variant="solid"
              onClick={handleCreateFeed}
            >
              Create
            </Button>
          </Stack>
        </Box>
      </Flex>
    </>
  );
}
