import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import Event from "./pages/Event";
import Challenge from "./pages/Challenge";
import FeedUpload from "./pages/FeedUpload";
import EventUpload from "./pages/EventUpload";
import ChallengeUpload from "./pages/ChallengeUpload";
import GoogleOAuth2RedirectPage from "./pages/GoogleOAuth2RedirectPage";
import PostDetail from "./pages/test";
import { Box } from "@chakra-ui/react";
import styled from "styled-components";

const Body = styled.div`
  font-family: "Noto Sans KR", sans-serif;
  background-color: beige;
`;

export default function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Body>
          <Header />
          <div className="contentWrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/login/oauth2/code/google"
                element={<GoogleOAuth2RedirectPage />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/event" element={<Event />} />
              <Route path="/challenge" element={<Challenge />} />
              <Route path="/feedupload" element={<FeedUpload />} />
              <Route path="/eventupload" element={<EventUpload />} />
              <Route path="/challengeupload" element={<ChallengeUpload />} />
              <Route path="/postdetail" element={<PostDetail />} />
            </Routes>
          </div>
          <Footer />
        </Body>
      </div>
    </BrowserRouter>
  );
}
