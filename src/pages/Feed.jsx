import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Flex,
  Avatar,
  CardBody,
  Heading,
  Image,
  Text,
  SimpleGrid,
  CardFooter,
  Spacer,
  Grid,
  GridItem,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";

export default function Feed() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postData, setPostData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchData = async (index) => {
      try {
        const response = await axios.get(`https://greenjoy.dev/api/posts/${index}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching data for post ${index}:`, error);
        return null;
      }
    };

    // 우선 무한스크롤
    const fetchAllData = async () => {
      const dataPromises = Array.from({ length: 100 }, (_, index) => fetchData(index + 1));
      const fetchedData = await Promise.all(dataPromises);
      setPostData(fetchedData.filter(Boolean));
    };

    fetchAllData();
  }, []);

  if (postData.length === 0) {
    return <div>Loading...</div>;
  }

  const handleSeeMoreClick = (index) => {
    setSelectedPost(postData[index]);
    onOpen();
  };

  return (
    <>
      <Stack direction="row" spacing={400} align="center">
        <Heading size="lg" margin={10}>
          What's going on?
        </Heading>
        <Spacer />
        <Button colorScheme="green" variant="solid">
          <Link to="/feedupload">Create Feed</Link>
        </Button>
      </Stack>

      <SimpleGrid
        margin={1}
        spacing={4}
        minChildWidth="120px"
        templateColumns="repeat(4,1fr)"
        gap={2}
      >
        {postData.map((post, index) => (
          <Card key={index}>
            <CardBody>
              <Image objectFit="cover" src={post.image1} />
            </CardBody>
            <CardBody>
              <Grid templateColumns="repeat(5, 1fr)" gap={1}>
                <GridItem colSpan={2}>
                  <Heading size="md">{post.title}</Heading>
                </GridItem>
                <GridItem colStart={4} colEnd={6}>
                  <Button
                    colorScheme="green"
                    variant="link"
                    onClick={() => handleSeeMoreClick(index)}
                  >
                    See more ≫
                  </Button>
                </GridItem>
              </Grid>
            </CardBody>
            <CardFooter>
              <Flex spacing="1">
                <Flex flex="1" gap="1" alignItems="center" flexWrap="wrap">
                  <Avatar src="https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg" />
                  <Box>
                    <Heading size="sm">{post.writer}</Heading>
                  </Box>
                </Flex>
              </Flex>
              <Button flex="1" variant="ghost" leftIcon={<FaRegHeart />}>
                좋아요
              </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedPost?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              <Image src={selectedPost?.image1} />
              <Text>{selectedPost?.content}</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
