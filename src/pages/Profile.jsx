import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Circle,
  Heading,
  Image,
  Text,
  HStack,
  Grid,
  GridItem,
  SimpleGrid,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { MdOutlineImageNotSupported } from "react-icons/md";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [matchingContents, setMatchingContents] = useState([]);
  const [matchingTips, setMatchingTips] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 유저 데이터 불러오기
    const fetchData = async () => {
      try {
        const randomId = localStorage.getItem("randomId");
        const apiUrl = `https://greenjoy.dev/api/users/${randomId}`;

        const response = await axios.get(apiUrl);
        const fetchedUserData = response.data;

        setUserData({
          name: fetchedUserData.name,
          profileImg: fetchedUserData.profileImg,
          posts: fetchedUserData.posts || [],
          email: fetchedUserData.email,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 내 피드 글 불러오기
  useEffect(() => {
    const fetchMatchingContents = async () => {
      try {
        const apiEndpoint =
          "https://greenjoy.dev/api/posts?size=100&page=0&sort=createdAt,desc";
        const response = await axios.get(apiEndpoint);
        const responseData = response.data;

        const matchingContents = responseData.content.filter(
          (content) => content.writer === userData.name
        );

        setMatchingContents(matchingContents);
      } catch (error) {
        console.error("Error fetching matching content:", error);
        setError("Error fetching matching content");
      }
    };

    if (userData) {
      fetchMatchingContents();
    }
  }, [userData]);

  // 내 꿀팁 불러오기
  useEffect(() => {
    const fetchMatchingTips = async () => {
      try {
        const apiEndpoint =
          "https://greenjoy.dev/api/infos?size=5&page=0&sort=createdAt%2Cdesc";
        const response = await axios.get(apiEndpoint);
        const responseData = response.data;

        const matchingTips = responseData.content.filter(
          (tip) => tip.writer === userData.name
        );

        setMatchingTips(matchingTips);
      } catch (error) {
        console.error("Error fetching matching tips:", error);
        setError("Error fetching matching tips");
      }
    };

    if (userData) {
      fetchMatchingTips();
    }
  }, [userData]);

  // 피드 삭제
  const handleDeletePost = async (postId) => {
    try {
      const randomId = localStorage.getItem("randomId");

      await axios.post(`https://greenjoy.dev/api/posts/${postId}`, {
        randomId: randomId,
      });

      setMatchingContents((prevContents) =>
        prevContents.filter((content) => content.postId !== postId)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Error deleting post");
    }
  };

  // 꿀팁 삭제
  const handleDeleteTip = async (infoId) => {
    try {
      const randomId = localStorage.getItem("randomId");

      await axios.post(`https://greenjoy.dev/api/infos/${infoId}`, {
        randomId: randomId,
      });

      setMatchingTips((prevContents) =>
        prevContents.filter((content) => content.infoId !== infoId)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Error deleting post");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <HStack align="flex-start">
      {/* Left side: Profile */}
      <Box p={3} pt={8}>
        <Center>
          <Circle size="100px" bg="gray.200">
            {userData.profileImg ? (
              <Image
                src={userData.profileImg}
                alt="Profile"
                borderRadius="full"
                boxSize="full"
              />
            ) : (
              <MdOutlineImageNotSupported size={80} color="gray.500" />
            )}
          </Circle>
        </Center>

        <Box textAlign="center">
          <Heading size="md" m={5}>
            {userData.name}
          </Heading>
        </Box>
        <Box borderWidth="1px" borderRadius="lg" m={5} p={5}>
          <Text>이메일: {userData.email}</Text>
        </Box>
      </Box>

      {/* Right side: List of posts and matching tips */}
      <VStack align="flex-start" flex="1" pb={10}>
        {/* My Posts Section */}
        <Box>
          <Heading pt={5} m={2}>
            My Posts
          </Heading>
          <SimpleGrid columns={3} spacing={2}>
            {matchingContents.map((content) => (
              <GridItem
                width="200px"
                key={content.id}
                p={3}
                bgColor="white"
                borderWidth="1px"
                borderRadius="lg"
              >
                <Heading size="sm" mb={2}>
                  <DeleteIcon
                    className="delete-icon"
                    onClick={() => handleDeletePost(content.postId)}
                    sx={{
                      ":hover": {
                        color: "red",
                      },
                      marginTop: 2,
                      marginBottom: 2,
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                    }}
                  />
                  <Image src={content.thumbnail} />
                  <Text pt={2}> {content.title}</Text>
                </Heading>
                <Text >{content.content}</Text>
              </GridItem>
            ))}
          </SimpleGrid>
        </Box>

        {/* Matching Tips Section */}
        <Box>
          <Heading  pt={5} m={2}>
            My Tips
          </Heading>
          <SimpleGrid columns={3} spacing={2}>
            {matchingTips.map((tip) => (
              <GridItem
                width="200px"
                key={tip.id}
                p={3}
                bgColor="white"
                borderWidth="1px"
                borderRadius="lg"
              >
                <Heading size="sm" mb={2}>
                  <DeleteIcon
                    className="delete-icon"
                    onClick={() => handleDeleteTip(tip.infoId)}
                    sx={{
                      ":hover": {
                        color: "red",
                      },
                      marginTop: 2,
                      marginBottom: 2,
                      marginLeft: "auto",
                      marginRight: "auto",
                      display: "block",
                    }}
                  />
                  <Image src={tip.thumbnail} />
                  <Text pt={2}> {tip.title}</Text>
                </Heading>
                <Text>{tip.content}</Text>
              </GridItem>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </HStack>
  );
};

export default Profile;
