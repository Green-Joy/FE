import { useState } from "react";
import {
  Image,
  Box,
  Heading,
  Stack,
  Input,
  Text,
  Button,
  Textarea,
} from "@chakra-ui/react";

export default function EventUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <>
      <Heading size="lg" margin={8}>
        Create Tips
      </Heading>
      <Box maxW="600px" w="100%" p={6} overflow="auto">
        {selectedFile && (
          <Image src={URL.createObjectURL(selectedFile)} mt={4} />
        )}
        <Stack spacing={3}>
          <Text fontSize="xl" as="b">
            Cover Image
          </Text>
          <Input
            size="lg"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <Text fontSize="xl" as="b">
            Title
          </Text>
          <Textarea placeholder="Title" size="lg" />
          <Text fontSize="xl" as="b">
            Contents
          </Text>
          <Textarea placeholder="Contents" />
          <Button colorScheme="green" variant="solid">
            Create
          </Button>
        </Stack>
      </Box>
    </>
  );
}
