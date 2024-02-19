import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Image,
  Text,
  Stack,
  Button,
  CardBody,
  Heading,
  CardFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';
import SimpleSlider1 from '../components/Banner1.jsx';
import SimpleSlider2 from '../components/Banner2.jsx';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const FeedModal = ({ post, onClose }) => {
  if (!post) {
    return null;
  }

  return (
    <Modal isOpen={post} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{post.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={2}>
            <Image src={post.thumbnail} alt={`Thumbnail for ${post.writer}`} />
            <Text py={2} fontSize='lg'>Writer : {post.writer}</Text>
            <Text fontSize='lg'>{post.content}</Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};


const TipModal = ({ tip, onClose }) => {
  if (!tip) {
    return null; 
  }

  return (
    <Modal isOpen={tip} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{tip.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box  p={2}>
            <Image src={tip.thumbnail} alt={`Thumbnail for ${tip.title}`} />
             <Text  py={2} fontSize='lg'>Writer : {tip.writer}</Text>
            <Text fontSize='lg'>{tip.content}</Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default function Home() {
  const [postData, setPostData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [tipData, setTipData] = useState([]);
  const [challengeData, setChallengeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTip, setSelectedTip] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);


  useEffect(() => {
    const loadData = async () => {
      try {
        // Post data
        const postResponse = await axios.get('https://greenjoy.dev/api/posts?size=5&page=0&sort=createdAt%2Cdesc');
        const postDataArray = postResponse.data.content;
        const shuffledPostData = shuffleArray(postDataArray);
        const selectedPostsData = shuffledPostData.slice(0, 4);
        setPostData(selectedPostsData);

        // News data
        const newsResponse = await axios.get('https://greenjoy.dev/api/articles');
        const shuffledNewsData = shuffleArray(newsResponse.data);
        const selectedNewsData = shuffledNewsData.slice(0, 4);
        setNewsData(selectedNewsData);

        // Tip data
        const tipResponse = await axios.get('https://greenjoy.dev/api/infos?size=5&page=0&sort=createdAt%2Cdesc');
        const tipDataArray = tipResponse.data.content;
        const shuffledTipData = shuffleArray(tipDataArray);
        const selectedTipData = shuffledTipData.slice(0, 4);
        setTipData(selectedTipData);

        // Challenge data
        const challengeResponse = await axios.get('https://greenjoy.dev/api/challenge/today');
        const challengeData = challengeResponse.data;
        //console.log(challengeData)
        setChallengeData(challengeData);


      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const openUrlInNewTab = (url) => {
    window.open(url, '_blank');
  };
  const openTipModal = (tip) => {
    setSelectedTip(tip);
  };
  const openFeedModal = (post) => {
  setSelectedPost(post);
};


  return (
    <>
      <div id="banner">
        <div id="banner1">
          <SimpleSlider1 />
        </div>
        <div id="banner2">
          <SimpleSlider2 />
        </div>
      </div>

      <div id="contents">
        <div id="content1">
          <div id="content1_header">
            <Heading py={3}>FEED</Heading>
            <Link to="/feed">See more</Link>
          </div>

          <div id="feeds">
            {postData.map((post, index) => (
              <Box margin={1} w={250} h={250} bg="white" border="1px solid #E2E8F0" borderRadius="md" p={4}  key={index}  objectFit='cover' p={2}
              onClick={() => openFeedModal(post)}
              _hover={{ transform: 'scale(1.05)' }}
              cursor="pointer"
              >
                <Image boxSize='200px' src={post.thumbnail} alt={`Post ${index}`} />
                <Text pt={2} pr={2}align="right">{post.writer}</Text>
              </Box>
          
            ))}
          </div>

          <div id="content2_header">
            <Heading pb={3} >TIPS</Heading>
            <Link to="/event">See more</Link>
          </div>

          <div id="events">
            {tipData.map((tip, index) => (
              <Box margin={1} h={300} w={250} key={index} bg="white" border="1px solid #E2E8F0" borderRadius="md" p={4} overflow='hidden' key={index}  objectFit='cover'  p={2} 
              onClick={() => openTipModal(tip)}
              _hover={{ transform: 'scale(1.05)' }}
              cursor="pointer"
            
              >
                <Image boxSize='200px' src={tip.thumbnail} alt={`Thumbnail for ${tip.title}`} />
                <Text pt={2} align={'center'}>{tip.title}</Text>
              </Box>
            ))}
          </div>
          
          <div id="content4_header">
            <Heading pt={6} pb={3} > TODAY'S CHALLENGE</Heading>
            <Link to="/challenge">See more</Link>
          </div>

          <div id="challenge">
          <Box boxSize="sm" p={2}>
            <Heading size='md' > {challengeData}</Heading>
          </Box>
        </div>
          
        </div>

        <div id="content2">
          <div id="news">
            <div id="content3_header">
              <Heading py={3}> NEWS</Heading>
              <Link to="/event">See more</Link>
            </div>
            {newsData.map((news, index) => (
              <Card margin={1} key={index} p={2} direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
                <Image h={200}
                  objectFit="cover"
                  maxW={{ base: '100%', sm: '200px' }}
                  src={news.image}
                  alt={news.title}
                />
                <Stack>
                  <CardBody>
                    <Heading size="sm">{news.title}</Heading>
                  </CardBody>
                  <CardFooter>
                    <Button onClick={() => openUrlInNewTab(news.url)} variant="solid" colorScheme="blue">
                      자세히 보기
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

    <FeedModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      <TipModal tip={selectedTip} onClose={() => setSelectedTip(null)} />
    </>
  );
}
