import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Skeleton,
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
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Skeleton height="100%" isLoaded={isLoaded}>
            <CardBody>
              <Image
                objectFit="cover"
                src="https://file.newswire.co.kr/data/datafile2/thumb_640/2022/09/3420802290_20220923165542_7678832051.jpg"
              />
            </CardBody>
          </Skeleton>
          <Skeleton
            height="100%"
            width="100%"
            isLoaded={isLoaded}
            fadeDuration={1}
          >
            <CardBody>
              <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                <GridItem colSpan={2}>
                  <Heading size="md">환경축제!</Heading>
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
                    <Heading size="sm">닉네임</Heading>
                  </Box>
                </Flex>
              </Flex>
              <Button flex="1" variant="ghost" leftIcon={<FaRegHeart />}>
                좋아요
              </Button>
            </CardFooter>
          </Skeleton>
        </Card>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>축제 제목</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <Image src="https://file.newswire.co.kr/data/datafile2/thumb_640/2022/09/3420802290_20220923165542_7678832051.jpg" />
                <Text>내용</Text>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Card>
          <Skeleton height="100%" isLoaded={isLoaded}>
            <CardBody>
              <Image
                objectFit="cover"
                src="https://file.newswire.co.kr/data/datafile2/thumb_640/2022/09/3420802290_20220923165542_7678832051.jpg"
              />
            </CardBody>
          </Skeleton>
          <Skeleton
            height="100%"
            width="100%"
            isLoaded={isLoaded}
            fadeDuration={1}
          >
            <CardBody>
              <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                <GridItem colSpan={2}>
                  <Heading size="md">환경축제!</Heading>
                </GridItem>
                <GridItem colStart={4} colEnd={6}>
                  <Button colorScheme="green" variant="link">
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
                    <Heading size="sm">닉네임</Heading>
                  </Box>
                </Flex>
              </Flex>
              <Button flex="1" variant="ghost" leftIcon={<FaRegHeart />}>
                좋아요
              </Button>
            </CardFooter>
          </Skeleton>
        </Card>
        <Button onClick={() => setIsLoaded((v) => !v)}>스켈레톤 on/off</Button>
      </SimpleGrid>
    </>
  );
}
