import React from 'react';
import { Heading, Button } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import qs from 'qs';


const LoginForm = () => {
  const AUTHORUIZE_URI = "https://greenjoy.dev/oauth2/authorization/google"

  const queryStr = qs.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: window.location.href,
    response_type: "token",
    scope: "https://www.googleapis.com/auth/contacts.readonly",
  });

  const loginUri = AUTHORUIZE_URI + "?" + queryStr;

  const [contactGroups, setContactGroups] = useState([]);

  useEffect(() => {
    fetch(PEOPLE_URI, {
      headers: { Authorization: "Bearer " + access_token },
    })
      .then((response) => response.json())
      .then((data) => setContactGroups(data.contactGroups));
  }, [access_token]);


  const responseGoogle = (response) => {
    // Handle the response from Google authentication
    console.log(response);
  };

  return (
    <>
      <Heading as='h2' size='xl' m={5}>로그인 하시겠습니까?</Heading>
      <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        clientId={clientId}
        buttonText="구글 로그인"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      </GoogleOAuthProvider>
    </>
  );
};

export default LoginForm;
