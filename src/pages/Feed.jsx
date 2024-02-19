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
  Divider,
} from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { DeleteIcon } from "@chakra-ui/icons";

export default function Feed() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postData, setPostData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axios.get(
          "https://greenjoy.dev/api/posts?size=5&page=0&sort=createdAt%2Cdesc"
        );
        const postDataArray = postResponse.data.content;
        setPostData(postDataArray);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }

      const storedLikedPosts = JSON.parse(localStorage.getItem("likedPosts"));
      if (storedLikedPosts) {
        setLikedPosts(storedLikedPosts);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (selectedPost) {
          const commentsResponse = await axios.get(
            `https://greenjoy.dev/api/comments/${selectedPost.postId}?size=5&page=0&sort=createdAt,desc`
          );
          const commentsArray = commentsResponse.data.content;
          setComments(commentsArray);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [selectedPost]);

  if (postData.length === 0) {
    return <div>Loading...</div>;
  }

  const handleSeeMoreClick = async (post) => {
    setSelectedPost(post);
    onOpen();
  };

  // 댓글 작성 보내는 버튼
  const handleCommentSubmit = async () => {
    const fetchComments = async () => {
      try {
        if (selectedPost) {
          const commentsResponse = await axios.get(
            `https://greenjoy.dev/api/comments/${selectedPost.postId}?size=5&page=0&sort=createdAt,desc`
          );
          const commentsArray = commentsResponse.data.content;
          setComments(commentsArray);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    try {
      const randomId = localStorage.getItem("randomId");
      if (!randomId) {
        console.error("randomId not found in local storage");
        return;
      }

      const postId = selectedPost.postId;

      await axios.post("https://greenjoy.dev/api/comments", {
        randomId,
        postId,
        content: commentInput,
      });
      console.log("댓글 작성 성공!");

      fetchComments();

      setCommentInput("");
    } catch (error) {
      console.error("Error while handling comment submission", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const randomId = localStorage.getItem("randomId");

      await axios.post(`https://greenjoy.dev/api/comments/${commentId}`, {
        randomId: randomId,
      });

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.commentId !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleLikeClick = async (post) => {
    const postId = post.postId;
    const isLiked = !!likedPosts[postId];

    try {
      const randomId = localStorage.getItem("randomId");
      if (!randomId) {
        console.error("randomId not found in local storage");
        return;
      }

      if (!isLiked) {
        // 좋아요 +1
        console.log("Sending request with data:", { randomId, postId });
        await axios.post("https://greenjoy.dev/api/likes/create", {
          randomId,
          postId,
        });

        // 해당 포스트의 좋아요 수 업데이트
        setPostData((prevData) =>
          prevData.map((post) =>
            post.postId === postId
              ? { ...post, likeCount: post.likeCount + 1 }
              : post
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
          prevData.map((post) =>
            post.postId === postId
              ? { ...post, likeCount: post.likeCount - 1 }
              : post
          )
        );
      }
      // 좋아요 상태 업데이트
      setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));

      // 좋아요 상태를 로컬 스토리지에 저장
      const updatedLikedPosts = { ...likedPosts, [postId]: !isLiked };
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
    } catch (error) {
      console.error("Error while handling like click", error);
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
              <Image boxSize="300px" objectFit="cover" src={post.thumbnail} />
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
                    onClick={() => handleSeeMoreClick(post)}
                  >
                    See more ≫
                  </Button>
                </GridItem>
              </Grid>
            </CardBody>
            <CardFooter>
              <Flex spacing="1">
                <Flex flex="1" gap="1" alignItems="center" flexWrap="wrap">
                  <Avatar src={post.profileImg} /> 
                  <Box>
                    <Heading size="sm">{post.writer}</Heading>
                  </Box>
                </Flex>
              </Flex>
              <Button
                flex="1"
                variant="ghost"
                leftIcon={<FaHeart />}
                onClick={() => handleLikeClick(post)}
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
              <Image src={selectedPost?.thumbnail} />
              <Text>{selectedPost?.content}</Text>
              <Textarea
                placeholder="댓글을 입력하세요"
                size="md"
                mt={4}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <Button
                colorScheme="green"
                mt={4}
                mb={3}
                onClick={handleCommentSubmit}
              >
                댓글 작성
              </Button>
              <Divider />
              <Text marginTop={3} mb={3}>
                댓글 목록
              </Text>
              {comments.map((comment) => (
                <Flex key={comment.commentId} alignItems="center">
                  <Box flex="1">
                    <Text m={2}>
                      {comment.writer} : {comment.content}
                    </Text>
                  </Box>
                  <DeleteIcon
                    className="delete-icon"
                    onClick={() => handleDeleteComment(comment.commentId)}
                    sx={{
                      ":hover": {
                        color: "red",
                      },
                      marginLeft: 2,
                      cursor: "pointer",
                    }}
                  />
                </Flex>
              ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
