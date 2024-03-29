import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Grid,
  Card,
  Image,
  Stack,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

export default function Event() {
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const [newsData, setNewsData] = useState([]);
  const [tipData, setTipData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedTip, setSelectedTip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get('https://greenjoy.dev/api/articles');
        setNewsData(response.data);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    const fetchTipData = async () => {
      try {
        const tipResponse = await axios.get('https://greenjoy.dev/api/infos?size=5&page=0&sort=createdAt%2Cdesc');
        const tipDataArray = tipResponse.data.content;
        setTipData(tipDataArray);
      } catch (error) {
        console.error('Error fetching tip data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
    fetchTipData();
  }, []);

  const handleSeeMoreNews = (news) => {
    setSelectedNews(news);
    onOpen1();
  };

  const handleSeeMoreTip = (tip) => {
    setSelectedTip(tip);
    onOpen2();
  };

  return (
    <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
      {/* News Section */}
      <Box>
        <Heading size="lg" margin={10} textAlign="left">
          News
        </Heading>
        {loading ? (
          <p>Loading...</p>
        ) : (
          newsData.map((news, index) => (
            <Card
              key={index}
              direction={{ base: 'column', sm: 'row' }}
              overflow="hidden"
              variant="outline"
              margin={6}
              maxH="190px"
              maxW="570px"
            >
              <Image objectFit="cover" maxW={{ base: '100%', sm: '200px' }} src={news.image} />
              <Stack justifyContent={{ base: 'flex-start', sm: 'space-between' }} flex="1" ml={{ base: 0, sm: 4 }}>
                <CardBody maxH="130px" maxW="340px">
                  <Heading size="md" maxH="50px" overflow="hidden">
                    {news.title}
                  </Heading>
                  <Text fontSize="md" py="2" maxH="80px" overflow="hidden">
                    {news.preview}
                  </Text>
                </CardBody>
                <CardFooter justifyContent="flex-end">
                  <Button mr={5} colorScheme="green" variant="link" onClick={() => handleSeeMoreNews(news)}>
                    Preview
                  </Button>

                  <Link to={news.url} target="_blank" rel="noopener noreferrer">
                    <Button  colorScheme="green" variant="link">
                      Read more
                    </Button>
                  </Link>
                </CardFooter>
              </Stack>
            </Card>
          ))
        )}
      </Box>

      {/* Tips Section */}
      <Box>
        <Stack direction="inline-flex" spacing={2} align="center" mb={0}>
          <Heading size="lg" marginTop={10} marginLeft={10} marginBottom={4}>
            Tips
          </Heading>
          <Button colorScheme="green" variant="solid" marginTop={7} marginLeft={20}>
            <Link to="/eventupload">Create Tips</Link>
          </Button>
        </Stack>
        {loading ? (
          <p>Loading...</p>
        ) : (
          tipData.map((tip, index) => (
            <Card
              key={index}
              direction={{ base: 'column', sm: 'row' }}
              overflow="hidden"
              variant="outline"
              margin={6}
              maxH="190px"
              maxW="570px"
            >
              <Image objectFit="cover" maxW={{ base: '100%', sm: '200px' }} src={tip.thumbnail} />
              <Stack justifyContent={{ base: 'flex-start', sm: 'space-between' }} flex="1" ml={{ base: 0, sm: 4 }}>
                <CardBody maxH="130px" maxW="340px">
                  <Heading size="md" maxH="50px" overflow="hidden">
                    {tip.title}
                  </Heading>
                  <Text fontSize="md" py="2" maxH="80px" overflow="hidden">
                    {tip.content}
                  </Text>
                </CardBody>
                <CardFooter justifyContent="flex-end">
                  <Button ml="auto" colorScheme="green" variant="link" onClick={() => handleSeeMoreTip(tip)}>
                    See more
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          ))
        )}
      </Box>

      {/* Modal for displaying detailed information */}
      <Modal isOpen={isOpen1} onClose={onClose1} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedNews?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
              <Image src={selectedNews?.image} />
              <Text>{selectedNews?.preview}</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen2} onClose={onClose2} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedTip?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
              <Image src={selectedTip?.thumbnail} />
              <Text>{selectedTip?.content}</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Grid>
  );
}
