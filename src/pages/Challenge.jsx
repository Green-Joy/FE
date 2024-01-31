import React, { useState } from "react";
import {
  Heading,
  Text,
  Box,
  Input,
  Image,
  Stack,
  Spacer,
} from "@chakra-ui/react";

export default function Challenge() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const activeDates = ["2024-01-01", "2024-01-03", "2024-01-05", "2024-01-07"];

  const isDateActive = (date) => {
    return activeDates.includes(date);
  };

  return (
    <>
      <Box margin={10} marginLeft={-800}>
        <Heading size="lg" color="green">
          Today's challenge
        </Heading>
        <Text fontSize="5xl" as="b">
          텀블러 사용하기
        </Text>
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
