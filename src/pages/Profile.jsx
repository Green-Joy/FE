import React from 'react';
import {
  Image,
  Text,
  Card,
  CardBody,
  Box,
  Grid,
} from '@chakra-ui/react';

export default function Profile() {
  return (
    <Grid
      templateColumns={['1fr', '1fr', '1fr 3fr']} // Adjust column layout for responsiveness
      gap={4}
    >
      {/* Left side: Profile image and "내 히스토리" card */}
      <Box>
        <Image
          borderRadius='full'
          boxSize='150px'
          src='https://bit.ly/dan-abramov'
          alt='Dan Abramov'
        />
        <Card>
          <CardBody>
            <Text fontWeight='bold'>내 히스토리</Text>
            잔디심기
          </CardBody>
        </Card>
      </Box>

      {/* Right side: "내 글" images */}
      <Box display='flex' flexDirection='row'>
        <Box boxSize='sm' mr={2}>
          <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
        </Box>
        <Box boxSize='sm' mr={2}>
          <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
        </Box>
        <Box boxSize='sm'>
          <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
        </Box>
      </Box>
    </Grid>
  );
}
