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
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EventUpload() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
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
    const data = new FormData();

    // 이미지 있을 경우 data에 추가
    if (selectedFile) {
      data.append("images", selectedFile);
    }

    // 로컬스토리지에 있는 randomId 추가
    data.append("randomId", localStorage.getItem("randomId"));

    for (let key in formData) {
      data.append(key, formData[key]);
    }

    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    try {
      const response = await axios.post("https://greenjoy.dev/api/infos", data);
      console.log("Feed created successfully:", response.data);
      navigate("/event");
    } catch (error) {
      if (error.response) {
        // 요청 성공, 서버 상태 코드
        console.error(
          "Server responded with status code:",
          error.response.status
        );
      } else if (error.request) {
        // 요청 성공, 응답 없음
        console.error("No response received:", error.request);
      } else {
        // 요청 실패
        console.error("Error:", error.message);
      }
    }
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
          <Textarea
            placeholder="Title"
            size="lg"
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
          <Button
            colorScheme="green"
            variant="solid"
            onClick={handleCreateFeed}
          >
            Create
          </Button>
        </Stack>
      </Box>
    </>
  );
}
