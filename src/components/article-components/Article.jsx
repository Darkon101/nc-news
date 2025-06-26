import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import CommentsContainer from "./comment-components/CommentsContainer";
import Navbar from "./Navbar";
import ViewCommentsButton from "./ViewCommentsButton";
import { fetchArticleById } from "../../utils/api";
import { useParams } from "react-router-dom";

const Article = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    fetchArticleById(id)
      .then((result) => {
        const { article } = result;
        setArticle(article);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });
  }, [id]);

  if (isLoading) {
    return <p>Loading article...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <>
      <Navbar />
      <ArticleCard article={article} />
      <ViewCommentsButton />
      <CommentsContainer />
    </>
  );
};

export default Article;
