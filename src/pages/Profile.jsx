import React, { useState, useEffect } from 'react';
import { Box, Center, Circle, Heading, Image, Text, HStack, Grid, GridItem, Spinner } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { MdOutlineImageNotSupported } from 'react-icons/md';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [matchingContents, setMatchingContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const randomId = localStorage.getItem('randomId');
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
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchMatchingContents = async () => {
      try {
        const apiEndpoint = 'https://greenjoy.dev/api/posts?size=100&page=0&sort=createdAt,desc';
        const response = await axios.get(apiEndpoint);
        const responseData = response.data;

        const matchingContents = responseData.content.filter(
          (content) => content.writer === userData.name
        );

        setMatchingContents(matchingContents);
      } catch (error) {
        console.error('Error fetching matching content:', error);
        setError('Error fetching matching content');
      }
    };

    if (userData) {
      fetchMatchingContents();
    }
  }, [userData]);

  // 삭제
  const handleDeletePost = async (postId) => {
    try {
      const randomId = localStorage.getItem('randomId');
      // Corrected the template literals usage in the URL
      await axios.post(`https://greenjoy.dev/api/posts/${postId}`, {
        randomId,
      });

      // Optional: Update the state to reflect the deletion without making another API call
      setMatchingContents((prevContents) => prevContents.filter((content) => content.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Error deleting post');
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <HStack spacing={8} align="flex-start">
      {/* Left side: Profile */}
      <Box p={3} pt={8}>
        <Center>
          <Circle size="200px" bg="gray.200">
            {userData.profileImg ? (
              <Image src={userData.profileImg} alt="Profile" borderRadius="full" boxSize="full" />
            ) : (
              <MdOutlineImageNotSupported size={100} color="gray.500" />
            )}
          </Circle>
        </Center>

        <Box textAlign="center">
          <Heading m={5}>{userData.name}</Heading>
        </Box>
        <Box borderWidth="1px" borderRadius="lg" m={5} p={5}>
          <Text>이매일: {userData.email}</Text>
        </Box>
      </Box>

      {/* Right side: List of posts */}
      <Grid templateColumns="repeat(4, 1fr)" gap={4} flex="1" pb={10}>
        <Heading size="md" pt={5} m={2} gridColumn="1 / -1">
          My Posts
        </Heading>
        {matchingContents.map((content) => (
          <GridItem key={content.id} p={4} borderWidth="1px" borderRadius="lg">
            <Heading size="sm" mb={2}>
              <DeleteIcon
                className="delete-icon"
                onClick={() => handleDeletePost(content.id)}
                sx={{
                  ":hover": {
                    color: "red",
                  },
                }}
              />
              <Image src={content.thumbnail} />
              {content.title}
            </Heading>
            <Text>{content.content}</Text>
            <Text>
              해당 글 주소:{' '}
              <a
                href={`https://greenjoy.dev/api/posts/${content.postId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`https://greenjoy.dev/api/posts/${content.postId}`}
              </a>
            </Text>
          </GridItem>
        ))}
      </Grid>
    </HStack>
  );
};

export default Profile;
