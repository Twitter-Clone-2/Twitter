import "./App.css";
import Main from "./views/Main";
import Register from "./views/Register";
import Feed from "./views/Feed";
import Profile from "./views/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IconNav from "./components/IconNav";
import NewsAPI from "./components/NewsAPI";
import ViewTweet from "./views/ViewTweet";
import Messages from "./views/Messages";
import Test from "./views/Test";
// import config from ".aws/exports";

function App() {
  return (
    <div className={"mainContainer"}>
      <BrowserRouter>
        <IconNav />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile/page" element={<Profile />} />
          <Route exact path="/profile/page/:id" element={<Profile />} />
          <Route exact path="/main/feed" element={<Feed />} />
          <Route exact path="/tweet/:id" element={<ViewTweet />} />
          <Route exact path="/messages" element={<Messages />} />
          <Route exact path="/test" element={<Test />} />
        </Routes>
        <NewsAPI />
      </BrowserRouter>
    </div>
  );
}

export default App;
