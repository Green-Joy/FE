import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import Event from "./pages/Event";
import Challenge from "./pages/Challenge";
import FeedUpload from "./pages/FeedUpload";
import EventUpload from "./pages/EventUpload";
import ChallengeUpload from "./pages/ChallengeUpload";

export default function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <div className="contentWrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/event" element={<Event />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/feedupload" element={<FeedUpload />} />
            <Route path="/eventupload" element={<EventUpload />} />
            <Route path="/challengeupload" element={<ChallengeUpload />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
