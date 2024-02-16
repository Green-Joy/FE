import { Box,Card,  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,useDisclosure,
  ModalCloseButton,CardBody, CardFooter,Heading,Text,Image  ,Stack,Button} from '@chakra-ui/react'
import '../styles/Home.css' 
import React, { useState, useEffect } from 'react';
import SimpleSlider1 from '../components/Banner1.jsx';
import SimpleSlider2 from '../components/Banner2.jsx';
import { Link } from "react-router-dom";
import axios from "axios";


export default function Home() {
  const [postData, setPostData] = useState([]);

  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
  const { isOpen: isOpen4, onOpen: onOpen4, onClose: onClose4 } = useDisclosure();


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

    const getRandomIndex = (max) => Math.floor(Math.random() * max) + 1;

    const loadData = async () => {
      const maxPosts = 4; // Number of posts to display
      let fetchedData = [];

      while (fetchedData.length < maxPosts) {
        const index = getRandomIndex(100); // 100개있다고 가정(수정 필요)
        const data = await fetchData(index);

        if (data !== null) {
          fetchedData.push(data);
        }
      }

      setPostData(fetchedData);
      console.log('Fetched data:', fetchedData);
    };

    loadData();
  }, []);

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
      <Text fontSize='lg'>FEED</Text>
    <Link to="/feed">See more</Link>
      </div>
  
<div id="feeds">
{postData.map((post, index) => (
 <Box key={index} boxSize="sm" p={2}>
  <Image src={post.image1}alt={`Post ${index}`}  />
  <Text>{post.writer}
</Text>
</Box>))}

</div>
<div id="content2_header">
<Text fontSize='lg'>EVENTS</Text>
<Link to="/event">See more</Link>
</div>
<div id="events">
<Box boxSize='sm'p={2} >
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
  <Text>축제1
</Text>
</Box>
<Box boxSize='sm'p={2} >
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
  <Text>축제2
</Text>
</Box>
<Box boxSize='sm'p={2} >
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
  <Text>축제3
</Text>
</Box>
<Box boxSize='sm'p={2} >
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
  <Text>축제4
</Text>
</Box>
</div>
</div>

<div id="content2">
    <div id="news">
    <div id="content3_header">
    <Text fontSize='lg'> NEWS
</Text>
<Link to="/event">See more</Link>
</div>
<Card p={2} 
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    alt='Caffe Latte'
  />
  <Stack>
    <CardBody>
      <Heading size='md'>뉴스 제목1</Heading>
      <Text py='2'>
        뉴스내용1
      </Text>
    </CardBody>
    <CardFooter>
      <Button onClick={onOpen1} variant='solid' colorScheme='blue'>
        자세히 보기
      </Button>
      <Modal isOpen={isOpen1} onClose={onClose1} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>뉴스 제목1</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <Image src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60' />
                <Text>뉴스내용1</Text>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
    </CardFooter>
  </Stack>
</Card>
<Card p={2} 
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    alt='Caffe Latte'
  />
  <Stack>
    <CardBody>
      <Heading size='md'>뉴스 제목2</Heading>
      <Text py='2'>
        뉴스내용2
      </Text>
    </CardBody>
    <CardFooter>
      <Button onClick={onOpen2} variant='solid' colorScheme='blue'>
        자세히 보기
      </Button>
      <Modal isOpen={isOpen2} onClose={onClose2} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>뉴스 제목2</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <Image src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60' />
                <Text>뉴스내용2</Text>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
    </CardFooter>
  </Stack>
</Card>
<Card p={2} 
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    alt='Caffe Latte'
  />
  <Stack>
    <CardBody>
      <Heading size='md'>뉴스 제목3</Heading>
      <Text py='2'>
        뉴스내용3
      </Text>
    </CardBody>
    <CardFooter>
      <Button onClick={onOpen3} variant='solid' colorScheme='blue'>
        자세히 보기
      </Button>
      <Modal isOpen={isOpen3} onClose={onClose3} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>뉴스 제목3</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <Image src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60' />
                <Text>뉴스내용3</Text>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
    </CardFooter>
  </Stack>
</Card>
<Card p={2} 
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    alt='Caffe Latte'
  />
  <Stack>
    <CardBody>
      <Heading size='md'>뉴스 제목4</Heading>
      <Text py='2'>
        뉴스내용4
      </Text>
    </CardBody>
    <CardFooter>
      <Button onClick={onOpen4} variant='solid' colorScheme='blue'>
        자세히 보기
      </Button>
      <Modal isOpen={isOpen4} onClose={onClose4} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>뉴스 제목4</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
              >
                <Image src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60' />
                <Text>뉴스내용4</Text>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
    </CardFooter>
  </Stack>
</Card>
</div>
</div>
</div>


    </>
  );
}
