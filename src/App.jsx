import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home-components/Home";
import Article from "./components/article-components/Article";
import { UsersProvider } from "./contexts/UsersContext";
import LoginPage from "./components/home-components/LoginPage";
import TopicPage from "./components/home-components/TopicPage";

function App() {
  return (
    <>
      <UsersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Home />} />
            <Route path="/articles/:id" element={<Article />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/topics/:topic" element={<TopicPage/>}/>
          </Routes>
        </BrowserRouter>
      </UsersProvider>
    </>
  );
}

export default App;
