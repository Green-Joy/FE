import { Heading, Button, Text } from "@chakra-ui/react";

function LoginPage() {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  const onGoogleSocialLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Heading margin={10} marginBottom={3}>
        Welcome to Greenjoy
      </Heading>
      <Text fontSize="xl">
        환경 정보를 여러 사람들과 나누고 환경 보호 챌린지를 해보세요!
      </Text>
      <Heading size="xl" marginTop={20}>
        로그인 하시겠습니까?
      </Heading>
      <Button onClick={onGoogleSocialLogin} colorScheme="green" marginTop={7}>
        구글 소셜 로그인
      </Button>
    </div>
  );
}

export default LoginPage;
