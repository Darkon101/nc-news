import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home-components/Home";
import ArticleCard from "./components/article-components/Article";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Home />} />
          <Route path="/articles/:id" element={<ArticleCard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
