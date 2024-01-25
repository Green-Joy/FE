import React from 'react';
import { Box, Center, Circle, Heading, Image, Text, HStack, Grid, GridItem } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
const Profile = () => {
  const user = {
    name: 'syeon',
    profilePicture: 'https://placekitten.com/200/200',
    posts: [
      { id: 1, title: 'Feed', content: 'This is my first post.' },
      { id: 2, title: 'Feed', content: 'Another post by me.' },
      { id: 3, title: 'Feed', content: 'Another post by me.' },
      { id: 4, title: 'Tips', content: 'Another post by me.' },
      { id: 5, title: 'Feed', content: 'Another post by me.' },
      { id: 6, title: 'Feed', content: 'Another post by me.' },
      { id: 7, title: 'Feed', content: 'Another post by me.' },
      // Add more posts as needed
    ],
  };

  return (
    <HStack spacing={8} align="flex-start">
      {/* Left side: Profile */}
      <Box p={3}pt={8}>
        <Center>
          <Circle size="200px" bg="gray.200">
            <Image src={user.profilePicture} alt="Profile" borderRadius="full" boxSize="full" />
          </Circle>
        </Center>
        <Box textAlign="center">
          <Heading>{user.name}</Heading>
        </Box>
        <Box borderWidth="1px" borderRadius="lg" mt={5}>
          <Text> 잔디심기 ? 메달? </Text>
        </Box>
      </Box>

      {/* Right side: List of posts */}
      <Grid templateColumns="repeat(4, 1fr)" gap={4} flex="1" pb={10}>
        <Heading size="md" pt={5} m={2} gridColumn="1 / -1">
          My Posts
        </Heading>
        {user.posts.map((post) => (
          <GridItem key={post.id} p={4} borderWidth="1px" borderRadius="lg">
            <Heading size="sm" mb={2}>
            <DeleteIcon mb={2} ml={100} />
              <Image src={user.profilePicture}  />
              {post.title}
            </Heading>
            <Text>{post.content}</Text>
          </GridItem>
        ))}
      </Grid>
    </HStack>
  );
};

export default Profile;
