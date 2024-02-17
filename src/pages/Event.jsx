import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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
} from "@chakra-ui/react";

export default function Event() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newsData, setNewsData] = useState([]);
  const [tipData, setTipData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedTip, setSelectedTip] = useState(null);
  const [loading, setLoading] = useState(true);



    useEffect(() => {
      const fetchData = async (tipId) => {
        try {
          const response = await axios.get(`https://greenjoy.dev/api/infos/${tipId}`);
          return response.data;
        } catch (error) {
          console.error(`Error fetching data for tipId ${tipId}:`, error);
          return null; 
        }
      };
    
      const fetchAllData = async () => {
        try {
          const tipIds = Array.from({ length: 20 }, (_, index) => index + 1);
          const dataPromises = tipIds.map((tipId) => fetchData(tipId));
          const fetchedData = await Promise.all(dataPromises);
          setTipData(fetchedData.filter(Boolean)); 
        } catch (error) {
          console.error("Error fetching all data:", error);
        }
      };
      fetchAllData();
    }, []);

  const handleSeeMoreNews = (news) => {
    setSelectedNews(news);
    onOpen();
  };

  const handleSeeMoreTip = (tip) => {
    setSelectedTip(tip);
    onOpen();
  };

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>

      <Box>
        <Heading size="lg" margin={10} textAlign="left">
          News
        </Heading>
        {loading ? (
          <p>Loading...</p>
        ) : (
          newsData.map((news, index) => (
            <Card key={index} direction={{ base: "column", sm: "row" }} overflow="hidden" variant="outline" margin={6} maxH="190px" maxW="570px">
              <Image objectFit="cover" maxW={{ base: "100%", sm: "200px" }} src={news.image} />
              <Stack justifyContent={{ base: "flex-start", sm: "space-between" }} flex="1" ml={{ base: 0, sm: 4 }}>
                <CardBody maxH="130px" maxW="340px">
                  <Heading size="md" maxH="50px" overflow="hidden">
                    {news.title}
                  </Heading>
                  <Text py="2" maxH="80px" overflow="hidden">
                    {news.preview}
                  </Text>
                </CardBody>
                <CardFooter justifyContent="flex-end">
                  <Button colorScheme="green" variant="link" onClick={() => handleSeeMoreNews(news)}>
                    See more ≫
                  </Button>
          
                  <Link to={news.url} target="_blank" rel="noopener noreferrer">
                    <Button colorScheme="green" variant="link">
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
          <Button
            colorScheme="green"
            variant="solid"
            marginTop={7}
            marginLeft={20}
          >
            <Link to="/eventupload">Create Tips</Link>
          </Button>
        </Stack>
        {loading ? (
          <p>Loading...</p>
        ) : (
          tipData.map((tip, index) => (
            <Card key={index} direction={{ base: "column", sm: "row" }} overflow="hidden" variant="outline" margin={6} maxH="190px" maxW="570px">
              <Image objectFit="cover" maxW={{ base: "100%", sm: "200px" }} src={tip.image1} />
              <Stack justifyContent={{ base: "flex-start", sm: "space-between" }} flex="1" ml={{ base: 0, sm: 4 }}>
                <CardBody maxH="130px" maxW="340px">
                  <Heading size="md" maxH="50px" overflow="hidden">
                    {tip.title}
                  </Heading>
                  <Text py="2" maxH="80px" overflow="hidden">
                    
                    {tip.content}
                  </Text>
                  <Text>글쓴이 : {tip.writer}</Text>
                  
                </CardBody>
                <CardFooter justifyContent="flex-end">
                  <Button colorScheme="green" variant="link" onClick={() => handleSeeMoreTip(tip)}>
                    See more ≫
                  </Button>
                </CardFooter>
              </Stack>
            </Card>
          ))
        )}
      </Box>

      {/* Modal for displaying detailed information */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedNews?.title || selectedTip?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
              <Image src={selectedNews?.image || selectedTip?.image1} />
              <Text>{selectedNews?.preview || selectedTip?.content}</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Grid>
  );
}
