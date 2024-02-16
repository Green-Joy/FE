import React, { useState, useEffect } from 'react';
import { Box, Center, Circle, Heading, Image, Text, HStack, Grid, GridItem } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { MdOutlineImageNotSupported } from 'react-icons/md';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [matchingContents, setMatchingContents] = useState([]);

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
      } catch (error) {
        console.error('Error fetching user data:', error);
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
    
        console.log('Before Filtering - Length:', responseData.content.length);
        const matchingContents = responseData.content.filter(
          content => content.writer === userData.name
        );
    
        
        // console.log('After Filtering - Length:', matchingContents.length);

        setMatchingContents(matchingContents);

        // 확인용
        matchingContents.forEach(content => {
          console.log('Matching Post Title:', content.title);
        });
      } catch (error) {
        console.error('Error fetching matching content:', error);
      }
    };
  
    if (userData) {
      fetchMatchingContents();
    }
  }, [userData]);


  if (!userData) {
    // Loading state
    return <div>Loading...</div>;
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
              <DeleteIcon mb={2} ml={100} />
              <Image src={content.thumbnail} />
              {content.title}
            </Heading>
            <Text>{content.content}</Text>
            <Text>
              해당 글 주소: <a href={`https://greenjoy.dev/api/posts/${content.postId}`} target="_blank">{`https://greenjoy.dev/api/posts/${content.postId}`}</a>
            </Text>
          </GridItem>
        ))}
      </Grid>
    </HStack>
  );
};

export default Profile;