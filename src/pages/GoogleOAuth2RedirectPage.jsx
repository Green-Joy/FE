import { useEffect } from "react";
import axios from "axios";

function GoogleOAuth2RedirectPage() {
  const code = new URL(window.location.href).searchParams.get("code");

  const getToken = async () => {
    const REST_API_KEY = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
    const SECRET_KEY = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
    const response = await fetch(
      `https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&client_secret=${SECRET_KEY}&code=${code}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    return response.json();
  };

  useEffect(() => {
    if (code) {
      getToken(code).then((res) => {
        const token = res.access_token;
        localStorage.setItem("token", token);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      });
    }
  }, [code]);

  return (
    <div>
      <div />
    </div>
  );
}

export default GoogleOAuth2RedirectPage;
