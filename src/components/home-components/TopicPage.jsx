import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticles } from "../../utils/api";
import Header from "./Header";
import ArticleCard from "./ArticleCard";

const TopicPage = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchArticles(topic)
      .then((result) => {
        const { articles } = result;
        setArticles(articles);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });
  }, [topic]);

  if (isLoading) {
    return (
      <>
        <Header />
        <p>Loading articles...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <p>Something went wrong...</p>
      </>
    );
  }
  return (
    <>
      <Header />
      <section>
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </section>
    </>
  );
};

export default TopicPage;
