import React from 'react';
import { Link } from 'react-router-dom';
import { Text,Divider,Box, Input, Button, FormControl, FormLabel, VStack } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // 로그인 로직 
  };

  return (
    <VStack spacing={4} align="stretch" width="300px">
      <Box p={4} borderWidth={1} borderRadius="md">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="이메일을 입력하세요" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="비밀번호를 입력하세요" />
            </FormControl>
            <Button type="submit" colorScheme="teal">
              로그인
            </Button>
            <Button leftIcon={<FaGoogle />}>
    구글 로그인
  </Button>
  <Divider />
  <Button  colorScheme='teal' variant='link'>
  <Link to="/signup">Create account?</Link>
  </Button>
          </VStack>
        </form>
      </Box>
    </VStack>
  );
};

export default LoginForm;
