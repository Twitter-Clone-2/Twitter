import "./App.css";
import Main from "./views/Main";
import Register from "./views/LoginAndReg/Register";
import Login from "./views/LoginAndReg/Login";
import Feed from "./views/Feed";
import Profile from "./views/Profile";
import Settings from "./components/Settings";
import EditProfile from "./components/EditProfile";
import OtherUserProfile from "./views/OtherUserProfile";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import IconNav from "./components/IconNav";
import NewsAPI from "./components/NewsAPI";

function App() {

  return (
    <div className={"mainContainer"}>
      <BrowserRouter>
      <IconNav/>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile/page" element={<Profile />} />
          <Route
            exact
            path="/profile/page/:id"
            element={<OtherUserProfile />}
          />
          <Route exact path="/main/feed" element={<Feed />} />
        </Routes>
        <NewsAPI/>
      </BrowserRouter>
    </div>
  );
}

export default App;
