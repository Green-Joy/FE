import React from 'react';
import { Heading, Button } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';

const LoginForm = () => {
  const handleGoogleLogin = async () => {
    try {
      // Send a request to initiate Google OAuth 2.0 authentication
      const response = await axios.get('https://greenjoy.dev/oauth2/authorization/google');

      // Handle the response data
      console.log(response.data); // This might be the Google login page URL or other necessary data

      // If you want to redirect based on the response, you can uncomment the following line
      // window.location.href = response.data.redirectUrl;
    } catch (error) {
      // Handle errors that may occur during the Google login process
      console.error('Google login error:', error);
    }
  };

  return (
    <>
      <Heading as='h2' size='xl'  m={5}>Do you want to LogIn?</Heading>
      <Button size='lg' leftIcon={<FaGoogle />} onClick={handleGoogleLogin}>
        구글 로그인
      </Button>
    </>
  );
};

export default LoginForm;
