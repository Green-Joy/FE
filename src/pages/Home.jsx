import { Box,Card, CardHeader, CardBody, CardFooter,Heading,Text,Image  ,Stack, HStack, VStack,Button, ButtonGroup } from '@chakra-ui/react'
import '../styles/Home.css'

export default function Home() {
  return (
    <>
  <div id="banner">
  <div id="banner1">
  <Box boxSize='sm'>
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
</Box>
  </div>
  <div id="banner2">
  <Box boxSize='sm'>
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
</Box>
  </div>
  </div>



    <div id="contents">
      <div id="content1">
<div id="feeds">
<Text>FEED</Text>
<Box boxSize='sm'>
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
  <Text>SYEON
</Text>
</Box>
<Box boxSize='sm'>
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
  <Text>SYEON
</Text>
</Box>
<Box boxSize='sm'>
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
  <Text>SYEON
</Text>
</Box>
<Box boxSize='sm'>
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
  <Text>SYEON
</Text>
</Box>
</div>

<div id="events">
<Text>EVENTS
</Text>
<Box boxSize='sm'>
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
</Box>
<Box boxSize='sm'>
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
</Box>
<Box boxSize='sm'>
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
</Box>
<Box boxSize='sm'>
  <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
</Box>
</div>
</div>

<div id="content2">
    <div id="news">
    <Text>NEWS
</Text>
<Card
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
      <Heading size='md'>뉴스 제목</Heading>
      <Text py='2'>
        뉴스내용
      </Text>
    </CardBody>
    <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        자세히 보기
      </Button>
    </CardFooter>
  </Stack>
</Card>
<Card
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
      <Heading size='md'>뉴스 제목</Heading>
      <Text py='2'>
        뉴스내용
      </Text>
    </CardBody>
    <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        자세히 보기
      </Button>
    </CardFooter>
  </Stack>
</Card>
<Card
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
      <Heading size='md'>뉴스 제목</Heading>
      <Text py='2'>
        뉴스내용
      </Text>
    </CardBody>
    <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        자세히 보기
      </Button>
    </CardFooter>
  </Stack>
</Card>
<Card
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
      <Heading size='md'>뉴스 제목</Heading>
      <Text py='2'>
        뉴스내용
      </Text>
    </CardBody>
    <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        자세히 보기
      </Button>
    </CardFooter>
  </Stack>
</Card>
</div>
</div>
</div>


    </>
  );
}
