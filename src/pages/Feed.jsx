import React from "react";
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
  SimpleGrid,
  CardFooter,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export default function Feed() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  return (
    <>
      <Stack direction="row" spacing={4} align="center">
        <Heading size="lg" margin={10}>
          What's going on?
        </Heading>
        <Button colorScheme="green" variant="solid">
          Create Feed
        </Button>
      </Stack>
      <SimpleGrid
        margin={10}
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(230px, 1fr))"
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
              <Heading size="md">환경축제!</Heading>
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
              <Button flex="1" variant="ghost" leftIcon={<StarIcon />}>
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
