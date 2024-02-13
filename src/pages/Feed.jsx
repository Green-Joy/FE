import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  Flex,
  Stack,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function Feed() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API 호출
        const response = await axios.get('https://greenjoy.dev/api/posts/3');
        // API 응답에서 데이터 추출
        setPostData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
    // 컴포넌트가 마운트될 때 API 호출
    fetchData();
  }, []);

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
        margin={10}
        spacing={4}
        minChildWidth="120px"
        templateColumns="repeat(4,1fr)"
        gap={10}
      >
        <Card>
          <CardBody>
            <Image
              objectFit="cover"
              src={postData.image1}
            />
          </CardBody>
          <CardBody>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
              <GridItem colSpan={2}>
                <Heading size="md">{postData.title}</Heading>
              </GridItem>
              <GridItem colStart={4} colEnd={6}>
                <Button colorScheme="green" variant="link" onClick={onOpen}>
                  See more ≫
                </Button>
              </GridItem>
            </Grid>
          </CardBody>
          <CardFooter>
            <Flex spacing="1">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar src="https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg" />
                <Box>
                  <Heading size="sm">{postData.writer}</Heading>
                </Box>
              </Flex>
            </Flex>
            <Button flex="1" variant="ghost" leftIcon={<FaRegHeart />}>
              좋아요
            </Button>
          </CardFooter>
        </Card>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{postData.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <Image src={postData.image1}/>
                <Text>{postData.content}</Text>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </SimpleGrid>
    </>
  );
}
