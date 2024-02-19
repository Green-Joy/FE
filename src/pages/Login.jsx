import { Heading, Button } from "@chakra-ui/react";

function LoginPage() {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  const onGoogleSocialLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  return (
    <div>
      <Heading as="h2" size="xl" m={5}>
        로그인 하시겠습니까?
      </Heading>
      <Button onClick={onGoogleSocialLogin} colorScheme="green">
        구글 소셜 로그인
      </Button>
    </div>
  );
}

export default LoginPage;
