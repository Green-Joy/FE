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
  CardFooter
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

export default function Home() {
  const [postData, setPostData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [tipData, setTipData] = useState([]);
  const [challengeData, setChallengeData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(null);
const [modalContent, setModalContent] = useState('');


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
            <Text fontSize="lg">FEED</Text>
            <Link to="/feed">See more</Link>
          </div>

          <div id="feeds">
            {postData.map((post, index) => (
              <Box key={index} boxSize="sm" p={2}>
                <Image src={post.thumbnail} alt={`Post ${index}`} />
                <Text>{post.writer}</Text>
              </Box>
            ))}
          </div>

          <div id="content2_header">
            <Text fontSize="lg">TIPS</Text>
            <Link to="/event">See more</Link>
          </div>

          <div id="events">
            {tipData.map((tip, index) => (
              <Box key={index} boxSize="sm" p={2}>
                <Image src={tip.thumbnail} alt={`Thumbnail for ${tip.title}`} />
                <Text>{`${tip.title} - ${tip.writer}`}</Text>
                
              </Box>
            ))}
          </div>
          
          <div id="content4_header">
            <Text fontSize="lg">CHALLENGE</Text>
            <Link to="/challenge">챌린지 올리러 가기</Link>
          </div>

          <div id="challenge">
  <Box boxSize="sm" p={2}>
    <Text>오늘의 챌린지</Text>
      <Text>{challengeData}</Text>
  </Box>
</div>
          


        </div>

        <div id="content2">
          <div id="news">
            <div id="content3_header">
              <Text fontSize="lg"> NEWS</Text>
              <Link to="/event">See more</Link>
            </div>
            {newsData.map((news, index) => (
              <Card key={index} p={2} direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
                <Image
                  objectFit="cover"
                  maxW={{ base: '100%', sm: '200px' }}
                  src={news.image}
                  alt={news.title}
                />
                <Stack>
                  <CardBody>
                    <Heading size="md">{news.title}</Heading>
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
    </>
  );
}
