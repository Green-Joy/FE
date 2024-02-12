import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GoogleOAuth2RedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authCode = url.searchParams.get("code");

    if (!authCode) {
      // 인증 코드가 없으면 로그인 페이지로 리다이렉트
      window.location.href = "/login";
      return;
    }

    // Spring 서버로 인증 코드 전송
    axios
      .post(`https://greenjoy.dev/api/users/login`, { authCode })
      .then((response) => {
        console.log(response.data);
        // 서버로부터 randomID를 받아옴
        const randomId = response.data.id;
        localStorage.setItem("randomId", randomId);
        // 메인으로 리다이렉트
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to send auth code to server", error);
        // 에러 처리
      });

    console.log(authCode);
  }, [navigate]);

  return (
    <div>
      <h1>로그인 중...</h1>
    </div>
  );
}

export default GoogleOAuth2RedirectPage;
