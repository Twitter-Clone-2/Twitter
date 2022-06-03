import logo from "./logo.svg";
import "./App.css";
import Main from "./views/Main";
import Register from "./views/LoginAndReg/Register";
import Login from "./views/LoginAndReg/Login";
import Feed from "./views/Feed";
import Profile from "./views/Profile";

import Settings from "./components/Settings";
import EditProfile from "./components/EditProfile";
import OtherUserProfile from "./views/OtherUserProfile";
import react, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile/page" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
