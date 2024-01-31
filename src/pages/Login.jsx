import React from 'react';
import { Link } from 'react-router-dom';
import { Text,Divider,Box, Input, Button, FormControl, FormLabel, VStack } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';

const LoginForm = () => {
 
  const handleGoogleLogin = async () => {
    try {
      // Make a GET request to your Google OAuth2 endpoint
      const response = await axios.get('https://greenjoy.dev/oauth2/authorization/google');
  
      // Redirect the user to the Google login page
      window.location.href = response.data.redirect_uri;
    } catch (error) {
      console.error('Google login failed:', error);
     
      alert('Google login failed. Please try again.');
    }
  };



 return (
<>
  <Button onClick={handleGoogleLogin} leftIcon={<FaGoogle />}>
    구글 로그인
  </Button>
 </>

  );
};

export default LoginForm;
