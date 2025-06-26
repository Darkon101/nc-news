import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { fetchArticles } from "../../utils/api";

const Body = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchArticles()
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
  }, []);

  if (isLoading) {
    return <p>Loading articles...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <>
      <section>
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              article={article}
            />
          );
        })}
      </section>
    </>
  );
};

export default Body;
