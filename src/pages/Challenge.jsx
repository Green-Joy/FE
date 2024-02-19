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
  const [thisWeekChallenges, setThisWeekChallenges] = useState([]);
  const [hasUploadedToday, setHasUploadedToday] = useState(false);

  // 오늘의 챌린지 가져오기
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

  // 이번 주의 챌린지 가져오기
  useEffect(() => {
    const randomId = localStorage.getItem("randomId");
    if (randomId) {
      axios
        .get(`https://greenjoy.dev/api/challenge?randomId=${randomId}`)
        .then((response) => {
          const thisWeekChallengesData = response.data.content.slice(0, 7);
          setThisWeekChallenges(thisWeekChallengesData);
        })
        .catch((error) => {
          console.error("Error fetching this week's challenges:", error);
        });
    }
  }, []);

  // 챌린지 인증 이미지 업로드
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // 챌린지 인증
  const handleSubmit = async () => {
    // 이미 업로드한 경우
    if (
      thisWeekChallenges.some(
        (challenge) =>
          new Date(challenge.challengeDate).toDateString() ===
            new Date().toDateString() && challenge.thumbnail
      )
    ) {
      console.log("Already completed today's challenge with thumbnail!");
      setUploadSuccess(false);
      setHasUploadedToday(true);
      return;
    }

    const formData = new FormData();
    formData.append("randomId", localStorage.getItem("randomId"));
    formData.append("content", `${challenge}`);
    formData.append("image", selectedFile);

    // 디버깅
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    try {
      const response = await axios.post(
        "https://greenjoy.dev/api/challenge",
        formData
      );
      // console.log("Upload successful", response.data);
      setUploadSuccess(true);

      const updatedChallenges = thisWeekChallenges.map((challenge) => {
        if (
          new Date(challenge.challengeDate).toDateString() ===
          new Date().toDateString()
        ) {
          return { ...challenge, thumbnail: URL.createObjectURL(selectedFile) };
        }
        return challenge;
      });
      setThisWeekChallenges(updatedChallenges);
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

  const gridItemStyle = {
    width: "12px",
    height: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
          <Heading size="lg" marginBottom={4}>
            Challenge Upload
          </Heading>
          <Box bg="white" border="1px solid #E2E8F0" borderRadius="md" p={4}>
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
            {!uploadSuccess && hasUploadedToday && (
              <Text color="red">이미 챌린지를 인증했습니다.</Text>
            )}
            <Button
              colorScheme="green"
              variant="solid"
              marginTop={7}
              marginLeft={20}
              onClick={handleSubmit}
              disabled={hasUploadedToday}
            >
              Upload
            </Button>
            {uploadSuccess && <Text color="green">챌린지 성공!</Text>}
          </Box>
        </Box>
        <Box>
          <Heading size="lg" marginBottom={4}>
            Challenge History
          </Heading>
          <Box
            display="grid"
            gridTemplateColumns="repeat(52, 12px)"
            gridTemplateRows="repeat(7, 12px)"
            gap={1}
            maxH="200px"
            maxW="100%"
            bg="white"
            border="1px solid #E2E8F0"
            borderRadius="md"
            p={4}
          >
            {[...Array(364)].map((_, index) => {
              const currentColumn = Math.floor(index % 52) + 1;
              const currentRow = Math.floor(index / 52) + 1;

              // 날짜 계산
              const currentDate = new Date(2024, 0, 1);
              currentDate.setDate(
                currentDate.getDate() + currentRow - 1 + (currentColumn - 1) * 7
              );

              // 챌린지 히스토리 데이터 중 날짜 데이터
              const challenge = thisWeekChallenges.find(
                (challenge) =>
                  new Date(challenge.challengeDate).toDateString() ===
                  currentDate.toDateString()
              );

              // thumbnail 유무로 잔디
              const color =
                challenge && challenge.thumbnail ? "lightgreen" : "gray.200";

              return (
                <Box
                  key={index}
                  {...gridItemStyle}
                  bg={color}
                  title={currentDate.toDateString()}
                ></Box>
              );
            })}
          </Box>
        </Box>
      </Stack>
      <Box textAlign="left" margin={10} marginLeft={16}>
        <Heading size="lg" marginBottom={4}>
          This week
        </Heading>
        <Stack direction="row">
          {thisWeekChallenges.map((challenge, index) => (
            <Box key={index}>
              <Box
                boxSize="200px"
                bg="white"
                border="1px solid #E2E8F0"
                borderRadius="md"
                p={4}
              >
                {challenge.thumbnail && (
                  <Image
                    boxSize="160px"
                    objectFit="cover"
                    src={challenge.thumbnail}
                    alt={challenge.title}
                  />
                )}
              </Box>
              <Text>{challenge.title}</Text>
              <Text>{challenge.challengeDate}</Text>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
}
