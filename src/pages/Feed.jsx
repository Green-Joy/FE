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
  Textarea,
} from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function Feed() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postData, setPostData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({});
  const [postComments, setPostComments] = useState({});

  useEffect(() => {
    const fetchData = async (index) => {
      try {
        const response = await axios.get(
          `https://greenjoy.dev/api/posts/${index}`
        );
        return response.data;
      } catch (error) {
        console.error(`Error fetching data for post ${index}:`, error);
        return null;
      }
    };

    // 우선 무한스크롤
    const fetchAllData = async () => {
      const dataPromises = Array.from({ length: 10 }, (_, index) =>
        fetchData(index + 1)
      );
      const fetchedData = await Promise.all(dataPromises);
      setPostData(fetchedData.filter(Boolean));
    };

    fetchAllData();
  }, []);

  if (postData.length === 0) {
    return <div>Loading...</div>;
  }

  const handleSeeMoreClick = async (post) => {
    setSelectedPost(post);
    onOpen();
    // 해당 포스트의 댓글을 불러오도록 처리
    await fetchPostComments(post.id);
  };

  const fetchPostComments = async (postId) => {
    try {
      const response = await axios.get(
        `https://greenjoy.dev/api/comments/${postId}`
      );
      // postId를 키로 가지는 comments 객체에 댓글 저장
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: response.data,
      }));
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
    }
  };

  const handleLikeClick = async (index) => {
    const randomId = localStorage.getItem("randomId");
    const postId = index + 1;
    const isLiked = !!likedPosts[postId];

    if (!randomId) {
      console.error("randomId not found in local storage");
      return;
    }
    try {
      if (!isLiked) {
        // 좋아요 +1
        await axios.post("https://greenjoy.dev/api/likes/create", {
          randomId,
          postId,
        });
        // 해당 포스트의 좋아요 수 업데이트
        setPostData((prevData) =>
          prevData.map((post, idx) =>
            idx === index ? { ...post, likeCount: post.likeCount + 1 } : post
          )
        );
      } else {
        // 좋아요 -1
        await axios.post("https://greenjoy.dev/api/likes/remove", {
          randomId,
          postId,
        });
        // 해당 포스트의 좋아요 수 업데이트
        setPostData((prevData) =>
          prevData.map((post, idx) =>
            idx === index ? { ...post, likeCount: post.likeCount - 1 } : post
          )
        );
      }
      // 좋아요 상태 업데이트
      setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));
    } catch (error) {
      console.error("Error while handling like click", error);
    }
  };

  const handleCommentChange = (event) => {
    setPostComments({
      ...postComments,
      [selectedPost.id]: event.target.value,
    });
  };

  const handleCommentSubmit = async () => {
    const randomId = localStorage.getItem("randomId");
    const postId = selectedPost.index + 1;

    if (!randomId) {
      console.error("randomId not found in local storage");
      return;
    }

    try {
      const response = await axios.post("https://greenjoy.dev/api/comments", {
        randomId,
        content: postComments[selectedPost.id],
        postId,
      });

      // 댓글 추가
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), response.data],
      }));

      // 댓글 입력창 초기화
      setPostComments({
        ...postComments,
        [selectedPost.id]: "",
      });
    } catch (error) {
      console.error("Error while submitting comment:", error);
    }
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
              <Button
                flex="1"
                variant="ghost"
                leftIcon=<FaHeart />
                onClick={() => handleLikeClick(index)}
              >
                {post.likeCount}
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
              <Textarea
                placeholder="댓글을 입력하세요"
                value={postComments[selectedPost?.id] || ""}
                onChange={handleCommentChange}
                size="md"
                mt={4}
              />
              <Button colorScheme="blue" onClick={handleCommentSubmit} mt={4}>
                댓글 작성
              </Button>
              {selectedPost &&
                comments[selectedPost.id] &&
                comments[selectedPost.id].map((comment, idx) => (
                  <Box
                    key={idx}
                    borderWidth="1px"
                    borderRadius="lg"
                    p="2"
                    my="1"
                  >
                    <Text>{comment.content}</Text>
                  </Box>
                ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
