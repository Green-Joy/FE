import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Heading,
  Text,
  Box,
  Input,
  Image,
  Stack,
  Button,
} from "@chakra-ui/react";

export default function Challenge() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("https://greenjoy.dev/api/challenge/today")
      .then((response) => {
        setChallenge(response.data);
      })
      .catch((error) => {
        console.error("Error fetching challenge:", error);
      });
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("randomId", localStorage.getItem("randomId"));
    formData.append(
      "content",
      `${new Date().getMonth() + 1}/${new Date().getDate()} ${challenge}`
    );
    formData.append("image", selectedFile);

    // 디버깅
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    axios
      .post("https://greenjoy.dev/api/challenge", formData)
      .then((response) => {
        console.log("Upload successful", response);
        setUploadSuccess(true);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const activeDates = ["2024-01-01", "2024-01-03", "2024-01-05", "2024-01-07"];

  const isDateActive = (date) => {
    return activeDates.includes(date);
  };

  return (
    <>
      <Box margin={10} marginLeft={-200} textAlign="left" width="800px">
        <Heading size="lg" color="green">
          Today's challenge
        </Heading>
        {challenge && (
          <Text fontSize="5xl" as="b">
            {challenge}
          </Text>
        )}
      </Box>
      <Stack direction="row">
        <Box>
          {selectedFile && (
            <Image
              src={URL.createObjectURL(selectedFile)}
              mt={4}
              maxW="100%"
              maxH="200px"
              overflow="hidden"
            />
          )}
          <Input
            size="lg"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
          <Button
            colorScheme="green"
            variant="solid"
            marginTop={7}
            marginLeft={20}
            onClick={handleSubmit}
            disabled={!selectedFile}
          >
            Upload
          </Button>
          {uploadSuccess && <Text color="green">챌린지 성공!</Text>}
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(52, 12px)"
          gridTemplateRows="repeat(7, 12px)"
          gap={1}
          maxH="200px"
          maxW="100%"
        >
          {[...Array(364)].map((_, index) => {
            const currentColumn = Math.floor(index % 52) + 1;
            const currentRow = index / 52 + 1;
            const formattedDate = `2024-01-${
              currentRow < 10 ? "0" + currentRow : currentRow
            }`;
            return (
              <Box
                key={index}
                w="12px"
                h="12px"
                bg={isDateActive(formattedDate) ? "lightgreen" : "gray.200"}
              />
            );
          })}
        </Box>
      </Stack>
      <Box textAlign="left" margin={10} marginLeft={16}>
        <Heading size="lg" marginBottom={4}>
          This week
        </Heading>
        <Stack direction="row">
          <Box>
            <Image
              boxSize="160px"
              objectFit="cover"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
              marginRight={6}
            />
            <Text>텀블러 사용하기</Text>
            <Text>2024 - 01 - 01</Text>
          </Box>
          <Box>
            <Image
              boxSize="160px"
              objectFit="cover"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
              marginRight={6}
            />
            <Text>텀블러 사용하기</Text>
            <Text>2024 - 01 - 01</Text>
          </Box>
          <Box>
            <Image
              boxSize="160px"
              objectFit="cover"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
              marginRight={6}
            />
            <Text>텀블러 사용하기</Text>
            <Text>2024 - 01 - 01</Text>
          </Box>
          <Box>
            <Image
              boxSize="160px"
              objectFit="cover"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
              marginRight={6}
            />
            <Text>텀블러 사용하기</Text>
            <Text>2024 - 01 - 01</Text>
          </Box>
          <Box>
            <Image
              boxSize="160px"
              objectFit="cover"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
              marginRight={6}
            />
            <Text>텀블러 사용하기</Text>
            <Text>2024 - 01 - 01</Text>
          </Box>
          <Box>
            <Image
              boxSize="160px"
              objectFit="cover"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
              marginRight={6}
            />
            <Text>텀블러 사용하기</Text>
            <Text>2024 - 01 - 01</Text>
          </Box>
          <Box>
            <Image
              boxSize="160px"
              objectFit="cover"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
              marginRight={6}
            />
            <Text>텀블러 사용하기</Text>
            <Text>2024 - 01 - 01</Text>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
