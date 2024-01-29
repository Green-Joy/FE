import React from 'react';
import { Link } from 'react-router-dom';
import { Text,Divider,Box, Input, Button, FormControl, FormLabel, VStack } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';

const LoginForm = () => {
 
  const handleGoogleLogin = async () => {
    try {
      // Make a GET request to your Google OAuth2 endpoint
      const response = await axios.get('http://35.188.183.95/oauth2/authorization/google');

      // Redirect the user to the Google login page
      window.location.href = response.data.redirect_uri;
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };



 return (
    <VStack spacing={4} align="stretch" width="300px">
    
            <Button onClick={handleGoogleLogin} leftIcon={<FaGoogle />}>
              구글 로그인
            </Button>
            <a href='http://35.188.183.95:8080/oauth2/authorization/google'>TEST</a>
            <Divider />
            <Button colorScheme="teal" variant="link">
              <Link to="/signup">Create account?</Link>
            </Button>
      
    
    
    </VStack>
  );
};

export default LoginForm;
