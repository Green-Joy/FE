import { Image, Text, Box, Stack, Input, Button, Textarea } from '@chakra-ui/react';
import '../styles/FeedUpload.css';

export default function FeedUpload() {
  return (
    <>
      <Text>피드 작성</Text>
      <div id="feed-upload">
        <div id="feed-image">
          <Box boxSize='sm'>
            <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
            <Button colorScheme='teal' size='sm'>사진 업로드</Button>
          </Box>
        </div>
        <div id="feed-info">
          <div id="feed-title">
            <Stack spacing={3}>
              <Input placeholder='medium size' size='md' placeholder='제목' width="500px" height="50px" />
            </Stack>
          </div>
          <div id="feed-detail">
            <Stack spacing={3}>
            <Textarea placeholder='글쓰기' size='md' placeholder='글쓰기' width="500px" height="200px" />
            </Stack>
          </div>
          <div id="feed-loc">
            <Stack spacing={3}>
              <Input placeholder='medium size' size='md' placeholder='위치정보' width="500px" height="50px" />
            </Stack>
          </div>
          <div id="feed-submit">
            <Button colorScheme='teal' size='sm'>올리기</Button>
          </div>
        </div>
      </div>
    </>
  );
}
